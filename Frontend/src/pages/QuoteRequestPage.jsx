
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Sun, DollarSign, Home, Zap, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Slider } from '@/components/ui/slider'; 

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.2 } },
};

const slideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

const QuoteRequestPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    location: '', // e.g. zip code
    roofSize: 50, // in sq meters, default
    monthlyBill: 100, // in currency units, default
    message: '',
  });
  const [estimatedSystem, setEstimatedSystem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSliderChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value[0] }));
  };
  
  const calculateEstimate = () => {
    // Simplified calculation logic
    const { roofSize, monthlyBill } = formData;
    const systemSizeKW = Math.min(roofSize / 10, monthlyBill / 20); // Very rough estimate
    const estimatedCost = systemSizeKW * 2500; // Rough cost per kW
    
    if (systemSizeKW <= 0) {
      setEstimatedSystem({
        recommendation: "Please provide valid roof size and/or electricity bill values.",
        priceEstimate: "N/A"
      });
      return;
    }

    setEstimatedSystem({
      recommendation: `Based on your inputs, we recommend a system of approximately ${systemSizeKW.toFixed(1)} kW.`,
      priceEstimate: `A system of this size could cost around $${estimatedCost.toLocaleString()}. This is a preliminary estimate.`
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    calculateEstimate(); // Calculate estimate before submitting

    // Simulate API call for form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Quote request data submitted:", { ...formData, estimatedSystem });
    toast({
      title: "Quote Request Sent!",
      description: "Thank you for your request. We'll review your details and get back to you with a more precise quote soon.",
      variant: "default",
    });
    // Optionally reset form or redirect
    // setFormData({ name: '', email: '', phone: '', address: '', location: '', roofSize: 50, monthlyBill: 100, message: '' });
    // setEstimatedSystem(null);
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <motion.section
        className="text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Zap className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Request a Free <span className="gradient-text">Solar Quote</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Fill out the form below to get a personalized solar energy system recommendation and a preliminary price estimate. Let's power your future!
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
                <Sun className="h-7 w-7 mr-3 text-primary" /> Your Details
              </CardTitle>
              <CardDescription>Provide some information to help us create your initial estimate.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleChange} required className="mt-1 bg-background/70"/>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" value={formData.email} onChange={handleChange} required className="mt-1 bg-background/70"/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="(123) 456-7890" value={formData.phone} onChange={handleChange} required className="mt-1 bg-background/70"/>
                    </div>
                    <div>
                        <Label htmlFor="location">Zip Code / Location</Label>
                        <Input id="location" type="text" placeholder="e.g., 90210" value={formData.location} onChange={handleChange} required className="mt-1 bg-background/70"/>
                    </div>
                </div>
                <div>
                  <Label htmlFor="address">Street Address (Optional)</Label>
                  <Input id="address" type="text" placeholder="123 Main St, Anytown" value={formData.address} onChange={handleChange} className="mt-1 bg-background/70"/>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="roofSize">Estimated Roof Size (sq meters): {formData.roofSize} m²</Label>
                  <Slider id="roofSize" defaultValue={[50]} max={500} step={10} onValueChange={(value) => handleSliderChange('roofSize', value)} className="mt-1"/>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="monthlyBill">Average Monthly Electricity Bill ($): ${formData.monthlyBill}</Label>
                  <Slider id="monthlyBill" defaultValue={[100]} max={1000} step={10} onValueChange={(value) => handleSliderChange('monthlyBill', value)} className="mt-1"/>
                </div>

                <div>
                  <Label htmlFor="message">Additional Information (Optional)</Label>
                  <Textarea id="message" placeholder="Tell us about your project, e.g., interested in batteries, specific roof type." value={formData.message} onChange={handleChange} rows={3} className="mt-1 bg-background/70"/>
                </div>
                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-yellow-400 hover:from-primary/90 hover:to-yellow-400/90 text-primary-foreground" disabled={isSubmitting}>
                  {isSubmitting ? 'Calculating & Submitting...' : 'Get My Estimate & Submit'} <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="space-y-8 sticky top-24" variants={slideUp(0.2)}>
          <Card className="shadow-lg bg-secondary/5 border-secondary/20">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl flex items-center">
                <DollarSign className="h-7 w-7 mr-3 text-secondary" /> Preliminary Estimate
              </CardTitle>
              <CardDescription>This is a rough estimate based on the provided information. A detailed site survey will provide a more accurate quote.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {estimatedSystem ? (
                <>
                  <div>
                    <h3 className="font-semibold text-foreground flex items-center"><Home className="h-5 w-5 mr-2 text-secondary"/> System Recommendation:</h3>
                    <p className="text-muted-foreground">{estimatedSystem.recommendation}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground flex items-center"><DollarSign className="h-5 w-5 mr-2 text-secondary"/> Price Estimate:</h3>
                    <p className="text-muted-foreground">{estimatedSystem.priceEstimate}</p>
                  </div>
                  <p className="text-xs text-muted-foreground/70 italic">Note: Prices can vary based on equipment choices, installation complexity, and available incentives.</p>
                </>
              ) : (
                <p className="text-muted-foreground">Fill out the form and submit to see your preliminary estimate here.</p>
              )}
            </CardContent>
            <CardFooter>
                <p className="text-sm text-muted-foreground">
                    We will contact you to schedule a detailed site survey for a final quotation.
                </p>
            </CardFooter>
          </Card>
          <div className="text-sm text-muted-foreground text-center p-4 border border-dashed rounded-lg">
             <p className="font-semibold">Your privacy is important to us.</p>
             <p>We will only use your information to provide you with a quote and discuss your solar needs.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default QuoteRequestPage;
