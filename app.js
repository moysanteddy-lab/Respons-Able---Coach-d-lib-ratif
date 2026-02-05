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
    welcome: "Bienvenue ! Je suis un assistant conversationnel basé sur l'intelligence artificielle. Avant de commencer, quelques points importants :\n\nJe n'ai pas la science infuse. Malgré ma bonne volonté, je porte les biais — plus ou moins conscients — de mes créateurs et de mes données d'entraînement. C'est ta responsabilité de garder un regard critique sur nos échanges. Voici mes limites :\n\n- Je ne remplace pas une vraie discussion entre citoyens\n- Je peux reproduire des angles morts culturels ou idéologiques sans m'en rendre compte\n- Je ne connais pas ta réalité locale ni ton vécu\n- Mes reformulations peuvent involontairement déformer ta pensée\n\nLes changements sociaux demandent bien plus qu'une conversation avec une IA : ils nécessitent beaucoup de discussions entre humains pour assurer une harmonie sociétale, mais aussi de l'organisation et de l'action concrète. Je suis là pour t'aider à clarifier tes idées et à les formuler pour qu'elles soient entendues — pas pour te dire quoi penser.\n\nCeci dit, tous les sujets sont les bienvenus ici, sans aucun tabou. Dis-moi : qu'est-ce qui te pèse vraiment en ce moment ?",
    prompt: `PHASE ACTUELLE : Expression libre
Tu es en mode ÉCOUTE RADICALE. Ton seul objectif : faire émerger ce que la personne porte en elle — y compris ce qu'elle ne sait pas encore qu'elle porte.

TECHNIQUE — L'ÉCOUTE QUI FAIT ACCOUCHER :

1. CRÉER LA SÉCURITÉ dès la première réponse :
   - Valide le sujet sans juger : "C'est un vrai sujet, et c'est courageux de le poser."
   - Normalise : "Beaucoup de gens ressentent ça sans oser le dire."
   → La personne doit se dire "ici, je peux tout dire."

2. LA QUESTION MAGIQUE — "Et quoi d'autre ?" :
   - Après chaque réponse, ta question par défaut est : "Et quoi d'autre ?"
   - Cette question est plus puissante que n'importe quelle analyse. Elle force à aller chercher PLUS LOIN que la première couche.
   - Pose-la au moins 2-3 fois avant de varier.

3. DÉTECTER LE NON-DIT :
   - Écoute ce qui est SOUS les mots : hésitations, formulations vagues ("c'est un peu..."), sujets effleurés puis abandonnés.
   - Quand tu détectes un non-dit : "Tu as commencé à parler de [X] et tu t'es arrêté. Tu veux y revenir ?"
   - Quand le ton change : "J'ai l'impression que [sujet] te touche plus que les autres. Je me trompe ?"

4. LE MIROIR AMPLIFICATEUR :
   - Ne reformule pas platement. Reformule en AMPLIFIANT légèrement l'émotion pour vérifier.
   - "Si je t'entends bien, ça te met vraiment hors de toi" (même si la personne a dit "ça m'énerve un peu").
   - Si c'est trop fort, elle corrigera. Si c'est juste, elle s'ouvrira.

5. LA QUESTION DE BASCULE (une seule fois, au bon moment) :
   - Quand 2-3 sujets de surface sont posés : "Et si tout ça cachait un truc plus profond — t'aurais une idée de ce que c'est ?"
   - Cette question fait souvent émerger LE vrai sujet.

RÈGLES :
- Maximum 2-3 phrases par réponse. La brièveté FORCE la profondeur.
- NE PAS analyser. NE PAS reformuler en mode thérapeute. Parle comme un humain.
- Chaque mot compte. Zéro remplissage.

TRANSITION : Quand le vrai sujet est posé (la personne ralentit, semble soulagée, dit "voilà c'est ça") :
"Tu viens de poser quelque chose d'important. Si tu veux, on va aller voir ce qui se passe en profondeur — tes émotions, tes valeurs, ce que ça touche vraiment en toi. Clique sur Phase 2."`
  },
  {
    id: 2,
    name: 'Exploration',
    description: 'Explore ce qui se passe en toi sur ces sujets',
    welcome: "Merci pour ce partage. Maintenant on va creuser. Je vais te poser des questions qui vont droit au fond — tes émotions, tes valeurs, ce qui fait que ces sujets te touchent dans tes tripes.\n\nPremière question : qu'est-ce que tu RESSENS quand tu penses à tout ça ?",
    prompt: `PHASE ACTUELLE : Exploration intérieure
Tu es en mode QUESTIONNEMENT PUISSANT. Ton objectif : accompagner la personne dans une descente vertigineuse vers ses valeurs fondamentales. À la fin, elle doit savoir POURQUOI elle se bat — et d'où ça vient.

PRINCIPE CENTRAL : UNE SEULE QUESTION. DROIT AU BUT. ZÉRO BAVARDAGE.

TECHNIQUE DE DESCENTE EN 5 COUCHES :

1. COUCHE ÉMOTIONNELLE (surface) :
   "Qu'est-ce que ça te fait, là, quand tu en parles ?" / "Mets un seul mot sur ce que tu ressens."
   → Si la personne intellectualise ("je trouve que c'est injuste"), recentre : "Ça c'est ce que tu PENSES. Mais qu'est-ce que tu RESSENS ?"

2. COUCHE DU BESOIN :
   "Qu'est-ce qui est menacé pour toi là-dedans ?" / "Qu'est-ce que tu perds — ou que tu as peur de perdre ?"
   → Sécurité, justice, reconnaissance, liberté, dignité, appartenance...

3. COUCHE DES VALEURS :
   "Pourquoi c'est NON-NÉGOCIABLE pour toi ?" / "Si tu devais défendre ça devant le monde entier, tu dirais quoi ?"
   → Quand la valeur émerge, NOMME-LA : "On dirait que pour toi, [la dignité], c'est sacré."

4. COUCHE DE L'EXPÉRIENCE FONDATRICE :
   "D'où ça te vient, cette conviction ? Il y a un moment dans ta vie qui l'a forgée ?"
   → C'est souvent ICI que le déclic se produit. Si l'émotion monte, laisse l'espace. "..."

5. COUCHE IDENTITAIRE :
   "Au fond, c'est quoi pour toi être un bon citoyen sur ce sujet ?" / "Tu veux être quelqu'un qui fait quoi face à ça ?"

TECHNIQUES AVANCÉES :
- LE SILENCE : Après une question puissante, ne relance PAS. Laisse le vide. La personne ira chercher plus profond.
- LA REFORMULATION-CHOC : "Donc tu ressens [émotion] parce que [besoin] est en jeu, et ça touche à [valeur] qui vient de [expérience]. C'est ça ?" → Provoque souvent un "putain c'est exactement ça".
- LA QUESTION PARADOXALE : Si la personne tourne en rond : "Et si tu avais tort sur ce sujet — qu'est-ce que ça changerait pour toi ?"
- LE RECADRAGE CORPOREL : Si "je sais pas ce que je ressens" : "C'est plutôt une boule dans la gorge ou un poing dans le ventre ?"

RÈGLES ABSOLUES :
- UNE question à la fois. JAMAIS deux.
- 2-3 phrases MAX. La puissance est dans la concision.
- Reformule AVANT de descendre. Pas de saut de couche.
- Tu es un MIROIR, pas un analyste. Zéro jargon psy.

TRANSITION : Quand les valeurs profondes sont identifiées ET reliées au vécu :
"Tu tiens à [valeur] parce que [vécu]. C'est une fondation solide. On passe à la Phase 3 pour transformer ça en position claire ? Clique sur Phase 3."`
  },
  {
    id: 3,
    name: 'Clarification',
    description: 'Clarifie et structure ta pensée',
    welcome: "Tu sais ce que tu ressens et pourquoi. Maintenant, transformons ça en pensée claire.\n\nSi tu devais résumer TOUT ce qu'on vient de traverser en une seule phrase — ta position, c'est quoi ?",
    prompt: `PHASE ACTUELLE : Clarification
Tu es en mode CHIRURGIEN COGNITIF. La personne sait ce qu'elle ressent et pourquoi. Tu l'aides à passer du brouillard émotionnel à une pensée tranchante.

OBJECTIF : Qu'à la fin, elle puisse dire en UNE phrase ce qu'elle pense vraiment — et que cette phrase soit inattaquable parce qu'elle vient du fond de ses tripes ET de sa tête.

TECHNIQUE — LE SCALPEL SOCRATIQUE :

1. FORCER LA SYNTHÈSE :
   "Si tu résumes TOUT ce qu'on a traversé en une seule phrase — ta position, c'est quoi ?"
   → Force à cristalliser. Peu importe si c'est imparfait — c'est la matière première.

2. SÉPARER FAITS / INTERPRÉTATIONS / VALEURS :
   - "Là-dedans, qu'est-ce qui est un FAIT vérifiable ?"
   - "Et qu'est-ce qui est TON interprétation — légitime, mais personnelle ?"
   - "Et qu'est-ce qui relève de tes valeurs — ce en quoi tu crois, point ?"
   → Ne pas invalider les interprétations. Les NOMMER pour que la personne sache consciemment ce qui est quoi.

3. CHERCHER LES CONTRADICTIONS FÉCONDES :
   - "Tu dis [A], mais tout à l'heure tu disais [B]. Les deux peuvent coexister ?"
   - JAMAIS présenter une contradiction comme une erreur. C'est une RICHESSE : "C'est intéressant que tu tiennes à ces deux choses. Comment tu les réconcilies ?"
   → Les contradictions cachent souvent la position la plus authentique.

4. LE TEST DE SOLIDITÉ :
   - "Si quelqu'un qui ne te connaît pas entendait ça — il comprendrait ?"
   - "Qu'est-ce qui dans ta position est UNIVERSEL et qu'est-ce qui est propre à ton vécu ?"

5. L'INVERSION : "L'argument le plus fort CONTRE ta position, ce serait lequel ?" → Force à penser l'autre côté.

6. LA QUESTION-PIÈGE (bienveillante) : "Tu défends ça parce que tu y as RÉFLÉCHI, ou parce que tu l'as toujours entendu autour de toi ?"

7. LA REFORMULATION FINALE :
   "Si je te résume : tu penses que [X] parce que [Y], et ce qui est non-négociable c'est [Z]. C'est fidèle ?"
   - Si elle corrige : chaque correction affine.
   - Si "oui c'est exactement ça" : la phase est réussie.

RÈGLES :
- Sois DIRECT. Chaque question est un scalpel.
- 2-4 phrases par réponse. Concis, précis.
- Tu n'as PAS d'opinion. Tu es un outil de clarification.
- Quand la position est claire, ARRÊTE.

TRANSITION :
"Ta position : [reformulation en 1 phrase]. C'est solide. On passe à la Phase 4 pour préparer comment tu vas DIRE ça aux autres ? Clique sur Phase 4."`
  },
  {
    id: 4,
    name: 'Formulation',
    description: 'Prépare ta prise de parole pour la délibération',
    welcome: "Ta pensée est affûtée. Rendons-la percutante.\n\nImagine : tu es devant 50 citoyens qui ne te connaissent pas. Tu as 2 minutes. Qu'est-ce que tu leur dis ?",
    prompt: `PHASE ACTUELLE : Préparation à l'expression
Tu es en mode COACH D'ÉLOQUENCE. La personne sait ce qu'elle pense. Tu l'aides à le dire de façon si percutante que la salle se taise pour l'écouter.

OBJECTIF : 2-3 arguments qui frappent L'ESPRIT et LE CŒUR. Pas des arguments de manuel — des arguments qui viennent de SES TRIPES.

TECHNIQUE — L'ARCHITECTURE DE L'IMPACT :

1. L'ARGUMENT VISCÉRAL (le cœur) :
   "Raconte-moi le MOMENT PRÉCIS qui t'a fait basculer sur ce sujet."
   → L'expérience personnelle est l'argument le plus puissant. Aide à la transformer en récit de 30 secondes.
   - "Raconte ça en 3 phrases à quelqu'un qui ne te connaît pas."

2. L'ARGUMENT LOGIQUE (la tête) :
   "C'est quoi le FAIT le plus imparable qui soutient ta position ?"
   → Un seul fait bien choisi vaut mieux que dix approximations.
   - Aide à formuler : "[Fait] → donc [conclusion]. Point."

3. L'ARGUMENT UNIVERSEL (le lien) :
   "Qu'est-ce que ta position APPORTE aux autres — même à ceux qui ne sont pas d'accord ?"
   - "En quoi le monde serait meilleur si on t'écoutait ?"

4. LE TEST ANTI-JARGON :
   - "Redis-moi ça mais comme si tu parlais à ta grand-mère / ton voisin / un ado de 15 ans."
   - Si abstrait (systémique, inclusif, paradigme...) → faire reformuler en CONCRET.

5. L'ANTICIPATION DES OBJECTIONS :
   - "L'objection la plus dure qu'on pourrait te faire ?"
   - "Et tu réponds quoi ?"

6. LA PHRASE-CLÉ :
   - "Si les gens ne devaient retenir QU'UNE phrase de tout ce que tu as dit — ce serait laquelle ?"
   - Travaille cette phrase : courte, frappante, mémorable.

RÈGLES :
- L'authenticité PRIME sur l'élégance. Un argument maladroit mais vrai > un argument poli mais vide.
- Vérifie TOUJOURS : "C'est vraiment TOI qui parle, ou tu essaies de bien faire ?"
- Maximum 3 arguments. Au-delà, on dilue.
- 2-4 phrases par réponse. Tu coaches, tu ne fais pas un cours.

TRANSITION :
"Tes arguments : [résumé flash]. C'est prêt. Tu veux les tester face aux faits (Phase 5 — Confrontation) ou face à un citoyen opposé (Phase 6 — Simulation) ? Tu peux aussi générer ta synthèse."`
  },
  {
    id: 5,
    name: 'Confrontation',
    description: 'Confronte tes idées à des faits et arguments contradictoires',
    welcome: "Passons à la confrontation.\n\nJe vais attaquer tes arguments avec des faits, des données, des études. Pas pour te démolir — pour que ce qui TIENT devienne indestructible.\n\nReprends ta position principale. Je tire.",
    prompt: `PHASE ACTUELLE : Confrontation
Tu deviens un CONTRADICTEUR INTELLECTUEL bienveillant mais implacable. Ton rôle : secouer les arguments avec des FAITS SOURCÉS pour tester leur solidité.

OBJECTIF : Que la personne sorte avec des arguments BLINDÉS — ou qu'elle ait eu le courage de modifier sa position face à la réalité. Les deux sont des victoires.

TECHNIQUE — LA CONFRONTATION STRATÉGIQUE :

1. IDENTIFIER LE MAILLON FAIBLE :
   - Commence par le point le PLUS VULNÉRABLE — celui qui repose le plus sur une impression ou une généralisation.
   - "Tu dis que [affirmation]. Mais selon [source, année], [fait contradictoire]. Comment tu réconcilies ça ?"

2. L'ESCALADE FACTUELLE :
   - Niveau 1 : Un fait qui nuance → "C'est pas si simple : [source] montre que [nuance]."
   - Niveau 2 : Un fait qui contredit → "En fait, [source] montre le contraire : [données]."
   - Niveau 3 : Un angle mort → "Tu n'as pas mentionné [groupe/conséquence]. Selon [source], [impact]. Comment tu intègres ça ?"

3. LES BIAIS À NOMMER (avec pédagogie, jamais condescendance) :
   - Biais de confirmation : "Tu cherches des faits qui confirment ce que tu penses déjà ?"
   - Généralisation : "Tu dis 'tout le monde' / 'toujours' — c'est vraiment le cas ?"
   - Corrélation ≠ causalité : "Ces deux choses arrivent en même temps, mais l'une CAUSE l'autre ?"

4. LA QUESTION DE BASCULE :
   - Après 2-3 confrontations : "Qu'est-ce qui a bougé dans ta tête ? Même un petit truc."
   - Si rien : "OK, POURQUOI tu maintiens ta position malgré ces données ? C'est quoi qui prime ?"
   → Forcer à articuler : "mes valeurs priment" (légitime) vs "je n'avais pas vu ça" (évolution).

5. LE BILAN-CHOC :
   - "Tes arguments ont été secoués par [résumé]. Ce qui tient : [X]. Ce qui doit être repensé : [Y]. Tu es d'accord ?"

RÈGLES :
- TOUJOURS citer la source : organisme, année, chiffre. Pas de "des études montrent".
- DUR sur les faits, DOUX sur la personne.
- Si changement de position : "C'est costaud de changer face aux faits. Respect."
- 3-5 phrases par réponse. Direct. Implacable. Bienveillant.

TRANSITION :
"Tes idées ont passé l'épreuve des faits. Tu veux t'entraîner face au désaccord humain ? Phase 6. Sinon, génère ta synthèse."`
  },
  {
    id: 6,
    name: 'Simulation',
    description: "Entraîne-toi face à un citoyen qui pense différemment",
    welcome: "Dernière épreuve. Je deviens un citoyen qui n'est PAS d'accord avec toi. Pas un idiot — quelqu'un d'intelligent, de respectueux, mais qui voit les choses autrement.\n\nL'objectif : apprendre à rester ancré(e) face au désaccord réel.\n\nLance ta position. Je réplique.",
    prompt: `PHASE ACTUELLE : Simulation de délibération
Tu joues un CITOYEN OPPOSÉ — pas une caricature, un vrai humain avec des raisons légitimes de penser autrement. Tu es le sparring partner ultime.

DOUBLE OBJECTIF :
1. Que la personne vive le désaccord dans son corps et ses émotions, pas juste dans sa tête.
2. Construire un COMPROMIS SOLIDE — pas un consensus mou, un vrai terrain d'entente qui respecte les non-négociables de chaque côté.

TECHNIQUE — LE SPARRING CITOYEN :

1. INCARNER UN VRAI OPPOSANT (pas un homme de paille) :
   - Base ton désaccord sur ce que la personne a VRAIMENT dit.
   - Exprime un point de vue CRÉDIBLE qu'elle rencontrera en délibération.
   - Ton naturel : "Ouais je comprends ce que tu dis, mais moi ce que je vois c'est..."

2. LES TECHNIQUES DE DÉSTABILISATION (respectueuses) :
   - L'argument émotionnel : "C'est facile de dire ça quand on n'est pas directement concerné."
   - L'argument pratique : "OK sur le principe, mais concrètement, tu fais comment ?"
   - Le retournement : "Tu dis [X], mais est-ce que toi-même tu appliques ça dans ta vie ?"
   - Le consensus mou : "Tout le monde est d'accord là-dessus, ça veut dire que ça dit rien de concret."

3. JAUGER LA PRESSION :
   - Argumente bien → monte d'un cran : "Pas mal, mais comment tu expliques que [contre-argument plus dur] ?"
   - Se bloque → "[Pause coach] Respire. Tu sens quoi là ? C'est exactement ce qui arrivera en délibération. Comment tu veux réagir ?"
   - S'énerve → "[Pause coach] L'énervement c'est un signal. Il dit quoi ?"

4. MOMENT DE RECONNAISSANCE MUTUELLE :
   - Après 3-4 échanges, change de ton : "OK, on s'est bien secoués. Maintenant, identifions le terrain commun."
   - "Sur quoi on est VRAIMENT d'accord, toi et moi ?" → Valide explicitement.
   - "Quel est TON non-négociable ? Et moi je te dis le mien."

5. CONSTRUIRE LE COMPROMIS :
   - "On a chacun nos lignes rouges. Mais entre les deux, il y a une zone de flexibilité. On la cherche ?"
   - Guide la formulation d'une proposition commune : "Si on devait formuler UNE proposition qui respecte tes valeurs ET les miennes, ça donnerait quoi ?"
   - Insiste : un compromis solide ≠ "on est un peu d'accord sur tout" → c'est "on protège l'essentiel de chacun et on cède sur le reste".
   - Si la personne formule un bon compromis : "Là, tu viens de faire de la VRAIE délibération."

6. LE DEBRIEF (sortir du rôle) :
   "[Fin de la simulation]"
   - "C'était quoi le moment le plus dur ?"
   - "À quel moment tu as perdu pied — ou pris le dessus ?"
   - "Le compromis qu'on a trouvé, tu le défendrais en vrai ?"
   - "Qu'est-ce que tu ferais différemment la prochaine fois ?"

RÈGLES :
- JAMAIS méchant. Adversaire respectueux mais coriace.
- Tu ne lâches PAS facilement. Si elle te convainc, elle l'aura mérité.
- Le compromis est l'ABOUTISSEMENT, pas un raccourci.
- Le debrief est AUSSI IMPORTANT que la simulation.
- Après le debrief : "Tu es prêt(e). Génère ta synthèse avec le bouton vert."`
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
    why: 'Remonter de l\'émotion brute jusqu\'à tes valeurs fondamentales.',
    benefit: 'Savoir POURQUOI tu tiens à ce que tu défends — et d\'où ça vient.',
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
    title: 'Phase 5 — Confrontation',
    why: 'Tester tes arguments face à des faits et données contradictoires.',
    benefit: 'Des convictions plus solides, conscientes de leurs limites.',
    tip: 'Changer d\'avis face aux faits, c\'est pas une faiblesse — c\'est de la lucidité.'
  },
  6: {
    title: 'Phase 6 — Simulation',
    why: 'S\'entraîner à garder son calme face au désaccord.',
    benefit: 'De la confiance pour le jour J.',
    tip: 'Écouter l\'autre ne veut pas dire être d\'accord avec lui.'
  }
};

// ----- Formes de mobilisation citoyenne : voir toolbox-data.js -----

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
    "Donne-moi tes meilleurs contre-arguments",
    "Ce chiffre me surprend, explique",
    "Ma position tient quand même, voici pourquoi"
  ],
  6: [
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
  phaseSummaries: {},
  loading: false,
  currentView: 'coach',
  lang: 'fr',
  // Toolkit & Nuggets
  toolkitSeenPhases: new Set(),
  shownNuggets: new Set(),
  phaseMessageCounts: {},
  // Impact / Évolution
  impactBefore: null,
  impactAfter: null,
  impactShownBefore: false
};

// ----- i18n helpers -----

function getLang() { return state.lang || 'fr'; }

function getI18n() {
  return getLang() === 'fr' ? null : COACH_I18N[getLang()];
}

function t(key) {
  const i18n = getI18n();
  return (i18n && i18n.UI && i18n.UI[key]) || null;
}

function getBasePrompt() {
  const i18n = getI18n();
  return (i18n && i18n.BASE_PROMPT) || BASE_PROMPT;
}

function getPhases() {
  const i18n = getI18n();
  return (i18n && i18n.PHASES) || PHASES;
}

function getPhase(phaseId) {
  return getPhases().find(p => p.id === phaseId);
}

function getPhaseInfo(phaseId) {
  const i18n = getI18n();
  return (i18n && i18n.PHASE_INFO && i18n.PHASE_INFO[phaseId]) || PHASE_INFO[phaseId];
}

function getPhaseSuggestions(phaseId) {
  const i18n = getI18n();
  return (i18n && i18n.PHASE_SUGGESTIONS && i18n.PHASE_SUGGESTIONS[phaseId]) || PHASE_SUGGESTIONS[phaseId];
}

function getPhasePlaceholder(phaseId) {
  const i18n = getI18n();
  return (i18n && i18n.PHASE_PLACEHOLDERS && i18n.PHASE_PLACEHOLDERS[phaseId]) || PHASE_PLACEHOLDERS[phaseId];
}

function getSynthPrompt() {
  const i18n = getI18n();
  return (i18n && i18n.SYNTH_PROMPT) || null;
}

function getToolkit(phaseId) {
  const i18n = getI18n();
  return (i18n && i18n.PHASE_TOOLKIT && i18n.PHASE_TOOLKIT[phaseId]) || (typeof PHASE_TOOLKIT !== 'undefined' && PHASE_TOOLKIT[phaseId]) || null;
}

function getNuggets() {
  const i18n = getI18n();
  return (i18n && i18n.NUGGETS) || (typeof NUGGETS !== 'undefined' ? NUGGETS : []);
}

function setLanguage(lang) {
  state.lang = lang;
  localStorage.setItem('responsable-lang', lang);

  // Update speech recognition language
  if (speechRecognition) {
    speechRecognition.lang = lang === 'es' ? 'es-ES' : 'fr-FR';
  }

  // Re-render coach UI
  renderPhases();
  updatePhaseInfo();
  showSuggestions();

  // Update header if on coach view
  if (state.currentView === 'coach') {
    document.getElementById('view-title').textContent = t('coachTitle') || 'Coach Civique';
    document.getElementById('view-subtitle').textContent = t('coachSubtitle') || 'Prépare ta voix pour la délibération';
  }
}

// ----- Persistence localStorage -----

const STORAGE_KEY = 'responsable-coach-session';

function saveSession() {
  try {
    const data = {
      currentPhase: state.currentPhase,
      visitedPhases: [...state.visitedPhases],
      chatHistory: state.chatHistory,
      phaseSummaries: state.phaseSummaries,
      lang: state.lang,
      toolkitSeenPhases: [...state.toolkitSeenPhases],
      shownNuggets: [...state.shownNuggets],
      phaseMessageCounts: state.phaseMessageCounts,
      impactBefore: state.impactBefore,
      impactAfter: state.impactAfter,
      impactShownBefore: state.impactShownBefore,
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
  state.phaseSummaries = {};
  state.toolkitSeenPhases = new Set();
  state.shownNuggets = new Set();
  state.phaseMessageCounts = {};
  state.impactBefore = null;
  state.impactAfter = null;
  state.impactShownBefore = false;
  document.getElementById('chat').innerHTML = '';
  document.getElementById('toolkit-banner').innerHTML = '';
  document.getElementById('toolkit-banner').classList.remove('visible', 'expanded');
  updatePhaseButtons();
  updatePhaseInfo();
  const phase = getPhase(1);
  addCoachMessage(phase.welcome);
  state.chatHistory.push({ role: 'assistant', content: phase.welcome });
  saveSession();
  updateProgress();
  showSuggestions();
  showImpactBefore();
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

// ----- Mémoire des phases précédentes -----

function getPhaseMemory() {
  const entries = Object.entries(state.phaseSummaries);
  if (entries.length === 0) return '';
  const phaseNames = { 1: 'Expression libre', 2: 'Exploration', 3: 'Clarification', 4: 'Formulation', 5: 'Confrontation', 6: 'Simulation' };
  const memories = entries
    .sort(([a], [b]) => a - b)
    .map(([id, summary]) => `[Phase ${id} — ${phaseNames[id]}] ${summary}`)
    .join('\n\n');
  return `\n\nMÉMOIRE DES PHASES PRÉCÉDENTES (résumé compact — réfère-toi à ces acquis naturellement) :\n${memories}`;
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
    addCoachMessage(t('voiceNotSupported') || "Ton navigateur ne supporte pas la reconnaissance vocale. Essaie Chrome ou Edge !");
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
  input.placeholder = t('listeningPlaceholder') || "Je t'écoute... (4s de silence = envoi)";
  input.value = '';

  startRecognition();
}

function startRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const input = document.getElementById('input');
  const micBtn = document.getElementById('mic-btn');

  speechRecognition = new SpeechRecognition();
  speechRecognition.lang = getLang() === 'es' ? 'es-ES' : 'fr-FR';
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
        // Couper proprement le micro avant d'envoyer
        isRecording = false;
        voiceTranscript = '';
        if (speechRecognition) {
          speechRecognition.onend = () => {
            micBtn.classList.remove('recording');
            input.placeholder = getPhasePlaceholder(state.currentPhase) || t('writeMessage') || 'Écris ton message...';
          };
          speechRecognition.stop();
        }
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
    input.placeholder = getPhasePlaceholder(state.currentPhase) || t('writeMessage') || 'Écris ton message...';
    if (event.error === 'not-allowed') {
      addCoachMessage(t('micPermission') || "Autorise le micro dans ton navigateur pour utiliser la voix !");
    }
  };

  speechRecognition.onend = () => {
    if (isRecording && !state.loading) {
      try { startRecognition(); } catch (e) {
        isRecording = false;
        micBtn.classList.remove('recording');
        input.placeholder = getPhasePlaceholder(state.currentPhase) || t('writeMessage') || 'Écris ton message...';
      }
    } else {
      clearTimeout(silenceTimer);
      isRecording = false;
      voiceTranscript = '';
      micBtn.classList.remove('recording');
      input.placeholder = getPhasePlaceholder(state.currentPhase) || t('writeMessage') || 'Écris ton message...';
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

  // Restore language
  const savedLang = localStorage.getItem('responsable-lang');
  if (savedLang) {
    state.lang = savedLang;
    const langSelect = document.getElementById('lang-select');
    if (langSelect) langSelect.value = savedLang;
  }

  if (saved && saved.chatHistory.length > 0) {
    // Restaurer la session
    state.currentPhase = saved.currentPhase;
    state.visitedPhases = new Set(saved.visitedPhases);
    state.chatHistory = saved.chatHistory;
    state.phaseSummaries = saved.phaseSummaries || {};
    state.toolkitSeenPhases = new Set(saved.toolkitSeenPhases || []);
    state.shownNuggets = new Set(saved.shownNuggets || []);
    state.phaseMessageCounts = saved.phaseMessageCounts || {};
    state.impactBefore = saved.impactBefore || null;
    state.impactAfter = saved.impactAfter || null;
    state.impactShownBefore = saved.impactShownBefore || false;
    updatePhaseButtons();
    updatePhaseInfo();
    restoreChat(saved.chatHistory);
    addSystemMessage(t('sessionRestored') || 'Session restaurée — tu peux reprendre où tu en étais.');
    updateProgress();
    showSuggestions();
    renderToolkitBanner(state.currentPhase);
  } else {
    updatePhaseInfo();
    const phase = getPhase(1);
    addCoachMessage(phase.welcome);
    state.chatHistory.push({ role: 'assistant', content: phase.welcome });
    saveSession();
    updateProgress();
    showSuggestions();
    showImpactBefore();
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
    title.textContent = t('coachTitle') || 'Coach Civique';
    subtitle.textContent = t('coachSubtitle') || 'Prépare ta voix pour la délibération';
  } else if (viewId === 'toolbox') {
    title.textContent = t('toolboxTitle') || 'Boîte à outils';
    subtitle.textContent = t('toolboxSubtitle') || 'Formes de mobilisation citoyenne';
  } else if (viewId === 'parcours') {
    title.textContent = t('parcoursTitle') || 'Mon Parcours';
    subtitle.textContent = t('parcoursSubtitle') || 'Techniques et évolution';
    renderParcours();
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
  const phases = getPhases();
  const phaseBtns = phases.map(p => `
    <button class="phase-btn ${p.id === state.currentPhase ? 'active' : ''} ${state.visitedPhases.has(p.id) && p.id !== state.currentPhase ? 'visited' : ''}" data-phase="${p.id}">
      <span class="phase-num">${p.id}</span>
      ${p.name}
    </button>
  `).join('');
  nav.innerHTML = phaseBtns + `<button class="synth-btn" id="synth-btn">${t('synthBtn') || 'Ma synthèse'}</button>`;
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
  const pct = (state.visitedPhases.size / getPhases().length) * 100;
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
  5: "Réponds aux contre-arguments...",
  6: "Défends ta position..."
};

function updatePhaseInfo() {
  const phase = getPhase(state.currentPhase);
  document.getElementById('phase-info-text').textContent = phase.description;
  const input = document.getElementById('input');
  if (input && !isRecording) {
    input.placeholder = getPhasePlaceholder(state.currentPhase) || t('writeMessage') || 'Écris ton message...';
  }
}

async function switchPhase(phaseId) {
  if (phaseId === state.currentPhase || state.loading) return;
  const oldPhaseId = state.currentPhase;

  // Générer auto-synthèse de la phase qu'on quitte (via API)
  if (!state.phaseSummaries[oldPhaseId] && state.chatHistory.length >= 4) {
    state.loading = true;
    document.getElementById('send-btn').disabled = true;
    showTyping();

    try {
      const summaryPrompt = `Résume en 3-4 phrases ce que cette personne a exprimé, ressenti ou découvert pendant cette phase de coaching civique. Sois fidèle à ses mots. Concis et direct. Pas de liste à puces, un paragraphe fluide.`;
      const recentHistory = state.chatHistory.slice(-20);
      const messages = [
        { role: 'system', content: summaryPrompt },
        ...recentHistory,
        { role: 'user', content: 'Résumé de cette phase.' }
      ];

      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages })
      });

      hideTyping();

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          state.phaseSummaries[oldPhaseId] = data.reply.substring(0, 800);
          const phaseNames = { 1: 'Expression libre', 2: 'Exploration', 3: 'Clarification', 4: 'Formulation', 5: 'Confrontation', 6: 'Simulation' };
          addSystemMessage(`Acquis Phase ${oldPhaseId} (${phaseNames[oldPhaseId]}) : ${data.reply}`);
        }
      } else {
        hideTyping();
        // Fallback : dernier message coach
        const lastCoachMsg = [...state.chatHistory].reverse().find(m => m.role === 'assistant');
        if (lastCoachMsg) {
          state.phaseSummaries[oldPhaseId] = lastCoachMsg.content.substring(0, 600);
        }
      }
    } catch (e) {
      hideTyping();
      // Fallback : dernier message coach
      const lastCoachMsg = [...state.chatHistory].reverse().find(m => m.role === 'assistant');
      if (lastCoachMsg) {
        state.phaseSummaries[oldPhaseId] = lastCoachMsg.content.substring(0, 600);
      }
    } finally {
      state.loading = false;
      document.getElementById('send-btn').disabled = false;
    }
  }

  state.currentPhase = phaseId;
  state.visitedPhases.add(phaseId);
  state.phaseMessageCounts[phaseId] = state.phaseMessageCounts[phaseId] || 0;
  const phase = getPhase(phaseId);
  const phaseLabel = t('phaseLabel') || 'Phase';
  addSystemMessage(`${phaseLabel} ${phase.id} — ${phase.name}`);
  addCoachMessage(phase.welcome);
  state.chatHistory.push({ role: 'assistant', content: phase.welcome });
  updatePhaseButtons();
  updatePhaseInfo();
  renderToolkitBanner(phaseId);
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
  const suggestions = getPhaseSuggestions(state.currentPhase);
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
    <button class="retry-btn">${t('retryBtn') || 'Réessayer'}</button>
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
    const phase = getPhase(state.currentPhase);
    const topicContext = getTopicContext();
    const contextLabel = getLang() === 'es'
      ? `\n\nCONTEXTO: La persona ha abordado los siguientes temas al inicio de la conversación: ${topicContext}. Haz referencia a ellos de forma natural cuando sea pertinente.`
      : `\n\nCONTEXTE : La personne a abordé les sujets suivants en début de conversation : ${topicContext}. Fais-y référence naturellement quand c'est pertinent.`;
    const phaseMemory = getPhaseMemory();
    const systemContent = getBasePrompt() + phase.prompt + phaseMemory + (topicContext ? contextLabel : '');
    // Tronquer l'historique envoyé à l'API pour éviter les dépassements de tokens
    const MAX_API_MESSAGES = 30;
    const recentHistory = state.chatHistory.length > MAX_API_MESSAGES
      ? state.chatHistory.slice(-MAX_API_MESSAGES)
      : state.chatHistory;
    const messages = [
      { role: 'system', content: systemContent },
      ...recentHistory
    ];

    const payload = { messages };
    if (state.currentPhase === 5) payload.search = true;

    // Envoi avec retry automatique sur rate limit (max 2 tentatives)
    let response;
    for (let attempt = 0; attempt < 3; attempt++) {
      response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      // Si rate limit, on attend et on réessaie
      if (response.status === 502) {
        const errData = await response.clone().json().catch(() => ({}));
        if (errData.code === 'RATE_LIMIT' && attempt < 2) {
          await new Promise(r => setTimeout(r, (attempt + 1) * 4000));
          continue;
        }
      }
      break;
    }

    hideTyping();

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errorCode = errData.code || '';
      let errorMsg;
      if (errorCode === 'RATE_LIMIT') {
        errorMsg = "L'API a atteint sa limite de requêtes. Attends quelques secondes et réessaie.";
      } else if (errorCode === 'PAYLOAD_TOO_LARGE') {
        errorMsg = "La conversation est trop longue pour l'API. Démarre une nouvelle session.";
      } else if (errorCode === 'API_KEY_INVALID') {
        errorMsg = "Problème d'authentification API. Vérifie la clé Gemini dans le Worker.";
      } else {
        errorMsg = `Erreur serveur (${response.status}). Réessaie dans un instant.`;
      }
      throw new Error(errorMsg);
    }

    const data = await response.json();
    const reply = data.reply || t('noReply') || "Hmm, je n'ai pas pu répondre. Réessaie !";
    state.chatHistory.push({ role: 'assistant', content: reply });
    state.phaseMessageCounts[state.currentPhase] = (state.phaseMessageCounts[state.currentPhase] || 0) + 1;
    addCoachMessage(reply);
    checkAndShowNugget();
    playNotificationSound();
    saveSession();
    showSuggestions();

  } catch (err) {
    hideTyping();
    // Remove the user message from history so retry doesn't duplicate
    state.chatHistory.pop();
    addRetryMessage(err.message || t('connectionError') || "Problème de connexion.", text);
    console.error('Erreur:', err);
  } finally {
    state.loading = false;
    document.getElementById('send-btn').disabled = false;
    document.getElementById('input').focus();
  }
}

// ----- Modal info phase -----

function showPhaseInfo() {
  const info = getPhaseInfo(state.currentPhase);
  if (!info) return;
  document.getElementById('info-modal-title').textContent = info.title;
  document.getElementById('info-modal-body').innerHTML = `
    <div class="modal-field">
      <div class="modal-label">${t('phaseModalWhy') || 'Pourquoi cette phase'}</div>
      <div class="modal-value">${info.why}</div>
    </div>
    <div class="modal-field">
      <div class="modal-label">${t('phaseModalBenefit') || "Ce que ça t'apporte"}</div>
      <div class="modal-value">${info.benefit}</div>
    </div>
    <div class="modal-field">
      <div class="modal-label">${t('phaseModalTip') || 'Conseil'}</div>
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
    addCoachMessage(t('needMoreChat') || "Échange encore un peu avec moi avant de générer ta synthèse — j'ai besoin de matière pour te faire un bon résumé !");
    return;
  }

  // Montrer l'auto-évaluation "après" avant la synthèse
  await showImpactAfter();

  state.loading = true;
  document.getElementById('send-btn').disabled = true;
  addSystemMessage(t('generatingSynthesis') || "Génération de ta synthèse...");
  showTyping();

  const defaultSynthBody = `Tu dois maintenant produire une SYNTHÈSE complète du parcours de cette personne.

Structure ta synthèse ainsi :

CE QUI ME PRÉOCCUPE
Résume les sujets évoqués en phase 1.

CE QUE JE RESSENS
Résume les émotions et valeurs identifiées en phase 2.

CE QUE JE PENSE
Résume la position clarifiée en phase 3.

COMMENT JE VEUX LE DIRE
Résume les arguments formulés en phase 4.

CE QUE LES FAITS M'ONT APPRIS
Résume les confrontations factuelles de la phase 5 : quels contre-arguments sourcés ont été présentés, lesquels ont surpris la personne, et comment sa position a (ou n'a pas) évolué (si cette phase a eu lieu).

CE QUE J'AI APPRIS DE LA SIMULATION
Résume les enseignements de la phase 6 (si elle a eu lieu).

RÈGLES : Sois fidèle à ce que la personne a dit. Ne rajoute rien de ton cru. Utilise ses mots quand c'est possible. Si une phase n'a pas été abordée, indique-le simplement.`;
  const phaseMemory = getPhaseMemory();

  // Injecter les données d'impact avant/après si disponibles
  let impactContext = '';
  if (state.impactBefore) {
    impactContext += `\n\nAUTO-ÉVALUATION AVANT : Confiance ${state.impactBefore.confiance}/5, Clarté ${state.impactBefore.clarte}/5, Écoute ${state.impactBefore.ecoute}/5, Régulation ${state.impactBefore.regulation}/5`;
    if (state.impactAfter) {
      impactContext += `\nAUTO-ÉVALUATION APRÈS : Confiance ${state.impactAfter.confiance}/5, Clarté ${state.impactAfter.clarte}/5, Écoute ${state.impactAfter.ecoute}/5, Régulation ${state.impactAfter.regulation}/5`;
      if (state.impactAfter.freeText) {
        impactContext += `\nCE QUE LA PERSONNE RETIENT : "${state.impactAfter.freeText}"`;
      }
      impactContext += `\n\nAjoute une section MON ÉVOLUTION à la fin de la synthèse : commente les évolutions (positives ou non) de chaque compétence, et reprends ce que la personne retient.`;
    }
  }

  const synthPrompt = getBasePrompt() + (getSynthPrompt() || defaultSynthBody) + phaseMemory + impactContext;

  try {
    // Garder plus de messages pour la synthèse (besoin de contexte large)
    const MAX_SYNTH_MESSAGES = 50;
    const recentHistory = state.chatHistory.length > MAX_SYNTH_MESSAGES
      ? state.chatHistory.slice(-MAX_SYNTH_MESSAGES)
      : state.chatHistory;
    const messages = [
      { role: 'system', content: synthPrompt },
      ...recentHistory,
      { role: 'user', content: getLang() === 'es' ? 'Genera mi síntesis completa.' : 'Génère ma synthèse complète.' }
    ];

    // Envoi avec retry automatique sur rate limit
    let response;
    for (let attempt = 0; attempt < 3; attempt++) {
      response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages })
      });
      if (response.status === 502) {
        const errData = await response.clone().json().catch(() => ({}));
        if (errData.code === 'RATE_LIMIT' && attempt < 2) {
          await new Promise(r => setTimeout(r, (attempt + 1) * 4000));
          continue;
        }
      }
      break;
    }

    hideTyping();

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errorCode = errData.code || '';
      let errorMsg;
      if (errorCode === 'RATE_LIMIT') {
        errorMsg = "L'API a atteint sa limite. Attends quelques secondes et réessaie.";
      } else if (errorCode === 'PAYLOAD_TOO_LARGE') {
        errorMsg = "Conversation trop longue pour la synthèse. Essaie après une nouvelle session plus courte.";
      } else {
        errorMsg = `Erreur lors de la synthèse (${response.status}). Réessaie.`;
      }
      throw new Error(errorMsg);
    }

    const data = await response.json();
    const reply = data.reply || t('synthError') || "Impossible de générer la synthèse. Réessaie !";
    addCoachMessage(reply);

    // Bouton copier la synthèse
    addActionButton(t('copySynthesis') || 'Copier ma synthèse', () => {
      navigator.clipboard.writeText(reply).then(() => {
        const btns = document.querySelectorAll('.action-btn');
        const copyBtn = btns[btns.length - 2]; // avant-dernier (copier est avant "aller plus loin")
        if (copyBtn) {
          const original = copyBtn.textContent;
          copyBtn.textContent = t('copied') || 'Copié !';
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
    addActionButton(t('goFurther') || 'Aller plus loin → Boîte à outils', () => switchView('toolbox'));

  } catch (err) {
    hideTyping();
    addCoachMessage(err.message || t('synthError') || "Désolé, impossible de générer la synthèse. Vérifie ta connexion.");
    console.error('Erreur synthèse:', err);
  } finally {
    state.loading = false;
    document.getElementById('send-btn').disabled = false;
  }
}

// ----- Boîte à outils (rendu) -----

let selectedCategory = null;
let selectedForm = null;

function renderToolbox() {
  const container = document.getElementById('toolbox-content');

  if (selectedCategory === null) {
    // Niveau 1 : catégories
    const intro = `
      <div class="toolbox-intro">
        <h2>Se mobiliser : par où commencer ?</h2>
        <p>Clarifier ses idées c'est bien. Les porter dans le monde réel, c'est mieux. Choisis une catégorie pour explorer les formes de mobilisation citoyenne.</p>
      </div>`;
    const catCards = TOOLBOX_CATEGORIES.map(cat => `
      <div class="toolbox-category-card" onclick="selectCategory('${cat.id}')">
        <h3>${cat.name}</h3>
        <p>${cat.subtitle}</p>
        <span class="category-count">${cat.forms.length} fiches</span>
      </div>
    `).join('');
    container.innerHTML = intro + `<div class="toolbox-categories">${catCards}</div>`;

  } else if (selectedForm === null) {
    // Niveau 2 : liste des formes
    const cat = TOOLBOX_CATEGORIES.find(c => c.id === selectedCategory);
    const backBtn = `<button class="toolbox-back" onclick="selectCategory(null)">&larr; Toutes les catégories</button>`;
    const catHeader = `<div class="toolbox-cat-header"><h3>${cat.name}</h3><p>${cat.subtitle}</p></div>`;
    const cards = cat.forms.map((form, i) => `
      <div class="toolbox-form-card" onclick="selectForm(${i})">
        <div class="form-card-text">
          <h3>${form.name}</h3>
          <p>${form.short || ''}</p>
        </div>
        <span class="form-arrow">&rsaquo;</span>
      </div>
    `).join('');
    container.innerHTML = backBtn + catHeader + `<div class="toolbox-form-list">${cards}</div>`;

  } else {
    // Niveau 3 : vue détail d'une forme
    const cat = TOOLBOX_CATEGORIES.find(c => c.id === selectedCategory);
    const form = cat.forms[selectedForm];
    const backBtn = `<button class="toolbox-back" onclick="selectForm(null)">&larr; ${cat.name}</button>`;

    let sections = '';

    // Description
    sections += `<div class="detail-description">${form.description}</div>`;

    // Forces
    sections += buildDetailSection(0, 'Forces &amp; atouts', `
      <ul class="detail-list detail-advantages">
        ${form.advantages.map(a => '<li>' + a + '</li>').join('')}
      </ul>`);

    // Limites
    sections += buildDetailSection(1, 'Limites &amp; vigilances', `
      <ul class="detail-list detail-limits">
        ${form.limits.map(l => '<li>' + l + '</li>').join('')}
      </ul>`);

    // Nuances
    if (form.nuances) {
      sections += buildDetailSection(2, 'En profondeur', `<p class="detail-nuances">${form.nuances}</p>`);
    }

    // Legal
    if (form.legal) {
      sections += buildDetailSection(3, 'Cadre légal en France', `<p class="detail-legal">${form.legal}</p>`);
    }

    // Howto
    if (form.howto && form.howto.length) {
      sections += buildDetailSection(4, 'Concrètement, comment faire ?', `
        <ol class="detail-howto">
          ${form.howto.map(s => '<li>' + s + '</li>').join('')}
        </ol>`);
    }

    // Examples
    if (form.examples && form.examples.length) {
      sections += buildDetailSection(5, 'Exemples historiques',
        form.examples.map(ex => `
          <div class="detail-example">
            <div class="detail-example-title">${ex.title}</div>
            <p>${ex.text}</p>
          </div>`).join(''));
    }

    // Obstacles
    if (form.obstacles && form.obstacles.length) {
      const obstaclesBody = form.obstacles.map((o, idx) => `
        <div class="obstacle-card" id="obstacle-${idx}">
          <div class="obstacle-header" onclick="toggleObstacle(${idx})">
            <span class="obstacle-doubt">${o.doubt}</span>
            <span class="obstacle-toggle">+</span>
          </div>
          <div class="obstacle-body">
            <div class="obstacle-title">${o.title}</div>
            <p class="obstacle-response">${o.response}</p>
          </div>
        </div>`).join('');
      sections += buildDetailSection(6, 'Anticiper les obstacles', obstaclesBody);
    }

    // Related
    let relatedHtml = '';
    if (form.related && form.related.length) {
      relatedHtml = `
        <div class="detail-related">
          <span class="detail-related-label">Voir aussi :</span>
          ${form.related.map(r => '<button class="detail-related-btn" onclick="navigateToForm(\'' + r.replace(/'/g, "\\'") + '\')">' + r + '</button>').join('')}
        </div>`;
    }

    container.innerHTML = backBtn + `
      <div class="detail-header"><h2>${form.name}</h2></div>
      <div class="detail-content">${sections}${relatedHtml}</div>`;
  }
}

function buildDetailSection(index, title, bodyHtml) {
  return `
    <div class="detail-section" id="detail-section-${index}">
      <div class="detail-section-header" onclick="toggleDetailSection(${index})">
        <h4>${title}</h4>
        <span class="detail-toggle">+</span>
      </div>
      <div class="detail-section-body">${bodyHtml}</div>
    </div>`;
}

function selectCategory(catId) {
  selectedCategory = catId;
  selectedForm = null;
  renderToolbox();
  document.getElementById('toolbox-content').scrollTop = 0;
}

function selectForm(index) {
  selectedForm = index;
  renderToolbox();
  document.getElementById('toolbox-content').scrollTop = 0;
}

function toggleDetailSection(index) {
  const section = document.getElementById('detail-section-' + index);
  if (section) section.classList.toggle('open');
}

function toggleObstacle(index) {
  const card = document.getElementById('obstacle-' + index);
  if (card) card.classList.toggle('open');
}

function navigateToForm(formName) {
  for (const cat of TOOLBOX_CATEGORIES) {
    const idx = cat.forms.findIndex(f => f.name === formName);
    if (idx !== -1) {
      selectedCategory = cat.id;
      selectedForm = idx;
      renderToolbox();
      document.getElementById('toolbox-content').scrollTop = 0;
      return;
    }
  }
}

// ----- Toolkit Banner -----

function renderToolkitBanner(phaseId) {
  const banner = document.getElementById('toolkit-banner');
  const toolkit = getToolkit(phaseId);

  if (!toolkit || !toolkit.tools || toolkit.tools.length === 0) {
    banner.innerHTML = '';
    banner.classList.remove('visible', 'expanded');
    return;
  }

  const isFirstVisit = !state.toolkitSeenPhases.has(phaseId);
  state.toolkitSeenPhases.add(phaseId);
  saveSession();

  const toolsHtml = toolkit.tools.map((tool, i) => `
    <div class="toolkit-tool" id="toolkit-tool-${i}">
      <div class="toolkit-tool-header" onclick="toggleToolkitTool(${i})">
        <div class="toolkit-tool-info">
          <div class="toolkit-tool-name">${tool.name}</div>
          <div class="toolkit-tool-oneliner">${tool.oneliner}</div>
        </div>
        <span class="toolkit-tool-toggle">+</span>
      </div>
      <div class="toolkit-tool-body">
        <div class="toolkit-neuroscience">${tool.neuroscience}</div>
        <ol class="toolkit-steps">
          ${tool.steps.map(s => `<li>${s}</li>`).join('')}
        </ol>
      </div>
    </div>
  `).join('');

  const phaseNames = { 2: 'Exploration', 3: 'Clarification', 4: 'Formulation', 5: 'Confrontation', 6: 'Simulation' };

  banner.innerHTML = `
    <div class="toolkit-collapsed" onclick="toggleToolkitBanner()">
      <span class="toolkit-collapsed-icon">\u{1F9E0}</span>
      <span class="toolkit-collapsed-text">${toolkit.tools.length} ${t('toolkitAvailable') || 'techniques disponibles'}</span>
      <span class="toolkit-collapsed-arrow">\u25BE</span>
    </div>
    <div class="toolkit-expanded">
      <div class="toolkit-exp-header">
        <span>\u{1F9E0} Toolkit Neuro \u2014 ${phaseNames[phaseId] || 'Phase ' + phaseId}</span>
        <button class="toolkit-close" onclick="toggleToolkitBanner()">\u25B4</button>
      </div>
      ${toolsHtml}
    </div>
  `;

  banner.classList.add('visible');
  if (isFirstVisit) {
    banner.classList.add('expanded');
  } else {
    banner.classList.remove('expanded');
  }
}

function toggleToolkitBanner() {
  document.getElementById('toolkit-banner').classList.toggle('expanded');
}

function toggleToolkitTool(index) {
  const tool = document.getElementById('toolkit-tool-' + index);
  if (tool) tool.classList.toggle('open');
}

// ----- Nuggets "Le saviez-vous?" -----

function checkAndShowNugget() {
  const allNuggets = getNuggets();
  if (!allNuggets || allNuggets.length === 0) return;
  const phase = state.currentPhase;
  const count = state.phaseMessageCounts[phase] || 0;

  for (const nugget of allNuggets) {
    if (nugget.phase !== phase) continue;
    if (state.shownNuggets.has(nugget.id)) continue;
    if (nugget.trigger.type === 'messageCount' && count >= nugget.trigger.count) {
      state.shownNuggets.add(nugget.id);
      addNuggetMessage(nugget.icon, nugget.text);
      saveSession();
      return;
    }
  }
}

function addNuggetMessage(icon, text) {
  const chat = document.getElementById('chat');
  const div = document.createElement('div');
  div.className = 'message-nugget';
  div.innerHTML = `<span class="nugget-icon">${icon}</span><span class="nugget-text">${text}</span>`;
  chat.appendChild(div);
  scrollToBottom();
}

// ----- Impact / Évolution -----

function showImpactBefore() {
  if (state.impactBefore || state.impactShownBefore) return;
  state.impactShownBefore = true;

  const chat = document.getElementById('chat');
  const card = document.createElement('div');
  card.className = 'impact-card';
  card.id = 'impact-before-card';

  const labels = [
    t('impactConfiance') || 'Confiance',
    t('impactClarte') || 'Clarté',
    t('impactEcoute') || 'Écoute',
    t('impactRegulation') || 'Régulation'
  ];
  const keys = ['confiance', 'clarte', 'ecoute', 'regulation'];

  card.innerHTML = `
    <div class="impact-title">${t('impactBeforeTitle') || 'Où en es-tu avant de commencer ?'}</div>
    <div class="impact-subtitle">${t('impactBeforeSubtitle') || 'Auto-évalue ces 4 compétences (1\u00a0=\u00a0faible, 5\u00a0=\u00a0fort)'}</div>
    ${keys.map((key, i) => `
      <div class="impact-slider-row">
        <label>${labels[i]}</label>
        <input type="range" min="1" max="5" value="3" class="impact-range impact-untouched" data-key="${key}">
        <span class="impact-value">?</span>
      </div>
    `).join('')}
    <button class="impact-submit impact-submit-disabled" onclick="submitImpactBefore()" disabled>${t('impactStart') || "C'est parti !"}</button>
  `;

  chat.appendChild(card);

  const submitBtn = card.querySelector('.impact-submit');
  const ranges = card.querySelectorAll('.impact-range');
  const touched = new Set();

  ranges.forEach(range => {
    range.addEventListener('input', () => {
      range.classList.remove('impact-untouched');
      range.nextElementSibling.textContent = range.value;
      touched.add(range.dataset.key);
      if (touched.size === keys.length) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('impact-submit-disabled');
      }
    });
  });

  scrollToBottom();
}

function submitImpactBefore() {
  const card = document.getElementById('impact-before-card');
  if (!card) return;

  const data = {};
  card.querySelectorAll('.impact-range').forEach(range => {
    data[range.dataset.key] = parseInt(range.value);
  });

  state.impactBefore = data;
  saveSession();

  card.innerHTML = `
    <div class="impact-summary">
      <span class="impact-summary-icon">\u{1F4CA}</span>
      <span>${t('impactRecorded') || 'Auto-évaluation enregistrée'} : ${t('impactConfiance') || 'Confiance'} ${data.confiance}/5 \u00B7 ${t('impactClarte') || 'Clarté'} ${data.clarte}/5 \u00B7 ${t('impactEcoute') || 'Écoute'} ${data.ecoute}/5 \u00B7 ${t('impactRegulation') || 'Régulation'} ${data.regulation}/5</span>
    </div>
  `;
  card.className = 'impact-card impact-card-compact';
}

function showImpactAfter() {
  return new Promise((resolve) => {
    if (!state.impactBefore || state.impactAfter) {
      resolve();
      return;
    }

    const chat = document.getElementById('chat');
    const card = document.createElement('div');
    card.className = 'impact-card';
    card.id = 'impact-after-card';

    const labels = [
      t('impactConfiance') || 'Confiance',
      t('impactClarte') || 'Clarté',
      t('impactEcoute') || 'Écoute',
      t('impactRegulation') || 'Régulation'
    ];
    const keys = ['confiance', 'clarte', 'ecoute', 'regulation'];

    card.innerHTML = `
      <div class="impact-title">${t('impactAfterTitle') || 'Et maintenant, où en es-tu ?'}</div>
      <div class="impact-subtitle">${t('impactAfterSubtitle') || 'Réévalue après ton parcours'}</div>
      ${keys.map((key, i) => `
        <div class="impact-slider-row">
          <label>${labels[i]}</label>
          <input type="range" min="1" max="5" value="3" class="impact-range impact-untouched" data-key="${key}">
          <span class="impact-value">?</span>
        </div>
      `).join('')}
      <div class="impact-freetext-row">
        <label>${t('impactTakeawayLabel') || 'Une chose que tu retiens de cette session ?'}</label>
        <textarea class="impact-freetext" id="impact-freetext" rows="2" placeholder="${t('impactTakeawayPlaceholder') || 'En une phrase...'}"></textarea>
      </div>
      <button class="impact-submit impact-submit-disabled" id="impact-after-submit" disabled>${t('impactSeeEvolution') || 'Voir mon évolution'}</button>
    `;

    chat.appendChild(card);

    const afterSubmitBtn = card.querySelector('.impact-submit');
    const afterRanges = card.querySelectorAll('.impact-range');
    const afterTouched = new Set();

    afterRanges.forEach(range => {
      range.addEventListener('input', () => {
        range.classList.remove('impact-untouched');
        range.nextElementSibling.textContent = range.value;
        afterTouched.add(range.dataset.key);
        if (afterTouched.size === keys.length) {
          afterSubmitBtn.disabled = false;
          afterSubmitBtn.classList.remove('impact-submit-disabled');
        }
      });
    });

    document.getElementById('impact-after-submit').addEventListener('click', () => {
      const data = {};
      card.querySelectorAll('.impact-range').forEach(range => {
        data[range.dataset.key] = parseInt(range.value);
      });
      data.freeText = document.getElementById('impact-freetext').value.trim();

      state.impactAfter = data;
      saveSession();

      renderImpactComparison(card);
      resolve();
    });

    scrollToBottom();
  });
}

function renderImpactComparison(container) {
  const labels = {
    confiance: t('impactConfiance') || 'Confiance',
    clarte: t('impactClarte') || 'Clarté',
    ecoute: t('impactEcoute') || 'Écoute',
    regulation: t('impactRegulation') || 'Régulation'
  };
  const keys = ['confiance', 'clarte', 'ecoute', 'regulation'];

  let html = keys.map(key => {
    const before = state.impactBefore[key];
    const after = state.impactAfter[key];
    const delta = after - before;
    const deltaClass = delta > 0 ? 'positive' : delta < 0 ? 'negative' : 'neutral';
    const deltaText = delta > 0 ? `+${delta}` : `${delta}`;
    return `
      <div class="impact-comparison-row">
        <span class="impact-comparison-label">${labels[key]}</span>
        <div class="impact-comparison-bars">
          <div class="impact-bar impact-bar-before" style="width:${before * 20}%"><span>${t('impactBefore') || 'Avant'} ${before}</span></div>
          <div class="impact-bar impact-bar-after" style="width:${after * 20}%"><span>${t('impactAfterLabel') || 'Après'} ${after}</span></div>
        </div>
        <span class="impact-delta impact-delta-${deltaClass}">${deltaText}</span>
      </div>
    `;
  }).join('');

  if (state.impactAfter.freeText) {
    html += `<div class="impact-takeaway"><strong>${t('impactTakeaway') || 'Ce que je retiens'} :</strong> ${state.impactAfter.freeText}</div>`;
  }

  container.innerHTML = `
    <div class="impact-title">${t('impactEvolutionTitle') || 'Mon évolution'}</div>
    <div class="impact-comparison">${html}</div>
  `;
  container.className = 'impact-card impact-card-result';
  scrollToBottom();
}

// ----- Vue "Mon Parcours" -----

function renderParcours() {
  const container = document.getElementById('parcours-content');
  let html = `<h2 class="parcours-main-title">${t('parcoursTitle') || 'Mon Parcours'}</h2>`;

  // Section 1 : Évolution
  if (state.impactBefore) {
    html += '<div class="parcours-section">';
    html += `<h3 class="parcours-section-title">${t('impactEvolutionTitle') || 'Mon évolution'}</h3>`;

    const labels = {
      confiance: t('impactConfiance') || 'Confiance',
      clarte: t('impactClarte') || 'Clarté',
      ecoute: t('impactEcoute') || 'Écoute',
      regulation: t('impactRegulation') || 'Régulation'
    };
    const keys = ['confiance', 'clarte', 'ecoute', 'regulation'];

    if (state.impactAfter) {
      html += '<div class="impact-comparison">';
      html += keys.map(key => {
        const before = state.impactBefore[key];
        const after = state.impactAfter[key];
        const delta = after - before;
        const deltaClass = delta > 0 ? 'positive' : delta < 0 ? 'negative' : 'neutral';
        const deltaText = delta > 0 ? `+${delta}` : `${delta}`;
        return `
          <div class="impact-comparison-row">
            <span class="impact-comparison-label">${labels[key]}</span>
            <div class="impact-comparison-bars">
              <div class="impact-bar impact-bar-before" style="width:${before * 20}%"><span>${t('impactBefore') || 'Avant'} ${before}</span></div>
              <div class="impact-bar impact-bar-after" style="width:${after * 20}%"><span>${t('impactAfterLabel') || 'Après'} ${after}</span></div>
            </div>
            <span class="impact-delta impact-delta-${deltaClass}">${deltaText}</span>
          </div>
        `;
      }).join('');
      if (state.impactAfter.freeText) {
        html += `<div class="impact-takeaway"><strong>${t('impactTakeaway') || 'Ce que je retiens'} :</strong> ${state.impactAfter.freeText}</div>`;
      }
      html += '</div>';
    } else {
      html += keys.map(key =>
        `<div class="parcours-stat">${labels[key]} : ${state.impactBefore[key]}/5</div>`
      ).join('');
      html += `<p class="parcours-hint">${t('parcoursHint') || 'Complète ton parcours et génère ta synthèse pour voir ton évolution.'}</p>`;
    }

    html += '</div>';
  }

  // Section 2 : Mon parcours conversationnel (résumés de phases)
  const summaryEntries = Object.entries(state.phaseSummaries);
  if (summaryEntries.length > 0) {
    html += '<div class="parcours-section">';
    html += `<h3 class="parcours-section-title">${t('parcoursJourney') || 'Mon cheminement'}</h3>`;
    const allPhaseNames = { 1: 'Expression libre', 2: 'Exploration', 3: 'Clarification', 4: 'Formulation', 5: 'Confrontation', 6: 'Simulation' };
    summaryEntries.sort(([a], [b]) => a - b).forEach(([id, summary]) => {
      html += `
        <div class="parcours-summary-card">
          <div class="parcours-summary-phase">${t('phaseLabel') || 'Phase'} ${id} \u2014 ${allPhaseNames[id] || ''}</div>
          <div class="parcours-summary-text">${summary}</div>
        </div>
      `;
    });
    html += '</div>';
  }

  // Section 3 : Techniques par phase
  html += '<div class="parcours-section">';
  html += `<h3 class="parcours-section-title">${t('parcoursTechniques') || 'Mes techniques'}</h3>`;

  const phaseNames = { 2: 'Exploration', 3: 'Clarification', 4: 'Formulation', 5: 'Confrontation', 6: 'Simulation' };

  for (const phaseId of [2, 3, 4, 5, 6]) {
    const toolkit = getToolkit(phaseId);
    if (!toolkit) continue;

    html += `
      <div class="parcours-phase-group">
        <div class="parcours-phase-label">${t('phaseLabel') || 'Phase'} ${phaseId} \u2014 ${phaseNames[phaseId]}</div>
        ${toolkit.tools.map((tool, i) => `
          <div class="detail-section" id="parcours-tool-${phaseId}-${i}">
            <div class="detail-section-header" onclick="document.getElementById('parcours-tool-${phaseId}-${i}').classList.toggle('open')">
              <h4>${tool.name}</h4>
              <span class="detail-toggle">+</span>
            </div>
            <div class="detail-section-body">
              <p class="toolkit-neuroscience">${tool.neuroscience}</p>
              <ol class="toolkit-steps">${tool.steps.map(s => `<li>${s}</li>`).join('')}</ol>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  html += '</div>';
  container.innerHTML = html;
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
    if (confirm(t('newSessionConfirm') || 'Commencer une nouvelle session ? La conversation actuelle sera effacée.')) {
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

  // Language selector
  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.addEventListener('change', () => {
      setLanguage(langSelect.value);
    });
  }
}

// ----- Lancement -----

document.addEventListener('DOMContentLoaded', init);
