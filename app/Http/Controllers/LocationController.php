<?php

namespace App\Http\Controllers;

use App\Models\Province;
use App\Models\City;
use App\Models\Regency;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function getProvinces()
    {
        return response()->json(Province::select('id', 'name', 'target_response')->get());
    }

    public function getCitiesByProvince($province_id)
    {
        return response()->json(City::where('province_id', $province_id)->get());
    }

    public function getRegenciesByCity($city_id)
    {
        return response()->json(Regency::where('city_id', $city_id)->get());
    }
}
