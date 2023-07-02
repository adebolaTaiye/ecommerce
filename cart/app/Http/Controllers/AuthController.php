<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserResource;

class AuthController extends Controller
{

    public function index()
    {
        return UserResource::collection(User::all());
        
    }

    public function register(Request $request){
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
            ]
            ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'role' => 'admin',
            'password' => bcrypt($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login( Request $request)
    {
        $data = $request->validate([
                'email' => 'required|email|exists:users,email',
                'password' => 'required'
            ]);
            $remember = $data['remember'] ?? false;
        unset($data['remember']);

        if(!Auth::attempt($data, $remember)){
            return response([
                'error' => 'The Provided Credentials are not correct'
            ], 422);
        }

        $user = Auth::user();
        $token = $user->createToken('token')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
        }

        public function logout(){
            $user = Auth::user();
            $user->currentAccessToken()->delete();

            return response([
                'success' => 'loggedOut'
            ]);
        }
}
