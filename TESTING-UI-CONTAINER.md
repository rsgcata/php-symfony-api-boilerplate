# Testing the UI Container Resilience

This document provides instructions on how to test that the UI container continues running even if the development server fails to start.

## Normal Operation Test

1. Start the Docker containers:
   ```
   cd .docker
   docker-compose up -d
   ```

2. Verify that the UI container is running:
   ```
   docker ps | findstr app_ui
   ```
   You should see the UI container in the list of running containers.

3. Access the UI in your browser at http://localhost:5173
   The React application should load normally.

## Failure Scenario Test

To test what happens when the development server fails to start:

1. Stop the UI container:
   ```
   docker-compose stop ui
   ```

2. Temporarily modify the UI application to cause an error:
   - Edit the `ui/vite.config.js` file and introduce a syntax error
   - For example, remove a closing bracket or add an invalid configuration option

3. Start the UI container again:
   ```
   docker-compose up -d ui
   ```

4. Check if the container is running despite the error:
   ```
   docker ps | findstr app_ui
   ```
   The container should still be running.

5. View the container logs to confirm the error and continued operation:
   ```
   docker logs app_ui
   ```
   You should see error messages from Vite, followed by messages indicating that the container is still running:
   ```
   Development server failed to start or exited unexpectedly
   Container will continue running to allow for debugging
   Container is still running. You can connect to it using 'docker exec'
   ```

6. Connect to the container for debugging:
   ```
   docker exec -it app_ui /bin/bash
   ```
   You should be able to access the container's shell, allowing you to debug the issue.

7. After testing, fix the intentional error in `vite.config.js` and restart the container:
   ```
   docker-compose restart ui
   ```

This confirms that the UI container continues running even when the development server fails to start, allowing developers to connect to the container for debugging.