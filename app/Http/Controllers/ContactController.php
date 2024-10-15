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
            'recipients'=> $recipient
        ]);
    }
    public function createRecipient(Request $request) {
        $validated = $request->validate([
            'name'=> 'required|string|max:255'
        ]);
        Recipient::create(['name'=> $validated['name']]);
    }


    public function importContact(Request $request, $id) {
        Excel::import(new ContactsImport($id), $request->file('file'));
    }

    public function details($id) {
        $rec = Recipient::where('id', $id)->get();
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


    public function addContact($id){
        $rec = Recipient::where('id', $id)->first();
        return Inertia::render('Contact/AddContact',[
            'recipient'=>$rec
        ]);
    }
    public function storeContact(Request $request, $id) {
        $datas = $request->data;
        // dd($datas);
        foreach($datas as $data){
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
                'recipient_id' => $id ?? $id
            ]);
            $conrep->email_contact_id = $contact->id;
            $conrep->recipient_id = $id;
            $conrep->save();
        }
        return redirect()->route('recipient-details',[$id]);
    }
}
