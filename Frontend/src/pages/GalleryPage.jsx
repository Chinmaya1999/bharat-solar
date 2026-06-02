import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Video, MapPin } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.1 } },
};

const itemVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100 } },
};

const GalleryPage = () => {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.bharatsolarsolution.com/api/gallery');
      
      if (!response.ok) {
        throw new Error('Failed to fetch gallery items');
      }
      
      const data = await response.json();
      setProjects(data.galleryItems || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching gallery items:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(p => filter === 'All' || p.category === filter);

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Solar <span className="gradient-text">Installation Gallery</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Loading our professional solar panel installations...
          </p>
          <div className="mt-8 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Solar <span className="gradient-text">Installation Gallery</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Error loading gallery: {error}
          </p>
          <button 
            onClick={fetchGalleryItems}
            className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <motion.section
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Solar <span className="gradient-text">Installation Gallery</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore our professional solar panel installations across Odisha
        </p>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {['All', 'Residential', 'Commercial', 'Industrial', 'Installation Process', 'Before & After', 'Testimonials', 'Battery Systems'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.section>
      
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        {filteredProjects.map((project) => (
          <motion.div key={project._id} variants={itemVariants}>
            <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative aspect-video bg-muted">
                <img  
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  alt={project.alt || project.title}
                  src={`https://api.bharatsolarsolution.com/uploads/${project.imageUrl.split('/').pop()}`}
                 
                />
                <div className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full">
                  {project.type === 'photo' ? <Camera size={20} /> : <Video size={20} />}
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-white font-semibold text-lg truncate">{project.title}</h3>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin size={16} className="mr-2 text-primary" />
                  <span>{project.location}</span>
                </div>
                <p className="text-sm text-accent font-medium mt-1">{project.category}</p>
                {project.description && (
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{project.description}</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredProjects.length === 0 && !loading && (
        <p className="text-center text-muted-foreground mt-12 text-lg">
          No projects found for this category. More coming soon!
        </p>
      )}

      <motion.p 
        className="text-center text-muted-foreground mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: filteredProjects.length * 0.1 + 0.5, duration: 0.5 }}
      >
        We are constantly adding new solar installation projects. Check back soon for more!
      </motion.p>
    </div>
  );
};

export default GalleryPage;