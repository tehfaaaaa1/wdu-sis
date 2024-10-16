<?php

namespace App\Http\Controllers;

use App\Models\ContactRecipient;
use App\Models\Recipient;
use Inertia\Inertia;
use App\Models\EmailContact;
use Illuminate\Http\Request;
use App\Imports\ContactsImport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

class ContactController extends Controller
{
    //
    
    public function contact() {
        $contact = EmailContact::all();
        return Inertia::render('Contact/ListContact', [
            'contact' => $contact
        ]);
    }
    public function recipient() {
        $recipient = Recipient::all();
        return Inertia::render('Contact/ListRecipient', [
            'recipients'=> collect($recipient)->map(function ($r) {
                return[
                    'id' => $r->id,
                    'name' => $r->name,
                    'slug' => $r->slug,
                    'dibuat'=> $r->created_at->format('M d Y H:i'),
                ];
            })
        ]);
    }
    public function createRecipient(Request $request) {
        $validated = $request->validate([
            'name'=> 'required|string|max:255'
        ]);
        Recipient::create([
            'name'=> $validated['name'],
            'slug'=> Str::slug($validated['name'])
        ]);
    }


    public function importContact(Request $request, $slug) {
        Excel::import(new ContactsImport($slug), $request->file('file'));
    }

    public function details($slug) {
        $rec = Recipient::where('slug', $slug)->get();
        foreach($rec as $r){
            // dd($r->contact_recipient->);
            $contactrecipient = $r->contact_recipient;
            foreach($contactrecipient as $c){
                $email = $c->email_contact;
            }
        }
        return Inertia::render('Contact/RecipientDetails',[
            'recipient'=>$rec,
            'contact' => $contactrecipient
        ]);
    }


    public function addContact($slug){
        $rec = Recipient::where('slug', $slug)->first();
        return Inertia::render('Contact/AddContact',[
            'recipient'=>$rec
        ]);
    }
    public function storeContact(Request $request, $slug) {
        $recip = Recipient::where('slug', $slug)->first();
        $validate = $request->validate([
            'data' => 'required|array',
            'data.*.email' => 'required|email',
            'data.*.first_name' => 'required|string',
            'data.*.last_name' => 'required|string',
            'data.*.company' => 'required|string',
            'data.*.occupation' => 'required|string',
        ]);
        foreach($validate['data'] as $data){
            // dd($data);
            $contact = EmailContact::firstOrnew(['email'=> $data['email'] ?? $data['email']]);
            // $contact->email = $data['email'];
            $contact->first_name = $data['first_name'];
            $contact->last_name = $data['last_name'];
            $contact->company = $data['company'];
            $contact->occupation = $data['occupation'];
            $contact->save();

            $conrep =ContactRecipient::firstOrNew([
                'email_contact_id'=> $contact->id ?? $contact->id,
                'recipient_id' => $id ?? $recip['id']
            ]);
            $conrep->email_contact_id = $contact->id;
            $conrep->recipient_id = $recip['id'];
            $conrep->save();
        }
        return redirect()->route('recipient-details',[$recip['slug']]);
    }
}
