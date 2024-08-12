<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
<<<<<<< HEAD
=======
use Tighten\Ziggy\Ziggy;
>>>>>>> b545bdafc49e60678d63438878bdcbcb9c9e6a7e

class HandleInertiaRequests extends Middleware
{
    /**
<<<<<<< HEAD
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
=======
     * The root template that is loaded on the first page visit.
>>>>>>> b545bdafc49e60678d63438878bdcbcb9c9e6a7e
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
<<<<<<< HEAD
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
=======
     * Determine the current asset version.
>>>>>>> b545bdafc49e60678d63438878bdcbcb9c9e6a7e
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
<<<<<<< HEAD
        return array_merge(parent::share($request), [
            //
        ]);
=======
        return [
            ...parent::share($request),
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
>>>>>>> b545bdafc49e60678d63438878bdcbcb9c9e6a7e
    }
}
