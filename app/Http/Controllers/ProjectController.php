<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Survey;
use App\Models\Project;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

use function Termwind\render;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    public function index()
    {
        
        return Inertia::render('Projects/ListProjects', [
            'projects' => Project::all()->map(function ($project) {
                return [
                    'id'=>$project->id,
                    'project_name'=>$project->project_name,
                    'desc'=>$project->desc,
                    'slug'=> $project->slug,
                    'created_at'=>$project->created_at->format('j F Y H:i:s '),
                    'updated_at'=>$project->updated_at->format('j F Y H:i:s'),
                ];
            })
        ]);
    }
    public function create()
    {
        return Inertia::render('Projects/CreateProjects');
    }
    public function adminIndex()
    {
        return Inertia::render('Dashboard/Admin', [
            'projects' => Project::all()->map(function ($project) {
                return [
                    'id' => $project->id,
                    'project_name' => $project->project_name,
                    'desc' => $project->desc,
                    'slug' => $project->slug,  // Removed nullable() as it's not necessary here
                    'created_at'=>$project->created_at->format('j F Y H:i:s '),
                    'updated_at'=>$project->updated_at->format('j F Y H:i:s'),
                ];
            })
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_name' => 'required|max:255',
            'desc' => 'required',
        ]);
    
        $project = Project::create([
            'project_name' => $validated['project_name'],
            'desc' => $validated['desc'],
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

            'projects' =>[
            'id' => $project->id,
            'project_name' => $project->project_name,
            'desc' => $project->desc,
            'slug'=> $project->slug,
            'updated_at'=>$project->update_at,

            ]
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'project_name' => 'required|max:255',
            'desc' => 'required',
        ]);

        // Generate the slug from the project name
        $slug = Str::slug($validated['project_name']);

        Project::where('id', $id)->update([
            'project_name' => $validated['project_name'],
            'desc' => $validated['desc'],
            'slug' => $slug,
            'updated_at' => now(),
        ]);

        return redirect()->route('projects')->with('success', 'Project updated successfully.');
    }

    public function destroy($id)
    {
        Project::destroy($id);
        return redirect()->route('projects')->with('success', 'Project deleted successfully.');
    }
}
