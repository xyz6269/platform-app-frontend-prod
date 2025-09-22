# ---- Build Stage ----
FROM node:20 AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy source and build
COPY . .
RUN npm run build

# ---- Runtime Stage ----
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy build artifacts
COPY --from=build /app/dist ./

# Expose nginx port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]