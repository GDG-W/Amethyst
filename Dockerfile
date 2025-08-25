# Use Node.js as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# 1. Accept build arguments
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy the app's source code to the container
COPY . .

# 2. Build the Next app (will use the build-time ENV vars)
RUN npm run build

# Serve the production build
CMD ["npm", "start"]