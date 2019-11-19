<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/',  function () {
    return view('signup_view');
});
Route::get('/signup', function () {
    return view('top');
});
Route::get('/welcome', function () {
    return view('welcome');
});
Route::get('/signin',  function () {
    return view('signin');
});
Route::post('/signupprocess', function() { return view('signup_process'); });




