import React, { useEffect, useRef } from 'react';
import { Play, Video, Clock, Music, MessageCircle, Upload, Download, Instagram, Youtube, Smartphone, Phone } from 'lucide-react';

const Index = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

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
    const animationElements = document.querySelectorAll('.fade-in, .slide-up, .scale-in');
    animationElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleWhatsAppClick = () => {
    const message = "Hi, I want to get my travel reel edited!";
    const phoneNumber = "916287116458";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleSmoothScroll = (elementId: string) => {
    const element = document.getElementById(elementId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-surface-variant z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/6f31e6d2-0376-46d1-80d2-e44b44a2f13e.png" 
              alt="EditMyTrip Logo" 
              className="w-10 h-10"
            />
            <span className="text-xl font-bold text-gradient">EditMyTrip</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => handleSmoothScroll('services')} className="text-muted-foreground hover:text-foreground transition-colors">Services</button>
            <button onClick={() => handleSmoothScroll('how-it-works')} className="text-muted-foreground hover:text-foreground transition-colors">How It Works</button>
            <button onClick={() => handleSmoothScroll('samples')} className="text-muted-foreground hover:text-foreground transition-colors">Samples</button>
            <button onClick={handleWhatsAppClick} className="btn-primary text-sm">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Placeholder - Replace with actual travel image */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/20 via-brand-coral/20 to-accent/20 bg-cover bg-center"
             style={{
               backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
               backgroundBlendMode: 'overlay'
             }}>
        </div>
        
        {/* Hero Overlay */}
        <div className="absolute inset-0 hero-background"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="fade-in mb-8">
            <img 
              src="/lovable-uploads/6f31e6d2-0376-46d1-80d2-e44b44a2f13e.png" 
              alt="EditMyTrip Logo" 
              className="w-24 h-24 mx-auto mb-6 drop-shadow-2xl"
            />
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
              Edit<span className="text-accent">My</span>Trip
            </h1>
          </div>
          
          <div className="slide-up mb-8">
            <p className="text-xl md:text-2xl mb-2 font-medium">
              Turn Your Travel Videos into Stunning Reels!
            </p>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Transform your travel memories into cinematic short videos that captivate your audience
            </p>
          </div>
          
          <div className="scale-in">
            <button 
              onClick={handleWhatsAppClick}
              className="btn-primary text-lg px-8 py-4 mb-4 inline-flex items-center gap-3"
            >
              <MessageCircle className="w-5 h-5" />
              Get Started on WhatsApp
            </button>
            <p className="text-sm opacity-80">✨ 24-hour delivery • Only ₹99 per reel</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 fade-in">
              What We <span className="text-gradient">Offer</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto fade-in">
              Professional travel reel editing that makes your content stand out
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card-gradient p-8 md:p-12 text-center slide-up mb-12">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center">
                      <Video className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">🎞️ 1 Edited Reel</h3>
                      <p className="text-muted-foreground">Up to 30 seconds of pure magic</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">⏱️ 24 Hour Delivery</h3>
                      <p className="text-muted-foreground">Lightning-fast turnaround time</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <div>  
                      <h3 className="font-semibold text-lg">🎵 Music Sync & Transitions</h3>
                      <p className="text-muted-foreground">Smooth cuts perfectly timed</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">💬 Free Revision</h3>
                      <p className="text-muted-foreground">We'll make it perfect for you</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-muted pt-8">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-gradient-brand text-white px-6 py-3 rounded-full text-2xl font-bold">
                    Only ₹99 <span className="text-sm font-normal opacity-80">per reel</span>
                  </div>
                  <p className="text-muted-foreground mt-2">No hidden charges • Pay after delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 fade-in">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto fade-in">
              Simple, fast, and hassle-free process
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card-gradient p-8 text-center slide-up">
                <div className="w-16 h-16 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-6">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">1. Upload Your Clips</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Send us your raw travel footage via WhatsApp or Google Drive. 
                  We accept all formats and any duration.
                </p>
              </div>

              <div className="card-gradient p-8 text-center slide-up">
                <div className="w-16 h-16 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-6">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">2. Get Your Edited Reel</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Within 24 hours, receive your professionally edited reel 
                  delivered via Google Drive, ready to post!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Reels Section */}
      <section id="samples" className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 fade-in">
              Sample <span className="text-gradient">Reels</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto fade-in">
              See the magic we create for our clients
            </p>
          </div>

          <div className="max-w-6xl mx-auto responsive-grid">
            {/* Sample Reel #1 */}
            <div className="card-gradient p-6 text-center scale-in">
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
              <h3 className="font-semibold mb-2">Amazing Travel Reel</h3>
              <p className="text-sm text-muted-foreground">Sample Reel #1 • 30 seconds</p>
            </div>

            {/* Sample Reel #2 */}
            <div className="card-gradient p-6 text-center scale-in">
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
              <h3 className="font-semibold mb-2">Stunning Travel Reel</h3>
              <p className="text-sm text-muted-foreground">Sample Reel #2 • 30 seconds</p>
            </div>

            {/* Sample Reel #3 - Placeholder */}
            <div className="card-gradient p-6 text-center scale-in">
              <div className="aspect-[9/16] bg-muted rounded-xl mb-4 flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Sample Reel #3
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Coming Soon
                  </p>
                </div>
              </div>
              <h3 className="font-semibold mb-2">Your Next Reel</h3>
              <p className="text-sm text-muted-foreground">Ready to Create • 30 seconds</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={handleWhatsAppClick}
              className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-3"
            >
              <MessageCircle className="w-5 h-5" />
              Create Your Reel Now
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 fade-in">
              Ready to Get <span className="text-gradient">Started?</span>
            </h2>
            
            <div className="card-gradient p-8 slide-up">
              <div className="w-20 h-20 bg-[#25d366] rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Contact Us on WhatsApp</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Send us your travel clips and get your professional reel within 24 hours. 
                It's that simple!
              </p>
              <button 
                onClick={handleWhatsAppClick}
                className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-3 w-full md:w-auto"
              >
                <Phone className="w-5 h-5" />
                Message Us Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <img 
                src="/lovable-uploads/6f31e6d2-0376-46d1-80d2-e44b44a2f13e.png" 
                alt="EditMyTrip Logo" 
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">EditMyTrip</span>
            </div>
            
            <div className="flex items-center justify-center gap-6 mb-6">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Smartphone className="w-5 h-5" />
              </a>
            </div>
            
            <p className="text-white/60">
              © 2025 EditMyTrip — All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <button 
        onClick={handleWhatsAppClick}
        className="whatsapp-float md:hidden"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </button>
    </div>
  );
};

export default Index;