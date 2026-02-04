// ============================================
// Boite a outils -- Donnees enrichies
// Coach Civique -- Respons'Able
// ============================================

const TOOLBOX_CATEGORIES = [
  {
    id: 'participation',
    name: 'Dispositifs de participation',
    subtitle: 'Les cadres institutionnels qui te donnent une place dans la d\u00e9cision',
    forms: [
      {
        name: 'Budget participatif',
        short: 'Les citoyens proposent et votent pour des projets financ\u00e9s sur le budget public.',
        description: 'Les citoyens proposent et votent directement pour des projets financ\u00e9s par une partie du budget public de leur collectivit\u00e9.',
        advantages: [
          'Pouvoir d\u00e9cisionnel r\u00e9el : les projets vot\u00e9s sont r\u00e9alis\u00e9s, ce qui restaure la confiance dans l\'action publique',
          'R\u00e9sultats concrets et visibles dans le quotidien des habitants (am\u00e9nagements, \u00e9quipements, espaces verts)',
          '\u00c9ducation citoyenne sur la gestion des fonds publics : on apprend ce que co\u00fbte un trottoir, une cr\u00e8che, un \u00e9clairage',
          'Apprentissage social : les citoyens d\u00e9couvrent les besoins des autres quartiers et apprennent \u00e0 arbitrer collectivement',
          'Outil d\'inclusion : peut toucher des publics habituellement absents des urnes (jeunes, quartiers populaires)',
          'Cr\u00e9e un lien direct entre imp\u00f4t et usage : les habitants voient concr\u00e8tement o\u00f9 va leur argent'
        ],
        limits: [
          'Souvent limit\u00e9 \u00e0 un petit pourcentage du budget total (2 \u00e0 5%), ce qui r\u00e9duit la port\u00e9e r\u00e9elle du pouvoir citoyen',
          'Tendance \u00e0 favoriser les projets visibles et consensuels (bancs, parcs, street art) au d\u00e9triment du structurel (assainissement, isolation)',
          'Participation parfois faible et socialement peu repr\u00e9sentative : les classes moyennes \u00e9duqu\u00e9es surrepr\u00e9sent\u00e9es',
          'Risque d\'instrumentalisation politique : l\'\u00e9lu peut s\'attribuer le m\u00e9rite des projets choisis par les citoyens',
          'Comp\u00e9tition entre quartiers qui peut accentuer les in\u00e9galit\u00e9s territoriales au lieu de les r\u00e9duire',
          'Les projets les plus innovants ou clivants sont souvent \u00e9cart\u00e9s par les filtres techniques de la collectivit\u00e9'
        ],
        nuances: 'Le budget participatif est souvent pr\u00e9sent\u00e9 comme le fleuron de la d\u00e9mocratie participative, mais il peut aussi fonctionner comme un l\u00e9gitimateur de l\'ordre existant : en donnant aux citoyens le pouvoir sur 3% du budget, on d\u00e9tourne l\'attention des 97% restants d\u00e9cid\u00e9s sans eux. Le vrai test d\u00e9mocratique n\'est pas l\'existence du dispositif, mais son \u00e9chelle, son accessibilit\u00e9 r\u00e9elle et la qualit\u00e9 de la d\u00e9lib\u00e9ration qu\'il g\u00e9n\u00e8re. \u00c0 Porto Alegre, le succ\u00e8s tenait \u00e0 la combinaison d\'un engagement politique fort, d\'assembl\u00e9es de quartier r\u00e9guli\u00e8res et d\'un vrai transfert de pouvoir \u2014 conditions rarement r\u00e9unies dans les copies europ\u00e9ennes.',
        legal: 'En France, le budget participatif n\'a pas de cadre l\u00e9gal sp\u00e9cifique contraignant. Il s\'inscrit dans le pouvoir discr\u00e9tionnaire du conseil municipal (article L2311-1 du CGCT). La loi Vaillant du 27 f\u00e9vrier 2002 relative \u00e0 la d\u00e9mocratie de proximit\u00e9 a cr\u00e9\u00e9 les conseils de quartier mais ne mentionne pas le budget participatif. La loi NOTRe du 7 ao\u00fbt 2015 (art. 1er) affirme le droit des habitants \u00e0 \u00eatre associ\u00e9s aux d\u00e9cisions locales. En pratique, c\'est une d\u00e9marche volontaire de la collectivit\u00e9.',
        howto: [
          'Se renseigner aupr\u00e8s de sa mairie pour savoir si un budget participatif existe (site web, service d\u00e9mocratie locale)',
          'Participer aux r\u00e9unions de lancement et aux ateliers d\'id\u00e9ation organis\u00e9s dans les quartiers',
          'D\u00e9poser un projet en respectant le cahier des charges (faisabilit\u00e9 technique, comp\u00e9tence communale, co\u00fbt dans l\'enveloppe)',
          'Mobiliser son voisinage pour soutenir et voter pour les projets qui comptent',
          'Suivre la r\u00e9alisation des projets vot\u00e9s et interpeller la mairie en cas de retard'
        ],
        examples: [
          { title: 'Porto Alegre (Br\u00e9sil, 1989)', text: 'Premier budget participatif au monde. En 10 ans, l\'acc\u00e8s \u00e0 l\'eau potable est pass\u00e9 de 75% \u00e0 98% de la population gr\u00e2ce aux priorit\u00e9s d\u00e9finies par les citoyens dans les assembl\u00e9es de quartier.' },
          { title: 'Paris (France, 2014-2020)', text: 'Plus grand budget participatif d\'Europe avec 500 millions d\'euros sur la mandature. Plus de 200 000 votants par an, mais participation concentr\u00e9e dans les arrondissements ais\u00e9s malgr\u00e9 les efforts d\'inclusion.' },
          { title: 'Grenoble (France, depuis 2015)', text: 'Budget participatif cibl\u00e9 sur les quartiers prioritaires pour r\u00e9duire les in\u00e9galit\u00e9s territoriales. Int\u00e8gre des ateliers de terrain pour toucher les publics \u00e9loign\u00e9s de la participation.' }
        ],
        related: ['Conseil de quartier', 'Convention citoyenne', 'R\u00e9f\u00e9rendum local']
      },
      {
        name: 'Convention citoyenne',
        short: 'Panel tir\u00e9 au sort qui d\u00e9lib\u00e8re en profondeur sur un sujet complexe avec l\'aide d\'experts.',
        description: 'Panel de citoyens tir\u00e9s au sort qui d\u00e9lib\u00e8rent en profondeur sur un sujet complexe, avec l\'aide d\'experts, et formulent des propositions.',
        advantages: [
          'Repr\u00e9sentativit\u00e9 par tirage au sort : diversit\u00e9 sociale, d\'\u00e2ge, de territoire que le vote ne garantit pas',
          'D\u00e9lib\u00e9ration approfondie sur plusieurs mois avec auditions d\'experts contradictoires',
          'Forte l\u00e9gitimit\u00e9 d\u00e9mocratique des propositions : ce sont des citoyens ordinaires inform\u00e9s qui d\u00e9cident',
          'Apprentissage social intense : les participants t\u00e9moignent d\'une transformation personnelle profonde',
          'D\u00e9montre que des citoyens non-sp\u00e9cialistes peuvent traiter des sujets techniques avec rigueur',
          'Cr\u00e9e une culture du compromis et de l\'\u00e9coute qui rayonne au-del\u00e0 du panel'
        ],
        limits: [
          'Co\u00fbteux et long \u00e0 organiser (plusieurs centaines de milliers d\'euros, 6 \u00e0 9 mois)',
          'Pas toujours suivi d\'effets concrets : les propositions peuvent \u00eatre partiellement ou pas du tout reprises',
          'Les participants ne repr\u00e9sentent qu\'un petit \u00e9chantillon (150 personnes sur 67 millions)',
          'D\u00e9pendance au cadrage initial : celui qui pose la question oriente les r\u00e9ponses possibles',
          'Risque d\'instrumentalisation : le pouvoir politique peut utiliser la convention pour l\u00e9gitimer des choix d\u00e9j\u00e0 faits',
          'Les citoyens non tir\u00e9s au sort peuvent ressentir une frustration d\'\u00eatre exclus du processus'
        ],
        nuances: 'La convention citoyenne incarne une promesse d\u00e9mocratique puissante mais ambivalente. D\'un c\u00f4t\u00e9, elle prouve que des citoyens ordinaires, confront\u00e9s \u00e0 la complexit\u00e9 et \u00e0 des avis contradictoires, sont capables de d\u00e9lib\u00e9ration de haute qualit\u00e9. De l\'autre, son succ\u00e8s d\u00e9pend enti\u00e8rement de la volont\u00e9 politique de reprendre ses conclusions. La Convention pour le Climat a ainsi r\u00e9v\u00e9l\u00e9 un paradoxe fondamental : plus les citoyens sont inform\u00e9s et ambitieux, plus l\'\u00e9cart avec la capacit\u00e9 du syst\u00e8me politique \u00e0 mettre en \u0153uvre devient douloureux.',
        legal: 'Aucun cadre l\u00e9gal sp\u00e9cifique pour les conventions citoyennes en France. Elles sont organis\u00e9es par d\u00e9cision du pouvoir ex\u00e9cutif. La Convention pour le Climat a \u00e9t\u00e9 cr\u00e9\u00e9e par le Premier ministre le 25 avril 2019. Le CESE (Conseil \u00e9conomique, social et environnemental), r\u00e9form\u00e9 par la loi organique du 15 janvier 2021, peut d\u00e9sormais organiser des consultations citoyennes et recourir au tirage au sort (article 4 bis de l\'ordonnance du 29 d\u00e9cembre 1958 modifi\u00e9e).',
        howto: [
          'Si tu es tir\u00e9 au sort : accepter la mission, participer aux sessions de formation et d\'\u00e9coute des experts',
          'Si tu n\'es pas tir\u00e9 au sort : contribuer aux consultations publiques associ\u00e9es, envoyer des contributions \u00e9crites',
          'Suivre les travaux en ligne (livestreams, comptes rendus) et relayer les propositions',
          'Interpeller tes \u00e9lus sur la mise en \u0153uvre des propositions adopt\u00e9es',
          'Militer pour l\'institutionnalisation du tirage au sort dans la Constitution ou les lois organiques'
        ],
        examples: [
          { title: 'Convention Citoyenne pour le Climat (France, 2019-2020)', text: '150 citoyens tir\u00e9s au sort, 149 propositions pour r\u00e9duire les \u00e9missions de GES de 40%. La loi Climat et R\u00e9silience de 2021 n\'a repris qu\'environ 10% des propositions dans leur ambition initiale, selon le Haut Conseil pour le Climat.' },
          { title: 'Convention sur la fin de vie (France, 2022-2023)', text: '185 citoyens tir\u00e9s au sort se sont prononc\u00e9s en faveur d\'une aide active \u00e0 mourir sous conditions strictes. Le projet de loi a \u00e9t\u00e9 d\u00e9pos\u00e9 en 2024, reprenant largement les orientations du panel.' },
          { title: 'Assembl\u00e9e citoyenne irlandaise (2016-2018)', text: 'A recommand\u00e9 la l\u00e9galisation de l\'avortement, valid\u00e9e par r\u00e9f\u00e9rendum \u00e0 66%. Mod\u00e8le international de combinaison tirage au sort + r\u00e9f\u00e9rendum.' }
        ],
        related: ['Budget participatif', 'R\u00e9f\u00e9rendum local', 'Initiative citoyenne']
      },
      {
        name: 'Conseil de quartier',
        short: 'Instance locale o\u00f9 les habitants \u00e9changent avec les \u00e9lus sur la vie de leur quartier.',
        description: 'Instance locale de d\u00e9mocratie de proximit\u00e9 o\u00f9 les habitants \u00e9changent avec les \u00e9lus sur les sujets qui concernent leur quartier.',
        advantages: [
          'Ancrage local : traite des probl\u00e8mes concrets du quotidien (voirie, propret\u00e9, s\u00e9curit\u00e9, espaces verts)',
          'R\u00e9gularit\u00e9 des rencontres qui permet un lien durable et un suivi avec les \u00e9lus',
          'Ouvert \u00e0 tous sans condition d\'\u00e2ge, de nationalit\u00e9 ou d\'inscription sur les listes \u00e9lectorales',
          'Lieu d\'apprentissage civique : on apprend \u00e0 formuler une demande, \u00e0 \u00e9couter les contraintes de l\'autre camp',
          'Peut servir de tremplin vers d\'autres formes d\'engagement (associations, conseils municipaux)',
          'Permet aux \u00e9lus de percevoir des probl\u00e8mes invisibles depuis l\'h\u00f4tel de ville'
        ],
        limits: [
          'Souvent consultatif seulement : les avis peuvent \u00eatre ignor\u00e9s sans cons\u00e9quence pour l\'\u00e9lu',
          'Participation souvent faible et sociologiquement homog\u00e8ne (retrait\u00e9s, propri\u00e9taires, classes moyennes)',
          'Risque de noyautage par des habitu\u00e9s ou des militants partisans qui monopolisent la parole',
          'Ordre du jour souvent contr\u00f4l\u00e9 par la mairie, ce qui limite la capacit\u00e9 d\'initiative des habitants',
          'Frustration accumul\u00e9e quand les demandes r\u00e9p\u00e9t\u00e9es ne sont jamais suivies d\'effet',
          'Peut donner une illusion de d\u00e9mocratie locale sans transfert r\u00e9el de pouvoir'
        ],
        nuances: 'Les conseils de quartier cristallisent la tension fondamentale de la d\u00e9mocratie de proximit\u00e9 : ils sont \u00e0 la fois le lieu le plus accessible pour un citoyen ordinaire et le plus facilement vid\u00e9 de sa substance par le pouvoir municipal. Leur efficacit\u00e9 d\u00e9pend presque enti\u00e8rement de la bonne volont\u00e9 du maire. Dans certaines villes, ils sont des espaces vivants de co-construction ; dans d\'autres, des chambres d\'enregistrement o\u00f9 les \u00e9lus viennent communiquer sans \u00e9couter. Le vrai enjeu est de leur donner un pouvoir d\u00e9lib\u00e9ratif, pas seulement consultatif.',
        legal: 'La loi Vaillant du 27 f\u00e9vrier 2002 relative \u00e0 la d\u00e9mocratie de proximit\u00e9 rend obligatoire la cr\u00e9ation de conseils de quartier dans les communes de plus de 80 000 habitants (article L2143-1 du CGCT). Le maire en fixe la composition, les modalit\u00e9s de fonctionnement et peut leur allouer un budget de fonctionnement. La loi NOTRe du 7 ao\u00fbt 2015 et la loi Engagement et Proximit\u00e9 du 27 d\u00e9cembre 2019 ont renforc\u00e9 le r\u00f4le des conseils citoyens dans les quartiers prioritaires de la politique de la ville.',
        howto: [
          'Contacter sa mairie pour conna\u00eetre les dates des prochains conseils de quartier (ou consulter le site web)',
          'Y aller au moins une fois pour observer le fonctionnement avant de prendre la parole',
          'Pr\u00e9parer une demande ou un sujet concret \u00e0 porter (avec des faits, des photos, des t\u00e9moignages)',
          'Proposer de participer \u00e0 un groupe de travail th\u00e9matique si la structure le permet',
          'Inciter ses voisins \u00e0 venir pour diversifier les profils et renforcer la l\u00e9gitimit\u00e9'
        ],
        examples: [
          { title: 'Conseils de quartier parisiens (depuis 2002)', text: 'Obligatoires dans les 20 arrondissements suite \u00e0 la loi Vaillant. R\u00e9sultats tr\u00e8s in\u00e9gaux : tr\u00e8s actifs dans certains arrondissements (14e, 20e), purement formels dans d\'autres. Un budget de fonctionnement est allou\u00e9 \u00e0 chaque conseil.' },
          { title: 'Conseils citoyens de Saillans (Dr\u00f4me, 2014-2020)', text: 'Exp\u00e9rience pionniere de d\u00e9mocratie participative totale dans une commune de 1 300 habitants : commissions th\u00e9matiques ouvertes, co-construction des d\u00e9cisions municipales, tirage au sort de comit\u00e9s de suivi.' },
          { title: 'Tables de quartier (Ile-de-France)', text: 'Dispositif port\u00e9 par la f\u00e9d\u00e9ration des centres sociaux pour donner la parole aux habitants des quartiers populaires, en compl\u00e9ment des conseils de quartier officiels jug\u00e9s trop institutionnels.' }
        ],
        related: ['Budget participatif', 'Convention citoyenne', 'Association / Collectif citoyen']
      },
      {
        name: 'R\u00e9f\u00e9rendum local',
        short: 'Vote direct des citoyens sur une question locale, d\u00e9cisionnel ou consultatif.',
        description: 'Vote direct des citoyens sur une question locale. Le r\u00e9sultat peut \u00eatre consultatif ou d\u00e9cisionnel selon le cadre.',
        advantages: [
          'D\u00e9cision directe par le peuple, l\u00e9gitimit\u00e9 d\u00e9mocratique maximale',
          'Forte mobilisation et int\u00e9r\u00eat citoyen : le vote est un geste concret et accessible',
          'Tranche les d\u00e9bats de mani\u00e8re claire et d\u00e9finitive',
          'Oblige les \u00e9lus \u00e0 respecter la volont\u00e9 populaire (en cas de r\u00e9f\u00e9rendum d\u00e9cisionnel)',
          'Cr\u00e9e un moment de d\u00e9bat public intense qui \u00e9l\u00e8ve le niveau d\'information g\u00e9n\u00e9ral',
          'Peut briser un blocage politique en donnant une l\u00e9gitimit\u00e9 populaire \u00e0 une d\u00e9cision difficile'
        ],
        limits: [
          'Question binaire oui/non : simplifie des enjeux complexes et \u00e9limine les nuances',
          'Conditions de validit\u00e9 strictes en France : seuil de participation de 50% des inscrits rarement atteint',
          'Peut \u00eatre instrumentalis\u00e9 politiquement : la question est formul\u00e9e par ceux qui le convoquent',
          'Risque de d\u00e9rive pl\u00e9biscitaire : voter pour ou contre le maire plut\u00f4t que sur le sujet',
          'Les campagnes r\u00e9f\u00e9rendaires sont vuln\u00e9rables \u00e0 la d\u00e9sinformation et aux simplifications',
          'Le r\u00e9sultat peut \u00eatre ignor\u00e9 s\'il est consultatif, cr\u00e9ant amertume et d\u00e9sillusion'
        ],
        nuances: 'Le r\u00e9f\u00e9rendum local concentre toute l\'ambivalence de la d\u00e9mocratie directe. Il promet la souverainet\u00e9 populaire mais r\u00e9duit des probl\u00e8mes multidimensionnels \u00e0 un choix binaire. L\'exemple de Notre-Dame-des-Landes est \u00e9loquent : le oui l\'a emport\u00e9 \u00e0 55%, mais le p\u00e9rim\u00e8tre du vote (\u00e9lecteurs du d\u00e9partement, pas de la r\u00e9gion) a \u00e9t\u00e9 contest\u00e9, et le projet a finalement \u00e9t\u00e9 abandonn\u00e9 face \u00e0 l\'occupation du terrain. Cela montre qu\'un r\u00e9f\u00e9rendum ne r\u00e8gle pas un conflit si les conditions de sa l\u00e9gitimit\u00e9 ne sont pas partag\u00e9es par tous.',
        legal: 'Le r\u00e9f\u00e9rendum local d\u00e9cisionnel est pr\u00e9vu par l\'article 72-1 de la Constitution et les articles LO1112-1 \u00e0 LO1112-14 du CGCT. Seul l\'ex\u00e9cutif local peut le convoquer. Le r\u00e9sultat s\'impose si la participation d\u00e9passe 50% des inscrits. La consultation des \u00e9lecteurs (consultatif) est pr\u00e9vue aux articles L1112-15 et suivants du CGCT et peut \u00eatre demand\u00e9e par un cinqui\u00e8me des \u00e9lecteurs inscrits (une fois par an). La loi Engagement et Proximit\u00e9 du 27 d\u00e9cembre 2019 a assoupli les modalit\u00e9s.',
        howto: [
          'V\u00e9rifier si le sujet rel\u00e8ve de la comp\u00e9tence de la collectivit\u00e9 (condition l\u00e9gale obligatoire)',
          'Demander \u00e0 l\'ex\u00e9cutif local d\'organiser un r\u00e9f\u00e9rendum ou une consultation',
          'Mobiliser un cinqui\u00e8me des \u00e9lecteurs inscrits pour demander une consultation (art. L1112-16 CGCT)',
          'Participer activement \u00e0 la campagne en diffusant une information \u00e9quilibr\u00e9e',
          'Voter le jour J et mobiliser son entourage pour d\u00e9passer le seuil de participation'
        ],
        examples: [
          { title: 'R\u00e9f\u00e9rendum de Notre-Dame-des-Landes (2016)', text: '55% pour la construction de l\'a\u00e9roport sur le p\u00e9rim\u00e8tre du d\u00e9partement de Loire-Atlantique. Malgr\u00e9 le oui, le projet a \u00e9t\u00e9 abandonn\u00e9 en 2018 par le Premier ministre face \u00e0 la mobilisation continue sur le terrain.' },
          { title: 'R\u00e9f\u00e9rendum d\'initiative partag\u00e9e sur A\u00e9roports de Paris (2019)', text: 'Premi\u00e8re tentative de RIP en France : 1,1 million de signatures (4,7 millions requises) contre la privatisation d\'ADP. \u00c9chec quantitatif mais d\u00e9bat national sur la privatisation des biens communs.' },
          { title: 'R\u00e9f\u00e9rendum sur l\'ind\u00e9pendance de la Nouvelle-Cal\u00e9donie (2018-2021)', text: 'Trois r\u00e9f\u00e9rendums successifs pr\u00e9vus par l\'accord de Noum\u00e9a. Le non \u00e0 l\'ind\u00e9pendance l\'a emport\u00e9 trois fois, mais le dernier scrutin (2021) a \u00e9t\u00e9 boycott\u00e9 par les ind\u00e9pendantistes, posant la question de la l\u00e9gitimit\u00e9.' }
        ],
        related: ['Convention citoyenne', 'Initiative citoyenne', 'Budget participatif']
      },
      {
        name: 'Initiative citoyenne',
        short: 'M\u00e9canisme par lequel les citoyens proposent directement une loi ou un r\u00e9f\u00e9rendum.',
        description: 'M\u00e9canisme par lequel les citoyens peuvent proposer directement une loi, un r\u00e9f\u00e9rendum ou mettre un sujet \u00e0 l\'agenda politique.',
        advantages: [
          'Pouvoir d\'initiative directe du peuple : on n\'attend pas qu\'un \u00e9lu veuille bien poser la question',
          'Contourne l\'inertie des repr\u00e9sentants sur des sujets qu\'ils pr\u00e9f\u00e8rent \u00e9viter',
          'Force le d\u00e9bat public sur un sujet ignor\u00e9 par les partis et les m\u00e9dias',
          'Cr\u00e9e une dynamique de mobilisation citoyenne autour de la collecte de signatures',
          'Renforce le sentiment d\'efficacit\u00e9 politique : chaque signature compte concr\u00e8tement',
          'Compl\u00e8te la d\u00e9mocratie repr\u00e9sentative en corrigeant ses angles morts'
        ],
        limits: [
          'Seuils de signatures souvent tr\u00e8s \u00e9lev\u00e9s et difficiles \u00e0 atteindre (4,7 millions pour le RIP en France)',
          'Processus long et juridiquement complexe qui n\u00e9cessite des ressources importantes',
          'Peut \u00eatre instrumentalis\u00e9e par des lobbys ou des groupes d\'int\u00e9r\u00eat organis\u00e9s',
          'Le contr\u00f4le de constitutionnalit\u00e9 en amont peut bloquer des propositions populaires',
          'Risque de simplifier des enjeux complexes en slogans mobilisateurs',
          'En France, le RIP reste sous le contr\u00f4le des parlementaires (initiative partag\u00e9e, pas purement citoyenne)'
        ],
        nuances: 'L\'initiative citoyenne r\u00e9v\u00e8le une fracture entre la th\u00e9orie d\u00e9mocratique et la pratique institutionnelle. En Suisse, o\u00f9 elle existe depuis 1891, elle fonctionne parce qu\'elle est int\u00e9gr\u00e9e dans une culture politique du compromis et du f\u00e9d\u00e9ralisme. En France, le RIP (r\u00e9f\u00e9rendum d\'initiative partag\u00e9e, r\u00e9vision constitutionnelle de 2008, mis en \u0153uvre en 2015) a \u00e9t\u00e9 con\u00e7u avec des seuils si \u00e9lev\u00e9s qu\'il est quasiment inutilisable. La revendication du RIC (r\u00e9f\u00e9rendum d\'initiative citoyenne) port\u00e9e par les Gilets jaunes en 2018-2019 a montr\u00e9 \u00e0 quel point le d\u00e9sir de d\u00e9mocratie directe reste vif mais institutionnellement frustr\u00e9.',
        legal: 'L\'article 11 de la Constitution (r\u00e9vis\u00e9 en 2008, loi organique du 6 d\u00e9cembre 2013) pr\u00e9voit le r\u00e9f\u00e9rendum d\'initiative partag\u00e9e (RIP) : un cinqui\u00e8me des parlementaires soutenu par un dixi\u00e8me des \u00e9lecteurs inscrits (environ 4,7 millions de signatures) peut proposer un r\u00e9f\u00e9rendum sur une proposition de loi. Au niveau europ\u00e9en, l\'Initiative citoyenne europ\u00e9enne (ICE, r\u00e8glement UE 211/2011, r\u00e9vis\u00e9 en 2019) permet \u00e0 un million de citoyens de 7 \u00c9tats membres d\'inviter la Commission europ\u00e9enne \u00e0 l\u00e9gif\u00e9rer. Le droit de p\u00e9tition est garanti par l\'article 72-1 de la Constitution.',
        howto: [
          'Identifier un sujet relevant de la comp\u00e9tence l\u00e9gislative et non contraire \u00e0 la Constitution',
          'Pour une ICE europ\u00e9enne : enregistrer l\'initiative aupr\u00e8s de la Commission europ\u00e9enne, constituer un comit\u00e9 de 7 citoyens de 7 pays diff\u00e9rents',
          'Organiser la collecte de signatures (en ligne et en physique), mobiliser les r\u00e9seaux sociaux',
          'Pour le RIP fran\u00e7ais : trouver 185 parlementaires pour lancer la proposition, puis 4,7 millions de signatures en 9 mois',
          'Faire conna\u00eetre l\'initiative via les m\u00e9dias, les \u00e9v\u00e9nements publics et les r\u00e9seaux associatifs'
        ],
        examples: [
          { title: 'Initiative citoyenne europ\u00e9enne Right2Water (2013)', text: 'Premi\u00e8re ICE \u00e0 atteindre le seuil requis avec 1,8 million de signatures dans toute l\'Europe. A conduit \u00e0 la directive europ\u00e9enne (UE) 2020/2184 garantissant l\'acc\u00e8s \u00e0 une eau potable de qualit\u00e9 pour tous.' },
          { title: 'Tentative de RIP sur A\u00e9roports de Paris (France, 2019)', text: 'Premi\u00e8re utilisation du r\u00e9f\u00e9rendum d\'initiative partag\u00e9e en France. 1,1 million de soutiens r\u00e9colt\u00e9s en 9 mois, loin des 4,7 millions n\u00e9cessaires. A r\u00e9v\u00e9l\u00e9 les limites du dispositif.' },
          { title: 'Initiatives populaires suisses (depuis 1891)', text: 'La Suisse a organis\u00e9 plus de 200 r\u00e9f\u00e9rendums d\'initiative populaire. 100 000 signatures suffisent pour d\u00e9clencher un vote populaire sur une modification constitutionnelle, ce qui rend l\'outil r\u00e9ellement accessible.' }
        ],
        related: ['R\u00e9f\u00e9rendum local', 'P\u00e9tition', 'Convention citoyenne']
      }
    ]
  },
  {
    id: 'action',
    name: 'Actions citoyennes',
    subtitle: 'Les moyens de pression directe pour se faire entendre',
    forms: [
      {
        name: 'P\u00e9tition',
        short: 'Recueil de signatures pour interpeller les pouvoirs publics sur un sujet pr\u00e9cis.',
        description: 'Recueil de signatures pour interpeller les pouvoirs publics sur un sujet. Peut \u00eatre lanc\u00e9e en ligne ou en physique.',
        advantages: [
          'Accessible \u00e0 tous, faible barri\u00e8re \u00e0 l\'entr\u00e9e : un stylo ou un clic suffisent',
          'Mesurable : le nombre de signatures cr\u00e9e une pression quantifiable sur les d\u00e9cideurs',
          'Peut d\u00e9clencher un d\u00e9bat m\u00e9diatique et mettre un sujet invisible \u00e0 l\'agenda public',
          'Cr\u00e9e un sentiment d\'appartenance collective autour d\'une cause partag\u00e9e',
          'Point d\'entr\u00e9e vers un engagement plus profond : beaucoup de militants ont commenc\u00e9 par signer une p\u00e9tition',
          'Les plateformes num\u00e9riques (Change.org, MesOpinions) ont d\u00e9mocratise\u0301 l\'acc\u00e8s \u00e0 cet outil'
        ],
        limits: [
          'Facilement ignor\u00e9e si pas relay\u00e9e massivement par les m\u00e9dias ou les r\u00e9seaux',
          'Risque de slacktivisme : signer sans s\'engager plus profond\u00e9ment dans la cause',
          'Aucune obligation l\u00e9gale de r\u00e9ponse des pouvoirs publics en France (sauf pour les p\u00e9titions au CESE)',
          'Inflation p\u00e9titionnaire : la multiplication des p\u00e9titions en ligne dilue l\'impact de chacune',
          'Les signatures peuvent \u00eatre gonfl\u00e9es artificiellement (faux comptes, robots)',
          'Ne remplace pas la mobilisation concr\u00e8te : sans action derri\u00e8re, la p\u00e9tition reste un symbole'
        ],
        nuances: 'La p\u00e9tition occupe une place paradoxale dans l\'arsenal d\u00e9mocratique. Elle est le geste civique le plus accessible mais aussi le plus facilement neutralis\u00e9. Le passage au num\u00e9rique a multipli\u00e9 les signatures mais dilu\u00e9 la valeur de chacune : quand on peut signer dix p\u00e9titions en une minute, que vaut un clic ? Les p\u00e9titions les plus efficaces sont celles qui combinent signature et action concrete (L\'Affaire du Siècle a transform\u00e9 2,3 millions de signatures en proc\u00e8s). Sans prolongement juridique ou m\u00e9diatique, la p\u00e9tition risque de devenir un exutoire sans effet.',
        legal: 'Le droit de p\u00e9tition est garanti par l\'article 72-1 de la Constitution (p\u00e9tition aux collectivit\u00e9s territoriales) et par les articles 147 \u00e0 151 du R\u00e8glement de l\'Assembl\u00e9e nationale. La loi organique du 15 janvier 2021 r\u00e9formant le CESE permet \u00e0 500 000 citoyens de saisir le Conseil \u00e9conomique, social et environnemental par p\u00e9tition (article 4-1 de l\'ordonnance du 29 d\u00e9cembre 1958 modifi\u00e9e). Au niveau europ\u00e9en, le droit de p\u00e9tition aupr\u00e8s du Parlement europ\u00e9en est pr\u00e9vu \u00e0 l\'article 227 du TFUE.',
        howto: [
          'D\u00e9finir un objectif clair et une cible pr\u00e9cise (un \u00e9lu, une institution, une entreprise)',
          'R\u00e9diger un texte court, factuel et \u00e9motionnellement engageant avec une demande explicite',
          'Choisir la bonne plateforme (Change.org pour la viralite\u0301, MesOpinions.com, site du CESE pour la l\u00e9gitimit\u00e9 institutionnelle)',
          'Diffuser via les r\u00e9seaux sociaux, les associations alli\u00e9es, les m\u00e9dias locaux',
          'Pr\u00e9voir un plan d\'action concret apr\u00e8s le seuil de signatures atteint (remise officielle, conf\u00e9rence de presse, action en justice)'
        ],
        examples: [
          { title: 'L\'Affaire du Si\u00e8cle (France, 2018)', text: '2,3 millions de signatures en quelques semaines pour action climatique contre l\'\u00c9tat. A donn\u00e9 lieu au premier proc\u00e8s pour inaction climatique en France, remport\u00e9 par les associations en 2021 : l\'\u00c9tat a \u00e9t\u00e9 condamn\u00e9 pour carences fautives.' },
          { title: 'P\u00e9tition pour le CESE sur les pesticides (2020)', text: 'Plus de 100 000 signatures pour demander l\'interdiction des pesticides de synth\u00e8se. A conduit le CESE \u00e0 se saisir du sujet et \u00e0 rendre un avis officiel, m\u00eame si les seuils l\u00e9gaux n\'ont pas \u00e9t\u00e9 atteints.' },
          { title: 'P\u00e9tition Loi Climat (2021)', text: 'Plus de 500 000 signatures pour d\u00e9noncer le manque d\'ambition de la loi Climat et R\u00e9silience par rapport aux propositions de la Convention citoyenne. A contribu\u00e9 \u00e0 maintenir la pression m\u00e9diatique lors du d\u00e9bat parlementaire.' }
        ],
        related: ['Initiative citoyenne', 'Manifestation', 'Action en justice citoyenne']
      },
      {
        name: 'Manifestation',
        short: 'Mobilisation physique dans l\'espace public pour rendre visible une cause collective.',
        description: 'Mobilisation physique dans l\'espace public pour rendre visible une cause et exercer une pression collective.',
        advantages: [
          'Forte visibilit\u00e9 m\u00e9diatique : une foule dans la rue, \u00e7a se voit et \u00e7a se filme',
          'Cr\u00e9e un sentiment de puissance collective et de solidarit\u00e9 entre manifestants',
          'Pression directe sur les d\u00e9cideurs : le nombre fait force et l\u00e9gitimit\u00e9',
          'Apprentissage social et politique : on d\u00e9couvre d\'autres luttes, d\'autres visions du monde',
          'Rituel d\u00e9mocratique essentiel qui rappelle aux gouvernants l\'existence d\'un peuple mobilisable',
          'Peut cr\u00e9er un basculement de l\'opinion publique quand les images sont puissantes'
        ],
        limits: [
          'Impact souvent \u00e9ph\u00e9m\u00e8re sans suite organis\u00e9e (gr\u00e8ve, action juridique, proposition politique)',
          'Risque de r\u00e9cup\u00e9ration politique par des partis ou de d\u00e9bordements violents',
          'Peut braquer l\'opinion publique si les manifestants sont per\u00e7us comme nuisant au quotidien',
          'Fatigue militante : la r\u00e9p\u00e9tition des manifs sans r\u00e9sultat \u00e9rode la mobilisation',
          'Couverture m\u00e9diatique souvent centr\u00e9e sur les incidents plut\u00f4t que sur les revendications',
          'Les r\u00e9seaux sociaux ont fragment\u00e9 l\'action : beaucoup pr\u00e9f\u00e8rent poster plut\u00f4t que marcher'
        ],
        nuances: 'La manifestation est peut-\u00eatre la forme d\'expression d\u00e9mocratique la plus instinctive et la plus ambivalente. Elle affirme la souverainet\u00e9 du peuple par sa pr\u00e9sence physique, mais cette pr\u00e9sence peut \u00eatre vid\u00e9e de sens si elle n\'est pas adoss\u00e9e \u00e0 une strat\u00e9gie politique. En France, le droit de manifester est r\u00e9guli\u00e8rement mis en tension avec le maintien de l\'ordre : la doctrine du maintien de l\'ordre a \u00e9t\u00e9 remise en cause apr\u00e8s les blessures de Gilets jaunes (2018-2019). L\'enjeu contemporain est de savoir si manifester suffit encore ou s\'il faut syst\u00e9matiquement l\'articuler \u00e0 d\'autres formes d\'action.',
        legal: 'La libert\u00e9 de manifestation d\u00e9coule de la libert\u00e9 d\'expression et de la libert\u00e9 de r\u00e9union, reconnues par la D\u00e9claration des droits de l\'homme et du citoyen de 1789 (article 11) et la Convention europ\u00e9enne des droits de l\'homme (article 11). Le d\u00e9cret-loi du 23 octobre 1935 impose une d\u00e9claration pr\u00e9alable en pr\u00e9fecture (3 jours francs avant). Le pr\u00e9fet peut interdire une manifestation en cas de risque de trouble \u00e0 l\'ordre public. La loi du 10 avril 2019 visant \u00e0 renforcer et garantir le maintien de l\'ordre public a \u00e9t\u00e9 partiellement censur\u00e9e par le Conseil constitutionnel.',
        howto: [
          'V\u00e9rifier l\'existence d\'une manifestation d\u00e9clar\u00e9e sur le sujet ou en organiser une (d\u00e9claration en pr\u00e9fecture 3 jours avant)',
          'Pr\u00e9parer des pancartes et slogans clairs, lisibles et non violents',
          'Marcher en groupe, rester solidaires et conna\u00eetre ses droits en cas de contr\u00f4le de police',
          'Filmer et documenter la manifestation pour assurer une couverture ind\u00e9pendante',
          'Avoir un plan d\'action apr\u00e8s la manifestation : communiqu\u00e9 de presse, interpellation des \u00e9lus, suite organis\u00e9e'
        ],
        examples: [
          { title: 'Marches pour le climat (2018-2019)', text: 'Des millions de personnes dans 150 pays, port\u00e9es par le mouvement Fridays for Future de Greta Thunberg. En France, plus de 350 000 manifestants le 15 mars 2019. Ont acc\u00e9l\u00e9r\u00e9 l\'inscription du climat dans l\'agenda politique mondial.' },
          { title: 'Manifestations contre la r\u00e9forme des retraites (France, 2023)', text: 'Jusqu\'\u00e0 3,5 millions de manifestants selon les syndicats (1,3 million selon la police) sur plusieurs mois. Malgr\u00e9 une mobilisation historique, la r\u00e9forme a \u00e9t\u00e9 adopt\u00e9e via l\'article 49.3, provoquant un d\u00e9bat sur la crise de la repr\u00e9sentation.' },
          { title: 'Manifestation du 11 janvier 2015 (France)', text: 'Pr\u00e8s de 4 millions de personnes dans toute la France apr\u00e8s les attentats de Charlie Hebdo et de l\'Hyper Cacher. Plus grande manifestation de l\'histoire de France, d\u00e9montrant la capacit\u00e9 de mobilisation spontan\u00e9e de la soci\u00e9t\u00e9.' }
        ],
        related: ['Gr\u00e8ve', 'P\u00e9tition', 'D\u00e9sob\u00e9issance civile']
      },
      {
        name: 'Gr\u00e8ve',
        short: 'Cessation collective du travail pour faire pression sur un employeur, un secteur ou l\'\u00c9tat.',
        description: 'Cessation collective et concert\u00e9e du travail pour faire pression sur un employeur, un secteur ou l\'\u00c9tat. Droit constitutionnel en France depuis 1946.',
        advantages: [
          'Impact \u00e9conomique direct et mesurable : touche l\u00e0 o\u00f9 \u00e7a fait mal, la production et le profit',
          'Droit constitutionnel prot\u00e9g\u00e9 \u2014 ne peut pas \u00eatre interdit, seulement encadr\u00e9',
          'Solidarit\u00e9 et fraternit\u00e9 entre gr\u00e9vistes : apprentissage social mutuel, on apprend \u00e0 s\'organiser et \u00e0 d\u00e9cider ensemble',
          '\u00c9cole de d\u00e9mocratie directe \u00e0 ciel ouvert : assembl\u00e9es g\u00e9n\u00e9rales, prises de parole, d\u00e9lib\u00e9ration collective',
          'Cr\u00e9e un rapport de force que la n\u00e9gociation seule ne permet pas d\'obtenir',
          'M\u00e9moire collective : les grandes gr\u00e8ves fondent des droits dont tout le monde b\u00e9n\u00e9ficie ensuite (cong\u00e9s pay\u00e9s, s\u00e9curit\u00e9 sociale, 35h)'
        ],
        limits: [
          'Ralentit la production et l\'\u00e9conomie du pays \u2014 les plus fragiles (int\u00e9rimaires, CDD) sont les premiers touch\u00e9s',
          'Co\u00fbt financier direct pour les gr\u00e9vistes (perte de salaire), ce qui p\u00e9nalise les moins ais\u00e9s',
          'Peut diviser l\'opinion publique : les usagers des services publics sont p\u00e9nalis\u00e9s (transports, \u00e9coles)',
          'N\u00e9cessite un taux de participation \u00e9lev\u00e9 pour \u00eatre efficace \u2014 une gr\u00e8ve suivie \u00e0 10% est contre-productive',
          'Risque d\'instrumentalisation syndicale : la base peut \u00eatre entra\u00een\u00e9e dans un conflit qui ne sert pas ses int\u00e9r\u00eats directs',
          'La pr\u00e9carisation du travail (ubérisation, auto-entrepreneuriat) rend la gr\u00e8ve de plus en plus difficile \u00e0 organiser'
        ],
        nuances: 'La gr\u00e8ve est sans doute la forme d\'action collective la plus riche en contradictions. Elle est \u00e0 la fois une \u00e9cole de d\u00e9mocratie directe \u2014 o\u00f9 l\'on apprend \u00e0 d\u00e9lib\u00e9rer, \u00e0 voter en assembl\u00e9e g\u00e9n\u00e9rale, \u00e0 construire une solidarit\u00e9 concr\u00e8te entre individus qui ne se connaissaient pas \u2014 et un acte de rupture \u00e9conomique qui p\u00e8se d\'abord sur ceux qui n\'ont pas les moyens de s\'arr\u00eater de travailler. Les plus pr\u00e9caires (int\u00e9rimaires, CDD, travailleurs isol\u00e9s) ne peuvent souvent pas se permettre de faire gr\u00e8ve, ce qui cr\u00e9e un paradoxe : l\'arme des travailleurs est de moins en moins accessible \u00e0 ceux qui en auraient le plus besoin.',
        legal: 'Le droit de gr\u00e8ve est garanti par le Pr\u00e9ambule de la Constitution du 27 octobre 1946 (alin\u00e9a 7), int\u00e9gr\u00e9 au bloc de constitutionnalit\u00e9. Il s\'exerce dans le cadre des lois qui le r\u00e9glementent. Dans la fonction publique, un pr\u00e9avis de 5 jours francs est obligatoire (loi du 31 juillet 1963). Le service minimum est impos\u00e9 dans certains secteurs : transports (loi du 21 ao\u00fbt 2007 sur le dialogue social et la continuit\u00e9 du service public dans les transports terrestres), \u00e9coles (loi du 20 ao\u00fbt 2008). Le lock-out (fermeture patronale) est interdit sauf en cas de contrainte de s\u00e9curit\u00e9. Le licenciement pour fait de gr\u00e8ve est nul (article L2511-1 du Code du travail).',
        howto: [
          'V\u00e9rifier les conditions l\u00e9gales : dans le secteur priv\u00e9, pas de pr\u00e9avis requis ; dans le public, pr\u00e9avis syndical de 5 jours',
          'Organiser une assembl\u00e9e g\u00e9n\u00e9rale pour d\u00e9cider collectivement des revendications et de la dur\u00e9e',
          'D\u00e9finir des revendications claires, hi\u00e9rarchis\u00e9es et n\u00e9gociables',
          'Mettre en place une caisse de gr\u00e8ve pour soutenir financi\u00e8rement les gr\u00e9vistes les plus fragiles',
          'Communiquer aupr\u00e8s du public et des m\u00e9dias pour expliquer les raisons du mouvement',
          'Pr\u00e9parer la sortie de gr\u00e8ve : fixer des conditions de reprise et un calendrier de n\u00e9gociation'
        ],
        examples: [
          { title: 'Mai 68 (France)', text: '10 millions de gr\u00e9vistes pendant plusieurs semaines, plus grand mouvement social fran\u00e7ais. A abouti aux accords de Grenelle : +35% du SMIC, cr\u00e9ation de la section syndicale d\'entreprise, et une transformation culturelle durable de la soci\u00e9t\u00e9.' },
          { title: 'Gr\u00e8ve g\u00e9n\u00e9rale de 1936 (France)', text: 'Mouvement de gr\u00e8ve avec occupations d\'usines qui a permis la signature des accords Matignon : premi\u00e8res cong\u00e9s pay\u00e9s (2 semaines), semaine de 40 heures, reconnaissance du droit syndical dans l\'entreprise. Des droits dont nous b\u00e9n\u00e9ficions encore.' },
          { title: 'Gr\u00e8ve des transports de 2019-2020 (France)', text: '54 jours de gr\u00e8ve \u00e0 la RATP et \u00e0 la SNCF contre la r\u00e9forme des retraites. Plus longue gr\u00e8ve des transports depuis 1968. A provoqu\u00e9 un d\u00e9bat national sur la p\u00e9nibilit\u00e9 et les r\u00e9gimes sp\u00e9ciaux, mais a aussi exasp\u00e9r\u00e9 une partie de l\'opinion publique.' }
        ],
        related: ['Manifestation', 'D\u00e9sob\u00e9issance civile', 'Boycott'],
        obstacles: [
          {
            doubt: 'J\'ai pas les moyens de perdre mon salaire',
            title: 'La caisse de gr\u00e8ve : l\'arme qui fait durer',
            response: 'Tu peux monter une caisse de gr\u00e8ve de deux fa\u00e7ons : soit via un syndicat d\u00e9j\u00e0 en place, ce qui te donne un cadre comptable existant avec tr\u00e9sorier d\u00e9sign\u00e9 et comptes publi\u00e9s ; soit en cr\u00e9ant une association loi 1901 d\u00e9di\u00e9e, avec un tr\u00e9sorier \u00e9lu et des comptes rendus publics. La cl\u00e9 absolue pour que \u00e7a marche, c\'est la transparence totale : tu publies les comptes en temps r\u00e9el via un tableur partag\u00e9 accessible \u00e0 tous les gr\u00e9vistes, chaque euro re\u00e7u et d\u00e9pens\u00e9 est tra\u00e7able, et tu affiches le relev\u00e9 bancaire \u00e0 chaque assembl\u00e9e g\u00e9n\u00e9rale. Pour la collecte, utilise des plateformes tra\u00e7ables comme Leetchi, Le Pot Commun ou GoFundMe en parall\u00e8le du compte bancaire \u2014 les dons en ligne laissent une trace et rassurent les donateurs ext\u00e9rieurs. Les r\u00e8gles de distribution, tu les d\u00e9finis AVANT la gr\u00e8ve en AG : qui touche combien, selon quels crit\u00e8res (situation familiale, salaire habituel, nombre de jours de gr\u00e8ve). Tu fais voter ces crit\u00e8res collectivement pour \u00e9viter les soup\u00e7ons et les tensions. Pour te donner des ordres de grandeur r\u00e9els : le fonds de solidarit\u00e9 \u00e9nergie CGT a d\u00e9pass\u00e9 300 000 \u20ac pendant les gr\u00e8ves des raffineries d\'octobre 2022. Pendant le mouvement contre la r\u00e9forme des retraites en 2019-2020, la caisse de solidarit\u00e9 RATP/SNCF a atteint 1,5 million d\'euros en dons citoyens. Au Royaume-Uni, le syndicat Unite maintient un fonds de gr\u00e8ve permanent de plus de 50 millions de livres, financ\u00e9 par une cotisation d\u00e9di\u00e9e. Le calcul \u00e0 faire est simple : nombre de gr\u00e9vistes potentiels \u00d7 perte de salaire journali\u00e8re \u00d7 nombre de jours vis\u00e9s = montant cible. Exemple concret : 50 gr\u00e9vistes \u00e0 80 \u20ac/jour de perte pendant 10 jours = 40 000 \u20ac. C\'est ambitieux mais atteignable avec une collecte large aupr\u00e8s des coll\u00e8gues non-gr\u00e9vistes, des citoyens solidaires et des syndicats d\'autres secteurs.'
          },
          {
            doubt: 'On sera pas assez nombreux, \u00e7a servira \u00e0 rien',
            title: 'Mesurer la base avant de lancer',
            response: 'Ne lance jamais une gr\u00e8ve \u00e0 l\'aveugle. Premi\u00e8re \u00e9tape : un sondage anonyme via Framaforms ou Google Forms avec LA question conditionnelle cl\u00e9 : \u00ab Seriez-vous pr\u00eat(e) \u00e0 faire gr\u00e8ve si une majorit\u00e9 de coll\u00e8gues suit ? \u00bb \u2014 cette formulation supprime la peur du \u00ab je serai tout seul \u00bb. Deuxi\u00e8me \u00e9tape : une AG pr\u00e9paratoire pour compter les pr\u00e9sents. Si plus de 30 % de l\'effectif se d\u00e9place juste pour en discuter, c\'est un signal fort. Retiens ces seuils de masse critique : en dessous de 20 %, c\'est symbolique uniquement ; entre 25 et 40 %, c\'est visible et cr\u00e9dible ; \u00e0 50 %+, tu as un vrai levier de n\u00e9gociation ; \u00e0 80 %+, c\'est le blocage total \u2014 et c\'est l\u00e0 que les accords tombent. La strat\u00e9gie d\'escalade progressive est ta meilleure alli\u00e9e pour construire la confiance pas \u00e0 pas : d\'abord une p\u00e9tition interne sign\u00e9e (\u00e7a montre les chiffres), puis le port de brassards ou badges (\u00e7a rend le m\u00e9contentement visible), ensuite un d\u00e9brayage d\'1 \u00e0 2 heures (test \u00e0 faible co\u00fbt), puis une gr\u00e8ve de 24 heures (le vrai test grandeur nature), et enfin la gr\u00e8ve reconductible si n\u00e9cessaire. Chaque palier prouve aux h\u00e9sitants qu\'ils ne sont pas seuls et renforce la dynamique collective.'
          },
          {
            doubt: 'Je risque de perdre mon travail',
            title: 'Ce que la loi prot\u00e8ge \u2014 et ce que ton patron n\'a PAS le droit de faire',
            response: 'Le droit de gr\u00e8ve est un droit constitutionnel garanti par le Pr\u00e9ambule de la Constitution de 1946, alin\u00e9a 7 \u2014 c\'est au sommet de la hi\u00e9rarchie des normes, au-dessus de n\'importe quel r\u00e8glement int\u00e9rieur ou contrat de travail. L\'article L2511-1 du Code du travail est limpide : \u00ab L\'exercice du droit de gr\u00e8ve ne peut justifier la rupture du contrat de travail, sauf faute lourde imputable au salari\u00e9. \u00bb Concr\u00e8tement, ton employeur n\'a PAS le droit de : te licencier pour fait de gr\u00e8ve (le licenciement est nul de plein droit, ce qui ouvre droit \u00e0 r\u00e9int\u00e9gration et rappel de salaire), te sanctionner disciplinairement (avertissement, mise \u00e0 pied), prendre en compte tes jours de gr\u00e8ve dans ton \u00e9valuation, te remplacer par des CDD ou des int\u00e9rimaires (articles L1242-6 et L1251-10 du Code du travail), ou te discriminer \u00e0 ton retour. La seule exception, c\'est la \u00ab faute lourde \u00bb \u2014 et elle est strictement d\u00e9finie par la jurisprudence : violences physiques, s\u00e9questration de personnes, destruction intentionnelle de mat\u00e9riel. Faire gr\u00e8ve pacifiquement, distribuer des tracts, tenir un piquet non bloquant, ce n\'est PAS une faute lourde (Cass. soc., 16 novembre 1993). Pour te prot\u00e9ger concr\u00e8tement : garde toutes les traces \u00e9crites (mails, SMS, courriers), note les t\u00e9moins pr\u00e9sents lors de chaque \u00e9change avec la direction, contacte l\'inspection du travail (DREETS) imm\u00e9diatement si tu subis des pressions. Tu as un d\u00e9lai de 12 mois pour saisir le tribunal des prud\'hommes en cas de licenciement abusif.'
          },
          {
            doubt: 'Combien de temps il faut tenir ?',
            title: 'Strat\u00e9gie de dur\u00e9e et points de bascule',
            response: 'Il n\'y a pas de dur\u00e9e magique, mais il y a des sch\u00e9mas clairs. Selon les donn\u00e9es DARES, les gr\u00e8ves victorieuses dans le secteur priv\u00e9 durent en moyenne 8 \u00e0 15 jours. Les gr\u00e8ves de moins de 3 jours n\'obtiennent g\u00e9n\u00e9ralement que des promesses vagues sans engagement contraignant. Le \u00ab point de bascule \u00bb, c\'est le moment o\u00f9 le co\u00fbt de la gr\u00e8ve pour l\'employeur d\u00e9passe le co\u00fbt de ce que tu demandes \u2014 ton objectif est de faire pencher cette balance un peu plus chaque jour. Le format le plus puissant, c\'est la gr\u00e8ve reconductible : chaque matin, l\'AG vote la poursuite pour 24 heures. Personne ne s\'engage sur une dur\u00e9e inconnue (c\'est psychologiquement rassurant), la d\u00e9cision est collective et quotidienne, et l\'employeur ne sait jamais quand \u00e7a s\'arr\u00eate \u2014 cette incertitude, c\'est la pression maximale. Quelques dur\u00e9es gagnantes dans l\'histoire : les accords de Grenelle en mai 68 apr\u00e8s 3 semaines de gr\u00e8ve g\u00e9n\u00e9rale, la gr\u00e8ve g\u00e9n\u00e9rale en Guadeloupe en 2009 (44 jours \u2192 victoire totale avec +200 \u20ac sur les bas salaires via l\'accord Bino), les accords Matignon en 1936 apr\u00e8s 2 semaines d\'occupations d\'usines. Un facteur d\u00e9cisif et souvent sous-estim\u00e9 : la couverture m\u00e9diatique. Une gr\u00e8ve invisible est une gr\u00e8ve perdue. Contacte les m\u00e9dias locaux d\u00e8s le jour 1, d\u00e9signe un porte-parole clair et identifi\u00e9, utilise les r\u00e9seaux sociaux pour documenter le mouvement au quotidien. La pression de l\'opinion publique s\'ajoute \u00e0 la pression \u00e9conomique et acc\u00e9l\u00e8re la r\u00e9solution du conflit.'
          },
          {
            doubt: 'Les syndicats vont r\u00e9cup\u00e9rer le mouvement',
            title: 'Garder le contr\u00f4le de TA gr\u00e8ve',
            response: 'Tu n\'as PAS besoin d\'un syndicat pour faire gr\u00e8ve. Le droit de gr\u00e8ve est un droit individuel exerc\u00e9 collectivement \u2014 dans le secteur priv\u00e9, aucun pr\u00e9avis syndical n\'est requis, n\'importe quel groupe de 2 salari\u00e9s ou plus peut se mettre en gr\u00e8ve \u00e0 condition de formuler des revendications professionnelles (Cass. soc., 29 mars 1995). \u00c9lis un comit\u00e9 de gr\u00e8ve en AG compos\u00e9 de 5 \u00e0 10 personnes, avec des mandats r\u00e9vocables \u00e0 tout moment et renouvel\u00e9s chaque semaine. Le comit\u00e9 rend des comptes quotidiennement \u00e0 l\'AG, pas l\'inverse. La r\u00e8gle d\'or : c\'est l\'AG qui est souveraine, pas le syndicat. Si un syndicat n\u00e9gocie un accord avec la direction, cet accord ne lie les gr\u00e9vistes que s\'il est vot\u00e9 et approuv\u00e9 en AG. En pratique, les syndicats apportent des ressources pr\u00e9cieuses \u2014 expertise juridique, caisse de gr\u00e8ve, r\u00e9seau m\u00e9diatique, exp\u00e9rience de la n\u00e9gociation \u2014 l\'id\u00e9al est d\'utiliser ces ressources tout en maintenant le pouvoir de d\u00e9cision \u00e0 l\'AG de base. Exemple r\u00e9el : lors de la gr\u00e8ve PSA Aulnay en 2013, la base ouvri\u00e8re a impos\u00e9 ses propres conditions au-del\u00e0 des propositions syndicales initiales, en maintenant une AG quotidienne souveraine qui validait ou rejetait chaque proposition. Documente tout avec des proc\u00e8s-verbaux d\'AG sign\u00e9s par les participants \u2014 c\'est \u00e0 la fois un outil de protection juridique (preuve du caract\u00e8re collectif et organis\u00e9 du mouvement) et un outil de transparence interne qui emp\u00eache quiconque de parler au nom des gr\u00e9vistes sans mandat.'
          }
        ]
      },
      {
        name: 'Association / Collectif citoyen',
        short: 'Groupe structur\u00e9 de citoyens organis\u00e9s autour d\'une cause, avec un cadre juridique ou informel.',
        description: 'Groupe structur\u00e9 de citoyens organis\u00e9s autour d\'une cause, avec un cadre juridique (loi 1901) ou informel.',
        advantages: [
          'Action durable et structur\u00e9e dans le temps : l\'association survit aux individus',
          'Cadre juridique qui permet de recevoir des fonds, agir en justice, signer des conventions',
          'Capacit\u00e9 d\'expertise et de plaidoyer : les associations produisent du savoir et le portent aupr\u00e8s des d\u00e9cideurs',
          'Apprentissage de la d\u00e9mocratie interne : assembl\u00e9es g\u00e9n\u00e9rales, \u00e9lections, gestion collective',
          'Cr\u00e9e du lien social et de la solidarit\u00e9 concr\u00e8te entre les membres et les b\u00e9n\u00e9ficiaires',
          'Peut servir de contre-pouvoir institutionnel durable face \u00e0 l\'\u00c9tat ou aux entreprises'
        ],
        limits: [
          'D\u00e9pendance au b\u00e9n\u00e9volat avec risque d\'essoufflement et de burn-out militant',
          'Complexit\u00e9 administrative croissante (comptabilit\u00e9, d\u00e9clarations, demandes de subventions)',
          'Risque de professionnalisation excessive qui \u00e9loigne l\'association de sa base citoyenne',
          'D\u00e9pendance aux subventions publiques qui peut limiter la capacit\u00e9 critique vis-\u00e0-vis des financeurs',
          'Gouvernance parfois opaque : concentration du pouvoir chez les fondateurs ou le bureau',
          'Le tissu associatif fran\u00e7ais est fragilis\u00e9 par la baisse des financements publics et la r\u00e9forme des contrats aid\u00e9s'
        ],
        nuances: 'L\'association loi 1901 est la cl\u00e9 de vo\u00fbte de la soci\u00e9t\u00e9 civile fran\u00e7aise, mais elle porte en elle une tension entre son id\u00e9al d\u00e9mocratique et sa r\u00e9alit\u00e9 organisationnelle. Beaucoup d\'associations reproduisent en interne les m\u00eames travers qu\'elles d\u00e9noncent au dehors : concentration du pouvoir, manque de transparence, exclusion de certaines voix. En m\u00eame temps, c\'est souvent dans l\'espace associatif que s\'inventent les pratiques d\u00e9mocratiques les plus innovantes (gouvernance partag\u00e9e, sociocratie, consensus). Le d\u00e9fi est de maintenir vivante la d\u00e9mocratie interne quand l\'urgence de l\'action pousse \u00e0 l\'efficacit\u00e9.',
        legal: 'La libert\u00e9 d\'association est garantie par la loi du 1er juillet 1901 (loi Waldeck-Rousseau) et par l\'article 11 de la Convention europ\u00e9enne des droits de l\'homme. Une association se cr\u00e9e par simple d\u00e9claration en pr\u00e9fecture (articles 2 et 5 de la loi de 1901). La reconnaissance d\'utilit\u00e9 publique (d\u00e9cret en Conseil d\'\u00c9tat) ouvre droit \u00e0 des avantages fiscaux (articles 200 et 238 bis du CGI). La loi du 12 avril 2000 relative aux droits des citoyens dans leurs relations avec les administrations encadre les subventions. La loi ESS du 31 juillet 2014 a cr\u00e9\u00e9 l\'agr\u00e9ment ESUS pour les associations d\'\u00e9conomie sociale et solidaire.',
        howto: [
          'D\u00e9finir l\'objet social, r\u00e9diger les statuts et constituer un bureau (pr\u00e9sident, tr\u00e9sorier, secr\u00e9taire)',
          'D\u00e9clarer l\'association en pr\u00e9fecture (ou en ligne sur le site du Journal Officiel) pour obtenir la capacit\u00e9 juridique',
          'Ouvrir un compte bancaire au nom de l\'association et mettre en place une comptabilit\u00e9 transparente',
          'Mobiliser des membres actifs et organiser r\u00e9guli\u00e8rement des assembl\u00e9es g\u00e9n\u00e9rales',
          'Rechercher des financements : subventions, dons, cotisations, m\u00e9c\u00e9nat, financement participatif',
          'Communiquer sur les actions et les r\u00e9sultats pour maintenir la l\u00e9gitimit\u00e9 et attirer de nouveaux soutiens'
        ],
        examples: [
          { title: 'ATD Quart Monde (fond\u00e9e en 1957)', text: 'Pionni\u00e8re de la participation des personnes en pr\u00e9carit\u00e9 aux d\u00e9cisions publiques. A contribu\u00e9 \u00e0 la loi contre l\'exclusion de 1998, \u00e0 la cr\u00e9ation du RSA et \u00e0 l\'inscription de la lutte contre la pauvret\u00e9 comme priorit\u00e9 nationale.' },
          { title: 'Greenpeace France (depuis 1977)', text: 'ONG environnementale combinant actions spectaculaires (occupation de centrales, blocage de navires) et plaidoyer juridique. A contribu\u00e9 au moratoire sur les essais nucl\u00e9aires et \u00e0 de nombreuses campagnes environnementales.' },
          { title: 'Collectif des Morts de la Rue (fond\u00e9 en 2002)', text: 'Collectif citoyen informel devenu association, qui recense et nomme les personnes d\u00e9c\u00e9d\u00e9es sans abri. Rend visible l\'invisible et interpelle les pouvoirs publics sur le mal-logement avec des donn\u00e9es factuelles.' }
        ],
        related: ['P\u00e9tition', 'Action en justice citoyenne', 'Budget participatif']
      },
      {
        name: 'Boycott',
        short: 'Refus collectif d\'acheter un produit ou d\'utiliser un service pour forcer un changement.',
        description: 'Refus collectif et organis\u00e9 d\'acheter un produit, d\'utiliser un service ou de fr\u00e9quenter une entreprise pour la forcer \u00e0 changer ses pratiques.',
        advantages: [
          'Touche directement au portefeuille \u2014 le seul langage que certains comprennent',
          'Peut \u00eatre men\u00e9 sans organisation formelle : le boycott est viral et d\u00e9centralis\u00e9 par nature',
          'Force la transparence : les marques craignent l\'image publique plus que les r\u00e9gulations',
          'Chaque acte d\'achat devient un acte politique \u2014 politise le quotidien',
          'Cr\u00e9e une solidarit\u00e9 entre consommateurs qui d\u00e9couvrent leur pouvoir collectif',
          'Peut toucher des multinationales hors de port\u00e9e des \u00c9tats nationaux'
        ],
        limits: [
          'Difficile \u00e0 maintenir dans la dur\u00e9e : la lassitude et les habitudes de consommation reprennent le dessus',
          'Peut p\u00e9naliser les salari\u00e9s (fermetures, ch\u00f4mage partiel) plut\u00f4t que les dirigeants ou actionnaires',
          'Effet parfois dilu\u00e9 si le march\u00e9 offre peu d\'alternatives cr\u00e9dibles',
          'Risque de greenwashing : les entreprises changent l\'image sans changer les pratiques',
          'Peut \u00eatre instrumentalis\u00e9 \u00e0 des fins politiques ou communautaires \u00e9loign\u00e9es de l\'int\u00e9r\u00eat g\u00e9n\u00e9ral',
          'Les consommateurs les plus modestes n\'ont pas toujours le choix de boycotter (produits moins chers vis\u00e9s)'
        ],
        nuances: 'Le boycott est une arme \u00e0 double tranchant qui r\u00e9v\u00e8le les limites de la d\u00e9mocratie par la consommation. Il donne l\'illusion d\'un pouvoir individuel (\u00ab je vote avec mon porte-monnaie \u00bb) tout en masquant les in\u00e9galit\u00e9s d\'acc\u00e8s : boycotter un produit bon march\u00e9 est un luxe. De plus, la fragmentation des cha\u00eenes de production mondialis\u00e9es rend souvent le boycott symbolique : m\u00eame en boycottant une marque, on consomme ses composants via d\'autres produits. Les boycotts les plus efficaces sont ceux qui combinent pression \u00e9conomique et mobilisation politique organis\u00e9e.',
        legal: 'Le boycott de consommateurs n\'est pas sp\u00e9cifiquement r\u00e9glement\u00e9 en droit fran\u00e7ais. Il rel\u00e8ve de la libert\u00e9 d\'expression et de la libert\u00e9 du commerce. L\'appel au boycott peut toutefois \u00eatre qualifi\u00e9 de d\u00e9lit s\'il est discriminatoire (article 225-2 du Code p\u00e9nal, arr\u00eat de la Cour de cassation du 20 octobre 2015 sur le boycott de produits isra\u00e9liens) ou s\'il constitue une entrave \u00e0 la libert\u00e9 du travail (article 431-1 du Code p\u00e9nal). La CEDH a toutefois rappel\u00e9 que l\'appel au boycott rel\u00e8ve de la libert\u00e9 d\'expression (arr\u00eat Baldassi c. France, 2020).',
        howto: [
          'Identifier une cible pr\u00e9cise (une marque, un produit, une enseigne) et des revendications claires',
          'Documenter les pratiques d\u00e9nonc\u00e9es avec des sources fiables et v\u00e9rifiables',
          'Lancer un appel au boycott sur les r\u00e9seaux sociaux avec un hashtag unificateur et une p\u00e9tition',
          'Proposer des alternatives concr\u00e8tes aux consommateurs (autres marques, produits locaux)',
          'Mesurer l\'impact (chiffres de vente, r\u00e9actions de l\'entreprise) et adapter la strat\u00e9gie en cons\u00e9quence'
        ],
        examples: [
          { title: 'Boycott de Montgomery (USA, 1955-1956)', text: '381 jours de boycott des bus par la communaut\u00e9 afro-am\u00e9ricaine apr\u00e8s l\'arrestation de Rosa Parks. A abouti \u00e0 la d\u00e9cision de la Cour supr\u00eame d\u00e9clarant la s\u00e9gr\u00e9gation dans les transports publics inconstitutionnelle et lanc\u00e9 le mouvement des droits civiques.' },
          { title: 'Boycott de Danone (France, 2001)', text: 'Appel au boycott apr\u00e8s l\'annonce de la fermeture de l\'usine LU de Calais malgr\u00e9 des b\u00e9n\u00e9fices records. Impact mesurable sur les ventes et l\'image de la marque. A contribu\u00e9 au d\u00e9bat sur la responsabilit\u00e9 sociale des entreprises en France.' },
          { title: 'BDS (Boycott, D\u00e9sinvestissement, Sanctions, depuis 2005)', text: 'Campagne internationale de boycott \u00e9conomique, culturel et acad\u00e9mique. Illustre \u00e0 la fois le potentiel mobilisateur du boycott et les controverses juridiques qu\'il suscite, notamment en France o\u00f9 les appels au boycott ont fait l\'objet de poursuites p\u00e9nales avant l\'arr\u00eat de la CEDH Baldassi c. France (2020).' }
        ],
        related: ['Gr\u00e8ve', 'P\u00e9tition', 'Association / Collectif citoyen']
      }
    ]
  },
  {
    id: 'unconventional',
    name: 'Formes non-conventionnelles',
    subtitle: 'Quand les voies classiques ne suffisent plus',
    forms: [
      {
        name: 'D\u00e9sob\u00e9issance civile',
        short: 'Violation d\u00e9lib\u00e9r\u00e9e et non-violente d\'une loi jug\u00e9e injuste, en acceptant les cons\u00e9quences.',
        description: 'Violation d\u00e9lib\u00e9r\u00e9e, publique et non-violente d\'une loi ou d\'une r\u00e8gle jug\u00e9e injuste, en acceptant les cons\u00e9quences juridiques.',
        advantages: [
          'Impact symbolique puissant \u2014 expose l\'injustice au grand jour et force la soci\u00e9t\u00e9 \u00e0 se positionner',
          'Tradition philosophique solide (Thoreau, Gandhi, King, Arendt) qui fonde sa l\u00e9gitimit\u00e9 morale',
          'Peut acc\u00e9l\u00e9rer des changements que des d\u00e9cennies de lobbying et de n\u00e9gociation n\'ont pas obtenus',
          'Cr\u00e9e de l\'admiration et de l\'empathie quand l\'engagement personnel est visible (risquer la prison pour ses convictions)',
          'R\u00e9veille la conscience collective : oblige chacun \u00e0 se demander si la loi transgress\u00e9e est juste',
          'Alimente le d\u00e9bat juridique et peut conduire \u00e0 faire \u00e9voluer la loi elle-m\u00eame'
        ],
        limits: [
          'Risque juridique r\u00e9el : amendes, casier judiciaire, prison, cons\u00e9quences professionnelles',
          'Peut \u00eatre mal compris ou rejet\u00e9 par l\'opinion publique si la cause n\'est pas per\u00e7ue comme l\u00e9gitime',
          'N\u00e9cessite une discipline non-violente stricte pour garder sa l\u00e9gitimit\u00e9 \u2014 un seul d\u00e9rapage discr\u00e9dite tout le mouvement',
          'Risque de r\u00e9pression disproportionn\u00e9e par l\'\u00c9tat (violences polici\u00e8res, surveillance, fichage)',
          'La r\u00e9cup\u00e9ration m\u00e9diatique peut r\u00e9duire l\'action \u00e0 un spectacle sans en transmettre le sens profond',
          'Peut creuser un foss\u00e9 entre les militants les plus radicaux et le reste de la population'
        ],
        nuances: 'La d\u00e9sob\u00e9issance civile pose une question fondamentale \u00e0 la d\u00e9mocratie : une loi d\u00e9mocratiquement vot\u00e9e peut-elle \u00eatre l\u00e9gitimement transgress\u00e9e ? Pour Thoreau et King, la r\u00e9ponse est oui quand la loi viole un principe moral sup\u00e9rieur. Mais qui d\u00e9cide de ce principe sup\u00e9rieur ? La force de la d\u00e9sob\u00e9issance civile tient pr\u00e9cis\u00e9ment dans le fait que le d\u00e9sob\u00e9issant accepte la sanction : il ne nie pas la l\u00e9gitimit\u00e9 du syst\u00e8me juridique, il en appelle \u00e0 sa conscience. Cette tension entre l\u00e9galit\u00e9 et l\u00e9gitimit\u00e9 est irr\u00e9ductible et constitue le moteur de l\'\u00e9volution du droit.',
        legal: 'La d\u00e9sob\u00e9issance civile n\'a pas de statut juridique propre en droit fran\u00e7ais. Elle constitue par d\u00e9finition une infraction. Les d\u00e9sob\u00e9issants s\'exposent aux sanctions p\u00e9nales correspondant aux infractions commises. Cependant, l\'\u00e9tat de n\u00e9cessit\u00e9 (article 122-7 du Code p\u00e9nal) a \u00e9t\u00e9 invoqu\u00e9 avec succ\u00e8s dans certains proc\u00e8s (notamment pour des d\u00e9crocheurs de portraits pr\u00e9sidentiels pour le climat en 2019, acquitt\u00e9s en appel \u00e0 Lyon). Le Conseil constitutionnel a rappel\u00e9 que le droit de r\u00e9sistance \u00e0 l\'oppression figure \u00e0 l\'article 2 de la DDHC de 1789, sans lui donner de port\u00e9e juridique directe.',
        howto: [
          '\u00c9valuer soigneusement le risque juridique et personnel avant de s\'engager (consulter un avocat)',
          'Se former \u00e0 la non-violence active et aux techniques de d\u00e9sescalade',
          'Planifier l\'action avec pr\u00e9cision : lieu, moment, message, communication aux m\u00e9dias',
          'Pr\u00e9voir un soutien juridique (avocat pr\u00e9venu, observateurs l\u00e9gaux sur place)',
          'Assumer publiquement l\'action et ses cons\u00e9quences \u2014 c\'est ce qui fait la diff\u00e9rence avec la clandestinit\u00e9',
          'Articuler l\'action \u00e0 une strat\u00e9gie plus large (campagne, plaidoyer, proposition de loi alternative)'
        ],
        examples: [
          { title: 'Faucheurs volontaires d\'OGM (France, 2003-2010)', text: 'Destruction assum\u00e9e et publique de champs OGM en plein air, men\u00e9e notamment par Jos\u00e9 Bov\u00e9. Malgr\u00e9 des condamnations p\u00e9nales, a contribu\u00e9 au moratoire fran\u00e7ais sur les cultures OGM en 2008 et \u00e0 l\'interdiction de la mise en culture du MON810.' },
          { title: 'D\u00e9crocheurs de portraits pr\u00e9sidentiels (France, 2019)', text: 'Des militants \u00e9cologistes ont d\u00e9croch\u00e9 des portraits d\'Emmanuel Macron dans des mairies pour d\u00e9noncer l\'inaction climatique. Certains ont \u00e9t\u00e9 acquitt\u00e9s au nom de l\'\u00e9tat de n\u00e9cessit\u00e9, cr\u00e9ant une jurisprudence remarqu\u00e9e.' },
          { title: 'Mouvement des droits civiques (USA, 1955-1968)', text: 'Rosa Parks, sit-ins dans les restaurants s\u00e9gr\u00e9gu\u00e9s, Freedom Rides : la d\u00e9sob\u00e9issance civile non-violente de masse a conduit au Civil Rights Act (1964) et au Voting Rights Act (1965), transformant la soci\u00e9t\u00e9 am\u00e9ricaine.' }
        ],
        related: ['Occupation / ZAD', 'Manifestation', 'Action en justice citoyenne']
      },
      {
        name: 'Occupation / ZAD',
        short: 'Occupation physique d\'un lieu pour bloquer un projet contest\u00e9 ou exp\u00e9rimenter une alternative.',
        description: 'Occupation physique d\'un lieu (terrain, b\u00e2timent, espace public) pour emp\u00eacher un projet contest\u00e9 ou cr\u00e9er une alternative concr\u00e8te.',
        advantages: [
          'Cr\u00e9e un fait accompli \u2014 bloque physiquement un projet et force la n\u00e9gociation',
          'Permet d\'exp\u00e9rimenter d\'autres modes de vie, de gouvernance et de production sur place',
          'Forte couverture m\u00e9diatique et pouvoir symbolique consid\u00e9rable',
          'G\u00e9n\u00e8re une communaut\u00e9 de lutte intense, avec apprentissage collectif acc\u00e9l\u00e9r\u00e9',
          'Remet en question la propri\u00e9t\u00e9 priv\u00e9e et l\'usage des terres comme bien commun',
          'Cr\u00e9e des alliances improbables entre militants \u00e9cologistes, paysans, riverains et intellectuels'
        ],
        limits: [
          'Exposition \u00e0 l\'expulsion violente et \u00e0 la r\u00e9pression polici\u00e8re (gaz lacrymog\u00e8nes, blindés, blessures)',
          'Conditions de vie difficiles et pr\u00e9caires (m\u00e9t\u00e9o, hygi\u00e8ne, isolement)',
          'Risque de marginalisation si le projet est per\u00e7u comme radical ou violent par l\'opinion publique',
          'Tensions internes in\u00e9vitables entre des groupes aux visions et m\u00e9thodes diff\u00e9rentes',
          'Vuln\u00e9rabilit\u00e9 juridique : les occupants s\'exposent \u00e0 des poursuites pour occupation ill\u00e9gale',
          'Difficult\u00e9 \u00e0 transformer l\'occupation temporaire en projet durable apr\u00e8s la victoire'
        ],
        nuances: 'La ZAD est un laboratoire politique \u00e0 ciel ouvert qui fascine et d\u00e9range \u00e0 la fois. Elle r\u00e9v\u00e8le une contradiction profonde de nos d\u00e9mocraties : des projets d\u00e9clar\u00e9s d\'utilit\u00e9 publique peuvent \u00eatre contest\u00e9s pendant des ann\u00e9es sans que les canaux institutionnels ne permettent de r\u00e9soudre le conflit. L\'occupation devient alors le dernier recours face \u00e0 un sentiment d\'impuissance d\u00e9mocratique. Mais elle pose aussi des questions difficiles : qui a le droit de d\u00e9cider de l\'usage d\'un territoire ? La l\u00e9gitimit\u00e9 de l\'occupation r\u00e9side-t-elle dans le nombre d\'occupants, la justesse de la cause, ou la dur\u00e9e de la r\u00e9sistance ?',
        legal: 'L\'occupation de terrain ou de b\u00e2timent est ill\u00e9gale en droit fran\u00e7ais. Les occupants s\'exposent \u00e0 des poursuites pour violation de domicile (article 226-4 du Code p\u00e9nal), installation en r\u00e9union sur un terrain en vue d\'y \u00e9tablir une habitation (article 322-4-1 du Code p\u00e9nal, cr\u00e9\u00e9 par la loi ELAN du 23 novembre 2018). L\'expulsion peut \u00eatre ordonn\u00e9e par le pr\u00e9fet (proc\u00e9dure administrative) ou par le juge (proc\u00e9dure judiciaire). La loi du 7 d\u00e9cembre 2020 (loi ASAP) a acc\u00e9l\u00e9r\u00e9 les proc\u00e9dures d\'\u00e9vacuation. Le d\u00e9bat sur la d\u00e9sob\u00e9issance civile (article 2 DDHC, droit de r\u00e9sistance \u00e0 l\'oppression) reste ouvert.',
        howto: [
          'S\'informer sur les projets contest\u00e9s dans son territoire (enqu\u00eates publiques, projets d\'am\u00e9nagement)',
          'Rejoindre un collectif existant plut\u00f4t que d\'agir seul : la force est dans le nombre et la dur\u00e9e',
          '\u00c9valuer s\u00e9rieusement les risques juridiques, physiques et personnels avant de s\'engager',
          'Organiser la vie collective sur place : r\u00e8gles de vie, assembl\u00e9es, r\u00e9partition des t\u00e2ches',
          'Communiquer avec l\'ext\u00e9rieur : m\u00e9dias, soutiens, \u00e9lus, avocats, r\u00e9seaux de solidarit\u00e9',
          'Documenter l\'occupation (photos, vid\u00e9os, t\u00e9moignages) pour constituer une m\u00e9moire collective et des preuves juridiques'
        ],
        examples: [
          { title: 'ZAD de Notre-Dame-des-Landes (2008-2018)', text: 'Occupation de 1 650 hectares pendant 10 ans contre un projet d\'a\u00e9roport. Le projet a \u00e9t\u00e9 officiellement abandonn\u00e9 le 17 janvier 2018 par le Premier ministre \u00c9douard Philippe. Certains occupants sont rest\u00e9s et d\u00e9veloppent des projets agricoles, artisanaux et associatifs.' },
          { title: 'Occupation du Larzac (1971-1981)', text: '10 ans de r\u00e9sistance paysanne contre l\'extension d\'un camp militaire. Soutien massif de la soci\u00e9t\u00e9 civile (100 000 personnes au rassemblement de 1973). Fran\u00e7ois Mitterrand a annul\u00e9 le projet d\u00e8s son \u00e9lection en 1981. A inspir\u00e9 toutes les ZAD ult\u00e9rieures.' },
          { title: 'Bure (Meuse, depuis 2016)', text: 'Occupation de bois et terrains contre le projet Cig\u00e9o d\'enfouissement de d\u00e9chets nucl\u00e9aires. A subi une r\u00e9pression polici\u00e8re et judiciaire massive. Illustre les tensions entre planification \u00e9nerg\u00e9tique nationale et refus local d\'un projet impos\u00e9.' }
        ],
        related: ['D\u00e9sob\u00e9issance civile', 'Manifestation', 'Lanceur d\'alerte']
      },
      {
        name: 'Lanceur d\'alerte',
        short: 'Personne qui r\u00e9v\u00e8le publiquement des pratiques ill\u00e9gales ou contraires \u00e0 l\'int\u00e9r\u00eat g\u00e9n\u00e9ral.',
        description: 'Personne qui r\u00e9v\u00e8le publiquement des informations cach\u00e9es sur des pratiques ill\u00e9gales, dangereuses ou contraires \u00e0 l\'int\u00e9r\u00eat g\u00e9n\u00e9ral.',
        advantages: [
          'Peut provoquer des changements massifs \u00e0 partir d\'une seule r\u00e9v\u00e9lation document\u00e9e',
          'Protection juridique renforc\u00e9e en France depuis la loi Sapin 2 (2016) et la loi Waserman (2022)',
          'R\u00f4le essentiel de contre-pouvoir face aux institutions opaques, aux entreprises et aux administrations',
          'Cr\u00e9e un pr\u00e9c\u00e9dent dissuasif : la peur d\'\u00eatre expos\u00e9 pousse les organisations \u00e0 plus de transparence',
          'Alimente le journalisme d\'investigation et renforce le droit du public \u00e0 l\'information',
          'Incarne un courage civique individuel qui inspire et l\u00e9gitime la parole de ceux qui doutent'
        ],
        limits: [
          'Risques personnels majeurs : licenciement, harc\u00e8lement, poursuites judiciaires, menaces',
          'Protection juridique encore insuffisante malgr\u00e9 les lois : les proc\u00e9dures sont longues et co\u00fbteuses',
          'Isolement social et professionnel fr\u00e9quent : le lanceur d\'alerte est souvent per\u00e7u comme un tra\u00eetre par ses pairs',
          'La fronti\u00e8re est parfois floue entre lanceur d\'alerte l\u00e9gitime et divulgation de secrets prot\u00e9g\u00e9s',
          'Les repr\u00e9sailles peuvent \u00eatre indirectes et difficiles \u00e0 prouver (mise au placard, non-renouvellement)',
          'Le syst\u00e8me de signalement interne (obligatoire avant la voie publique) peut \u00eatre utilis\u00e9 pour \u00e9touffer l\'alerte'
        ],
        nuances: 'Le lanceur d\'alerte incarne un paradoxe d\u00e9mocratique profond : la transparence n\u00e9cessaire au bon fonctionnement de la d\u00e9mocratie repose sur la transgression individuelle du secret. La soci\u00e9t\u00e9 a besoin de lanceurs d\'alerte mais ne sait pas les prot\u00e9ger vraiment. M\u00eame avec les avanc\u00e9es l\u00e9gislatives (loi Sapin 2 en 2016, loi Waserman en 2022 transposant la directive europ\u00e9enne), les parcours restent marqu\u00e9s par la souffrance personnelle et professionnelle. Le d\u00e9fi est de construire un syst\u00e8me o\u00f9 l\'alerte est institutionnalis\u00e9e et valoris\u00e9e, pas seulement tol\u00e9r\u00e9e.',
        legal: 'La loi Sapin 2 du 9 d\u00e9cembre 2016 (articles 6 \u00e0 16) a d\u00e9fini le statut de lanceur d\'alerte et cr\u00e9\u00e9 un canal de signalement interne obligatoire. La loi Waserman du 21 mars 2022 (transposant la directive UE 2019/1937) a consid\u00e9rablement renforc\u00e9 la protection : suppression de l\'obligation de signalement interne pr\u00e9alable dans certains cas, cr\u00e9ation d\'une provision pour frais de justice, \u00e9largissement de la d\u00e9finition du lanceur d\'alerte, protection des facilitateurs (personnes aidant le lanceur d\'alerte). Le D\u00e9fenseur des droits est comp\u00e9tent pour orienter et prot\u00e9ger les lanceurs d\'alerte (article 4 de la loi organique du 29 mars 2011 modifi\u00e9e).',
        howto: [
          'Rassembler des preuves solides et les s\u00e9curiser avant toute divulgation (copies, sauvegardes)',
          'Consulter un avocat sp\u00e9cialis\u00e9 en droit des lanceurs d\'alerte pour \u00e9valuer sa situation juridique',
          'Utiliser le canal de signalement interne de son organisation comme premi\u00e8re \u00e9tape (sauf exceptions pr\u00e9vues par la loi Waserman)',
          'Si le signalement interne \u00e9choue : saisir le D\u00e9fenseur des droits ou l\'autorit\u00e9 comp\u00e9tente',
          'En dernier recours : alerter la presse ou le public, en s\'assurant que les informations sont v\u00e9rifi\u00e9es',
          'Contacter une association d\'accompagnement : Maison des Lanceurs d\'Alerte, Transparency International France'
        ],
        examples: [
          { title: 'Ir\u00e8ne Frachon (France, 2007-2010)', text: 'Pneumologue qui a r\u00e9v\u00e9l\u00e9 le scandale du Mediator (laboratoire Servier), m\u00e9dicament responsable de 500 \u00e0 2 000 morts. Malgr\u00e9 les pressions, elle a obtenu le retrait du m\u00e9dicament et la condamnation de Servier en 2021 pour tromperie aggrav\u00e9e et homicides involontaires.' },
          { title: 'Antoine Deltour (Luxembourg, 2014)', text: 'Ancien auditeur de PwC qui a r\u00e9v\u00e9l\u00e9 les LuxLeaks : des accords fiscaux secrets entre le Luxembourg et 340 multinationales. A d\u00e9clench\u00e9 une r\u00e9forme de la transparence fiscale en Europe. Condamn\u00e9 puis partiellement acquitt\u00e9, il a re\u00e7u le prix du citoyen europ\u00e9en en 2015.' },
          { title: 'Fran\u00e7oise Nicolas (France, 2015)', text: 'Cadre de sant\u00e9 \u00e0 l\'h\u00f4pital de Poitiers qui a d\u00e9nonc\u00e9 la maltraitance de patients \u00e2g\u00e9s dans son service. A subi une mise au placard et des pressions pendant des ann\u00e9es avant d\'\u00eatre reconnue comme lanceuse d\'alerte. Illustre la difficult\u00e9 de l\'alerte dans le secteur hospitalier.' }
        ],
        related: ['Action en justice citoyenne', 'Association / Collectif citoyen', 'D\u00e9sob\u00e9issance civile']
      },
      {
        name: 'Art engag\u00e9 / Culture militante',
        short: 'L\'art comme outil de sensibilisation et de mobilisation citoyenne.',
        description: 'Utilisation de l\'art (street art, th\u00e9\u00e2tre de rue, musique, documentaire, d\u00e9tournement publicitaire) comme outil de sensibilisation et de mobilisation.',
        advantages: [
          'Touche les gens par l\'\u00e9motion, pas seulement par l\'argument : contourne les d\u00e9fenses rationnelles',
          'Contourne la saturation de l\'info classique \u2014 une image, une chanson, une performance marquent les esprits durablement',
          'Accessible \u00e0 tous : pas besoin d\'\u00eatre artiste professionnel pour cr\u00e9er un message puissant',
          'Cr\u00e9e des symboles et des imaginaires qui structurent les mouvements sociaux dans la dur\u00e9e',
          'Outil de r\u00e9sistance culturelle : l\'art peut exister l\u00e0 o\u00f9 la parole politique est censur\u00e9e',
          'G\u00e9n\u00e8re de la joie et de la beaut\u00e9 dans la lutte, ce qui renouvelle l\'\u00e9nergie militante'
        ],
        limits: [
          'Impact difficilement mesurable : comment quantifier un changement de perception ?',
          'Risque de rester dans le symbolique sans effet politique concret ni changement structurel',
          'Peut \u00eatre r\u00e9cup\u00e9r\u00e9 par le marketing (artwashing) ou par le march\u00e9 de l\'art qui neutralise la subversion',
          'L\'esth\u00e9tisation de la lutte peut faire oublier les r\u00e9alit\u00e9s mat\u00e9rielles de ceux qui souffrent',
          'Risque de pr\u00eacher les convaincus : l\'art engag\u00e9 touche souvent un public d\u00e9j\u00e0 sensibilis\u00e9',
          'Peut \u00eatre censur\u00e9 ou r\u00e9prim\u00e9 s\'il d\u00e9range vraiment (interdiction d\'affiches, poursuites pour diffamation)'
        ],
        nuances: 'L\'art engag\u00e9 vit dans une tension permanente entre subversion et r\u00e9cup\u00e9ration. Un graffiti contestataire peut devenir une attraction touristique, une chanson de r\u00e9volte un tube commercial, un documentaire militant un produit Netflix. Cette r\u00e9cup\u00e9ration n\'annule pas l\'impact initial mais le transforme. La question n\'est pas de savoir si l\'art change le monde directement (il le fait rarement seul) mais s\'il change les imaginaires qui rendent possible le changement. Les grandes transformations sociales ont presque toujours \u00e9t\u00e9 pr\u00e9c\u00e9d\u00e9es par une transformation culturelle et esth\u00e9tique.',
        legal: 'La libert\u00e9 de cr\u00e9ation artistique est prot\u00e9g\u00e9e par la libert\u00e9 d\'expression (article 11 de la DDHC de 1789, article 10 de la CEDH). La loi du 7 juillet 2016 relative \u00e0 la libert\u00e9 de la cr\u00e9ation, \u00e0 l\'architecture et au patrimoine (loi LCAP) affirme explicitement que \u00ab la cr\u00e9ation artistique est libre \u00bb (article 1er). Cependant, cette libert\u00e9 est limit\u00e9e par le droit \u00e0 l\'image, la diffamation (loi du 29 juillet 1881), l\'injure publique et la provocation \u00e0 la haine. Le street art sur l\'espace public sans autorisation constitue une d\u00e9gradation de bien (article 322-1 du Code p\u00e9nal), m\u00eame si la jurisprudence tend \u00e0 distinguer art et vandalisme.',
        howto: [
          'Identifier le message cl\u00e9 et le public vis\u00e9 : qui veut-on toucher et que veut-on provoquer comme r\u00e9action ?',
          'Choisir le m\u00e9dium le plus adapt\u00e9 au contexte : street art, th\u00e9\u00e2tre-forum, chanson, vid\u00e9o virale, performance',
          'Collaborer avec des artistes engag\u00e9s ou des collectifs culturels existants (th\u00e9\u00e2tre de l\'opprim\u00e9, culture en commun)',
          'Cr\u00e9er dans l\'espace public pour maximiser la visibilit\u00e9 et provoquer la rencontre inattendue',
          'Documenter et diffuser l\'\u0153uvre sur les r\u00e9seaux sociaux pour amplifier son impact au-del\u00e0 du lieu physique',
          'Articuler la d\u00e9marche artistique \u00e0 une action politique concr\u00e8te (p\u00e9tition, manifestation, campagne)'
        ],
        examples: [
          { title: 'Banksy (international)', text: 'Ses \u0153uvres sur le mur de s\u00e9paration en Palestine ont mondialement visibilis\u00e9 la question. Girl with Balloon auto-d\u00e9truite chez Sotheby\'s a g\u00e9n\u00e9r\u00e9 un d\u00e9bat mondial sur l\'art et le march\u00e9. Dismaland (2015) a attir\u00e9 150 000 visiteurs autour d\'une critique radicale du consumérisme.' },
          { title: 'Th\u00e9\u00e2tre de l\'Opprim\u00e9 (Augusto Boal, depuis 1960)', text: 'M\u00e9thode th\u00e9\u00e2trale o\u00f9 le public devient acteur et explore collectivement des situations d\'oppression. Utilis\u00e9 dans le monde entier comme outil d\'\u00e9ducation populaire, de m\u00e9diation sociale et de participation citoyenne. Tr\u00e8s actif en France via des compagnies comme le NAJE.' },
          { title: 'Les Grandes Gueules / HK (France)', text: 'Le rappeur HK et son titre On lache rien (2010) est devenu un hymne des mouvements sociaux fran\u00e7ais, repris dans les manifestations contre la r\u00e9forme des retraites et les Gilets jaunes. Illustre comment une chanson peut devenir un outil de coh\u00e9sion et de r\u00e9sistance collective.' }
        ],
        related: ['Manifestation', 'D\u00e9sob\u00e9issance civile', 'Association / Collectif citoyen']
      },
      {
        name: 'Action en justice citoyenne',
        short: 'Utilisation des tribunaux pour contraindre l\'\u00c9tat ou les entreprises \u00e0 respecter leurs obligations.',
        description: 'Utilisation des tribunaux par des citoyens ou associations pour contraindre l\'\u00c9tat ou des entreprises \u00e0 respecter leurs obligations (environnementales, sociales, sanitaires).',
        advantages: [
          'Force contraignante : une d\u00e9cision de justice s\'impose \u00e0 tous, y compris \u00e0 l\'\u00c9tat',
          'Cr\u00e9e des pr\u00e9c\u00e9dents juridiques qui profitent \u00e0 tous et font \u00e9voluer le droit',
          'Peut obtenir ce que le politique refuse de faire : quand le l\u00e9gislateur est inerte, le juge peut agir',
          'Cr\u00e9dibilit\u00e9 et l\u00e9gitimit\u00e9 du cadre judiciaire : l\'action en justice est per\u00e7ue comme rationnelle et l\u00e9gitime',
          'Effet m\u00e9diatique puissant : un proc\u00e8s attire l\'attention publique et structure le d\u00e9bat',
          'Outil de r\u00e9\u00e9quilibrage : permet \u00e0 des citoyens ordinaires de faire face \u00e0 des multinationales ou des \u00c9tats'
        ],
        limits: [
          'Proc\u00e9dures longues (parfois des ann\u00e9es) et co\u00fbteuses (avocats, expertises, frais de justice)',
          'N\u00e9cessite des comp\u00e9tences juridiques pointues et un acc\u00e8s au droit qui n\'est pas \u00e9gal pour tous',
          'Les d\u00e9cisions ne sont pas toujours appliqu\u00e9es : l\'\u00c9tat peut tarder \u00e0 ex\u00e9cuter une condamnation',
          'Risque de judiciarisation excessive de la vie politique : tout n\'a pas vocation \u00e0 \u00eatre tranch\u00e9 par un juge',
          'Les entreprises disposent de moyens juridiques et financiers tr\u00e8s sup\u00e9rieurs \u00e0 ceux des citoyens',
          'Les proc\u00e9dures-b\u00e2illons (SLAPP) sont utilis\u00e9es pour intimider et \u00e9puiser financi\u00e8rement les plaignants'
        ],
        nuances: 'L\'action en justice citoyenne est devenue un levier d\u00e9mocratique majeur, mais elle ne va pas sans ambigu\u00eft\u00e9s. Elle confie au juge un r\u00f4le politique que le l\u00e9gislateur ne joue pas, ce qui pose la question de la l\u00e9gitimit\u00e9 d\u00e9mocratique de la d\u00e9cision judiciaire. Par ailleurs, le contentieux climatique et environnemental est en pleine explosion mondiale, mais ses effets concrets restent incertains : l\'\u00c9tat fran\u00e7ais a \u00e9t\u00e9 condamn\u00e9 pour inaction climatique en 2021, mais ses \u00e9missions n\'ont pas baiss\u00e9 au rythme prescrit. Le droit est un outil puissant mais lent, et le changement climatique n\'attend pas les d\u00e9lais de proc\u00e9dure.',
        legal: 'Plusieurs cadres juridiques permettent l\'action en justice citoyenne en France. L\'action de groupe (class action) a \u00e9t\u00e9 introduite par la loi Hamon du 17 mars 2014 en mati\u00e8re de consommation, \u00e9tendue \u00e0 l\'environnement, la sant\u00e9 et les discriminations par la loi Justice du XXIe si\u00e8cle du 18 novembre 2016. Le pr\u00e9judice \u00e9cologique est reconnu par le Code civil depuis la loi du 8 ao\u00fbt 2016 (articles 1246 \u00e0 1252). Les associations agr\u00e9\u00e9es peuvent exercer les droits reconnus \u00e0 la partie civile (article L142-2 du Code de l\'environnement). La Charte de l\'environnement de 2004, int\u00e9gr\u00e9e au bloc de constitutionnalit\u00e9, fonde le droit de chacun \u00e0 vivre dans un environnement \u00e9quilibr\u00e9 et respectueux de la sant\u00e9 (article 1er).',
        howto: [
          'Identifier le fondement juridique de l\'action : quel droit a \u00e9t\u00e9 viol\u00e9, par qui, avec quelles preuves ?',
          'Contacter une association sp\u00e9cialis\u00e9e (Notre Affaire \u00e0 Tous, FNE, Sherpa, ClientEarth) ou un avocat en droit de l\'environnement',
          'Constituer un dossier solide avec des preuves, expertises et t\u00e9moignages',
          '\u00c9valuer les co\u00fbts et les d\u00e9lais : envisager le financement participatif pour couvrir les frais',
          'Combiner l\'action juridique avec une campagne m\u00e9diatique pour maximiser la pression',
          'Suivre la proc\u00e9dure et ses recours possibles, et s\'assurer de l\'ex\u00e9cution de la d\u00e9cision'
        ],
        examples: [
          { title: 'L\'Affaire du Si\u00e8cle (France, 2019-2021)', text: 'Quatre associations (Notre Affaire \u00e0 Tous, FNH, Greenpeace, Oxfam) ont attaqu\u00e9 l\'\u00c9tat fran\u00e7ais pour inaction climatique. Le tribunal administratif de Paris a reconnu la carence fautive de l\'\u00c9tat et l\'a condamn\u00e9 \u00e0 r\u00e9parer le pr\u00e9judice \u00e9cologique. Premi\u00e8re condamnation d\'un \u00c9tat pour inaction climatique en France.' },
          { title: 'Affaire Urgenda (Pays-Bas, 2015-2019)', text: '886 citoyens ont attaqu\u00e9 l\'\u00c9tat n\u00e9erlandais pour inaction climatique. Victoire confirm\u00e9e en Cour supr\u00eame en 2019 : l\'\u00c9tat oblig\u00e9 de r\u00e9duire ses \u00e9missions de 25% avant fin 2020. Premi\u00e8re d\u00e9cision au monde contraignant un \u00c9tat sur le climat.' },
          { title: 'Proc\u00e8s de Total/TotalEnergies (France, depuis 2020)', text: 'Plusieurs collectivit\u00e9s et associations ont mis en demeure puis assign\u00e9 TotalEnergies sur la base du devoir de vigilance (loi du 27 mars 2017). Premi\u00e8re application concr\u00e8te de la loi sur le devoir de vigilance \u00e0 une major p\u00e9troli\u00e8re.' }
        ],
        related: ['P\u00e9tition', 'Lanceur d\'alerte', 'Association / Collectif citoyen']
      }
    ]
  }
];
