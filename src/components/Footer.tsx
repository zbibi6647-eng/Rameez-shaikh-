import React from 'react';
import { Leaf, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#fdfcf8] pt-24 pb-12 border-t border-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white">
                <Leaf size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-emerald-950">Rameez</h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-600 font-semibold leading-none">Pansar & Dawakhana</p>
              </div>
            </div>
            <p className="text-emerald-900/60 leading-relaxed">
              Bringing you the finest natural remedies and traditional wisdom for a healthier life. 
              Quality you can trust, healing you can feel.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white border border-emerald-100 rounded-full flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-emerald-950 font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Products', 'Categories', 'Consultation', 'Health Blog'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-emerald-900/60 hover:text-emerald-600 transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-emerald-200 rounded-full" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="text-emerald-950 font-bold mb-6">Categories</h4>
            <ul className="space-y-4">
              {['Natural Herbs', 'Pure Spices', 'Essential Oils', 'Organic Honey', 'Medicines'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-emerald-900/60 hover:text-emerald-600 transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-emerald-200 rounded-full" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-emerald-950 font-bold mb-6">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                  <MapPin size={18} />
                </div>
                <p className="text-sm text-emerald-900/60 leading-relaxed">
                  Hyderabad latifabad no 7 mazdor chock <br />
                  Haseen plaza dukan no 12
                </p>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                  <Phone size={18} />
                </div>
                <p className="text-sm text-emerald-900/60 leading-relaxed">
                  03273470385
                </p>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                  <Mail size={18} />
                </div>
                <p className="text-sm text-emerald-900/60 leading-relaxed">
                  info@rameezpansar.com <br />
                  support@rameezpansar.com
                </p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-emerald-900/40">
            © 2026 Rameez Pansar Store & Dawakhana. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-sm text-emerald-900/40 hover:text-emerald-600">Privacy Policy</a>
            <a href="#" className="text-sm text-emerald-900/40 hover:text-emerald-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
