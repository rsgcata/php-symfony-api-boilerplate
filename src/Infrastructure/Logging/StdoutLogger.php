<?php

declare(strict_types=1);

namespace App\Infrastructure\Logging;

use Psr\Log\LoggerInterface;
use Psr\Log\LogLevel;

class StdoutLogger implements LoggerInterface
{
    /**
     * Format the message with context.
     *
     * @param string|\Stringable $message
     * @param array $context
     *
     * @return string
     */
    private function formatMessage(string|\Stringable $message, array $context = []): string
    {
        $replacements = [];
        foreach ($context as $key => $value) {
            if ($key === 'exception' && $value instanceof \Throwable) {
                // Skip exception object, we'll handle it separately
                continue;
            }

            if (is_array($value) || is_object($value)) {
                $replacements['{' . $key . '}'] = json_encode($value);
            } else {
                $replacements['{' . $key . '}'] = (string) $value;
            }
        }

        $result = strtr((string) $message, $replacements);

        // Add exception details if available
        if (isset($context['exception']) && $context['exception'] instanceof \Throwable) {
            $exception = $context['exception'];
            $result .= sprintf(
                "\nException: %s\nMessage: %s\nFile: %s:%d\nTrace: %s",
                get_class($exception),
                $exception->getMessage(),
                $exception->getFile(),
                $exception->getLine(),
                $exception->getTraceAsString()
            );
        }

        return $result;
    }

    /**
     * Write a message to stdout.
     *
     * @param string $level
     * @param string|\Stringable $message
     * @param array $context
     */
    private function writeToStdout(string $level, string|\Stringable $message, array $context = []): void
    {
        $formattedMessage = $this->formatMessage($message, $context);
        fwrite(
            fopen('php://stdout', 'w'), sprintf("[%s] %s: %s\n", date('Y-m-d H:i:s'), strtoupper($level),
                            $formattedMessage));
    }

    /**
     * System is unusable.
     */
    public function emergency(string|\Stringable $message, array $context = []): void
    {
        $this->writeToStdout(LogLevel::EMERGENCY, $message, $context);
    }

    /**
     * Action must be taken immediately.
     *
     * Example: Entire website down, database unavailable, etc. This should
     * trigger the SMS alerts and wake you up.
     */
    public function alert(string|\Stringable $message, array $context = []): void
    {
        $this->writeToStdout(LogLevel::ALERT, $message, $context);
    }

    /**
     * Critical conditions.
     *
     * Example: Application component unavailable, unexpected exception.
     */
    public function critical(string|\Stringable $message, array $context = []): void
    {
        $this->writeToStdout(LogLevel::CRITICAL, $message, $context);
    }

    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     */
    public function error(string|\Stringable $message, array $context = []): void
    {
        $this->writeToStdout(LogLevel::ERROR, $message, $context);
    }

    /**
     * Exceptional occurrences that are not errors.
     *
     * Example: Use of deprecated APIs, poor use of an API, undesirable things
     * that are not necessarily wrong.
     */
    public function warning(string|\Stringable $message, array $context = []): void
    {
        $this->writeToStdout(LogLevel::WARNING, $message, $context);
    }

    /**
     * Normal but significant events.
     */
    public function notice(string|\Stringable $message, array $context = []): void
    {
        $this->writeToStdout(LogLevel::NOTICE, $message, $context);
    }

    /**
     * Interesting events.
     *
     * Example: User logs in, SQL logs.
     */
    public function info(string|\Stringable $message, array $context = []): void
    {
        $this->writeToStdout(LogLevel::INFO, $message, $context);
    }

    /**
     * Detailed debug information.
     */
    public function debug(string|\Stringable $message, array $context = []): void
    {
        $this->writeToStdout(LogLevel::DEBUG, $message, $context);
    }

    /**
     * Logs with an arbitrary level.
     */
    public function log($level, string|\Stringable $message, array $context = []): void
    {
        $this->writeToStdout((string) $level, $message, $context);
    }
}