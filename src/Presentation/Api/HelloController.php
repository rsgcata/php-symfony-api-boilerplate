<?php

declare(strict_types=1);

namespace App\Presentation\Api;

use App\Domain\DummyEntityRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
}
