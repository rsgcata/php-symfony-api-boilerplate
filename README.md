# Symfony Boilerplate

A Symfony 7.3 application boilerplate with Docker setup (PHP-FPM, Nginx, PostgreSQL).

## Requirements

- Docker
- Docker Compose

## Project Structure

```
symfony-boilerplate/
├── .docker/            # Docker configuration
│   ├── php/            # PHP configuration files
│   ├── .env.example    # Example environment variables
│   ├── docker-compose.yml # Docker Compose configuration
│   ├── nginx.conf      # Nginx server configuration
│   ├── phpfpm.Dockerfile # PHP-FPM image configuration
│   └── ui.Dockerfile   # React UI image configuration
├── bin/                # Command-line tools
│   ├── console         # Symfony console
│   └── phpunit         # PHPUnit test runner
├── config/             # Symfony configuration
├── migrations/         # Database migrations
├── public/             # Web server document root
├── src/                # Application source code
│   ├── Domain/         # Domain layer
│   ├── Infrastructure/ # Infrastructure layer
│   └── Presentation/   # Presentation layer
├── tests/              # Test files
├── ui/                 # React UI application
│   ├── src/            # React source code
│   ├── package.json    # NPM dependencies
│   └── vite.config.js  # Vite configuration
├── composer.json       # Composer dependencies
└── phpunit.dist.xml    # PHPUnit configuration
```

## Getting Started

### Setup

1. Clone this repository:
   ```
   git clone <repository-url>
   cd symfony-boilerplate
   ```

2. Copy the environment file:
   ```
   copy .docker\.env.example .docker\.env
   ```

3. Start the Docker containers:
   ```
   docker-compose up -d
   ```

4. Install dependencies:
   ```
   docker exec app_php composer install
   ```

5. Access the application:
   Open your browser and navigate to `http://localhost:8080`

### Development

#### Running Symfony Commands

Execute Symfony console commands inside the PHP container:

```
docker exec app_php bin/console <command>
```

Common commands:
- `bin/console cache:clear` - Clear the cache
- `bin/console doctrine:migrations:migrate` - Run database migrations
- `bin/console make:entity` - Create a new entity
- `bin/console make:migration` - Create a new migration

#### Running Tests

```
docker exec app_php bin/phpunit
```

#### Code Quality Tools

- PHPStan (static analysis):
  ```
  docker exec app_php vendor/bin/phpstan
  ```

- PHP_CodeSniffer (coding standards):
  ```
  docker exec app_php vendor/bin/phpcs
  ```

## Docker Services

The Docker setup includes four main services:

- **PHP-FPM** (app_php): PHP 8.4 with FPM
- **Nginx** (app_nginx): Web server, accessible at http://localhost:8080
- **UI** (app_ui): React UI with Vite, accessible at http://localhost:5173. The container will continue running even if the dev server fails to start, allowing you to connect to it for debugging.
- **PostgreSQL** (database): Database server, accessible at localhost:5432

## Configuration

### PHP Configuration

You can modify PHP settings in the `.docker/php/local.ini` file.

### Nginx Configuration

The Nginx configuration is in the `.docker/nginx.conf` file.

### Docker Environment Variables

The Docker environment variables are defined in the `.docker/.env` file. You can customize:

- PHP version and container name
- Nginx ports
- UI container name and port
- PostgreSQL configuration

## Stopping the Environment

To stop the Docker containers:

```
docker-compose down
```

To stop and remove volumes (will delete database data):

```
docker-compose down -v
```