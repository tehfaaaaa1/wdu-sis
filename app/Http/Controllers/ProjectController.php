<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use Inertia\Inertia;
use App\Models\Project;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

use function Termwind\render;

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

    public function adminIndex()
    {
        return Inertia::render('Dashboard/Admin', [
            'projects' => Project::all()->map(function ($project) {
                return [
                    'id' => $project->id,
                    'project_name' => $project->project_name,
                    'desc' => $project->desc,
                    'slug' => $project->slug,  // Removed nullable() as it's not necessary here
                    'created_at' => $project->created_at->format('Y-m-d H:i:s'),
                    'updated_at' => $project->updated_at->format('Y-m-d H:i:s'),
                ];
            })
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'project_name' => 'required|max:255',
            'desc' => 'required',
            'slug'=> '',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    
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
        $request->validate([
            'project_name' => 'required|max:255',
            'desc' => 'required',
        ]);

        // Generate the slug from the project name
        $slug = Str::slug($request->project_name);

        Project::where('id', $id)->update([
            'project_name' => $request->project_name,
            'desc' => $request->desc,
            'slug' => $slug,  // Update the slug
            'updated_at' => now(),
        ]);

        return redirect()->route('projects')->with('success', 'Project updated successfully.');
    }

    public function destroy($id)
    {
        Project::destroy($id);
        return redirect()->route('projects')->with('success', 'Project deleted successfully.');
    }

    public function create() {
        return Inertia::render('Projects/CreateProjects');
    }
}
