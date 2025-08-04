<?php

declare(strict_types=1);

namespace App\Presentation\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AuthController extends AbstractController
{
    #[Route('/login', name: 'api_login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // In a real application, you would validate against a database
        // and use proper security measures like password hashing
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';

        // Simple validation for demonstration purposes
        if ($username === 'admin' && $password === 'password') {
            // Generate a simple token (in a real app, use JWT or similar)
            $token = bin2hex(random_bytes(16));

            return new JsonResponse([
                'token' => $token,
                'user' => [
                    'username' => $username,
                    'roles' => ['ROLE_ADMIN']
                ]
            ]);
        }

        return new JsonResponse([
            'message' => 'Invalid credentials'
        ], Response::HTTP_UNAUTHORIZED);
    }

    #[Route('/user', name: 'api_user', methods: ['GET'])]
    public function user(Request $request): JsonResponse
    {
        // In a real application, you would validate the token
        // and return the user information based on the token

        // For demonstration purposes, we'll just return a dummy user
        return new JsonResponse([
            'username' => 'admin',
            'roles' => ['ROLE_ADMIN']
        ]);
    }
}