# Use Node.js as the base image (updated to compatible version)
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy the app's source code to the container
COPY . .

# Build the Next app
RUN npm run build

# Serve the production build
CMD ["npm", "start"]