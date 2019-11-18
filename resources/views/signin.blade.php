@extends('common')

@section('contents')
<h4 class="col-12 text-center py-3 mb-2 text-center">
    Sign in to your account
</h4>
<div class="sign-up-form bg-white">
    <form class="text-left">
        <div>
            <div class="col-12 mt-3 mb-2 small font-weight-bold px-0">
                Mobile Number
            </div>
            <div class="col-12 px-0 mb-2">
                <input class="px-3 py-2 small rounded border-light-gray col-12" type="tel" name="Mobile Number" placeholder="Enter Mobile Number"><br>
            </div>
            <div class="col-12 mt-3 mb-2 small font-weight-bold px-0">
                Password
            </div>
            <div class="col-12 px-0 mb-2">
                <input class="px-3 py-2 small rounded border-light-gray col-12" type="password" name="Password" placeholder="Enter Password"><br>
            </div>
        </div>
    </form>
</div>
@endsection