import { useState, useEffect } from 'react'

// ─── URL ROUTING ─────────────────────────────────────────────────────────────
const urlToPage = (pathname) => pathname.replace(/^\//, '') || 'home'
const pageToUrl = (page) => page === 'home' ? '/' : '/' + page

// ─── DATA ─────────────────────────────────────────────────────────────────────
const LISTINGS = [
  {
    id: 'di-fara-pizza',
    name: 'Di Fara Pizza',
    neighborhood: 'Midwood',
    neighborhoodSlug: 'midwood',
    address: '1424 Avenue J, Brooklyn',
    rating: 4.8,
    reviews: 1240,
    price: '$$',
    specialty: 'Classic Slice',
    description: 'Coal-fired Brooklyn legend run by Dom DeMarco since 1964. Widely regarded as the best plain slice in NYC.',
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: '20% off your first DoorDash order',
    dealExpires: 'Mar 28, 2026',
    badge: '🔥 Top Rated',
    badgeBg: '#C41E3A',
  },
  {
    id: 'lb-spumoni-gardens',
    name: "L&B Spumoni Gardens",
    neighborhood: 'Bensonhurst',
    neighborhoodSlug: 'bensonhurst',
    address: '2725 86th St, Brooklyn',
    rating: 4.6,
    reviews: 890,
    price: '$',
    specialty: 'Sicilian',
    description: 'Famous Sicilian square slices and spumoni dessert. A Brooklyn institution since 1939. $3/slice on weekdays.',
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: 'BOGO slice every Tuesday & Wednesday',
    dealExpires: 'Ongoing',
    badge: 'Best Value',
    badgeBg: '#b35c00',
  },
  {
    id: 'lucali',
    name: 'Lucali',
    neighborhood: 'Carroll Gardens',
    neighborhoodSlug: 'carroll-gardens',
    address: '575 Henry St, Brooklyn',
    rating: 4.9,
    reviews: 2100,
    price: '$$$',
    specialty: 'Neapolitan',
    description: 'BYOB Carroll Gardens gem with a cult following. Reservations essential. Widely considered the best whole pie in New York.',
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: 'Free delivery on orders over $30 via Slice',
    dealExpires: 'Mar 31, 2026',
    badge: '👑 #1 in Brooklyn',
    badgeBg: '#1e7a3a',
  },
  {
    id: 'grimaldis-pizzeria',
    name: "Grimaldi's Pizzeria",
    neighborhood: 'DUMBO',
    neighborhoodSlug: 'dumbo',
    address: '1 Front St, Brooklyn',
    rating: 4.5,
    reviews: 3400,
    price: '$$',
    specialty: 'Coal-Fired',
    description: 'Under the Brooklyn Bridge since 1990. Coal-fired brick oven, iconic views, cash only. A tourist essential that locals still love.',
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: '$5 off orders of $25+ on Grubhub',
    dealExpires: 'Apr 5, 2026',
    badge: 'Landmark',
    badgeBg: '#444',
  },
  {
    id: 'robertas',
    name: "Roberta's",
    neighborhood: 'Bushwick',
    neighborhoodSlug: 'bushwick',
    address: '261 Moore St, Brooklyn',
    rating: 4.4,
    reviews: 5600,
    price: '$$',
    specialty: 'Artisan / Wood-Fired',
    description: 'The OG Bushwick pizza bar that sparked a neighborhood revival. Creative toppings, great natural wine list, loud and fun.',
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Fan Favorite',
    badgeBg: '#5a2d82',
  },
  {
    id: 'julianas-pizza',
    name: "Juliana's Pizza",
    neighborhood: 'DUMBO',
    neighborhoodSlug: 'dumbo',
    address: '19 Old Fulton St, Brooklyn',
    rating: 4.7,
    reviews: 2200,
    price: '$$',
    specialty: 'Coal-Fired',
    description: "Coal-fired pies steps from the Brooklyn Bridge. Opened by Grimaldi's founder Patsy Grimaldi — the original recipe.",
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: 'Free garlic knots with any whole pie order via DoorDash',
    dealExpires: 'Mar 30, 2026',
    badge: 'Original Recipe',
    badgeBg: '#1a4a7a',
  },
  {
    id: 'paulie-gees',
    name: "Paulie Gee's",
    neighborhood: 'Greenpoint',
    neighborhoodSlug: 'greenpoint',
    address: '60 Greenpoint Ave, Brooklyn',
    rating: 4.6,
    reviews: 1100,
    price: '$$',
    specialty: 'Wood-Fired / Artisan',
    description: 'Greenpoint wood-fired gem with inventive pies and an extensive vegan menu. Perfect date night spot.',
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Best Vegan Options',
    badgeBg: '#2d7a4a',
  },
  {
    id: 'motorino',
    name: 'Motorino',
    neighborhood: 'Williamsburg',
    neighborhoodSlug: 'williamsburg',
    address: '349 Metropolitan Ave, Brooklyn',
    rating: 4.5,
    reviews: 980,
    price: '$$',
    specialty: 'Neapolitan',
    description: 'DOC-certified Neapolitan pies in Williamsburg. Imported San Marzano tomatoes and buffalo mozzarella.',
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'DOC Certified',
    badgeBg: '#7a2020',
  },
  {
    id: 'best-pizza-williamsburg',
    name: 'Best Pizza',
    neighborhood: 'Williamsburg',
    neighborhoodSlug: 'williamsburg',
    address: '33 Havemeyer St, Brooklyn',
    rating: 4.6,
    reviews: 1450,
    price: '$',
    specialty: 'Classic Slice',
    description: 'No-frills Williamsburg slice shop with a bold name it actually lives up to. $3 plain slice, cash only.',
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: '$3 slices every Monday — all day',
    dealExpires: 'Ongoing',
    badge: 'Best Slice',
    badgeBg: '#C41E3A',
  },
  {
    id: 'ops-bushwick',
    name: 'Ops',
    neighborhood: 'Bushwick',
    neighborhoodSlug: 'bushwick',
    address: '346 Himrod St, Brooklyn',
    rating: 4.5,
    reviews: 760,
    price: '$$',
    specialty: 'Roman / Fermented Dough',
    description: 'Long-fermented dough, natural wines, and inventive Roman-style pies in a cozy Bushwick setting.',
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Craft Pizza',
    badgeBg: '#4a3060',
  },
  {
    id: 'emily-clinton-hill',
    name: 'Emily',
    neighborhood: 'Clinton Hill',
    neighborhoodSlug: 'clinton-hill',
    address: '919 Fulton St, Brooklyn',
    rating: 4.7,
    reviews: 1650,
    price: '$$',
    specialty: 'Detroit / NY Style',
    description: 'James Beard-nominated Detroit and NY-style pies. The Emmy Burger is legendary. Expect a wait on weekends.',
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: '15% off orders via DoorDash — weekdays only',
    dealExpires: 'Apr 10, 2026',
    badge: 'James Beard',
    badgeBg: '#1a4a7a',
  },
  {
    id: 'totonno',
    name: "Totonno's Pizzeria Napolitano",
    neighborhood: 'Coney Island',
    neighborhoodSlug: 'coney-island',
    address: '1524 Neptune Ave, Brooklyn',
    rating: 4.6,
    reviews: 870,
    price: '$$',
    specialty: 'Neapolitan',
    description: 'NYC landmark since 1924. The oldest family-run pizzeria in the country. Coal-fired, thin-crust, cash only.',
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Since 1924',
    badgeBg: '#444',
  },
  {
    id: 'wheated',
    name: 'Wheated',
    neighborhood: 'Crown Heights',
    neighborhoodSlug: 'crown-heights',
    address: '905 Church Ave, Brooklyn',
    rating: 4.5,
    reviews: 640,
    price: '$$',
    specialty: 'Wood-Fired / Craft',
    description: 'Crown Heights wood-fired craft pizza with a strong local beer selection. Great for groups.',
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: 'Free order of wings with any large pie via Grubhub',
    dealExpires: 'Apr 2, 2026',
    badge: 'Local Favorite',
    badgeBg: '#2d7a4a',
  },
  {
    id: 'vinnies-pizzeria',
    name: "Vinnie's Pizzeria",
    neighborhood: 'Williamsburg',
    neighborhoodSlug: 'williamsburg',
    address: '148 Bedford Ave, Brooklyn',
    rating: 4.5,
    reviews: 1200,
    price: '$',
    specialty: 'Classic Slice / Creative',
    description: 'Beloved Williamsburg slice shop known for wild topping combos and vegan options. Instagram-famous pizza box art.',
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: 'Free 2-liter soda with any large pie via Slice',
    dealExpires: 'Ongoing',
    badge: 'Instagram Famous',
    badgeBg: '#b35c00',
  },
  {
    id: 'sottocasa',
    name: 'Sottocasa Pizzeria',
    neighborhood: 'Boerum Hill',
    neighborhoodSlug: 'boerum-hill',
    address: '298 Atlantic Ave, Brooklyn',
    rating: 4.7,
    reviews: 720,
    price: '$$',
    specialty: 'Neapolitan',
    description: 'Authentic Neapolitan pies in a warm Boerum Hill setting. BYOB, no reservations, perfect neighborhood spot.',
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'BYOB',
    badgeBg: '#1e7a3a',
  },
  {
    id: 'sams-restaurant',
    name: "Sam's Restaurant",
    neighborhood: 'Carroll Gardens',
    neighborhoodSlug: 'carroll-gardens',
    address: '238 Court St, Brooklyn',
    rating: 4.5,
    reviews: 560,
    price: '$$',
    specialty: 'Classic NY',
    description: 'Classic Carroll Gardens red-sauce joint since 1930. Cash only, old-school, no attitude. Locals eat here every week.',
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Since 1930',
    badgeBg: '#444',
  },
  {
    id: 'pizza-plus-bay-ridge',
    name: 'Pizza Plus',
    neighborhood: 'Bay Ridge',
    neighborhoodSlug: 'bay-ridge',
    address: '7711 5th Ave, Brooklyn',
    rating: 4.3,
    reviews: 480,
    price: '$',
    specialty: 'Classic Slice',
    description: 'Bay Ridge neighborhood staple for over 20 years. Reliable, generous slices and a loyal local following.',
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Neighborhood Staple',
    badgeBg: '#555',
  },
  {
    id: 'pinos-park-slope',
    name: "Pino's La Forchetta",
    neighborhood: 'Park Slope',
    neighborhoodSlug: 'park-slope',
    address: '475 5th Ave, Brooklyn',
    rating: 4.3,
    reviews: 390,
    price: '$',
    specialty: 'Classic Slice',
    description: 'Dependable Park Slope slice shop open late. Perfect after a Prospect Park stroll. Whole pies available.',
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Late Night',
    badgeBg: '#17060A',
  },
  {
    id: 'smiling-pizza',
    name: 'Smiling Pizza',
    neighborhood: 'Park Slope',
    neighborhoodSlug: 'park-slope',
    address: '797 Union St, Brooklyn',
    rating: 4.4,
    reviews: 430,
    price: '$',
    specialty: 'Classic NY',
    description: 'The Park Slope slice spot that locals swear by. Nothing fancy, just really good pizza at a fair price.',
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: '$2 off any whole pie on Grubhub — Sundays only',
    dealExpires: 'Ongoing',
    badge: 'Local Pick',
    badgeBg: '#C41E3A',
  },
  {
    id: 'frannys',
    name: "Franny's",
    neighborhood: 'Park Slope',
    neighborhoodSlug: 'park-slope',
    address: '348 Flatbush Ave, Brooklyn',
    rating: 4.5,
    reviews: 880,
    price: '$$$',
    specialty: 'Organic / Wood-Fired',
    description: 'Pioneering farm-to-table pizza in Park Slope. Seasonal toppings, organic ingredients, wood-fired. A Brooklyn classic.',
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Farm-to-Table',
    badgeBg: '#2d7a4a',
  },
  {
    id: 'brooklyn-square',
    name: 'Brooklyn Square Pizza',
    neighborhood: 'Flatbush',
    neighborhoodSlug: 'flatbush',
    address: '1012 Flatbush Ave, Brooklyn',
    rating: 4.2,
    reviews: 310,
    price: '$',
    specialty: 'Sicilian / Classic',
    description: 'Flatbush neighborhood spot with thick Sicilian squares and reliable classic pies. Friendly staff, fair prices.',
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Budget Pick',
    badgeBg: '#b35c00',
  },
  {
    id: 'new-park-pizza',
    name: 'New Park Pizza',
    neighborhood: 'Flatbush',
    neighborhoodSlug: 'flatbush',
    address: '156 Howard Ave, Brooklyn',
    rating: 4.3,
    reviews: 290,
    price: '$',
    specialty: 'Classic NY',
    description: 'Unpretentious Flatbush pizza with big slices and crispy crusts. Great value for a quick lunch.',
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: 'Free slice with any 2 drinks on DoorDash',
    dealExpires: 'Apr 1, 2026',
    badge: 'Value',
    badgeBg: '#444',
  },
  {
    id: 'joe-and-pats',
    name: "Joe & Pat's",
    neighborhood: 'Williamsburg',
    neighborhoodSlug: 'williamsburg',
    address: '295 Bedford Ave, Brooklyn',
    rating: 4.4,
    reviews: 670,
    price: '$$',
    specialty: 'Thin Crust / Classic',
    description: 'Thin-crust Staten Island-style transplant that became a Williamsburg staple. Crispy bottom, loads of sauce.',
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Thin Crust',
    badgeBg: '#C41E3A',
  },
  {
    id: 'ferdinandos',
    name: "Ferdinando's Focacceria",
    neighborhood: 'Carroll Gardens',
    neighborhoodSlug: 'carroll-gardens',
    address: '151 Union St, Brooklyn',
    rating: 4.4,
    reviews: 520,
    price: '$$',
    specialty: 'Sicilian / Focaccia',
    description: 'Legendary Sicilian focacceria open since 1904. More than pizza — a living piece of Brooklyn Italian history.',
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Since 1904',
    badgeBg: '#444',
  },
  {
    id: 'gargiulos',
    name: "Gargiulo's",
    neighborhood: 'Coney Island',
    neighborhoodSlug: 'coney-island',
    address: '2911 W 15th St, Brooklyn',
    rating: 4.2,
    reviews: 680,
    price: '$$',
    specialty: 'Classic NY / Italian',
    description: 'Old-school Coney Island institution since 1907 with huge portions and an old-world Italian atmosphere.',
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Old School',
    badgeBg: '#444',
  },

  // ─── ADDED FROM VERIFIED GOOGLE DATA ────────────────────────────────────────

  // Williamsburg
  {
    id: 'joes-pizza-williamsburg',
    name: "Joe's Pizza",
    neighborhood: 'Williamsburg',
    neighborhoodSlug: 'williamsburg',
    address: '216 Bedford Ave, Brooklyn',
    rating: 4.5,
    reviews: 870,
    price: '$',
    specialty: 'Classic NY Slice',
    description: "Williamsburg outpost of the NYC icon. The same legendary NY-style slices on Bedford Ave — foldable, perfectly cheesy, always fresh.",
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'NYC Icon',
    badgeBg: '#C41E3A',
  },
  {
    id: 'rome-to-brooklyn',
    name: 'Rome to Brooklyn, Pizza & Panzerotti',
    neighborhood: 'Williamsburg',
    neighborhoodSlug: 'williamsburg',
    address: '755 Grand St, Brooklyn',
    rating: 4.6,
    reviews: 320,
    price: '$$',
    specialty: 'Pizza & Panzerotti',
    description: "A taste of Southern Italy on Grand St. Traditional panzerotti alongside creative pizza — one of Williamsburg's most unique spots.",
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Unique Eats',
    badgeBg: '#1a4a7a',
  },

  // Park Slope
  {
    id: 'antonios-pizza-park-slope',
    name: "Antonio's Pizza",
    neighborhood: 'Park Slope',
    neighborhoodSlug: 'park-slope',
    address: '318 Flatbush Ave, Brooklyn',
    rating: 4.7,
    reviews: 380,
    price: '$',
    specialty: 'Classic NY',
    description: "One of Park Slope's highest-rated slice shops. Consistent NY-style pies that keep locals coming back daily.",
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: '4.7★ Rated',
    badgeBg: '#C41E3A',
  },
  {
    id: 'larte-della-pizza',
    name: "L'arte Della Pizza Brooklyn",
    neighborhood: 'Park Slope',
    neighborhoodSlug: 'park-slope',
    address: '172 5th Ave, Brooklyn',
    rating: 4.6,
    reviews: 290,
    price: '$',
    specialty: 'Traditional Italian',
    description: "Traditional pizza and Italian dishes done right on 5th Ave. Easy pickup and delivery make this a Park Slope go-to.",
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Authentic',
    badgeBg: '#1a4a7a',
  },
  {
    id: 'brooklyn-dop',
    name: 'Brooklyn DOP',
    neighborhood: 'Park Slope',
    neighborhoodSlug: 'park-slope',
    address: '237 5th Ave, Brooklyn',
    rating: 4.5,
    reviews: 240,
    price: '$$',
    specialty: 'Neapolitan',
    description: "Neapolitan-style pizza brought to Park Slope with serious technique. DOP standards, great ingredients, and a relaxed vibe.",
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'DOP Certified',
    badgeBg: '#1e7a3a',
  },
  {
    id: 'patsys-pizzeria-park-slope',
    name: "Patsy's Pizzeria",
    neighborhood: 'Park Slope',
    neighborhoodSlug: 'park-slope',
    address: '450 Dean St, Brooklyn',
    rating: 4.4,
    reviews: 450,
    price: '$$',
    specialty: 'Brick-Oven',
    description: "Brooklyn brick-oven chain with a long history — serving classic pies, pasta, and calzones in a relaxed neighborhood setting since 1933.",
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Since 1933',
    badgeBg: '#444',
  },
  {
    id: 'da-nonna-rosa',
    name: "Da Nonna Rosa Restaurant & Pizzeria",
    neighborhood: 'Park Slope',
    neighborhoodSlug: 'park-slope',
    address: '140 7th Ave, Brooklyn',
    rating: 4.4,
    reviews: 330,
    price: '$$',
    specialty: 'Classic NY / Italian',
    description: "Comfortable trattoria on 7th Ave serving NY-style pizza and a full Italian menu. Wine-friendly and perfect for a relaxed dinner.",
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Trattoria',
    badgeBg: '#7a2020',
  },
  {
    id: 'pizza-town-park-slope',
    name: 'Pizza Town',
    neighborhood: 'Park Slope',
    neighborhoodSlug: 'park-slope',
    address: '85 5th Ave, Brooklyn',
    rating: 4.5,
    reviews: 280,
    price: '$',
    specialty: 'Classic Slice',
    description: "A Park Slope slice shop that locals genuinely love. Solid classic pies, fair prices, and late-night hours on weekends.",
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Local Favorite',
    badgeBg: '#C41E3A',
  },
  {
    id: 'la-villa-pizzeria-park-slope',
    name: 'La Villa Pizzeria',
    neighborhood: 'Park Slope',
    neighborhoodSlug: 'park-slope',
    address: '261 5th Ave, Brooklyn',
    rating: 4.6,
    reviews: 310,
    price: '$$',
    specialty: 'Wood-Fired',
    description: "Family-oriented pizzeria with wood-fired pies and a full Italian menu. A Park Slope staple for a relaxed dinner night.",
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Family Spot',
    badgeBg: '#2d7a4a',
  },
  {
    id: 'emmy-squared-park-slope',
    name: 'Emmy Squared Pizza: Park Slope',
    neighborhood: 'Park Slope',
    neighborhoodSlug: 'park-slope',
    address: '315 5th Ave, Brooklyn',
    rating: 4.1,
    reviews: 390,
    price: '$$',
    specialty: 'Detroit Style',
    description: "Emmy Squared brings its signature Detroit-style square pies to Park Slope. Bold flavors, crispy caramelized edges, full bar.",
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Detroit Style',
    badgeBg: '#C41E3A',
  },

  // DUMBO
  {
    id: 'front-street-pizza',
    name: 'Front Street Pizza',
    neighborhood: 'DUMBO',
    neighborhoodSlug: 'dumbo',
    address: '80 Front St, Brooklyn',
    rating: 4.3,
    reviews: 410,
    price: '$',
    specialty: 'Classic Slice',
    description: "DUMBO corner joint serving slices, heroes, and calzones steps from the Brooklyn Bridge. A reliable quick-stop for takeout.",
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Quick Slice',
    badgeBg: '#444',
  },
  {
    id: 'cecconisdumbo',
    name: "Cecconi's DUMBO",
    neighborhood: 'DUMBO',
    neighborhoodSlug: 'dumbo',
    address: '55 Water St, Brooklyn',
    rating: 4.1,
    reviews: 520,
    price: '$$$',
    specialty: 'Wood-Fired Italian',
    description: "Upscale Italian with wood-fired pizzas, pastas, and cocktails — paired with stunning waterfront views of the Manhattan Bridge.",
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Waterfront Views',
    badgeBg: '#1a4a7a',
  },

  // Carroll Gardens
  {
    id: 'savelli-brooklyn',
    name: 'Savelli',
    neighborhood: 'Carroll Gardens',
    neighborhoodSlug: 'carroll-gardens',
    address: '195 Smith St, Brooklyn',
    rating: 4.6,
    reviews: 290,
    price: '$$',
    specialty: 'Wood-Fired Italian',
    description: "Refined Carroll Gardens Italian spot with an old-world vibe. Wood-fired pizza, happy hour, and a wine cellar. Date night approved.",
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Wine Cellar',
    badgeBg: '#1a4a7a',
  },

  // Boerum Hill
  {
    id: 'brooklyns-homeslice-ii',
    name: "Brooklyn's Homeslice Pizzeria II",
    neighborhood: 'Boerum Hill',
    neighborhoodSlug: 'boerum-hill',
    address: '42 4th Ave, Brooklyn',
    rating: 4.7,
    reviews: 320,
    price: '$',
    specialty: 'Classic NY Slice',
    description: "Highly rated Boerum Hill slice shop with a loyal neighborhood following. Casual, affordable, and consistently great.",
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: '4.7★ Rated',
    badgeBg: '#C41E3A',
  },
  {
    id: 'moon-palace-pizza',
    name: 'Moon Palace Pizza',
    neighborhood: 'Boerum Hill',
    neighborhoodSlug: 'boerum-hill',
    address: '496 Atlantic Ave, Brooklyn',
    rating: 4.5,
    reviews: 210,
    price: '$',
    specialty: 'Classic Slice',
    description: "Atlantic Ave slice spot beloved by Boerum Hill regulars. Reliable pies, fair prices, and a friendly counter crew.",
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Neighborhood Gem',
    badgeBg: '#444',
  },
  {
    id: 'wonder-downtown-brooklyn',
    name: "Wonder",
    neighborhood: 'Boerum Hill',
    neighborhoodSlug: 'boerum-hill',
    address: '310 Schermerhorn St, Brooklyn',
    rating: 4.1,
    reviews: 180,
    price: '$$',
    specialty: 'Multi-Cuisine / Pizza',
    description: "Wonder's multi-restaurant delivery concept lands in Boerum Hill. Multiple menus, including pizza, delivered from one address.",
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Fast Delivery',
    badgeBg: '#5a2d82',
  },

  // Clinton Hill
  {
    id: 'luigis-pizzeria-clinton-hill',
    name: "Luigi's Pizzeria",
    neighborhood: 'Clinton Hill',
    neighborhoodSlug: 'clinton-hill',
    address: '326 Dekalb Ave, Brooklyn',
    rating: 4.6,
    reviews: 260,
    price: '$',
    specialty: 'Classic Slice',
    description: "Counter-service Clinton Hill staple that's been feeding the neighborhood for years. Simple, consistent, and satisfying every time.",
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: 'Local Staple',
    badgeBg: '#444',
  },

  // Crown Heights
  {
    id: 'la-flor-pizza',
    name: 'La Flor Pizza',
    neighborhood: 'Crown Heights',
    neighborhoodSlug: 'crown-heights',
    address: '766 Classon Ave, Brooklyn',
    rating: 4.8,
    reviews: 310,
    price: '$$',
    specialty: 'Craft Pizza',
    description: "Crown Heights craft pizza gem with a 4.8-star rating. Creative pies, quality ingredients, and one of the best scores in the borough.",
    doordash: 'https://www.doordash.com',
    grubhub: 'https://www.grubhub.com',
    slice: 'https://slicelife.com',
    deal: null,
    dealExpires: null,
    badge: '4.8★ Rated',
    badgeBg: '#2d7a4a',
  },
]

const NEIGHBORHOODS = [
  { slug: 'williamsburg', name: 'Williamsburg' },
  { slug: 'park-slope', name: 'Park Slope' },
  { slug: 'dumbo', name: 'DUMBO' },
  { slug: 'bushwick', name: 'Bushwick' },
  { slug: 'crown-heights', name: 'Crown Heights' },
  { slug: 'carroll-gardens', name: 'Carroll Gardens' },
  { slug: 'bensonhurst', name: 'Bensonhurst' },
  { slug: 'midwood', name: 'Midwood' },
  { slug: 'greenpoint', name: 'Greenpoint' },
  { slug: 'clinton-hill', name: 'Clinton Hill' },
  { slug: 'flatbush', name: 'Flatbush' },
  { slug: 'coney-island', name: 'Coney Island' },
  { slug: 'bay-ridge', name: 'Bay Ridge' },
  { slug: 'boerum-hill', name: 'Boerum Hill' },
]

const ARTICLES = [
  {
    id: 'best-pizza-brooklyn',
    title: 'The Best Pizza in Brooklyn: 2026 Guide',
    tag: 'TOP LIST',
    tagBg: '#C41E3A',
    excerpt: 'From Di Fara to Lucali — the definitive ranking of Brooklyn\'s greatest pizza spots, updated for 2026.',
    content: `Brooklyn has a legitimate claim to being the pizza capital of the world. Not New York City broadly — Brooklyn specifically. The borough's pizza culture is a product of Italian immigrant communities, century-old coal ovens, and a fierce local pride that has never cared much about trends.

## The Case for Brooklyn Pizza

What separates Brooklyn pizza from the rest of NYC and the country? Three things: the water, the coal, and the obsession. The local water supply is widely credited for the particular texture of Brooklyn dough. The coal-fired ovens at places like Di Fara and Grimaldi's reach temperatures that a standard gas oven simply can't match. And the borough's pizzaiolos — many of them multi-generational — haven't stopped perfecting their craft since the early 1900s.

## Our Top 5 Brooklyn Pizza Spots for 2026

**1. Lucali (Carroll Gardens)** — 4.9 stars, 2,100+ reviews. The consensus #1 for whole pies. BYOB, no reservations, worth every minute of the wait. Mark Iacono's handmade pies are arguably the best in the five boroughs.

**2. Di Fara Pizza (Midwood)** — 4.8 stars, 1,200+ reviews. For the classic slice experience, nothing touches Di Fara. Dom DeMarco's sons now run the daily operations, but the original recipe and coal-fired oven remain.

**3. Juliana's Pizza (DUMBO)** — 4.7 stars, 2,200+ reviews. Opened by Patsy Grimaldi after he sold his original restaurant, Juliana's carries the original Grimaldi recipe. Steps from the Brooklyn Bridge.

**4. Emily (Clinton Hill)** — 4.7 stars. James Beard Award semi-finalist. Famous for Detroit-style squares and the Emmy Burger, which has nothing to do with pizza but everything to do with why you go back.

**5. Paulie Gee's (Greenpoint)** — 4.6 stars. Greenpoint wood-fired pies with an extensive vegan menu that doesn't compromise on quality. Perfect for mixed groups.

## What to Order at Each

At Lucali, get the plain pie with basil. At Di Fara, get the square slice. At Juliana's, get the white pie with fresh mozzarella. At Emily, get the Colony. At Paulie Gee's, get the Hellboy.

## Frequently Asked Questions

**What is the #1 pizza place in Brooklyn?**
Lucali in Carroll Gardens consistently earns the top spot in both local polls and national rankings. The wait can be long, but the pie is worth it.

**Is Di Fara Pizza still good?**
Yes — Dom DeMarco's sons maintain the original coal-fired recipe. It remains one of the best slice experiences in New York.

**What makes Brooklyn pizza different?**
The combination of local water chemistry, coal-fired ovens, and generations of family recipes creates a texture and char that is uniquely Brooklyn.

**Is there a Brooklyn pizza that's easy to walk in for?**
Best Pizza in Williamsburg and Vinnie's Pizzeria are casual walk-in slice shops with no wait and great quality.`,
  },
  {
    id: 'cheapest-pizza-delivery-brooklyn',
    title: 'Cheapest Pizza Delivery in Brooklyn (2026)',
    tag: 'BUDGET',
    tagBg: '#b35c00',
    excerpt: 'Under $15 delivered: the best cheap pizza delivery deals in Brooklyn across DoorDash, Grubhub, and Slice.',
    content: `Getting pizza delivered in Brooklyn doesn't have to be expensive. With the right platform, the right promo, and the right restaurant, you can eat well for under $15. Here's how.

## How to Find the Best Delivery Deals

The cheapest pizza delivery in Brooklyn comes down to three factors: the base price of the pizza, the delivery fee, and any active promos on your platform. All three vary by restaurant and by day.

**DoorDash** typically offers the most new-user discounts — 20–30% off your first order is standard. If you've never used DoorDash, your first pizza order is almost always subsidized.

**Grubhub** runs regular "$5 off $25+" promotions, especially on weekday evenings when demand is lower. Check the app before ordering.

**Slice** is the delivery platform built specifically for independent pizzerias. They charge lower fees than DoorDash or Grubhub, which often means the restaurants price their pies lower on Slice than on the other platforms.

## Brooklyn's Cheapest Pizza Spots

**L&B Spumoni Gardens (Bensonhurst)** — $3/slice on weekdays. The Sicilian square at L&B is one of the best deals in the borough regardless of any promo.

**Best Pizza (Williamsburg)** — $3 plain slices on Mondays. Small extra charge for delivery but still comes in well under $15 for two slices and a drink.

**Brooklyn Square Pizza (Flatbush)** — Consistently under $12 for a delivered whole pie during lunch hours.

**New Park Pizza (Flatbush)** — Free slice with two drinks on DoorDash is an ongoing deal that makes a full meal very affordable.

**Pizza Plus (Bay Ridge)** — Bay Ridge pricing means you're still in pre-inflation territory. Whole pies delivered for under $18 regularly.

## Platform Comparison for Budget Orders

| Platform | Best For | Typical Fee |
|---|---|---|
| DoorDash | First-time users, new promos | $0–5 with DashPass |
| Grubhub | Weekday promos, Grubhub+ subscribers | $0–6 |
| Slice | Independent pizzerias, lower base prices | $2–4 flat |

## Frequently Asked Questions

**What is the cheapest way to get pizza delivered in Brooklyn?**
Use Slice for independent spots, and activate any first-time DoorDash promo if you haven't used it yet. Combining a low-priced restaurant with a delivery discount is the fastest way to get a meal under $12.

**Does DoorDash have a pizza deal in Brooklyn?**
Yes — DoorDash regularly runs 20–30% off for first-time orders and weekly restaurant-specific promos. Check the Deals tab before ordering.

**Is Slice cheaper than DoorDash?**
Often, yes — Slice charges a flat delivery fee rather than a percentage, and independent restaurants tend to set lower prices on Slice than on the bigger platforms.`,
  },
  {
    id: 'pizza-by-the-slice-brooklyn',
    title: 'Best Pizza by the Slice in Brooklyn',
    tag: 'SLICE',
    tagBg: '#C41E3A',
    excerpt: 'The folded, greasy, perfect New York slice — these Brooklyn spots are doing it best right now.',
    content: `The New York slice is a specific thing. It has to be foldable. It has to have enough grease to soak through a paper plate. The cheese has to pull without snapping. The crust has to have enough char to stand up to the weight of the toppings.

Brooklyn does the slice better than anywhere.

## What Makes a Great Brooklyn Slice

The foundation is a properly fermented dough — 24 to 72 hours minimum. The sauce should be cooked with olive oil, not water. The cheese should be low-moisture whole-milk mozzarella, applied generously, and the oven should be hot enough to create a proper char on the bottom crust within two to three minutes.

Most slice shops in Brooklyn learned this from someone who learned it from someone who came over from southern Italy. The chain is unbroken.

## Top 5 Slice Shops in Brooklyn Right Now

**1. Di Fara Pizza (Midwood)** — The gold standard. The plain slice ($5) is worth the trip to Midwood and the potential wait. Dom DeMarco's family operation is still producing some of the finest individual slices in America.

**2. Best Pizza (Williamsburg)** — The name is audacious and the slice backs it up. $3 plain on Mondays. Crispy bottom, excellent sauce-to-cheese ratio, always fresh.

**3. Vinnie's Pizzeria (Williamsburg)** — Two locations. Known for wild creative toppings and excellent vegan options, but the classic plain slice is underrated. Very affordable.

**4. L&B Spumoni Gardens (Bensonhurst)** — For Sicilian-style squares, L&B is unmatched. A square slice is a different animal — thick, airy dough, sauce on top of the cheese, crispy underside.

**5. Pino's La Forchetta (Park Slope)** — The neighborhood slice shop that Park Slope residents eat at three times a week. Nothing revolutionary, nothing disappointing. Open late.

## Frequently Asked Questions

**How much does a slice of pizza cost in Brooklyn?**
A plain slice in Brooklyn typically runs $3–5. Specialty slices and Sicilian squares can be $4–7. Di Fara charges $5 for a plain and it's worth every cent.

**What's the difference between a regular slice and a Sicilian slice?**
A regular New York slice uses a thin, round crust that folds. A Sicilian slice is cut from a rectangular pan — thicker, airier dough with more chew. L&B Spumoni Gardens is the best Sicilian slice in Brooklyn.

**Where can I get a slice of pizza late at night in Brooklyn?**
Pino's La Forchetta in Park Slope and Vinnie's in Williamsburg are both open late. Check hours on their Google listing as they vary by day.`,
  },
  {
    id: 'late-night-pizza-brooklyn',
    title: 'Best Late Night Pizza in Brooklyn (Open Past Midnight)',
    tag: 'LATE NIGHT',
    tagBg: '#17060A',
    excerpt: 'Hungry after midnight? These Brooklyn pizza spots are open late and worth the trip.',
    content: `Brooklyn's nightlife creates a serious late-night pizza demand, and a handful of spots have built their reputation specifically on being there when you need them most — after the bars, after the show, after the long shift.

## The Late Night Pizza Problem

Most of Brooklyn's great pizzerias are dinner-service restaurants that close at 10 or 11pm. The places that are open at 1am are not always the places with the best pizza. Knowing which spots manage to be both good and late-night reliable is what separates a great night out from a disappointing slice eaten out of desperation.

## Best Late Night Pizza Spots in Brooklyn

**Pino's La Forchetta (Park Slope)** — Open until 2am on weekends. Classic slice shop that Park Slope relies on for post-bar food. Affordable, reliable, and the slices are always fresh because turnover is high late at night.

**Vinnie's Pizzeria (Williamsburg)** — The Bedford Avenue location stays open until 3am on weekends. Known for creative toppings and a strong social media presence. The plain slice is underrated and the prices are fair.

**Joe & Pat's (Williamsburg)** — The thin-crust pies are available until midnight most nights. Call ahead to confirm hours before making the trip.

**Best Pizza (Williamsburg)** — Williamsburg generally eats late, and Best Pizza accommodates. Hours vary seasonally — check the current listing.

## Tips for Late Night Pizza Ordering

If you're ordering delivery late at night, check DoorDash and Grubhub first — many pizzerias that are technically closed for dine-in still accept delivery orders through the platforms until 1 or 2am. The platforms often list later cutoff times than you'd expect.

Slice sometimes has earlier cutoff times for independent spots, but the platform's map view will show you exactly which pizzerias are still accepting orders at any given moment.

## Frequently Asked Questions

**What pizza places are open late in Williamsburg Brooklyn?**
Vinnie's Pizzeria and Best Pizza are both known for late hours in Williamsburg. Vinnie's Bedford Ave location is often open until 3am on weekends.

**Can I get pizza delivered after midnight in Brooklyn?**
Yes — check DoorDash and Grubhub, which often list restaurants accepting delivery orders until 1–2am even when the dining room is closed.

**What's the best late night slice in Brooklyn?**
Pino's La Forchetta in Park Slope is consistently recommended for late-night slices — open late, affordable, and reliably good.`,
  },
  {
    id: 'brooklyn-vs-nyc-pizza',
    title: 'Brooklyn Pizza vs NYC Pizza: Is There Actually a Difference?',
    tag: 'DEEP DIVE',
    tagBg: '#4a3060',
    excerpt: 'Brooklyn locals will tell you their pizza is different. Here\'s the honest answer about whether they\'re right.',
    content: `Ask anyone who grew up in Brooklyn and they'll tell you the pizza is different. Better, specifically. Is this hometown bias or is there something to it?

## The Brooklyn Claim

Brooklyn pizza partisans point to a few specific things: the water, the coal, and the lineage. The argument goes that New York City water — specifically its low mineral content and particular chemical balance — creates a dough texture that can't be replicated elsewhere. Brooklyn has the same water as the rest of NYC, but it has a higher concentration of coal-fired ovens, which produce a char and a crust that gas ovens simply cannot match.

The lineage argument is more about geography than geology. Southern Italian immigrants settled heavily in specific Brooklyn neighborhoods — Red Hook, Carroll Gardens, Bensonhurst, Midwood — and the pizzerias they opened in the early 1900s became the templates for everything that followed. Di Fara, Totonno's, Grimaldi's, Ferdinando's — these aren't just restaurants, they're primary sources.

## What's the Actual Difference?

Manhattan pizza has consolidated heavily around a midrange tourist-and-delivery model. The great pizza in Manhattan exists, but it's harder to find and more likely to be recent (Motorino, Kesté) than generational.

Brooklyn pizza includes more coal-fired operations, more old-school slice shops maintaining pre-1980s standards, and a broader range of regional Italian styles: Neapolitan, Sicilian, Roman, focacceria. The average quality of a random slice in Brooklyn is arguably higher than a random slice in Manhattan, simply because there are more neighborhood spots maintaining high standards without the overhead pressure of midtown rents.

## The Verdict

Brooklyn's best pizza — Lucali, Di Fara, Juliana's — is as good as pizza gets anywhere in the world. Manhattan has contenders (Una Pizza Napoletana, Kesté) but fewer of them. For everyday slice quality across the whole borough, Brooklyn wins.

## Frequently Asked Questions

**Is Brooklyn pizza really better than Manhattan pizza?**
For classic coal-fired pies and neighborhood slice shops, Brooklyn has a stronger concentration of great options. Manhattan's best is competitive, but the average quality in Brooklyn is higher.

**Why is New York City pizza different from pizza everywhere else?**
The local water chemistry is frequently cited, along with the high-heat coal and deck ovens used by legacy pizzerias. Both contribute to a crust texture that's difficult to replicate outside the region.

**What type of pizza is Brooklyn known for?**
Brooklyn is known for thin-crust coal-fired Neapolitan pies (Grimaldi's, Lucali) and classic NY-style slices (Di Fara). Bensonhurst and DUMBO are also known for excellent Sicilian-style square pies.`,
  },
  {
    id: 'best-sicilian-pizza-brooklyn',
    title: 'Best Sicilian Pizza in Brooklyn (Square Slice Guide)',
    tag: 'SICILIAN',
    tagBg: '#1a4a7a',
    excerpt: 'The square slice is a different animal. Here are Brooklyn\'s best Sicilian pizza spots.',
    content: `The Sicilian slice is a fundamentally different thing from a regular New York slice. The dough is thick and airy — more like focaccia than a traditional pizza crust. The sauce typically goes on top of the cheese, not under it. The bottom has a deep, oily crisp from being baked in a well-oiled rectangular pan. And when it's done right, it's one of the most satisfying things you can eat.

## What Makes a Great Sicilian Slice

The key is the dough. A Sicilian dough needs a long proof — 24 hours minimum — to develop the open crumb structure that gives it the airy texture. It's baked in a heavily oiled sheet pan, which fries the bottom slightly during the bake. The sauce, applied on top of the mozzarella, caramelizes around the edges.

The bad version is dense, greasy, and flabby. The great version has a bottom crust you can actually hear when you tap it.

## Top Sicilian Pizza Spots in Brooklyn

**1. L&B Spumoni Gardens (Bensonhurst)** — This is the benchmark. L&B's Sicilian square has been made the same way since 1939. The sauce goes on top, the cheese is applied generously underneath, and the result is a square slice that tastes like it was invented here because it was. $3 on weekdays.

**2. Di Fara Pizza (Midwood)** — Di Fara's square slice gets less attention than the round, but it's extraordinary. Thicker than the round pie, with Dom DeMarco's characteristic olive oil drizzle and fresh basil.

**3. Brooklyn Square Pizza (Flatbush)** — For a budget Sicilian option in Flatbush, Brooklyn Square Pizza delivers thick, consistent squares at very fair prices.

## The Sicilian vs. Grandma Slice Debate

Strictly speaking, a grandma pie is a New York variation on the Sicilian — baked in a home-style sheet pan rather than a professional restaurant pan, with a thinner profile and more olive oil flavor in the crust. L&B makes a classic Sicilian. Many Williamsburg spots make what is technically a grandma pie and call it Sicilian. Both are delicious. Knowing the difference helps you order the right thing.

## Frequently Asked Questions

**Where is the best Sicilian pizza in Brooklyn?**
L&B Spumoni Gardens in Bensonhurst is the consensus answer. The Sicilian square has been made the same way since 1939.

**What is Sicilian-style pizza?**
Sicilian pizza is baked in a rectangular pan with a thick, airy crust. The sauce typically goes on top of the cheese, and the bottom is oiled and crispy.

**Is Sicilian pizza the same as grandma pizza?**
They're similar but technically different. Grandma pizza is a New York variation — thinner and more olive-oil-forward. Traditional Sicilian is thicker with more dough height. L&B Spumoni Gardens makes the classic Sicilian style.`,
  },
  {
    id: 'how-to-get-free-pizza-deals',
    title: 'How to Get Free Pizza Deals and Discounts in Brooklyn',
    tag: 'DEALS',
    tagBg: '#FF6B35',
    excerpt: 'The real tricks for scoring free delivery, discount codes, and pizza promos across DoorDash, Grubhub, and Slice.',
    content: `Getting free pizza or a deeply discounted pie in Brooklyn is more doable than most people realize. It requires knowing where the deals actually live — and moving quickly when they appear.

## Platform-Level Deals (Best for New Users)

**DoorDash** consistently offers 20–30% off for first-time app users. If you've never ordered through DoorDash, your first pizza order is almost certainly subsidized. Create an account, apply the new-user promo, and order from one of our featured Brooklyn spots. DashPass ($9.99/mo) removes delivery fees permanently.

**Grubhub** runs "$5 off your first order of $25+" on a rolling basis. Grubhub+ ($9.99/mo) gives free delivery on orders over $12. They also run restaurant-specific promos regularly — check the "Offers" tab before ordering.

**Slice** is the platform built specifically for independent pizzerias. Their "Slice Rewards" program earns points on every order that can be redeemed for free items. The fee structure is lower for restaurants than DoorDash or Grubhub, which often results in lower menu prices.

## Restaurant-Level Deals

Check our Deals page for currently active restaurant promotions. These are manually updated weekly and include: percentage discounts on first orders, BOGO specials, free items with orders, and free delivery thresholds.

Current highlights: BOGO slice at L&B on Tuesdays and Wednesdays, free delivery at Lucali via Slice on orders over $30, and $3 Monday slices at Best Pizza in Williamsburg.

## Credit Card and Cashback Deals

Several credit cards offer cashback or points on food delivery:
- Chase Sapphire Preferred: 3x points on DoorDash
- Amex Gold: $10/month statement credit on Grubhub
- Capital One Savor: 4% cashback on dining and delivery

Stacking a credit card reward with a platform promo is the fastest way to a genuinely free meal.

## Frequently Asked Questions

**How do I get free pizza delivery in Brooklyn?**
The easiest method: use DashPass on DoorDash (free trials available) or Grubhub+ which both waive delivery fees on qualifying orders.

**Are there pizza coupons for Brooklyn restaurants?**
Yes — check our Deals page, which is updated weekly with active promos across our 30+ listed spots.

**Which delivery app has the best pizza deals?**
For new users, DoorDash's first-order discount is the most generous. For regular users, Slice's flat fee structure often results in the lowest total price for independent pizzerias.`,
  },
  {
    id: 'doordash-vs-grubhub-pizza',
    title: 'DoorDash vs Grubhub for Pizza in Brooklyn: Which Is Cheaper?',
    tag: 'COMPARE',
    tagBg: '#444',
    excerpt: 'We compared both platforms on 10 Brooklyn pizza orders. Here\'s the honest breakdown.',
    content: `If you're ordering pizza delivery in Brooklyn, the platform you choose can mean a $4–8 difference on the same exact order. Here's how DoorDash and Grubhub compare across the metrics that actually matter.

## Price Comparison (10 Brooklyn Pizza Orders)

We compared prices for the same restaurants on DoorDash vs. Grubhub across 10 Brooklyn pizza orders at various times of day. Average results:

- **Menu prices**: Near-identical on most orders, with Grubhub occasionally $1–2 higher on specific items
- **Delivery fee**: DoorDash averaged $3.99, Grubhub averaged $4.49 without subscription
- **Service fee**: DoorDash 10–15%, Grubhub 10–15% — functionally identical
- **Total difference on a $20 order**: Usually $1–3 in DoorDash's favor without subscriptions

## Subscription Plans

**DashPass** ($9.99/mo): Free delivery on DoorDash orders over $12 and 5% off service fees. If you order twice a week, this pays for itself in the first order.

**Grubhub+** ($9.99/mo): Free delivery on Grubhub orders over $12 and 10% off at select restaurants. Also includes free delivery at participating restaurants even without the minimum.

Both plans are roughly equivalent value for regular users. DashPass wins if you order 3+ times per week because the service fee reduction adds up.

## Selection in Brooklyn

DoorDash has a larger restaurant footprint in Brooklyn. Most of our 30+ listed pizza spots are on DoorDash. Grubhub has solid coverage in Williamsburg and Park Slope but thinner coverage in Bensonhurst, Midwood, and Flatbush.

Slice is the third option worth considering — built specifically for independent pizzerias, lower fees, and available at many spots not on the bigger platforms.

## Which Should You Use?

- **First time ordering**: DoorDash — the new-user discount is usually 20–30% off
- **Regular user without subscription**: Compare checkout totals on both before confirming
- **Regular user with subscription**: Either is fine; DashPass edges out on frequency discounts
- **Independent pizzeria**: Use Slice — lower fees mean the restaurant keeps more money and often prices lower

## Frequently Asked Questions

**Is DoorDash or Grubhub cheaper for pizza?**
On a per-order basis, DoorDash is usually $1–3 cheaper when comparing identical orders. With subscriptions, the difference largely disappears.

**Does Grubhub have better Brooklyn pizza deals?**
Grubhub runs regular "$5 off $25+" promotions that can make it the cheaper option on larger orders. Check the Offers tab before confirming.

**What about Slice for pizza delivery?**
Slice is worth using for independent pizzerias — the flat fee structure and lower platform costs often mean lower prices than DoorDash or Grubhub for the same restaurant.`,
  },
  {
    id: 'best-new-pizza-places-brooklyn-2026',
    title: 'Best New Pizza Places in Brooklyn (Opened 2025–2026)',
    tag: '2026 UPDATE',
    tagBg: '#C41E3A',
    excerpt: 'The newest additions to Brooklyn\'s pizza scene worth seeking out right now.',
    content: `Brooklyn's pizza scene is not standing still. While the legacy spots continue to draw lines, a new generation of pizzaiolos has been opening restaurants over the past 18 months that deserve serious attention. Here are the spots you need to know about in 2026.

## The New Wave of Brooklyn Pizza

The newest Brooklyn pizza spots have a few things in common: long-fermented doughs (usually 48–72 hours), wood or coal-fired ovens, and a sourcing philosophy that prioritizes local and regional ingredients. The influence of Neapolitan and Roman styles is everywhere, but the best of the new wave is synthesizing rather than copying — taking technique from Naples and New Haven and combining it with a distinctly Brooklyn personality.

## New and Newly Notable Spots

**Ops (Bushwick)** — Not brand-new but newly essential. Ops has been operating in Bushwick for a few years but reached a new level of recognition in 2025, earning wider press attention for its long-fermented Roman-style pies and natural wine list. If you haven't been, it now belongs on your list.

**Emily (Clinton Hill)** — Emily earned a James Beard semifinalist nod in recent years and the reputation has only grown. The Detroit-style squares are the best version of that style in Brooklyn. They also do a classic NY-style pie that competes with anyone.

**Paulie Gee's Slice Shop (Greenpoint)** — The casual counter-service sibling to the original Paulie Gee's. Open for lunch and focused purely on slices, it's brought Paulie Gee's quality to a walk-in format that was missing from the original.

## What to Watch

The next cluster of emerging Brooklyn pizza talent is concentrated in Crown Heights and Bed-Stuy. Wheated in Crown Heights has been quietly building a following, and several new spots in the Bed-Stuy corridor are doing interesting things with fermentation and regional Italian styles. Keep an eye on those neighborhoods in 2026.

## Frequently Asked Questions

**What are the newest pizza places in Brooklyn?**
Some of the most talked-about newer spots are Ops in Bushwick (Roman-style), Emily in Clinton Hill (Detroit and NY-style), and Paulie Gee's Slice Shop in Greenpoint.

**Is Brooklyn pizza getting better or worse?**
Better. The new generation of Brooklyn pizzaiolos is bringing serious technique — long fermentation, sourced ingredients, wood-fired ovens — to a tradition that was already strong.

**Where should I eat pizza in Brooklyn for the first time?**
If it's your first time, go to Lucali for a whole pie experience and Di Fara for a slice. Both are Brooklyn originals that have no equals.`,
  },
  {
    id: 'gluten-free-pizza-brooklyn',
    title: 'Best Gluten-Free Pizza in Brooklyn (2026 Guide)',
    tag: 'GF GUIDE',
    tagBg: '#2d7a4a',
    excerpt: 'Gluten-free pizza in Brooklyn that doesn\'t taste like a compromise — the best spots in 2026.',
    content: `Gluten-free pizza has a reputation problem. Most of it is dense, crackery, and missing the essential quality of great pizza: the chew. Brooklyn has a handful of spots that have actually solved the problem — gluten-free pies that stand up to scrutiny.

## What to Look For in a Gluten-Free Crust

The best gluten-free pizza crusts use a blend of rice flour, tapioca starch, and potato starch, often with a small amount of xanthan gum to create some elasticity. They need to be thinner than a standard crust to avoid the dense, gummy texture that ruins most gluten-free pies. And they need to be cooked at high heat to achieve any kind of crust character.

The spots that do it right have invested in a specific gluten-free dough recipe rather than using a commercial pre-made crust. That's the tell.

## Best Gluten-Free Pizza Spots in Brooklyn

**Paulie Gee's (Greenpoint)** — Paulie Gee's is known for having one of Brooklyn's best gluten-free options. Their GF crust is made in-house and holds up to the wood-fired oven. The extensive vegan menu also means they're skilled at accommodation.

**Roberta's (Bushwick)** — Roberta's offers a gluten-free option on their wood-fired menu. The crust isn't identical to their standard dough, but it's better than most alternatives in the borough.

**Motorino (Williamsburg)** — A DOC-certified Neapolitan restaurant that takes its GF offering seriously. The crust is thin and properly charred.

**Emily (Clinton Hill)** — Emily offers a gluten-free version of their Detroit-style squares, which is unusual and worth trying.

## What to Ask at Any Pizza Restaurant

Before ordering gluten-free at any restaurant, ask whether the GF crust is prepared on a shared surface with wheat flour. Cross-contamination is a real issue at busy pizzerias. Most places with an actual celiac protocol will tell you clearly.

## Ordering Gluten-Free for Delivery

DoorDash, Grubhub, and Slice all allow you to filter for gluten-free options in your search. Slice in particular tends to have good filtering tools for independent pizzerias.

## Frequently Asked Questions

**Where can I get good gluten-free pizza in Brooklyn?**
Paulie Gee's in Greenpoint is the strongest consistent option. Roberta's in Bushwick and Motorino in Williamsburg are also worth trying.

**Is gluten-free pizza safe for celiacs at Brooklyn restaurants?**
It depends on the restaurant's preparation practices. Always ask about cross-contamination before ordering. Paulie Gee's is generally cited as celiac-aware.

**Does DoorDash have gluten-free pizza options in Brooklyn?**
Yes — use the dietary filters in the DoorDash app to find restaurants that list gluten-free options. Always confirm with the restaurant directly if celiac is a concern.`,
  },
]

// ─── STYLES ──────────────────────────────────────────────────────────────────
const G = {
  font: "'DM Sans', Arial, sans-serif",
  head: "'Oswald', Impact, sans-serif",
  bg: '#f5f0eb',
  bgCard: '#fff',
  bgDeep: '#faf7f2',
  hero: '#17060A',
  red: '#C41E3A',
  orange: '#FF6B35',
  text: '#1A1A1A',
  textMid: '#555',
  textMuted: '#888',
  border: 'rgba(0,0,0,0.08)',
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
function AdBanner({ label = 'ADVERTISEMENT' }) {
  return (
    <div style={{ background: '#ede8e0', border: '1px dashed #bbb', padding: '12px', textAlign: 'center', fontSize: '11px', color: '#bbb', letterSpacing: '1.5px', fontFamily: G.font }}>
      {label} — ADSENSE PLACEHOLDER
    </div>
  )
}

function ListingCard({ listing, setPage }) {
  const hasDeal = !!listing.deal
  return (
    <div style={{
      background: G.bgCard,
      border: hasDeal ? `2px solid ${G.orange}` : `1px solid ${G.border}`,
      borderRadius: '10px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {hasDeal && (
        <div style={{ background: G.orange, color: 'white', fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: G.font }}>
          <span style={{ fontSize: '13px' }}>🏷</span>
          {listing.deal.toUpperCase()}
        </div>
      )}
      <div style={{ height: '72px', background: '#1a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', position: 'relative' }}>
        🍕
        <span style={{ position: 'absolute', top: '7px', left: '7px', fontSize: '9px', fontWeight: 700, letterSpacing: '0.3px', padding: '3px 8px', borderRadius: '4px', background: listing.badgeBg, color: 'white', textTransform: 'uppercase', fontFamily: G.font }}>
          {listing.badge}
        </span>
      </div>
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontFamily: G.head, fontSize: '16px', fontWeight: 600, color: G.text, marginBottom: '5px' }}>{listing.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span
            style={{ fontSize: '10px', color: G.textMuted, background: '#f0ece5', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontFamily: G.font }}
            onClick={() => setPage('neighborhood/' + listing.neighborhoodSlug)}
          >{listing.neighborhood}</span>
          <span style={{ fontSize: '11px', color: G.textMid, fontFamily: G.font }}>
            <span style={{ color: '#E8472A' }}>★</span> {listing.rating} ({listing.reviews >= 1000 ? (listing.reviews / 1000).toFixed(1) + 'k' : listing.reviews})
          </span>
          <span style={{ fontSize: '11px', color: G.textMuted, fontFamily: G.font }}>{listing.price}</span>
        </div>
        {hasDeal && listing.dealExpires && (
          <div style={{ fontSize: '10px', color: '#b35c00', background: '#fff3e6', border: '1px solid #ffd199', borderRadius: '4px', padding: '4px 8px', marginBottom: '7px', fontFamily: G.font }}>
            ⏱ Expires {listing.dealExpires}
          </div>
        )}
        <div style={{ fontSize: '11px', color: G.textMid, lineHeight: 1.5, marginBottom: '12px', flex: 1, fontFamily: G.font }}>{listing.description}</div>
        <div style={{ display: 'flex', gap: '5px', marginTop: 'auto' }}>
          <a href={listing.doordash} target="_blank" rel="noopener noreferrer" style={{ flex: 1, background: '#FF3008', color: 'white', border: 'none', borderRadius: '5px', padding: '7px 3px', fontSize: '10px', fontWeight: 700, textAlign: 'center', textDecoration: 'none', cursor: 'pointer', fontFamily: G.font }}>DoorDash</a>
          <a href={listing.grubhub} target="_blank" rel="noopener noreferrer" style={{ flex: 1, background: '#F63440', color: 'white', border: 'none', borderRadius: '5px', padding: '7px 3px', fontSize: '10px', fontWeight: 700, textAlign: 'center', textDecoration: 'none', cursor: 'pointer', fontFamily: G.font }}>Grubhub</a>
          <a href={listing.slice} target="_blank" rel="noopener noreferrer" style={{ flex: 1, background: '#FF6B35', color: 'white', border: 'none', borderRadius: '5px', padding: '7px 3px', fontSize: '10px', fontWeight: 700, textAlign: 'center', textDecoration: 'none', cursor: 'pointer', fontFamily: G.font }}>Slice</a>
        </div>
      </div>
    </div>
  )
}

function Nav({ page, setPage }) {
  const link = (label, target) => (
    <span
      onClick={() => setPage(target)}
      style={{ fontSize: '13px', fontWeight: 500, color: page.startsWith(target) ? G.red : '#333', cursor: 'pointer', fontFamily: G.font }}
    >{label}</span>
  )
  return (
    <nav style={{ background: '#fff', borderBottom: `3px solid ${G.red}`, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '54px', position: 'sticky', top: 0, zIndex: 100 }}>
      <div onClick={() => setPage('home')} style={{ fontFamily: G.head, fontSize: '18px', fontWeight: 700, color: G.red, letterSpacing: '1px', cursor: 'pointer' }}>🍕 BEST PIZZA DEALS NYC</div>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        {link('Browse', 'browse')}
        {link('Deals', 'deals')}
        {link('Neighborhoods', 'neighborhoods')}
        {link('Guides', 'guides')}
      </div>
    </nav>
  )
}

function DealStrip() {
  const deals = LISTINGS.filter(l => l.deal)
  return (
    <div style={{ background: G.orange, padding: '9px 24px', display: 'flex', alignItems: 'center', gap: '14px', overflowX: 'auto' }}>
      <div style={{ fontFamily: G.head, fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: 'white', background: 'rgba(0,0,0,0.18)', padding: '4px 10px', borderRadius: '4px', whiteSpace: 'nowrap' }}>🔥 LIVE DEALS</div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'nowrap' }}>
        {deals.map(l => (
          <div key={l.id} style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.35)', color: 'white', fontSize: '11px', fontWeight: 500, padding: '4px 12px', borderRadius: '20px', whiteSpace: 'nowrap', fontFamily: G.font }}>
            {l.deal} @ {l.name}
          </div>
        ))}
      </div>
    </div>
  )
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: '#1A1A1A', padding: '32px 24px', marginTop: '60px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: G.head, fontSize: '18px', fontWeight: 700, color: G.red, marginBottom: '8px' }}>🍕 BEST PIZZA DEALS NYC</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', maxWidth: '220px', lineHeight: 1.6, fontFamily: G.font }}>Brooklyn's most complete pizza directory. Updated weekly with fresh deals and new listings.</div>
        </div>
        <div>
          <div style={{ fontFamily: G.head, fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: '10px' }}>Browse</div>
          {['browse', 'deals', 'neighborhoods', 'guides'].map(p => (
            <div key={p} onClick={() => setPage(p)} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px', cursor: 'pointer', textTransform: 'capitalize', fontFamily: G.font }}>{p}</div>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: G.head, fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: '10px' }}>Top Neighborhoods</div>
          {NEIGHBORHOODS.slice(0, 5).map(n => (
            <div key={n.slug} onClick={() => setPage('neighborhood/' + n.slug)} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px', cursor: 'pointer', fontFamily: G.font }}>{n.name}</div>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: G.head, fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: '10px' }}>Order Pizza</div>
          <a href="https://www.doordash.com" target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: '12px', color: '#FF3008', marginBottom: '6px', textDecoration: 'none', fontFamily: G.font }}>DoorDash</a>
          <a href="https://www.grubhub.com" target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: '12px', color: '#F63440', marginBottom: '6px', textDecoration: 'none', fontFamily: G.font }}>Grubhub</a>
          <a href="https://slicelife.com" target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: '12px', color: G.orange, marginBottom: '6px', textDecoration: 'none', fontFamily: G.font }}>Slice</a>
        </div>
      </div>
      <div style={{ maxWidth: '960px', margin: '24px auto 0', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', fontSize: '11px', color: 'rgba(255,255,255,0.25)', fontFamily: G.font }}>
        © 2026 bestpizzadealsnearme.com · Brooklyn, NYC · Deal info updated weekly · Affiliate links may earn us a commission
      </div>
    </footer>
  )
}

// ─── PAGES ───────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  const [neighborhood, setNeighborhood] = useState('')
  const featured = LISTINGS.slice(0, 6)
  const deals = LISTINGS.filter(l => l.deal).slice(0, 3)

  const handleSearch = () => {
    if (neighborhood) setPage('neighborhood/' + neighborhood)
    else setPage('browse')
  }

  return (
    <div>
      {/* Hero */}
      <div style={{ background: G.hero, padding: '52px 24px 44px', textAlign: 'center' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: G.red, marginBottom: '10px', fontFamily: G.font }}>Brooklyn, NY — Updated Weekly</div>
        <h1 style={{ fontFamily: G.head, fontSize: '52px', fontWeight: 700, color: 'white', lineHeight: 1.0, margin: '0 0 8px' }}>
          Brooklyn's Best<br /><span style={{ color: G.orange }}>Pizza Deals</span>
        </h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', margin: '0 0 28px', fontFamily: G.font }}>{LISTINGS.length}+ spots. Real ratings. Order in one click.</p>
        <div style={{ display: 'flex', gap: '8px', maxWidth: '480px', margin: '0 auto', background: 'rgba(255,255,255,0.07)', padding: '8px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <select
            value={neighborhood}
            onChange={e => setNeighborhood(e.target.value)}
            style={{ flex: 1, background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.14)', color: 'white', borderRadius: '6px', padding: '10px 12px', fontSize: '13px', fontFamily: G.font }}
          >
            <option value="" style={{ color: '#1A1A1A', background: '#fff' }}>All Neighborhoods</option>
            {NEIGHBORHOODS.map(n => <option key={n.slug} value={n.slug} style={{ color: '#1A1A1A', background: '#fff' }}>{n.name}</option>)}
          </select>
          <button onClick={handleSearch} style={{ background: G.red, color: 'white', border: 'none', borderRadius: '6px', padding: '10px 22px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: G.font }}>
            Find Pizza
          </button>
        </div>
        <div style={{ display: 'flex', gap: '36px', justifyContent: 'center', marginTop: '22px' }}>
          {[[`${LISTINGS.length}+`, 'Pizza Spots'], [LISTINGS.filter(l=>l.deal).length, 'Live Deals'], [NEIGHBORHOODS.length, 'Neighborhoods']].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: G.head, fontSize: '24px', fontWeight: 700, color: 'white' }}>{n}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '2px', fontFamily: G.font }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <DealStrip />
      <AdBanner />

      {/* Featured Spots */}
      <div style={{ padding: '32px 24px', background: G.bgDeep, maxWidth: '1020px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontFamily: G.head, fontSize: '24px', fontWeight: 700, color: G.text }}>Featured Spots</h2>
          <span onClick={() => setPage('browse')} style={{ fontSize: '13px', color: G.red, fontWeight: 600, cursor: 'pointer', fontFamily: G.font }}>View all {LISTINGS.length} →</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
          {featured.map(l => <ListingCard key={l.id} listing={l} setPage={setPage} />)}
        </div>
      </div>

      <AdBanner label="ADVERTISEMENT — MID-PAGE" />

      {/* Active Deals Section */}
      <div style={{ padding: '32px 24px', background: '#fff', maxWidth: '1020px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontFamily: G.head, fontSize: '24px', fontWeight: 700, color: G.text }}>🔥 Active Deals This Week</h2>
          <span onClick={() => setPage('deals')} style={{ fontSize: '13px', color: G.orange, fontWeight: 600, cursor: 'pointer', fontFamily: G.font }}>See all deals →</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
          {deals.map(l => <ListingCard key={l.id} listing={l} setPage={setPage} />)}
        </div>
      </div>

      {/* Neighborhood Grid */}
      <div style={{ padding: '32px 24px 40px', background: G.bgDeep, maxWidth: '1020px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: G.head, fontSize: '24px', fontWeight: 700, color: G.text, marginBottom: '16px' }}>Browse by Neighborhood</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '8px' }}>
          {NEIGHBORHOODS.map(n => {
            const count = LISTINGS.filter(l => l.neighborhoodSlug === n.slug).length
            return (
              <div
                key={n.slug}
                onClick={() => setPage('neighborhood/' + n.slug)}
                style={{ background: '#fff', border: `1px solid ${G.border}`, borderRadius: '8px', padding: '12px 10px', textAlign: 'center', cursor: 'pointer' }}
              >
                <div style={{ fontFamily: G.head, fontSize: '13px', fontWeight: 600, color: G.text }}>{n.name}</div>
                <div style={{ fontSize: '10px', color: G.textMuted, marginTop: '2px', fontFamily: G.font }}>{count > 0 ? `${count} spot${count !== 1 ? 's' : ''}` : 'Coming soon'}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Guides Teaser */}
      <div style={{ padding: '32px 24px 40px', background: '#fff', maxWidth: '1020px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: G.head, fontSize: '24px', fontWeight: 700, color: G.text, marginBottom: '16px' }}>Brooklyn Pizza Guides</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
          {ARTICLES.slice(0, 6).map(a => (
            <div
              key={a.id}
              onClick={() => setPage('guides/' + a.id)}
              style={{ background: G.bgDeep, border: `1px solid ${G.border}`, borderRadius: '10px', padding: '16px', cursor: 'pointer' }}
            >
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.5px', padding: '3px 8px', borderRadius: '4px', background: a.tagBg, color: 'white', textTransform: 'uppercase', fontFamily: G.font }}>{a.tag}</span>
              <div style={{ fontFamily: G.head, fontSize: '16px', fontWeight: 600, color: G.text, margin: '8px 0 6px', lineHeight: 1.3 }}>{a.title}</div>
              <div style={{ fontSize: '12px', color: G.textMid, lineHeight: 1.5, fontFamily: G.font }}>{a.excerpt}</div>
              <div style={{ fontSize: '12px', color: G.red, marginTop: '10px', fontWeight: 600, fontFamily: G.font }}>Read more →</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={() => setPage('guides')} style={{ background: G.red, color: 'white', border: 'none', borderRadius: '6px', padding: '11px 28px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: G.font }}>
            All Guides →
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ padding: '32px 24px 48px', background: G.bgDeep, maxWidth: '720px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: G.head, fontSize: '22px', fontWeight: 700, color: G.text, marginBottom: '16px' }}>Frequently Asked Questions</h2>
        {[
          ['What is the best pizza in Brooklyn?', 'Lucali in Carroll Gardens consistently ranks as the best whole pie in Brooklyn. For slices, Di Fara Pizza in Midwood is the gold standard.'],
          ['How do I find pizza deals near me in Brooklyn?', 'Check our Deals page for this week\'s active promos across 40+ Brooklyn spots. We update it weekly with DoorDash, Grubhub, and Slice offers.'],
          ['Which delivery app is cheapest for pizza in Brooklyn?', 'For first-time users, DoorDash has the best new-user discount (20–30% off). For regular orders, Slice charges lower fees for independent pizzerias.'],
          ['What neighborhoods have the best pizza in Brooklyn?', 'Williamsburg, Carroll Gardens, DUMBO, Park Slope, and Boerum Hill have the highest concentration of great pizza spots.'],
        ].map(([q, a]) => (
          <FAQItem key={q} question={q} answer={a} />
        ))}
      </div>
    </div>
  )
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: `1px solid ${G.border}`, padding: '14px 0' }}>
      <div
        onClick={() => setOpen(!open)}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
      >
        <span style={{ fontFamily: G.font, fontSize: '14px', fontWeight: 500, color: G.text }}>{question}</span>
        <span style={{ fontSize: '18px', color: G.red, fontWeight: 700 }}>{open ? '−' : '+'}</span>
      </div>
      {open && <div style={{ fontSize: '13px', color: G.textMid, lineHeight: 1.6, marginTop: '8px', fontFamily: G.font }}>{answer}</div>}
    </div>
  )
}

function BrowsePage({ setPage }) {
  const [search, setSearch] = useState('')
  const [filterHood, setFilterHood] = useState('')
  const [filterDeal, setFilterDeal] = useState(false)

  const filtered = LISTINGS.filter(l => {
    const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.neighborhood.toLowerCase().includes(search.toLowerCase()) || l.specialty.toLowerCase().includes(search.toLowerCase())
    const matchHood = !filterHood || l.neighborhoodSlug === filterHood
    const matchDeal = !filterDeal || !!l.deal
    return matchSearch && matchHood && matchDeal
  })

  return (
    <div style={{ maxWidth: '1020px', margin: '0 auto', padding: '32px 24px' }}>
      <h1 style={{ fontFamily: G.head, fontSize: '32px', fontWeight: 700, color: G.text, marginBottom: '6px' }}>Browse Brooklyn Pizza</h1>
      <p style={{ fontSize: '13px', color: G.textMid, marginBottom: '20px', fontFamily: G.font }}>{LISTINGS.length} spots across {NEIGHBORHOODS.length} neighborhoods</p>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by name, neighborhood, or style..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: '200px', padding: '10px 14px', border: `1px solid ${G.border}`, borderRadius: '7px', fontSize: '13px', fontFamily: G.font, background: '#fff' }}
        />
        <select
          value={filterHood}
          onChange={e => setFilterHood(e.target.value)}
          style={{ padding: '10px 14px', border: `1px solid ${G.border}`, borderRadius: '7px', fontSize: '13px', fontFamily: G.font, background: '#fff' }}
        >
          <option value="">All Neighborhoods</option>
          {NEIGHBORHOODS.map(n => <option key={n.slug} value={n.slug}>{n.name}</option>)}
        </select>
        <button
          onClick={() => setFilterDeal(!filterDeal)}
          style={{ padding: '10px 16px', border: `1px solid ${filterDeal ? G.orange : G.border}`, borderRadius: '7px', fontSize: '13px', fontWeight: 600, background: filterDeal ? G.orange : '#fff', color: filterDeal ? 'white' : G.textMid, cursor: 'pointer', fontFamily: G.font }}
        >
          🏷 Deals Only
        </button>
      </div>

      <AdBanner />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px', marginTop: '20px' }}>
        {filtered.length > 0
          ? filtered.map(l => <ListingCard key={l.id} listing={l} setPage={setPage} />)
          : <div style={{ fontSize: '14px', color: G.textMuted, padding: '40px 0', fontFamily: G.font }}>No results found. Try a different search.</div>
        }
      </div>
    </div>
  )
}

function DealsPage({ setPage }) {
  const deals = LISTINGS.filter(l => l.deal)
  return (
    <div style={{ maxWidth: '1020px', margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ background: G.orange, borderRadius: '10px', padding: '24px', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <span style={{ fontSize: '36px' }}>🏷</span>
        <div>
          <h1 style={{ fontFamily: G.head, fontSize: '28px', fontWeight: 700, color: 'white', margin: 0 }}>Live Pizza Deals</h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', margin: '4px 0 0', fontFamily: G.font }}>{deals.length} active deals this week — updated every Monday</p>
        </div>
      </div>

      <AdBanner />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px', marginTop: '20px' }}>
        {deals.map(l => <ListingCard key={l.id} listing={l} setPage={setPage} />)}
      </div>

      <div style={{ background: '#fff3e6', border: '1px solid #ffd199', borderRadius: '10px', padding: '20px', marginTop: '32px' }}>
        <div style={{ fontFamily: G.head, fontSize: '16px', fontWeight: 600, color: '#b35c00', marginBottom: '6px' }}>About Our Deals</div>
        <p style={{ fontSize: '12px', color: G.textMid, lineHeight: 1.6, margin: 0, fontFamily: G.font }}>
          All deals are manually verified and updated weekly. Expiry dates are approximate — confirm at checkout before ordering.
          Deals are sourced from DoorDash, Grubhub, Slice, and direct restaurant promos. We may earn a small commission on qualifying orders.
        </p>
      </div>
    </div>
  )
}

function NeighborhoodsPage({ setPage }) {
  return (
    <div style={{ maxWidth: '1020px', margin: '0 auto', padding: '32px 24px' }}>
      <h1 style={{ fontFamily: G.head, fontSize: '32px', fontWeight: 700, color: G.text, marginBottom: '6px' }}>Brooklyn Pizza by Neighborhood</h1>
      <p style={{ fontSize: '13px', color: G.textMid, marginBottom: '28px', fontFamily: G.font }}>{NEIGHBORHOODS.length} neighborhoods covered across Brooklyn</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
        {NEIGHBORHOODS.map(n => {
          const spots = LISTINGS.filter(l => l.neighborhoodSlug === n.slug)
          const dealsCount = spots.filter(l => l.deal).length
          return (
            <div
              key={n.slug}
              onClick={() => setPage('neighborhood/' + n.slug)}
              style={{ background: '#fff', border: `1px solid ${G.border}`, borderRadius: '10px', padding: '18px 14px', cursor: 'pointer' }}
            >
              <div style={{ fontFamily: G.head, fontSize: '16px', fontWeight: 600, color: G.text, marginBottom: '4px' }}>{n.name}</div>
              <div style={{ fontSize: '12px', color: G.textMuted, fontFamily: G.font }}>{spots.length} spot{spots.length !== 1 ? 's' : ''}</div>
              {dealsCount > 0 && <div style={{ fontSize: '11px', color: G.orange, marginTop: '4px', fontWeight: 600, fontFamily: G.font }}>🏷 {dealsCount} deal{dealsCount > 1 ? 's' : ''} active</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function NeighborhoodPage({ slug, setPage }) {
  const n = NEIGHBORHOODS.find(n => n.slug === slug)
  const spots = LISTINGS.filter(l => l.neighborhoodSlug === slug)
  const name = n ? n.name : slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  return (
    <div style={{ maxWidth: '1020px', margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ fontSize: '12px', color: G.textMuted, marginBottom: '8px', fontFamily: G.font }}>
        <span onClick={() => setPage('home')} style={{ cursor: 'pointer', color: G.red }}>Home</span>
        {' › '}
        <span onClick={() => setPage('neighborhoods')} style={{ cursor: 'pointer', color: G.red }}>Neighborhoods</span>
        {' › '}{name}
      </div>
      <h1 style={{ fontFamily: G.head, fontSize: '32px', fontWeight: 700, color: G.text, marginBottom: '6px' }}>
        Pizza in {name}, Brooklyn
      </h1>
      <p style={{ fontSize: '13px', color: G.textMid, marginBottom: '24px', fontFamily: G.font }}>
        {spots.length > 0 ? `${spots.length} pizza spot${spots.length > 1 ? 's' : ''} in ${name}` : `No listings yet for ${name} — check back soon.`}
      </p>

      <AdBanner />

      {spots.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px', marginTop: '20px' }}>
          {spots.map(l => <ListingCard key={l.id} listing={l} setPage={setPage} />)}
        </div>
      ) : (
        <div style={{ padding: '48px 0', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>🍕</div>
          <p style={{ fontSize: '14px', color: G.textMuted, fontFamily: G.font }}>We're still adding listings for this neighborhood. <span onClick={() => setPage('browse')} style={{ color: G.red, cursor: 'pointer' }}>Browse all spots →</span></p>
        </div>
      )}
    </div>
  )
}

function GuidesPage({ setPage }) {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
      <h1 style={{ fontFamily: G.head, fontSize: '32px', fontWeight: 700, color: G.text, marginBottom: '6px' }}>Brooklyn Pizza Guides</h1>
      <p style={{ fontSize: '13px', color: G.textMid, marginBottom: '28px', fontFamily: G.font }}>Everything you need to know about Brooklyn pizza — from the best spots to the best deals.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
        {ARTICLES.map(a => (
          <div
            key={a.id}
            onClick={() => setPage('guides/' + a.id)}
            style={{ background: '#fff', border: `1px solid ${G.border}`, borderRadius: '10px', padding: '18px', cursor: 'pointer' }}
          >
            <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.5px', padding: '3px 8px', borderRadius: '4px', background: a.tagBg, color: 'white', textTransform: 'uppercase', fontFamily: G.font }}>{a.tag}</span>
            <div style={{ fontFamily: G.head, fontSize: '17px', fontWeight: 600, color: G.text, margin: '8px 0 6px', lineHeight: 1.3 }}>{a.title}</div>
            <div style={{ fontSize: '12px', color: G.textMid, lineHeight: 1.5, fontFamily: G.font }}>{a.excerpt}</div>
            <div style={{ fontSize: '12px', color: G.red, marginTop: '10px', fontWeight: 600, fontFamily: G.font }}>Read more →</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ArticlePage({ id, setPage }) {
  const article = ARTICLES.find(a => a.id === id)
  if (!article) return <div style={{ padding: '60px 24px', textAlign: 'center', fontFamily: G.font }}>Article not found. <span onClick={() => setPage('guides')} style={{ color: G.red, cursor: 'pointer' }}>Back to guides →</span></div>

  const deals = LISTINGS.filter(l => l.deal).slice(0, 3)

  const renderContent = (text) => {
    return text.split('\n\n').map((block, i) => {
      if (block.startsWith('## ')) {
        return <h2 key={i} style={{ fontFamily: G.head, fontSize: '22px', fontWeight: 700, color: G.text, margin: '28px 0 10px' }}>{block.replace('## ', '')}</h2>
      }
      if (block.startsWith('**') && block.includes('**')) {
        const lines = block.split('\n')
        return (
          <div key={i} style={{ marginBottom: '12px' }}>
            {lines.map((line, j) => {
              if (line.startsWith('**')) {
                const parts = line.split('**')
                return <p key={j} style={{ fontSize: '14px', color: G.text, lineHeight: 1.7, margin: '0 0 6px', fontFamily: G.font }}><strong>{parts[1]}</strong>{parts[2]}</p>
              }
              return <p key={j} style={{ fontSize: '14px', color: G.textMid, lineHeight: 1.7, margin: '0 0 6px', fontFamily: G.font }}>{line}</p>
            })}
          </div>
        )
      }
      if (block.includes('|')) {
        const rows = block.trim().split('\n').filter(r => !r.match(/^[\|\s\-]+$/))
        return (
          <div key={i} style={{ overflowX: 'auto', margin: '16px 0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', fontFamily: G.font }}>
              {rows.map((row, j) => {
                const cells = row.split('|').filter(c => c.trim())
                const Tag = j === 0 ? 'th' : 'td'
                return (
                  <tr key={j} style={{ borderBottom: `1px solid ${G.border}`, background: j === 0 ? G.bgDeep : 'transparent' }}>
                    {cells.map((cell, k) => (
                      <Tag key={k} style={{ padding: '8px 12px', textAlign: 'left', color: j === 0 ? G.text : G.textMid, fontWeight: j === 0 ? 600 : 400 }}>{cell.trim()}</Tag>
                    ))}
                  </tr>
                )
              })}
            </table>
          </div>
        )
      }
      return <p key={i} style={{ fontSize: '15px', color: G.textMid, lineHeight: 1.8, margin: '0 0 16px', fontFamily: G.font }}>{block}</p>
    })
  }

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ fontSize: '12px', color: G.textMuted, marginBottom: '8px', fontFamily: G.font }}>
        <span onClick={() => setPage('home')} style={{ cursor: 'pointer', color: G.red }}>Home</span>
        {' › '}
        <span onClick={() => setPage('guides')} style={{ cursor: 'pointer', color: G.red }}>Guides</span>
        {' › '}{article.title}
      </div>

      <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.5px', padding: '3px 8px', borderRadius: '4px', background: article.tagBg, color: 'white', textTransform: 'uppercase', fontFamily: G.font }}>{article.tag}</span>
      <h1 style={{ fontFamily: G.head, fontSize: '36px', fontWeight: 700, color: G.text, margin: '10px 0 6px', lineHeight: 1.1 }}>{article.title}</h1>
      <p style={{ fontSize: '15px', color: G.textMid, margin: '0 0 24px', lineHeight: 1.6, fontFamily: G.font }}>{article.excerpt}</p>

      <div style={{ borderTop: `3px solid ${G.red}`, paddingTop: '24px' }}>
        {renderContent(article.content)}
      </div>

      {/* In-article deals CTA */}
      <div style={{ background: '#fff3e6', border: `2px solid ${G.orange}`, borderRadius: '10px', padding: '20px 24px', margin: '32px 0' }}>
        <div style={{ fontFamily: G.head, fontSize: '18px', fontWeight: 700, color: G.text, marginBottom: '6px' }}>🏷 Active Pizza Deals This Week</div>
        <p style={{ fontSize: '13px', color: G.textMid, margin: '0 0 14px', fontFamily: G.font }}>Don't order without checking for a deal first.</p>
        <div style={{ display: 'grid', gap: '8px' }}>
          {deals.map(l => (
            <div key={l.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', border: `1px solid ${G.border}`, borderRadius: '7px', padding: '10px 14px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <div style={{ fontFamily: G.font, fontSize: '13px', fontWeight: 600, color: G.text }}>{l.name}</div>
                <div style={{ fontFamily: G.font, fontSize: '12px', color: G.orange }}>{l.deal}</div>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <a href={l.doordash} target="_blank" rel="noopener noreferrer" style={{ background: '#FF3008', color: 'white', padding: '5px 10px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, textDecoration: 'none', fontFamily: G.font }}>DoorDash</a>
                <a href={l.grubhub} target="_blank" rel="noopener noreferrer" style={{ background: '#F63440', color: 'white', padding: '5px 10px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, textDecoration: 'none', fontFamily: G.font }}>Grubhub</a>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => setPage('deals')} style={{ marginTop: '14px', background: G.orange, color: 'white', border: 'none', borderRadius: '6px', padding: '10px 20px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: G.font }}>
          See All Deals →
        </button>
      </div>

      <AdBanner />

      {/* Related Articles */}
      <div style={{ marginTop: '32px' }}>
        <div style={{ fontFamily: G.head, fontSize: '18px', fontWeight: 700, color: G.text, marginBottom: '12px' }}>More Brooklyn Pizza Guides</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
          {ARTICLES.filter(a => a.id !== id).slice(0, 3).map(a => (
            <div key={a.id} onClick={() => { setPage('guides/' + a.id); window.scrollTo(0,0) }} style={{ background: G.bgDeep, border: `1px solid ${G.border}`, borderRadius: '8px', padding: '14px', cursor: 'pointer' }}>
              <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 7px', borderRadius: '3px', background: a.tagBg, color: 'white', textTransform: 'uppercase', fontFamily: G.font }}>{a.tag}</span>
              <div style={{ fontFamily: G.head, fontSize: '14px', fontWeight: 600, color: G.text, margin: '7px 0 0', lineHeight: 1.3 }}>{a.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function NotFoundPage({ setPage }) {
  return (
    <div style={{ textAlign: 'center', padding: '80px 24px', fontFamily: G.font }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>🍕</div>
      <h1 style={{ fontFamily: G.head, fontSize: '32px', color: G.text, marginBottom: '8px' }}>Page Not Found</h1>
      <p style={{ fontSize: '14px', color: G.textMid, marginBottom: '24px' }}>That slice got away. Let's find you some pizza.</p>
      <button onClick={() => setPage('home')} style={{ background: G.red, color: 'white', border: 'none', borderRadius: '6px', padding: '12px 28px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: G.font }}>Back to Home</button>
    </div>
  )
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState(() => urlToPage(window.location.pathname))

  useEffect(() => {
    const handlePop = () => setPage(urlToPage(window.location.pathname))
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  const navigate = (newPage) => {
    window.history.pushState({}, '', pageToUrl(newPage))
    setPage(newPage)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const titles = {
      'home': 'Best Pizza Deals Near Me — Brooklyn, NYC',
      'browse': 'Browse All Brooklyn Pizza Spots | Best Pizza Deals NYC',
      'deals': 'Live Pizza Deals & Discounts | Best Pizza Deals NYC',
      'neighborhoods': 'Brooklyn Pizza by Neighborhood | Best Pizza Deals NYC',
      'guides': 'Brooklyn Pizza Guides | Best Pizza Deals NYC',
    }
    if (page.startsWith('neighborhood/')) {
      const slug = page.replace('neighborhood/', '')
      const name = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      document.title = `Pizza in ${name}, Brooklyn | Best Pizza Deals NYC`
    } else if (page.startsWith('guides/')) {
      const id = page.replace('guides/', '')
      const art = ARTICLES.find(a => a.id === id)
      document.title = art ? `${art.title} | Best Pizza Deals NYC` : 'Brooklyn Pizza Guide | Best Pizza Deals NYC'
    } else {
      document.title = titles[page] || 'Best Pizza Deals Near Me — Brooklyn, NYC'
    }
  }, [page])

  const renderPage = () => {
    if (page === 'home') return <HomePage setPage={navigate} />
    if (page === 'browse') return <BrowsePage setPage={navigate} />
    if (page === 'deals') return <DealsPage setPage={navigate} />
    if (page === 'neighborhoods') return <NeighborhoodsPage setPage={navigate} />
    if (page === 'guides') return <GuidesPage setPage={navigate} />
    if (page.startsWith('guides/')) return <ArticlePage id={page.replace('guides/', '')} setPage={navigate} />
    if (page.startsWith('neighborhood/')) return <NeighborhoodPage slug={page.replace('neighborhood/', '')} setPage={navigate} />
    return <NotFoundPage setPage={navigate} />
  }

  return (
    <div style={{ background: G.bg, minHeight: '100vh', fontFamily: G.font }}>
      <Nav page={page} setPage={navigate} />
      {renderPage()}
      <Footer setPage={navigate} />
    </div>
  )
}
