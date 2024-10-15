<?php

namespace App\Imports;

use App\Models\EmailContact;
use Illuminate\Http\Request;
use App\Models\ContactRecipient;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ContactsImport implements ToModel, WithHeadingRow
{
    /**
    * @param Collection $collection
    */
    public $id = '';
    public function __construct($id) {
        $this->id = $id;
    }
    public function model(array $row)
    {
        // dd(dd($row));   
        $emailC = EmailContact::firstOrNew(['email'=>$row['email']]);
        $emailC->first_name = $row['first_name'];
        $emailC->last_name = $row['last_name'];
        $emailC->company =$row['company'];
        $emailC->occupation = $row['occupation'];
        $emailC->save();
        return ContactRecipient::firstOrCreate([
            'email_contact_id'=> $emailC->id ?? $emailC->id,
            'recipient_id' => $this->id ?? $this->id
        ]   );
    }
}
