<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DesarrolladorMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        auth()->shouldUse('desarrollador');

        if (!auth()->check()) {
            return response()->json(['error' => 'No autenticado como desarrollador'], 401);
        }
        return $next($request);
    }
}
