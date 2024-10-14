<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Mail\TestMail;
use App\Models\Survey;
use App\Models\Response;
use Illuminate\Http\Request;
use App\Imports\ContactsImport;
use Illuminate\Support\Facades\Mail;
use Maatwebsite\Excel\Facades\Excel;

class CampaignController extends Controller
{
    //
    public function index()
    {
        $survey = Survey::all();
        $users = User::all();
        $response = Response::all();
        foreach ($survey as $s) {
            $project = $s->project;
            $client = $project->client;
            $res = $s->response;
        }

        return Inertia::render('Campaigns/Campaign', [
            'survey' => $survey,
            'users' => $users,
            'response' => $response
        ]);
    }
    public function create(){
        
    }
    public function sendEmail(Request $request)
    {
        $logo = public_path('img\wdu-ijo.png');
        $mailData = [
            'title' => 'Questionnaire Submission Invitation',
            'logo' => $logo,
        ];

        Mail::to('admin@gmail.com')->send(new TestMail($mailData));

        echo "Mail send successfully !!";
    }

    public function importContact(Request $request) {
        // dd($request->file('file'));
        Excel::import(new ContactsImport, $request->file('file'));
    }
}
