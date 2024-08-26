<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\Answer;
use App\Models\Survey;
use App\Models\Question;
use App\Models\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnswerController extends Controller
{
    //
    public function submit(Request $request, $clientSlug, $projectSlug, $id ){
        $survey =  Survey::findOrFail($id);

        $question = DB::table('questions')->where('survey_id', $id)->get();
        $clientSlug = $request['client_slug'];
        $projectSlug = $request['project_slug'];
        $all = $request->all();
        $allAnswer = $all['answer'];
        
        $response = new Response;
        $response->user_id = Auth::user()->id;
        $response->survey_id= $id;
        $response->status = 1;
        $response->save();

            foreach($question as $q){  
                $jawab->response_id = $response->id;
                $jawab->question_id = $q->id;
                foreach($allAnswer as $a){
                    $jawab = new Answer;
                    $jawab->answer = $a;
                    $jawab->save();
                }                       
            }
        
        return redirect()->route('listsurvey', [$clientSlug, $projectSlug])->with('success', 'Update successfully.');
    }
}
