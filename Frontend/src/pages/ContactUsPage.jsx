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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch('http://localhost:3001/api/contact', {
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
          leafletJS.onload = () => {
            const L = window.L;
            if (L) {
              // Create the map centered on Khandagiri, Bhubaneswar
              const map = L.map('map-container').setView([20.265589, 85.784694], 16);
              
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
              L.marker([20.265589, 85.784694], {icon: customIcon})
                .addTo(map)
                .bindPopup('Bharat Solar Solution<br>Khandagiri, Bhubaneswar')
                .openPopup();
              
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <motion.section
        className="text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-yellow-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="h-12 w-12 text-amber-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Get In <span className="text-emerald-600">Touch</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
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
          <Card className="shadow-xl glassmorphic">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl flex items-center">
                <Send className="h-7 w-7 mr-3 text-primary" /> Contact Form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-foreground">Full Name</Label>
                  <Input id="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleChange} required className="mt-1 bg-background/70"/>
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground">Email Address</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" value={formData.email} onChange={handleChange} required className="mt-1 bg-background/70"/>
                </div>
                <div>
                  <Label htmlFor="phone" className="text-foreground">Phone Number (Optional)</Label>
                  <Input id="phone" type="tel" placeholder="(123) 456-7890" value={formData.phone} onChange={handleChange} className="mt-1 bg-background/70"/>
                </div>
                <div>
                  <Label htmlFor="message" className="text-foreground">Message</Label>
                  <Textarea id="message" placeholder="Your message here..." value={formData.message} onChange={handleChange} required rows={5} className="mt-1 bg-background/70"/>
                </div>
                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-emerald-600 to-yellow-400 hover:from-emerald-700 hover:to-yellow-500 text-white" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="space-y-8" variants={slideUp(0.2)}>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Our Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Address:</h3>
                  <p className="text-muted-foreground">
                    7Q39+8X9, Shreekhetra Vihar, Khandagiri, Bhubaneswar, Shankarpur, Odisha 751019
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Phone:</h3>
                  <a href="tel:7377899573" className="text-muted-foreground hover:text-emerald-600 transition-colors">7377899573</a>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Email:</h3>
                  <a href="mailto:saiadityabehera@bharatsolarsolution.com" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                    saiadityabehera@bharatsolarsolution.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <MessageCircle className="h-6 w-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">WhatsApp:</h3>
                  <a href="https://wa.me/7377899573" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                    Chat with us on WhatsApp
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl flex items-center">
                <MapPin className="h-6 w-6 text-emerald-600 mr-2" /> Find Us On Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden" id="map-container">
                {/* Map will be rendered here by Leaflet */}
                {!mapInitialized && (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-yellow-50">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="bg-emerald-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
                      <div className="h-2 bg-emerald-200 rounded w-32 mb-2"></div>
                      <div className="h-2 bg-emerald-200 rounded w-48"></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4 text-sm text-muted-foreground flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-emerald-600" />
                <span>Bharat Solar Solution, Khandagiri, Bhubaneswar</span>
              </div>
            </CardContent>
          </Card>

         
        </motion.div>
      </motion.div>
      
      {/* Solar Energy Contact CTA */}
      <motion.div 
        className="mt-16 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl p-8 text-white text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready for Solar Solutions?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Contact Bharat Solar Solution today for a free solar consultation and energy assessment. 
            Let us help you harness the power of the sun for a sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100 font-bold">
              <Phone className="h-5 w-5 mr-2" /> Call Now: 7377899573
            </Button>
            <Button size="lg" className="bg-yellow-400 text-emerald-900 hover:bg-yellow-500 font-bold">
              <div className="flex items-start">
                <div>
                  <h3 className="font-semibold text-foreground">WhatsApp:</h3>
                  <a href="https://wa.me/7377899573" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                    Chat with us on WhatsApp
                  </a>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUsPage;