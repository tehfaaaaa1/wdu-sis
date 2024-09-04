<?
namespace App\Http\Controllers;

use App\Models\Province;
use App\Models\City;
use App\Models\Regency;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function index()
    {
        $provinces = Province::with(['cities', 'regencies'])->get();
        return inertia('Location/Index', [
            'provinces' => $provinces
        ]);
    }

    public function cities($provinceId)
    {
        $cities = City::where('province_id', $provinceId)->get();
        return response()->json($cities);
    }

    public function regencies($provinceId)
    {
        $regencies = Regency::where('province_id', $provinceId)->get();
        return response()->json($regencies);
    }
}
