// src/components/BlogPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, Search, ChevronRight, Tag, ArrowRight, BookOpen } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
};

const slideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Blog categories
  const categories = [
    { name: "Solar Panels", count: 12 },
    { name: "Installation", count: 8 },
    { name: "Energy Savings", count: 15 },
    { name: "Government Schemes", count: 7 },
    { name: "Maintenance", count: 6 },
    { name: "Solar Technology", count: 10 },
  ];
  
  // Popular posts
  const popularPosts = [
    { 
      title: "How Solar Energy Can Cut Your Electricity Bill by 80%", 
      date: "May 15, 2025", 
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276" 
    },
    { 
      title: "Top 5 Solar Panel Brands in India for 2025", 
      date: "April 28, 2025", 
      image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d" 
    },
    { 
      title: "Understanding the PM Surya Ghar Muft Bijli Yojana", 
      date: "April 10, 2025", 
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09" 
    },
  ];
  
  // Blog posts
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Solar Energy in India: 2025 Outlook",
      excerpt: "Discover how India is rapidly becoming a global leader in solar energy adoption and what it means for homeowners and businesses.",
      date: "June 12, 2025",
      readTime: "8 min read",
      category: "Solar Technology",
      image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d",
      tags: ["solar trends", "renewable energy", "india"]
    },
    {
      id: 2,
      title: "How to Choose the Right Solar Panels for Your Home",
      excerpt: "A comprehensive guide to selecting the perfect solar panels based on your energy needs, roof type, and budget.",
      date: "June 5, 2025",
      readTime: "10 min read",
      category: "Solar Panels",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276",
      tags: ["solar panels", "home solar", "selection guide"]
    },
    {
      id: 3,
      title: "Odisha Solar Subsidy Guide: Save Up to ₹1 Lakh on Installation",
      excerpt: "Everything you need to know about the latest solar subsidies available in Odisha and how to apply for them.",
      date: "May 28, 2025",
      readTime: "6 min read",
      category: "Government Schemes",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
      tags: ["subsidy", "odisha", "solar incentives"]
    },
    {
      id: 4,
      title: "Solar Battery Storage Solutions: Power Your Home 24/7",
      excerpt: "Learn how solar batteries can help you store excess energy and become completely independent from the grid.",
      date: "May 20, 2025",
      readTime: "7 min read",
      category: "Solar Technology",
      image: "https://images.unsplash.com/photo-1598880940080-ff9b29802552",
      tags: ["battery storage", "energy independence", "off-grid"]
    },
    {
      id: 5,
      title: "Maintaining Your Solar System: A Seasonal Checklist",
      excerpt: "Keep your solar panels performing at peak efficiency with our comprehensive maintenance guide.",
      date: "May 10, 2025",
      readTime: "5 min read",
      category: "Maintenance",
      image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d",
      tags: ["maintenance", "solar care", "efficiency"]
    },
    {
      id: 6,
      title: "Commercial Solar Solutions: Cutting Business Energy Costs",
      excerpt: "How businesses across Odisha are saving lakhs annually by switching to solar energy solutions.",
      date: "April 25, 2025",
      readTime: "9 min read",
      category: "Energy Savings",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276",
      tags: ["commercial solar", "business savings", "ROI"]
    },
  ];
  
  // Filter posts based on search
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-emerald-700 to-teal-600 text-white py-20 md:py-28">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1613665813446-82a78c468a1d')] bg-cover"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            variants={fadeIn}
            initial="initial"
            animate="animate"
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              variants={slideUp(0)}
            >
              Solar <span className="text-yellow-300">Insights</span> & Knowledge
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-10"
              variants={slideUp(0.2)}
            >
              Stay updated with the latest solar trends, technologies, and tips from Bharat Solar Solution
            </motion.p>
            
            <motion.div 
              className="relative max-w-2xl mx-auto"
              variants={slideUp(0.4)}
            >
              <Input 
                type="text" 
                placeholder="Search solar topics, guides, or trends..." 
                className="w-full py-6 pl-14 pr-10 rounded-full text-lg border-0 shadow-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-6 py-5">
                Search
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Blog Posts */}
          <div className="lg:w-2/3">
            <motion.div 
              className="mb-12"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center">
                <BookOpen className="h-8 w-8 mr-3 text-emerald-600" />
                Latest Solar Insights
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div 
                    key={post.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    variants={slideUp(0.1 * index)}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                        <div className="flex items-center ml-4 text-gray-500">
                          <CalendarDays className="h-4 w-4 mr-1" />
                          <span className="text-sm">{post.date}</span>
                        </div>
                        <div className="flex items-center ml-4 text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="text-sm">{post.readTime}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-800 hover:text-emerald-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-5">
                        {post.tags.map((tag, i) => (
                          <span 
                            key={i} 
                            className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm flex items-center"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <Button className="group flex items-center font-medium text-emerald-600 hover:text-emerald-800">
                        Read More 
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold mb-2">No posts found</h3>
                  <p className="text-gray-600">
                    We couldn't find any posts matching your search. Try a different keyword.
                  </p>
                </div>
              )}
              
              <div className="mt-12 flex justify-center">
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white px-8 py-6 rounded-full text-lg font-medium">
                  Load More Articles
                </Button>
              </div>
            </motion.div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <motion.div
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-8"
            >
              {/* Categories */}
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-6"
                variants={slideUp(0.2)}
              >
                <h3 className="text-xl font-bold mb-4 pb-3 border-b border-gray-200 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-emerald-600" />
                  Solar Topics
                </h3>
                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <div 
                      key={index}
                      className="flex justify-between items-center p-3 rounded-lg hover:bg-emerald-50 transition-colors group"
                    >
                      <span className="font-medium text-gray-700 group-hover:text-emerald-600">
                        {category.name}
                      </span>
                      <span className="bg-gray-100 text-gray-800 rounded-full px-2.5 py-0.5 text-sm font-medium">
                        {category.count}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Popular Posts */}
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-6"
                variants={slideUp(0.3)}
              >
                <h3 className="text-xl font-bold mb-4 pb-3 border-b border-gray-200 flex items-center">
                  <ArrowRight className="h-5 w-5 mr-2 text-emerald-600" />
                  Popular Solar Reads
                </h3>
                <div className="space-y-5">
                  {popularPosts.map((post, index) => (
                    <div 
                      key={index}
                      className="flex gap-4 group"
                    >
                      <div className="flex-shrink-0">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">{post.date}</p>
                        <h4 className="font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">
                          {post.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Newsletter */}
              <motion.div 
                className="bg-gradient-to-br from-emerald-600 to-teal-500 rounded-xl p-6 text-white"
                variants={slideUp(0.4)}
              >
                <div className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Solar Insights Newsletter</h3>
                <p className="mb-4 opacity-90">
                  Get the latest solar trends, tips, and exclusive offers delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <Input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full py-4 bg-white/20 border-white/30 text-white placeholder-white/70"
                  />
                  <Button className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-emerald-900 hover:from-yellow-500 hover:to-amber-600 py-5 font-bold">
                    Subscribe Now
                  </Button>
                </div>
              </motion.div>
              
              {/* Solar Quote */}
              <motion.div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white text-center"
                variants={slideUp(0.5)}
              >
                <h3 className="text-xl font-bold mb-4">Get Your Solar Quote</h3>
                <p className="mb-5 opacity-90">
                  Ready to go solar? Get a free, no-obligation quote for your home or business.
                </p>
                <Button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-5 w-full">
                  Request Free Quote
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Solar Topics Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={slideUp(0)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              Explore Solar <span className="text-emerald-600">Topics</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600"
              variants={slideUp(0.2)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              Dive deeper into solar energy with our comprehensive guides
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { title: "Residential Solar", icon: "🏠", count: 24 },
              { title: "Commercial Solar", icon: "🏢", count: 18 },
              { title: "Solar Financing", icon: "💰", count: 15 },
              { title: "Solar Technology", icon: "🔬", count: 22 },
              { title: "Installation Guide", icon: "🔧", count: 12 },
              { title: "Maintenance Tips", icon: "🛠️", count: 9 },
              { title: "Govt. Subsidies", icon: "📜", count: 7 },
              { title: "Solar ROI", icon: "📈", count: 14 },
            ].map((topic, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1"
                variants={slideUp(0.1 * index)}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{topic.icon}</div>
                <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
                <p className="text-gray-600">{topic.count} articles</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;