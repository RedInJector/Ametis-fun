# Use the official Node.js 14 image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files to the working directory
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port on which the app will run (default is 3000)
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["npm", "run", "dev"]