
import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.1 } },
};

const slideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
});

const faqData = [
  {
    question: "How long do solar panels last?",
    answer: "Our high-quality solar panels typically have a lifespan of 25 to 30 years. Most manufacturers offer a performance warranty for 25 years, guaranteeing a certain percentage of output.",
  },
  {
    question: "Do you provide EMI or financing options?",
    answer: "Yes, we offer flexible financing options and EMI plans through our financial partners to make solar energy more accessible. Please contact us for more details on available plans.",
  },
  {
    question: "Can I run my home 100% on solar?",
    answer: "It's possible to run your home entirely on solar, especially with a well-sized system and battery storage. However, this depends on your energy consumption, system size, local climate, and whether you choose an off-grid or grid-tied system with backup.",
  },
  {
    question: "What maintenance do solar panels require?",
    answer: "Solar panels are generally low maintenance. Occasional cleaning to remove dust or debris is recommended, especially in dusty areas. We also offer Annual Maintenance Contracts (AMCs) for regular check-ups and professional cleaning.",
  },
  {
    question: "How much can I save on my electricity bills?",
    answer: "Savings vary based on your energy usage, system size, local electricity rates, and sunlight exposure. Many customers see significant reductions, often between 50% to 90% or even complete elimination of their bills.",
  },
  {
    question: "What happens during a power outage if I have solar panels?",
    answer: "If you have a grid-tied system without battery storage, your system will automatically shut down during a power outage for safety reasons. With a battery storage system or a hybrid inverter, you can continue to power your home during outages.",
  },
];

const FaqsPage = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <motion.section
        className="text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about solar energy, our products, and services.
        </p>
      </motion.section>

      <motion.div
        className="max-w-3xl mx-auto"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
            <motion.div key={index} variants={slideUp(index * 0.1)}>
              <AccordionItem value={`item-${index}`} className="mb-4 border-b border-border last:border-b-0 bg-card shadow-sm rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 text-left text-lg font-medium hover:bg-muted/50 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-0 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>

      <motion.section
        className="text-center mt-16 md:mt-24 py-12 bg-secondary/10 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: faqData.length * 0.1 + 0.5, duration: 0.5 }}
      >
        <MessageSquare className="h-12 w-12 text-secondary mx-auto mb-4" />
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Still Have Questions?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          If you can't find the answer you're looking for, don't hesitate to reach out to our expert team. We're here to help!
        </p>
        <Link to="/contact">
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            Contact Us
          </Button>
        </Link>
      </motion.section>
    </div>
  );
};

export default FaqsPage;
