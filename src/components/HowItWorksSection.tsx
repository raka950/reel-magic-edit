import { motion } from 'framer-motion';
import { Upload, Palette, Clock, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: "Upload Video",
    description: "Simply upload your travel footage through our secure platform",
    color: "text-sunset-orange",
    bgColor: "bg-gradient-sunset"
  },
  {
    icon: Palette,
    title: "Choose Style", 
    description: "Select from our curated collection of trendy editing styles",
    color: "text-tropical-blue",
    bgColor: "bg-gradient-ocean"
  },
  {
    icon: Clock,
    title: "We Edit",
    description: "Our professional editors work their magic on your footage",
    color: "text-adventure-teal", 
    bgColor: "bg-gradient-adventure"
  },
  {
    icon: CheckCircle,
    title: "Get Your Reel",
    description: "Receive your stunning reel within 24 hours, ready to share",
    color: "text-warm-coral",
    bgColor: "bg-gradient-sunset"
  }
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-surface">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            How It <span className="text-adventure">Works</span>
          </h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
            From raw footage to viral-ready content in just 4 simple steps
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative"
              >
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-current to-transparent opacity-30 z-0" />
                )}
                
                <div className="glass-card p-8 text-center h-full relative z-10">
                  {/* Step number */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-sunset rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-20 h-20 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Call to action */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center mt-16"
          >
            <div className="glass-card p-8 max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">Ready to get started?</h3>
              <p className="text-muted-foreground mb-6">Join hundreds of travelers who've transformed their content with EditMyTrip</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-adventure text-lg px-8 py-4"
                onClick={() => window.open('https://t.me/Rakesh4280', '_blank')}
              >
                Start Your First Reel
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};