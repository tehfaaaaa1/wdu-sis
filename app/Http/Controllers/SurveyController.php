<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Survey;
use Illuminate\Http\Request;

class SurveyController extends Controller
{
    public function index()
    {
        return Inertia::render('Surveys', [
            'surveys' => Survey::all()->map(function ($survey) {
                return [
                    'id'=>$survey->id,
                    'title'=>$survey->title,
                    'desc'=>$survey->desc,
                    'created_at'=>$survey->created_at->format('Y-m-d H:i:s'),
                ];
            })
        ]);
    }
}
