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
    // Contact
    public function contact(Request $request) {
        // dd($request->getQueryString());
        $contact = EmailContact::filter(request(['search']))->paginate(20)->withQueryString()->onEachSide(2);
        return Inertia::render('Contact/ListContact', [
            'contact' => $contact,
            'search' => $request->getQueryString()
        ]);
    }
    public function importContact(Request $request, $slug) {
        Excel::import(new ContactsImport($slug), $request->file('file'));
    }
    public function editContact($slug, $id){
        $rec = Recipient::where('slug', $slug)->first();
        $contact = EmailContact::where('id', $id)->first();
        return Inertia::render('Contact/EditContact', [
            'contact'=> $contact,
            'recipient' => $rec
        ]);
    }
    public function editContact2( $id){
        $contact = EmailContact::where('id', $id)->first();
        return Inertia::render('Contact/EditContact', [
            'contact'=> $contact
        ]);
    }
    public function updateContact(Request $request, $slug, $id) {
        $validate = $request->validate([
            'email' => 'required|email|max:255',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'occupation' => 'required|string|max:255',
        ]);
        EmailContact::where('id', $id)->update([
            'email' => $validate['email'],
            'first_name' => $validate['first_name'],
            'last_name'=> $validate['last_name'],
            'company'=> $validate['company'],
            'occupation'=> $validate['occupation']
        ]);
        return redirect()->route('recipient-details', [$slug]);
    }
    public function updateContact2(Request $request,$id) {
        $validate = $request->validate([
            'email' => 'required|email|max:255',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'occupation' => 'required|string|max:255',
        ]);
        EmailContact::where('id', $id)->update([
            'email' => $validate['email'],
            'first_name' => $validate['first_name'],
            'last_name'=> $validate['last_name'],
            'company'=> $validate['company'],
            'occupation'=> $validate['occupation']
        ]);
        return redirect()->route('list-contact');
    }
    public function delete($con_id) {
        $email_con = EmailContact::where('id',$con_id)->first();
        if(!$email_con){
            return response()->json([
                'status' => '500',
                'error' => 'Contact not found'
            ]);
        }
        EmailContact::where('id', $con_id)->delete();
        return redirect()->route('list-contact');
    }
    // Recipient
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
        // dd(str::slug($validated['name'].now()));
        Recipient::create([
            'name'=> $validated['name'],
            'slug'=> Str::slug($validated['name'].now())
        ]);
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
    public function remove(Request $request, $slug, $id) {
        $contact_rec = ContactRecipient::where('id',$id)->first();
        if(!$contact_rec){
            return response()->json([
                'status' => '500',
                'error' => 'Contact not found'
            ]);
        }
        ContactRecipient::where('id', $id)->delete();
        return redirect()->route('recipient-details', [$slug]);
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
