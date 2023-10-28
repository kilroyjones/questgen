# Use the official node image as the base
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilize Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . ./

# Expose the application's port
EXPOSE 5173

# Start the application using dev mode
CMD [ "npm", "run", "dev" ]