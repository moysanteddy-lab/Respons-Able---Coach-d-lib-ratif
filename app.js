// ============================================
// Coach Civique — Respons'Able
// ============================================

const WORKER_URL = 'https://black-cell-5b71ted.moysan-teddy.workers.dev';

// ----- System prompt de base -----

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

// ----- Phases -----

const PHASES = [
  {
    id: 1,
    name: 'Expression libre',
    description: 'Exprime librement ce qui te préoccupe dans la société',
    welcome: "Bienvenue ! Je suis un assistant conversationnel basé sur l'intelligence artificielle. Avant de commencer, quelques points importants :\n\nJe n'ai pas la science infuse. Malgré ma bonne volonté, je porte les biais — plus ou moins conscients — de mes créateurs et de mes données d'entraînement. C'est ta responsabilité de garder un regard critique sur nos échanges. Voici mes limites :\n\n- Je ne remplace pas une vraie discussion entre citoyens\n- Je peux reproduire des angles morts culturels ou idéologiques sans m'en rendre compte\n- Je ne connais pas ta réalité locale ni ton vécu\n- Mes reformulations peuvent involontairement déformer ta pensée\n\nLes changements sociaux demandent bien plus qu'une conversation avec une IA : ils nécessitent beaucoup de discussions entre humains pour assurer une harmonie sociétale, mais aussi de l'organisation et de l'action concrète. Je suis là pour t'aider à clarifier tes idées et à les formuler pour qu'elles soient entendues — pas pour te dire quoi penser.\n\nCeci dit, tous les sujets sont les bienvenus ici, sans aucun tabou. Dis-moi simplement : qu'est-ce qui te préoccupe dans la société en ce moment ?",
    prompt: `PHASE ACTUELLE : Expression libre
Tu es en mode ÉCOUTE ACTIVE. La personne a besoin de poser ce qui la préoccupe dans la société.

COMPORTEMENT ATTENDU :
- Accueille chaque sujet avec intérêt sincère.
- Relance par des questions simples et ouvertes : "Et quoi d'autre ?", "Continue, je t'écoute", "Qu'est-ce que tu veux dire par là ?"
- NE PAS analyser ni reformuler en profondeur (c'est la phase 3).
- NE PAS poser de questions sur les émotions ou les valeurs (c'est la phase 2).
- NE PAS structurer les idées (c'est la phase 4).

TRANSITION : Quand la personne semble avoir fait le tour (elle se répète, dit "voilà c'est tout", hésite longuement), propose explicitement :
"Tu as l'air d'avoir fait un bon tour de tes préoccupations. Si tu te sens prêt(e), on peut passer à la Phase 2 pour explorer ce qui se passe en toi sur ces sujets. Clique sur le bouton Phase 2 en haut quand tu veux."`
  },
  {
    id: 2,
    name: 'Exploration',
    description: 'Explore ce qui se passe en toi sur ces sujets',
    welcome: "Merci pour ce partage. Maintenant, si tu veux bien, on va aller un peu plus en profondeur. Je vais te poser des questions pour comprendre ce qui se passe en toi sur ces sujets.\n\nQu'est-ce qui te touche personnellement là-dedans ?",
    prompt: `PHASE ACTUELLE : Exploration intérieure
Tu es en mode QUESTIONNEMENT PROFOND. La personne a exprimé ses préoccupations, maintenant tu creuses ce qui se passe EN ELLE.

COMPORTEMENT ATTENDU :
- RESTE FOCALISÉ sur les émotions, les valeurs, les expériences vécues.
- Questions types : "Qu'est-ce que ça te fait ressentir ?", "Quelle valeur est touchée pour toi ?", "As-tu vécu quelque chose qui éclaire ce ressenti ?"
- Aide à identifier pourquoi CE sujet est important pour elle personnellement.
- Ne juge jamais les émotions exprimées, même la colère, la peur ou le dégoût.
- NE PAS passer à la clarification logique (c'est la phase 3).

TRANSITION : Quand la personne a identifié ses émotions et valeurs clés, propose :
"Je sens que tu as bien cerné ce qui se joue en toi. Si tu veux, on peut passer à la Phase 3 pour clarifier et structurer ta pensée. Clique sur Phase 3 en haut quand tu es prêt(e)."`
  },
  {
    id: 3,
    name: 'Clarification',
    description: 'Clarifie et structure ta pensée',
    welcome: "Tu as bien exploré ce que tu ressens. Maintenant, essayons de clarifier ta pensée. On va démêler les faits des ressentis, et trouver ce que tu penses vraiment au fond.\n\nSi tu devais résumer ta position en une phrase, ce serait quoi ?",
    prompt: `PHASE ACTUELLE : Clarification
Tu es en mode STRUCTURATION. La personne a exploré ses émotions, maintenant tu l'aides à passer du ressenti à la pensée articulée.

COMPORTEMENT ATTENDU :
- Aide à distinguer les faits des interprétations personnelles (sans invalider les interprétations).
- Explore les nuances : "Est-ce que c'est toujours vrai ? Y a-t-il des exceptions ?"
- Identifie les contradictions avec douceur et curiosité, pas comme des "erreurs".
- Aide à formuler la position de fond : "Au final, qu'est-ce que tu défends vraiment ?"
- Reformule et vérifie : "Si je résume, tu penses que... C'est bien ça ?"
- NE PAS travailler la formulation pour les autres (c'est la phase 4).

TRANSITION : Quand la position est claire et articulée, propose :
"Ta pensée est bien plus claire maintenant. Tu veux passer à la Phase 4 pour préparer comment l'exprimer aux autres lors de la délibération ? Clique sur Phase 4 en haut."`
  },
  {
    id: 4,
    name: 'Formulation',
    description: 'Prépare ta prise de parole pour la délibération',
    welcome: "Ta pensée est plus claire maintenant. Préparons ta prise de parole pour la délibération.\n\nComment voudrais-tu exprimer tout ça aux autres citoyens ? Essaie de me le dire comme si tu étais devant le groupe.",
    prompt: `PHASE ACTUELLE : Préparation à l'expression
Tu es en mode COACH D'EXPRESSION. La personne sait ce qu'elle pense, maintenant tu l'aides à le dire de façon percutante et accessible.

COMPORTEMENT ATTENDU :
- Aide à structurer 2-3 arguments clairs et concis.
- Travaille le langage : accessible, pas jargonnant, pas agressif.
- Anticipe les objections : "Que pourrait répondre quelqu'un qui n'est pas d'accord ?"
- Propose des formulations concrètes : "Tu pourrais dire quelque chose comme..."
- Vérifie toujours : "Est-ce que ça correspond à ce que tu veux vraiment dire ?"
- Rappelle que l'objectif est d'être entendu, pas d'avoir raison.
- NE PAS rejouer les phases précédentes (émotions, clarification).

TRANSITION : Quand les arguments sont prêts, propose :
"Tes arguments sont solides. Tu veux passer à la Phase 5 pour t'entraîner face à quelqu'un qui pense différemment ? Clique sur Phase 5 en haut. Sinon, tu peux aussi générer ta synthèse avec le bouton vert."`
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
- Après 4-5 échanges de simulation, propose un debrief : sors du rôle et demande comment la personne s'est sentie, ce qui était difficile, et ce qu'elle retient.
- Après le debrief, suggère de générer la synthèse avec le bouton vert.`
  }
];

// ----- Infos phases (bulle "i") -----

const PHASE_INFO = {
  1: {
    title: 'Phase 1 — Expression libre',
    why: 'Poser ce qui te pèse, sans filtre ni censure.',
    benefit: 'Vider le trop-plein pour pouvoir penser clairement ensuite.',
    tip: 'Pas besoin d\'être structuré, dis les choses comme elles viennent.'
  },
  2: {
    title: 'Phase 2 — Exploration intérieure',
    why: 'Comprendre d\'où viennent tes convictions.',
    benefit: 'Une conscience plus fine de ce qui te motive vraiment.',
    tip: 'Il n\'y a pas de mauvaise émotion — même la colère a quelque chose à dire.'
  },
  3: {
    title: 'Phase 3 — Clarification',
    why: 'Passer du "je sens que" au "je pense que".',
    benefit: 'Une position claire que tu peux défendre.',
    tip: 'Avoir des contradictions c\'est normal, ça veut dire que tu réfléchis.'
  },
  4: {
    title: 'Phase 4 — Formulation',
    why: 'Être compris par ceux qui ne pensent pas comme toi.',
    benefit: 'Des arguments prêts pour la délibération.',
    tip: 'L\'objectif n\'est pas d\'avoir raison mais d\'être entendu.'
  },
  5: {
    title: 'Phase 5 — Simulation',
    why: 'S\'entraîner à garder son calme face au désaccord.',
    benefit: 'De la confiance pour le jour J.',
    tip: 'Écouter l\'autre ne veut pas dire être d\'accord avec lui.'
  }
};

// ----- Formes de mobilisation citoyenne (Boîte à outils) -----

const MOBILISATION_FORMS = [
  {
    name: 'Pétition',
    description: 'Recueil de signatures pour interpeller les pouvoirs publics sur un sujet. Peut être lancée en ligne ou en physique.',
    advantages: [
      'Accessible à tous, faible barrière à l\'entrée',
      'Mesurable : le nombre de signatures crée une pression',
      'Peut déclencher un débat médiatique'
    ],
    limits: [
      'Facilement ignorée si pas relayée massivement',
      'Risque de "slacktivisme" (signer sans s\'engager plus)',
      'Aucune obligation légale de réponse'
    ],
    example: 'L\'Affaire du Siècle (France, 2018) — 2,3 millions de signatures pour action climatique. A mené au premier procès contre l\'État français pour inaction climatique, que l\'État a perdu.'
  },
  {
    name: 'Manifestation',
    description: 'Mobilisation physique dans l\'espace public pour rendre visible une cause et exercer une pression collective.',
    advantages: [
      'Forte visibilité médiatique',
      'Crée un sentiment de puissance collective',
      'Pression directe sur les décideurs'
    ],
    limits: [
      'Impact souvent éphémère sans suite organisée',
      'Risque de récupération politique ou de débordements',
      'Peut braquer l\'opinion publique si mal perçue'
    ],
    example: 'Marches pour le climat (2018-2019) — Des millions de personnes dans 150 pays. Portées par la jeunesse, elles ont accéléré l\'inscription du climat dans l\'agenda politique mondial.'
  },
  {
    name: 'Budget participatif',
    description: 'Les citoyens proposent et votent directement pour des projets financés par une partie du budget public de leur collectivité.',
    advantages: [
      'Pouvoir décisionnel réel : les projets votés sont réalisés',
      'Résultats concrets et visibles dans le quotidien',
      'Éducation citoyenne sur la gestion des fonds publics'
    ],
    limits: [
      'Souvent limité à un petit pourcentage du budget total',
      'Tendance à favoriser les projets visibles (bancs, parcs) au détriment du structurel',
      'Participation parfois faible et peu représentative'
    ],
    example: 'Porto Alegre (Brésil, 1989) — Premier budget participatif au monde. En 10 ans, l\'accès à l\'eau potable est passé de 75% à 98% de la population grâce aux priorités définies par les citoyens.'
  },
  {
    name: 'Convention citoyenne',
    description: 'Panel de citoyens tirés au sort qui délibèrent en profondeur sur un sujet complexe, avec l\'aide d\'experts, et formulent des propositions.',
    advantages: [
      'Représentativité par tirage au sort (diversité sociale)',
      'Délibération approfondie sur plusieurs mois',
      'Forte légitimité démocratique des propositions'
    ],
    limits: [
      'Coûteux et long à organiser',
      'Pas toujours suivi d\'effets concrets',
      'Les participants ne représentent qu\'un petit échantillon'
    ],
    example: 'Convention Citoyenne pour le Climat (France, 2019-2020) — 150 citoyens tirés au sort, 149 propositions. Malgré une mise en oeuvre partielle, elle a démontré la capacité des citoyens ordinaires à traiter des sujets complexes.'
  },
  {
    name: 'Conseil de quartier',
    description: 'Instance locale de démocratie de proximité où les habitants échangent avec les élus sur les sujets qui concernent leur quartier.',
    advantages: [
      'Ancrage local : traite des problèmes concrets du quotidien',
      'Régularité des rencontres (lien durable avec les élus)',
      'Ouvert à tous sans condition'
    ],
    limits: [
      'Souvent consultatif seulement (pas de pouvoir décisionnel)',
      'Participation souvent faible et vieillissante',
      'Risque de noyautage par des habitués'
    ],
    example: 'Conseils de quartier parisiens (loi Vaillant, 2002) — Obligatoires dans les villes de +80 000 habitants. Résultats variables : très actifs dans certaines villes, purement formels dans d\'autres.'
  },
  {
    name: 'Association / Collectif citoyen',
    description: 'Groupe structuré de citoyens organisés autour d\'une cause, avec un cadre juridique (loi 1901) ou informel.',
    advantages: [
      'Action durable et structurée dans le temps',
      'Cadre juridique qui permet de recevoir des fonds, agir en justice',
      'Capacité d\'expertise et de plaidoyer'
    ],
    limits: [
      'Dépendance au bénévolat (risque d\'essoufflement)',
      'Complexité administrative',
      'Peut se professionnaliser et perdre son ancrage citoyen'
    ],
    example: 'ATD Quart Monde (1957) — Pionnière de la participation des personnes en précarité aux décisions publiques. A contribué à la loi contre l\'exclusion de 1998 et à la création du RSA.'
  },
  {
    name: 'Référendum local',
    description: 'Vote direct des citoyens sur une question locale. Le résultat peut être consultatif ou décisionnel selon le cadre.',
    advantages: [
      'Décision directe et démocratiquement légitime',
      'Forte mobilisation et intérêt citoyen',
      'Tranche les débats de manière claire'
    ],
    limits: [
      'Question binaire oui/non : simplifie des enjeux complexes',
      'Conditions de validité strictes (seuils de participation)',
      'Peut être instrumentalisé politiquement'
    ],
    example: 'Référendum de Notre-Dame-des-Landes (2016) — 55% pour la construction de l\'aéroport, mais le projet a finalement été abandonné en 2018 face à la mobilisation continue sur le terrain.'
  },
  {
    name: 'Initiative citoyenne',
    description: 'Mécanisme par lequel les citoyens peuvent proposer directement une loi, un référendum ou mettre un sujet à l\'agenda politique.',
    advantages: [
      'Pouvoir d\'initiative directe du peuple',
      'Contourne l\'inertie des représentants',
      'Force le débat public sur un sujet ignoré'
    ],
    limits: [
      'Seuils de signatures souvent très élevés',
      'Processus long et complexe',
      'Peut être instrumentalisée par des lobbys'
    ],
    example: 'Initiative citoyenne européenne "Right2Water" (2013) — Première ICE à atteindre le million de signatures requis (1,8M au total). A mené à une directive européenne garantissant l\'accès à l\'eau potable.'
  }
];

// ----- État -----

const state = {
  currentPhase: 1,
  visitedPhases: new Set([1]),
  chatHistory: [],
  loading: false,
  currentView: 'coach'
};

// ----- Reconnaissance vocale -----

let speechRecognition = null;
let isRecording = false;
let silenceTimer = null;
let voiceTranscript = '';
const SILENCE_DELAY = 4000;

function toggleVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    addCoachMessage("Ton navigateur ne supporte pas la reconnaissance vocale. Essaie Chrome ou Edge !");
    return;
  }

  if (isRecording) {
    isRecording = false;
    clearTimeout(silenceTimer);
    if (speechRecognition) speechRecognition.stop();
    return;
  }

  voiceTranscript = '';
  isRecording = true;
  document.getElementById('mic-btn').classList.add('recording');
  const input = document.getElementById('input');
  input.placeholder = "Je t'écoute... (4s de silence = envoi)";
  input.value = '';

  startRecognition();
}

function startRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const input = document.getElementById('input');
  const micBtn = document.getElementById('mic-btn');

  speechRecognition = new SpeechRecognition();
  speechRecognition.lang = 'fr-FR';
  speechRecognition.continuous = false;
  speechRecognition.interimResults = true;

  speechRecognition.onresult = (event) => {
    clearTimeout(silenceTimer);
    let interim = '';
    for (let i = 0; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        voiceTranscript += event.results[i][0].transcript + ' ';
      } else {
        interim += event.results[i][0].transcript;
      }
    }
    input.value = voiceTranscript + interim;

    silenceTimer = setTimeout(() => {
      if (input.value.trim()) {
        isRecording = false;
        if (speechRecognition) speechRecognition.stop();
        sendMessage();
      }
    }, SILENCE_DELAY);
  };

  speechRecognition.onerror = (event) => {
    console.error('Speech error:', event.error);
    if (event.error === 'no-speech' && isRecording) {
      try { startRecognition(); } catch (e) {}
      return;
    }
    clearTimeout(silenceTimer);
    isRecording = false;
    micBtn.classList.remove('recording');
    input.placeholder = 'Écris ton message...';
    if (event.error === 'not-allowed') {
      addCoachMessage("Autorise le micro dans ton navigateur pour utiliser la voix !");
    }
  };

  speechRecognition.onend = () => {
    if (isRecording) {
      try { startRecognition(); } catch (e) {
        isRecording = false;
        micBtn.classList.remove('recording');
        input.placeholder = 'Écris ton message...';
      }
    } else {
      clearTimeout(silenceTimer);
      micBtn.classList.remove('recording');
      input.placeholder = 'Écris ton message...';
    }
  };

  try { speechRecognition.start(); } catch (e) {
    isRecording = false;
    micBtn.classList.remove('recording');
  }
}

// ----- Init -----

function init() {
  renderPhases();
  renderToolbox();
  updatePhaseInfo();
  setupEventListeners();

  const phase = PHASES[0];
  addCoachMessage(phase.welcome);
  state.chatHistory.push({ role: 'assistant', content: phase.welcome });
}

// ----- Navigation entre vues -----

function switchView(viewId) {
  state.currentView = viewId;

  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + viewId).classList.add('active');

  document.querySelectorAll('.menu-item[data-view]').forEach(item => {
    item.classList.toggle('active', item.dataset.view === viewId);
  });

  const title = document.getElementById('view-title');
  const subtitle = document.getElementById('view-subtitle');

  if (viewId === 'coach') {
    title.textContent = 'Coach Civique';
    subtitle.textContent = 'Prépare ta voix pour la délibération';
  } else if (viewId === 'toolbox') {
    title.textContent = 'Boîte à outils';
    subtitle.textContent = 'Formes de mobilisation citoyenne';
  }

  closeMenu();
}

// ----- Menu latéral -----

function openMenu() {
  document.getElementById('side-menu').classList.add('open');
  document.getElementById('menu-overlay').classList.add('visible');
}

function closeMenu() {
  document.getElementById('side-menu').classList.remove('open');
  document.getElementById('menu-overlay').classList.remove('visible');
}

// ----- Phases -----

function renderPhases() {
  const nav = document.getElementById('phases-nav');
  const phaseBtns = PHASES.map(p => `
    <button class="phase-btn ${p.id === 1 ? 'active' : ''}" data-phase="${p.id}">
      <span class="phase-num">${p.id}</span>
      ${p.name}
    </button>
  `).join('');
  nav.innerHTML = phaseBtns + `<button class="synth-btn" id="synth-btn">Ma synthèse</button>`;
}

function updatePhaseButtons() {
  document.querySelectorAll('.phase-btn').forEach(btn => {
    const id = parseInt(btn.dataset.phase);
    btn.classList.remove('active', 'visited');
    if (id === state.currentPhase) btn.classList.add('active');
    else if (state.visitedPhases.has(id)) btn.classList.add('visited');
  });
}

function updatePhaseInfo() {
  const phase = PHASES.find(p => p.id === state.currentPhase);
  document.getElementById('phase-info-text').textContent = phase.description;
}

function switchPhase(phaseId) {
  if (phaseId === state.currentPhase || state.loading) return;
  state.currentPhase = phaseId;
  state.visitedPhases.add(phaseId);
  const phase = PHASES.find(p => p.id === phaseId);
  addSystemMessage(`Phase ${phase.id} — ${phase.name}`);
  addCoachMessage(phase.welcome);
  state.chatHistory.push({ role: 'assistant', content: phase.welcome });
  updatePhaseButtons();
  updatePhaseInfo();
  scrollToBottom();
}

// ----- Messages -----

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

function addActionButton(text, onClick) {
  const chat = document.getElementById('chat');
  const div = document.createElement('div');
  div.className = 'message-action';
  const btn = document.createElement('button');
  btn.className = 'action-btn';
  btn.textContent = text;
  btn.addEventListener('click', onClick);
  div.appendChild(btn);
  chat.appendChild(div);
  scrollToBottom();
}

function formatText(text) {
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
  requestAnimationFrame(() => { chat.scrollTop = chat.scrollHeight; });
}

// ----- Envoi de message -----

async function sendMessage() {
  const input = document.getElementById('input');
  const text = input.value.trim();
  if (!text || state.loading) return;

  addUserMessage(text);
  state.chatHistory.push({ role: 'user', content: text });
  input.value = '';
  input.style.height = 'auto';

  state.loading = true;
  document.getElementById('send-btn').disabled = true;
  showTyping();

  try {
    const phase = PHASES.find(p => p.id === state.currentPhase);
    const messages = [
      { role: 'system', content: BASE_PROMPT + phase.prompt },
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

// ----- Modal info phase -----

function showPhaseInfo() {
  const info = PHASE_INFO[state.currentPhase];
  if (!info) return;
  document.getElementById('info-modal-title').textContent = info.title;
  document.getElementById('info-modal-body').innerHTML = `
    <div class="modal-field">
      <div class="modal-label">Pourquoi cette phase</div>
      <div class="modal-value">${info.why}</div>
    </div>
    <div class="modal-field">
      <div class="modal-label">Ce que ça t'apporte</div>
      <div class="modal-value">${info.benefit}</div>
    </div>
    <div class="modal-field">
      <div class="modal-label">Conseil</div>
      <div class="modal-value">${info.tip}</div>
    </div>
  `;
  document.getElementById('info-modal').classList.add('visible');
}

function hidePhaseInfo() {
  document.getElementById('info-modal').classList.remove('visible');
}

// ----- Synthèse -----

async function generateSynthesis() {
  if (state.loading) return;
  if (state.chatHistory.length < 4) {
    addCoachMessage("Échange encore un peu avec moi avant de générer ta synthèse — j'ai besoin de matière pour te faire un bon résumé !");
    return;
  }

  state.loading = true;
  document.getElementById('send-btn').disabled = true;
  addSystemMessage("Génération de ta synthèse...");
  showTyping();

  const synthPrompt = BASE_PROMPT + `Tu dois maintenant produire une SYNTHÈSE complète du parcours de cette personne.

Structure ta synthèse ainsi :

CE QUI ME PRÉOCCUPE
Résume les sujets évoqués en phase 1.

CE QUE JE RESSENS
Résume les émotions et valeurs identifiées en phase 2.

CE QUE JE PENSE
Résume la position clarifiée en phase 3.

COMMENT JE VEUX LE DIRE
Résume les arguments formulés en phase 4.

CE QUE J'AI APPRIS DE LA SIMULATION
Résume les enseignements de la phase 5 (si elle a eu lieu).

RÈGLES : Sois fidèle à ce que la personne a dit. Ne rajoute rien de ton cru. Utilise ses mots quand c'est possible. Si une phase n'a pas été abordée, indique-le simplement.`;

  try {
    const messages = [
      { role: 'system', content: synthPrompt },
      ...state.chatHistory,
      { role: 'user', content: 'Génère ma synthèse complète.' }
    ];

    const response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });

    hideTyping();
    if (!response.ok) throw new Error(`Erreur ${response.status}`);

    const data = await response.json();
    const reply = data.reply || "Impossible de générer la synthèse. Réessaie !";
    addCoachMessage(reply);

    // Bouton "Aller plus loin"
    addActionButton('Aller plus loin → Boîte à outils', () => switchView('toolbox'));

  } catch (err) {
    hideTyping();
    addCoachMessage("Désolé, impossible de générer la synthèse. Vérifie ta connexion.");
    console.error('Erreur:', err);
  } finally {
    state.loading = false;
    document.getElementById('send-btn').disabled = false;
  }
}

// ----- Boîte à outils (rendu) -----

function renderToolbox() {
  const container = document.getElementById('toolbox-content');
  const intro = `
    <div class="toolbox-intro">
      <h2>Se mobiliser : par où commencer ?</h2>
      <p>Clarifier ses idées c'est bien. Les porter dans le monde réel, c'est mieux. Voici les principales formes de mobilisation citoyenne, avec leurs forces, leurs limites, et des exemples concrets de ce qu'elles ont produit.</p>
    </div>
  `;

  const cards = MOBILISATION_FORMS.map((form, i) => `
    <div class="toolbox-card" id="card-${i}">
      <div class="card-header" onclick="toggleCard(${i})">
        <h3>${form.name}</h3>
        <span class="card-toggle">+</span>
      </div>
      <div class="card-body">
        <p class="card-description">${form.description}</p>
        <div class="card-section">
          <div class="card-section-title">Avantages</div>
          <ul class="card-advantages">
            ${form.advantages.map(a => `<li>${a}</li>`).join('')}
          </ul>
        </div>
        <div class="card-section">
          <div class="card-section-title">Limites</div>
          <ul class="card-limits">
            ${form.limits.map(l => `<li>${l}</li>`).join('')}
          </ul>
        </div>
        <div class="card-section">
          <div class="card-section-title">Exemple historique</div>
          <div class="card-example">${form.example}</div>
        </div>
      </div>
    </div>
  `).join('');

  container.innerHTML = intro + `<div class="toolbox-cards">${cards}</div>`;
}

function toggleCard(index) {
  const card = document.getElementById('card-' + index);
  card.classList.toggle('open');
}

// ----- Event listeners -----

function setupEventListeners() {
  document.getElementById('send-btn').addEventListener('click', sendMessage);
  document.getElementById('mic-btn').addEventListener('click', toggleVoice);

  document.getElementById('input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  document.getElementById('input').addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
  });

  // Phases + synthèse
  document.getElementById('phases-nav').addEventListener('click', (e) => {
    const phaseBtn = e.target.closest('.phase-btn');
    if (phaseBtn) { switchPhase(parseInt(phaseBtn.dataset.phase)); return; }
    const synthBtn = e.target.closest('.synth-btn');
    if (synthBtn) generateSynthesis();
  });

  // Info modal
  document.getElementById('info-btn').addEventListener('click', showPhaseInfo);
  document.getElementById('info-modal-close').addEventListener('click', hidePhaseInfo);
  document.getElementById('info-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) hidePhaseInfo();
  });

  // Menu
  document.getElementById('hamburger').addEventListener('click', openMenu);
  document.getElementById('menu-close').addEventListener('click', closeMenu);
  document.getElementById('menu-overlay').addEventListener('click', closeMenu);

  // Navigation menu
  document.querySelectorAll('.menu-item[data-view]').forEach(item => {
    item.addEventListener('click', () => switchView(item.dataset.view));
  });
}

// ----- Lancement -----

document.addEventListener('DOMContentLoaded', init);
