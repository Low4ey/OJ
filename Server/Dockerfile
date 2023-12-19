# Use an official Node.js runtime as a base image
FROM node:14

# Set the working directory inside the container
WORKDIR /code

# Copy package.json and package-lock.json to the working directory
COPY ./package.json .

# Install app dependencies
RUN npm install
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]
