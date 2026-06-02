// src/components/ContactUsPage.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet';

// We'll load Leaflet CSS and JS dynamically
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.2 } },
};

const slideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

const ContactUsPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [mapInitialized, setMapInitialized] = React.useState(false);
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [locationLoading, setLocationLoading] = React.useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const getCurrentLocation = async () => {
    setLocationLoading(true);
    
    try {
      // Use exact coordinates from Google Maps link
      const coordinates = [20.225101, 85.722536];
      
      setCurrentLocation({ latitude: coordinates[0], longitude: coordinates[1] });
      setLocationLoading(false);
      toast({
        title: "Office Location",
        description: "Bharat Solar Solution, Uttarmundamuhan, Odisha 752054"
      });
      
      // Update map if already initialized
      if (window.L && window.mapInstance) {
        window.mapInstance.setView(coordinates, 16);
        // Remove old marker and add new one
        if (window.markerInstance) {
          window.mapInstance.removeLayer(window.markerInstance);
        }
        const customIcon = window.L.icon({
          iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32]
        });
        window.markerInstance = window.L.marker(coordinates, {icon: customIcon})
          .addTo(window.mapInstance)
          .bindPopup('Bharat Solar Solution<br>Uttarmundamuhan, Odisha 752054')
          .openPopup();
      }
    } catch (error) {
      setLocationLoading(false);
      toast({
        title: "Error",
        description: "Unable to fetch office location",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch('https://api.bharatsolarsolution.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) throw new Error('Failed to send');
      
      toast({ title: "Message Sent!", description: "We'll contact you soon" });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };
  // Initialize the map after component mounts
  useEffect(() => {
    if (!mapInitialized) {
      // Dynamically import Leaflet and create the map
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
          leafletJS.onload = async () => {
            const L = window.L;
            if (L) {
              // Use exact coordinates from Google Maps link
              const coordinates = [20.225101, 85.722536];
              
              // Create the map centered on the address
              const map = L.map('map-container').setView(coordinates, 16);
              window.mapInstance = map;
              
              // Add OpenStreetMap tiles
              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              }).addTo(map);
              
              // Add custom marker
              const customIcon = L.icon({
                iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
              });
              
              // Add marker with popup
              const marker = L.marker(coordinates, {icon: customIcon})
                .addTo(map)
                .bindPopup('Bharat Solar Solution<br>Uttarmundamuhan, Odisha 752054')
                .openPopup();
              window.markerInstance = marker;
              
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
    <>
      <Helmet>
        <title>Contact Us - Bharat Solar Solution | Get Free Solar Consultation & Quote</title>
        <meta name="description" content="Contact Bharat Solar Solution for free solar consultation and quotes. Call us at 7377899573 or visit our office in Uttarmundamuhan, Odisha. Get expert advice on solar panels, inverters, and installation." />
        <meta name="keywords" content="contact solar company, solar consultation, solar quote, solar installation contact, Bharat Solar Solution contact, solar support, solar inquiry" />
        <link rel="canonical" href="https://bharatsolarsolution.com/contact" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Contact Us - Bharat Solar Solution" />
        <meta property="og:description" content="Contact Bharat Solar Solution for free solar consultation and quotes. Get expert advice on solar panels, inverters, and installation." />
        <meta property="og:url" content="https://bharatsolarsolution.com/contact" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:title" content="Contact Us - Bharat Solar Solution" />
        <meta name="twitter:description" content="Contact Bharat Solar Solution for free solar consultation and quotes. Get expert advice on solar panels, inverters, and installation." />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <motion.section
        className="text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-blue-600 to-orange-500 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl hover:scale-110 transition-transform duration-300">
          <MessageCircle className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
          Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">Touch</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question about our products, need a quote, or want to discuss your solar project, our team is ready to assist.
        </p>
      </motion.section>

      <motion.div 
        className="grid md:grid-cols-2 gap-12 items-start"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={slideUp(0.1)}>
          <Card className="shadow-2xl border-0 rounded-3xl bg-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-orange-500 text-white pb-8 pt-8 px-8">
              <CardTitle className="text-2xl md:text-3xl flex items-center">
                <Send className="h-7 w-7 mr-3" /> Contact Form
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-900 font-semibold">Full Name</Label>
                  <Input id="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleChange} required className="mt-2 bg-gray-50 border-2 border-gray-200 focus:border-blue-600 rounded-xl px-4 py-3 transition-all"/>
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-900 font-semibold">Email Address</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" value={formData.email} onChange={handleChange} required className="mt-2 bg-gray-50 border-2 border-gray-200 focus:border-blue-600 rounded-xl px-4 py-3 transition-all"/>
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-900 font-semibold">Phone Number (Optional)</Label>
                  <Input id="phone" type="tel" placeholder="(123) 456-7890" value={formData.phone} onChange={handleChange} className="mt-2 bg-gray-50 border-2 border-gray-200 focus:border-blue-600 rounded-xl px-4 py-3 transition-all"/>
                </div>
                <div>
                  <Label htmlFor="message" className="text-gray-900 font-semibold">Message</Label>
                  <Textarea id="message" placeholder="Your message here..." value={formData.message} onChange={handleChange} required rows={5} className="mt-2 bg-gray-50 border-2 border-gray-200 focus:border-blue-600 rounded-xl px-4 py-3 transition-all"/>
                </div>
                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="space-y-8" variants={slideUp(0.2)}>
          <Card className="shadow-lg border-0 rounded-3xl bg-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-orange-50 pb-6 pt-6 px-6">
              <CardTitle className="text-xl md:text-2xl font-bold text-gray-900">Our Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              <div className="flex items-start">
                <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-3 rounded-xl mr-4 flex-shrink-0">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Address:</h3>
                  <p className="text-gray-600">
                    Uttarmundamuhan, Odisha 752054
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-3 rounded-xl mr-4 flex-shrink-0">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Phone:</h3>
                  <a href="tel:7377899573" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">7377899573 / 8260872515</a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-3 rounded-xl mr-4 flex-shrink-0">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email:</h3>
                  <a href="mailto:saiadityabehera@bharatsolarsolution.com" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                    saiadityabehera@bharatsolarsolution.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-3 rounded-xl mr-4 flex-shrink-0">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">WhatsApp:</h3>
                  <a href="https://wa.me/7377899573" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                    Chat with us on WhatsApp
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 rounded-3xl bg-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-orange-50 pb-6 pt-6 px-6">
              <CardTitle className="text-xl md:text-2xl flex items-center font-bold text-gray-900">
                <MapPin className="h-6 w-6 text-blue-600 mr-2" /> Find Us On Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden" id="map-container">
                {/* Map will be rendered here by Leaflet */}
                {!mapInitialized && (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="bg-gradient-to-r from-blue-200 to-orange-200 border-2 border-dashed rounded-2xl w-16 h-16 mb-4" />
                      <div className="h-2 bg-blue-200 rounded w-32 mb-2"></div>
                      <div className="h-2 bg-orange-200 rounded w-48"></div>
                    </div>
                  </div>
                )}
              </div>
             
              {currentLocation && (
                <div className="mt-3 text-sm text-gray-600 font-medium">
                  Office Address: Uttarmundamuhan, Odisha 752054
                </div>
              )}
            </CardContent>
          </Card>

         
        </motion.div>
      </motion.div>
      
      {/* Solar Energy Contact CTA */}
      <motion.div 
        className="mt-16 bg-gradient-to-br from-blue-900 via-blue-800 to-orange-700 rounded-3xl p-10 md:p-12 text-white text-center shadow-2xl overflow-hidden relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-400 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready for Solar Solutions?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Contact Bharat Solar Solution today for a free solar consultation and energy assessment. 
            Let us help you harness the power of the sun for a sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Phone className="h-5 w-5 mr-2" /> Call Now: 7377899573
            </Button>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <a href="https://wa.me/7377899573" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" /> Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
    </>
  );
};

export default ContactUsPage;