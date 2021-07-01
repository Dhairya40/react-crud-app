<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    use ApiResponser;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::paginate(3);
        return  response()->json([
                    'success' => True,
                    'data' => $user,
                ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    { 
        
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'name' => 'required|string|min:3'
        ]); 
        $request['password'] = Hash::make($request->password);
        if ($request->hasFile('image')) {
            $file = $request->file('image')->store('users');
            $request['image_path'] = $file;
        }
        $request['about'] = $request->message;
        $user = User::create($request->all());
        return  response()->json([
                    'success' => True,
                    'data' => $user,
                ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user,$id)
    { 
        $user = User::where('id',$id)->first();
        return  response()->json([
                    'success' => True,
                    'data' => $user,
                ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'email' => 'required|email|email', 
            'name' => 'required|string|min:3'
        ]); 
        $user = User::where('id',$request['id'])->first(); 
        if ($request->hasFile('image')) {
            $file = $request->file('image')->store('users');
            $user->image_path = $file;
        }
        if (!empty($request['password'])) {
            $user->password= Hash::make($request->password);
        }
        $user->name = $request->name;
        $user->about = $request->about;
        $user->save();
        return  response()->json([
                    'success' => True,
                    'data' => $user,
                ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user,$id)
    {
        $user = User::where('id',$id)->first(); 
        $user->delete();
        return  response()->json([
                    'success' => True,
                    'data' => $user,
                ]);

    }

    public function login(Request $request)
    {
        $attr = $request->validate([
            'email' => 'required|string|email|',
            'password' => 'required|string|min:6'
        ]);

        if (!Auth::attempt($attr)) {
            return $this->error('OPPS! Email or Password is incorrect', 401);
        }

        return $this->success([
            'user' => auth()->user(),
            'token' => auth()->user()->createToken('API Token')->plainTextToken
        ]);
    }

    public function searchData($value='')
    {
        $user = User::where('name','Like',"%$value%")
                    ->orWhere('email','Like',"%$value%")
                    ->paginate(10);
        return  response()->json([
                    'success' => True,
                    'data' => $user,
                ]);
    }
}
