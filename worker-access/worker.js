// ============================================
// Worker Cloudflare — Gestion accès avec création de compte
// ============================================

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const WORKER_URL = 'https://responsable-access.moysan-teddy.workers.dev';
const SITE_URL = 'https://moysanteddy-lab.github.io/Respons-Able---Coach-d-lib-ratif';

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // Route : Demander l'accès (envoie mail de vérification à l'utilisateur)
      if (path === '/request-access' && request.method === 'POST') {
        return await handleRequestAccess(request, env);
      }

      // Route : Vérifier si un email a accès
      if (path === '/check-access' && request.method === 'POST') {
        return await handleCheckAccess(request, env);
      }

      // Route : L'utilisateur vérifie son email (clic sur le lien)
      if (path === '/verify' && request.method === 'GET') {
        return await handleVerify(url, env);
      }

      // Route : Admin approuve
      if (path === '/approve' && request.method === 'GET') {
        return await handleApprove(url, env);
      }

      // Route : Admin refuse
      if (path === '/reject' && request.method === 'GET') {
        return await handleReject(url, env);
      }

      // Route : Page création mot de passe
      if (path === '/create-password' && request.method === 'GET') {
        return await handleCreatePasswordPage(url, env);
      }

      // Route : Enregistrer le mot de passe
      if (path === '/set-password' && request.method === 'POST') {
        return await handleSetPassword(request, env);
      }

      // Route : Connexion
      if (path === '/login' && request.method === 'POST') {
        return await handleLogin(request, env);
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
  const existing = await env.ACCESS_DB.get(normalizedEmail);

  if (existing) {
    const data = JSON.parse(existing);
    if (data.status === 'active') {
      return jsonResponse({ status: 'active', message: 'Compte déjà actif. Connectez-vous.' });
    }
    if (data.status === 'approved') {
      return jsonResponse({ status: 'approved', message: 'Compte approuvé. Vérifiez vos emails pour créer votre mot de passe.' });
    }
    if (data.status === 'pending') {
      return jsonResponse({ status: 'pending', message: 'Votre demande est en cours de validation.' });
    }
    if (data.status === 'unverified') {
      await sendVerificationEmail(normalizedEmail, env);
      return jsonResponse({ status: 'unverified', message: 'Un email de vérification vous a été renvoyé.' });
    }
    if (data.status === 'rejected') {
      return jsonResponse({ status: 'rejected', message: 'Votre demande a été refusée.' });
    }
  }

  // Nouvelle demande : statut "unverified"
  const requestData = {
    email: normalizedEmail,
    status: 'unverified',
    requestedAt: new Date().toISOString(),
  };

  await env.ACCESS_DB.put(normalizedEmail, JSON.stringify(requestData));
  await sendVerificationEmail(normalizedEmail, env);

  return jsonResponse({ status: 'unverified', message: 'Un email de vérification vous a été envoyé.' });
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
    hasAccess: data.status === 'active'
  });
}

async function handleVerify(url, env) {
  const email = url.searchParams.get('email');
  const token = url.searchParams.get('token');

  if (!email || !verifyToken(email, 'verify', token, env)) {
    return htmlResponse(errorPage('Lien invalide ou expiré.'));
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existing = await env.ACCESS_DB.get(normalizedEmail);

  if (!existing) {
    return htmlResponse(errorPage('Email non trouvé.'));
  }

  const data = JSON.parse(existing);

  if (data.status === 'active') {
    return htmlResponse(successPage('Compte déjà actif !', `Vous pouvez vous connecter sur <a href="${SITE_URL}">la plateforme</a>.`));
  }

  if (data.status === 'approved') {
    return htmlResponse(infoPage('Email déjà vérifié', 'Vérifiez vos emails pour créer votre mot de passe.'));
  }

  if (data.status === 'pending') {
    return htmlResponse(infoPage('Email déjà vérifié', 'Votre demande est en attente de validation par l\'administrateur.'));
  }

  // Passer en "pending" et notifier l'admin
  data.status = 'pending';
  data.verifiedAt = new Date().toISOString();
  await env.ACCESS_DB.put(normalizedEmail, JSON.stringify(data));

  await sendAdminNotification(normalizedEmail, env);

  return htmlResponse(successPage(
    'Email vérifié !',
    'Votre demande a été transmise. Vous recevrez un email une fois votre accès validé.'
  ));
}

async function handleApprove(url, env) {
  const email = url.searchParams.get('email');
  const token = url.searchParams.get('token');

  if (!email || !verifyToken(email, 'admin', token, env)) {
    return htmlResponse(errorPage('Lien invalide ou expiré.'));
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existing = await env.ACCESS_DB.get(normalizedEmail);

  if (!existing) {
    return htmlResponse(errorPage('Email non trouvé.'));
  }

  const data = JSON.parse(existing);
  data.status = 'approved';
  data.approvedAt = new Date().toISOString();

  await env.ACCESS_DB.put(normalizedEmail, JSON.stringify(data));

  // Envoyer le lien de création de mot de passe
  await sendPasswordCreationEmail(normalizedEmail, env);

  return htmlResponse(successPage(
    'Accès autorisé',
    `<strong>${normalizedEmail}</strong> va recevoir un email pour créer son mot de passe.`
  ));
}

async function handleReject(url, env) {
  const email = url.searchParams.get('email');
  const token = url.searchParams.get('token');

  if (!email || !verifyToken(email, 'admin', token, env)) {
    return htmlResponse(errorPage('Lien invalide ou expiré.'));
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existing = await env.ACCESS_DB.get(normalizedEmail);

  if (!existing) {
    return htmlResponse(errorPage('Email non trouvé.'));
  }

  const data = JSON.parse(existing);
  data.status = 'rejected';
  data.rejectedAt = new Date().toISOString();

  await env.ACCESS_DB.put(normalizedEmail, JSON.stringify(data));

  return htmlResponse(errorPage(
    `Accès refusé pour <strong>${normalizedEmail}</strong>.`
  ));
}

async function handleCreatePasswordPage(url, env) {
  const email = url.searchParams.get('email');
  const token = url.searchParams.get('token');

  if (!email || !verifyToken(email, 'password', token, env)) {
    return htmlResponse(errorPage('Lien invalide ou expiré.'));
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existing = await env.ACCESS_DB.get(normalizedEmail);

  if (!existing) {
    return htmlResponse(errorPage('Email non trouvé.'));
  }

  const data = JSON.parse(existing);

  if (data.status === 'active') {
    return htmlResponse(successPage('Compte déjà actif !', `Vous pouvez vous connecter sur <a href="${SITE_URL}">la plateforme</a>.`));
  }

  if (data.status !== 'approved') {
    return htmlResponse(errorPage('Votre compte n\'est pas encore approuvé.'));
  }

  // Page de création de mot de passe
  return htmlResponse(createPasswordPage(normalizedEmail, token));
}

async function handleSetPassword(request, env) {
  const { email, token, password } = await request.json();

  if (!email || !verifyToken(email, 'password', token, env)) {
    return jsonResponse({ error: 'Lien invalide ou expiré' }, 400);
  }

  if (!password || password.length < 6) {
    return jsonResponse({ error: 'Le mot de passe doit faire au moins 6 caractères' }, 400);
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existing = await env.ACCESS_DB.get(normalizedEmail);

  if (!existing) {
    return jsonResponse({ error: 'Email non trouvé' }, 404);
  }

  const data = JSON.parse(existing);

  if (data.status !== 'approved') {
    return jsonResponse({ error: 'Compte non approuvé' }, 400);
  }

  // Hasher le mot de passe
  const passwordHash = await hashPassword(password);

  data.status = 'active';
  data.passwordHash = passwordHash;
  data.activatedAt = new Date().toISOString();

  await env.ACCESS_DB.put(normalizedEmail, JSON.stringify(data));

  return jsonResponse({ success: true, message: 'Compte activé ! Vous pouvez vous connecter.' });
}

async function handleLogin(request, env) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return jsonResponse({ error: 'Email et mot de passe requis' }, 400);
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existing = await env.ACCESS_DB.get(normalizedEmail);

  if (!existing) {
    return jsonResponse({ error: 'Email ou mot de passe incorrect' }, 401);
  }

  const data = JSON.parse(existing);

  if (data.status !== 'active') {
    return jsonResponse({ error: 'Compte non activé' }, 401);
  }

  // Vérifier le mot de passe
  const passwordValid = await verifyPassword(password, data.passwordHash);

  if (!passwordValid) {
    return jsonResponse({ error: 'Email ou mot de passe incorrect' }, 401);
  }

  // Générer un token de session
  const sessionToken = generateSessionToken(normalizedEmail, env);

  return jsonResponse({
    success: true,
    email: normalizedEmail,
    token: sessionToken
  });
}

// ----- Emails -----

async function sendVerificationEmail(email, env) {
  const token = generateToken(email, 'verify', env);
  const verifyUrl = `${WORKER_URL}/verify?email=${encodeURIComponent(email)}&token=${token}`;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: "Respons'Able <noreply@resend.dev>",
      to: email,
      subject: 'Vérifiez votre adresse email',
      html: `
        <div style="font-family: system-ui; max-width: 500px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1e3a5f;">Bienvenue sur Respons'Able - Coaching Délibératif</h2>
          <p>Cliquez sur le bouton ci-dessous pour vérifier votre adresse email et finaliser votre demande d'inscription.</p>

          <div style="margin: 30px 0; text-align: center;">
            <a href="${verifyUrl}"
               style="display: inline-block; padding: 14px 28px; background: #1e3a5f; color: white; text-decoration: none; border-radius: 8px; font-weight: 500;">
              Vérifier mon email
            </a>
          </div>

          <p style="color: #666; font-size: 13px;">
            Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 11px; text-align: center;">
            © 2024-2026 Teddy Moysan | Respons'Able
          </p>
        </div>
      `,
    }),
  });
}

async function sendAdminNotification(email, env) {
  const token = generateToken(email, 'admin', env);
  const approveUrl = `${WORKER_URL}/approve?email=${encodeURIComponent(email)}&token=${token}`;
  const rejectUrl = `${WORKER_URL}/reject?email=${encodeURIComponent(email)}&token=${token}`;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: "Respons'Able <noreply@resend.dev>",
      to: env.ADMIN_EMAIL,
      subject: `Nouvelle demande : ${email}`,
      html: `
        <div style="font-family: system-ui; max-width: 500px; margin: 0 auto;">
          <h2 style="color: #1e3a5f;">Nouvelle demande d'accès</h2>
          <p><strong>${email}</strong> a vérifié son adresse et souhaite accéder à Respons'Able - Coaching Délibératif.</p>

          <div style="margin: 30px 0;">
            <a href="${approveUrl}"
               style="display: inline-block; padding: 12px 24px; background: #059669; color: white; text-decoration: none; border-radius: 8px; margin-right: 10px;">
              Autoriser
            </a>
            <a href="${rejectUrl}"
               style="display: inline-block; padding: 12px 24px; background: #ef4444; color: white; text-decoration: none; border-radius: 8px;">
              Refuser
            </a>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 11px; text-align: center;">
            © 2024-2026 Teddy Moysan | Respons'Able
          </p>
        </div>
      `,
    }),
  });
}

async function sendPasswordCreationEmail(email, env) {
  const token = generateToken(email, 'password', env);
  const createPasswordUrl = `${WORKER_URL}/create-password?email=${encodeURIComponent(email)}&token=${token}`;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: "Respons'Able <noreply@resend.dev>",
      to: email,
      subject: 'Créez votre mot de passe',
      html: `
        <div style="font-family: system-ui; max-width: 500px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #059669;">Votre accès a été validé !</h2>
          <p>Votre demande d'accès à <strong>Respons'Able - Coaching Délibératif</strong> a été approuvée.</p>
          <p>Cliquez sur le bouton ci-dessous pour créer votre mot de passe et activer votre compte.</p>

          <div style="margin: 30px 0; text-align: center;">
            <a href="${createPasswordUrl}"
               style="display: inline-block; padding: 14px 28px; background: #1e3a5f; color: white; text-decoration: none; border-radius: 8px; font-weight: 500;">
              Créer mon mot de passe
            </a>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 11px; text-align: center;">
            © 2024-2026 Teddy Moysan | Respons'Able
          </p>
        </div>
      `,
    }),
  });
}

// ----- Utils -----

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function generateToken(email, action, env) {
  const secret = env.TOKEN_SECRET || 'default-secret';
  const data = email.toLowerCase() + action + secret;
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash) + data.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

function verifyToken(email, action, token, env) {
  return token === generateToken(email, action, env);
}

function generateSessionToken(email, env) {
  const secret = env.TOKEN_SECRET || 'default-secret';
  const timestamp = Date.now();
  const data = email + timestamp + secret;
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash) + data.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36) + '-' + timestamp.toString(36);
}

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verifyPassword(password, hash) {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

function htmlResponse(html, status = 200) {
  return new Response(html, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

// ----- Pages HTML -----

function successPage(title, message) {
  return `
    <!DOCTYPE html>
    <html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title></head>
    <body style="font-family: system-ui; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f0fdf4;">
      <div style="max-width: 400px; padding: 40px; text-align: center; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="font-size: 48px; margin-bottom: 16px;">✅</div>
        <h1 style="color: #059669; margin: 0 0 12px;">${title}</h1>
        <p style="color: #666;">${message}</p>
        <p style="color: #999; font-size: 10px; margin-top: 24px;">© 2024-2026 Teddy Moysan | Respons'Able</p>
      </div>
    </body></html>
  `;
}

function errorPage(message) {
  return `
    <!DOCTYPE html>
    <html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Erreur</title></head>
    <body style="font-family: system-ui; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #fef2f2;">
      <div style="max-width: 400px; padding: 40px; text-align: center; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="font-size: 48px; margin-bottom: 16px;">❌</div>
        <p style="color: #666;">${message}</p>
        <p style="color: #999; font-size: 10px; margin-top: 24px;">© 2024-2026 Teddy Moysan | Respons'Able</p>
      </div>
    </body></html>
  `;
}

function infoPage(title, message) {
  return `
    <!DOCTYPE html>
    <html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title></head>
    <body style="font-family: system-ui; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #eff6ff;">
      <div style="max-width: 400px; padding: 40px; text-align: center; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="font-size: 48px; margin-bottom: 16px;">ℹ️</div>
        <h1 style="color: #1e3a5f; margin: 0 0 12px;">${title}</h1>
        <p style="color: #666;">${message}</p>
        <p style="color: #999; font-size: 10px; margin-top: 24px;">© 2024-2026 Teddy Moysan | Respons'Able</p>
      </div>
    </body></html>
  `;
}

function createPasswordPage(email, token) {
  return `
    <!DOCTYPE html>
    <html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Créer votre mot de passe</title>
    <style>
      * { box-sizing: border-box; }
      body { font-family: system-ui; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f8fafc; }
      .container { max-width: 400px; padding: 40px; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
      h1 { color: #1e3a5f; margin: 0 0 8px; font-size: 24px; }
      .email { color: #666; margin-bottom: 24px; }
      label { display: block; margin-bottom: 6px; font-weight: 500; color: #333; }
      input { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px; margin-bottom: 16px; }
      input:focus { outline: none; border-color: #1e3a5f; }
      button { width: 100%; padding: 14px; background: #1e3a5f; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 500; cursor: pointer; }
      button:hover { background: #2d4a6f; }
      button:disabled { background: #ccc; cursor: not-allowed; }
      .error { color: #ef4444; margin-bottom: 16px; display: none; }
      .success { color: #059669; margin-bottom: 16px; display: none; }
      .footer { color: #999; font-size: 10px; margin-top: 24px; text-align: center; }
    </style>
    </head>
    <body>
      <div class="container">
        <h1>Créer votre mot de passe</h1>
        <p class="email">${email}</p>

        <div class="error" id="error"></div>
        <div class="success" id="success"></div>

        <form id="form">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" placeholder="Minimum 6 caractères" required minlength="6">

          <label for="confirm">Confirmer le mot de passe</label>
          <input type="password" id="confirm" placeholder="Confirmez votre mot de passe" required>

          <button type="submit" id="submit">Créer mon compte</button>
        </form>

        <p class="footer">© 2024-2026 Teddy Moysan | Respons'Able</p>
      </div>

      <script>
        const form = document.getElementById('form');
        const errorEl = document.getElementById('error');
        const successEl = document.getElementById('success');
        const submitBtn = document.getElementById('submit');

        form.addEventListener('submit', async (e) => {
          e.preventDefault();

          const password = document.getElementById('password').value;
          const confirm = document.getElementById('confirm').value;

          errorEl.style.display = 'none';
          successEl.style.display = 'none';

          if (password !== confirm) {
            errorEl.textContent = 'Les mots de passe ne correspondent pas.';
            errorEl.style.display = 'block';
            return;
          }

          if (password.length < 6) {
            errorEl.textContent = 'Le mot de passe doit faire au moins 6 caractères.';
            errorEl.style.display = 'block';
            return;
          }

          submitBtn.disabled = true;
          submitBtn.textContent = 'Création...';

          try {
            const response = await fetch('${WORKER_URL}/set-password', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: '${email}',
                token: '${token}',
                password: password
              })
            });

            const data = await response.json();

            if (data.success) {
              successEl.textContent = 'Compte créé ! Redirection...';
              successEl.style.display = 'block';
              form.style.display = 'none';
              setTimeout(() => {
                window.location.href = '${SITE_URL}';
              }, 2000);
            } else {
              errorEl.textContent = data.error || 'Une erreur est survenue.';
              errorEl.style.display = 'block';
              submitBtn.disabled = false;
              submitBtn.textContent = 'Créer mon compte';
            }
          } catch (err) {
            errorEl.textContent = 'Erreur de connexion.';
            errorEl.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Créer mon compte';
          }
        });
      </script>
    </body></html>
  `;
}
