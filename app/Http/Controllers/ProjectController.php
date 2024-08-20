<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Client;
use App\Models\Survey;
use App\Models\Project;
use Illuminate\Support\Str;

use Illuminate\Http\Request;
use function Termwind\render;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function index(Client $client, $slug)
    {
        $projectall =  Client::where('slug', $slug)->firstOrFail();
        $client = DB::table('clients')
            ->where('slug', $slug)
            ->get();
        $p = $projectall->project;
        // dump($survey);
        return Inertia::render(
            'Client/Projects/ListProjects',
            [
                'surveys' => collect($p)->map(function ($project) {
                    return [
                        'id' => $project->id,
                        'title' => $project->title,
                        'image' => $project->image,
                        'desc' => $project->desc,
                        'client_id' => $project->client_id,
                        'created_at' => $project->created_at->format('j F Y'),
                        'updated_at' => $project->updated_at->format('j F Y'),
                    ];
                }),
                'clients' => $client,
            ]
        );
    }

    public function create(Client $client, $slug)
    {
        $project = DB::table('clients')
        ->where('slug', $slug)
        ->get();

    return Inertia::render(
        'Client/Projects/CreateProjects',
        [
            'clients' => $project,
        ]
    );
    }

    public function adminIndex()
    {
        return Inertia::render('Dashboard/Admin', [
            'projects' => Project::all()->map(function ($project) {
                return [
                    'id' => $project->id,
                    'project_name' => $project->project_name,
                    'image' => $project->image, 
                    'desc' => $project->desc,
                    'slug' => $project->slug,  // Removed nullable() as it's not necessary here
                    'created_at' => $project->created_at->format('j F Y'),
                    'updated_at' => $project->updated_at->format('j F Y H:i:s'),
                ];
            })
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_name' => 'required|max:255',
            'desc' => 'required',
            'client_id' => 'required',
            'image' => 'required|mimes:png,jpg,jpeg,gif|max:2048'
        ]);
        if($request->hasFile('image')){
            $fileName = date('YmdHi').$request->file('image')->getClientOriginalName();

            $request->file('image')->move(public_path('img'), $fileName);
        }
            $project = Project::create([
                'project_name' => $validated['project_name'],
                'desc' => $validated['desc'],
                'image' => $fileName,
                'client_id' => $validated['client_id'],
                'slug' => Str::slug($validated['project_name']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            
        Log::info('Project created:', $project->toArray());

        return redirect()->route('projects')->with('success', 'Project created successfully.');
    }

    public function edit($id)
    {
        $project = Project::findOrFail($id);
        return Inertia::render('Projects/EditProjects', [
            'projects' => [
                'id' => $project->id,
                'project_name' => $project->project_name,
                'desc' => $project->desc,
                'slug' => $project->slug,
                'updated_at' => $project->update_at,
            ]
        ]);
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);
        $validated = $request->validate([
            'project_name' => 'required|max:255',
            'desc' => 'required',
        ]);
        // Generate the slug from the project name
        $slug = Str::slug($validated['project_name']);

        if($image = $request->file('image')){
            $filenname = date('YmdHi').$image->getClientOriginalName();
            $image->move(public_path('img'), $filenname);

            Project::where('id', $project['id'])->update([
                'image' => $filenname,
            ]);
        }else{
            unset($validated['image']);
        }

        Project::where('id', $project['id'])->update([
            'project_name' => $validated['project_name'],
            'desc' => $validated['desc'],
            'slug' => $slug,
            'updated_at' => now(),
        ]);
    //  dd($request->file('image'));
        return redirect()->route('projects')->with('success', 'Project updated successfully.');
    }

    public function destroy($id)
    {
        $project = Project::where('id',$id)->first();
        //        dd($project);
                if(!$project){
                    return response()->json([
                        'status' => '500',
                        'error' => 'project not found'
                    ]);
                }
                Storage::disk('public')->delete(public_path('img'). $project['image']);
                project::where('id', $id)->delete();

                return redirect()->route('projects')->with('success', 'Project deleted successfully.');
    }
}
