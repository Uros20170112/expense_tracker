<?php

namespace App\Http\Controllers;

use App\Http\Resources\User\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Http\Resources\User\UserResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return UserResource::collection($users);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return new UserResource($user);
    }

    // public function login(Request $request)
    // {
    //     if (!Auth::attempt($request->only('email', 'password'))) {
    //         return response()->json(['message' => 'Unauthorized'], 401);
    //     }

    //     $user = User::where('email', $request['email'])->firstOrFail();

    //     $token = $user->createToken('auth_token')->plainTextToken;

    //     return response()->json([
    //         'message' => $user->name . ' logged in',
    //         'access_token' => $token,
    //         'token_type' => 'Bearer'
    //     ]);
    // }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return new UserResource($user);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'sometimes|required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user->update([
            'name' => $request->name ?? $user->name,
            'email' => $request->email ?? $user->email,
            'password' => $request->password ? Hash::make($request->password) : $user->password,
        ]);

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();

            return response()->json(['message' => 'User deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'User not found.'], 404);
        }
    }

    public function destroyMultiple(Request $request)
    {
        try {
            $ids = $request->input('ids');
            
            User::whereIn('id', $ids)->delete();

            return response()->json(['message' => 'Users deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred.'], 500);
        }
    }

    public function indexPaginate()
    {
        $users = User::all();
        if (is_null($users)) {
            return response()->json('No users found', 404);
        }
        $users = User::paginate(5);
        return response()->json(new UserCollection($users));
    }

    public function exportToCSV()
    {
        $fileName = 'users.csv';
        $users = User::all();

        $headers = [
            "Content-Type" => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma" => "no-cache",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Expires" => "0"
        ];

        $columns = ['ID', 'Name', 'Email', 'Created At', 'Updated At'];

        $callback = function () use ($users, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($users as $user) {
                $row['ID'] = $user->id;
                $row['Name'] = $user->name;
                $row['Email'] = $user->email;
                $row['Created At'] = $user->created_at;
                $row['Updated At'] = $user->updated_at;

                fputcsv($file, array($row['ID'], $row['Name'], $row['Email'], $row['Created At'], $row['Updated At']));
            }

            fclose($file);
        };

        return Response::stream($callback, 200, $headers);
    }
}
