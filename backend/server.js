require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const connectDB = require('./config/db');
const User = require('./models/User');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Routes (will be filled in Prompt 2 and 3)
app.use('/api/auth',     require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart',     require('./routes/cartRoutes'));
app.use('/api/orders',   require('./routes/orderRoutes'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

const ensureAdminUser = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const adminName = process.env.ADMIN_NAME || 'Admin';
  const adminRole = 'admin';

  const existingAdmin = await User.findOne({ role: adminRole });
  if (existingAdmin) {
    let updated = false;
    if (existingAdmin.email !== adminEmail) {
      existingAdmin.email = adminEmail;
      updated = true;
    }
    if (existingAdmin.name !== adminName) {
      existingAdmin.name = adminName;
      updated = true;
    }
    const passwordMatches = await existingAdmin.comparePassword(adminPassword);
    if (!passwordMatches) {
      existingAdmin.password = adminPassword;
      updated = true;
    }
    if (updated) {
      await existingAdmin.save();
      console.log(`Admin user updated: ${adminEmail} / ${adminPassword}`);
    } else {
      console.log(`Admin user exists: ${adminEmail}`);
    }
    return;
  }

  const adminByEmail = await User.findOne({ email: adminEmail });
  if (adminByEmail) {
    adminByEmail.role = adminRole;
    adminByEmail.name = adminName;
    adminByEmail.password = adminPassword;
    await adminByEmail.save();
    console.log(`Promoted existing account to admin: ${adminEmail}`);
    return;
  }

  await User.create({ name: adminName, email: adminEmail, password: adminPassword, role: adminRole });
  console.log(`Admin user created: ${adminEmail} / ${adminPassword}`);
};

const startServer = async () => {
  await connectDB();
  await ensureAdminUser();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
