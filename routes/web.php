<?php

use App\Http\Controllers\CampaignController;
use App\Http\Controllers\ContactController;
use Inertia\Inertia;
use App\Mail\TestMail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Middleware\ableCUDdSurvey;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\BiodataController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ResponseController;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('listclient');
    }   

    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('/invite/{email}/{password}/{Client:slug}/{Project:slug}/{Survey:id}', [HomeController::class ,'coba']);
Route::middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified'])->group(function () {
    Route::get('/', function () {
        if (Auth::check()) {
            return redirect()->route('listclient');
        }   
        $user = Auth::user();
        $client = DB::table('clients')->where('id', $user->client_id)->first();
    
        return Inertia::render('Dashboard', [
            'client_name' => $client->client_name ?? 'No client assigned',
        ]);
    })->name('dashboard');
    //Contact and Recipient
    Route::prefix('/contact')->group(function (){
        Route::get('/', [ContactController::class, 'contact'])->name('list-contact');
        Route::get('/recipient-list', [ContactController::class, 'recipient'])->name('list-recipient');
        Route::post('/create-recipient', [ContactController::class, 'createRecipient'])->name('create-recipient');
        Route::get('/recipient/{Recipient:slug}/details', [ContactController::class, 'details'])->name('recipient-details');
        Route::get('/recipient/{Recipient:slug}/add-contact', [ContactController::class, 'addContact'])->name('add-contact');
        Route::post('/recipient/{Recipient:slug}/addcontact', [ContactController::class,'storeContact'])->name('store-contact');
        Route::post('/recipient/{Recipient:slug}/import-contact', [ContactController::class, 'importContact'])->name('contact.import');
        Route::get('/edit-contact/{Recipient:slug}/{Contact:id}', [ContactController::class, 'editContact'])->name('edit-contact');
        Route::get('/edit-contact/{Contact:id}', [ContactController::class, 'editContact2'])->name('edit-contact-2');
        Route::post('/update-contact/{Recipient:slug}/{Contact:id}', [ContactController::class, 'updateContact'])->name('update-contact');
        Route::post('/update-contact/{Contact:id}', [ContactController::class, 'updateContact2'])->name('update-contact-2');
        Route::get('/remove-contact/{Recipient:slug}/{ContactRecipient:id}', [ContactController::class, 'remove'])->name('remove-contact');
        Route::get('/remove-contact/{Contact:id}', [ContactController::class, 'delete'])->name('delete-contact');
    });
    //campaign
    Route::prefix('/campaign')->group(function () {
        Route::get('/', [CampaignController::class, 'index'])->name('campaigns');
        Route::post('/create-campaign', [CampaignController::class, 'store'])->name('create-campaign');
        // Route::get('/email-send', [HomeController::class, 'sendEmail'])->name('email.send');
        Route::get('/send', function () { return View::make('emails.testMail'); })->name('email.send');
        Route::get('/{Campaign:slug}/details', [CampaignController::class, 'details'])->name('campaign-details');
        Route::post('/add-recipient/{Campaign:slug}', [CampaignController::class, 'addRecipient'])->name('add-recipient');
        Route::post('/{Campaign:slug}/details/add-data', [CampaignController::class, 'addData'])->name('campaign-data');
        Route::get('/{Campaign:slug}/email-builder', [CampaignController::class, 'emailBuilder'])->name('email-builder');
        Route::post('/add-sender/{Campaign:slug}',[ CampaignController::class, 'addSender'])->name('add-sender');
        Route::post('/update-sender/{Sender:id}/{Campaign:slug}',[ CampaignController::class, 'updateSender'])->name('update-sender');
    });
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
            Route::get('/create-project', [ProjectController::class, 'create'])->name('create_projects')->middleware(['admin']);
            Route::post('/create-project', [ProjectController::class, 'store'])->name('create_project')->middleware(['admin']);
            Route::get('/{id}/edit-project', [ProjectController::class, 'edit'])->name('edit_projects')->middleware(['admin']);
            Route::put('update-project/{id}', [ProjectController::class, 'update'])->name('update_projects')->middleware(['admin']);
            Route::get('/{id}/delete',[ProjectController::class, 'destroy'])->name('delete_project')->middleware(['admin']);

            
            Route::prefix('/{Project:slug}/surveys')->group(function () {
                // Surveys
                Route::get('list-surveys', [SurveyController::class, 'index'])->name('listsurvey');
                Route::get('createsurveys', [SurveyController::class, 'create'])->name('create_surveys')->middleware(['admin']);
                Route::post('create-survey', [SurveyController::class, 'store'])->name('create_survey')->middleware(['admin']);
                Route::get('{id}/edit', [SurveyController::class, 'edit'])->name('edit_surveys')->middleware(['admin']);    
                Route::get('{id}/location', [SurveyController::class, 'location'])->name('location_surveys')->middleware(['admin']);  
                Route::put('update-survey/{id}', [SurveyController::class, 'update'])->name('update_survey')->middleware(['admin']);
                Route::patch('StatusChange/{id}', [SurveyController::class, 'statusChange'])->name('changeStatus')->middleware(['admin']);
                Route::get('{id}/delete', [SurveyController::class, 'destroy'])->name('delete_surveys');
                Route::post('/{id}/submit',[AnswerController::class, 'submit'])->name('submit_survey')->middleware(['submission']);
                Route::get('/{id}/submission',[AnswerController::class, 'submission'])->name('submission_surveys')->middleware(['submission']);
                
                //Bio
                Route::get('/{Survey:id}/biodata/{User:id}',[BiodataController::class, 'bio'])->name('biodata');
                Route::get('/{Survey:id}/editbiodata/{User:id}',[BiodataController::class, 'editbio'])->name('edit_bio');
                Route::post('/{Survey:id}/add-biodata/{User:id}',[BiodataController::class, 'addBio'])->name('add_bio');
                Route::put('/{Survey:id}/update-biodata/{User:id}',[BiodataController::class, 'updbio'])->name('update_bio');
                
                //Responde
                Route::get('/{Survey:id}/all-report/', [ResponseController::class, 'allreport'])->name('allreport')->middleware(['ableCUDSurvey']);
                Route::get('/{Survey:id}/report/{Response:id}',[ResponseController::class, 'report'])->name('report_surveys')->middleware(['ableCUDSurvey']);
                Route::get('/{id}/list-response',[ResponseController::class, 'index'])->name('response')->middleware(['ableCUDSurvey']);;
                Route::get('/{id}/list-response/export', [ResponseController::class, 'export'])->name('export-response');
                // question
                Route::get('/add-question/{id}',[QuestionController::class, 'question'])->name('question_surveys')->middleware('admin');
                Route::post('/manual-save-question/{Survey:id}',[QuestionController::class, 'manualSave'])->name('manual-save-question')->middleware('admin');
                Route::post('create-flow/{Survey:id}',[QuestionController::class, 'flow'])->name('save-flow')->middleware('admin');
                Route::get('{Survey:id}/delete-flow/{Flow:id}',[QuestionController::class, 'deleteFlow'])->name('delete-flow')->middleware('admin');
                
                //Resource
                Route::resource('surveys', SurveyController::class);
            });
       });
    });
    // Users
    Route::prefix('/users')->group(function (){
        // Route::get('/users', [UserController::class, 'index'])->name('users.index')->middleware(['ableCreateUser']);
        Route::get('/list-users', [UserController::class, 'index'])->name('users')->middleware(['ableCreateUser']);
        Route::post('/create', [UserController::class, 'store'])->name('create_user')->middleware(['ableCreateUser']);
        Route::get('/create', [UserController::class, 'create'])->name('users.create')->middleware(['ableCreateUser']);
        Route::get('/{id}/edit', [UserController::class, 'edit'])->name('edit-user')->middleware(['ableCreateUser']);
        Route::put('/{id}/update', [UserController::class, 'update'])->name('update_user')->middleware(['ableCreateUser']);
        Route::get('/{id}/delete', [UserController::class, 'destroy'])->name('delete_user')->middleware(['ableCreateUser']);
    });

    Route::get('/dashboard/admin', [ProjectController::class, 'adminIndex'])->name('dashboard.admin')->middleware(['admin']);
    Route::get('/dashboard/admin-users', [UserController::class, 'adminIndex'])->name('dashboard.admin_users')->middleware(['admin']);
});

Route::post('/teams/{team}/members', [HomeController::class, 'store'])->name('team-members.store');

// location target survey
Route::get('/provinces', [LocationController::class, 'getProvinces'])->name('provinces.index');
Route::get('/cities/{province_id}', [LocationController::class, 'getCitiesByProvince'])->name('cities.index');
Route::get('/regencies/{province_id}', [LocationController::class, 'getRegenciesByProvince'])->name('regencies.index');
