<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
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
        $campg = Campaign::all();
        foreach ($survey as $s) {
            $project = $s->project;
            $client = $project->client;
            $res = $s->response;
        }

        return Inertia::render('Campaigns/Campaign', [
            'survey' => $survey,
            'users' => $users,
            'response' => $response,
            'campaigns'=> collect($campg)->map(function ($c)  {
                return [
                    'id'=> $c->id,
                    'name'=> $c->name,
                    'dibuat'=>$c->created_at->format('M d Y H:i'),
                    'upadte' =>$c->updated_at->format('M d Y H:i')
                ];
            })
        ]);
    }
    public function details($id){
        $campg = Campaign::where('id', $id)->first();
        return Inertia::render('Campaigns/CampaignDetails',[
            'campaign'=> $campg,
            'created' => $campg->created_at->format('M d,Y H:i')
        ]);
    }
    public function store(Request $request) {
        // dd($request);
        $validated = $request->validate([
            'name' => 'string|max:255',
        ]);
        Campaign::create([
            'name' => $validated['name'],
        ]);
        return redirect()->route('campaigns')->with('succes', 'Succes Add Campaign');
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
