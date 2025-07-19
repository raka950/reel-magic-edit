import { motion } from 'framer-motion';
import { Play, Heart, Share, Eye } from 'lucide-react';
import { useState } from 'react';

const sampleReels = [
  {
    id: 1,
    title: "Bali Beach Paradise",
    location: "Bali, Indonesia",
    thumbnail: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=600&fit=crop",
    views: "125K",
    likes: "8.2K",
    description: "Stunning beach sunset transformation"
  },
  {
    id: 2, 
    title: "Tokyo City Vibes",
    location: "Tokyo, Japan",
    thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=600&fit=crop",
    views: "98K",
    likes: "6.7K",
    description: "Urban exploration with neon aesthetics"
  },
  {
    id: 3,
    title: "Swiss Alps Adventure", 
    location: "Swiss Alps",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    views: "156K",
    likes: "12.1K", 
    description: "Epic mountain hiking experience"
  },
  {
    id: 4,
    title: "Maldives Luxury",
    location: "Maldives",
    thumbnail: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=600&fit=crop",
    views: "203K",
    likes: "15.8K",
    description: "Crystal clear waters and overwater villas"
  },
  {
    id: 5,
    title: "Iceland Northern Lights",
    location: "Reykjavik, Iceland", 
    thumbnail: "https://images.unsplash.com/photo-1539066726746-6971ee1c9e69?w=400&h=600&fit=crop",
    views: "87K",
    likes: "9.3K",
    description: "Magical aurora borealis capture"
  },
  {
    id: 6,
    title: "Dubai Desert Safari",
    location: "Dubai, UAE",
    thumbnail: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=600&fit=crop",
    views: "76K", 
    likes: "5.9K",
    description: "Desert dunes and camel adventures"
  }
];

export const SampleReelsSection = () => {
  const [hoveredReel, setHoveredReel] = useState<number | null>(null);

  return (
    <section id="samples" className="py-24 bg-surface">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Sample <span className="text-ocean">Reels</span>
          </h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
            See the magic we create for travelers just like you
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleReels.map((reel, index) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onHoverStart={() => setHoveredReel(reel.id)}
                onHoverEnd={() => setHoveredReel(null)}
                className="group cursor-pointer"
              >
                <div className="glass-card p-4 h-full">
                  {/* Video thumbnail */}
                  <div className="relative overflow-hidden rounded-xl mb-4 aspect-[9/16] bg-gray-200">
                    <img 
                      src={reel.thumbnail} 
                      alt={reel.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: hoveredReel === reel.id ? 1 : 0 }}
                        transition={{ duration: 0.3, type: "spring" }}
                        className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center"
                      >
                        <Play className="w-8 h-8 text-sunset-orange ml-1" fill="currentColor" />
                      </motion.div>
                    </div>
                    
                    {/* Location tag */}
                    <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {reel.location}
                    </div>
                  </div>
                  
                  {/* Reel info */}
                  <div>
                    <h3 className="text-xl font-bold mb-2">{reel.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{reel.description}</p>
                    
                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{reel.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{reel.likes}</span>
                        </div>
                      </div>
                      <Share className="w-4 h-4 hover:text-sunset-orange transition-colors cursor-pointer" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* View more button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-ocean text-lg px-8 py-4"
              onClick={() => window.open('https://t.me/Rakesh4280', '_blank')}
            >
              View More Samples
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};