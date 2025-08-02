# Docker Configuration

This directory contains Docker configuration files for the Symfony application.

## Contents

- `docker-compose.yml` - Defines services (PHP, Nginx, PostgreSQL)
- `phpfpm.Dockerfile` - PHP-FPM container configuration
- `nginx.conf` - Nginx web server configuration
- `.env.example` - Example environment file (template for `.env`)
- `php/` - PHP configuration files
  - `local.ini` - PHP settings
  - `www.conf` - PHP-FPM pool configuration

## Usage

Run the application using Docker Compose:

```bash
docker-compose up -d
```

The application will be available at http://localhost:8080