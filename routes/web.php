<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\ProjectController;

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

Route::middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::prefix('projects')->group(function () {

        Route::get('/list-projects', [ProjectController::class, 'index'])->name('projects');

        Route::get('/create-project', [ProjectController::class, 'create'])->name('create_projects')->middleware(['ableSurvey']);

        Route::get('/edit-project', [ProjectController::class, 'edit'])->name('edit_projects')->middleware(['ableSurvey']);

        Route::post('/create', [ProjectController::class, 'store'])->name('create_project')->middleware(['ableSurvey']);

        Route::get('/{id}/delete',[ProjectController::class, 'destroy'])->name('delete_projects')->middleware(['ableSurvey']);

        Route::get('/{id}/delete',[ProjectController::class, 'destroy'])->name('edit_projects')->middleware(['ableSurvey']);
        
        Route::prefix('{slug}/surveys/')->group(function () {
            
            Route::get('list-surveys', [SurveyController::class, 'index'])->name('listsurvey');
            
            Route::get('createsurveys', [SurveyController::class, 'create'])->name('create_surveys')->middleware(['ableSurvey']);
            
            Route::post('createsurvey', [SurveyController::class, 'store'])->name('create_survey')->middleware(['ableSurvey']);
        
            Route::get('{id}/edit', [SurveyController::class, 'edit'])->name('edit_surveys')->middleware(['ableSurvey']);

            Route::put('update/{id}', [SurveyController::class, 'update'])->name('update_survey')->middleware(['ableSurvey']);

            Route::get('{id}/submission',[SurveyController::class, 'submission'])->name('submission_surveys')->middleware(['ableSurvey']);
            
            Route::get('{id}/delete', [SurveyController::class, 'destroy'])->name('delete_surveys')->middleware(['ableSurvey']);
            
            Route::resource('surveys', SurveyController::class);
        });
   });

    Route::get('/users', [UserController::class, 'index'])->name('users.index');

    Route::get('/users/list-users', [UserController::class, 'index'])->name('users')->middleware(['ableCreateUser']);

    Route::post('/users/create', [UserController::class, 'store'])->name('create_user')->middleware(['ableCreateUser']);
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create')->middleware(['ableCreateUser']);

    Route::put('/users/update/{id}', [UserController::class, 'update'])->name('update_user')->middleware(['ableCreateUser']);

    Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('edit_user')->middleware(['ableCreateUser']);

    Route::put('/users/{id}', [UserController::class, 'update'])->name('update_user')->middleware(['ableCreateUser']);

    Route::get('/users/{id}/delete', [UserController::class, 'destroy'])->name('delete_user')->middleware(['ableCreateUser']);

    Route::get('/dashboard/admin', [ProjectController::class, 'adminIndex'])->name('dashboard.admin')->middleware(['ableSurvey']);

    Route::get('/dashboard/admin-users', [UserController::class, 'adminIndex'])->name('dashboard.admin_users')->middleware(['ableSurvey']);
});

Route::post('/teams/{team}/members', [HomeController::class, 'store'])->name('team-members.store');
