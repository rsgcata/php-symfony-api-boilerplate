#!/bin/sh
set -e

echo "Starting UI development server..."

# Attempt to start the dev server
npm run dev -- --host 0.0.0.0 || {
  echo "Development server failed to start or exited unexpectedly"
  echo "Container will continue running to allow for debugging"

  # Keep the container running indefinitely
  while true; do
    echo "Container is still running. You can connect to it using 'docker exec'"
    sleep 60
  done
}