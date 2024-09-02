<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Client;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use File;
class ClientController extends Controller
{
    public function index()
    {
        return Inertia::render('Client/ListClient', [
            'clients' => Client::all()->map(function ($client) {
                return [
                    'id' => $client->id,
                    'client_name' => $client->client_name,
                    'alamat' => $client->alamat,
                    'phone' => $client->phone,
                    'image' => $client->image,
                    'desc' => $client->desc,
                    'slug' => $client->slug,
                    'created_at' => $client->created_at->diffForHumans(),
                    'updated_at' => $client->updated_at->format('j F Y'),
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
            'phone' => 'required|max:20',
            'desc' => 'required',
            'image' => 'required|mimes:png,jpg,jpeg,gif|max:2048'
        ]);
    
        if ($request->hasFile('image')) {
            $fileName = date('YmdHi') . $request->file('image')->getClientOriginalName();
            $request->file('image')->move(public_path('img'), $fileName);
        }
    
        $client = Client::create([
            'client_name' => $validated['client_name'],
            'image' => $fileName,
            'alamat' => $validated['alamat'],
            'phone' => $validated['phone'],
            'slug' => Str::slug($validated['client_name']),
            'desc' => $validated['desc'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    
        Log::info('Phone field:', ['phone' => $request->phone]);
        Log::info('Validated data:', $validated);
        return redirect()->route('listclient')->with('success', 'Client created successfully.');
    }

    public function edit($id)
    {
        $client = Client::findOrFail($id);
        return Inertia::render('Client/EditClient', [
            'clients' => [
                'id' => $client->id,
                'client_name' => $client->client_name,
                'desc' => $client->desc,
                'image' => $client->image,
                'alamat' => $client->alamat,
                'phone' => $client->phone,
                'slug' => $client->slug,
                'updated_at' => $client->update_at,
            ]
        ]);
    }

    public function profile($id)
    {
        $client = Client::findOrFail($id);
        $project = $client->project;

        return Inertia::render('Client/ProfileClient', [
            'client' => [
                'client_name' => $client->client_name,
                'alamat' => $client->alamat,
                'phone'=> $client->phone,
                'desc' => $client->desc,
                'image' => $client->image,
                'date' => $client->created_at->format('j F Y'),
                'slug' => $client->slug
            ],
            'project' => $project->map(function ($project) {
                return [
                    'id' => $project->id,
                    'project_name' => $project->project_name,
                    'image' => $project->image,
                    'desc' => $project->desc,
                    'slug' => $project->slug,
                    'created_at' => $project->created_at->format('j F Y'),
                ];
            }),
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'client_name' => 'required|max:255',
            'alamat' => 'required|max:255',
            'phone' => 'required|max:20',
            'desc' => 'required',
            'image' => 'sometimes|mimes:png,jpg,jpeg,gif|max:2048', 
        ]);

        $client = Client::findOrFail($id);

        $client->update([
            'client_name' => $validated['client_name'],
            'alamat' => $validated['alamat'],
            'phone' => $validated['phone'],
            'desc' => $validated['desc'],
            'slug' => Str::slug($validated['client_name']),
        ]);
        if ($request->hasFile('image')) {
            $filename = date('YmdHi') . '.' . $request->file('image')->getClientOriginalExtension();
            $request->file('image')->move(public_path('img'), $filename);

            if ($client->image && file_exists(public_path('img/' . $client->image))) {
                unlink(public_path('img/' . $client->image));
            }

            $client->update(['image' => $filename]);
        }

        return redirect()->route('listclient')->with('success', 'Client updated successfully.');
        }


    public function destroy($id)
    {
        $client = Client::where('id', $id)->first();
        //        dd($client);
        if (!$client) {
            return response()->json([
                'status' => '500',
                'error' => 'client not found'
            ]);
        }
        Storage::disk('public')->delete(public_path('img') . $client['image']);
        Client::where('id', $id)->delete();

        return redirect()->route('listclient')->with('success', 'Project deleted successfully.');
    }
}
