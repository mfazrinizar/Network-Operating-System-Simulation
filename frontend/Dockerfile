# Use the official Node.js 20 image as the base image
FROM node:20 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend files
COPY frontend/ .

# Build the Next.js project
RUN npm run build

# Expose the port 3000
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
