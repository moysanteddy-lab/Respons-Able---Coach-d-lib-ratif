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

const TOOLBOX_CATEGORIES = [
  {
    id: 'participation',
    name: 'Dispositifs de participation',
    subtitle: 'Les cadres institutionnels qui te donnent une place dans la décision',
    forms: [
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
    ]
  },
  {
    id: 'action',
    name: 'Actions citoyennes',
    subtitle: 'Les moyens de pression directe pour se faire entendre',
    forms: [
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
        name: 'Grève',
        description: 'Cessation collective et concertée du travail pour faire pression sur un employeur, un secteur ou l\'État. Droit constitutionnel en France depuis 1946.',
        advantages: [
          'Impact économique direct et mesurable',
          'Droit constitutionnel protégé — ne peut pas être interdit',
          'Solidarité forte entre grévistes, crée un rapport de force'
        ],
        limits: [
          'Coût financier pour les grévistes (perte de salaire)',
          'Peut diviser l\'opinion publique (usagers pénalisés)',
          'Nécessite un taux de participation élevé pour être efficace'
        ],
        example: 'Mai 68 (France) — 10 millions de grévistes, plus grand mouvement social français. A abouti aux accords de Grenelle : +35% du SMIC, création de la section syndicale d\'entreprise, et une transformation culturelle durable.'
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
        name: 'Boycott',
        description: 'Refus collectif et organisé d\'acheter un produit, d\'utiliser un service ou de fréquenter une entreprise pour la forcer à changer ses pratiques.',
        advantages: [
          'Touche directement au portefeuille — le seul langage que certains comprennent',
          'Peut être mené sans organisation formelle (viral sur les réseaux)',
          'Force la transparence : les marques craignent l\'image publique'
        ],
        limits: [
          'Difficile à maintenir dans la durée (lassitude des consommateurs)',
          'Peut pénaliser les salariés plutôt que les dirigeants',
          'Effet parfois dilué si le marché offre peu d\'alternatives'
        ],
        example: 'Boycott de Montgomery (USA, 1955-1956) — 381 jours de boycott des bus par la communauté afro-américaine après l\'arrestation de Rosa Parks. A abouti à la fin de la ségrégation dans les transports publics et lancé le mouvement des droits civiques.'
      }
    ]
  },
  {
    id: 'unconventional',
    name: 'Formes non-conventionnelles',
    subtitle: 'Quand les voies classiques ne suffisent plus',
    forms: [
      {
        name: 'Désobéissance civile',
        description: 'Violation délibérée, publique et non-violente d\'une loi ou d\'une règle jugée injuste, en acceptant les conséquences juridiques.',
        advantages: [
          'Impact symbolique puissant — expose l\'injustice au grand jour',
          'Tradition philosophique solide (Thoreau, Gandhi, King)',
          'Peut accélérer des changements que des décennies de lobbying n\'ont pas obtenus'
        ],
        limits: [
          'Risque juridique réel (amendes, prison)',
          'Peut être mal compris ou rejeté par l\'opinion publique',
          'Nécessite une discipline non-violente stricte pour garder sa légitimité'
        ],
        example: 'Faucheurs volontaires d\'OGM (France, 2003-2010) — Destruction assumée et publique de champs OGM en plein air. Malgré les condamnations, a contribué au moratoire français sur les cultures OGM en 2008, confirmé depuis.'
      },
      {
        name: 'Occupation / ZAD',
        description: 'Occupation physique d\'un lieu (terrain, bâtiment, espace public) pour empêcher un projet contesté ou créer une alternative concrète.',
        advantages: [
          'Crée un fait accompli — bloque physiquement un projet',
          'Permet d\'expérimenter d\'autres modes de vie sur place',
          'Forte couverture médiatique et pouvoir symbolique'
        ],
        limits: [
          'Exposition à l\'expulsion et à la répression policière',
          'Conditions de vie difficiles (précarité, météo)',
          'Risque de marginalisation si le projet est perçu comme radical'
        ],
        example: 'ZAD de Notre-Dame-des-Landes (2008-2018) — Occupation de 1 650 hectares pendant 10 ans contre un projet d\'aéroport. Le projet a été abandonné en 2018. Certains occupants sont restés et développent des projets agricoles alternatifs.'
      },
      {
        name: 'Lanceur d\'alerte',
        description: 'Personne qui révèle publiquement des informations cachées sur des pratiques illégales, dangereuses ou contraires à l\'intérêt général.',
        advantages: [
          'Peut provoquer des changements massifs à partir d\'une seule révélation',
          'Protection juridique renforcée en France depuis la loi Sapin 2 (2016) et la loi Waserman (2022)',
          'Rôle essentiel de contre-pouvoir face aux institutions opaques'
        ],
        limits: [
          'Risques personnels majeurs : licenciement, harcèlement, procès',
          'Protection juridique encore insuffisante malgré les lois',
          'Isolement social et professionnel fréquent'
        ],
        example: 'Irène Frachon (France, 2007-2010) — Pneumologue qui a révélé le scandale du Mediator (Servier), médicament responsable de 500 à 2 000 morts. Malgré les pressions du laboratoire, elle a obtenu le retrait du médicament et la condamnation de Servier.'
      },
      {
        name: 'Art engagé / Culture militante',
        description: 'Utilisation de l\'art (street art, théâtre de rue, musique, documentaire, détournement publicitaire) comme outil de sensibilisation et de mobilisation.',
        advantages: [
          'Touche les gens par l\'émotion, pas juste par l\'argument',
          'Contourne la saturation de l\'info classique — marque les esprits',
          'Accessible à tous : pas besoin d\'être artiste professionnel'
        ],
        limits: [
          'Impact difficilement mesurable',
          'Risque de rester dans le symbolique sans effet politique concret',
          'Peut être récupéré par le marketing (artwashing)'
        ],
        example: 'Banksy (international) — Son oeuvre sur le mur de séparation en Palestine a mondialement visibilisé la question. "Girl with Balloon" auto-détruite chez Sotheby\'s a généré un débat mondial sur l\'art et le marché. Dismaland a attiré 150 000 visiteurs autour d\'une critique radicale du consumérisme.'
      },
      {
        name: 'Action en justice citoyenne',
        description: 'Utilisation des tribunaux par des citoyens ou associations pour contraindre l\'État ou des entreprises à respecter leurs obligations (environnementales, sociales, sanitaires).',
        advantages: [
          'Force contraignante : une décision de justice s\'impose',
          'Crée des précédents juridiques qui profitent à tous',
          'Peut obtenir ce que le politique refuse de faire'
        ],
        limits: [
          'Procédures longues (années) et coûteuses',
          'Nécessite des compétences juridiques pointues',
          'Les décisions ne sont pas toujours appliquées'
        ],
        example: 'Affaire Urgenda (Pays-Bas, 2015-2019) — 886 citoyens ont attaqué l\'État néerlandais pour inaction climatique. Victoire en Cour suprême : l\'État obligé de réduire ses émissions de 25% avant fin 2020. Première décision au monde contraignant un État sur le climat.'
      }
    ]
  }
];

// ----- Suggestions de relance par phase -----

const PHASE_SUGGESTIONS = {
  1: [
    "J'ai aussi un truc qui me dérange...",
    "Je ne sais pas par où commencer",
    "C'est tout pour le moment"
  ],
  2: [
    "Ça me met en colère quand j'y pense",
    "Je ne sais pas ce que je ressens",
    "C'est lié à quelque chose que j'ai vécu"
  ],
  3: [
    "Je crois que ma position c'est...",
    "Je me contredis peut-être",
    "Reformule-moi ce que tu comprends"
  ],
  4: [
    "Essaie de me résumer ça simplement",
    "Et si on me répond que... ?",
    "Je veux que ce soit percutant"
  ],
  5: [
    "Vas-y, challenge-moi",
    "J'ai du mal à répondre là",
    "Je veux faire le debrief"
  ]
};

// ----- État -----

const state = {
  currentPhase: 1,
  visitedPhases: new Set([1]),
  chatHistory: [],
  loading: false,
  currentView: 'coach'
};

// ----- Persistence localStorage -----

const STORAGE_KEY = 'responsable-coach-session';

function saveSession() {
  try {
    const data = {
      currentPhase: state.currentPhase,
      visitedPhases: [...state.visitedPhases],
      chatHistory: state.chatHistory,
      timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Impossible de sauvegarder la session:', e);
  }
}

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    // Sessions de plus de 24h = expirées
    if (Date.now() - data.timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return data;
  } catch (e) {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
  state.currentPhase = 1;
  state.visitedPhases = new Set([1]);
  state.chatHistory = [];
  document.getElementById('chat').innerHTML = '';
  updatePhaseButtons();
  updatePhaseInfo();
  const phase = PHASES[0];
  addCoachMessage(phase.welcome);
  state.chatHistory.push({ role: 'assistant', content: phase.welcome });
  saveSession();
  updateProgress();
  showSuggestions();
}

// ----- Mémoire du sujet principal -----

function getTopicContext() {
  // Récupère les 3 premiers messages utilisateur pour identifier le sujet
  const userMessages = state.chatHistory
    .filter(m => m.role === 'user')
    .slice(0, 3)
    .map(m => m.content);
  if (userMessages.length === 0) return '';
  // Concaténation tronquée pour pas surcharger le prompt
  return userMessages.join(' | ').substring(0, 500);
}

// ----- Notification sonore -----

function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.setValueAtTime(1047, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) { /* Audio not available */ }
}

// ----- Mode sombre -----

function initDarkMode() {
  const toggle = document.getElementById('dark-mode-toggle');
  const saved = localStorage.getItem('responsable-dark-mode');
  if (saved === 'true') {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggle.checked = true;
    document.querySelector('meta[name="theme-color"]').content = '#1a2332';
  }
  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('responsable-dark-mode', 'true');
      document.querySelector('meta[name="theme-color"]').content = '#1a2332';
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('responsable-dark-mode', 'false');
      document.querySelector('meta[name="theme-color"]').content = '#1e3a5f';
    }
  });
}

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
  initDarkMode();
  renderPhases();
  renderToolbox();
  setupEventListeners();

  const saved = loadSession();
  if (saved && saved.chatHistory.length > 0) {
    // Restaurer la session
    state.currentPhase = saved.currentPhase;
    state.visitedPhases = new Set(saved.visitedPhases);
    state.chatHistory = saved.chatHistory;
    updatePhaseButtons();
    updatePhaseInfo();
    restoreChat(saved.chatHistory);
    addSystemMessage('Session restaurée — tu peux reprendre où tu en étais.');
    updateProgress();
    showSuggestions();
  } else {
    updatePhaseInfo();
    const phase = PHASES[0];
    addCoachMessage(phase.welcome);
    state.chatHistory.push({ role: 'assistant', content: phase.welcome });
    saveSession();
    updateProgress();
    showSuggestions();
  }
}

function restoreChat(history) {
  const chat = document.getElementById('chat');
  let lastPhase = 1;
  history.forEach(msg => {
    if (msg.role === 'user') {
      addUserMessage(msg.content);
    } else if (msg.role === 'assistant') {
      addCoachMessage(msg.content);
    }
  });
  scrollToBottom();
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
    const numSpan = btn.querySelector('.phase-num');
    if (id === state.currentPhase) {
      btn.classList.add('active');
      numSpan.textContent = id;
    } else if (state.visitedPhases.has(id)) {
      btn.classList.add('visited');
      numSpan.innerHTML = '&#10003;'; // checkmark
    } else {
      numSpan.textContent = id;
    }
  });
}

function updateProgress() {
  const pct = (state.visitedPhases.size / PHASES.length) * 100;
  const fill = document.getElementById('progress-fill');
  if (fill) fill.style.width = pct + '%';
}

function scrollPhaseIntoView(phaseId) {
  const btn = document.querySelector(`.phase-btn[data-phase="${phaseId}"]`);
  if (btn) {
    btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
}

const PHASE_PLACEHOLDERS = {
  1: "Dis-moi ce qui te préoccupe...",
  2: "Qu'est-ce que ça te fait ressentir ?",
  3: "Essaie de résumer ta position...",
  4: "Comment tu le dirais aux autres ?",
  5: "Défends ta position..."
};

function updatePhaseInfo() {
  const phase = PHASES.find(p => p.id === state.currentPhase);
  document.getElementById('phase-info-text').textContent = phase.description;
  const input = document.getElementById('input');
  if (input && !isRecording) {
    input.placeholder = PHASE_PLACEHOLDERS[state.currentPhase] || 'Écris ton message...';
  }
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
  scrollPhaseIntoView(phaseId);
  scrollToBottom();
  saveSession();
  updateProgress();
  showSuggestions();
}

// ----- Messages -----

function getTimeString() {
  const now = new Date();
  return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
}

function addCoachMessage(text) {
  const chat = document.getElementById('chat');
  const div = document.createElement('div');
  div.className = 'message message-coach';
  div.innerHTML = `<div class="bubble">${formatText(text)}</div><span class="msg-time">${getTimeString()}</span>`;
  chat.appendChild(div);
  scrollToBottom();
}

function addUserMessage(text) {
  const chat = document.getElementById('chat');
  const div = document.createElement('div');
  div.className = 'message message-user';
  div.innerHTML = `<span class="msg-time">${getTimeString()}</span><div class="bubble">${formatText(text)}</div>`;
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
  let out = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Bold **text** or __text__
  out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/__(.+?)__/g, '<strong>$1</strong>');

  // Italic *text* or _text_ (mais pas dans les mots composés)
  out = out.replace(/(?<!\w)\*([^*]+?)\*(?!\w)/g, '<em>$1</em>');
  out = out.replace(/(?<!\w)_([^_]+?)_(?!\w)/g, '<em>$1</em>');

  // Listes à puces (lignes commençant par - ou *)
  out = out.replace(/\n/g, '<br>');
  out = out.replace(/((?:<br>|^)[- *] .+(?:<br>[- *] .+)*)/g, (match) => {
    const items = match.split('<br>')
      .filter(line => /^[- *] .+/.test(line.trim()))
      .map(line => `<li>${line.trim().replace(/^[- *] /, '')}</li>`)
      .join('');
    return items ? `<ul class="chat-list">${items}</ul>` : match;
  });

  return out;
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

// ----- Suggestions de relance -----

function showSuggestions() {
  removeSuggestions();
  const suggestions = PHASE_SUGGESTIONS[state.currentPhase];
  if (!suggestions) return;

  const chat = document.getElementById('chat');
  const div = document.createElement('div');
  div.className = 'suggestions';
  div.id = 'suggestions';

  suggestions.forEach(text => {
    const chip = document.createElement('button');
    chip.className = 'suggestion-chip';
    chip.textContent = text;
    chip.addEventListener('click', () => {
      document.getElementById('input').value = text;
      sendMessage();
    });
    div.appendChild(chip);
  });

  chat.appendChild(div);
  scrollToBottom();
}

function removeSuggestions() {
  const el = document.getElementById('suggestions');
  if (el) el.remove();
}

// ----- Retry sur erreur -----

function addRetryMessage(errorText, lastUserText) {
  const chat = document.getElementById('chat');
  const div = document.createElement('div');
  div.className = 'message message-coach';
  div.innerHTML = `<div class="bubble retry-bubble">
    ${errorText}
    <button class="retry-btn">Réessayer</button>
  </div>`;
  div.querySelector('.retry-btn').addEventListener('click', () => {
    div.remove();
    // Re-inject the last user message into input and resend
    document.getElementById('input').value = lastUserText;
    sendMessage();
  });
  chat.appendChild(div);
  scrollToBottom();
}

// ----- Envoi de message -----

async function sendMessage() {
  const input = document.getElementById('input');
  const text = input.value.trim();
  if (!text || state.loading) return;

  removeSuggestions();
  addUserMessage(text);
  state.chatHistory.push({ role: 'user', content: text });
  input.value = '';
  input.style.height = 'auto';

  state.loading = true;
  document.getElementById('send-btn').disabled = true;
  showTyping();

  try {
    const phase = PHASES.find(p => p.id === state.currentPhase);
    const topicContext = getTopicContext();
    const systemContent = BASE_PROMPT + phase.prompt + (topicContext ? `\n\nCONTEXTE : La personne a abordé les sujets suivants en début de conversation : ${topicContext}. Fais-y référence naturellement quand c'est pertinent.` : '');
    const messages = [
      { role: 'system', content: systemContent },
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
    playNotificationSound();
    saveSession();
    showSuggestions();

  } catch (err) {
    hideTyping();
    // Remove the user message from history so retry doesn't duplicate
    state.chatHistory.pop();
    addRetryMessage("Problème de connexion.", text);
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

    // Bouton copier la synthèse
    addActionButton('Copier ma synthèse', () => {
      navigator.clipboard.writeText(reply).then(() => {
        const btns = document.querySelectorAll('.action-btn');
        const copyBtn = btns[btns.length - 2]; // avant-dernier (copier est avant "aller plus loin")
        if (copyBtn) {
          const original = copyBtn.textContent;
          copyBtn.textContent = 'Copié !';
          setTimeout(() => { copyBtn.textContent = original; }, 2000);
        }
      }).catch(() => {
        // Fallback : sélection manuelle
        const textarea = document.createElement('textarea');
        textarea.value = reply;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      });
    });

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

let selectedCategory = null;

function renderToolbox() {
  const container = document.getElementById('toolbox-content');
  const intro = `
    <div class="toolbox-intro">
      <h2>Se mobiliser : par où commencer ?</h2>
      <p>Clarifier ses idées c'est bien. Les porter dans le monde réel, c'est mieux. Choisis une catégorie pour découvrir les formes de mobilisation citoyenne.</p>
    </div>
  `;

  if (selectedCategory === null) {
    // Vue catégories (cartes de navigation)
    const catCards = TOOLBOX_CATEGORIES.map(cat => `
      <div class="toolbox-category-card" onclick="selectCategory('${cat.id}')">
        <h3>${cat.name}</h3>
        <p>${cat.subtitle}</p>
        <span class="category-count">${cat.forms.length} fiches</span>
      </div>
    `).join('');
    container.innerHTML = intro + `<div class="toolbox-categories">${catCards}</div>`;
  } else {
    // Vue fiches d'une catégorie
    const cat = TOOLBOX_CATEGORIES.find(c => c.id === selectedCategory);
    const backBtn = `<button class="toolbox-back" onclick="selectCategory(null)">&larr; Toutes les catégories</button>`;
    const catHeader = `<div class="toolbox-cat-header"><h3>${cat.name}</h3><p>${cat.subtitle}</p></div>`;
    const cards = cat.forms.map((form, i) => `
      <div class="toolbox-card" id="card-${selectedCategory}-${i}">
        <div class="card-header" onclick="toggleCard('${selectedCategory}', ${i})">
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
    container.innerHTML = backBtn + catHeader + `<div class="toolbox-cards">${cards}</div>`;
  }
}

function selectCategory(catId) {
  selectedCategory = catId;
  renderToolbox();
  document.getElementById('toolbox-content').scrollTop = 0;
}

function toggleCard(catId, index) {
  const card = document.getElementById('card-' + catId + '-' + index);
  card.classList.toggle('open');
  if (card.classList.contains('open')) {
    setTimeout(() => {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
  }
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

  // Nouvelle session
  document.getElementById('new-session-btn').addEventListener('click', () => {
    if (confirm('Commencer une nouvelle session ? La conversation actuelle sera effacée.')) {
      closeMenu();
      clearSession();
    }
  });

  // Escape pour fermer modal/menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hidePhaseInfo();
      closeMenu();
    }
  });

  // Confirmation avant fermeture d'onglet
  window.addEventListener('beforeunload', (e) => {
    if (state.chatHistory.length > 2) {
      e.preventDefault();
      e.returnValue = '';
    }
  });
}

// ----- Lancement -----

document.addEventListener('DOMContentLoaded', init);
