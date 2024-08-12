<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
<<<<<<< HEAD
=======
use Tighten\Ziggy\Ziggy;
>>>>>>> f7d4836190d4a3a0cb6344051a14c0485303787d

class HandleInertiaRequests extends Middleware
{
    /**
<<<<<<< HEAD
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
=======
     * The root template that is loaded on the first page visit.
>>>>>>> f7d4836190d4a3a0cb6344051a14c0485303787d
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
>>>>>>> f7d4836190d4a3a0cb6344051a14c0485303787d
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
<<<<<<< HEAD
     * @see https://inertiajs.com/shared-data
     *
=======
>>>>>>> f7d4836190d4a3a0cb6344051a14c0485303787d
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
>>>>>>> f7d4836190d4a3a0cb6344051a14c0485303787d
    }
}
