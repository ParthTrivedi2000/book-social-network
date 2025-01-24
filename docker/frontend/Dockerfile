FROM ubuntu:latest
LABEL authors="trive"

ENTRYPOINT ["top", "-b"]

# Step 1: Build stage
FROM node:16 as build-stage

WORKDIR /app

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the React app code
COPY . .

ENV REACT_APP_API_URL=${REACT_APP_API_URL}
# Build the React app for production
RUN npm run build --prod

# Step 2: Nginx server to serve the built React app
FROM nginx:alpine

# Copy custom nginx config to the container
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built app from the build stage to the nginx html folder
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80