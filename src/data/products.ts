import { Product, Category } from '../types';

export const categories: Category[] = [
  {
    id: 'herbs',
    name: 'Natural Herbs',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=800',
    description: 'Fresh and dried herbs for various health benefits.'
  },
  {
    id: 'spices',
    name: 'Pure Spices',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=800',
    description: 'Authentic, unadulterated spices from across the region.'
  },
  {
    id: 'oils',
    name: 'Essential Oils',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800',
    description: 'Cold-pressed oils for skin, hair, and health.'
  },
  {
    id: 'honey',
    name: 'Organic Honey',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800',
    description: '100% pure Sidr and multi-flower honey.'
  },
  {
    id: 'sharbat',
    name: 'Traditional Sharbat',
    image: 'https://images.unsplash.com/photo-1544070078-a212eda27b49?auto=format&fit=crop&q=80&w=800',
    description: 'Refreshing and medicinal syrups for various health needs.'
  },
  {
    id: 'pakki',
    name: 'Special Pakki',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=800',
    description: 'Traditional powdered mixtures for digestion and brain health.'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Pure Sidr Honey (خالص بیری کا شہد)',
    category: 'Honey',
    description: 'Premium organic Sidr honey known for its medicinal properties.',
    price: 2500,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=800',
    benefits: ['Boosts immunity', 'Natural energy source', 'Heals wounds']
  },
  {
    id: '2',
    name: 'Black Seed Oil (Kalonji) (کلونجی کا تیل)',
    category: 'Oils',
    description: 'Cold-pressed black seed oil, a cure for many ailments.',
    price: 800,
    unit: '250ml',
    image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&q=80&w=800',
    benefits: ['Anti-inflammatory', 'Improves digestion', 'Skin health']
  },
  {
    id: '3',
    name: 'Dried Chamomile (بابونہ کے خشک پھول)',
    category: 'Herbs',
    description: 'High-quality dried chamomile flowers for soothing tea.',
    price: 300,
    unit: '100g',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=80&w=800',
    benefits: ['Reduces stress', 'Aids sleep', 'Digestive health']
  },
  {
    id: '4',
    name: 'Turmeric Powder (Haldi) (ہلدی پاؤڈر)',
    category: 'Spices',
    description: 'Pure, organic turmeric with high curcumin content.',
    price: 200,
    unit: '250g',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800',
    benefits: ['Natural antiseptic', 'Anti-oxidant', 'Joint health']
  },
  {
    id: '5',
    name: 'Ashwagandha Powder (اسگند ناگوری پاؤڈر)',
    category: 'Medicines',
    description: 'Traditional Ayurvedic herb for vitality and stress relief.',
    price: 450,
    unit: '100g',
    image: 'https://images.unsplash.com/photo-1611241893603-3c359704e0ee?auto=format&fit=crop&q=80&w=800',
    benefits: ['Stress management', 'Energy booster', 'Cognitive support']
  },
  {
    id: '6',
    name: 'Pure Almond Oil (خالص روغن بادام)',
    category: 'Oils',
    description: 'Sweet almond oil for skin and hair nourishment.',
    price: 600,
    unit: '100ml',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800',
    benefits: ['Skin glow', 'Hair strength', 'Vitamin E rich']
  },
  {
    id: '7',
    name: 'Green Cardamom (Elaichi) (سبز الائچی)',
    category: 'Spices',
    description: 'Premium quality green cardamom with intense aroma.',
    price: 1200,
    unit: '100g',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=800',
    benefits: ['Digestive aid', 'Breath freshener', 'Rich in antioxidants']
  },
  {
    id: '8',
    name: 'Moringa Powder (سوہانجنا پاؤڈر)',
    category: 'Herbs',
    description: 'Superfood powder made from dried moringa leaves.',
    price: 350,
    unit: '200g',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=800',
    benefits: ['Nutrient dense', 'Anti-inflammatory', 'Blood sugar support']
  },
  {
    id: '9',
    name: 'Sharbat-e-Bazoori (شربت بزوری)',
    category: 'Sharbat',
    description: 'Traditional syrup for liver and kidney detoxification.',
    price: 350,
    unit: '800ml',
    image: 'https://images.unsplash.com/photo-1544070078-a212eda27b49?auto=format&fit=crop&q=80&w=800',
    benefits: ['Liver detox', 'Kidney health', 'Reduces body heat']
  },
  {
    id: '10',
    name: 'Sharbat-e-Anjabar (شربت انجبار)',
    category: 'Sharbat',
    description: 'Medicinal syrup for digestive health and internal healing.',
    price: 400,
    unit: '800ml',
    image: 'https://images.unsplash.com/photo-1544070078-a212eda27b49?auto=format&fit=crop&q=80&w=800',
    benefits: ['Digestive support', 'Internal healing', 'Cooling effect']
  },
  {
    id: '11',
    name: "Hakeem's Special Hair Oil (حکیم کا خاص تیل برائے بال)",
    category: 'Oils',
    description: 'Handmade secret formula for hair growth, dandruff, and strength.',
    price: 1200,
    unit: '200ml',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800',
    benefits: ['Hair growth', 'Stops hair fall', 'Removes dandruff']
  },
  {
    id: '12',
    name: 'Special Hazmi Pakki (خاص ہاضمی پھکی)',
    category: 'Pakki',
    description: 'Traditional churan for instant relief from acidity and gas.',
    price: 250,
    unit: '100g',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=800',
    benefits: ['Instant digestion', 'Relieves acidity', 'Gas relief']
  },
  {
    id: '13',
    name: 'Dimaghi Pakki (دماغی پھکی)',
    category: 'Pakki',
    description: 'Brain tonic powder for memory, focus, and mental clarity.',
    price: 550,
    unit: '150g',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=800',
    benefits: ['Improves memory', 'Mental focus', 'Reduces mental fatigue']
  },
  {
    id: '14',
    name: 'Sana Makki (Senna Leaves) (سنا مکی)',
    category: 'Herbs',
    description: 'Powerful natural laxative and detoxifier used for centuries to cleanse the digestive system.',
    price: 150,
    unit: '100g',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=800',
    benefits: ['Relieves constipation', 'Detoxifies colon', 'Aids weight loss']
  },
  {
    id: '15',
    name: 'Mulethi (Liquorice Root) (ملٹھی)',
    category: 'Herbs',
    description: 'Sweet-tasting root known for its exceptional ability to soothe the throat and respiratory tract.',
    price: 250,
    unit: '100g',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=800',
    benefits: ['Soothes sore throat', 'Relieves cough', 'Anti-inflammatory']
  },
  {
    id: '16',
    name: 'Banafsha (Viola odorata) (گل بنفشہ)',
    category: 'Herbs',
    description: 'Traditional herb used in Unani medicine for treating chest congestion and fever.',
    price: 350,
    unit: '50g',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=800',
    benefits: ['Clears chest congestion', 'Reduces fever', 'Eases breathing']
  },
  {
    id: '17',
    name: 'Unnab (Jujube) (عناب)',
    category: 'Herbs',
    description: 'Commonly known as Red Date, it is a powerful blood purifier and immunity booster.',
    price: 400,
    unit: '250g',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=800',
    benefits: ['Purifies blood', 'Boosts immunity', 'Rich in Vitamin C']
  },
  {
    id: '18',
    name: 'Sapistan (Cordia myxa) (سپستان)',
    category: 'Herbs',
    description: 'A mucilaginous fruit highly effective for dry cough and throat irritation.',
    price: 300,
    unit: '100g',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=800',
    benefits: ['Relieves dry cough', 'Soothes throat', 'Expectorant properties']
  },
  {
    id: '19',
    name: 'Gaozaban (Borage) (گاؤزبان)',
    category: 'Herbs',
    description: 'Renowned brain and heart tonic that helps in reducing anxiety and mental stress.',
    price: 450,
    unit: '100g',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=800',
    benefits: ['Heart tonic', 'Reduces anxiety', 'Mental clarity']
  },
  {
    id: '20',
    name: 'Tukhm-e-Balanga (Basil Seeds) (تخم بالنگا)',
    category: 'Herbs',
    description: 'Natural cooling agent that is excellent for stomach health and hydration.',
    price: 200,
    unit: '200g',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=800',
    benefits: ['Cooling effect', 'Aids digestion', 'Rich in fiber']
  },
  {
    id: '21',
    name: 'Ispaghol (Psyllium Husk) (اسپغول کی بھوسی)',
    category: 'Herbs',
    description: 'Pure, natural fiber that regulates bowel movements and supports heart health.',
    price: 500,
    unit: '250g',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=800',
    benefits: ['Regulates digestion', 'Lowers cholesterol', 'Weight management']
  },
  {
    id: '22',
    name: 'Reewand Chini (Rhubarb Root) (ریوند چینی)',
    category: 'Herbs',
    description: 'Traditional root used for liver health and as a mild natural laxative.',
    price: 380,
    unit: '100g',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=800',
    benefits: ['Liver support', 'Mild laxative', 'Stomach tonic']
  },
  {
    id: '23',
    name: 'Chiraita (Swertia) (چرائتہ)',
    category: 'Herbs',
    description: 'Extremely bitter herb famous for its blood-purifying and anti-malarial properties.',
    price: 320,
    unit: '100g',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=800',
    benefits: ['Purifies blood', 'Skin health', 'Anti-pyretic']
  }
];
