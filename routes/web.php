<?php

use App\Http\Controllers\BiodataController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ResponseController;
use App\Http\Controllers\LocationController;

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

    // Client
    Route::prefix('/client')->group(function (){
        Route::get('/list-client', [ClientController::class, 'index'])->name('listclient');

        Route::get('/create-client', [ClientController::class, 'create'])->name('create_client_page')->middleware('admin');;

        Route::get('/{id}/edit-client', [ClientController::class, 'edit'])->name('edit_client')->middleware('admin');;
    
        Route::post('/createclient', [ClientController::class, 'store'])->name('create_client')->middleware('admin');;

        Route::post('{id}/update-client/', [ClientController::class, 'update'])->name('update_client')->middleware('admin');;

        Route::get('{id}/profile-client/', [ClientController::class, 'profile'])->name('profile_client');
    
        Route::get('/{id}/delete',[ClientController::class, 'destroy'])->name('delete_client')->middleware('admin');;
        
        // Projects
        Route::prefix('{Client:slug}/projects')->group(function () {

            Route::get('/list-projects', [ProjectController::class, 'index'])->name('projects');
    
            Route::get('/create-project', [ProjectController::class, 'create'])->name('create_projects')->middleware(['ableSurvey']);
    
            Route::post('/create-project', [ProjectController::class, 'store'])->name('create_project')->middleware(['ableSurvey']);
            
            Route::get('/{id}/edit-project', [ProjectController::class, 'edit'])->name('edit_projects')->middleware(['ableSurvey']);
            
            Route::put('update-project/{id}', [ProjectController::class, 'update'])->name('update_projects')->middleware(['ableSurvey']);
    
            Route::get('/{id}/delete',[ProjectController::class, 'destroy'])->name('delete_project')->middleware(['ableSurvey']);

            
            // surveys

            Route::prefix('/{Project:slug}/surveys')->group(function () {
                
                Route::get('list-surveys', [SurveyController::class, 'index'])->name('listsurvey');
                
                Route::get('createsurveys', [SurveyController::class, 'create'])->name('create_surveys')->middleware(['ableSurvey']);
                
                Route::post('create-survey', [SurveyController::class, 'store'])->name('create_survey')->middleware(['ableSurvey']);
            
                Route::get('{id}/edit', [SurveyController::class, 'edit'])->name('edit_surveys')->middleware(['ableSurvey']);
    
                Route::put('update-survey/{id}', [SurveyController::class, 'update'])->name('update_survey')->middleware(['ableSurvey']);

                Route::patch('StatusChange/{id}', [SurveyController::class, 'statusChange'])->name('changeStatus')->middleware(['ableSurvey']);
                
                Route::get('/{id}/submission',[SurveyController::class, 'submission'])->name('submission_surveys');

                Route::get('/{Survey:id}/biodata/{Biodata:id}',[BiodataController::class, 'bio'])->name('biodata');
                Route::get('/{Survey:id}/editbiodata/{Biodata:id}',[BiodataController::class, 'editbio'])->name('edit_bio');
                Route::post('/{Survey:id}/add-biodata/{Biodata:id}',[BiodataController::class, 'addBio'])->name('add_bio');
                Route::put('/{Survey:id}/update-biodata/{Biodata:id}',[BiodataController::class, 'updbio'])->name('update_bio');

                Route::get('/{Survey:id}/report/{Response:id}',[SurveyController::class, 'report'])->name('report_surveys');

                Route::post('/{id}/submit',[AnswerController::class, 'submit'])->name('submit_survey');
                
                Route::get('/{id}/list-response',[ResponseController::class, 'index'])->name('response');
                
                Route::get('{id}/delete', [SurveyController::class, 'destroy'])->name('delete_surveys')->middleware(['ableSurvey']);
                
                Route::resource('surveys', SurveyController::class);
                // question
                Route::get('/add-question/{id}',[QuestionController::class, 'question'])->name('question_surveys')->middleware('admin');
                
                // Route::post('/auto-save-question/{id}',[QuestionController::class, 'autoSave'])->name('auto-save-question')->middleware('admin');
                Route::post('/manual-save-question/{id}',[QuestionController::class, 'manualSave'])->name('manual-save-question');
                Route::post('/store-question/{id}',[QuestionController::class, 'store'])->name('question_store')->middleware('admin');
                
            });
       });
    });
    

    Route::get('/users', [UserController::class, 'index'])->name('users.index')->middleware(['ableCreateUser']);

    Route::get('/users/list-users', [UserController::class, 'index'])->name('users')->middleware(['ableCreateUser']);

    Route::post('/users/create', [UserController::class, 'store'])->name('create_user')->middleware(['ableCreateUser']);

    Route::get('/users/create', [UserController::class, 'create'])->name('users.create')->middleware(['ableCreateUser']);

    Route::put('/users/update/{user}', [UserController::class, 'update'])->name('update_user')->middleware(['ableCreateUser']);

    Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('edit_user')->middleware(['ableCreateUser']);

    Route::put('/users/{id}', [UserController::class, 'update'])->name('update_user')->middleware(['ableCreateUser']);

    Route::get('/users/{id}/delete', [UserController::class, 'destroy'])->name('delete_user')->middleware(['ableCreateUser']);

    Route::get('/dashboard/admin', [ProjectController::class, 'adminIndex'])->name('dashboard.admin')->middleware(['admin']);

    Route::get('/dashboard/admin-users', [UserController::class, 'adminIndex'])->name('dashboard.admin_users')->middleware(['admin']);
});

Route::post('/teams/{team}/members', [HomeController::class, 'store'])->name('team-members.store');

// location target survey
Route::get('/provinces', [LocationController::class, 'getProvinces'])->name('provinces.index');
Route::get('/cities/{province_id}', [LocationController::class, 'getCitiesByProvince'])->name('cities.index');
Route::get('/regencies/{city_id}', [LocationController::class, 'getRegenciesByCity'])->name('regencies.index');