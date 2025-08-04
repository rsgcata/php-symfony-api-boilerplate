<?php

declare(strict_types=1);

namespace App\Presentation\Api;

use App\Domain\DummyEntityRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class HelloController extends AbstractController
{
    #[Route('/')]
    public function index(DummyEntityRepository $repository): Response
    {
        $all = $repository->findAll();
        return new Response('Hello World! Count: ' . count($all));
    }

    #[Route('/api/data', name: 'api_data')]
    public function apiData(): JsonResponse
    {
        $data = [
            'message' => 'Hello from the API!',
            'timestamp' => (new \DateTime())->format('Y-m-d H:i:s'),
            'items' => [
                ['id' => 1, 'name' => 'Item 1'],
                ['id' => 2, 'name' => 'Item 2'],
                ['id' => 3, 'name' => 'Item 3'],
            ]
        ];

        return new JsonResponse($data);
    }
}
