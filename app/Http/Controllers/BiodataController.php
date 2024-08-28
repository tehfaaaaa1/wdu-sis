<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Survey;
use App\Models\Biodata;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class BiodataController extends Controller
{
    public function bio(Survey $survey, $clientSlug, $projectSlug, $surveyid, $userId)
    {
        $user = Auth::user();
        $survey =  Survey::findOrFail($surveyid); 
        $project = DB::table('projects')->where('slug', $projectSlug)->get();
        $client = DB::table('clients')->where('slug', $clientSlug)->get();

        return Inertia::render(
            'Client/Projects/Surveys/biodata',
            [
                'surveys' => $survey,
                'projects' => $project,
                'clients' => $client,
                'user' => $user,

            ]
        );
    }

    public function addBio(Biodata $biodata, $clientSlug, $projectSlug, $surveyid, $userId, Request $request)
    {
        $clientSlug = $request->client_slug;
        $projectSlug = $request->project_slug;
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'no_hp' => 'required|string|max:255',
            'instansi' => 'required|string|max:255'
        ]);
        $biodata = new Biodata;
        $biodata->nama_responden = $validated['nama'];
        $biodata->alamat = $validated['alamat'];
        $biodata->no_hp = $validated['no_hp'];
        $biodata->instansi = $validated['instansi'];
        $biodata->user_id = Auth::user()->id;
        $biodata->save();
        User::where('id', Auth::user()->id)->update([
            'biodata_id' => $biodata->id,
        ]);
                
        return redirect(route('submission_surveys',[$clientSlug, $projectSlug, $surveyid]));
    }
    public function editbio(Survey $survey, $clientSlug, $projectSlug, $surveyid, $userId)  {
        $user = Auth::user();
        $survey =  Survey::findOrFail($surveyid); 
        $project = DB::table('projects')->where('slug', $projectSlug)->get();
        $client = DB::table('clients')->where('slug', $clientSlug)->get();
        $biodata = Biodata::where('user_id', $userId)->get();
        return Inertia::render(
            'Client/Projects/Surveys/EditBio',
            [
                'surveys' => $survey,
                'projects' => $project,
                'clients' => $client,
                'user' => $user,
                'biodata'=> $biodata
            ]
        );
    }

    public function updbio(Survey $survey, $clientSlug, $projectSlug, $surveyid, $userId, Request $request){
        $clientSlug = $request->client_slug;
        $projectSlug = $request->project;
        
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'no_hp' => 'required|string|max:20',
            'instansi' => 'required|string|max:255'
        ]);

        Biodata::where('user_id', $userId)->update([
            'nama' => $validated['nama'],
            'alamat' => $validated['alamat'],
            'no_hp' => $validated['no_hp'],
            'instansi' => $validated['instansi'],
        ]);

        return redirect()->route('submission_surveys', [$clientSlug, $projectSlug, $surveyid])->with('succes', 'Update Biodata');
    }
}
