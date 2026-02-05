// ============================================
// Toolkit Neuro — Techniques par phase + Nuggets
// ============================================

const PHASE_TOOLKIT = {
  // Phase 1 : pas de toolkit (expression libre)
  2: {
    tools: [
      {
        id: 'label-locate',
        name: 'Label & Locate',
        oneliner: 'Nomme ton \u00e9motion et localise-la dans ton corps.',
        neuroscience: 'Nommer une \u00e9motion active le cortex pr\u00e9frontal et r\u00e9duit l\u2019activit\u00e9 de l\u2019amygdale de 50\u00a0% (Lieberman et\u00a0al., UCLA 2007). C\u2019est l\u2019effet \u00ab\u00a0affect labeling\u00a0\u00bb : mettre un mot sur ce qu\u2019on ressent suffit \u00e0 r\u00e9guler.',
        steps: [
          'Quand une \u00e9motion monte, arr\u00eate-toi une seconde.',
          'Nomme-la le plus pr\u00e9cis\u00e9ment possible : \u00ab\u00a0frustration\u00a0\u00bb, \u00ab\u00a0impuissance\u00a0\u00bb, \u00ab\u00a0indignation\u00a0\u00bb\u2026',
          'Localise-la dans ton corps : gorge serr\u00e9e\u00a0? Poing ferm\u00e9\u00a0? Ventre nou\u00e9\u00a0?',
          'Observe-la 10\u00a0secondes sans chercher \u00e0 la changer.'
        ]
      },
      {
        id: 'trigger-mapping',
        name: 'Trigger Mapping',
        oneliner: 'Identifie ce qui d\u00e9clenche tes r\u00e9actions fortes.',
        neuroscience: 'Le cerveau cr\u00e9e des raccourcis \u00e9motionnels (via l\u2019amygdale) pour r\u00e9agir vite aux menaces per\u00e7ues. En identifiant consciemment ces d\u00e9clencheurs, tu cr\u00e9es de nouvelles connexions neuronales qui permettent une r\u00e9ponse plus r\u00e9fl\u00e9chie (LeDoux, 2015).',
        steps: [
          'Note les moments o\u00f9 tu r\u00e9agis fort (col\u00e8re, indignation, m\u00e9pris).',
          'Identifie le d\u00e9clencheur : un mot, un ton, un sujet, un type de personne\u00a0?',
          'Demande-toi : qu\u2019est-ce qui est menac\u00e9 en moi\u00a0?',
          'La prochaine fois, tu reconna\u00eetras le signal avant la r\u00e9action.'
        ]
      },
      {
        id: 'body-scan',
        name: 'Body Scan rapide',
        oneliner: 'Scanne ton corps en 30\u00a0secondes pour identifier tes tensions.',
        neuroscience: 'La conscience int\u00e9roceptive (conscience des signaux corporels) est directement corr\u00e9l\u00e9e \u00e0 l\u2019intelligence \u00e9motionnelle (Craig, 2009). Les \u00e9motions commencent dans le corps avant d\u2019atteindre la conscience.',
        steps: [
          'Ferme les yeux 30\u00a0secondes.',
          'Scanne de la t\u00eate aux pieds : o\u00f9 est la tension\u00a0?',
          'Respire vers cette zone 3\u00a0fois.',
          'Observe ce qui change.'
        ]
      }
    ]
  },
  3: {
    tools: [
      {
        id: 'trois-colonnes',
        name: 'Technique des 3\u00a0colonnes',
        oneliner: 'S\u00e9pare les faits, tes interpr\u00e9tations et tes valeurs.',
        neuroscience: 'Le cerveau fusionne automatiquement perception et interpr\u00e9tation (biais de cadrage, Tversky & Kahneman, 1981). Forcer la s\u00e9paration explicite active le syst\u00e8me\u00a02 (pens\u00e9e d\u00e9lib\u00e9r\u00e9e) et r\u00e9duit les erreurs de jugement.',
        steps: [
          'Prends ta position et d\u00e9coupe-la en 3\u00a0colonnes.',
          'Colonne\u00a01 \u2014 FAITS : ce qui est v\u00e9rifiable objectivement.',
          'Colonne\u00a02 \u2014 INTERPR\u00c9TATIONS : ce que tu en conclus (l\u00e9gitime mais personnel).',
          'Colonne\u00a03 \u2014 VALEURS : ce en quoi tu crois, ind\u00e9pendamment des faits.'
        ]
      },
      {
        id: 'question-paradoxale',
        name: 'Question paradoxale',
        oneliner: '\u00ab\u00a0Et si j\u2019avais tort\u00a0?\u00a0\u00bb \u2014 la question qui lib\u00e8re la pens\u00e9e.',
        neuroscience: 'Se forcer \u00e0 envisager l\u2019hypoth\u00e8se contraire active le cortex pr\u00e9frontal dorsolat\u00e9ral, la zone du doute constructif. Cela d\u00e9sactive momentan\u00e9ment le biais de confirmation et ouvre l\u2019espace cognitif (Mercier & Sperber, 2011).',
        steps: [
          'Prends ta conviction la plus forte.',
          'Pose-toi : \u00ab\u00a0Et si j\u2019avais compl\u00e8tement tort\u00a0?\u00a0\u00bb',
          'Note ce qui change dans ta perception.',
          'Ce qui r\u00e9siste \u00e0 l\u2019exercice est ton noyau dur \u2014 ta vraie position.'
        ]
      }
    ]
  },
  4: {
    tools: [
      {
        id: 'regle-6-secondes',
        name: 'R\u00e8gle des 6\u00a0secondes',
        oneliner: '6\u00a0secondes de pause entre le stimulus et ta r\u00e9ponse.',
        neuroscience: 'Il faut environ 6\u00a0secondes pour que le cortisol (hormone du stress) traverse le cerveau. Attendre 6\u00a0secondes avant de r\u00e9pondre permet au cortex pr\u00e9frontal de reprendre le contr\u00f4le sur l\u2019amygdale (Goleman, 2006).',
        steps: [
          'Quand une objection te touche, ne r\u00e9ponds pas tout de suite.',
          'Compte silencieusement jusqu\u2019\u00e0 6.',
          'Pendant ce temps, observe ta premi\u00e8re r\u00e9action sans agir dessus.',
          'Puis r\u00e9ponds depuis ta pens\u00e9e r\u00e9fl\u00e9chie, pas ta r\u00e9action.'
        ]
      },
      {
        id: 'steelman-reflexe',
        name: 'Steelman r\u00e9flexe',
        oneliner: 'Reformule l\u2019argument adverse en version PLUS forte avant de r\u00e9pondre.',
        neuroscience: 'Le steelmanning force le cerveau \u00e0 simuler la perspective de l\u2019autre, activant le r\u00e9seau de la mentalisation (jonction temporo-pari\u00e9tale). \u00c7a am\u00e9liore la qualit\u00e9 de tes propres arguments par effet de contraste (Epley et\u00a0al., 2004).',
        steps: [
          '\u00c9coute l\u2019argument de l\u2019autre jusqu\u2019au bout.',
          'Reformule-le en version PLUS forte : \u00ab\u00a0Si je te comprends bien, tu dis que\u2026\u00a0\u00bb',
          'Assure-toi que l\u2019autre valide ta reformulation.',
          'ENSUITE seulement, r\u00e9ponds. Ton contre-argument sera bien plus percutant.'
        ]
      },
      {
        id: 'phrase-ancre',
        name: 'Phrase-ancre',
        oneliner: 'Une phrase-rep\u00e8re pour te recentrer quand tu perds pied.',
        neuroscience: 'Les ancres cognitives fonctionnent comme des raccourcis du cortex pr\u00e9frontal. En situation de stress, le cerveau cherche des patterns familiers. Une phrase pr\u00e9par\u00e9e \u00e0 l\u2019avance sert de bou\u00e9e de sauvetage neurologique (Baumeister et\u00a0al., 2007).',
        steps: [
          '\u00c9cris une phrase qui r\u00e9sume ta position en 10\u00a0mots max.',
          'M\u00e9morise-la comme un r\u00e9flexe.',
          'Quand tu perds le fil en d\u00e9lib\u00e9ration, reviens \u00e0 cette phrase.',
          'Exemple : \u00ab\u00a0Je d\u00e9fends \u00e7a parce que X est non-n\u00e9gociable pour moi.\u00a0\u00bb'
        ]
      }
    ]
  },
  5: {
    tools: [
      {
        id: 'biais-confirmation',
        name: 'Biais de confirmation',
        oneliner: 'Ton cerveau cherche les preuves qui te donnent raison. Sache-le.',
        neuroscience: 'Le biais de confirmation est le biais cognitif le plus puissant : le cerveau filtre inconsciemment l\u2019information pour confirmer les croyances existantes (Nickerson, 1998). En \u00eatre conscient ne l\u2019\u00e9limine pas, mais r\u00e9duit son impact d\u2019environ 30\u00a0%.',
        steps: [
          'Avant de chercher des infos, note ta position actuelle.',
          'Cherche ACTIVEMENT 3\u00a0arguments ou faits CONTRE ta position.',
          '\u00c9value-les honn\u00eatement : lequel est le plus solide\u00a0?',
          'Ajuste ta position si n\u00e9cessaire \u2014 ou renforce-la en connaissance de cause.'
        ]
      },
      {
        id: 'echelle-certitude',
        name: '\u00c9chelle de certitude',
        oneliner: 'Note ta certitude de 1 \u00e0 10 avant et apr\u00e8s la confrontation.',
        neuroscience: 'Quantifier sa certitude engage le cortex cingulaire ant\u00e9rieur, la zone du \u00ab\u00a0moniteur de conflits\u00a0\u00bb cognitif. \u00c7a force une \u00e9valuation m\u00e9ta-cognitive qui r\u00e9duit le biais de surconfiance (Fleming & Dolan, 2012).',
        steps: [
          'Avant la confrontation : \u00ab\u00a0Ma certitude sur cette position est de X/10.\u00a0\u00bb',
          'Note pourquoi tu es \u00e0 ce niveau (pas plus haut, pas plus bas).',
          'Apr\u00e8s la confrontation : r\u00e9\u00e9value. \u00ab\u00a0Maintenant je suis \u00e0 Y/10.\u00a0\u00bb',
          'Le delta (X\u2212Y) t\u2019apprend quelque chose sur ta flexibilit\u00e9 intellectuelle.'
        ]
      }
    ]
  },
  6: {
    tools: [
      {
        id: 'point-accord-minimum',
        name: 'Point d\u2019accord minimum',
        oneliner: 'Trouve UN point d\u2019accord avec ton adversaire avant de d\u00e9battre.',
        neuroscience: 'L\u2019accord active le circuit de la r\u00e9compense (striatum ventral) et r\u00e9duit la r\u00e9ponse de menace sociale. Commencer par un accord, m\u00eame minime, change la dynamique neuronale : du mode combat au mode collaboration (Tabibnia & Lieberman, 2007).',
        steps: [
          '\u00c9coute ton opposant et identifie UN point sur lequel tu es d\u2019accord.',
          'Dis-le explicitement : \u00ab\u00a0On est d\u2019accord sur [X].\u00a0\u00bb',
          'Construis ton d\u00e9saccord DEPUIS ce point d\u2019accord.',
          '\u00c7a transforme \u00ab\u00a0toi vs moi\u00a0\u00bb en \u00ab\u00a0nous vs le probl\u00e8me\u00a0\u00bb.'
        ]
      },
      {
        id: 'zoom-out',
        name: 'Zoom Out',
        oneliner: 'Recule de 3\u00a0pas pour voir le tableau complet.',
        neuroscience: 'La perspective \u00e9largie active le cortex pr\u00e9frontal m\u00e9dian et d\u00e9sactive le mode \u00ab\u00a0tunnel\u00a0\u00bb de l\u2019amygdale. Prendre du recul physique et mental r\u00e9active la pens\u00e9e syst\u00e9mique (Kross et\u00a0al., 2014).',
        steps: [
          'Quand le d\u00e9bat s\u2019enlise, pose-toi : \u00ab\u00a0Dans 10\u00a0ans, qu\u2019est-ce qui compte\u00a0?\u00a0\u00bb',
          'Reformule le d\u00e9bat \u00e0 un niveau d\u2019abstraction sup\u00e9rieur.',
          'Cherche l\u2019objectif commun derri\u00e8re les positions oppos\u00e9es.',
          '\u00c7a d\u00e9bloque souvent une impasse en changeant le cadre.'
        ]
      },
      {
        id: 'steelman-live',
        name: 'Steelman en live',
        oneliner: 'En plein d\u00e9bat, reformule la position adverse mieux que l\u2019adversaire.',
        neuroscience: 'Version avanc\u00e9e du steelmanning. En situation de stress social, le faire en temps r\u00e9el force le cortex pr\u00e9frontal \u00e0 rester aux commandes malgr\u00e9 la pression \u00e9motionnelle. C\u2019est un exercice de contr\u00f4le cognitif sous charge (Ochsner & Gross, 2005).',
        steps: [
          'En plein \u00e9change, arr\u00eate-toi : \u00ab\u00a0Attends, je veux \u00eatre s\u00fbr de bien te comprendre.\u00a0\u00bb',
          'Reformule sa position de la fa\u00e7on la plus forte possible.',
          'Attends sa validation : \u00ab\u00a0C\u2019est bien \u00e7a\u00a0?\u00a0\u00bb',
          'Puis expose ton point de vue. L\u2019effet de respect mutuel est imm\u00e9diat.'
        ]
      }
    ]
  }
};

// ---- Nuggets "Le saviez-vous?" ----

const NUGGETS = [
  {
    id: 'amygdala-phase2',
    phase: 2,
    trigger: { type: 'messageCount', count: 3 },
    icon: '\ud83e\udde0',
    text: 'Le saviez-vous\u00a0? Quand tu nommes une \u00e9motion, l\u2019activit\u00e9 de ton amygdale (le \u00ab\u00a0centre d\u2019alerte\u00a0\u00bb du cerveau) diminue de pr\u00e8s de 50\u00a0%. C\u2019est pour \u00e7a qu\u2019en parler, \u00e7a soulage \u2014 litt\u00e9ralement. (Lieberman et\u00a0al., 2007)'
  },
  {
    id: 'six-seconds-phase4',
    phase: 4,
    trigger: { type: 'messageCount', count: 2 },
    icon: '\ud83e\udde0',
    text: 'Le saviez-vous\u00a0? Il faut environ 6\u00a0secondes pour que le cortisol (hormone du stress) traverse ton cerveau. Compter jusqu\u2019\u00e0 6 avant de r\u00e9pondre laisse le temps \u00e0 ta pens\u00e9e r\u00e9fl\u00e9chie de reprendre le dessus.'
  },
  {
    id: 'confirmation-bias-phase5',
    phase: 5,
    trigger: { type: 'messageCount', count: 1 },
    icon: '\ud83e\udde0',
    text: 'Le saviez-vous\u00a0? Le biais de confirmation est si puissant que m\u00eame des experts tombent dedans : on cherche inconsciemment les infos qui confirment ce qu\u2019on pense d\u00e9j\u00e0. En \u00eatre conscient r\u00e9duit son emprise d\u2019environ 30\u00a0%. (Nickerson, 1998)'
  },
  {
    id: 'prefrontal-phase6',
    phase: 6,
    trigger: { type: 'messageCount', count: 2 },
    icon: '\ud83e\udde0',
    text: 'Le saviez-vous\u00a0? En situation de d\u00e9saccord, ton cortex pr\u00e9frontal (pens\u00e9e rationnelle) peut se \u00ab\u00a0d\u00e9connecter\u00a0\u00bb au profit de l\u2019amygdale (r\u00e9action de survie). Perdre ses mots face \u00e0 l\u2019opposition, c\u2019est neurologique \u2014 pas un manque d\u2019arguments.'
  }
];
