const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up MERN Stack Corporate Training Platform...\n');

// Create frontend .env file
const frontendEnv = 'VITE_API_URL=http://localhost:5000/api\n';
fs.writeFileSync('.env', frontendEnv);
console.log('✅ Created frontend .env file');

// Create backend .env file
const backendEnv = `NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/corporate-training
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
`;

const backendEnvPath = path.join(__dirname, 'backend', '.env');
fs.writeFileSync(backendEnvPath, backendEnv);
console.log('✅ Created backend .env file');

console.log('\n🎉 Setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Install backend dependencies: cd backend && npm install');
console.log('2. Install frontend dependencies: npm install');
console.log('3. Start MongoDB (local or use MongoDB Atlas)');
console.log('4. Seed the database: npm run backend:seed');
console.log('5. Start both servers: npm run start:full');
console.log('\n🌐 Access the application at:');
console.log('- Frontend: http://localhost:5173');
console.log('- Backend API: http://localhost:5000/api');
console.log('\n🔐 Demo accounts:');
console.log('- Student: student@example.com / password');
console.log('- Admin: admin@example.com / password');
