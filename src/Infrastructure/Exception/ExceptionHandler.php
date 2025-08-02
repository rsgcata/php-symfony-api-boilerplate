<?php

declare(strict_types=1);

namespace App\Infrastructure\Exception;

use DomainException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Exception\RouteNotFoundException;
use Throwable;

class ExceptionHandler
{
    /**
     * Handle an exception and return an appropriate response.
     */
    public function handle(Throwable $exception): Response
    {
        if ($exception instanceof DomainException) {
            return $this->createJsonResponse(
                $exception->getMessage(),
                Response::HTTP_BAD_REQUEST,
            );
        } elseif ($exception instanceof RouteNotFoundException) {
            return $this->createJsonResponse(
                'Not Found',
                Response::HTTP_NOT_FOUND,
            );
        }

        // Handle generic exceptions with a 500 status code
        return $this->createJsonResponse(
            'Internal Server Error',
            Response::HTTP_INTERNAL_SERVER_ERROR
        );
    }

    /**
     * Create a JSON response with the given message and status code.
     */
    private function createJsonResponse(string $message, int $statusCode): JsonResponse
    {
        $data = [
            'error' => [
                'message' => $message,
                'code' => $statusCode,
            ],
        ];

        return new JsonResponse($data, $statusCode);
    }
}
