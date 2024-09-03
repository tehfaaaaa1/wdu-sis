<?php

namespace App\Http\Controllers;

use URL;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Answer;
use App\Models\Client;
use App\Models\Survey;
use App\Models\Biodata;
use App\Models\Project;
use App\Models\Question;
use App\Models\Response;
use Illuminate\Http\Request;
use App\Models\QuestionChoice;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
// use Illuminate\Database\Eloquent\Relations\BelongsTo;
// use DB;
class SurveyController extends Controller
{
    public function index(Project $project, $clientSlug, $projectSlug)
    {
        $surveyall =  Project::where('slug', $projectSlug)->firstOrFail();
        $projectall = DB::table('projects')
            ->where('slug', $projectSlug)
            ->get();
        $client = Client::where('slug', $clientSlug)->get();
        $s = $surveyall->survey;

        $user = Auth::user();
        $c = $client[0];
        $userClient = User::where('client_id', $c->id)->get();
        $target = count($userClient);


        $response = Response::where('user_id', $user->id)->get();
        return Inertia::render(
            'Client/Projects/Surveys/ListSurveys',
            [
                'surveys' => collect($s)->map(function ($survey) {
                    return [
                        'id' => $survey->id,
                        'title' => $survey->title,
                        'desc' => $survey->desc,
                        'project_id' => $survey->project_id,
                        'created_at' => $survey->created_at->format('j F Y H:i:s'),
                        'updated_at' => $survey->updated_at->format('j F Y H:i:s'),
                        'response' => $survey->response,
                        'target_response' => $survey->target_response
                    ];
                }),
                'projects' => $projectall,
                'clients' => $client,
                'user' => $user,
                'target' => $target,
                'response' => $response,
            ]
        );
    }

    public function create(Project $project, $clientSlug, $projectSlug)
    {
        $project = DB::table('projects')
            ->where('slug', $projectSlug)
            ->get();

        $client = DB::table('clients')
            ->where('slug', $clientSlug)
            ->get();
        return Inertia::render(
            'Client/Projects/Surveys/CreateSurveys',
            [
                'projects' => $project,
                'clients' => $client,
            ]
        );
    }

    public function store(Request $request, $clientSlug, $projectSlug)
    {
        $id = $request->project_id;
        // $clientSlug = $request->client_slug;
        // $projectSlug = $request->project_slug;


        $request->validate([
            'title' => 'required|max:255',
            'desc' => 'required',
            'target_response' => 'required'

        ]);

        Survey::create([
            'title' => $request->title,
            'desc' => $request->desc,
            'target_response' => $request->target_response,
            'project_id' => $id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->route('listsurvey', [$clientSlug, $projectSlug])->with('success', 'Survey created successfully.');
    }

    public function edit(Survey $survey, $clientSlug, $projectSlug, $id)
    {
        $survey =  Survey::findOrFail($id);
        $project = DB::table('projects')
            ->where('slug', $projectSlug)
            ->get();
        $client = DB::table('clients')
            ->where('slug', $clientSlug)
            ->get();
        // dump($survey);
        return Inertia::render(
            'Client/Projects/Surveys/EditSurveys',
            [
                'surveys' => $survey,
                'projects' => $project,
                'clients' => $client,
            ]
        );
    }

    public function update(Request $request, $clientSlug, $projectSlug, $id)
    {
        $project_id = $request->project_id;
        $clientSlug = $request->client_slug;
        $projectSlug = $request->project_slug;

        $survey = Survey::findOrFail($id);

        $request->validate([
            'title' => 'required|max:255',
            'desc' => 'required',
            'target_response' => 'required'
        ]);
        Survey::where('id', $survey['id'])->update([
            'title' => $request->title,
            'desc' => $request->desc,
            'target_response' => $request->target_response,
            'project_id' => $project_id,
            'updated_at' => now()
        ]);
        return redirect()->route('listsurvey', [$clientSlug, $projectSlug])->with('success', 'Update successfully.');
    }

    public function submission(Survey $surveyModel, $clientSlug, $projectSlug, $id)
    {
        // Fetch survey, questions, project, client
        $survey = Survey::findOrFail($id);
        $questions = Question::where('survey_id', $id)->get();
        $project = DB::table('projects')->where('slug', $projectSlug)->get();
        $client = DB::table('clients')->where('slug', $clientSlug)->get();

        // Prepare data to pass to the view
        $formattedQuestions = $questions->map(function ($q) {
            return [
                'id' => $q->id,
                'question_text' => $q->question_text,
                'question_type_id' => $q->question_type_id,
                'survey_id' => $q->survey_id,
                'order' => $q->order,
                'required' => $q->required,
                'choice' => $q->choice,
            ];
        });

        // Render the view
        return Inertia::render(
            'Client/Projects/Surveys/SubmissionSurvey',
            [
                'surveys' => $survey,
                'projects' => $project,
                'clients' => $client,
                'listquestion' => $formattedQuestions,
            ]
        );
    }

    public function report(Survey $surveyModel, $clientSlug, $projectSlug, $surveyId, $responseId)
    {
        $survey = Survey::findOrFail($surveyId);
        $questions = Question::where('survey_id', $surveyId)->get();
        $response = Response::with('user')->where('survey_id', $surveyId)->findOrFail($responseId);
        $project = DB::table('projects')->where('slug', $projectSlug)->first();
        $client = DB::table('clients')->where('slug', $clientSlug)->first();
        $choices = QuestionChoice::all();
        $answers = Answer::where('response_id', $responseId)->get();
        $user = $response->user;

        return Inertia::render(
            'Client/Projects/Surveys/ReportSurvey',
            [
                'surveys' => $survey,
                'projects' => $project,
                'clients' => $client,
                'listquestion' => $questions,
                'choice' => $choices,
                'responses' => $response,
                'answer' => $answers,
                'user' => $user,
            ]
        );
    }

    public function question(Survey $survey, $clientSlug, $projectSlug, $id)
    {
        $survey =  Survey::findOrFail($id);

        $project = DB::table('projects')
            ->where('slug', $projectSlug)
            ->get();
        $client = DB::table('clients')
            ->where('slug', $clientSlug)
            ->get();
        // dump($survey);
        return Inertia::render(
            'Client/Projects/Surveys/AddQuestions',
            [
                'surveys' => $survey,
                'projects' => $project,
                'clients' => $client,
            ]
        );
    }

    public function destroy($clientSlug, $projectSlug, $id)
    {
        $survey =  Survey::findOrFail($id);
        $project = DB::table('projects')
            ->where('slug', $projectSlug)
            ->get();
        $client = DB::table('clients')
            ->where('slug', $clientSlug)
            ->get();

        $survey->delete();

        return redirect()->route('listsurvey', [$clientSlug, $projectSlug])->with('success', 'Survey deleted successfully.');
    }
}
