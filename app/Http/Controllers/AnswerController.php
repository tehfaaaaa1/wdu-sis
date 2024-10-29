<?php
namespace App\Http\Controllers;

use queue;
use App\Models\Flow;
use Inertia\Inertia;
use App\Models\Answer;
use App\Models\Survey;
use App\Models\Response;
use App\Events\FormClosed;
use App\Models\QuestionPage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class AnswerController extends Controller
{
    public function submit(Request $request, $clientSlug, $projectSlug, $id)
    {
        // Fetch the survey
        $survey = Survey::findOrFail($id);
            // Get form data from the request
        $page = $request['page'];
        $clientSlug = $request['client_slug'];
        $projectSlug = $request['project_slug'];
        $start = $request->cookie('startTime_survey_'.$id.'_user_'.Auth::user()->id);
        // Create a new response
        $response = new Response;
        $response->user_id = Auth::user()->id;
        $response->survey_id = $id;
        $response->status = 1;
        $response->created_at = $start;
        $response->updated_at = now();
        $response->save();
        if($request->cookie('startTime_survey_'.$id.'_user_'.Auth::user()->id)){
            Cookie::queue(Cookie::forget('startTime_survey_'.$id.'_user_'.Auth::user()->id));
        }
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

    public function submission(Survey $surveyModel, $clientSlug, $projectSlug, $id, Request $request)
    {
        // Fetch survey, questions, project, client
        $survey = Survey::findOrFail($id);
        $project = DB::table('projects')->where('slug', $projectSlug)->get();
        $client = DB::table('clients')->where('slug', $clientSlug)->get();
        $page = QuestionPage::where('survey_id', $id)->get();
        // Prepare data to pass to the view
        $res = Response::where('survey_id', $id)->where('user_id', Auth::user()->id)->first();
        $flow = Flow::where('survey_id', $id)->get();
        $formattedPage = $page->map(function ($p) {
            return [
                'id' => $p->id,
                'page_name' => $p->page_name,
                'survey_id' => $p->survey_id,
                'flow' => $p->flow->map(function ($f) {
                    return ['flow'=>$f];
                }),
                'question' => $p->question->map(function ($q) {
                    return [
                        'id' => $q->id,
                        'question_text' => $q->question_text,  
                        'question_type_id' => $q->question_type_id,
                        'survey_id' => $q->survey_id,
                        'order' => $q->order,
                        'required' => $q->required,
                        'question_choice_id' =>$q->question_choice_id ?? null,
                        'logic_type' => $q->question_logic_type_id ?? null,
                        'logic_name' => $q->logic->logic_type?? null,
                        'choice' => $q->choice,
                    ];
                }),
            ];
        });
        // broadcast(new FormClosed($id));
        
        // Render the view
        return Inertia::render(
            'Client/Projects/Surveys/SubmissionSurvey',
            [
                'surveys' => $survey,
                'projects' => $project,
                'clients' => $client,
                'page' => $formattedPage,
                'pagee' => $page,
                'flow' => $flow,
                // 'responses' => $res['id'] ?? null
            ]
        );
    }

}
