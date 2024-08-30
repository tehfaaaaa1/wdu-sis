<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Answer;
use App\Models\Survey;
use App\Models\Question;
use App\Models\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnswerController extends Controller
{
    //
    public function submit(Request $request, $clientSlug, $projectSlug, $id)
    {
        $survey =  Survey::findOrFail($id);

        $question = $request['question'];
        $clientSlug = $request['client_slug'];
        $projectSlug = $request['project_slug'];
        $all = $request->all();
        $allAnswer = $all['answer'];
        dd($all);
        $response = new Response;
        $response->user_id = Auth::user()->id;
        $response->survey_id = $id;
        $response->status = 1;
        $response->save();

        $questionAnswerMap = [];
        foreach ($question as $index => $q) {
            // Assume answers are provided in the same order as questions
            $questionAnswerMap[$q->id] = $allAnswer[$index];
        }

        foreach ($questionAnswerMap as $questionId => $answer) {
            $jawab = new Answer;
            $jawab->response_id = $response->id;
            $jawab->question_id = $questionId;
            $jawab->answer = $answer;
            $jawab->save();
        }

        return redirect()->route('listsurvey', [$clientSlug, $projectSlug])->with('success', 'Update successfully.');
    }
}
