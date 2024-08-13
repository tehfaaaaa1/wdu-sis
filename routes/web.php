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

    Route::get('/surveys/list-surveys', [SurveyController::class, 'index'])->name('surveys');
    
    Route::get('/surveys/createsurveys', function () {
        return inertia::render('Surveys/CreateSurveys');
    })->name('create_surveys')->middleware(['ableCreateUser']);

    Route::resource('surveys', SurveyController::class);

    Route::post('/create', [SurveyController::class, 'store'])->name('create_survey')->middleware(['ableCreateUser']);
    
    Route::put('/update', [SurveyController::class, 'update'])->name('update_survey')->middleware(['ableCreateUser']);
    
    Route::get('/surveys/{id}/edit',[SurveyController::class, 'edit'])->name('edit_surveys')->middleware(['ableCreateUser']);

    Route::get('/users', [UserController::class, 'index'])->name('users')->middleware(['ableCreateUser']);

    Route::get('/createusers', function () {
        return Inertia::render('CreateUsers');
    })->name('create_users');

    Route::get('/dashboard/admin', function () {
        return Inertia::render('Dashboard/Admin');
    })->name('dashboard.admin');
});


Route::post('/teams/{team}/members', [HomeController::class, 'store'])->name('team-members.store');
