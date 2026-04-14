require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
const connectDB = require('./config/db');

const products = [
  {
    name: 'Syltherine',
    description: 'Premium velvet sofa with rich cushioning and strong wooden legs for a luxurious living room.',
    price: 2500000,
    originalPrice: 3500000,
    category: 'Living Room',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
    badge: 'Sale',
    inStock: true,
    rating: 4,
  },
  {
    name: 'Leviosa',
    description: 'Elegant contemporary sofa offering plush comfort and a graceful silhouette for modern living spaces.',
    price: 2500000,
    originalPrice: null,
    category: 'Living Room',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    badge: '',
    inStock: true,
    rating: 5,
  },
  {
    name: 'Lolito',
    description: 'Luxury bedroom set with premium finishes and a cozy mattress-ready design for restful nights.',
    price: 7000000,
    originalPrice: 14000000,
    category: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80',
    badge: 'Sale',
    inStock: true,
    rating: 4,
  },
  {
    name: 'Respira',
    description: 'Lightweight designer sofa crafted for everyday comfort with refined curves and modern appeal.',
    price: 500000,
    originalPrice: null,
    category: 'Living Room',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50dd11b6?auto=format&fit=crop&w=800&q=80',
    badge: 'New',
    inStock: true,
    rating: 5,
  },
  {
    name: 'Grifo',
    description: 'Minimalist dining set built for family meals, combining durability with sleek contemporary style.',
    price: 1500000,
    originalPrice: null,
    category: 'Dining',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
    badge: '',
    inStock: true,
    rating: 4,
  },
  {
    name: 'Muggo',
    description: 'Compact dining chair set designed for cozy meals and a warm, inviting dining atmosphere.',
    price: 150000,
    originalPrice: null,
    category: 'Dining',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
    badge: '',
    inStock: true,
    rating: 3,
  },
  {
    name: 'Pingky',
    description: 'Sophisticated bedroom ensemble with plush upholstery and a chic headboard design for refined living.',
    price: 7000000,
    originalPrice: 14000000,
    category: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
    badge: 'Sale',
    inStock: true,
    rating: 4,
  },
  {
    name: 'Potty',
    description: 'Soft bedroom seating solution with premium fabric and a crisp Scandinavian-inspired frame.',
    price: 500000,
    originalPrice: null,
    category: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80',
    badge: 'New',
    inStock: true,
    rating: 5,
  },
];

const seedDB = async () => {
  await connectDB();
  await Product.deleteMany({});
  console.log('Cleared existing products');
  await Product.insertMany(products);
  console.log(`Inserted ${products.length} products`);

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const adminName = process.env.ADMIN_NAME || 'Admin';
  const adminRole = 'admin';

  let admin = await User.findOne({ role: adminRole });
  if (!admin) {
    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      existing.role = adminRole;
      existing.name = adminName;
      existing.password = adminPassword;
      await existing.save();
      console.log(`Promoted existing account to admin: ${adminEmail}`);
    } else {
      await User.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: adminRole,
      });
      console.log(`Admin user created: ${adminEmail} / ${adminPassword}`);
    }
  } else {
    let updated = false;
    if (admin.email !== adminEmail) {
      admin.email = adminEmail;
      updated = true;
    }
    if (admin.name !== adminName) {
      admin.name = adminName;
      updated = true;
    }
    const passwordMatches = await admin.comparePassword(adminPassword);
    if (!passwordMatches) {
      admin.password = adminPassword;
      updated = true;
    }
    if (updated) {
      await admin.save();
      console.log(`Admin user updated: ${adminEmail} / ${adminPassword}`);
    } else {
      console.log(`Admin user exists: ${adminEmail}`);
    }
  }

  mongoose.connection.close();
  console.log('Done! MongoDB connection closed.');
};

seedDB();
