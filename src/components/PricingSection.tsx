import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown } from 'lucide-react';

const pricingPlans = [
  {
    name: "Single Reel",
    price: "₹99",
    duration: "per reel",
    description: "Perfect for trying our service",
    features: [
      "1 professional reel edit", 
      "24-hour delivery",
      "1 free revision",
      "HD 1080p quality",
      "Multiple format delivery"
    ],
    icon: Star,
    popular: false,
    color: "from-adventure-teal to-tropical-blue"
  },
  {
    name: "Creator Pack",
    price: "₹399", 
    duration: "5 reels",
    description: "Best value for content creators",
    features: [
      "5 professional reel edits",
      "Priority 18-hour delivery", 
      "2 free revisions per reel",
      "HD 1080p quality",
      "Custom branding options",
      "Dedicated editor assigned"
    ],
    icon: Zap,
    popular: true,
    color: "from-sunset-orange to-warm-coral"
  },
  {
    name: "Pro Traveler",
    price: "₹699",
    duration: "10 reels",
    description: "For serious travel influencers",
    features: [
      "10 professional reel edits",
      "Express 12-hour delivery",
      "3 free revisions per reel", 
      "4K quality available",
      "Custom thumbnails included",
      "Priority support",
      "Content strategy consultation"
    ],
    icon: Crown,
    popular: false,
    color: "from-primary to-adventure-teal"
  }
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Simple <span className="text-sunset">Pricing</span>
          </h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
            Professional video editing at prices that won't break your travel budget
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative ${plan.popular ? 'md:-mt-8' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-sunset text-white px-6 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className={`glass-card p-8 h-full ${plan.popular ? 'border-2 border-sunset-orange shadow-glow' : ''}`}>
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mb-6`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Plan name and price */}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.duration}</span>
                </div>
                <p className="text-muted-foreground mb-8">{plan.description}</p>
                
                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-sunset text-white shadow-glow hover:shadow-strong' 
                      : 'bg-muted text-foreground hover:bg-primary hover:text-white'
                  }`}
                  onClick={() => window.open('https://t.me/Rakesh4280', '_blank')}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">All plans include</h3>
            <div className="grid md:grid-cols-3 gap-6 text-muted-foreground">
              <div className="flex items-center gap-2 justify-center">
                <Check className="w-5 h-5 text-green-500" />
                <span>Professional editing</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Check className="w-5 h-5 text-green-500" />
                <span>Multiple format delivery</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Check className="w-5 h-5 text-green-500" />
                <span>30-day satisfaction guarantee</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};