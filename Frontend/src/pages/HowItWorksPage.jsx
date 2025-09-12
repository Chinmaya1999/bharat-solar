
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, FileText, Settings, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.2 } },
};

const slideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

const steps = [
  {
    id: 1,
    icon: Search,
    title: 'Site Survey & Consultation',
    description: 'Our experts visit your property to assess its solar potential, understand your energy needs, and discuss the best solutions for you. We analyze roof orientation, shading, and structural integrity.',
    image: 'Engineer performing a site survey on a rooftop',
    alt: 'Solar technician assessing a roof'
  },
  {
    id: 2,
    icon: FileText,
    title: 'Customized Quotation',
    description: 'Based on the site survey and your requirements, we provide a detailed, transparent quotation outlining the proposed system, costs, and projected savings. No hidden fees, complete clarity.',
    image: 'Detailed solar system quotation document',
    alt: 'A comprehensive quote for a solar installation'
  },
  {
    id: 3,
    icon: Settings,
    title: 'System Design & Approval',
    description: 'Our engineers design a bespoke solar system optimized for your property. We handle all necessary permits and approvals, ensuring a hassle-free process for you.',
    image: 'Blueprint of a solar panel system design',
    alt: 'Technical drawing of a solar panel layout'
  },
  {
    id: 4,
    icon: Users,
    title: 'Professional Installation',
    description: 'Our certified technicians install your solar panel system with precision and care, adhering to the highest safety and quality standards. We aim for minimal disruption to your daily routine.',
    image: 'Team of installers working on solar panel installation',
    alt: 'Solar installers fitting panels on a roof'
  },
  {
    id: 5,
    icon: CheckCircle,
    title: 'Activation & Ongoing Support',
    description: 'Once installed, we activate your system and guide you through its operation. We provide ongoing support, monitoring, and maintenance options to ensure long-term performance.',
    image: 'Homeowner smiling next to a newly activated solar system',
    alt: 'Happy customer with their new solar installation'
  },
];

const HowItWorksPage = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16">
      <motion.section
        className="text-center"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <motion.h1 className="text-4xl md:text-5xl font-extrabold mb-4" variants={slideUp(0)}>
          How It <span className="gradient-text">Works</span>
        </motion.h1>
        <motion.p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" variants={slideUp(0.2)}>
          Our streamlined process makes transitioning to solar energy simple and stress-free. Follow these easy steps to power your property with clean energy.
        </motion.p>
      </motion.section>

      <motion.section
        className="relative"
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Desktop Timeline Line */}
        <div className="hidden md:block absolute left-1/2 top-12 bottom-12 w-1 bg-border rounded-full transform -translate-x-1/2"></div>
        
        <div className="space-y-12 md:space-y-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="md:flex items-center w-full"
              variants={slideUp(index * 0.2)}
            >
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:order-2'}`}>
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
                  <img  className="w-full h-56 object-cover" alt={step.alt} src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <div className="bg-primary text-primary-foreground rounded-full p-3 mr-4">
                        <step.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-2xl">{step.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
              {/* Desktop Timeline Dot */}
              <div className="hidden md:flex md:w-12 items-center justify-center relative">
                <div className="h-6 w-6 rounded-full bg-primary border-4 border-background shadow-md z-10"></div>
              </div>
              {/* Spacer for Desktop */}
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8 md:order-1'}`}>
                 {/* This div can be empty or contain a visual element for alignment on desktop */}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="text-center py-12 bg-muted rounded-lg"
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 className="text-3xl font-bold mb-6" variants={slideUp(0)}>
          Ready to Start Your Solar Journey?
        </motion.h2>
        <motion.p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8" variants={slideUp(0.2)}>
          Take the first step towards energy independence and a sustainable future.
        </motion.p>
        <motion.div variants={slideUp(0.3)}>
          <Link to="/quote-request">
            <Button size="lg" className="bg-gradient-to-r from-primary to-yellow-400 hover:from-primary/90 hover:to-yellow-400/90 text-primary-foreground text-lg px-8 py-6">
              Get Your Free Quote Today
            </Button>
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default HowItWorksPage;
