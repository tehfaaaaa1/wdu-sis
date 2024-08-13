<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SurveyController;

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

    Route::get('/surveys', [SurveyController::class, 'index'])->name('surveys');
    
    Route::get('/users', [UserController::class, 'index'])->name('users')->middleware(['ableCreateUser']);
});

Route::get('/dashboard/admin', function () {
    return Inertia::render('Dashboard/Admin');
})->name('dashboard.admin');

Route::post('/teams/{team}/members', [HomeController::class, 'store'])->name('team-members.store');
