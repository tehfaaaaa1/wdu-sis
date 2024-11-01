<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\EmailContact;
use App\Models\Recipient;
use App\Models\User;
use Inertia\Inertia;
use App\Mail\TestMail;
use App\Models\Survey;
use App\Models\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Imports\ContactsImport;
use App\Models\Sender;
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
            'campaigns' => collect($campg)->map(function ($c) {
                return [
                    'id' => $c->id,
                    'name' => $c->name,
                    'slug' => $c->slug,
                    'dibuat' => $c->created_at->format('M d Y H:i'),
                    'update' => $c->updated_at->format('M d Y H:i')
                ];
            })
        ]);
    }
    public function details($slug)
    {
        $campaign = Campaign::where('slug', $slug)->first();
        $send = $campaign->sender;
        $rec = $campaign->recipient;
        $recipient = Recipient::all();
        $sender = Sender::all();
        if(!$campaign){
            return redirect()->route('list-campaign');
        }
        return Inertia::render('Campaigns/CampaignDetails',[
            'campaign'=> $campaign,
            'created' => $campaign->created_at->format('M d,Y H:i'),
            'senders' => $sender,
            'recipients' => $recipient,
        ]);
    }
    public function addData(Request $request, $slug)
    {
        // dd($request->subject);
        $campaign = Campaign::firstOrNew(['slug'=>$slug??null]);
        $campaign->name = $request->name;
        $campaign->subject = $request->subject ?? null;
        $campaign->sender_id = $request->sender_id ?? null;
        $campaign->recipient_id = $request->recipient_id ?? null;
        $campaign->content = $request->isi ?? null;
        $campaign->save();
        return back();
    }
    public function store(Request $request)
    {
        // dd($request);
        $validated = $request->validate([
            'name' => 'string|max:255',
        ]);
        Campaign::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name'] . now())
        ]);
        return redirect()->route('campaigns')->with('success', 'Success Add Campaign');
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
    // sender
    public function addSender(Request $request, $slug) {
        $validate = $request->validate([
            'sender_name' => 'required|string|max:255',
            'sender_email' => 'required|email|max:255',
            'sender_reply' => 'required|email|max:255',
        ]);

        $send = new Sender;
        $send->name = $validate['sender_name'];
        $send->email = $validate['sender_email'];
        $send->reply_address = $validate['sender_reply'];
        $send->save();
        // dd($send->id);
        $camp = Campaign::firstOrNew(['slug'=>$slug]);
        $camp->sender_id = $send->id;
        $camp->save();
        return redirect()->route('campaign-details',[$slug])->with(['addSender'=> false]);
    }
    public function updateSender(Request $request, $id, $slug) {
        $validate = $request->validate([
            'sender_name'=> 'required|string|max:255',
            'sender_email' => 'required|email|max:255',
            'sender_reply'=> 'required|email|max:255',
        ]);
        Sender::where('id', $id)->update([
           'name' => $validate['sender_name'],
            'email'=> $validate['sender_email'],
            'reply_address' => $validate['sender_reply'],
        ]);
        return redirect()->route('campaign-details',[$slug]);  
    }
    
    public function addRecipient(Request $request, $slug) {
        $validated = $request->validate([
            'name'=> 'required|string|max:255'
        ]);
        // dd(str::slug($validated['name'].now()));
        $rec = new Recipient();
        $rec->name = $validated['name'];
        $rec->slug = Str::slug($validated['name'].now());
        $rec->save();
        $camp = Campaign::firstOrNew(['slug'=> $slug]);
        $camp->recipient_id = $rec->id;
        $camp->save();

        return back();
    }

    public function emailBuilder()
    {
        return Inertia::render('Campaigns/MailBuilder');
    }
}
