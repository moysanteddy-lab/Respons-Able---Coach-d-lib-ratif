// ============================================
// Worker Cloudflare — Gestion accès Beta
// ============================================

// Variables d'environnement à configurer dans Cloudflare :
// - RESEND_API_KEY : ta clé API Resend
// - ACCESS_DB : ton namespace KV
// - ADMIN_EMAIL : moysan.teddy@gmail.com

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // Route : Demander l'accès
      if (path === '/request-access' && request.method === 'POST') {
        return await handleRequestAccess(request, env);
      }

      // Route : Vérifier si un email a accès
      if (path === '/check-access' && request.method === 'POST') {
        return await handleCheckAccess(request, env);
      }

      // Route : Approuver un email (lien dans le mail)
      if (path === '/approve' && request.method === 'GET') {
        return await handleApprove(url, env);
      }

      // Route : Refuser un email
      if (path === '/reject' && request.method === 'GET') {
        return await handleReject(url, env);
      }

      return jsonResponse({ error: 'Route non trouvée' }, 404);

    } catch (error) {
      console.error('Erreur:', error);
      return jsonResponse({ error: 'Erreur serveur' }, 500);
    }
  }
};

// ----- Handlers -----

async function handleRequestAccess(request, env) {
  const { email } = await request.json();

  if (!email || !isValidEmail(email)) {
    return jsonResponse({ error: 'Email invalide' }, 400);
  }

  const normalizedEmail = email.toLowerCase().trim();

  // Vérifier si déjà dans la base
  const existing = await env.ACCESS_DB.get(normalizedEmail);

  if (existing) {
    const data = JSON.parse(existing);
    if (data.status === 'approved') {
      return jsonResponse({ status: 'approved', message: 'Accès déjà autorisé' });
    }
    if (data.status === 'pending') {
      return jsonResponse({ status: 'pending', message: 'Demande déjà en attente' });
    }
    if (data.status === 'rejected') {
      return jsonResponse({ status: 'rejected', message: 'Accès refusé' });
    }
  }

  // Créer la demande
  const requestData = {
    email: normalizedEmail,
    status: 'pending',
    requestedAt: new Date().toISOString(),
  };

  await env.ACCESS_DB.put(normalizedEmail, JSON.stringify(requestData));

  // Envoyer l'email à l'admin
  await sendAdminNotification(normalizedEmail, env);

  return jsonResponse({ status: 'pending', message: 'Demande envoyée' });
}

async function handleCheckAccess(request, env) {
  const { email } = await request.json();

  if (!email || !isValidEmail(email)) {
    return jsonResponse({ error: 'Email invalide' }, 400);
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existing = await env.ACCESS_DB.get(normalizedEmail);

  if (!existing) {
    return jsonResponse({ status: 'none', hasAccess: false });
  }

  const data = JSON.parse(existing);
  return jsonResponse({
    status: data.status,
    hasAccess: data.status === 'approved'
  });
}

async function handleApprove(url, env) {
  const email = url.searchParams.get('email');
  const token = url.searchParams.get('token');

  if (!email || !verifyToken(email, token, env)) {
    return htmlResponse('❌ Lien invalide ou expiré.');
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existing = await env.ACCESS_DB.get(normalizedEmail);

  if (!existing) {
    return htmlResponse('❌ Email non trouvé.');
  }

  const data = JSON.parse(existing);
  data.status = 'approved';
  data.approvedAt = new Date().toISOString();

  await env.ACCESS_DB.put(normalizedEmail, JSON.stringify(data));

  return htmlResponse(`
    <div style="font-family: system-ui; max-width: 400px; margin: 50px auto; text-align: center;">
      <h1 style="color: #059669;">✅ Accès autorisé</h1>
      <p><strong>${normalizedEmail}</strong> peut maintenant utiliser Respons'Able.</p>
      <p style="color: #666; font-size: 14px;">Tu peux fermer cette page.</p>
    </div>
  `);
}

async function handleReject(url, env) {
  const email = url.searchParams.get('email');
  const token = url.searchParams.get('token');

  if (!email || !verifyToken(email, token, env)) {
    return htmlResponse('❌ Lien invalide ou expiré.');
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existing = await env.ACCESS_DB.get(normalizedEmail);

  if (!existing) {
    return htmlResponse('❌ Email non trouvé.');
  }

  const data = JSON.parse(existing);
  data.status = 'rejected';
  data.rejectedAt = new Date().toISOString();

  await env.ACCESS_DB.put(normalizedEmail, JSON.stringify(data));

  return htmlResponse(`
    <div style="font-family: system-ui; max-width: 400px; margin: 50px auto; text-align: center;">
      <h1 style="color: #ef4444;">🚫 Accès refusé</h1>
      <p><strong>${normalizedEmail}</strong> n'aura pas accès à Respons'Able.</p>
      <p style="color: #666; font-size: 14px;">Tu peux fermer cette page.</p>
    </div>
  `);
}

// ----- Email -----

async function sendAdminNotification(email, env) {
  const token = generateToken(email, env);
  const workerUrl = 'https://responsable-access.moysan-teddy.workers.dev'; // À adapter

  const approveUrl = `${workerUrl}/approve?email=${encodeURIComponent(email)}&token=${token}`;
  const rejectUrl = `${workerUrl}/reject?email=${encodeURIComponent(email)}&token=${token}`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Respons\'Able <noreply@resend.dev>',
      to: env.ADMIN_EMAIL || 'moysan.teddy@gmail.com',
      subject: `🔔 Nouvelle demande d'accès : ${email}`,
      html: `
        <div style="font-family: system-ui; max-width: 500px; margin: 0 auto;">
          <h2 style="color: #1e3a5f;">Nouvelle demande d'accès</h2>
          <p><strong>${email}</strong> souhaite accéder à Respons'Able.</p>

          <div style="margin: 30px 0;">
            <a href="${approveUrl}"
               style="display: inline-block; padding: 12px 24px; background: #059669; color: white; text-decoration: none; border-radius: 8px; margin-right: 10px;">
              ✅ Autoriser
            </a>
            <a href="${rejectUrl}"
               style="display: inline-block; padding: 12px 24px; background: #ef4444; color: white; text-decoration: none; border-radius: 8px;">
              🚫 Refuser
            </a>
          </div>

          <p style="color: #666; font-size: 12px;">
            Demande reçue le ${new Date().toLocaleString('fr-FR')}
          </p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    console.error('Erreur envoi email:', await response.text());
  }
}

// ----- Utils -----

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function generateToken(email, env) {
  // Token simple basé sur l'email + secret
  const secret = env.TOKEN_SECRET || 'responsable-beta-2024';
  const data = email.toLowerCase() + secret;
  // Hash simple (en prod, utiliser crypto.subtle)
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

function verifyToken(email, token, env) {
  return token === generateToken(email, env);
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
    },
  });
}

function htmlResponse(html, status = 200) {
  return new Response(html, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
