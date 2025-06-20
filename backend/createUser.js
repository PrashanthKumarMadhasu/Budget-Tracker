const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust the path if needed
require('dotenv').config();

async function createUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const username = 'Tester';
    const plainPassword = 'Test1234';

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Check if user already exists
    const existing = await User.findOne({ username });
    if (existing) {
      console.log('User already exists');
      return mongoose.disconnect();
    }

    const user = new User({ username, password: hashedPassword });
    await user.save();

    console.log('✅ User created successfully');
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error creating user:', err);
    mongoose.disconnect();
  }
}

createUser();
