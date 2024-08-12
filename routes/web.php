<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('dashboard');
    }

    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/surveys', function () {
        return Inertia::render('Surveys');
    })->name('surveys');

<<<<<<< HEAD
    Route::get('/users', function () { 
        return Inertia::render('Users');})->name('users');
=======
    Route::get('/users', [UserController::class, 'index'])->name('users')->middleware(['ableCreateUser']);
>>>>>>> b545bdafc49e60678d63438878bdcbcb9c9e6a7e
});

Route::get('/dashboard/admin', function () {
    return Inertia::render('Dashboard/Admin');
})->name('dashboard.admin');

Route::post('/teams/{team}/members', [HomeController::class, 'store'])->name('team-members.store');
