ARG PHP_VERSION=8.4-fpm
FROM php:${PHP_VERSION}

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo_mysql pdo_pgsql mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Symfony CLI
RUN curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.deb.sh' | bash
RUN apt install symfony-cli

# Set working directory
WORKDIR /var/www

# Copy existing application directory contents
COPY . /var/www

# Change ownership of our applications
RUN chown -R www-data:www-data /var/www

# Change ownership of php fpm pid file
RUN touch /var/run/php-fpm.pid
RUN chown -R www-data:www-data /var/run/php-fpm.pid

# Set default user to www-data
USER www-data

# Expose port and start php-fpm server with custom config
ARG PHP_FPM_PORT=9000
ENV PHP_FPM_PORT=${PHP_FPM_PORT}
EXPOSE ${PHP_FPM_PORT}
CMD ["php-fpm", "-y", "/usr/local/etc/php-fpm.d/www.conf"]
