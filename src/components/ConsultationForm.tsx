import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, Phone, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function ConsultationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="consultation" className="py-24 bg-emerald-950 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-800/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-3 block">Expert Advice</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Book a Consultation <br />
              <span className="text-emerald-400 italic font-serif">with our Hakeem</span>
            </h2>
            <p className="text-emerald-100/70 text-lg mb-10 leading-relaxed">
              Get personalized health advice based on traditional Unani and Ayurvedic wisdom. 
              Our experts are here to guide you towards a healthier, natural lifestyle.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: <CheckCircle2 className="text-emerald-400" />, text: "Detailed pulse diagnosis (Nabs)" },
                { icon: <CheckCircle2 className="text-emerald-400" />, text: "Personalized herbal prescriptions" },
                { icon: <CheckCircle2 className="text-emerald-400" />, text: "Dietary and lifestyle guidance" },
                { icon: <CheckCircle2 className="text-emerald-400" />, text: "Follow-up support and care" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-emerald-50">
                  {item.icon}
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl"
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-emerald-950 mb-2">Appointment Requested!</h3>
                <p className="text-emerald-900/60">
                  Our team will contact you shortly to confirm your consultation time.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-emerald-600 font-bold hover:underline"
                >
                  Book another appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" size={18} />
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 bg-emerald-50 border border-emerald-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" size={18} />
                      <input 
                        required
                        type="tel" 
                        placeholder="03273470385"
                        className="w-full pl-10 pr-4 py-3 bg-emerald-50 border border-emerald-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Preferred Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" size={18} />
                      <input 
                        required
                        type="date" 
                        className="w-full pl-10 pr-4 py-3 bg-emerald-50 border border-emerald-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Preferred Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" size={18} />
                      <select className="w-full pl-10 pr-4 py-3 bg-emerald-50 border border-emerald-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all appearance-none">
                        <option>Morning (10 AM - 1 PM)</option>
                        <option>Evening (5 PM - 9 PM)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Message / Symptoms</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 text-emerald-400" size={18} />
                    <textarea 
                      rows={4}
                      placeholder="Briefly describe your health concerns..."
                      className="w-full pl-10 pr-4 py-3 bg-emerald-50 border border-emerald-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                    ></textarea>
                  </div>
                </div>
                
                <button 
                  type="submit"
                  className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100"
                >
                  Request Appointment
                  <Send size={18} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
