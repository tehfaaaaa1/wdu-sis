<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Client;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ClientController extends Controller
{
    public function index()
    {
        return Inertia::render('Client/ListClient', [
            'projects' => Client::all()->map(function ($client) {
                return [
                    'id' => $client->id,
                    'project_name' => $client->project_name,
                    'image' => $client->image, 
                    'desc' => $client->desc,
                    'slug' => $client->slug,
                    'created_at' => $client->created_at->diffForHumans(),
                    'updated_at' => $client->updated_at->format('j F Y H:i:s'),
                ];
            })
        ]);
    }

    public function create()
    {
        return Inertia::render('Client/CreateClient');
    }

    // public function adminIndex()
    // {
    //     return Inertia::render('Dashboard/Admin', [
    //         'projects' => Project::all()->map(function ($project) {
    //             return [
    //                 'id' => $project->id,
    //                 'project_name' => $project->project_name,
    //                 'image' => $project->image, 
    //                 'desc' => $project->desc,
    //                 'slug' => $project->slug,  // Removed nullable() as it's not necessary here
    //                 'created_at' => $project->created_at->format('j F Y'),
    //                 'updated_at' => $project->updated_at->format('j F Y H:i:s'),
    //             ];
    //         })
    //     ]);
    // }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_name' => 'required|max:255',
            'alamat' => 'required|max:255',
            'desc' => 'required',
            'image' => 'required|mimes:png,jpg,jpeg,gif|max:2048'
        ]);
        if($request->hasFile('image')){
            $fileName = date('YmdHi').$request->file('image')->getClientOriginalName();

            $request->file('image')->move(public_path('img'), $fileName);
        }

            $client = Client::create([
                'project_name' => $validated['client_name'],
                'desc' => $validated['desc'],
                'alamat' => $validated['alamat'],
                'image' => $fileName,
                'slug' => Str::slug($validated['client_name']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            
        Log::info('Project created:', $client->toArray());

        return redirect()->route('listclient')->with('success', 'Project created successfully.');
    }

    public function edit($id)
    {
        $client = Client::findOrFail($id);
        return Inertia::render('Projects/EditProjects', [
            'projects' => [
                'id' => $client->id,
                'project_name' => $client->client_name,
                'desc' => $client->desc,
                'alamat' => $client->alamat,
                'slug' => $client->slug,
                'updated_at' => $client->update_at,
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
