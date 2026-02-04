// ============================================
// Coach Civique — Respons'Able
// ============================================
// Réutilise le même Cloudflare Worker que RespirAction
// (proxy Groq avec Llama 3.3 70B)

const WORKER_URL = 'https://black-cell-5b71ted.moysan-teddy.workers.dev';

// ----- System prompt de base (partagé entre toutes les phases) -----

const BASE_PROMPT = `Tu es un coach civique créé par Respons'Able. Tu aides les citoyens à préparer leur participation à des délibérations citoyennes (conventions citoyennes, budgets participatifs, assemblées citoyennes, etc.).

PRINCIPES FONDAMENTAUX :
- Tu es ABSOLUMENT non-directif. Tu n'as aucune opinion politique, sociale ou morale sur les sujets abordés.
- Tu ne juges JAMAIS. Aucun sujet n'est tabou : immigration, sécurité, religion, identité, fiscalité, genre, tout est légitime.
- Tu n'essaies JAMAIS de "corriger" ou "rééquilibrer" une opinion. Ton travail est d'aider la personne à explorer et exprimer SA pensée, quelle qu'elle soit.
- Tu ne fais pas la morale, tu ne "recadres" pas.
- Tu es chaleureux, bienveillant et professionnel. Tu tutoies la personne.
- Tu poses des questions ouvertes. Tu reformules pour montrer que tu comprends.
- Tu gardes tes réponses naturelles et concises, comme dans une vraie conversation (3-6 phrases sauf si plus de détail est demandé).

`;

// ----- Définition des 5 phases -----

const PHASES = [
  {
    id: 1,
    name: 'Expression libre',
    description: 'Exprime librement ce qui te préoccupe dans la société',
    welcome: "Bienvenue ! Je suis ton coach civique. Mon rôle est de t'aider à préparer ta participation à la délibération citoyenne. Ici, tous les sujets sont les bienvenus, sans aucun tabou.\n\nDis-moi simplement : qu'est-ce qui te préoccupe dans la société en ce moment ?",
    prompt: `PHASE ACTUELLE : Expression libre
Ton rôle : accueillir ce que la personne exprime sur ce qui la préoccupe dans la société.
- Écoute activement et relance simplement : "Et quoi d'autre ?", "Continue, je t'écoute", "C'est-à-dire ?"
- Ne structure rien, ne propose rien, n'analyse pas encore.
- Laisse la personne s'exprimer sans l'interrompre avec des questions trop profondes.
- Si la personne semble avoir fait le tour, propose doucement de passer à la phase suivante.`
  },
  {
    id: 2,
    name: 'Exploration',
    description: 'Explore ce qui se passe en toi sur ces sujets',
    welcome: "Merci pour ce partage. Maintenant, si tu veux bien, on va aller un peu plus en profondeur. Je vais te poser des questions pour comprendre ce qui se passe en toi sur ces sujets.\n\nQu'est-ce qui te touche personnellement là-dedans ?",
    prompt: `PHASE ACTUELLE : Exploration intérieure
Ton rôle : aider la personne à comprendre ce qui se passe EN ELLE concernant les sujets évoqués.
- Pose des questions sur ses émotions : "Qu'est-ce que ça te fait ressentir ?"
- Explore les valeurs en jeu : "Quelle valeur est touchée pour toi ?"
- Cherche les expériences vécues : "As-tu vécu quelque chose qui éclaire ce ressenti ?"
- Aide à identifier pourquoi CE sujet est important pour elle personnellement.
- Ne juge jamais les émotions exprimées, même la colère ou la peur.`
  },
  {
    id: 3,
    name: 'Clarification',
    description: 'Clarifie et structure ta pensée',
    welcome: "Tu as bien exploré ce que tu ressens. Maintenant, essayons de clarifier ta pensée. On va démêler les faits des ressentis, et trouver ce que tu penses vraiment au fond.\n\nSi tu devais résumer ta position en une phrase, ce serait quoi ?",
    prompt: `PHASE ACTUELLE : Clarification
Ton rôle : aider la personne à passer du ressenti brut à une pensée claire et articulée.
- Aide à distinguer les faits des interprétations personnelles (sans invalider les interprétations).
- Explore les nuances : "Est-ce que c'est toujours vrai ? Y a-t-il des exceptions ?"
- Identifie les éventuelles contradictions avec douceur et curiosité, pas comme des "erreurs".
- Aide à formuler la position de fond : "Au final, qu'est-ce que tu défends vraiment ?"
- Reformule ce que tu comprends et vérifie : "Si je résume, tu penses que... C'est bien ça ?"`
  },
  {
    id: 4,
    name: 'Formulation',
    description: 'Prépare ta prise de parole pour la délibération',
    welcome: "Ta pensée est plus claire maintenant. Préparons ta prise de parole pour la délibération.\n\nComment voudrais-tu exprimer tout ça aux autres citoyens ? Essaie de me le dire comme si tu étais devant le groupe.",
    prompt: `PHASE ACTUELLE : Préparation à l'expression
Ton rôle : aider la personne à préparer concrètement sa prise de parole pour la délibération.
- Aide à structurer 2-3 arguments clairs et concis.
- Travaille le langage : accessible, pas jargonnant, pas agressif.
- Anticipe les objections possibles : "Que pourrait répondre quelqu'un qui n'est pas d'accord ?"
- Propose des formulations concrètes : "Tu pourrais dire quelque chose comme..."
- Demande toujours si la formulation correspond à ce que la personne veut vraiment dire.
- Rappelle que l'objectif est d'être entendu, pas d'avoir raison.`
  },
  {
    id: 5,
    name: 'Simulation',
    description: "Entraîne-toi face à un citoyen qui pense différemment",
    welcome: "C'est le moment de t'entraîner ! Je vais jouer le rôle d'un citoyen qui ne partage pas ton point de vue. Je serai respectueux mais pas d'accord.\n\nL'objectif : que tu t'exerces à écouter un désaccord et à répondre avec assurance.\n\nReprends ta position et je te répondrai en tant que citoyen opposé. On y va ?",
    prompt: `PHASE ACTUELLE : Simulation de délibération
Tu changes de rôle : tu joues maintenant un AUTRE CITOYEN qui participe à la même délibération mais qui a un point de vue DIFFÉRENT.

RÈGLES DE LA SIMULATION :
- Tu es respectueux mais en désaccord. Tu ne te laisses pas convaincre facilement.
- Tu exprimes un point de vue alternatif crédible et argumenté, basé sur ce que la personne a partagé dans les phases précédentes.
- Tu poses des questions qui challengent : "Oui mais comment tu expliques que... ?"
- Tu n'es JAMAIS agressif, méprisant ou de mauvaise foi.
- Si la personne se bloque ou semble frustrée, sors brièvement du rôle en disant "[Pause coach] ..." avec un conseil, puis reprends la simulation.
- Après 4-5 échanges de simulation, propose un debrief : sors du rôle et demande comment la personne s'est sentie, ce qui était difficile, et ce qu'elle retient.`
  }
];

// ----- État de l'application -----

const state = {
  currentPhase: 1,
  visitedPhases: new Set([1]),
  chatHistory: [],
  loading: false
};

// ----- Reconnaissance vocale -----

let speechRecognition = null;
let isRecording = false;
let silenceTimer = null;
const SILENCE_DELAY = 4000; // 4 secondes de silence avant envoi auto

function toggleVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    addCoachMessage("Ton navigateur ne supporte pas la reconnaissance vocale. Essaie Chrome ou Edge !");
    return;
  }

  const micBtn = document.getElementById('mic-btn');
  const input = document.getElementById('input');

  // Si déjà en cours, on stoppe
  if (isRecording && speechRecognition) {
    clearTimeout(silenceTimer);
    speechRecognition.stop();
    return;
  }

  speechRecognition = new SpeechRecognition();
  speechRecognition.lang = 'fr-FR';
  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;

  speechRecognition.onstart = () => {
    isRecording = true;
    micBtn.classList.add('recording');
    input.placeholder = "Je t'écoute... (4s de silence = envoi)";
    input.value = '';
  };

  speechRecognition.onresult = (event) => {
    clearTimeout(silenceTimer);

    let transcript = '';
    for (let i = 0; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    input.value = transcript;

    // 4s sans parole = envoi automatique
    silenceTimer = setTimeout(() => {
      if (input.value.trim()) {
        speechRecognition.stop();
        sendMessage();
      }
    }, SILENCE_DELAY);
  };

  speechRecognition.onerror = (event) => {
    console.error('Speech error:', event.error);
    clearTimeout(silenceTimer);
    isRecording = false;
    micBtn.classList.remove('recording');
    input.placeholder = 'Écris ton message...';
    if (event.error === 'not-allowed') {
      addCoachMessage("Autorise le micro dans ton navigateur pour utiliser la voix !");
    }
  };

  speechRecognition.onend = () => {
    clearTimeout(silenceTimer);
    isRecording = false;
    micBtn.classList.remove('recording');
    input.placeholder = 'Écris ton message...';
  };

  speechRecognition.start();
}

// ----- Initialisation -----

function init() {
  renderPhases();
  updatePhaseInfo();
  setupEventListeners();

  // Message de bienvenue phase 1
  const phase = PHASES[0];
  addCoachMessage(phase.welcome);
  state.chatHistory.push({ role: 'assistant', content: phase.welcome });
}

// ----- Rendu de la barre de phases -----

function renderPhases() {
  const nav = document.getElementById('phases-nav');
  nav.innerHTML = PHASES.map(p => `
    <button class="phase-btn ${p.id === 1 ? 'active' : ''}" data-phase="${p.id}">
      <span class="phase-num">${p.id}</span>
      ${p.name}
    </button>
  `).join('');
}

function updatePhaseButtons() {
  document.querySelectorAll('.phase-btn').forEach(btn => {
    const id = parseInt(btn.dataset.phase);
    btn.classList.remove('active', 'visited');
    if (id === state.currentPhase) {
      btn.classList.add('active');
    } else if (state.visitedPhases.has(id)) {
      btn.classList.add('visited');
    }
  });
}

function updatePhaseInfo() {
  const phase = PHASES.find(p => p.id === state.currentPhase);
  document.getElementById('phase-info').textContent = phase.description;
}

// ----- Changement de phase -----

function switchPhase(phaseId) {
  if (phaseId === state.currentPhase || state.loading) return;

  state.currentPhase = phaseId;
  state.visitedPhases.add(phaseId);

  const phase = PHASES.find(p => p.id === phaseId);

  // Séparateur visuel dans le chat
  addSystemMessage(`Phase ${phase.id} — ${phase.name}`);

  // Message de bienvenue du coach (ajouté à l'historique pour le contexte)
  addCoachMessage(phase.welcome);
  state.chatHistory.push({ role: 'assistant', content: phase.welcome });

  // Mise à jour UI
  updatePhaseButtons();
  updatePhaseInfo();
  scrollToBottom();
}

// ----- Gestion des messages -----

function addCoachMessage(text) {
  const chat = document.getElementById('chat');
  const div = document.createElement('div');
  div.className = 'message message-coach';
  div.innerHTML = `<div class="bubble">${formatText(text)}</div>`;
  chat.appendChild(div);
  scrollToBottom();
}

function addUserMessage(text) {
  const chat = document.getElementById('chat');
  const div = document.createElement('div');
  div.className = 'message message-user';
  div.innerHTML = `<div class="bubble">${formatText(text)}</div>`;
  chat.appendChild(div);
  scrollToBottom();
}

function addSystemMessage(text) {
  const chat = document.getElementById('chat');
  const div = document.createElement('div');
  div.className = 'message-system';
  div.textContent = text;
  chat.appendChild(div);
  scrollToBottom();
}

function formatText(text) {
  // Sécurité : échapper le HTML puis convertir les sauts de ligne
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped.replace(/\n/g, '<br>');
}

function showTyping() {
  const chat = document.getElementById('chat');
  const div = document.createElement('div');
  div.className = 'message message-coach typing';
  div.id = 'typing-indicator';
  div.innerHTML = `<div class="bubble">
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
  </div>`;
  chat.appendChild(div);
  scrollToBottom();
}

function hideTyping() {
  const el = document.getElementById('typing-indicator');
  if (el) el.remove();
}

function scrollToBottom() {
  const chat = document.getElementById('chat');
  requestAnimationFrame(() => {
    chat.scrollTop = chat.scrollHeight;
  });
}

// ----- Envoi de message à l'API -----

async function sendMessage() {
  const input = document.getElementById('input');
  const text = input.value.trim();
  if (!text || state.loading) return;

  // Afficher et enregistrer le message utilisateur
  addUserMessage(text);
  state.chatHistory.push({ role: 'user', content: text });

  // Reset input
  input.value = '';
  input.style.height = 'auto';

  // État loading
  state.loading = true;
  document.getElementById('send-btn').disabled = true;
  showTyping();

  try {
    // Construire le system prompt = base + phase actuelle
    const phase = PHASES.find(p => p.id === state.currentPhase);
    const systemPrompt = BASE_PROMPT + phase.prompt;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...state.chatHistory
    ];

    const response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });

    hideTyping();

    if (!response.ok) throw new Error(`Erreur ${response.status}`);

    const data = await response.json();
    const reply = data.reply || "Hmm, je n'ai pas pu répondre. Réessaie !";

    state.chatHistory.push({ role: 'assistant', content: reply });
    addCoachMessage(reply);

  } catch (err) {
    hideTyping();
    addCoachMessage("Désolé, problème de connexion. Vérifie ta connexion internet et réessaie.");
    console.error('Erreur:', err);
  } finally {
    state.loading = false;
    document.getElementById('send-btn').disabled = false;
    document.getElementById('input').focus();
  }
}

// ----- Event listeners -----

function setupEventListeners() {
  // Bouton envoyer
  document.getElementById('send-btn').addEventListener('click', sendMessage);

  // Bouton micro
  document.getElementById('mic-btn').addEventListener('click', toggleVoice);

  // Entrée = envoyer, Shift+Entrée = nouvelle ligne
  document.getElementById('input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Auto-resize du textarea
  document.getElementById('input').addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
  });

  // Clic sur les boutons de phase
  document.getElementById('phases-nav').addEventListener('click', (e) => {
    const btn = e.target.closest('.phase-btn');
    if (btn) {
      switchPhase(parseInt(btn.dataset.phase));
    }
  });
}

// ----- Lancement -----

document.addEventListener('DOMContentLoaded', init);
