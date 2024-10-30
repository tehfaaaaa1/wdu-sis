<?php

use App\Http\Middleware\admin;
use App\Http\Middleware\Submission;
use Illuminate\Foundation\Application;
use App\Http\Middleware\ableCreateUser;
use App\Http\Middleware\ableCUDdSurvey;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        channels: __DIR__.'/../routes/channels.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
        $middleware->alias([
            'ableCreateUser' => ableCreateuser::class,
            'ableCUDSurvey' => ableCUDdSurvey::class,
            'admin' => admin::class,
            'submission' => Submission::class
         ]);
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
