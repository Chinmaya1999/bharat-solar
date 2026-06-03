// seeds/solarProductsSeed.js
const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

// Solar product data with diverse types and real specifications
const solarProducts = [
  // SOLAR PANELS
  {
    title: 'Tata Power Solar 330W Panel',
    description: 'High-efficiency residential solar panel with PERC technology for maximum power generation.',
    category: 'residential',
    company: 'Tata Power Solar',
    productType: 'solar-panels',
    features: [
      'PERC Cell Technology',
      '25-year warranty',
      'PID resistant',
      'Anti-reflective coating',
      'High temperature performance'
    ],
    specifications: {
      power: '330W',
      efficiency: '19.5%',
      dimensions: '1960 x 992 x 40 mm',
      weight: '18.5 kg'
    },
    priceRange: '$$',
    price: 22999,
    rating: 4.8,
    alt: 'Tata Power Solar 330W residential panel',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Loom Solar 375W Shark Panel',
    description: 'Premium residential solar panel with half-cut cell technology for better performance in shaded conditions.',
    category: 'residential',
    company: 'Loom Solar',
    productType: 'solar-panels',
    features: [
      'Half-cut cell technology',
      'Multi-busbar design',
      '30-year performance warranty',
      'Low degradation rate',
      'IP67 rated junction box'
    ],
    specifications: {
      power: '375W',
      efficiency: '20.5%',
      dimensions: '1980 x 1000 x 35 mm',
      weight: '19.2 kg'
    },
    priceRange: '$$$',
    price: 28999,
    rating: 4.9,
    alt: 'Loom Solar 375W Shark panel',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16eb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Waaree 540W Bifacial Panel',
    description: 'Commercial-grade bifacial panel with enhanced power output for business applications.',
    category: 'commercial',
    company: 'Waaree Solar',
    productType: 'solar-panels',
    features: [
      'Bifacial technology',
      'High transparency glass',
      '30-year warranty',
      'Strong mechanical load',
      'Low degradation'
    ],
    specifications: {
      power: '540W',
      efficiency: '21.0%',
      dimensions: '2278 x 1134 x 35 mm',
      weight: '28.0 kg'
    },
    priceRange: '$$$',
    price: 42999,
    rating: 4.6,
    alt: 'Waaree 540W bifacial panel',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },

  // INVERTERS
  {
    title: 'Luminous 5KVA Solar Inverter',
    description: 'Hybrid solar inverter with pure sine wave output for residential and commercial use.',
    category: 'residential',
    company: 'Luminous',
    productType: 'inverters',
    features: [
      'Pure sine wave output',
      'MPPT technology',
      'LCD display',
      'Multiple protection features',
      'Smart monitoring'
    ],
    specifications: {
      power: '5KVA',
      efficiency: '95%',
      dimensions: '450 x 300 x 200 mm',
      weight: '15 kg'
    },
    priceRange: '$$$',
    price: 34999,
    rating: 4.7,
    alt: 'Luminous 5KVA solar inverter',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Growatt 10KVA Inverter',
    description: 'Three-phase hybrid inverter for commercial solar installations with advanced features.',
    category: 'commercial',
    company: 'Growatt',
    productType: 'inverters',
    features: [
      'Three-phase output',
      'Dual MPPT',
      'WiFi monitoring',
      'High efficiency',
      'Scalable design'
    ],
    specifications: {
      power: '10KVA',
      efficiency: '98.5%',
      dimensions: '600 x 400 x 250 mm',
      weight: '35 kg'
    },
    priceRange: '$$$$',
    price: 59999,
    rating: 4.8,
    alt: 'Growatt 10KVA inverter',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Fronius 3KVA Inverter',
    description: 'Premium European inverter with superior efficiency and reliability for home solar systems.',
    category: 'residential',
    company: 'Fronius',
    productType: 'inverters',
    features: [
      'European quality',
      '98.2% efficiency',
      'Smart monitoring',
      'Long lifespan',
      'Compact design'
    ],
    specifications: {
      power: '3KVA',
      efficiency: '98.2%',
      dimensions: '350 x 280 x 150 mm',
      weight: '12 kg'
    },
    priceRange: '$$$$',
    price: 68999,
    rating: 4.9,
    alt: 'Fronius 3KVA inverter',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },

  // BATTERIES
  {
    title: 'Exide 150Ah Solar Battery',
    description: 'Tubular solar battery designed for deep cycle applications in solar systems.',
    category: 'residential',
    company: 'Exide',
    productType: 'batteries',
    features: [
      'Tubular technology',
      'Deep cycle design',
      '1200+ cycles',
      'Low maintenance',
      '5-year warranty'
    ],
    specifications: {
      power: '150Ah',
      efficiency: '85%',
      dimensions: '500 x 190 x 420 mm',
      weight: '45 kg'
    },
    priceRange: '$$',
    price: 18999,
    rating: 4.5,
    alt: 'Exide 150Ah solar battery',
    image: 'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Luminous 200Ah Battery',
    description: 'High-capacity tubular battery for extended backup in solar power systems.',
    category: 'commercial',
    company: 'Luminous',
    productType: 'batteries',
    features: [
      '200Ah capacity',
      'Tall tubular design',
      'Fast charging',
      'Long life',
      'Zero maintenance'
    ],
    specifications: {
      power: '200Ah',
      efficiency: '88%',
      dimensions: '510 x 200 x 450 mm',
      weight: '55 kg'
    },
    priceRange: '$$$',
    price: 24999,
    rating: 4.6,
    alt: 'Luminous 200Ah battery',
    image: 'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'HBL 180Ah Battery',
    description: 'Industrial-grade solar battery for demanding applications with superior performance.',
    category: 'industrial',
    company: 'HBL',
    productType: 'batteries',
    features: [
      'Industrial grade',
      'High cycle life',
      'Robust construction',
      'Temperature resistant',
      '10-year warranty'
    ],
    specifications: {
      power: '180Ah',
      efficiency: '87%',
      dimensions: '505 x 195 x 425 mm',
      weight: '50 kg'
    },
    priceRange: '$$$',
    price: 29999,
    rating: 4.7,
    alt: 'HBL 180Ah battery',
    image: 'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },

  // WATER PUMPS
  {
    title: 'Waaree 5HP Solar Water Pump',
    description: 'AC solar water pump for agricultural irrigation with high efficiency.',
    category: 'specialized',
    company: 'Waaree Solar',
    productType: 'water-pumps',
    features: [
      '5HP motor',
      'AC technology',
      'High head capacity',
      'Low maintenance',
      'IP68 protection'
    ],
    specifications: {
      power: '5HP',
      efficiency: '45%',
      dimensions: '400 x 300 x 350 mm',
      weight: '25 kg'
    },
    priceRange: '$$$',
    price: 49999,
    rating: 4.6,
    alt: 'Waaree 5HP solar water pump',
    image: 'https://images.unsplash.com/photo-1598128558393-70ff214ecbe9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Tata Power Solar 3HP Pump',
    description: 'DC solar water pump for domestic and small agricultural applications.',
    category: 'specialized',
    company: 'Tata Power Solar',
    productType: 'water-pumps',
    features: [
      'DC motor',
      '3HP capacity',
      'Direct solar powered',
      'No inverter needed',
      'Easy installation'
    ],
    specifications: {
      power: '3HP',
      efficiency: '40%',
      dimensions: '350 x 250 x 300 mm',
      weight: '18 kg'
    },
    priceRange: '$$',
    price: 32999,
    rating: 4.5,
    alt: 'Tata Power Solar 3HP pump',
    image: 'https://images.unsplash.com/photo-1598128558393-70ff214ecbe9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },

  // STREET LIGHTS
  {
    title: 'Tata Power Solar Street Light 30W',
    description: 'All-in-one solar street light with integrated solar panel and battery.',
    category: 'specialized',
    company: 'Tata Power Solar',
    productType: 'street-lights',
    features: [
      'All-in-one design',
      '30W LED',
      'Motion sensor',
      'Auto on/off',
      'Weatherproof'
    ],
    specifications: {
      power: '30W',
      efficiency: '150 lm/W',
      dimensions: '500 x 300 x 200 mm',
      weight: '8 kg'
    },
    priceRange: '$$',
    price: 8999,
    rating: 4.4,
    alt: 'Tata Power Solar street light',
    image: 'https://images.unsplash.com/photo-1565313539653-7fa2e8c5e0b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Havells Solar Street Light 50W',
    description: 'High-power solar street light for roads and large area lighting.',
    category: 'commercial',
    company: 'Havells',
    productType: 'street-lights',
    features: [
      '50W LED',
      'Split design',
      'Remote control',
      'Timer function',
      'IP65 rated'
    ],
    specifications: {
      power: '50W',
      efficiency: '160 lm/W',
      dimensions: '600 x 350 x 250 mm',
      weight: '12 kg'
    },
    priceRange: '$$$',
    price: 14999,
    rating: 4.6,
    alt: 'Havells solar street light',
    image: 'https://images.unsplash.com/photo-1565313539653-7fa2e8c5e0b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },

  // WIRES & CABLES
  {
    title: 'Polycab 6mm Solar Cable',
    description: 'UV-resistant solar cable for outdoor solar panel connections.',
    category: 'specialized',
    company: 'Polycab',
    productType: 'wires',
    features: [
      '6mm copper',
      'UV resistant',
      'Weatherproof',
      'High temperature rating',
      '100m roll'
    ],
    specifications: {
      power: '6mm',
      efficiency: '98%',
      dimensions: '100m roll',
      weight: '15 kg'
    },
    priceRange: '$',
    price: 14999,
    rating: 4.3,
    alt: 'Polycab 6mm solar cable',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Finolex 4mm Solar Wire',
    description: 'Premium solar wire with superior conductivity and durability.',
    category: 'residential',
    company: 'Finolex',
    productType: 'wires',
    features: [
      '4mm copper',
      'Pure copper',
      'Flexible',
      'Fire resistant',
      '50m roll'
    ],
    specifications: {
      power: '4mm',
      efficiency: '97%',
      dimensions: '50m roll',
      weight: '8 kg'
    },
    priceRange: '$',
    price: 7999,
    rating: 4.4,
    alt: 'Finolex 4mm solar wire',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },

  // ACCESSORIES
  {
    title: 'Solar Mounting Structure',
    description: 'Galvanized steel mounting structure for rooftop solar panel installation.',
    category: 'residential',
    company: 'Tata Power Solar',
    productType: 'accessories',
    features: [
      'Galvanized steel',
      'Rust proof',
      'Easy assembly',
      '25-year warranty',
      'Custom sizing'
    ],
    specifications: {
      power: 'Variable',
      efficiency: 'N/A',
      dimensions: 'Custom',
      weight: '30 kg/set'
    },
    priceRange: '$$',
    price: 38999,
    rating: 4.5,
    alt: 'Solar mounting structure',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'MC4 Connectors',
    description: 'IP67 rated MC4 connectors for solar panel connections.',
    category: 'specialized',
    company: 'Staubli',
    productType: 'accessories',
    features: [
      'IP67 rated',
      'UV resistant',
      'Easy connection',
      'High current capacity',
      '10 pairs'
    ],
    specifications: {
      power: '30A',
      efficiency: '99%',
      dimensions: '50 x 30 x 20 mm',
      weight: '0.1 kg'
    },
    priceRange: '$',
    price: 11999,
    rating: 4.6,
    alt: 'MC4 connectors',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },

  // EV CHARGERS
  {
    title: 'Tata Power 7kW EV Charger',
    description: 'Home EV charger compatible with all electric vehicles.',
    category: 'specialized',
    company: 'Tata Power',
    productType: 'ev-chargers',
    features: [
      '7kW output',
      'Type 2 connector',
      'Smart charging',
      'WiFi enabled',
      'App control'
    ],
    specifications: {
      power: '7kW',
      efficiency: '95%',
      dimensions: '400 x 300 x 150 mm',
      weight: '10 kg'
    },
    priceRange: '$$$$',
    price: 55999,
    rating: 4.7,
    alt: 'Tata Power 7kW EV charger',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Ather 3kW Portable Charger',
    description: 'Portable EV charger for electric scooters and bikes.',
    category: 'residential',
    company: 'Ather',
    productType: 'ev-chargers',
    features: [
      '3kW output',
      'Portable design',
      'Fast charging',
      'Universal compatibility',
      'Compact size'
    ],
    specifications: {
      power: '3kW',
      efficiency: '92%',
      dimensions: '200 x 150 x 100 mm',
      weight: '2 kg'
    },
    priceRange: '$$',
    price: 19999,
    rating: 4.5,
    alt: 'Ather 3kW portable charger',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

async function seedProducts() {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://chinmayadob1999:Ket3Jfd6scgKiRxI@cluster0.zgkvein.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to database');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const insertedProducts = await Product.insertMany(solarProducts);
    console.log(`Successfully inserted ${insertedProducts.length} solar products`);

    // Display summary
    const categories = {};
    const companies = {};
    const productTypes = {};
    insertedProducts.forEach(product => {
      categories[product.category] = (categories[product.category] || 0) + 1;
      companies[product.company] = (companies[product.company] || 0) + 1;
      productTypes[product.productType] = (productTypes[product.productType] || 0) + 1;
    });

    console.log('\n=== Product Summary ===');
    console.log('Categories:', categories);
    console.log('Companies:', companies);
    console.log('Product Types:', productTypes);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
