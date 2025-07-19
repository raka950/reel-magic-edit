import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, India",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "EditMyTrip transformed my boring travel footage into stunning reels that got me 50K+ views! The editing quality is incredible and turnaround time is amazing.",
    reelViews: "127K",
    followersGained: "3.2K"
  },
  {
    id: 2,
    name: "Arjun Patel", 
    location: "Bangalore, India",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "As a travel blogger, I needed professional content quickly. EditMyTrip delivered beyond expectations. My engagement has increased by 300% since using their service!",
    reelViews: "89K",
    followersGained: "2.8K"
  },
  {
    id: 3,
    name: "Neha Gupta",
    location: "Delhi, India", 
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "I was skeptical about online video editing, but EditMyTrip proved me wrong. Professional quality, affordable pricing, and excellent communication throughout!",
    reelViews: "156K",
    followersGained: "4.1K"
  },
  {
    id: 4,
    name: "Rohit Kumar",
    location: "Pune, India",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", 
    rating: 5,
    text: "The team at EditMyTrip understands travel content perfectly. They captured the essence of my adventures and turned them into viral-worthy reels. Highly recommended!",
    reelViews: "94K",
    followersGained: "2.5K"
  },
  {
    id: 5,
    name: "Sanya Malhotra",
    location: "Goa, India",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Fast, professional, and creative! EditMyTrip helped me create content that stands out in a crowded social media space. Worth every penny!",
    reelViews: "78K", 
    followersGained: "1.9K"
  },
  {
    id: 6,
    name: "Vikram Singh",
    location: "Jaipur, India",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Incredible attention to detail and understanding of current trends. My travel reels now look professional and get consistent engagement. Thank you EditMyTrip!",
    reelViews: "112K",
    followersGained: "3.7K"
  }
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            What Travelers <span className="text-sunset">Say</span>
          </h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
            Join hundreds of satisfied customers who've transformed their travel content
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="testimonial-card p-8 h-full"
              >
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-sunset-orange mb-4 opacity-60" />
                
                {/* Review text */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                {/* User info */}
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="text-lg font-bold text-sunset-orange">{testimonial.reelViews}</div>
                    <div className="text-xs text-muted-foreground">Reel Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-adventure-teal">+{testimonial.followersGained}</div>
                    <div className="text-xs text-muted-foreground">New Followers</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center mt-16"
          >
            <div className="glass-card p-8 max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">Ready to join them?</h3>
              <p className="text-muted-foreground mb-6">Start creating content that gets noticed and grows your following</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-adventure text-lg px-8 py-4"
                onClick={() => window.open('https://t.me/Rakesh4280', '_blank')}
              >
                Get Your First Reel
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};