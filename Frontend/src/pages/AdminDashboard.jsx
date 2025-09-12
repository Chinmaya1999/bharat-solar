// components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  Trash2, 
  Users, 
  Image as ImageIcon, 
  LogOut,
  Home,
  Menu,
  X,
  FileText,
  Briefcase,
  ShoppingCart,
  PenTool,
  UserPlus,
  Settings,
  Eye,
  Plus,
  Edit,
  Star,
  CheckCircle,
  Package,
  Search,
  ChevronUp,
  ChevronDown,
  Download,
  Clock,
  XCircle
} from 'lucide-react';

// Basic UI components
const Button = ({ children, onClick, className = '', type, disabled, variant, size = 'default' }) => {
  const baseStyle = 'px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const sizeStyle = size === 'sm' ? 'px-3 py-1 text-sm' : size === 'lg' ? 'px-6 py-3 text-lg' : '';
  const variantStyle = variant === 'outline' 
    ? 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500' 
    : variant === 'destructive'
    ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
    : variant === 'secondary'
    ? 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500'
    : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = '' }) => (
  <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-gray-600 mt-1 ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const Input = ({ type, placeholder, onChange, value, className = '', accept, id }) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    value={value}
    accept={accept}
    className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${className}`}
  />
);

const Textarea = ({ placeholder, onChange, value, className = '', rows = 3 }) => (
  <textarea
    placeholder={placeholder}
    onChange={onChange}
    value={value}
    rows={rows}
    className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${className}`}
  />
);

const Table = ({ children, className = '' }) => (
  <div className="overflow-x-auto">
    <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
      {children}
    </table>
  </div>
);

const TableHeader = ({ children }) => <thead className="bg-gray-50">{children}</thead>;
const TableBody = ({ children }) => <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>;
const TableRow = ({ children }) => <tr>{children}</tr>;
const TableHead = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);
const TableCell = ({ children, className = '' }) => (
  <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${className}`}>
    {children}
  </td>
);

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [images, setImages] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  
  // State for product management
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    category: 'residential',
    features: [''],
    specifications: {
      power: '',
      efficiency: '',
      dimensions: '',
      weight: ''
    },
    priceRange: '$$',
    rating: 4.0,
    alt: ''
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);

  // State for career management
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [showJobForm, setShowJobForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: [''],
    benefits: ['']
  });
  const [editingJob, setEditingJob] = useState(null);
  const [applicationFilters, setApplicationFilters] = useState({
    status: 'all',
    job: 'all',
    search: ''
  });
  const [expandedApplication, setExpandedApplication] = useState(null);

   // State for gallery management
  const [galleryItems, setGalleryItems] = useState([]);
  const [newGalleryItem, setNewGalleryItem] = useState({
    title: '',
    description: '',
    category: 'Residential',
    location: '',
    type: 'photo'
  });
  const [galleryFile, setGalleryFile] = useState(null);
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      fetchImages();
      fetchUsers();
      
      // Fetch products if on product section
      if (activeSection === 'product') {
        fetchProducts();
      }
      
      // Fetch jobs and applications if on career section
      if (activeSection === 'career') {
        fetchJobs();
        fetchApplications();
      }
      
      // Fetch gallery items if on gallery section
      if (activeSection === 'settings') {
        fetchGalleryItems();
      }
    }
  }, [activeSection]);

  // Add gallery functions
  const fetchGalleryItems = async () => {
    try {
      const response = await fetch('https://api.bharatsolarsolution.com/api/gallery');
      if (response.ok) {
        const data = await response.json();
        setGalleryItems(data.galleryItems || []);
      }
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    }
  };

  const handleGalleryUpload = (e) => {
    setGalleryFile(e.target.files[0]);
  };

  const uploadGalleryItem = async () => {
    if (!galleryFile) {
      alert('Please select a file');
      return;
    }

    setUploading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('media', galleryFile);
      formData.append('title', newGalleryItem.title);
      formData.append('description', newGalleryItem.description);
      formData.append('category', newGalleryItem.category);
      formData.append('location', newGalleryItem.location);
      formData.append('type', newGalleryItem.type);

      const endpoint = editingGalleryItem 
        ? `https://api.bharatsolarsolution.com/api/gallery/${editingGalleryItem._id}`
        : 'https://api.bharatsolarsolution.com/api/gallery';

      const response = await fetch(endpoint, {
        method: editingGalleryItem ? 'PUT' : 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (response.ok) {
        alert(`Gallery item ${editingGalleryItem ? 'updated' : 'created'} successfully`);
        resetGalleryForm();
        fetchGalleryItems();
      } else {
        alert('Operation failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Operation error');
    } finally {
      setUploading(false);
    }
  };

  const deleteGalleryItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://api.bharatsolarsolution.com/api/gallery/${id}/hard`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        alert('Gallery item deleted successfully');
        fetchGalleryItems();
      } else {
        alert('Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Delete error');
    }
  };

  const resetGalleryForm = () => {
    setNewGalleryItem({
      title: '',
      description: '',
      category: 'Residential',
      location: '',
      type: 'photo'
    });
    setGalleryFile(null);
    setEditingGalleryItem(null);
    setShowGalleryForm(false);
    if (document.getElementById('gallery-file-input')) {
      document.getElementById('gallery-file-input').value = '';
    }
  };

  const editGalleryItem = (item) => {
    setEditingGalleryItem(item);
    setNewGalleryItem({
      title: item.title,
      description: item.description,
      category: item.category,
      location: item.location,
      type: item.type
    });
    setShowGalleryForm(true);
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      fetchImages();
      fetchUsers();
      
      // Fetch products if on product section
      if (activeSection === 'product') {
        fetchProducts();
      }
      
      // Fetch jobs and applications if on career section
      if (activeSection === 'career') {
        fetchJobs();
        fetchApplications();
      }
    }
  }, [activeSection]);

  // Add these career management functions
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('https://api.bharatsolarsolution.com/api/jobs', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('https://api.bharatsolarsolution.com/api/applications', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const createOrUpdateJob = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const endpoint = editingJob 
        ? `https://api.bharatsolarsolution.com/api/jobs/${editingJob._id}`
        : 'https://api.bharatsolarsolution.com/api/jobs';
      
      const method = editingJob ? 'PUT' : 'POST';
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...newJob,
          requirements: newJob.requirements.filter(r => r.trim() !== ''),
          benefits: newJob.benefits.filter(b => b.trim() !== '')
        })
      });
      
      if (response.ok) {
        alert(`Job ${editingJob ? 'updated' : 'created'} successfully`);
        resetJobForm();
        fetchJobs();
      } else {
        alert('Operation failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Operation error');
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://api.bharatsolarsolution.com/api/jobs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        alert('Job deleted successfully');
        fetchJobs();
      } else {
        alert('Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Delete error');
    }
  };

  const updateApplicationStatus = async (applicationId, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://api.bharatsolarsolution.com/api/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      
      if (response.ok) {
        alert('Application status updated successfully');
        fetchApplications();
      } else {
        alert('Update failed');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Update error');
    }
  };

  const resetJobForm = () => {
    setNewJob({
      title: '',
      department: '',
      location: '',
      type: 'Full-time',
      description: '',
      requirements: [''],
      benefits: ['']
    });
    setEditingJob(null);
    setShowJobForm(false);
  };

  const addRequirement = () => {
    setNewJob({
      ...newJob,
      requirements: [...newJob.requirements, '']
    });
  };

  const removeRequirement = (index) => {
    const newRequirements = newJob.requirements.filter((_, i) => i !== index);
    setNewJob({
      ...newJob,
      requirements: newRequirements
    });
  };

  const updateRequirement = (index, value) => {
    const newRequirements = [...newJob.requirements];
    newRequirements[index] = value;
    setNewJob({
      ...newJob,
      requirements: newRequirements
    });
  };

  const addBenefit = () => {
    setNewJob({
      ...newJob,
      benefits: [...newJob.benefits, '']
    });
  };

  const removeBenefit = (index) => {
    const newBenefits = newJob.benefits.filter((_, i) => i !== index);
    setNewJob({
      ...newJob,
      benefits: newBenefits
    });
  };

  const updateBenefit = (index, value) => {
    const newBenefits = [...newJob.benefits];
    newBenefits[index] = value;
    setNewJob({
      ...newJob,
      benefits: newBenefits
    });
  };

  const editJob = (job) => {
    setEditingJob(job);
    setNewJob({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: [...job.requirements],
      benefits: [...job.benefits]
    });
    setShowJobForm(true);
  };

  const toggleApplicationExpand = (applicationId) => {
    if (expandedApplication === applicationId) {
      setExpandedApplication(null);
    } else {
      setExpandedApplication(applicationId);
    }
  };

  const downloadResume = (resumePath) => {
    window.open(`https://api.bharatsolarsolution.com/${resumePath}`, '_blank');
  };

  // Filter applications based on filters
  const filteredApplications = applications.filter(application => {
    const matchesStatus = applicationFilters.status === 'all' || application.status === applicationFilters.status;
    const matchesJob = applicationFilters.job === 'all' || application.jobId._id === applicationFilters.job;
    const matchesSearch = applicationFilters.search === '' || 
      application.name.toLowerCase().includes(applicationFilters.search.toLowerCase()) ||
      application.email.toLowerCase().includes(applicationFilters.search.toLowerCase());
    
    return matchesStatus && matchesJob && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Submitted': { color: 'bg-blue-100 text-blue-800', icon: <Clock size={14} /> },
      'Under Review': { color: 'bg-yellow-100 text-yellow-800', icon: <Eye size={14} /> },
      'Rejected': { color: 'bg-red-100 text-red-800', icon: <XCircle size={14} /> },
      'Accepted': { color: 'bg-green-100 text-green-800', icon: <CheckCircle size={14} /> }
    };
    
    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', icon: null };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon && <span className="mr-1">{config.icon}</span>}
        {status}
      </span>
    );
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.bharatsolarsolution.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminToken', data.token);
        setIsLoggedIn(true);
        fetchImages();
        fetchUsers();
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login error');
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setImages([]);
    setUsers([]);
    setProducts([]);
  };

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('https://api.bharatsolarsolution.com/api/images', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('https://api.bharatsolarsolution.com/api/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('https://api.bharatsolarsolution.com/api/products', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleFileUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!selectedFile) return;
    
    setUploading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      const response = await fetch('https://api.bharatsolarsolution.com/api/images/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      
      if (response.ok) {
        alert('Image uploaded successfully');
        setSelectedFile(null);
        document.getElementById('file-input').value = '';
        fetchImages();
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload error');
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://api.bharatsolarsolution.com/api/images/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        alert('Image deleted successfully');
        fetchImages();
      } else {
        alert('Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Delete error');
    }
  };

  const uploadProduct = async () => {
    if (!selectedFile) {
      alert('Please select an image for the product');
      return;
    }
    
    setUploading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('title', newProduct.title);
      formData.append('description', newProduct.description);
      formData.append('category', newProduct.category);
      formData.append('features', JSON.stringify(newProduct.features.filter(f => f.trim() !== '')));
      formData.append('specifications', JSON.stringify(newProduct.specifications));
      formData.append('priceRange', newProduct.priceRange);
      formData.append('rating', newProduct.rating.toString());
      formData.append('alt', newProduct.alt);
      
      const endpoint = editingProduct 
        ? `https://api.bharatsolarsolution.com/api/products/${editingProduct._id}`
        : 'https://api.bharatsolarsolution.com/api/products';
      
      const response = await fetch(endpoint, {
        method: editingProduct ? 'PUT' : 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      
      if (response.ok) {
        alert(`Product ${editingProduct ? 'updated' : 'created'} successfully`);
        resetProductForm();
        fetchProducts();
      } else {
        alert('Operation failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Operation error');
    } finally {
      setUploading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://api.bharatsolarsolution.com/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        alert('Product deleted successfully');
        fetchProducts();
      } else {
        alert('Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Delete error');
    }
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      title: product.title,
      description: product.description,
      category: product.category,
      features: [...product.features],
      specifications: { ...product.specifications },
      priceRange: product.priceRange,
      rating: product.rating,
      alt: product.alt
    });
    setShowProductForm(true);
  };

  const resetProductForm = () => {
    setNewProduct({
      title: '',
      description: '',
      category: 'residential',
      features: [''],
      specifications: {
        power: '',
        efficiency: '',
        dimensions: '',
        weight: ''
      },
      priceRange: '$$',
      rating: 4.0,
      alt: ''
    });
    setEditingProduct(null);
    setSelectedFile(null);
    setShowProductForm(false);
    if (document.getElementById('product-file-input')) {
      document.getElementById('product-file-input').value = '';
    }
  };

  const addFeature = () => {
    setNewProduct({
      ...newProduct,
      features: [...newProduct.features, '']
    });
  };

  const removeFeature = (index) => {
    const newFeatures = newProduct.features.filter((_, i) => i !== index);
    setNewProduct({
      ...newProduct,
      features: newFeatures
    });
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...newProduct.features];
    newFeatures[index] = value;
    setNewProduct({
      ...newProduct,
      features: newFeatures
    });
  };

  const updateSpecification = (field, value) => {
    setNewProduct({
      ...newProduct,
      specifications: {
        ...newProduct.specifications,
        [field]: value
      }
    });
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={18} /> },
    { id: 'product', label: 'Products', icon: <ShoppingCart size={18} /> },
    { id: 'about', label: 'About', icon: <FileText size={18} /> },
    { id: 'service', label: 'Services', icon: <Briefcase size={18} /> },
    { id: 'blog', label: 'Blog', icon: <PenTool size={18} /> },
    { id: 'career', label: 'Career', icon: <UserPlus size={18} /> },
    { id: 'settings', label: 'Gallery', icon: <ImageIcon size={18} /> },
  ];

  const renderSectionContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Upload Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="mr-2 h-5 w-5" /> Upload Image
                  </CardTitle>
                  <CardDescription>Add new images to the homepage slider</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input
                      id="file-input"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                    <Button 
                      onClick={uploadImage} 
                      disabled={!selectedFile || uploading}
                      className="w-full"
                    >
                      {uploading ? 'Uploading...' : 'Upload Image'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                      <ImageIcon className="mx-auto h-8 w-8 text-blue-600" />
                      <p className="text-2xl font-bold mt-2">{images.length}</p>
                      <p className="text-sm">Total Images</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                      <Users className="mx-auto h-8 w-8 text-green-600" />
                      <p className="text-2xl font-bold mt-2">{users.length}</p>
                      <p className="text-sm">Total Users</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg text-center">
                      <Package className="mx-auto h-8 w-8 text-purple-600" />
                      <p className="text-2xl font-bold mt-2">{products.length}</p>
                      <p className="text-sm">Total Products</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Images Table */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Uploaded Images</CardTitle>
                <CardDescription>Manage images for the homepage slider</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Preview</TableHead>
                      <TableHead>Filename</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Uploaded At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {images.map((image) => (
                      <TableRow key={image._id}>
                        <TableCell>
                          <img 
                            src={`https://api.bharatsolarsolution.com/${image.path}`} 
                            alt={image.originalName} 
                            className="h-10 w-16 object-cover rounded"
                          />
                        </TableCell>
                        <TableCell>{image.originalName}</TableCell>
                        <TableCell>{(image.size / 1024 / 1024).toFixed(2)} MB</TableCell>
                        <TableCell>{new Date(image.uploadedAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteImage(image._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View all registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.role === 'admin' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        );
      
      case 'product':
        return (
          <>
            {!showProductForm ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Product Management</h2>
                  <Button onClick={() => setShowProductForm(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New Product
                  </Button>
                </div>

                {/* Products Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>All Products</CardTitle>
                    <CardDescription>Manage your solar products inventory</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Image</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Price Range</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map((product) => (
                          <TableRow key={product._id}>
                            <TableCell>
                              <img 
                                src={`https://api.bharatsolarsolution.com/${product.image}`} 
                                alt={product.alt} 
                                className="h-10 w-16 object-cover rounded"
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
                                }}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{product.title}</TableCell>
                            <TableCell>
                              <span className="capitalize">{product.category}</span>
                            </TableCell>
                            <TableCell>
                              <span className="font-medium">{product.priceRange}</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                <span>{product.rating}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => editProduct(product)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => deleteProduct(product._id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <Button variant="outline" onClick={resetProductForm}>
                    ← Back to Products
                  </Button>
                </div>

                {/* Product Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                      {editingProduct ? 'Update the product information' : 'Fill in the details for the new product'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Product Title *</label>
                          <Input
                            type="text"
                            placeholder="e.g., Monocrystalline Solar Panel"
                            value={newProduct.title}
                            onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                          <select
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="residential">Residential</option>
                            <option value="commercial">Commercial</option>
                            <option value="industrial">Water Pumps</option>
                            <option value="specialized">Street Lights</option>
                            <option value="accessories">Inverters</option>
                            <option value="accessories">Heaters</option>
                            <option value="accessories">CEV Chargers</option>

                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                        <Textarea
                          placeholder="Describe the product features and benefits..."
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                          rows={3}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                        {newProduct.features.map((feature, index) => (
                          <div key={index} className="flex items-center mb-2">
                            <Input
                              type="text"
                              placeholder={`Feature ${index + 1}`}
                              value={feature}
                              onChange={(e) => updateFeature(index, e.target.value)}
                              className="flex-1"
                            />
                            {newProduct.features.length > 1 && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => removeFeature(index)}
                                className="ml-2"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={addFeature} className="mt-2">
                          <Plus className="h-4 w-4 mr-1" /> Add Feature
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Power Output *</label>
                          <Input
                            type="text"
                            placeholder="e.g., 370W - 450W"
                            value={newProduct.specifications.power}
                            onChange={(e) => updateSpecification('power', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Efficiency *</label>
                          <Input
                            type="text"
                            placeholder="e.g., Up to 22.8%"
                            value={newProduct.specifications.efficiency}
                            onChange={(e) => updateSpecification('efficiency', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions *</label>
                          <Input
                            type="text"
                            placeholder="e.g., 68.5 × 40.9 × 1.4 in"
                            value={newProduct.specifications.dimensions}
                            onChange={(e) => updateSpecification('dimensions', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Weight *</label>
                          <Input
                            type="text"
                            placeholder="e.g., 41.9 lbs"
                            value={newProduct.specifications.weight}
                            onChange={(e) => updateSpecification('weight', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range *</label>
                          <select
                            value={newProduct.priceRange}
                            onChange={(e) => setNewProduct({...newProduct, priceRange: e.target.value})}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="$">$ (Budget)</option>
                            <option value="$$">$$ (Moderate)</option>
                            <option value="$$$">$$$ (Premium)</option>
                            <option value="$$$$">$$$$ (Luxury)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Rating *</label>
                          <Input
                            type="number"
                            min="0"
                            max="5"
                            step="0.1"
                            placeholder="4.0"
                            value={newProduct.rating}
                            onChange={(e) => setNewProduct({...newProduct, rating: parseFloat(e.target.value)})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Image Alt Text *</label>
                          <Input
                            type="text"
                            placeholder="Description for accessibility"
                            value={newProduct.alt}
                            onChange={(e) => setNewProduct({...newProduct, alt: e.target.value})}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Image *</label>
                        <Input
                          id="product-file-input"
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                        />
                        {editingProduct && !selectedFile && (
                          <p className="text-sm text-gray-500 mt-1">
                            Current image will be kept if no new file is selected
                          </p>
                        )}
                      </div>

                      <div className="flex justify-end space-x-4">
                        <Button variant="outline" onClick={resetProductForm}>
                          Cancel
                        </Button>
                        <Button 
                          onClick={uploadProduct}
                          disabled={uploading || !newProduct.title || !newProduct.description}
                        >
                          {uploading ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </>
        );
      
     case 'career':
  return (
    <>
      {!showJobForm ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Career Management</h2>
            <Button onClick={() => setShowJobForm(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add New Job
            </Button>
          </div>

          {/* Jobs Table */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Job Openings</CardTitle>
              <CardDescription>Manage your job postings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job._id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.department}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>{job.type}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          job.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {job.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell>
                        {applications.filter(app => app.jobId && app.jobId._id === job._id).length}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => editJob(job)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteJob(job._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Applications Section */}
          <Card>
            <CardHeader>
              <CardTitle>Job Applications</CardTitle>
              <CardDescription>Review and manage job applications</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search by name or email..."
                      value={applicationFilters.search}
                      onChange={(e) => setApplicationFilters({...applicationFilters, search: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={applicationFilters.status}
                    onChange={(e) => setApplicationFilters({...applicationFilters, status: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Accepted">Accepted</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job</label>
                  <select
                    value={applicationFilters.job}
                    onChange={(e) => setApplicationFilters({...applicationFilters, job: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Jobs</option>
                    {jobs.map(job => (
                      <option key={job._id} value={job._id}>{job.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Applications List */}
              <div className="space-y-4">
                {filteredApplications.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No applications found</p>
                ) : (
                  filteredApplications.map((application) => (
                    <Card key={application._id} className="overflow-hidden">
                      <div 
                        className="p-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleApplicationExpand(application._id)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{application.name}</h4>
                            <p className="text-sm text-gray-600">{application.email} • {application.phone}</p>
                            <p className="text-sm mt-1">
                              Applied for: {application.jobId ? application.jobId.title : 'Job no longer exists'}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                            {getStatusBadge(application.status)}
                            {expandedApplication === application._id ? (
                              <ChevronUp className="h-5 w-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {expandedApplication === application._id && (
                        <div className="p-4 border-t border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                            <div>
                              <h5 className="font-medium mb-2">Application Details</h5>
                              <p><strong>Applied:</strong> {new Date(application.createdAt).toLocaleDateString()}</p>
                              <p><strong>Job:</strong> {application.jobId ? application.jobId.title : 'Job no longer exists'}</p>
                              <p><strong>Department:</strong> {application.jobId ? application.jobId.department : 'N/A'}</p>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">Contact Information</h5>
                              <p><strong>Email:</strong> {application.email}</p>
                              <p><strong>Phone:</strong> {application.phone}</p>
                            </div>
                          </div>
                          
                          {application.coverLetter && (
                            <div className="mb-4">
                              <h5 className="font-medium mb-2">Cover Letter</h5>
                              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{application.coverLetter}</p>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center">
                            <Button
                              variant="outline"
                              onClick={() => downloadResume(application.resume)}
                            >
                              <Download className="mr-2 h-4 w-4" /> Download Resume
                            </Button>
                            
                            <div className="flex space-x-2">
                              <Button
                                variant={application.status === 'Rejected' ? 'destructive' : 'outline'}
                                size="sm"
                                onClick={() => updateApplicationStatus(application._id, 'Rejected')}
                              >
                                Reject
                              </Button>
                              <Button
                                variant={application.status === 'Under Review' ? 'secondary' : 'outline'}
                                size="sm"
                                onClick={() => updateApplicationStatus(application._id, 'Under Review')}
                              >
                                Review
                              </Button>
                              <Button
                                variant={application.status === 'Accepted' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => updateApplicationStatus(application._id, 'Accepted')}
                              >
                                Accept
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {editingJob ? 'Edit Job' : 'Add New Job'}
            </h2>
            <Button variant="outline" onClick={resetJobForm}>
              ← Back to Jobs
            </Button>
          </div>

          {/* Job Form */}
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>
                {editingJob ? 'Update the job information' : 'Fill in the details for the new job opening'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                    <Input
                      type="text"
                      placeholder="e.g., Solar Installation Technician"
                      value={newJob.title}
                      onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                    <Input
                      type="text"
                      placeholder="e.g., Installation"
                      value={newJob.department}
                      onChange={(e) => setNewJob({...newJob, department: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                    <Input
                      type="text"
                      placeholder="e.g., San Francisco, CA"
                      value={newJob.location}
                      onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type *</label>
                    <select
                      value={newJob.type}
                      onChange={(e) => setNewJob({...newJob, type: e.target.value})}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
                  <Textarea
                    placeholder="Describe the role, responsibilities, and expectations..."
                    value={newJob.description}
                    onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                  {newJob.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <Input
                        type="text"
                        placeholder={`Requirement ${index + 1}`}
                        value={requirement}
                        onChange={(e) => updateRequirement(index, e.target.value)}
                        className="flex-1"
                      />
                      {newJob.requirements.length > 1 && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeRequirement(index)}
                          className="ml-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addRequirement} className="mt-2">
                    <Plus className="h-4 w-4 mr-1" /> Add Requirement
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
                  {newJob.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <Input
                        type="text"
                        placeholder={`Benefit ${index + 1}`}
                        value={benefit}
                        onChange={(e) => updateBenefit(index, e.target.value)}
                        className="flex-1"
                      />
                      {newJob.benefits.length > 1 && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeBenefit(index)}
                          className="ml-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addBenefit} className="mt-2">
                    <Plus className="h-4 w-4 mr-1" /> Add Benefit
                  </Button>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={resetJobForm}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={createOrUpdateJob}
                    disabled={!newJob.title || !newJob.department || !newJob.location || !newJob.description}
                  >
                    {editingJob ? 'Update Job' : 'Create Job'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
      
  case 'settings':
    return (
      <>
        {!showGalleryForm ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gallery Management</h2>
              <Button onClick={() => setShowGalleryForm(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add New Item
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Gallery Items</CardTitle>
                <CardDescription>Manage your gallery photos and videos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galleryItems.map((item) => (
                    <div key={item._id} className="border rounded-lg overflow-hidden">
                      <div className="relative aspect-video bg-gray-200">
                        {item.type === 'photo' ? (
                          <img 
                            src={`https://api.bharatsolarsolution.com${item.imageUrl}`} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <span className="text-gray-500">Video File</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.category} • {item.location}</p>
                        <p className="text-sm mt-1 line-clamp-2">{item.description}</p>
                        <div className="flex justify-end space-x-2 mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => editGalleryItem(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteGalleryItem(item._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {editingGalleryItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
              </h2>
              <Button variant="outline" onClick={resetGalleryForm}>
                ← Back to Gallery
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Gallery Item Details</CardTitle>
                <CardDescription>
                  {editingGalleryItem ? 'Update the gallery item' : 'Add a new photo or video to your gallery'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                      <Input
                        type="text"
                        placeholder="e.g., Solar Installation Project"
                        value={newGalleryItem.title}
                        onChange={(e) => setNewGalleryItem({...newGalleryItem, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                      <select
                        value={newGalleryItem.category}
                        onChange={(e) => setNewGalleryItem({...newGalleryItem, category: e.target.value})}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Installation Process">Installation Process</option>
                        <option value="Before & After">Before & After</option>
                        <option value="Testimonials">Testimonials</option>
                        <option value="Battery Systems">Battery Systems</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                      <Input
                        type="text"
                        placeholder="e.g., San Francisco, CA"
                        value={newGalleryItem.location}
                        onChange={(e) => setNewGalleryItem({...newGalleryItem, location: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Media Type *</label>
                      <select
                        value={newGalleryItem.type}
                        onChange={(e) => setNewGalleryItem({...newGalleryItem, type: e.target.value})}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="photo">Photo</option>
                        <option value="video">Video</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <Textarea
                      placeholder="Describe this gallery item..."
                      value={newGalleryItem.description}
                      onChange={(e) => setNewGalleryItem({...newGalleryItem, description: e.target.value})}
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {newGalleryItem.type === 'photo' ? 'Image' : 'Video'} File *
                    </label>
                    <Input
                      id="gallery-file-input"
                      type="file"
                      accept={newGalleryItem.type === 'photo' ? 'image/*' : 'video/*'}
                      onChange={handleGalleryUpload}
                    />
                    {editingGalleryItem && !galleryFile && (
                      <p className="text-sm text-gray-500 mt-1">
                        Current file will be kept if no new file is selected
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button variant="outline" onClick={resetGalleryForm}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={uploadGalleryItem}
                      disabled={uploading || !newGalleryItem.title || !newGalleryItem.location || (!galleryFile && !editingGalleryItem)}
                    >
                      {uploading ? 'Saving...' : editingGalleryItem ? 'Update Item' : 'Add to Gallery'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </>
    );
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-white to-blue-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to access your dashboard
          </p>
        </div>
    
        <form className="mt-6 space-y-5" onSubmit={login}>
          <div className="space-y-4">
            <Input
              id="username"
              name="username"
              type="text"
              required
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
    
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              Remember me
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>
    
          <Button
            type="submit"
            className="w-full py-3 text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-200"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
    
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white transition-all duration-300 ease-in-out overflow-hidden`}>
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {sidebarOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-md"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
        
        <nav className="mt-6">
          <ul>
            {menuItems.map((item) => (
              <li key={item.id} className="px-4 py-2">
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center p-2 rounded-md transition-colors ${
                    activeSection === item.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Management
            </h1>
            <Button onClick={logout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </header>

        <main className="p-6">
          {renderSectionContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;