# MongoDB Setup for TaskMind

## Option 1: Install MongoDB Locally (Recommended)

### Windows:
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Install with default settings
3. Start MongoDB service:
   ```bash
   # Open Command Prompt as Administrator
   net start MongoDB
   ```

### macOS:
```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

### Linux (Ubuntu/Debian):
```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Create list file for MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

## Option 2: Use MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update your `.env` file:
   ```bash
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmind
   ```

## Option 3: Use Docker

```bash
# Pull MongoDB image
docker pull mongo:latest

# Run MongoDB container
docker run -d -p 27017:27017 --name taskmind-mongo mongo:latest
```

## Verify MongoDB is Running

```bash
# Check if MongoDB is running
mongo --eval "db.runCommand({ connectionStatus: 1 })"

# Or use mongosh (newer version)
mongosh --eval "db.runCommand({ connectionStatus: 1 })"
```

## Test Your Setup

1. Start your backend server:
   ```bash
   cd Fyp-Backend-main
   npm run dev
   ```

2. You should see:
   ```
   ✅ MongoDB Connected: localhost
   🚀 TaskMind Backend running on port 3001
   ```

## Troubleshooting

### If MongoDB won't start:
- Check if port 27017 is available
- Ensure MongoDB service is running
- Check MongoDB logs for errors

### If connection fails:
- Verify MongoDB is running on localhost:27017
- Check your .env file has correct MONGODB_URI
- Ensure no firewall is blocking the connection

The authentication system will work without MongoDB, but user data won't persist between server restarts.
