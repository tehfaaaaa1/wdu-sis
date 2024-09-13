<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Answer;
use App\Models\Survey;
use App\Models\Response;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    public function submit(Request $request, $clientSlug, $projectSlug, $id)
    {
        // Fetch the survey
        $survey = Survey::findOrFail($id);
        // dd($request);
            // Get form data from the request
        $page = $request['page'];
        $clientSlug = $request['client_slug'];
        $projectSlug = $request['project_slug'];

        // Create a new response
        $response = new Response;
        $response->user_id = Auth::user()->id;
        $response->survey_id = $id;
        $response->status = 1;
        $response->save();
        foreach($page as $p){
            $questions = $p['question'];
            $answers = $p['answer']; // Get all answers
            // Iterate through the questions and answers
            foreach ($questions as $index => $question) {
                $answer = $answers[$index];
    
                // Save the answer based on its type
                $this->saveAnswer($response->id, $question['id'], $answer);
            }
        }

        // Redirect after successful submission
        return redirect()->route('listsurvey', [$clientSlug, $projectSlug])->with('success', 'Survey submitted successfully.');
    }

    private function saveAnswer($responseId, $questionId, $answer)
    {
        // Handle checkboxes (which are arrays)
        if (!empty($answer['checkboxes'])) {
            foreach ($answer['checkboxes'] as $checkboxAnswer) {
                $this->createAnswer($responseId, $questionId, $checkboxAnswer);
                }
            } 
            // Handle text and radio answers
            elseif (!empty($answer['texts'])) {
                $this->createAnswer($responseId, $questionId, $answer['texts']);
            } 
        elseif (!empty($answer['radios'])) {
            $this->createAnswer($responseId, $questionId, $answer['radios']);
        } 
        else {
            abort(403, 'Invalid input provided.');
        }
    }

    private function createAnswer($responseId, $questionId, $answer)
    {
        // Save an individual answer to the database
        $jawab = new Answer;
        $jawab->response_id = $responseId;
        $jawab->question_id = $questionId;
        $jawab->answer = $answer;
        $jawab->save();
    }
}
