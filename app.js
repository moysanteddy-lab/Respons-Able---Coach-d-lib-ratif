// ============================================
// Coach Délibératif — Respons'Able
// ============================================

const WORKER_URL = 'https://black-cell-5b71ted.moysan-teddy.workers.dev';

// ----- Beta privée : gestion accès via Worker -----
const ACCESS_WORKER_URL = 'https://responsable-access.moysan-teddy.workers.dev';
const ACCESS_KEY = 'responsable-access-email';
const ACCESS_STATUS_KEY = 'responsable-access-status';

function checkAccess() {
  const savedEmail = localStorage.getItem(ACCESS_KEY);
  const savedStatus = localStorage.getItem(ACCESS_STATUS_KEY);
  return savedEmail && savedStatus === 'approved';
}

function showAccessGate() {
  const modal = document.getElementById('access-modal');
  if (modal) modal.classList.add('active');
}

function hideAccessGate() {
  const modal = document.getElementById('access-modal');
  if (modal) modal.classList.remove('active');
}

function setupAccessGate() {
  const submitBtn = document.getElementById('access-submit-btn');
  const emailInput = document.getElementById('access-email');
  const status = document.getElementById('access-status');

  if (!submitBtn || !emailInput) return;

  // Pré-remplir si email déjà saisi
  const savedEmail = localStorage.getItem(ACCESS_KEY);
  if (savedEmail) {
    emailInput.value = savedEmail;
    // Vérifier le statut actuel
    checkAccessStatus(savedEmail, status);
  }

  const verifyAccess = async () => {
    const email = emailInput.value.trim().toLowerCase();

    if (!email || !email.includes('@')) {
      status.textContent = 'Entre une adresse email valide.';
      status.className = 'access-status error';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Vérification...';

    try {
      // D'abord vérifier si déjà autorisé
      const checkResponse = await fetch(`${ACCESS_WORKER_URL}/check-access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const checkData = await checkResponse.json();

      if (checkData.hasAccess) {
        localStorage.setItem(ACCESS_KEY, email);
        localStorage.setItem(ACCESS_STATUS_KEY, 'approved');
        status.textContent = 'Accès autorisé !';
        status.className = 'access-status success';
        setTimeout(() => {
          hideAccessGate();
          initApp();
        }, 800);
        return;
      }

      if (checkData.status === 'pending') {
        localStorage.setItem(ACCESS_KEY, email);
        localStorage.setItem(ACCESS_STATUS_KEY, 'pending');
        status.textContent = 'Demande en attente de validation. Reviens plus tard.';
        status.className = 'access-status pending';
        submitBtn.textContent = 'Vérifier mon accès';
        submitBtn.disabled = false;
        return;
      }

      if (checkData.status === 'rejected') {
        status.textContent = 'Accès refusé.';
        status.className = 'access-status error';
        submitBtn.textContent = 'Vérifier mon accès';
        submitBtn.disabled = false;
        return;
      }

      // Sinon, créer une nouvelle demande
      const requestResponse = await fetch(`${ACCESS_WORKER_URL}/request-access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const requestData = await requestResponse.json();

      localStorage.setItem(ACCESS_KEY, email);
      localStorage.setItem(ACCESS_STATUS_KEY, 'pending');

      status.textContent = 'Demande envoyée ! Tu recevras l\'accès après validation.';
      status.className = 'access-status pending';

    } catch (error) {
      console.error('Erreur accès:', error);
      status.textContent = 'Erreur de connexion. Réessaie.';
      status.className = 'access-status error';
    }

    submitBtn.textContent = 'Vérifier mon accès';
    submitBtn.disabled = false;
  };

  submitBtn.addEventListener('click', verifyAccess);
  emailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') verifyAccess();
  });
}

async function checkAccessStatus(email, statusEl) {
  try {
    const response = await fetch(`${ACCESS_WORKER_URL}/check-access`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (data.hasAccess) {
      localStorage.setItem(ACCESS_STATUS_KEY, 'approved');
      statusEl.textContent = 'Accès autorisé !';
      statusEl.className = 'access-status success';
      setTimeout(() => {
        hideAccessGate();
        initApp();
      }, 800);
    } else if (data.status === 'pending') {
      statusEl.textContent = 'Demande en attente de validation.';
      statusEl.className = 'access-status pending';
    } else if (data.status === 'rejected') {
      statusEl.textContent = 'Accès refusé.';
      statusEl.className = 'access-status error';
    }
  } catch (error) {
    console.error('Erreur vérification:', error);
  }
}

// ----- System prompt de base -----

const BASE_PROMPT = `Tu es un coach délibératif créé par Respons'Able. Tu aides les citoyens à préparer leur participation à des délibérations citoyennes (conventions citoyennes, budgets participatifs, assemblées citoyennes, etc.).

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
    welcome: "Dernière épreuve. Je deviens un citoyen qui n'est PAS d'accord avec toi — quelqu'un de respectueux, mais qui voit les choses autrement.\n\nDouble objectif : vivre le désaccord ET construire un vrai compromis ensemble. Pas un consensus mou — un terrain d'entente solide où chacun protège ce qui est essentiel pour lui.\n\nLance ta position. Je réplique.",
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

// ----- Phases EXPRESS (mode rapide) -----

const PHASES_EXPRESS = [
  {
    id: 1,
    name: 'Déclic',
    description: 'Identifie ton sujet et ce qui te motive',
    welcome: "Mode Express — on va droit au but.\n\nC'est quoi ton sujet, et ça te fait quoi d'en parler ?",
    prompt: `PHASE EXPRESS : Déclic
Tu es en mode ÉCOUTE INCISIVE. Même objectif que l'écoute radicale, mais en accéléré. Tu fais émerger le sujet ET l'émotion motrice rapidement.

STYLE EXPRESS :
- Maximum 2 phrases par réponse. Chaque mot compte.
- Direct, pas de bavardage. Mais toujours bienveillant.
- Tu t'adaptes à ce que dit la personne — JAMAIS de réponses scriptées.
- Tu tutoies. Tu parles cash. Tu respectes.

TECHNIQUE — ÉCOUTE ACCÉLÉRÉE :

1. CRÉER LA SÉCURITÉ vite :
   - Valide le sujet sans traîner. Une phrase suffit.
   - Pas de long disclaimer, on est en mode express.

2. ALLER AU FOND rapidement :
   - Au lieu de 3-4 "Et quoi d'autre ?", tu en fais 1-2 max.
   - Dès que tu sens un truc important, tu creuses direct : l'émotion, le besoin, la valeur.
   - Reformule de façon AMPLIFIÉE pour vérifier que t'as compris.

3. LA QUESTION QUI COMPTE :
   - "Pourquoi TOI tu te bats pour ça ?" — cherche le lien personnel.
   - Si c'est vague, demande un moment concret, un exemple vécu.

4. NOMMER ce qui émerge :
   - Quand tu captes l'émotion et la valeur derrière, nomme-les clairement.
   - Vérifie que c'est juste. Si oui, on passe aux arguments.

RÈGLES ABSOLUES :
- JAMAIS d'induction. Tu ne présumes pas ce que la personne ressent.
- Tu t'adaptes à SES mots, SON rythme, SA réalité.
- Si ça part en digression, recentre sans être brutal.

TRANSITION : Quand le sujet et l'émotion motrice sont clairs :
"OK, t'as ton sujet et ce qui te motive. On passe aux arguments. Clique sur Phase 2."`
  },
  {
    id: 2,
    name: 'Formulation',
    description: 'Construis tes arguments',
    welcome: "Bien. Maintenant on construit tes arguments.\n\nRaconte-moi le moment précis qui t'a fait basculer sur ce sujet — en 2-3 phrases.",
    prompt: `PHASE EXPRESS : Formulation
Tu aides à construire des arguments percutants, rapidement. Tu guides activement mais tu t'adaptes à la personne.

STYLE EXPRESS :
- Maximum 3 phrases par réponse.
- Tu peux PROPOSER des formulations basées sur ce qu'a dit la personne — mais c'est une proposition, pas un script.
- Si sa formulation est meilleure, tu la gardes.
- Langage ORAL, zéro jargon. Ça doit sonner naturel.

OBJECTIF : 3 arguments + 1 phrase-clé

1. ARGUMENT VISCÉRAL (le cœur) :
   - Pars de l'expérience personnelle qu'elle vient de raconter.
   - Aide à la transformer en récit court et percutant.
   - Ça doit toucher, pas juste informer.

2. ARGUMENT LOGIQUE (la tête) :
   - Cherche le fait, le chiffre, l'exemple concret qui soutient sa position.
   - Un seul, bien choisi. Pas une liste.
   - Aide à formuler : [Fait] → donc [conclusion].

3. ARGUMENT UNIVERSEL (le lien) :
   - En quoi ça concerne tout le monde, même ceux qui s'en foutent ?
   - Qu'est-ce que sa position APPORTE aux autres ?

4. LA PHRASE-CLÉ :
   - Si les gens ne retiennent qu'UNE phrase, c'est laquelle ?
   - Courte, frappante, mémorable.
   - Tu peux proposer, mais laisse-la choisir ou reformuler.

ANTICIPATION (optionnel si le temps) :
- L'objection la plus dure qu'on pourrait lui faire ?
- Comment elle répond ?

RÈGLES :
- Tu GUIDES mais tu ne FORCES pas. C'est SA parole, pas la tienne.
- Vérifie toujours : "C'est vraiment toi qui parle là ?"
- Authenticité > élégance.

FIN :
"T'as tes arguments. Génère ta synthèse avec le bouton vert."`
  }
];

// ----- Infos phases (bulle "i") -----

const PHASE_INFO_EXPRESS = {
  1: {
    title: 'Phase 1 — Déclic',
    why: 'Identifier ton sujet et ce qui te motive en 5 minutes.',
    benefit: 'Clarté sur ton carburant émotionnel.',
    tip: 'Pas de détour — dis ce qui te stresse vraiment.'
  },
  2: {
    title: 'Phase 2 — Formulation',
    why: 'Construire 3 arguments prêts à l\'emploi.',
    benefit: 'Une fiche avec tes arguments pour demain.',
    tip: 'Le coach propose, tu ajustes. C\'est du sur-mesure express.'
  }
};

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
    why: 'Vivre le désaccord ET apprendre à construire un compromis solide.',
    benefit: 'De la confiance et un vrai savoir-faire délibératif pour le jour J.',
    tip: 'Un bon compromis protège l\'essentiel de chacun — ce n\'est pas renoncer.'
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
  // Mode Express vs Maîtrise
  mode: null, // 'express' ou 'maitrise'
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
  // Mode Express vs Maîtrise
  if (state.mode === 'express') {
    return (i18n && i18n.PHASES_EXPRESS) || PHASES_EXPRESS;
  }
  return (i18n && i18n.PHASES) || PHASES;
}

function getPhase(phaseId) {
  return getPhases().find(p => p.id === phaseId);
}

function getPhaseInfo(phaseId) {
  const i18n = getI18n();
  // Mode Express vs Maîtrise
  if (state.mode === 'express') {
    return (i18n && i18n.PHASE_INFO_EXPRESS && i18n.PHASE_INFO_EXPRESS[phaseId]) || PHASE_INFO_EXPRESS[phaseId];
  }
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
    document.getElementById('view-title').textContent = t('coachTitle') || 'Coach Délibératif';
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
      mode: state.mode,
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
  localStorage.removeItem(ONBOARDING_KEY);
  state.currentPhase = 1;
  state.visitedPhases = new Set([1]);
  state.chatHistory = [];
  state.phaseSummaries = {};
  state.mode = null;
  state.toolkitSeenPhases = new Set();
  state.shownNuggets = new Set();
  state.phaseMessageCounts = {};
  state.impactBefore = null;
  state.impactAfter = null;
  state.impactShownBefore = false;
  document.getElementById('chat').innerHTML = '';
  document.getElementById('toolkit-banner').innerHTML = '';
  document.getElementById('toolkit-banner').classList.remove('visible', 'expanded');
  // Afficher le choix de mode au lieu de démarrer directement
  showModeChoice();
}

// ----- Choix du mode Express / Maîtrise -----

function showModeChoice() {
  const modal = document.getElementById('mode-modal');
  if (modal) {
    modal.classList.add('active');
  }
}

function hideModeChoice() {
  const modal = document.getElementById('mode-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function startSession(mode) {
  state.mode = mode;
  hideModeChoice();
  renderPhases();
  updatePhaseButtons();
  updatePhaseInfo();
  const phase = getPhase(1);
  addCoachMessage(phase.welcome);
  state.chatHistory.push({ role: 'assistant', content: phase.welcome });
  saveSession();
  updateProgress();
  showSuggestions();
  // Onboarding seulement en mode Maîtrise (plus long à expliquer)
  if (mode === 'maitrise') {
    const onboardingSeen = localStorage.getItem(ONBOARDING_KEY);
    if (!onboardingSeen) {
      showWalkthrough();
    }
    showImpactBefore();
  }
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
  // Vérifier l'accès beta d'abord
  setupAccessGate();

  if (checkAccess()) {
    initApp();
  } else {
    showAccessGate();
  }
}

function initApp() {
  initDarkMode();
  renderPhases();
  renderToolbox();
  setupEventListeners();
  setupWalkthroughListeners();

  const saved = loadSession();

  // Restore language
  const savedLang = localStorage.getItem('responsable-lang');
  if (savedLang) {
    state.lang = savedLang;
    const langSelect = document.getElementById('lang-select');
    if (langSelect) langSelect.value = savedLang;
  }

  if (saved && saved.chatHistory.length > 0 && saved.mode) {
    // Restaurer la session avec le mode
    state.mode = saved.mode;
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
    renderPhases(); // Re-render avec le bon mode
    updatePhaseButtons();
    updatePhaseInfo();
    restoreChat(saved.chatHistory);
    addSystemMessage(t('sessionRestored') || 'Session restaurée — tu peux reprendre où tu en étais.');
    updateProgress();
    showSuggestions();
    renderToolkitBanner(state.currentPhase);
  } else {
    // Nouvelle session : afficher le choix de mode
    showModeChoice();
  }

  // Event listeners pour le modal de choix de mode
  setupModeChoiceListeners();
}

function setupModeChoiceListeners() {
  const expressBtn = document.getElementById('mode-express-btn');
  const maitriseBtn = document.getElementById('mode-maitrise-btn');

  if (expressBtn) {
    expressBtn.addEventListener('click', () => startSession('express'));
  }
  if (maitriseBtn) {
    maitriseBtn.addEventListener('click', () => startSession('maitrise'));
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
    title.textContent = t('coachTitle') || 'Coach Délibératif';
    subtitle.textContent = t('coachSubtitle') || 'Prépare ta voix pour la délibération';
  } else if (viewId === 'toolbox') {
    title.textContent = t('toolboxTitle') || 'Boîte à outils mobilisation';
    subtitle.textContent = t('toolboxSubtitle') || 'Formes de mobilisation citoyenne';
  } else if (viewId === 'neuro') {
    title.textContent = t('neuroTitle') || 'Neuro Délibération';
    subtitle.textContent = t('neuroSubtitle') || 'Techniques neuroscientifiques par phase';
    renderNeuro();
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

  // Capturer la mémoire de la phase qu'on quitte (sans appel API = instantané)
  if (!state.phaseSummaries[oldPhaseId] && state.chatHistory.length >= 4) {
    // Prendre les derniers messages user + coach pour un résumé fidèle
    const userMessages = state.chatHistory
      .filter(m => m.role === 'user')
      .slice(-3)
      .map(m => m.content.substring(0, 150))
      .join(' | ');
    const coachMessages = state.chatHistory
      .filter(m => m.role === 'assistant')
      .slice(-2)
      .map(m => m.content.substring(0, 150))
      .join(' | ');
    const summary = [userMessages, coachMessages].filter(Boolean).join(' /// ');
    if (summary) {
      state.phaseSummaries[oldPhaseId] = summary.substring(0, 800);
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
    impactContext += `\n\nAUTO-ÉVALUATION AVANT : Confiance ${state.impactBefore.confiance}/5, Compréhension ${state.impactBefore.comprehension}/5, Formulation ${state.impactBefore.formulation}/5, Écoute ${state.impactBefore.ecoute}/5, Régulation ${state.impactBefore.regulation}/5`;
    if (state.impactAfter) {
      impactContext += `\nAUTO-ÉVALUATION APRÈS : Confiance ${state.impactAfter.confiance}/5, Compréhension ${state.impactAfter.comprehension}/5, Formulation ${state.impactAfter.formulation}/5, Écoute ${state.impactAfter.ecoute}/5, Régulation ${state.impactAfter.regulation}/5`;
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

    // Bouton "Voir mon parcours"
    addActionButton(t('goFurther') || 'Voir mon parcours', () => switchView('parcours'));

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

  const isEs = getLang() === 'es';
  const skills = [
    {
      key: 'confiance',
      label: isEs ? 'Confianza' : 'Confiance',
      desc: isEs ? 'para tomar la palabra' : 'pour oser prendre la parole'
    },
    {
      key: 'comprehension',
      label: isEs ? 'Comprensión' : 'Compréhension',
      desc: isEs ? 'del tema que quieres abordar' : 'du sujet que tu veux aborder'
    },
    {
      key: 'formulation',
      label: isEs ? 'Formulación' : 'Formulation',
      desc: isEs ? 'de tus ideas con claridad' : 'de tes idées avec clarté'
    },
    {
      key: 'ecoute',
      label: isEs ? 'Escucha' : 'Écoute',
      desc: isEs ? 'de opiniones diferentes' : "des avis différents du tien"
    },
    {
      key: 'regulation',
      label: isEs ? 'Regulación' : 'Régulation',
      desc: isEs ? 'de tus emociones en un debate' : 'de tes émotions en cas de désaccord'
    }
  ];

  card.innerHTML = `
    <div class="impact-title">${t('impactBeforeTitle') || 'Où en es-tu avant de commencer ?'}</div>
    <div class="impact-subtitle">${isEs ? 'Evalúa TUS 5 competencias personales (1 = débil, 5 = fuerte)' : 'Évalue TES 5 compétences personnelles (1\u00a0=\u00a0faible, 5\u00a0=\u00a0fort)'}</div>
    ${skills.map(skill => `
      <div class="impact-slider-row">
        <div class="impact-label-group">
          <label>${skill.label}</label>
          <span class="impact-label-desc">${skill.desc}</span>
        </div>
        <input type="range" min="1" max="5" value="3" class="impact-range impact-untouched" data-key="${skill.key}">
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
      if (touched.size === skills.length) {
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

    const isEs = getLang() === 'es';
    const skills = [
      {
        key: 'confiance',
        label: isEs ? 'Confianza' : 'Confiance',
        desc: isEs ? 'para tomar la palabra' : 'pour oser prendre la parole'
      },
      {
        key: 'comprehension',
        label: isEs ? 'Comprensión' : 'Compréhension',
        desc: isEs ? 'del tema que quieres abordar' : 'du sujet que tu veux aborder'
      },
      {
        key: 'formulation',
        label: isEs ? 'Formulación' : 'Formulation',
        desc: isEs ? 'de tus ideas con claridad' : 'de tes idées avec clarté'
      },
      {
        key: 'ecoute',
        label: isEs ? 'Escucha' : 'Écoute',
        desc: isEs ? 'de opiniones diferentes' : "des avis différents du tien"
      },
      {
        key: 'regulation',
        label: isEs ? 'Regulación' : 'Régulation',
        desc: isEs ? 'de tus emociones en un debate' : 'de tes émotions en cas de désaccord'
      }
    ];

    card.innerHTML = `
      <div class="impact-title">${t('impactAfterTitle') || 'Et maintenant, où en es-tu ?'}</div>
      <div class="impact-subtitle">${isEs ? 'Reevalúa TUS 5 competencias personales' : 'Réévalue TES 5 compétences personnelles'}</div>
      ${skills.map(skill => `
        <div class="impact-slider-row">
          <div class="impact-label-group">
            <label>${skill.label}</label>
            <span class="impact-label-desc">${skill.desc}</span>
          </div>
          <input type="range" min="1" max="5" value="3" class="impact-range impact-untouched" data-key="${skill.key}">
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
        if (afterTouched.size === skills.length) {
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
    comprehension: t('impactComprehension') || 'Compréhension',
    formulation: t('impactFormulation') || 'Formulation',
    ecoute: t('impactEcoute') || 'Écoute',
    regulation: t('impactRegulation') || 'Régulation'
  };
  const keys = ['confiance', 'comprehension', 'formulation', 'ecoute', 'regulation'];

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
      comprehension: t('impactComprehension') || 'Compréhension',
      formulation: t('impactFormulation') || 'Formulation',
      ecoute: t('impactEcoute') || 'Écoute',
      regulation: t('impactRegulation') || 'Régulation'
    };
    const keys = ['confiance', 'comprehension', 'formulation', 'ecoute', 'regulation'];

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

  container.innerHTML = html;
}

// ----- Vue "Neuro Délibération" -----

function renderNeuro() {
  const container = document.getElementById('neuro-content');
  let html = `<h2 class="parcours-main-title">${t('neuroTitle') || 'Neuro Délibération'}</h2>`;
  html += `<p class="neuro-intro">${t('neuroIntro') || 'Techniques neuroscientifiques pour chaque phase de ta préparation. Prouvées par la recherche, prêtes à utiliser.'}</p>`;

  const phaseNames = { 2: 'Exploration', 3: 'Clarification', 4: 'Formulation', 5: 'Confrontation', 6: 'Simulation' };

  for (const phaseId of [2, 3, 4, 5, 6]) {
    const toolkit = getToolkit(phaseId);
    if (!toolkit) continue;

    html += `
      <div class="parcours-phase-group">
        <div class="parcours-phase-label">${t('phaseLabel') || 'Phase'} ${phaseId} \u2014 ${phaseNames[phaseId]}</div>
        ${toolkit.tools.map((tool, i) => `
          <div class="detail-section" id="neuro-tool-${phaseId}-${i}">
            <div class="detail-section-header" onclick="document.getElementById('neuro-tool-${phaseId}-${i}').classList.toggle('open')">
              <h4>${tool.name}</h4>
              <span class="detail-toggle">+</span>
            </div>
            <div class="detail-section-body">
              <p class="toolkit-tool-oneliner" style="margin-bottom:8px;font-weight:600">${tool.oneliner}</p>
              <p class="toolkit-neuroscience">${tool.neuroscience}</p>
              <ol class="toolkit-steps">${tool.steps.map(s => `<li>${s}</li>`).join('')}</ol>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

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

// ----- Onboarding Tutorial -----

const ONBOARDING_KEY = 'responsable-onboarding-seen';

const PHASE_DESCRIPTIONS_FR = {
  1: { name: 'Expression libre', desc: 'Exprime librement ce qui te préoccupe dans la société.' },
  2: { name: 'Exploration', desc: 'Explore tes émotions, tes valeurs, ce qui te touche vraiment.' },
  3: { name: 'Clarification', desc: 'Clarifie ta position et structure ta pensée.' },
  4: { name: 'Formulation', desc: 'Formule des arguments clairs et convaincants.' },
  5: { name: 'Confrontation', desc: 'Confronte ta position aux faits et aux contre-arguments.' },
  6: { name: 'Simulation', desc: 'Simule un débat réel et apprends à gérer le désaccord.' }
};

const PHASE_DESCRIPTIONS_ES = {
  1: { name: 'Expresión libre', desc: 'Expresa libremente lo que te preocupa de la sociedad.' },
  2: { name: 'Exploración', desc: 'Explora tus emociones, tus valores, lo que realmente te importa.' },
  3: { name: 'Clarificación', desc: 'Clarifica tu posición y estructura tu pensamiento.' },
  4: { name: 'Formulación', desc: 'Formula argumentos claros y convincentes.' },
  5: { name: 'Confrontación', desc: 'Confronta tu posición con los hechos y contraargumentos.' },
  6: { name: 'Simulación', desc: 'Simula un debate real y aprende a gestionar el desacuerdo.' }
};

function getPhaseDescriptions() {
  return getLang() === 'es' ? PHASE_DESCRIPTIONS_ES : PHASE_DESCRIPTIONS_FR;
}

// ----- Walkthrough Tutorial (in-page) -----

let walkthroughStep = 0;
let highlightedElement = null;

function getWalkthroughSteps() {
  const isEs = getLang() === 'es';
  return [
    {
      target: null, // No target, centered modal for intro
      icon: '\ud83c\udfaf',
      title: isEs ? 'Bienvenido a Coach Délibératif' : 'Bienvenue sur Coach Délibératif',
      text: isEs
        ? 'Prepara tu voz para la deliberaci\u00f3n ciudadana. Las t\u00e9cnicas que vas a descubrir aqu\u00ed te servir\u00e1n tambi\u00e9n en tu d\u00eda a d\u00eda \u2014 reuniones, debates, conversaciones dif\u00edciles.'
        : 'Pr\u00e9pare ta voix pour la d\u00e9lib\u00e9ration citoyenne. Les techniques que tu vas d\u00e9couvrir ici te serviront aussi au quotidien \u2014 r\u00e9unions, d\u00e9bats, conversations difficiles.'
    },
    {
      target: '#phases-nav',
      icon: '\ud83d\udccd',
      title: isEs ? 'Un recorrido en 6 fases' : 'Un parcours en 6 phases',
      text: isEs
        ? 'Cada fase te gu\u00eda: expresi\u00f3n libre, exploraci\u00f3n emocional, clarificaci\u00f3n, formulaci\u00f3n de argumentos, confrontaci\u00f3n con los hechos, y simulaci\u00f3n de debate.'
        : 'Chaque phase te guide : expression libre, exploration \u00e9motionnelle, clarification, formulation d\'arguments, confrontation aux faits, et simulation de d\u00e9bat.',
      position: 'bottom'
    },
    {
      target: '.impact-card',
      fallbackTarget: '#chat',
      icon: '\ud83d\udcca',
      title: isEs ? 'Mide tu evoluci\u00f3n' : 'Mesure ton \u00e9volution',
      text: isEs
        ? 'Al inicio y al final de cada sesi\u00f3n, eval\u00faa TUS 5 competencias personales: Confianza, Comprensi\u00f3n, Formulaci\u00f3n, Escucha, Regulaci\u00f3n.'
        : 'Au d\u00e9but et \u00e0 la fin de chaque session, \u00e9value TES 5 comp\u00e9tences personnelles : Confiance, Compr\u00e9hension, Formulation, \u00c9coute, R\u00e9gulation.',
      position: 'screen-bottom'
    },
    {
      target: '#toolkit-banner',
      fallbackTarget: '#phase-info-text',
      icon: '\ud83e\udde0',
      title: isEs ? 'T\u00e9cnicas validadas' : 'Des techniques valid\u00e9es',
      text: isEs
        ? 'En cada fase, herramientas basadas en neurociencias te acompa\u00f1an. Tambi\u00e9n ver\u00e1s "\u00bfSab\u00edas que?" con insights sobre tu cerebro en situaci\u00f3n de debate.'
        : '\u00c0 chaque phase, des outils issus des neurosciences t\'accompagnent. Tu verras aussi des "Le saviez-vous ?" avec des insights sur ton cerveau en situation de d\u00e9bat.',
      position: 'screen-bottom'
    },
    {
      target: '[data-view="toolbox"]',
      icon: '\ud83d\udee0\ufe0f',
      title: isEs ? 'Caja de herramientas' : 'Bo\u00eete \u00e0 outils mobilisation',
      text: isEs
        ? 'M\u00e1s all\u00e1 del coaching, descubre las formas concretas de movilizaci\u00f3n ciudadana: peticiones, manifestaciones, lobbying ciudadano...'
        : 'Au-del\u00e0 du coaching, d\u00e9couvre les formes concr\u00e8tes de mobilisation citoyenne : p\u00e9titions, manifestations, lobbying citoyen...',
      position: 'right'
    },
    {
      target: null,
      icon: null,
      customVisual: `
        <div class="congruence-visual">
          <!-- MOI : Cercle de congruence -->
          <div class="congruence-circle-container">
            <!-- Partie qui tourne (cercle + émotes + labels ensemble) -->
            <div class="congruence-circle-inner">
              <!-- Cercle en 3 arcs avec gradient -->
              <svg class="congruence-arcs" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="congruence-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:var(--primary-light)"/>
                    <stop offset="100%" style="stop-color:var(--primary)"/>
                  </linearGradient>
                </defs>
                <circle class="arc-bg" cx="50" cy="50" r="45"/>
                <circle class="arc-main" cx="50" cy="50" r="45" transform="rotate(-90 50 50)"/>
              </svg>
              <!-- Éléments (émote + label attachés) -->
              <div class="congruence-elements">
                <div class="c-elem c-expr">
                  <span class="emoji">💬</span>
                  <span class="txt">Expression</span>
                  <span class="sub">(ce qu'on dit/fait)</span>
                </div>
                <div class="c-elem c-cons">
                  <span class="emoji">🧠</span>
                  <span class="txt">Conscience</span>
                  <span class="sub">(ce qu'on pense)</span>
                </div>
                <div class="c-elem c-expe">
                  <span class="emoji">❤️</span>
                  <span class="txt">Expérience</span>
                  <span class="sub">(ce qu'on ressent)</span>
                </div>
              </div>
            </div>
            <div class="congruence-center">CONGRUENCE<br>INDIVIDUELLE</div>
          </div>

          <!-- FLÈCHE lumineuse (part du centre) -->
          <div class="flux-container">
            <div class="flux-beam"></div>
            <div class="flux-arrow-head"></div>
            <div class="flux-particles">
              <div class="flux-particle"></div>
              <div class="flux-particle"></div>
              <div class="flux-particle"></div>
              <div class="flux-particle"></div>
            </div>
          </div>

          <!-- SOCIÉTÉ : Grand cercle avec mini-congruences -->
          <div class="societe-container">
            <div class="societe-boundary"></div>
            <div class="mini-congruence-container">
              <div class="mini-congruence">
                <div class="mini-congruence-inner">
                  <div class="mini-congruence-ring"></div>
                  <div class="mini-congruence-icons">
                    <span class="mini-expr">💬</span>
                    <span class="mini-cons">🧠</span>
                    <span class="mini-expe">❤️</span>
                  </div>
                </div>
              </div>
              <div class="mini-congruence">
                <div class="mini-congruence-inner">
                  <div class="mini-congruence-ring"></div>
                  <div class="mini-congruence-icons">
                    <span class="mini-expr">💬</span>
                    <span class="mini-cons">🧠</span>
                    <span class="mini-expe">❤️</span>
                  </div>
                </div>
              </div>
              <div class="mini-congruence">
                <div class="mini-congruence-inner">
                  <div class="mini-congruence-ring"></div>
                  <div class="mini-congruence-icons">
                    <span class="mini-expr">💬</span>
                    <span class="mini-cons">🧠</span>
                    <span class="mini-expe">❤️</span>
                  </div>
                </div>
              </div>
              <div class="mini-congruence">
                <div class="mini-congruence-inner">
                  <div class="mini-congruence-ring"></div>
                  <div class="mini-congruence-icons">
                    <span class="mini-expr">💬</span>
                    <span class="mini-cons">🧠</span>
                    <span class="mini-expe">❤️</span>
                  </div>
                </div>
              </div>
              <div class="mini-congruence">
                <div class="mini-congruence-inner">
                  <div class="mini-congruence-ring"></div>
                  <div class="mini-congruence-icons">
                    <span class="mini-expr">💬</span>
                    <span class="mini-cons">🧠</span>
                    <span class="mini-expe">❤️</span>
                  </div>
                </div>
              </div>
              <div class="mini-congruence">
                <div class="mini-congruence-inner">
                  <div class="mini-congruence-ring"></div>
                  <div class="mini-congruence-icons">
                    <span class="mini-expr">💬</span>
                    <span class="mini-cons">🧠</span>
                    <span class="mini-expe">❤️</span>
                  </div>
                </div>
              </div>
              <div class="mini-congruence">
                <div class="mini-congruence-inner">
                  <div class="mini-congruence-ring"></div>
                  <div class="mini-congruence-icons">
                    <span class="mini-expr">💬</span>
                    <span class="mini-cons">🧠</span>
                    <span class="mini-expe">❤️</span>
                  </div>
                </div>
              </div>
            </div>
            <span class="societe-label">SOCIÉTÉ</span>
          </div>
        </div>
      `,
      title: isEs ? 'Alinéate para impactar' : 'Aligne-toi pour impacter',
      text: isEs
        ? 'Cuando lo que sientes, piensas y expresas están alineados, tu voz se vuelve auténtica y poderosa. Es esta congruencia interior y tu acción las que te permiten impactar realmente a la sociedad.'
        : 'Quand ce que tu ressens, penses et exprimes sont alignés, ta voix devient authentique et puissante. C\'est cette congruence intérieure et ton action qui te permettent d\'impacter vraiment la société.'
    },
    {
      target: null,
      icon: '🚀',
      title: isEs ? '¡Vamos!' : "C'est parti !",
      text: isEs
        ? 'Estás listo para comenzar tu recorrido.'
        : 'Tu es prêt à commencer ton parcours.'
    }
  ];
}

function showWalkthrough() {
  walkthroughStep = 0;
  updateWalkthroughStep();
}

function hideWalkthrough() {
  // Remove highlight
  if (highlightedElement) {
    highlightedElement.classList.remove('walkthrough-highlight');
    highlightedElement = null;
  }
  // Hide overlay and tooltip
  document.getElementById('walkthrough-overlay').classList.remove('visible');
  document.getElementById('walkthrough-tooltip').classList.remove('visible');
  // Fermer le menu s'il est ouvert (après slide 4)
  document.getElementById('side-menu').classList.remove('open');
  document.getElementById('menu-overlay').classList.remove('visible');
  document.getElementById('menu-overlay').style.zIndex = '';
  // Remettre le toolkit à la phase actuelle (on l'avait changé pour la slide 3)
  renderToolkitBanner(state.currentPhase);
  // Save to localStorage
  localStorage.setItem(ONBOARDING_KEY, 'true');
}

function updateWalkthroughStep() {
  const steps = getWalkthroughSteps();
  const step = steps[walkthroughStep];
  const isEs = getLang() === 'es';

  // Update icon or custom visual
  const iconEl = document.getElementById('walkthrough-icon');
  if (step.customVisual) {
    iconEl.innerHTML = step.customVisual;
    // Lancer détection collisions si c'est la slide congruence
    setTimeout(initMiniCongruenceCollisions, 100);
  } else {
    iconEl.textContent = step.icon || '';
  }

  // Update content
  document.getElementById('walkthrough-title').textContent = step.title;
  document.getElementById('walkthrough-text').textContent = step.text;

  // Update dots
  const dotsContainer = document.getElementById('walkthrough-dots');
  dotsContainer.innerHTML = steps.map((_, i) =>
    `<span class="dot${i === walkthroughStep ? ' active' : ''}" data-step="${i}"></span>`
  ).join('');

  // Update buttons
  document.getElementById('walkthrough-skip').textContent = isEs ? 'Saltar' : 'Passer';

  const prevBtn = document.getElementById('walkthrough-prev');
  prevBtn.textContent = isEs ? 'Anterior' : 'Précédent';
  prevBtn.disabled = walkthroughStep === 0;

  const nextBtn = document.getElementById('walkthrough-next');
  const isLastStep = walkthroughStep === steps.length - 1;
  nextBtn.textContent = isLastStep ? (isEs ? 'Comenzar' : 'Commencer') : (isEs ? 'Siguiente' : 'Suivant');
  nextBtn.classList.toggle('finish', isLastStep);

  // Remove previous highlight
  if (highlightedElement) {
    highlightedElement.classList.remove('walkthrough-highlight');
    highlightedElement = null;
  }

  // Gestion spéciale des slides
  const sideMenu = document.getElementById('side-menu');
  const menuOverlay = document.getElementById('menu-overlay');

  // Slide 3 (index 3) : afficher le toolkit de la phase 2 pour montrer le bandeau avec cerveau
  if (walkthroughStep === 3) {
    renderToolkitBanner(2); // Phase 2 a des techniques à afficher
  }

  // Slide 4 (index 4) : ouvrir le menu pour montrer le bouton toolbox
  if (walkthroughStep === 4) {
    sideMenu.classList.add('open');
    menuOverlay.style.zIndex = '999'; // Sous le walkthrough overlay (1000)
    menuOverlay.classList.add('visible');
  } else {
    sideMenu.classList.remove('open');
    menuOverlay.style.zIndex = '';
    menuOverlay.classList.remove('visible');
  }

  // Show overlay
  document.getElementById('walkthrough-overlay').classList.add('visible');

  // Position tooltip
  const tooltip = document.getElementById('walkthrough-tooltip');
  const arrow = document.getElementById('walkthrough-arrow');

  if (step.target) {
    let targetEl = document.querySelector(step.target);
    if (!targetEl && step.fallbackTarget) {
      targetEl = document.querySelector(step.fallbackTarget);
    }

    if (targetEl) {
      // Highlight target element
      targetEl.classList.add('walkthrough-highlight');
      highlightedElement = targetEl;

      // Position tooltip near target
      positionTooltip(targetEl, tooltip, arrow, step.position || 'bottom');
    } else {
      // Fallback to centered
      centerTooltip(tooltip, arrow);
    }
  } else {
    // No target, center tooltip
    centerTooltip(tooltip, arrow);
  }

  tooltip.classList.add('visible');
}

function positionTooltip(targetEl, tooltip, arrow, position) {
  const targetRect = targetEl.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const margin = 16;
  const arrowSize = 8;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Reset arrow classes
  arrow.className = 'walkthrough-arrow';

  let top, left;

  switch (position) {
    case 'top':
      top = targetRect.top - tooltipRect.height - margin - arrowSize;
      left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
      arrow.classList.add('arrow-bottom');
      break;
    case 'bottom':
      top = targetRect.bottom + margin + arrowSize;
      left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
      arrow.classList.add('arrow-top');
      break;
    case 'screen-bottom':
      // Tooltip fixé en bas de l'écran, flèche pointe vers l'élément
      top = viewportHeight - tooltipRect.height - margin - 60; // 60px pour la barre d'input
      left = (viewportWidth - tooltipRect.width) / 2;
      arrow.classList.add('arrow-top');
      break;
    case 'left':
      top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
      left = targetRect.left - tooltipRect.width - margin - arrowSize;
      arrow.classList.add('arrow-right');
      break;
    case 'right':
      top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
      left = targetRect.right + margin + arrowSize;
      arrow.classList.add('arrow-left');
      break;
    default:
      top = targetRect.bottom + margin + arrowSize;
      left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
      arrow.classList.add('arrow-top');
  }

  // Ensure tooltip stays within viewport

  if (left < margin) left = margin;
  if (left + tooltipRect.width > viewportWidth - margin) left = viewportWidth - tooltipRect.width - margin;
  if (top < margin) {
    top = targetRect.bottom + margin + arrowSize;
    arrow.className = 'walkthrough-arrow arrow-top';
  }
  if (top + tooltipRect.height > viewportHeight - margin) {
    top = targetRect.top - tooltipRect.height - margin - arrowSize;
    arrow.className = 'walkthrough-arrow arrow-bottom';
  }

  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;
}

function centerTooltip(tooltip, arrow) {
  arrow.className = 'walkthrough-arrow';
  arrow.style.display = 'none';
  tooltip.style.top = '50%';
  tooltip.style.left = '50%';
  tooltip.style.transform = 'translate(-50%, -50%)';
}

function nextWalkthroughStep() {
  const steps = getWalkthroughSteps();
  if (walkthroughStep < steps.length - 1) {
    walkthroughStep++;
    resetTooltipPosition();
    updateWalkthroughStep();
  } else {
    hideWalkthrough();
  }
}

function prevWalkthroughStep() {
  if (walkthroughStep > 0) {
    walkthroughStep--;
    resetTooltipPosition();
    updateWalkthroughStep();
  }
}

function goToWalkthroughStep(stepIndex) {
  const steps = getWalkthroughSteps();
  if (stepIndex >= 0 && stepIndex < steps.length) {
    walkthroughStep = stepIndex;
    resetTooltipPosition();
    updateWalkthroughStep();
  }
}

function resetTooltipPosition() {
  const tooltip = document.getElementById('walkthrough-tooltip');
  tooltip.style.transform = '';
  document.getElementById('walkthrough-arrow').style.display = '';
}

function setupWalkthroughListeners() {
  document.getElementById('walkthrough-skip').addEventListener('click', hideWalkthrough);
  document.getElementById('walkthrough-next').addEventListener('click', nextWalkthroughStep);
  document.getElementById('walkthrough-prev').addEventListener('click', prevWalkthroughStep);

  // Dot navigation (event delegation)
  document.getElementById('walkthrough-dots').addEventListener('click', (e) => {
    if (e.target.classList.contains('dot')) {
      goToWalkthroughStep(parseInt(e.target.dataset.step));
    }
  });

  // Close on overlay click
  document.getElementById('walkthrough-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) hideWalkthrough();
  });
}

// ----- Détection collision mini-congruences -----

let collisionAnimationId = null;

function initMiniCongruenceCollisions() {
  // Arrêter l'animation précédente si elle existe
  if (collisionAnimationId) {
    cancelAnimationFrame(collisionAnimationId);
    collisionAnimationId = null;
  }

  const container = document.querySelector('.mini-congruence-container');
  if (!container) return;

  const minis = container.querySelectorAll('.mini-congruence');
  if (minis.length < 2) return;

  const collisionDistance = 25; // Distance pour collision

  function checkCollisions() {
    const positions = [];

    // Récupérer les positions actuelles
    minis.forEach(mini => {
      const rect = mini.getBoundingClientRect();
      positions.push({
        el: mini,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    });

    // Vérifier les collisions entre chaque paire
    minis.forEach(mini => mini.classList.remove('colliding'));

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dx = positions[i].x - positions[j].x;
        const dy = positions[i].y - positions[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < collisionDistance) {
          positions[i].el.classList.add('colliding');
          positions[j].el.classList.add('colliding');
        }
      }
    }

    collisionAnimationId = requestAnimationFrame(checkCollisions);
  }

  checkCollisions();
}

// ----- Lancement -----

document.addEventListener('DOMContentLoaded', init);
