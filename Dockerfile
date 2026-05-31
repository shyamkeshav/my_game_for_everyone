# build 1
FROM node:18-alpine AS build
#working directory
WORKDIR /app
#copy the package-lock and package.json files
COPY package*.json ./
#insatll all the dependencies
RUN npm ci && npm cache clean --force
# copy rest of the source code
COPY . .
#build the app
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:stable-alpine
# Copy the built static files from Stage 1 to Nginx directory
COPY --from=build /app/dist /usr/share/nginx/html
# Copy a custom nginx config if needed, or stick to default
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
