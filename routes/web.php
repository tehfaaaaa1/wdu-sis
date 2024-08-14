<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Actions\Jetstream\CreateTeam;
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

    // Surveys
    Route::get('/surveys/list-surveys', [SurveyController::class, 'index'])->name('surveys');

    Route::get('/surveys/createsurveys', function () {
        return inertia::render('Surveys/CreateSurveys');
    })->name('create_surveys')->middleware(['ableSurvey']);

    Route::resource('surveys', SurveyController::class);

    Route::post('/surveys/create', [SurveyController::class, 'store'])->name('create_survey')->middleware(['ableSurvey']);
    
    Route::put('/surveys/update/{id}', [SurveyController::class, 'update'])->name('update_survey')->middleware(['ableSurvey']);
    
    Route::get('/surveys/{id}/edit',[SurveyController::class, 'edit'])->name('edit_surveys')->middleware(['ableSurvey']);

    Route::get('/surveys/{id}/submission',[SurveyController::class, 'submission'])->name('submission_surveys')->middleware(['ableSurvey']);

    Route::get('/surveys/{id}/delete',[SurveyController::class, 'destroy'])->name('delete_surveys')->middleware(['ableSurvey']);

    
    // Users
    Route::get('/users/list-users', [UserController::class, 'index'])->name('users')->middleware(['ableCreateUser']);
    
    Route::get('/createusers', function () {
        return Inertia::render('Users/CreateUsers');
    })->name('create_users')->middleware(['ableCreateUser']);
    
    Route::resource('users', UserController::class);

    Route::post('/users/create', [UserController::class, 'store'])->name('create_user')->middleware(['ableCreateUser']);

    Route::put('/users/update/{id}', [UserController::class, 'update'])->name('update_user')->middleware(['ableCreateUser']);

    Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('edit_user')->middleware(['ableCreateUser']);

    Route::get('/users/{id}/delete', [UserController::class, 'destroy'])->name('delete_user')->middleware(['ableCreateUser']);
    

    Route::get('/dashboard/admin', function () {
        return Inertia::render('Dashboard/Admin');
    })->name('dashboard.admin');    
});


Route::post('/teams/{team}/members', [HomeController::class, 'store'])->name('team-members.store');