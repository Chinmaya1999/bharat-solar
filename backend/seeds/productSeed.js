// backend/seeds/productSeed.js
const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

// Demo data based on real solar product specifications from major manufacturers
const demoProducts = [
  {
    title: 'JA Solar JAM72S30-450/MR',
    description: 'High-efficiency monocrystalline solar panel with half-cut cell technology. Ideal for residential and commercial installations with excellent low-light performance.',
    category: 'residential',
    features: [
      'Half-cut cell technology for improved efficiency',
      'PERC (Passivated Emitter Rear Cell) technology',
      'Multi-busbar design for reduced resistance',
      'PID (Potential Induced Degradation) resistant',
      'High salt mist and ammonia resistance'
    ],
    specifications: {
      power: '450W',
      efficiency: '21.3%',
      dimensions: '2128mm × 1058mm × 35mm',
      weight: '23.5kg'
    },
    priceRange: '$$',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
    alt: 'JA Solar monocrystalline panel installation'
  },
  {
    title: 'Trina Vertex S+ 410W',
    description: 'Premium monocrystalline module with multi-busbar technology. Perfect for rooftop installations with limited space, offering maximum power output per square meter.',
    category: 'residential',
    features: [
      'Multi-busbar (MBB) technology',
      'High-density cell interconnection',
      'Improved temperature coefficient',
      'Enhanced load capacity up to 5400Pa',
      '30-year linear power warranty'
    ],
    specifications: {
      power: '410W',
      efficiency: '21.1%',
      dimensions: '1762mm × 1134mm × 30mm',
      weight: '21.0kg'
    },
    priceRange: '$$$',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16c03?w=800',
    alt: 'Trina Vertex solar panel on residential roof'
  },
  {
    title: 'Canadian Solar CS6X-335P',
    description: 'Reliable polycrystalline solar panel with proven performance. Cost-effective solution for large-scale commercial and utility projects.',
    category: 'commercial',
    features: [
      'Poly-crystalline technology',
      'Positive power tolerance',
      'Robust frame design',
      'Certified for high wind and snow loads',
      '10-year product warranty'
    ],
    specifications: {
      power: '335W',
      efficiency: '17.2%',
      dimensions: '1956mm × 992mm × 40mm',
      weight: '22.0kg'
    },
    priceRange: '$',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16c03?w=800',
    alt: 'Canadian Solar polycrystalline panel array'
  },
  {
    title: 'Longi LR4-60HPH-470M',
    description: 'High-performance bifacial monocrystalline module for commercial and industrial applications. Bifacial technology captures light from both sides for increased energy yield.',
    category: 'commercial',
    features: [
      'Bifacial technology with up to 30% additional power',
      'Half-cut cell design',
      'Low degradation rate',
      'Excellent weak light performance',
      'Compatible with tracking systems'
    ],
    specifications: {
      power: '470W',
      efficiency: '21.6%',
      dimensions: '2172mm × 1134mm × 35mm',
      weight: '28.5kg'
    },
    priceRange: '$$$',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
    alt: 'Longi bifacial solar panel installation'
  },
  {
    title: 'Jinko Solar JKM550M-72RL4-V',
    description: 'Industrial-grade monocrystalline panel with Tiger Pro technology. Designed for large-scale solar farms and industrial installations requiring maximum reliability.',
    category: 'industrial',
    features: [
      'Tiger Pro half-cut cell technology',
      'Multi-busbar design',
      'High module efficiency',
      'Excellent PID resistance',
      '25-year linear performance warranty'
    ],
    specifications: {
      power: '550W',
      efficiency: '21.3%',
      dimensions: '2278mm × 1134mm × 35mm',
      weight: '32.0kg'
    },
    priceRange: '$$$',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
    alt: 'Jinko Solar industrial panel array'
  },
  {
    title: 'SunPower Maxeon 3',
    description: 'Premium monocrystalline panel with Maxeon cell technology. Highest efficiency in the industry with unmatched durability and performance guarantee.',
    category: 'specialized',
    features: [
      'Maxeon cell technology',
      'Industry-leading 22.8% efficiency',
      'Solid copper backing for durability',
      '40-year warranty (25-year product, 40-year performance)',
      'Eliminates most common failure modes'
    ],
    specifications: {
      power: '400W',
      efficiency: '22.8%',
      dimensions: '1690mm × 1046mm × 40mm',
      weight: '18.0kg'
    },
    priceRange: '$$$$',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16c03?w=800',
    alt: 'SunPower Maxeon premium solar panel'
  },
  {
    title: 'Huawei SUN2000-100KTL',
    description: 'Smart string inverter for commercial and industrial applications. Advanced MPPT technology with smart monitoring and grid support functions.',
    category: 'commercial',
    features: [
      'Smart I-V curve diagnosis',
      'Multiple MPPT trackers',
      'Natural cooling design',
      'IP65 protection rating',
      'Integrated monitoring system'
    ],
    specifications: {
      power: '100kW',
      efficiency: '98.8%',
      dimensions: '830mm × 480mm × 265mm',
      weight: '85kg'
    },
    priceRange: '$$$',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1671376354106-d8d21e55dddd?w=800',
    alt: 'Huawei commercial solar inverter'
  },
  {
    title: 'SMA Sunny Tripower 10.0',
    description: 'Three-phase inverter for commercial installations. Proven reliability with comprehensive grid management features and easy installation.',
    category: 'commercial',
    features: [
      'Three-phase output',
      'OptiTrack global MPP tracking',
      'Integrated DC disconnect switch',
      'Grid management functions',
      'Touch display for easy operation'
    ],
    specifications: {
      power: '10kW',
      efficiency: '98.0%',
      dimensions: '650mm × 480mm × 220mm',
      weight: '48kg'
    },
    priceRange: '$$$',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1671376354106-d8d21e55dddd?w=800',
    alt: 'SMA commercial inverter installation'
  },
  {
    title: 'Tesla Powerwall 3',
    description: 'Advanced lithium-ion battery storage system for residential use. 13.5kWh capacity with integrated inverter and seamless backup power.',
    category: 'residential',
    features: [
      '13.5kWh energy capacity',
      'Integrated inverter',
      '10-year warranty',
      'Weatherproof for indoor/outdoor installation',
      'App-based monitoring and control'
    ],
    specifications: {
      power: '5.8kW / 10kW peak',
      efficiency: '97.5%',
      dimensions: '1150mm × 755mm × 155mm',
      weight: '130kg'
    },
    priceRange: '$$$$',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    alt: 'Tesla Powerwall home battery installation'
  },
  {
    title: 'LG Chem RESU10H',
    description: 'High-capacity lithium-ion battery for residential energy storage. Modular design allows for easy expansion and flexible installation options.',
    category: 'residential',
    features: [
      '9.8k usable capacity',
      '95% depth of discharge',
      '10-year warranty',
      'Compact and lightweight design',
      'Compatible with most inverters'
    ],
    specifications: {
      power: '5kW continuous',
      efficiency: '95.0%',
      dimensions: '660mm × 460mm × 180mm',
      weight: '95kg'
    },
    priceRange: '$$$',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    alt: 'LG Chem RESU home battery system'
  },
  {
    title: 'BYD B-Box HV',
    description: 'Scalable high-voltage battery system for commercial applications. Modular design allows capacity from 7.7kWh to 76.8kWh for flexible installations.',
    category: 'commercial',
    features: [
      'Scalable modular design',
      'High voltage system (400V)',
      '10-year performance warranty',
      'Compact footprint',
      'Advanced BMS for safety'
    ],
    specifications: {
      power: '5kW per module',
      efficiency: '96.0%',
      dimensions: '680mm × 520mm × 220mm',
      weight: '85kg per module'
    },
    priceRange: '$$$',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    alt: 'BYD commercial battery storage system'
  },
  {
    title: 'SolarEdge SE5000H',
    description: 'HD-Wave inverter with power optimizer technology for residential installations. Maximizes energy production with module-level monitoring.',
    category: 'residential',
    features: [
      'HD-Wave technology for high efficiency',
      'Fixed voltage design',
      'Built-in DC safety switch',
      'Module-level monitoring',
      '25-year warranty'
    ],
    specifications: {
      power: '5kW',
      efficiency: '99.0%',
      dimensions: '445mm × 338mm × 185mm',
      weight: '14.5kg'
    },
    priceRange: '$$',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1671376354106-d8d21e55dddd?w=800',
    alt: 'SolarEdge residential inverter'
  }
];

async function seedProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bharat-solar', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert demo products
    const insertedProducts = await Product.insertMany(demoProducts);
    console.log(`Successfully inserted ${insertedProducts.length} demo products`);

    // Display inserted products
    console.log('\nInserted Products:');
    insertedProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.title} - ${product.category} - ${product.specifications.power}`);
    });

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
