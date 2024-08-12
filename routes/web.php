<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\HomeController;

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
        return Inertia::render('Surveys');})->name('surveys');

    Route::get('/users', function () { 
<<<<<<< HEAD
        return Inertia::render('Users');})->name('users');
=======
        return Inertia::render('Users');})->name('users')->middleware(['ableCreateUser']);
>>>>>>> f7d4836190d4a3a0cb6344051a14c0485303787d
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard/admin', function () {
        return Inertia::render('Dashboard/Admin');
    })->name('dashboard.admin');
});

Route::post('/teams/{team}/members', [HomeController::class, 'store'])->name('team-members.store');