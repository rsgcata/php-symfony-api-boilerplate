<?php

declare(strict_types=1);

namespace App\Infrastructure\Exception;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;

readonly class ExceptionSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private ExceptionHandler $exceptionHandler
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::EXCEPTION => ['onKernelException', 0],
        ];
    }

    public function onKernelException(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();
        $response = $this->exceptionHandler->handle($exception);
        $event->setResponse($response);
    }
}
