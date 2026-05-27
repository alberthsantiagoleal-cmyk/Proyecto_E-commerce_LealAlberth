(function () {
  const SEED_VERSION = 'v2';
  if (localStorage.getItem('seed_version') === SEED_VERSION) return;

  const categories = [
    { id: 1, name: 'Camisetas', description: 'Camisetas mundialistas 2026' },
    { id: 2, name: 'Pantalones', description: 'Pantalones y shorts deportivos' },
    { id: 3, name: 'Medias', description: 'Medias de fútbol' },
    { id: 4, name: 'Guayos', description: 'Guayos de fútbol' },
  ];

  const products = [
    {
      id: 1,
      name: "Camiseta Colombia 2026",
      category: "Camisetas",
      price: 120000,
      image:
        "https://futboldeprimera.com.co/wp-content/uploads/Photoroom-20251112_092030_3-358x358.jpg",
      description:
        "Camiseta oficial de la Selección Colombia para el Mundial 2026.",
    },
    {
      id: 2,
      name: "Camiseta Brasil 2026",
      category: "Camisetas",
      price: 120000,
      image:
        "https://futboldeprimera.com.co/wp-content/uploads/20260212_075123-Photoroom.jpg",
      description:
        "Camiseta oficial de la Selección Brasil para el Mundial 2026.",
    },
    {
      id: 3,
      name: "Camiseta Argentina 2026",
      category: "Camisetas",
      price: 120000,
      image:
        "https://futboldeprimera.com.co/wp-content/uploads/20260115_114006-Photoroom.jpg",
      description:
        "Camiseta oficial de la Selección Argentina para el Mundial 2026.",
    },
    {
      id: 4,
      name: "Camiseta Francia 2026",
      category: "Camisetas",
      price: 120000,
      image:
        "https://futgod90.com/cdn/shop/files/A_31aef063-daa4-4af3-a324-a816d7b68c3d.jpg?v=1768411872",
      description:
        "Camiseta oficial de la Selección Francia para el Mundial 2026.",
    },
    {
      id: 5,
      name: "Jogger Negro",
      category: "Pantalones",
      price: 85000,
      image:
        "https://norulessports.com/cdn/shop/files/Copia_de_JOGGER_DAMA_NEGRO2.jpg?v=1752872670",
      description: "Jogger negro relajado, ideal para entrenar o el día a día.",
    },
    {
      id: 6,
      name: "Pantalón Cargo Gris",
      category: "Pantalones",
      price: 95000,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCa1keq3iMI001mL5rRJL33NOyTASc6kHing&s",
      description:
        "Pantalón cargo gris con bolsillos laterales, estilo urbano.",
    },
    {
      id: 7,
      name: "Short Deportivo Azul",
      category: "Pantalones",
      price: 65000,
      image:
        "https://veraniasw.com/cdn/shop/files/Shortdeportivoazulrey-Photoroom-2.jpg?v=1749674568",
      description: "Short deportivo azul rey, ligero y cómodo para el deporte.",
    },
    {
      id: 8,
      name: "Medias Fútbol Blancas",
      category: "Medias",
      price: 18000,
      image:
        "https://assets.adidas.com/images/w_600,f_auto,q_auto/bd9db739c7074daabe587c688ae2feb9_9366/Medias_adi_23_Blanco_IB7796_01_02_hover_standard.jpg",
      description: "Medias de fútbol blancas Adidas, talla única.",
    },
    {
      id: 9,
      name: "Medias Fútbol Negras",
      category: "Medias",
      price: 18000,
      image:
        "https://fsssportwear.com/wp-content/uploads/2024/07/medias-futbol-3.jpeg",
      description: "Medias de fútbol negras, resistentes y cómodas.",
    },
    {
      id: 10,
      name: "Guayos Phantom GX",
      category: "Guayos",
      price: 380000,
      image:
        "https://lagambetafutbol.com/cdn/shop/files/ad651150.jpg?v=1758830904",
      description: "Nike Phantom GX, precisión y control en cada toque.",
    },
    {
      id: 11,
      name: "Guayos Predator Elite",
      category: "Guayos",
      price: 420000,
      image:
        "https://assets.adidas.com/images/w_600,f_auto,q_auto/b4bb4a5ee9d04e6f89ad433fa243a37a_9366/Guayos_PREDATOR_ELITE_con_Lengueta_Plegable_para_Terreno_Firme_Rojo_JS0380_HM1.jpg",
      description: "Adidas Predator Elite, dominio total del balón.",
    },
    {
      id: 12,
      name: "Guayos F50 Elite",
      category: "Guayos",
      price: 390000,
      image:
        "https://assets.adidas.com/images/c_fill,g_auto,w_1200,h_630,f_auto,q_auto/w_600,f_auto,q_auto/1eb82bc423a3494fb622aa9791fdeed3_9366/Guayos_F50_Elite_Terreno_Firme_Naranja_JH7618_HM1.jpg",
      description: "Adidas F50 Elite, velocidad y potencia en terreno firme.",
    },
  ];

  localStorage.setItem('categories', JSON.stringify(categories));
  localStorage.setItem('products', JSON.stringify(products));
  localStorage.setItem('seed_version', SEED_VERSION);
})();
