<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
<<<<<<< HEAD
=======
use App\Http\Middleware\ableCreateUser;
>>>>>>> f7d4836190d4a3a0cb6344051a14c0485303787d

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
<<<<<<< HEAD

=======
        $middleware->alias([
            'ableCreateUser' => ableCreateuser::class,
         ]);
>>>>>>> f7d4836190d4a3a0cb6344051a14c0485303787d
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
