import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building, Target, Users, MapPin } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import ceo from './solor/WhatsApp Image 2025-05-25 at 1.48.18 PM.jpeg';
import md from './solor/WhatsApp Image 2025-05-25 at 1.49.08 PM.jpeg';
import cto from './solor/image.jpg';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
};

const slideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

const AboutUsPage = () => {
  const [mapInitialized, setMapInitialized] = React.useState(false);

  // Service locations in Odisha
  const serviceLocations = [
    { name: "Bhubaneswar", lat: 20.2961, lng: 85.8245, isHeadquarters: true },
    { name: "Balasore", lat: 21.494, lng: 86.933 },
    { name: "Bhadrak", lat: 21.054, lng: 86.501 },
    { name: "Jajapur", lat: 20.848, lng: 86.337 },
    { name: "Cuttack", lat: 20.462, lng: 85.883 },
    { name: "Puri", lat: 19.813, lng: 85.831 },
    { name: "Rourkela", lat: 22.249, lng: 84.899 },
    { name: "Sambalpur", lat: 21.470, lng: 83.970 },
    { name: "Berhampur", lat: 19.320, lng: 84.792 },
    { name: "Baripada", lat: 21.934, lng: 86.722 },
  ];

  // Initialize map
  useEffect(() => {
    if (!mapInitialized) {
      const initializeMap = async () => {
        try {
          // Load Leaflet CSS
          const leafletCSS = document.createElement('link');
          leafletCSS.rel = 'stylesheet';
          leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          leafletCSS.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
          leafletCSS.crossOrigin = '';
          document.head.appendChild(leafletCSS);

          // Load Leaflet JS
          const leafletJS = document.createElement('script');
          leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          leafletJS.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
          leafletJS.crossOrigin = '';
          leafletJS.onload = () => {
            const L = window.L;
            if (L) {
              // Create the map centered on Odisha
              const map = L.map('service-area-map').setView([20.2961, 85.8245], 8);
              
              // Add OpenStreetMap tiles
              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              }).addTo(map);
              
              // Add custom marker for headquarters
              const headquartersIcon = L.icon({
                iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
              });
              
              // Add standard marker for other locations
              const standardIcon = L.icon({
                iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                iconSize: [24, 24],
                iconAnchor: [12, 24],
                popupAnchor: [0, -24]
              });
              
              // Add markers for each service location
              serviceLocations.forEach(location => {
                const icon = location.isHeadquarters ? headquartersIcon : standardIcon;
                const marker = L.marker([location.lat, location.lng], {icon: icon})
                  .addTo(map)
                  .bindPopup(`<b>${location.name}</b><br>${location.isHeadquarters ? 'Headquarters' : 'Service Area'}`);
                
                if (location.isHeadquarters) {
                  marker.openPopup();
                }
              });
              
              setMapInitialized(true);
            }
          };
          document.body.appendChild(leafletJS);
        } catch (error) {
          console.error('Error initializing map:', error);
        }
      };
      
      initializeMap();
    }
  }, [mapInitialized]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16">
      <motion.section
        className="text-center"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <motion.h1 className="text-4xl md:text-5xl font-extrabold mb-4" variants={slideUp(0)}>
          About <span className="text-emerald-600">Bharat Solar Solution</span>
        </motion.h1>
        <motion.p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" variants={slideUp(0.2)}>
          Best Solar Installation Service Provider in Odisha. Delivering efficient, affordable, and sustainable energy solutions with expert service and advanced technology for homes and businesses.
        </motion.p>
      </motion.section>

      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <Card className="overflow-hidden shadow-xl">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img className="object-cover w-full h-64 md:h-full" alt="Bharat Solar Solution company building exterior" src="https://images.unsplash.com/photo-1571234078871-847dc9959279" />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <motion.h2 className="text-3xl font-bold mb-6 flex items-center" variants={slideUp(0)}>
                <Building className="h-8 w-8 mr-3 text-emerald-600" /> Our History
              </motion.h2>
              <motion.p className="text-muted-foreground mb-4" variants={slideUp(0.2)}>
                Founded in 2015, Bharat Solar Solution emerged from a vision to make renewable energy accessible and affordable for everyone in Odisha. Over the years, we've grown from a small local startup into a leading provider of solar energy systems across the state, driven by our commitment to innovation and customer satisfaction.
              </motion.p>
              <motion.p className="text-muted-foreground" variants={slideUp(0.3)}>
                We've successfully completed over 2,500 installations, helping homeowners and businesses alike transition to clean energy, reducing their carbon footprint and energy costs.
              </motion.p>
            </div>
          </div>
        </Card>
      </motion.section>

      <motion.section
        className="grid md:grid-cols-2 gap-12 items-center"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={fadeIn}>
          <h2 className="text-3xl font-bold mb-6 flex items-center" variants={slideUp(0)}>
            <Target className="h-8 w-8 mr-3 text-emerald-600" /> Mission & Vision
          </h2>
          <div className="space-y-6">
            <motion.div variants={slideUp(0.2)}>
              <h3 className="text-xl font-semibold text-emerald-700 mb-2">Our Mission</h3>
              <p className="text-muted-foreground">
                To empower individuals and communities in Odisha with sustainable, high-performance solar energy solutions, fostering environmental responsibility and energy independence through exceptional service and cutting-edge technology.
              </p>
            </motion.div>
            <motion.div variants={slideUp(0.3)}>
              <h3 className="text-xl font-semibold text-emerald-700 mb-2">Our Vision</h3>
              <p className="text-muted-foreground">
                To be Odisha's most trusted and innovative leader in the renewable energy sector, creating a state where clean solar energy is the primary source of power for a thriving planet and prosperous society.
              </p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div variants={fadeIn}>
          <img className="rounded-lg shadow-xl w-full h-auto object-cover aspect-video" alt="Diverse team working on solar project plans" src="https://images.unsplash.com/photo-1679511202153-0d4dc8ac0ff9" />
        </motion.div>
      </motion.section>
      
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 flex items-center justify-center" variants={slideUp(0)}>
          <Users className="h-10 w-10 mr-3 text-emerald-600" /> Meet Our Team
        </h2>
        <motion.p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-10" variants={slideUp(0.1)}>
          Our dedicated team of engineers, technicians, and support staff are passionate about solar energy and committed to delivering the best possible experience for our customers.
        </motion.p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              name: "Sai Aditya Behera", 
              role: "Managing Director", 
              img: md, 
              alt: "Sai Aditya Behera, Managing Director" 
            },
            { 
              name: "Ashutosh Behera", 
              role: "Business Head", 
              img: ceo, 
              alt: "Ashutosh Behera, Business Head" 
            },
            { 
              name: "Chinmaya Kumar Mallick", 
              role: "Chief Technology Officer", 
              img: cto, 
              alt: "Chinmaya Kumar Mallick, Chief Technology Officer" 
            },
          ].map((member, i) => (
            <motion.div key={member.name} variants={slideUp(0.2 + i * 0.1)}>
              <Card className="text-center hover:shadow-2xl transition-shadow duration-300">
                <CardHeader>
                  <img 
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" 
                    alt={member.alt} 
                    src={member.img} 
                  />
                  <CardTitle>{member.name}</CardTitle>
                  <p className="text-emerald-600 font-medium">{member.role}</p>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="text-center"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center justify-center" variants={slideUp(0)}>
          <MapPin className="h-10 w-10 mr-3 text-emerald-600" /> Our Service Area
        </h2>
        <motion.p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8" variants={slideUp(0.2)}>
          We proudly serve all of Odisha with our headquarters in Bhubaneswar. 
          Contact us for solar solutions throughout the state.
        </motion.p>
        
        <motion.div 
          className="aspect-video rounded-lg shadow-lg overflow-hidden relative bg-gray-100"
          variants={slideUp(0.3)}
        >
          <div id="service-area-map" className="w-full h-full">
            {!mapInitialized && (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="bg-emerald-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
                  <div className="h-2 bg-emerald-200 rounded w-32 mb-2"></div>
                  <div className="h-2 bg-emerald-200 rounded w-48"></div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
        
        <motion.div className="mt-8" variants={slideUp(0.4)}>
          <h3 className="text-xl font-bold mb-4">We Serve All Major Districts in Odisha</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {serviceLocations.map((location, index) => (
              <div 
                key={index} 
                className={`py-2 px-3 rounded-lg text-sm font-medium ${
                  location.isHeadquarters 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {location.name}
                {location.isHeadquarters && (
                  <span className="ml-1 text-xs">(HQ)</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Solar Commitment Section */}
      <motion.section 
        className="bg-gradient-to-r from-emerald-700 to-teal-600 rounded-2xl p-8 md:p-12 text-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Solar Commitment to Odisha</h2>
          <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto">
            At Bharat Solar Solution, we're dedicated to bringing clean, affordable solar power to every corner of Odisha. 
            Our mission is to empower communities, reduce energy costs, and contribute to a sustainable future for our state.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="text-3xl font-bold mb-2">2,500+</div>
              <div>Installations</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="text-3xl font-bold mb-2">30+</div>
              <div>Districts Served</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="text-3xl font-bold mb-2">98%</div>
              <div>Customer Satisfaction</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div>Support</div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUsPage;