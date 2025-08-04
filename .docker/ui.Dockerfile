FROM node:22-bookworm

# Set working directory
WORKDIR /app

# Install dependencies
RUN npm install -g vite

# Copy package.json and package-lock.json (if available)
COPY ./ui/package*.json ./

# Install project dependencies
RUN npm install

# Copy project files
COPY ./ui .

# Copy entrypoint script
COPY .docker/ui-entrypoint.sh /usr/local/bin/

# Make entrypoint script executable
RUN chmod +x /usr/local/bin/ui-entrypoint.sh

# Expose port for development server
EXPOSE 5173

# Set entrypoint script
ENTRYPOINT ["/usr/local/bin/ui-entrypoint.sh"]