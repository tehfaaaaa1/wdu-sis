<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use Inertia\Inertia;
use App\Models\Project;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

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
    
    public function store(Request $request, Project $project) {
        $request->validate([
            'project_name' => 'required|max:255',
            'desc' => 'required',
            'slug'=> 'project 1',
            'created_at' => now(),
            'updated_at' => now(),
          ]);
          Project::create($request->all());
          return redirect()->route('projects')
            ->with('success','Post created successfully.');
    }

    public function edit( $id) {
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
    public function update(Request $request, $id){
        // dump($id);
        $request->validate([
            'project_name' => 'required|max:255',
            'desc' => 'required',
          ]);
          Project::where('id', $id)->update([
            'project_name' => $request->project_name,
            'desc' => $request->desc,
            'updated_at' => now()
          ]);
          return redirect()->route('projects')->with('success','Update successfully.');
    }

    public function destroy( $id){
        // dump($id);
        Project::destroy($id);
        return redirect()->route('Projects')->with('success','Update successfully.');
    }


}
