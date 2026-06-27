document.addEventListener('DOMContentLoaded', () => {

    // ===== LOADING SCREEN =====
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingBar = document.getElementById('loadingBar');
    const loadingPercent = document.getElementById('loadingPercent');
    let progress = 0;

    const progressInterval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
            }, 300);
        }
        if (loadingBar) loadingBar.style.width = progress + '%';
        if (loadingPercent) loadingPercent.textContent = Math.floor(progress) + '%';
    }, 120);

    // ===== THEME =====
    const themeToggle = document.getElementById('themeToggle');
    const themeTransition = document.getElementById('themeTransition');

    // Reset old dark default → light default on first visit after this update
    if (!localStorage.getItem('theme_ver')) {
        localStorage.removeItem('theme');
        localStorage.setItem('theme_ver', '1');
    }

    const savedTheme = localStorage.getItem('theme') || 'light';

    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
    setThemeIcons(savedTheme === 'light');

    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-mode');
        setThemeIcons(isLight);
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    function setThemeIcons(isLight) {
        themeToggle.classList.toggle('show-sun', !isLight);
    }

    // ===== LANGUAGE SWITCHING =====
    const translations = {
        en: {
            'nav.about': 'About Me',
            'nav.expertise': 'Expertise',
            'nav.tarifs': 'Pricing',
            'nav.portfolio': 'Portfolio',
            'nav.testimonials': 'Testimonials',
            'nav.talk': 'Let\'s Talk',
            'about.titleHighlight': 'Videographer &',
            'about.titleRest': 'Photographer',
            'about.desc1': 'Trilingual content creator (FR / AR / EN) with 4+ years in graphic design, video production, photography, and digital media. I\'ve collaborated with national and international initiatives, bringing creative and strategic expertise to amplify their visibility and impact.',
            'about.desc2': 'Official photographer for multiple sports teams, skilled in capturing dynamic, professional imagery that elevates athletic performance and identity. As a media manager for festivals and sports clubs, I combine artistic vision with strategic communication to produce engaging, trend-aware content.',
            'about.skill1': 'Graphic Design',
            'about.skill2': 'Video Production',
            'about.skill3': 'Photography',
            'about.skill4': 'Public Speaking',
            'about.skill5': 'Leadership',
            'about.cta': 'View my work',
            'stats.projects': 'Projects Completed',
            'stats.experience': 'Years of Experience',
            'stats.photos': 'Photos Taken',
            'stats.clients': 'Happy Clients',
            'experience.label': 'Career',
            'experience.title': 'Experience',
            'experience.subtitle': 'Professional roles that shaped my creative journey',
            'exp1.title': 'Media Manager – Bellaregia Festival',
            'exp1.date': 'Tunisia · 2021–2023',
            'exp1.desc': 'Supervised digital and visual content strategy for one of Tunisia\'s leading cultural festivals.',
            'exp2.title': 'Media Manager – Chemtou Festival',
            'exp2.date': 'Tunisia · 2022–2024',
            'exp2.desc': 'Produced multimedia content and managed social media engagement for this historic festival.',
            'exp3.title': 'Media Manager – Mouloudia Boussalem Volleyball',
            'exp3.date': 'Tunisia · 2022–2023',
            'exp3.desc': 'Managed media operations during the African championship season for this top-tier club.',
            'exp4.title': 'Media Manager – US Boussalem',
            'exp4.date': 'Tunisia · 2022–2023',
            'exp4.desc': 'Coordinated digital communication and media strategy for the sports club.',
            'exp5.title': 'Photographer – Olympique Béja',
            'exp5.date': 'Tunisia · 2025–2026',
            'exp5.desc': 'Official photographer for one of Tunisia\'s premier football clubs, capturing match action and team imagery.',
            'certs.label': 'Learning',
            'certs.title': 'Certifications & Training',
            'certs.subtitle': 'Continuous growth through recognized programs',
            'cert1.title': 'Graphic Design & Podcasting',
            'cert1.org': 'Munathara Initiative',
            'cert2.title': 'Community Media & Social Change',
            'cert2.org': 'Munathara & El-Katiba (US Embassy)',
            'cert3.title': 'Climate Advocacy',
            'cert3.org': 'Forum of Federations & National Observatory',
            'cert4.title': 'Leadership Program',
            'cert4.org': 'Tunisia88',
            'cert5.title': 'Women Empowerment – MENA',
            'cert5.org': 'Stages in Jordan, Morocco & Tunisia',
            'cert6.title': 'Peace Ambassador',
            'cert6.org': 'Peace First',
            'services.label': 'What I Do',
            'services.title': 'My Services',
            'services.subtitle': 'Professional visual storytelling tailored to your vision',
            'services.videoTitle': 'Editing Videos Maker',
            'services.videoDesc': 'Professional video editing with cinematic transitions, color grading, and precise storytelling to bring your footage to life.',
            'services.photoTitle': 'Photos Shooter',
            'services.photoDesc': 'High-quality photography for events, portraits, and commercial projects with a keen eye for light and composition.',
            'services.graphicTitle': 'Graphic Designer',
            'services.graphicDesc': 'Creative graphic design services including branding, thumbnails, social media visuals, and custom artwork.',
            'pricing.label': 'Tarifs',
            'pricing.title': 'Pricing List 2026',
            'pricing.subtitle': 'Weddings • Engagements • Events',
            'pricing.popular': 'Popular',
            'pricing.bookNow': 'Book Now',
            'pricing.prestations': 'Services',
            'pricing.premium': 'Premium Options',
            'pricing.commercial': 'Commercial Productions',
            'pricing.reserveBtn': 'Book Now',
            'pricing.eclat': 'Collection ÉCLAT',
            'pricing.eclatSub': 'The essentials to capture every emotion.',
            'pricing.eclatF1': 'Unlimited HD Photos',
            'pricing.eclatF2': 'Full 4K UHD Film',
            'pricing.eclatF3': 'Cinematic Highlight Film',
            'pricing.heritage': 'Collection HÉRITAGE',
            'pricing.heritageSub': 'The perfect balance between elegance and emotion.',
            'pricing.heritageF1': 'All ÉCLAT services',
            'pricing.heritageF2': 'Outdoor shooting',
            'pricing.heritageF3': 'Getting Ready',
            'pricing.heritageF4': '3 Instagram / TikTok Reels',
            'pricing.heritageF5': 'Premium Photobook (30×30 cm)',
            'pricing.signature': 'Collection SIGNATURE',
            'pricing.signatureSub': 'The most complete experience.',
            'pricing.signatureF1': 'All HÉRITAGE services',
            'pricing.signatureF2': 'Second photographer',
            'pricing.signatureF3': 'Second videographer',
            'pricing.signatureF4': '4K Drone',
            'pricing.signatureF5': 'Premium Cinematic Film',
            'pricing.pTeaser': 'Teaser (1-3 min)',
            'pricing.pPack3': 'Pack 3 Reels',
            'pricing.pReelSup': 'Additional Reel',
            'pricing.pShooting': 'Outdoor shooting',
            'pricing.pGettingReady': 'Getting Ready',
            'pricing.pPackSG': 'Shooting + Getting Ready Pack',
            'pricing.pEngagement': 'Engagement / Pre-Wedding',
            'pricing.pOutia': 'Outia / Henna',
            'pricing.pPremium1': 'Second Photographer',
            'pricing.pPremium2': 'Second Videographer',
            'pricing.pPremium3': '4K Drone',
            'pricing.pPremium4': 'Content Creator',
            'pricing.pComm1': 'Restaurant / Café',
            'pricing.pComm2': 'Boutique / Shop',
            'pricing.pComm3': 'Automotive Video',
            'pricing.pComm4': 'Advertising Reel',
            'pricing.pComm5': 'Premium Advertising Video',
            'pricing.pComm6': 'Event (2 h)',
            'pricing.pComm7': 'Half Day (4 h)',
            'pricing.pComm8': 'Full Day (8 h)',
            'gallery.label': 'Portfolio',
            'gallery.title': 'My Work',
            'gallery.subtitle': 'Explore my creative universe through my various productions',
            'gallery.viewAll': 'View All Works',
            'gallery.catWedding': 'Wedding',
            'gallery.catSport': 'Sport',
            'gallery.catEvent': 'Event',
            'gallery.catCommercial': 'Commercial',
            'gallery.catPortrait': 'Portrait',
            'gallery.p1': 'Collection Héritage',
            'gallery.p2': 'Collection Éclat',
            'gallery.p3': 'Romantic Details',
            'gallery.p4': 'Getting Ready',
            'gallery.p5': 'Olympique Béja',
            'gallery.p6': 'Match Action',
            'gallery.p7': 'Team Spirit',
            'gallery.p8': 'Festival Bellarejia',
            'gallery.p9': 'Cultural Night',
            'gallery.p10': 'Product Visual',
            'gallery.p11': 'Brand Story',
            'gallery.p12': 'Studio Session',
            'testimonials.label': 'Kind Words',
            'testimonials.title': 'What Clients Say',
            'testimonials.subtitle': 'Real feedback from people I\'ve worked with',
            'testimonials.t1': '"Mouhaned captured our wedding day perfectly. His attention to detail and ability to be everywhere at once while staying completely unobtrusive was remarkable. The highlights film still makes us emotional every time we watch it."',
            'testimonials.t2': '"Working with Mouhaned on our music video was an incredible experience. He understood our creative vision immediately and brought ideas we never even thought of. The final result exceeded all expectations."',
            'testimonials.t3': '"Professional, creative, and incredibly talented. Mouhaned covered our annual corporate gala and the results were stunning. He has a natural ability to capture the energy of an event."',
            'testimonials.author1': 'Sarah & Mehdi',
            'testimonials.role1': 'Wedding Clients',
            'testimonials.author2': 'Yassin — Artist',
            'testimonials.role2': 'Music Video Client',
            'testimonials.author3': 'Ines — Event Director',
            'testimonials.role3': 'Corporate Event Client',
            'contact.label': 'Get in Touch',
            'contact.title': 'Let\'s Work Together',
            'contact.subtitle': 'Have a project in mind? I\'d love to hear about it. Reach out and let\'s create something great.',
            'contact.follow': 'Follow me',
            'contact.ctaText': 'Ready to start your project? Send me an email and let\'s talk.',
            'contact.ctaBtn': 'Send an Email',
            'contact.emailLabel': 'Email',
            'contact.phoneLabel': 'Phone',
            'footer.rights': '© 2026 mouvision.me — Content Creator · FR / AR / EN. All rights reserved.',
            'works.title': 'All Works',
            'works.subtitle': 'Browse through my complete collection of projects',
        },
        fr: {
            'nav.about': 'À Propos',
            'nav.expertise': 'Expertise',
            'nav.tarifs': 'Tarifs',
            'nav.portfolio': 'Portfolio',
            'nav.testimonials': 'Témoignages',
            'nav.talk': 'Contactez-moi',
            'about.titleHighlight': 'Vidéaste &',
            'about.titleRest': 'Photographe',
            'about.desc1': 'Créateur de contenu trilingue (FR / AR / EN) avec plus de 4 ans d\'expérience en design graphique, production vidéo, photographie et médias numériques. J\'ai collaboré avec des initiatives nationales et internationales, apportant une expertise créative et stratégique pour amplifier leur visibilité et leur impact.',
            'about.desc2': 'Photographe officiel de plusieurs équipes sportives, spécialisé dans la capture d\'images dynamiques et professionnelles qui subliment la performance et l\'identité athlétique. En tant que responsable média pour des festivals et clubs sportifs, je combine vision artistique et communication stratégique pour produire du contenu engageant et tendance.',
            'about.skill1': 'Design Graphique',
            'about.skill2': 'Production Vidéo',
            'about.skill3': 'Photographie',
            'about.skill4': 'Prise de Parole',
            'about.skill5': 'Leadership',
            'about.cta': 'Voir mes travaux',
            'stats.projects': 'Projets Réalisés',
            'stats.experience': 'Années d\'Expérience',
            'stats.photos': 'Photos Prises',
            'stats.clients': 'Clients Satisfaits',
            'experience.label': 'Parcours',
            'experience.title': 'Expériences',
            'experience.subtitle': 'Les rôles professionnels qui ont façonné mon parcours créatif',
            'exp1.title': 'Responsable Média – Festival Bellaregia',
            'exp1.date': 'Tunisie · 2021–2023',
            'exp1.desc': 'Supervision de la stratégie de contenu numérique et visuel pour l\'un des principaux festivals culturels de Tunisie.',
            'exp2.title': 'Responsable Média – Festival de Chemtou',
            'exp2.date': 'Tunisie · 2022–2024',
            'exp2.desc': 'Production de contenus multimédias et gestion de l\'engagement sur les réseaux sociaux pour ce festival historique.',
            'exp3.title': 'Responsable Média – Mouloudia Boussalem Volleyball',
            'exp3.date': 'Tunisie · 2022–2023',
            'exp3.desc': 'Gestion des opérations média pendant la saison du championnat africain pour ce club de premier plan.',
            'exp4.title': 'Responsable Média – US Boussalem',
            'exp4.date': 'Tunisie · 2022–2023',
            'exp4.desc': 'Coordination de la communication numérique et de la stratégie média du club sportif.',
            'exp5.title': 'Photographe – Olympique Béja',
            'exp5.date': 'Tunisie · 2025–2026',
            'exp5.desc': 'Photographe officiel de l\'un des premiers clubs de football de Tunisie, capturant les actions de match et les images d\'équipe.',
            'certs.label': 'Formation',
            'certs.title': 'Certifications & Formations',
            'certs.subtitle': 'Une croissance continue grâce à des programmes reconnus',
            'cert1.title': 'Design Graphique & Podcasting',
            'cert1.org': 'Initiative Munathara',
            'cert2.title': 'Médias Communautaires & Changement Social',
            'cert2.org': 'Munathara & El-Katiba (Ambassade des USA)',
            'cert3.title': 'Plaidoyer Climatique',
            'cert3.org': 'Forum des Fédérations & Observatoire National',
            'cert4.title': 'Programme de Leadership',
            'cert4.org': 'Tunisia88',
            'cert5.title': 'Autonomisation des Femmes – MENA',
            'cert5.org': 'Stages en Jordanie, au Maroc et en Tunisie',
            'cert6.title': 'Ambassadeur de la Paix',
            'cert6.org': 'Peace First',
            'services.label': 'Ce Que Je Fais',
            'services.title': 'Mes Services',
            'services.subtitle': 'Un storytelling visuel professionnel adapté à votre vision',
            'services.videoTitle': 'Montage Vidéo',
            'services.videoDesc': 'Montage vidéo professionnel avec des transitions cinématiques, un étalonnage colorimétrique et un storytelling précis pour donner vie à vos images.',
            'services.photoTitle': 'Photographie',
            'services.photoDesc': 'Photographie de qualité supérieure pour événements, portraits et projets commerciaux avec un œil affûté pour la lumière et la composition.',
            'services.graphicTitle': 'Graphisme',
            'services.graphicDesc': 'Services de design graphique créatif incluant le branding, les thumbnails, les visuels réseaux sociaux et l\'illustration sur mesure.',
            'pricing.label': 'Tarifs',
            'pricing.title': 'Liste des Tarifs 2026',
            'pricing.subtitle': 'Mariages • Fiançailles • Événements',
            'pricing.popular': 'Populaire',
            'pricing.bookNow': 'Réserver',
            'pricing.prestations': 'Prestations',
            'pricing.premium': 'Options Premium',
            'pricing.commercial': 'Productions Commerciales',
            'pricing.reserveBtn': 'Réservez Maintenant',
            'pricing.eclat': 'Collection ÉCLAT',
            'pricing.eclatSub': 'L\'essentiel pour capturer chaque émotion.',
            'pricing.eclatF1': 'Photos illimitées HD',
            'pricing.eclatF2': 'Film complet 4K UHD',
            'pricing.eclatF3': 'Highlight Film cinématographique',
            'pricing.heritage': 'Collection HÉRITAGE',
            'pricing.heritageSub': 'L\'équilibre parfait entre élégance et émotion.',
            'pricing.heritageF1': 'Toutes les prestations ÉCLAT',
            'pricing.heritageF2': 'Shooting extérieur',
            'pricing.heritageF3': 'Getting Ready',
            'pricing.heritageF4': '3 Reels Instagram / TikTok',
            'pricing.heritageF5': 'Photobook Premium (30×30 cm)',
            'pricing.signature': 'Collection SIGNATURE',
            'pricing.signatureSub': 'L\'expérience la plus complète.',
            'pricing.signatureF1': 'Toutes les prestations HÉRITAGE',
            'pricing.signatureF2': 'Deuxième photographe',
            'pricing.signatureF3': 'Deuxième vidéaste',
            'pricing.signatureF4': 'Drone 4K',
            'pricing.signatureF5': 'Film cinématographique Premium',
            'pricing.pTeaser': 'Teaser (1-3 min)',
            'pricing.pPack3': 'Pack 3 Reels',
            'pricing.pReelSup': 'Reel supplémentaire',
            'pricing.pShooting': 'Shooting extérieur',
            'pricing.pGettingReady': 'Getting Ready',
            'pricing.pPackSG': 'Pack Shooting + Getting Ready',
            'pricing.pEngagement': 'Engagement / Pre-Wedding',
            'pricing.pOutia': 'Outia / Henna',
            'pricing.pPremium1': 'Deuxième Photographe',
            'pricing.pPremium2': 'Deuxième Vidéaste',
            'pricing.pPremium3': 'Drone 4K',
            'pricing.pPremium4': 'Content Creator',
            'pricing.pComm1': 'Restaurant / Café',
            'pricing.pComm2': 'Boutique / Commerce',
            'pricing.pComm3': 'Vidéo Automobile',
            'pricing.pComm4': 'Reel Publicitaire',
            'pricing.pComm5': 'Vidéo Publicitaire Premium',
            'pricing.pComm6': 'Événement (2 h)',
            'pricing.pComm7': 'Demi-journée (4 h)',
            'pricing.pComm8': 'Journée complète (8 h)',
            'gallery.label': 'Portfolio',
            'gallery.title': 'Mon Travail',
            'gallery.subtitle': 'Explorez mon univers créatif à travers mes différentes productions',
            'gallery.viewAll': 'Voir Tous les Travaux',
            'gallery.catWedding': 'Mariage',
            'gallery.catSport': 'Sport',
            'gallery.catEvent': 'Événement',
            'gallery.catCommercial': 'Commercial',
            'gallery.catPortrait': 'Portrait',
            'gallery.p1': 'Collection Héritage',
            'gallery.p2': 'Collection Éclat',
            'gallery.p3': 'Détails Romantiques',
            'gallery.p4': 'Préparation',
            'gallery.p5': 'Olympique Béja',
            'gallery.p6': 'Action de Match',
            'gallery.p7': 'Esprit d\'Équipe',
            'gallery.p8': 'Festival Bellarejia',
            'gallery.p9': 'Soirée Culturelle',
            'gallery.p10': 'Visuel Produit',
            'gallery.p11': 'Histoire de Marque',
            'gallery.p12': 'Séance Studio',
            'testimonials.label': 'Beaux Mots',
            'testimonials.title': 'Ce Que Disent les Clients',
            'testimonials.subtitle': 'Des retours sincères des personnes avec qui j\'ai collaboré',
            'testimonials.t1': '"Mouhaned a parfaitement capturé notre jour de mariage. Son attention aux détails et sa capacité à être partout en même temps tout en restant complètement discret étaient remarquables. Le film récapitulatif nous met encore les larmes aux yeux à chaque fois que nous le regardons."',
            'testimonials.t2': '"Travailler avec Mouhaned sur notre clip musical a été une expérience incroyable. Il a compris notre vision créative immédiatement et a apporté des idées auxquelles nous n\'avions même pas pensé. Le résultat final a dépassé toutes nos attentes."',
            'testimonials.t3': '"Professionnel, créatif et incroyablement talentueux. Mouhaned a couvert notre gala annuel d\'entreprise et les résultats étaient époustouflants. Il a une capacité naturelle à capturer l\'énergie d\'un événement."',
            'testimonials.author1': 'Sarah & Mehdi',
            'testimonials.role1': 'Clients Mariage',
            'testimonials.author2': 'Yassin — Artiste',
            'testimonials.role2': 'Client Clip Musical',
            'testimonials.author3': 'Ines — Directrice d\'Événement',
            'testimonials.role3': 'Cliente Événement d\'Entreprise',
            'contact.label': 'Contactez-moi',
            'contact.title': 'Travaillons Ensemble',
            'contact.subtitle': 'Vous avez un projet en tête ? J\'aimerais en entendre parlé. Contactez-moi et créons quelque chose de magnifique.',
            'contact.follow': 'Suivez-moi',
            'contact.ctaText': 'Prêt à démarrer votre projet ? Envoyez-moi un email et discutons-en.',
            'contact.ctaBtn': 'Envoyer un Email',
            'contact.emailLabel': 'Email',
            'contact.phoneLabel': 'Téléphone',
            'footer.rights': '© 2026 mouvision.me — Créateur de Contenu · FR / AR / EN. Tous droits réservés.',
            'works.title': 'Tous les Travaux',
            'works.subtitle': 'Parcourez ma collection complète de projets',
        },
        ar: {
            'nav.about': 'عني',
            'nav.expertise': 'الخبرات',
            'nav.tarifs': 'الأسعار',
            'nav.portfolio': 'الأعمال',
            'nav.testimonials': 'الشهادات',
            'nav.talk': 'تواصل معي',
            'about.titleHighlight': 'صانع أفلام &',
            'about.titleRest': 'مصوّر فوتوغرافي',
            'about.desc1': 'محتوى ثلاثي اللغات (FR / AR / EN) بأكثر من 4 سنوات في التصميم الجرافيكي والإنتاج الفوتوغرافي والتصوير الرقمي. تعاونت مع مبادرات دولية ووطنية، وأقدّم خبرة إبداعية واستراتيجية لتعزيز الرؤية والتأثير.',
            'about.desc2': 'المصوّر الرسمي لعدة فرق رياضية، متخصص في التقاط صور ديناميكية واحترافية ترتقي بالأداء والهوية الرياضية. كمسؤول إعلامي للفعاليات والأندية الرياضية، أجمع بين الرؤية الفنية والاستراتيجية الإنتاجية لإنتاج محتوى جذاب وم与时俱ن.',
            'about.skill1': 'التصميم الجرافيكي',
            'about.skill2': 'إنتاج الفيديو',
            'about.skill3': 'التصوير الفوتوغرافي',
            'about.skill4': 'التحدث أمام الجمهور',
            'about.skill5': 'القيادة',
            'about.cta': 'شاهد أعمالي',
            'stats.projects': 'مشاريع منجزة',
            'stats.experience': 'سنوات الخبرة',
            'stats.photos': 'صور ملتقطة',
            'stats.clients': 'عملاء سعداء',
            'experience.label': 'المسيرة',
            'experience.title': 'الخبرات',
            'experience.subtitle': 'الأدوار المهنية التي شكّلت رحلتي الإبداعية',
            'exp1.title': 'مسؤول إعلامي – مهرجان بلاريجيا',
            'exp1.date': 'تونس · 2021–2023',
            'exp1.desc': 'إشراف على استراتيجية المحتوى الرقمي والبصري لأحد أكبر المهرجانات الثقافية في تونس.',
            'exp2.title': 'مسؤول إعلامي – مهرجان شمتو',
            'exp2.date': 'تونس · 2022–2024',
            'exp2.desc': 'إنتاج محتوى متعدد الوسائط وإدارة التفاعل على وسائل التواصل الاجتماعي لهذا المهرجان التاريخي.',
            'exp3.title': 'مسؤول إعلامي – مولودية بو سالم للكرة الطائرة',
            'exp3.date': 'تونس · 2022–2023',
            'exp3.desc': 'إدارة العمليات الإعلامية خلال موسم البطولة الأفريقية لهذا النادي الرائد.',
            'exp4.title': 'مسؤول إعلامي – الاتحاد الرياضي ببو سالم',
            'exp4.date': 'تونس · 2022–2023',
            'exp4.desc': 'تنسيق الاتصال الرقمي واستراتيجية الإعلام للنادي الرياضي.',
            'exp5.title': 'مصوّر – الأولمبي الباجي',
            'exp5.date': 'تونس · 2025–2026',
            'exp5.desc': 'المصوّر الرسمي لأحد أبرز أندية كرة القدم في تونس، التقاط لحظات المباراة وصور الفريق.',
            'certs.label': 'التكوين',
            'certs.title': 'الشهادات والتكوينات',
            'certs.subtitle': 'نمو مستمر من خلال برامج معترف بها',
            'cert1.title': 'التصميم الجرافيكي والبودكاست',
            'cert1.org': 'مبادرة مناثرة',
            'cert2.title': 'الإعلام المجتمعي والتغيير الاجتماعي',
            'cert2.org': 'مناثرة والكتيبة (السفارة الأمريكية)',
            'cert3.title': 'المناصرة المناخية',
            'cert3.org': 'منتدى الاتحادات والمرصد الوطني',
            'cert4.title': 'برنامج القيادة',
            'cert4.org': 'تونس88',
            'cert5.title': 'تمكين المرأة – منطقة الشرق الأوسط وشمال أفريقيا',
            'cert5.org': 'تمارين في الأردن والمغرب وتونس',
            'cert6.title': 'سفير السلام',
            'cert6.org': 'بيس فيرست',
            'services.label': 'ما أقدمه',
            'services.title': 'خدماتي',
            'services.subtitle': 'سرد بصري احترافي مصمم وفق رؤيتك',
            'services.videoTitle': 'مونتاج الفيديو',
            'services.videoDesc': 'مونتاج فيديو احترافي مع انتقالات سينمائية وتصحيح ألوان وسرد دقيق لإحياء لقطاتك.',
            'services.photoTitle': 'التصوير الفوتوغرافي',
            'services.photoDesc': 'تصوير فوتوغرافي عالي الجودة للفعاليات والبورتريه والمشاريع التجارية مع انتباه دقيق للإضاءة والتكوين.',
            'services.graphicTitle': 'التصميم الجرافيكي',
            'services.graphicDesc': 'خدمات تصميم جرافيكي إبداعية تشمل الهوية البصرية والصور المصغرة ومحتوى وسائل التواصل الاجتماعي والرسومات المخصصة.',
            'pricing.label': 'الأسعار',
            'pricing.title': 'قائمة الأسعار 2026',
            'pricing.subtitle': 'حفلات الزفاف • الخطوبة • الفعاليات',
            'pricing.popular': 'الأكثر طلباً',
            'pricing.bookNow': 'احجز الآن',
            'pricing.prestations': 'الخدمات',
            'pricing.premium': 'خيارات مميزة',
            'pricing.commercial': 'الإنتاجات التجارية',
            'pricing.reserveBtn': 'احجز الآن',
            'pricing.eclat': 'مجموعة الإكلات',
            'pricing.eclatSub': 'الأساسيات لالتقاط كل انفعال.',
            'pricing.eclatF1': 'صور HD غير محدودة',
            'pricing.eclatF2': 'فيلم كامل بدقة 4K UHD',
            'pricing.eclatF3': 'فيلم أبرز اللقطات السينمائي',
            'pricing.heritage': 'مجموعة الإرث',
            'pricing.heritageSub': 'التوازن المثالي بين الأناقة والانفعال.',
            'pricing.heritageF1': 'جميع خدمات الإكلات',
            'pricing.heritageF2': 'تصوير في الهواء الطلق',
            'pricing.heritageF3': 'التحضير',
            'pricing.heritageF4': '3 ريلز إنستغرام / تيك توك',
            'pricing.heritageF5': 'كت صور ممتازة (30×30 سم)',
            'pricing.signature': 'مجموعة التوقيع',
            'pricing.signatureSub': 'التجربة الأكثر شمولاً.',
            'pricing.signatureF1': 'جميع خدمات الإرث',
            'pricing.signatureF2': 'مصوّر ثانٍ',
            'pricing.signatureF3': 'صانع أفلام ثانٍ',
            'pricing.signatureF4': 'طائرة مسيّرة 4K',
            'pricing.signatureF5': 'فيلم سينمائي ممتاز',
            'pricing.pTeaser': 'تيزر (1-3 دقائق)',
            'pricing.pPack3': 'باقة 3 ريلز',
            'pricing.pReelSup': 'ريل إضافي',
            'pricing.pShooting': 'تصوير في الهواء الطلق',
            'pricing.pGettingReady': 'التحضير',
            'pricing.pPackSG': 'باقة تصوير + تحضير',
            'pricing.pEngagement': 'الخطوبة / ما قبل الزفاف',
            'pricing.pOutia': 'العوّية / الحنّاء',
            'pricing.pPremium1': 'مصوّر ثانٍ',
            'pricing.pPremium2': 'صانع أفلام ثانٍ',
            'pricing.pPremium3': 'طائرة مسيّرة 4K',
            'pricing.pPremium4': 'صانع محتوى',
            'pricing.pComm1': 'مطعم / مقهى',
            'pricing.pComm2': 'متجر / تجارة',
            'pricing.pComm3': 'فيديو سيارات',
            'pricing.pComm4': 'ريل إعلاني',
            'pricing.pComm5': 'فيديو إعلاني ممتاز',
            'pricing.pComm6': 'فعالية (ساعتان)',
            'pricing.pComm7': 'نصف يوم (4 ساعات)',
            'pricing.pComm8': 'يوم كامل (8 ساعات)',
            'gallery.label': 'الأعمال',
            'gallery.title': 'أعمالي',
            'gallery.subtitle': 'استكشف عالمي الإبداعي من خلال إنتاجاتي المتنوعة',
            'gallery.viewAll': 'عرض جميع الأعمال',
            'gallery.catWedding': 'زفاف',
            'gallery.catSport': 'رياضة',
            'gallery.catEvent': 'فعالية',
            'gallery.catCommercial': 'تجاري',
            'gallery.catPortrait': 'بورتريه',
            'gallery.p1': 'مجموعة الإرث',
            'gallery.p2': 'مجموعة الإكلات',
            'gallery.p3': 'تفاصيل رومانسية',
            'gallery.p4': 'التحضير',
            'gallery.p5': 'الأولمبي الباجي',
            'gallery.p6': 'لحظة مباراة',
            'gallery.p7': 'روح الفريق',
            'gallery.p8': 'مهرجان بلاريجيا',
            'gallery.p9': 'ليلة ثقافية',
            'gallery.p10': 'صورة منتج',
            'gallery.p11': 'قصة العلامة التجارية',
            'gallery.p12': 'جلسة استوديو',
            'testimonials.label': 'كلام جميل',
            'testimonials.title': 'ماذا يقول العملاء',
            'testimonials.subtitle': 'ملاحظات حقيقية من أشخاص عملت معهم',
            'testimonials.t1': '"صوّر Mouhaned يوم زفافنا بشكل مثالي. انتباهه للتفاصيل وقدرته على التواجد في كل مكان في نفس الوقت مع البقاء غير ملحوظ كان مذهلاً. فيلم الصور لا يزال يبكي كل مرة نشاهده."',
            'testimonials.t2': '"العمل مع Mouhaned على فيديو الموسيقى كان تجربة لا تصدق. فهم رؤيتنا الإبداعية فوراً وقدّم أفكاراً لم نفكر فيها أبداً. النتيجة النهائية تجاوزت كل التوقعات."',
            'testimonials.t3': '"محترف ومبدع وموهوب بشكل لا يصدق. غطّى Mouhaned حفلنا السنوي للشركات والنتائج كانت مذهلة. لديه قدرة طبيعية على التقاط طاقة الحدث."',
            'testimonials.author1': 'سارة ومهدي',
            'testimonials.role1': 'عملاء زفاف',
            'testimonials.author2': 'ياسين — فنان',
            'testimonials.role2': 'عميل فيديو موسيقى',
            'testimonials.author3': 'إينس — مديرة فعاليات',
            'testimonials.role3': 'عميلة فعالية شركة',
            'contact.label': 'تواصل معي',
            'contact.title': 'لنعمل معاً',
            'contact.subtitle': 'لديك مشروع في ذهنك؟ أتطلع لسماعه. تواصل معي ولننشئ شيئاً رائعاً.',
            'contact.follow': 'تابعني',
            'contact.ctaText': 'مستعد لبدء مشروعك؟ أرسل لي بريداً إلكترونياً ونتحدث.',
            'contact.ctaBtn': 'إرسال بريد إلكتروني',
            'contact.emailLabel': 'البريد الإلكتروني',
            'contact.phoneLabel': 'الهاتف',
            'footer.rights': '© 2026 mouvision.me — صانع محتوى · FR / AR / EN. جميع الحقوق محفوظة.',
            'works.title': 'جميع الأعمال',
            'works.subtitle': 'تصفح مجموعتي الكاملة من المشاريع',
        }
    };

    let currentLang = localStorage.getItem('lang') || 'fr';

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.setAttribute('lang', lang);
        if (lang === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
        }

        const elements = document.querySelectorAll('[data-i18n]');
        const batchSize = 8;
        let i = 0;

        function fadeOutBatch() {
            const batch = Array.from(elements).slice(i, i + batchSize);
            batch.forEach(el => el.classList.add('lang-fade-out'));
            i += batchSize;
            if (i < elements.length) {
                requestAnimationFrame(() => setTimeout(fadeOutBatch, 25));
            } else {
                setTimeout(() => {
                    elements.forEach(el => {
                        const key = el.getAttribute('data-i18n');
                        if (translations[lang] && translations[lang][key]) {
                            el.textContent = translations[lang][key];
                        }
                    });
                    i = 0;
                    fadeInBatch();
                }, 180);
            }
        }

        function fadeInBatch() {
            const batch = Array.from(elements).slice(i, i + batchSize);
            batch.forEach((el, idx) => {
                setTimeout(() => {
                    el.classList.remove('lang-fade-out');
                    el.classList.add('lang-fade-in');
                    setTimeout(() => el.classList.remove('lang-fade-in'), 350);
                }, idx * 30);
            });
            i += batchSize;
            if (i < elements.length) {
                requestAnimationFrame(() => setTimeout(fadeInBatch, 25));
            }
        }

        fadeOutBatch();

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    }

    const langSwitcher = document.getElementById('langSwitcher');
    if (langSwitcher) {
        langSwitcher.addEventListener('click', (e) => {
            const btn = e.target.closest('.lang-btn');
            if (btn) setLanguage(btn.getAttribute('data-lang'));
        });
    }
    setLanguage(currentLang);

    // ===== HAMBURGER MENU =====
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open');
        document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ===== HEADER SCROLL =====
    const header = document.getElementById('header');
    const scrollTop = document.getElementById('scrollTop');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Scroll-to-top button
        scrollTop.classList.toggle('visible', scrollY > 400);

        // Active nav link
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            const bottom = top + section.offsetHeight;
            if (scrollY >= top && scrollY < bottom) {
                navLinks.forEach(a => a.classList.remove('active'));
                const active = document.querySelector(`.nav-links a[href="#${section.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { passive: true });

    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===== SCROLL REVEAL ANIMATIONS =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    // ===== SCROLL REVEAL =====
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    // Assign reveal attributes to elements
    const revealMap = [
        { sel: '.about-eyebrow', dir: 'left', delay: 0 },
        { sel: '.about-text h2', dir: 'up', delay: 100 },
        { sel: '.about-text p', dir: 'up', delay: 200 },
        { sel: '.skills', dir: 'up', delay: 300 },
        { sel: '.about-cta', dir: 'up', delay: 400 },
        { sel: '.about-image', dir: 'zoom', delay: 200 },
        { sel: '.stat-item', dir: 'up', delay: 0 },
        { sel: '.section-header', dir: 'up', delay: 0 },
        { sel: '.service-card', dir: 'up', delay: 100 },
        { sel: '.contact-card', dir: 'up', delay: 100 },
        { sel: '.contact-social-row', dir: 'up', delay: 200 },
        { sel: '.contact-cta', dir: 'up', delay: 300 },
        { sel: 'footer', dir: 'up', delay: 0 },
    ];

    revealMap.forEach(({ sel, dir, delay }) => {
        document.querySelectorAll(sel).forEach((el, i) => {
            el.setAttribute('data-reveal', dir);
            const d = delay + (i * 80);
            if (d) el.setAttribute('data-delay', Math.min(d, 700));
            revealObserver.observe(el);
        });
    });

    // Observe elements that already have data-reveal in HTML
    document.querySelectorAll('[data-reveal]').forEach(el => {
        revealObserver.observe(el);
    });

    // Gallery items already handled by existing observer
    document.querySelectorAll('.gallery-item').forEach((el, i) => {
        el.dataset.delay = i * 120;
        observer.observe(el);
    });

    // ===== STATS COUNTER =====
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('.stat-number');
                numbers.forEach(num => {
                    const target = parseInt(num.dataset.target);
                    const suffix = target >= 100 ? '+' : (target >= 50 ? '+' : '');
                    let current = 0;
                    const increment = target / 60;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        num.textContent = Math.floor(current) + suffix;
                    }, 25);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) statsObserver.observe(statsSection);

    // ===== TOAST =====
    const toast = document.getElementById('toast');
    function showToast(msg, type = 'success') {
        toast.textContent = msg;
        toast.className = `toast ${type} show`;
        setTimeout(() => toast.classList.remove('show'), 3200);
    }

    function copyToClipboard(text) {
        if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok ? Promise.resolve() : Promise.reject();
    }

    const emailBtn = document.getElementById('emailButton');
    const phoneBtn = document.getElementById('phoneButton');

    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            const email = emailBtn.dataset.email || 'mouvisions@gmail.com';
            copyToClipboard(email)
                .then(() => showToast('Email copied!', 'success'))
                .catch(() => showToast('Copy failed', 'error'));
        });
    }

    if (phoneBtn) {
        phoneBtn.addEventListener('click', () => {
            const phone = phoneBtn.dataset.phone || '27912707';
            copyToClipboard('+216 ' + phone.replace(/(\d{2})(\d{3})(\d{3})/, '$1 $2 $3'))
                .then(() => showToast('Phone number copied!', 'success'))
                .catch(() => showToast('Copy failed', 'error'));
        });
    }

    // ===== SOCIAL LINKS =====
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.href && this.href !== '#') {
                e.preventDefault();
                setTimeout(() => window.open(this.href, '_blank'), 150);
            }
        });
    });

    document.querySelectorAll('.footer-email-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const email = btn.dataset.email || 'mouvisions@gmail.com';
            copyToClipboard(email)
                .then(() => showToast('Email copied!', 'success'))
                .catch(() => showToast('Copy failed', 'error'));
        });
    });

    // ===== LIGHTBOX =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox?.querySelector('.lightbox-image');
    const lightboxClose = lightbox?.querySelector('.lightbox-close');

    document.querySelectorAll('.gallery-item img, .video-thumbnail img').forEach(img => {
        img.addEventListener('click', function (e) {
            if (!lightbox || !lightboxImg) return;
            const src = this.getAttribute('src') || this.src;
            if (src && !src.startsWith('http')) {
                lightboxImg.src = src;
                lightbox.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === this) {
                this.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox?.classList.contains('open')) {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // ===== TESTIMONIAL CAROUSEL =====
    const slider = document.getElementById('testimonialSlider');
    const dots = document.querySelectorAll('#testimonialDots .dot');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        if (!slider) return;
        const slides = slider.querySelectorAll('.testimonial-card');
        slides.forEach((s, i) => {
            s.classList.toggle('active', i === index);
        });
        dots.forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    if (dots.length) {
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                goToSlide(i);
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            });
        });
    }

    function nextSlide() {
        const total = dots.length;
        if (!total) return;
        goToSlide((currentSlide + 1) % total);
    }

    if (dots.length) {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // ===== PORTFOLIO RANDOM SHUFFLE =====
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (portfolioGrid) {
        const items = Array.from(portfolioGrid.querySelectorAll('.portfolio-item'));
        // Fisher-Yates shuffle
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }
        // Show 6 with staggered fade-in
        const selected = items.slice(0, 6);
        selected.forEach((item, i) => {
            item.style.display = '';
            setTimeout(() => {
                item.classList.add('revealed');
            }, 300 + (i * 120));
        });
    }

    // ===== MAGNETIC BUTTONS =====
    document.querySelectorAll('.about-cta, .pricing-btn, .pricing-cta-big, .contact-cta-btn, .dev-credit').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px) scale(1.05)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

});
