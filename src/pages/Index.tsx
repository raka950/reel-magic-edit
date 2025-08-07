import React, { useEffect, useRef, useState } from 'react';
import { Play, Video, Clock, Music, MessageCircle, Upload, Download, Instagram, Youtube, Smartphone, Phone, Plane, Camera, MapPin, Star, Users, Heart, Send, LogIn, UserPlus, LogOut, Menu, X } from 'lucide-react';
import { AuthModal } from '@/components/AuthModal';
import { UploadModal } from '@/components/UploadModal';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut, loading } = useAuth();

  useEffect(() => {
    // Initialize intersection observer for animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe all animation elements
    const animationElements = document.querySelectorAll('.fade-in, .slide-up, .scale-in, .zoom-in, .slide-left, .slide-right');
    animationElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Toggle transparent nav on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); // set initial state
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleTelegramClick = () => {
    window.open('https://t.me/Rakesh4280', '_blank');
  };

  const handleSmoothScroll = (elementId: string) => {
    const element = document.getElementById(elementId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background font-body travel-bg">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-transparent supports-[backdrop-filter]:bg-white/5 backdrop-blur-xl border-b border-white/10 z-50">
        <div className={`container mx-auto px-6 py-3 rounded-3xl border backdrop-blur-xl transition-all duration-300 ${scrolled ? 'bg-transparent border-transparent shadow-none ring-0' : 'bg-white/10 border-white/20 shadow-glow ring-1 ring-white/10'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/6f31e6d2-0376-46d1-80d2-e44b44a2f13e.png" 
                alt="EditMyTrip Logo" 
                className="w-10 h-10"
              />
              <span className="text-xl font-bold text-adventure">EditMyTrip</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => handleSmoothScroll('about')} className="text-muted-foreground hover:text-sunset-orange transition-colors">About</button>
              <button onClick={() => handleSmoothScroll('services')} className="text-muted-foreground hover:text-sunset-orange transition-colors">Services</button>
              <button onClick={() => handleSmoothScroll('samples')} className="text-muted-foreground hover:text-sunset-orange transition-colors">Samples</button>
              <button onClick={() => handleSmoothScroll('testimonials')} className="text-muted-foreground hover:text-sunset-orange transition-colors">Reviews</button>
              
              {!loading && (
                <>
                  {user ? (
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setUploadModalOpen(true)}
                        className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Upload
                      </button>
                      <button 
                        onClick={signOut}
                        className="text-muted-foreground hover:text-sunset-orange transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => {
                          setAuthMode('signin');
                          setAuthModalOpen(true);
                        }}
                        className="text-muted-foreground hover:text-sunset-orange transition-colors flex items-center gap-2"
                      >
                        <LogIn className="w-4 h-4" />
                        Sign In
                      </button>
                      <button 
                        onClick={() => {
                          setAuthMode('signup');
                          setAuthModalOpen(true);
                        }}
                        className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center gap-2"
                      >
                        <UserPlus className="w-4 h-4" />
                        Sign Up
                      </button>
                    </div>
                  )}
                </>
              )}
              
              <a 
                href="/admin/dashboard" 
                className="text-xs text-muted-foreground hover:text-sunset-orange transition-colors border border-border px-3 py-1 rounded-md"
              >
                Admin Login
              </a>
              <button onClick={handleTelegramClick} className="btn-adventure text-sm">Get Started</button>
            </div>

            {/* Mobile Hamburger Button */}
            <button 
              className="md:hidden text-muted-foreground hover:text-sunset-orange transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="pt-4 pb-2 space-y-3">
              <button 
                onClick={() => {
                  handleSmoothScroll('about');
                  setMobileMenuOpen(false);
                }} 
                className="block w-full text-left text-muted-foreground hover:text-sunset-orange transition-colors py-2"
              >
                About
              </button>
              <button 
                onClick={() => {
                  handleSmoothScroll('services');
                  setMobileMenuOpen(false);
                }} 
                className="block w-full text-left text-muted-foreground hover:text-sunset-orange transition-colors py-2"
              >
                Services
              </button>
              <button 
                onClick={() => {
                  handleSmoothScroll('samples');
                  setMobileMenuOpen(false);
                }} 
                className="block w-full text-left text-muted-foreground hover:text-sunset-orange transition-colors py-2"
              >
                Samples
              </button>
              <button 
                onClick={() => {
                  handleSmoothScroll('testimonials');
                  setMobileMenuOpen(false);
                }} 
                className="block w-full text-left text-muted-foreground hover:text-sunset-orange transition-colors py-2"
              >
                Reviews
              </button>
              
              {!loading && (
                <div className="pt-2 border-t border-white/20">
                  {user ? (
                    <div className="space-y-3">
                      <button 
                        onClick={() => {
                          setUploadModalOpen(true);
                          setMobileMenuOpen(false);
                        }}
                        className="w-full bg-gradient-to-r from-primary to-secondary text-white px-4 py-3 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Upload
                      </button>
                      <button 
                        onClick={() => {
                          signOut();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-muted-foreground hover:text-sunset-orange transition-colors py-2 flex items-center justify-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <button 
                        onClick={() => {
                          setAuthMode('signin');
                          setAuthModalOpen(true);
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-muted-foreground hover:text-sunset-orange transition-colors py-2 flex items-center justify-center gap-2"
                      >
                        <LogIn className="w-4 h-4" />
                        Sign In
                      </button>
                      <button 
                        onClick={() => {
                          setAuthMode('signup');
                          setAuthModalOpen(true);
                          setMobileMenuOpen(false);
                        }}
                        className="w-full bg-gradient-to-r from-primary to-secondary text-white px-4 py-3 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <UserPlus className="w-4 h-4" />
                        Sign Up
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              <a 
                href="/admin/dashboard" 
                className="w-full text-center text-xs text-muted-foreground hover:text-sunset-orange transition-colors border border-border px-3 py-2 rounded-md block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Login
              </a>
              <button 
                onClick={() => {
                  handleTelegramClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full btn-adventure mt-4"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-sunset-orange/30 via-tropical-blue/30 to-adventure-teal/30 bg-cover bg-center"
             style={{
               backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
               backgroundBlendMode: 'overlay'
             }}>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 icon-float">
            <Plane className="w-8 h-8 text-sunset-orange/60 icon-bounce" />
          </div>
          <div className="absolute top-40 right-20 icon-float">
            <Camera className="w-10 h-10 text-tropical-blue/60 icon-rotate" />
          </div>
          <div className="absolute bottom-40 left-16 icon-float">
            <MapPin className="w-6 h-6 text-warm-coral/60 icon-glow" />
          </div>
        </div>
        
        {/* Hero Overlay */}
        <div className="absolute inset-0 bg-gradient-hero"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <div className="fade-in mb-8">
            <img 
              src="/lovable-uploads/6f31e6d2-0376-46d1-80d2-e44b44a2f13e.png" 
              alt="EditMyTrip Logo" 
              className="w-32 h-32 mx-auto mb-8 drop-shadow-2xl icon-float rounded-2xl"
            />
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              Edit<span className="text-golden-hour">My</span>Trip
            </h1>
          </div>
          
          <div className="slide-up mb-10">
            <p className="text-2xl md:text-3xl mb-4 font-semibold">
              Turn Your Travel Videos into Stunning Reels!
            </p>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Transform your travel memories into cinematic short videos that captivate your audience and inspire wanderlust
            </p>
          </div>
          
          <div className="scale-in">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <button 
                onClick={handleTelegramClick}
                className="btn-adventure text-lg px-8 py-4 inline-flex items-center gap-3 w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5" />
                Connect to Telegram
              </button>
              <div className="text-white/70 text-lg hidden sm:block">or</div>
              <button 
                onClick={() => setAuthModalOpen(true)}
                className="bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-white/50 text-white text-lg px-8 py-4 rounded-full inline-flex items-center gap-3 transition-all duration-300 w-full sm:w-auto"
              >
                <Upload className="w-5 h-5" />
                Upload Video
              </button>
            </div>
            <p className="text-lg opacity-90">✨ 24-hour delivery • Only ₹99 per reel • Free revision</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 fade-in">
              About <span className="text-sunset">EditMyTrip</span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto fade-in leading-relaxed">
              We're passionate travel content creators who understand the art of storytelling through video
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center slide-left">
              <div className="glass-card p-8">
                <div className="w-20 h-20 bg-gradient-sunset rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">500+ Happy Travelers</h3>
                <p className="text-muted-foreground">We've helped hundreds of adventurers share their stories</p>
              </div>
            </div>

            <div className="text-center zoom-in">
              <div className="glass-card p-8">
                <div className="w-20 h-20 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-6">
                  <Video className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">1000+ Reels Created</h3>
                <p className="text-muted-foreground">Each reel is crafted with attention to detail and creativity</p>
              </div>
            </div>

            <div className="text-center slide-right">
              <div className="glass-card p-8">
                <div className="w-20 h-20 bg-gradient-adventure rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">99% Satisfaction</h3>
                <p className="text-muted-foreground">Our clients love the results and come back for more</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 fade-in">
              What We <span className="text-ocean">Offer</span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto fade-in">
              Professional travel reel editing that makes your content stand out
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="glass-card p-12 text-center slide-up mb-16">
              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div className="space-y-8">
                  <div className="flex items-center gap-6 text-left">
                    <div className="w-16 h-16 bg-gradient-sunset rounded-2xl flex items-center justify-center">
                      <Video className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">🎞️ 1 Edited Reel</h3>
                      <p className="text-muted-foreground text-lg">Up to 30 seconds of pure magic</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-left">
                    <div className="w-16 h-16 bg-gradient-ocean rounded-2xl flex items-center justify-center">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">⏱️ 24 Hour Delivery</h3>
                      <p className="text-muted-foreground text-lg">Lightning-fast turnaround time</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center gap-6 text-left">
                    <div className="w-16 h-16 bg-gradient-adventure rounded-2xl flex items-center justify-center">
                      <Music className="w-8 h-8 text-white" />
                    </div>
                    <div>  
                      <h3 className="font-bold text-xl">🎵 Music Sync & Transitions</h3>
                      <p className="text-muted-foreground text-lg">Smooth cuts perfectly timed</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-left">
                    <div className="w-16 h-16 bg-gradient-sunset rounded-2xl flex items-center justify-center">
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">💬 Free Revision</h3>
                      <p className="text-muted-foreground text-lg">We'll make it perfect for you</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-muted pt-12">
                <div className="text-center">
                  <div className="inline-flex items-center gap-3 bg-gradient-adventure text-white px-12 py-6 rounded-full text-3xl font-bold shadow-glow">
                    Only ₹99 <span className="text-lg font-normal opacity-90">per reel</span>
                  </div>
                  <p className="text-muted-foreground mt-4 text-lg">No hidden charges • Pay after delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 fade-in">
              How It <span className="text-adventure">Works</span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto fade-in">
              Simple, fast, and hassle-free process
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="glass-card p-10 text-center slide-left">
                <div className="w-24 h-24 bg-gradient-sunset rounded-full flex items-center justify-center mx-auto mb-8">
                  <Upload className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-6">1. Upload Your Clips</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Send us your raw travel footage via Telegram or Google Drive. 
                  We accept all formats and any duration.
                </p>
              </div>

              <div className="glass-card p-10 text-center slide-right">
                <div className="w-24 h-24 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-8">
                  <Download className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-6">2. Get Your Edited Reel</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Within 24 hours, receive your professionally edited reel 
                  delivered via Google Drive, ready to post!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Reels Section */}
      <section id="samples" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 fade-in">
              Sample <span className="text-sunset">Reels</span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto fade-in">
              See the magic we create for our clients
            </p>
          </div>

          <div className="max-w-6xl mx-auto responsive-grid">
            {/* Sample Reel #1 */}
            <div className="polaroid-frame scale-in">
              <div className="aspect-[9/16] bg-muted rounded-xl mb-4 overflow-hidden">
                <iframe
                  src="https://www.instagram.com/reel/C7MCJaltrc0/embed"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  className="rounded-xl"
                  title="Sample Reel #1"
                />
              </div>
              <h3 className="font-bold text-lg mb-2">Amazing Travel Reel</h3>
              <p className="text-sm text-muted-foreground">Sample Reel #1 • 30 seconds</p>
            </div>

            {/* Sample Reel #2 */}
            <div className="polaroid-frame scale-in">
              <div className="aspect-[9/16] bg-muted rounded-xl mb-4 overflow-hidden">
                <iframe
                  src="https://www.instagram.com/reel/DLfW8zghD5m/embed"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  className="rounded-xl"
                  title="Sample Reel #2"
                />
              </div>
              <h3 className="font-bold text-lg mb-2">Stunning Travel Reel</h3>
              <p className="text-sm text-muted-foreground">Sample Reel #2 • 30 seconds</p>
            </div>

            {/* Sample Reel #3 - Placeholder */}
            <div className="polaroid-frame scale-in">
              <div className="aspect-[9/16] bg-gradient-glow rounded-xl mb-4 flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-sunset-orange mx-auto mb-4 icon-glow" />
                  <p className="text-lg font-semibold text-foreground">
                    Your Next Reel
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Ready to Create
                  </p>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Your Story Awaits</h3>
              <p className="text-sm text-muted-foreground">Ready to Create • 30 seconds</p>
            </div>
          </div>

          <div className="text-center mt-16">
            <button 
              onClick={handleTelegramClick}
              className="btn-ocean text-xl px-12 py-6 inline-flex items-center gap-4"
            >
              <MessageCircle className="w-6 h-6" />
              Create Your Reel Now
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 fade-in">
              What Our <span className="text-ocean">Travelers</span> Say
            </h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto fade-in">
              Real stories from real adventurers
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="testimonial-card p-8 slide-left">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-golden-hour fill-current" />
                ))}
              </div>
              <p className="text-lg mb-6 leading-relaxed">
                "EditMyTrip turned my boring travel videos into something incredible! 
                The reel got 10k+ views and so many compliments."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-sunset rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sarah M.</h4>
                  <p className="text-sm text-muted-foreground">Travel Blogger</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card p-8 zoom-in">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-golden-hour fill-current" />
                ))}
              </div>
              <p className="text-lg mb-6 leading-relaxed">
                "Super fast delivery and amazing quality! They understood exactly 
                what I wanted for my Bali trip reel. Highly recommended!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-ocean rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">R</span>
                </div>
                <div>
                  <h4 className="font-semibold">Rahul K.</h4>
                  <p className="text-sm text-muted-foreground">Digital Nomad</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card p-8 slide-right">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-golden-hour fill-current" />
                ))}
              </div>
              <p className="text-lg mb-6 leading-relaxed">
                "Professional service at an amazing price! My Europe trip reel 
                looked like it was made by a top-tier content creator."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-adventure rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">P</span>
                </div>
                <div>
                  <h4 className="font-semibold">Priya S.</h4>
                  <p className="text-sm text-muted-foreground">Influencer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 fade-in">
              Ready to Get <span className="text-adventure">Started?</span>
            </h2>
            
            <div className="glass-card p-12 slide-up relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4">
                  <Plane className="w-6 h-6 text-sunset-orange icon-bounce" />
                </div>
                <div className="absolute bottom-4 right-4">
                  <Camera className="w-8 h-8 text-tropical-blue icon-rotate" />
                </div>
              </div>
              
              <div className="relative z-10">
                <div className="w-32 h-32 bg-[#0088cc] rounded-full flex items-center justify-center mx-auto mb-8 shadow-glow">
                  <MessageCircle className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-6">Contact Us on Telegram</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                  Send us your travel clips and get your professional reel within 24 hours. 
                  It's that simple!
                </p>
                <button 
                  onClick={handleTelegramClick}
                  className="btn-adventure text-xl px-12 py-6 inline-flex items-center gap-4 w-full md:w-auto"
                >
                  <Send className="w-6 h-6" />
                  Message Us Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-travel-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <img 
                src="/lovable-uploads/6f31e6d2-0376-46d1-80d2-e44b44a2f13e.png" 
                alt="EditMyTrip Logo" 
                className="w-12 h-12"
              />
              <span className="text-2xl font-bold">EditMyTrip</span>
            </div>
            
            <div className="flex items-center justify-center gap-8 mb-8">
              <a href="#" className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-sunset transition-all duration-300 hover:scale-110">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-ocean transition-all duration-300 hover:scale-110">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="#" className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-adventure transition-all duration-300 hover:scale-110">
                <Smartphone className="w-6 h-6" />
              </a>
            </div>
            
            <p className="text-white/70 text-lg">
              © 2025 EditMyTrip — All rights reserved. Made with ❤️ for travelers.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Telegram Button */}
      <button 
        onClick={handleTelegramClick}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#0088cc] rounded-full flex items-center justify-center z-50 shadow-glow hover:scale-110 transition-transform duration-300 md:hidden"
        aria-label="Contact us on Telegram"
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </button>

      {/* Modals */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
      <UploadModal 
        isOpen={uploadModalOpen} 
        onClose={() => setUploadModalOpen(false)} 
      />
    </div>
  );
};

export default Index;