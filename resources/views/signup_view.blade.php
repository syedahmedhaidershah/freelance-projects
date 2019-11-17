@extends('common')

@section('contents')
<h4 class="col-md-12 text-center py-3 mb-2 text-center">
    Create your Account
</h4>
<div class="sign-up-form bg-white">
    <form class="text-left">

        <div class="col-md-12 mt-3 mb-2 small font-weight-bold px-0">
            Mobile Number
        </div>
        <div class="col-md-12 px-0 mb-2">
            <input class="px-3 py-2 small rounded border-light-gray col-md-12" type="tel" name="Mobile Number" placeholder="Enter Mobile Number"><br>
        </div>
        
        <div class="col-md-12 mt-3 mb-2 small font-weight-bold px-0">
            Name
        </div>
        <div class="col-md-12 px-0 mb-2">
            <input class="px-3 py-2 small rounded border-light-gray col-md-12" type="text" name="Name" placeholder="Enter Name"><br>
        </div>
        
        <div class="col-md-12 mt-3 mb-2 small font-weight-bold px-0">
            Password
        </div>
        <div class="col-md-12 px-0 mb-2">
            <input class="px-3 py-2 small rounded border-light-gray col-md-12" type="password" name="Password" placeholder="Enter Password"><br>
        </div>
        
        <div class="col-md-12 mt-3 mb-2 small font-weight-bold px-0">
            Confirm Password
        </div>
        <div class="col-md-12 px-0 mb-2">
            <input class="px-3 py-2 small rounded border-light-gray col-md-12" type="password" name="Confirm Password" placeholder="Enter Password Again">
        </div>

        <div class="col-md-12 mt-3 mb-2 small font-weight-bold px-0">
            Address
        </div>
        <div class="col-md-12 px-0 d-flex justify-content-between mb-2">
            <div class="col-md-6 pr-2 pl-0">
                <select class="px-3 py-2 small rounded border-light-gray col-md-12" name="Address" placeholder="City">
                    <option value="" selected disabled>Select a City</option>
                    <option value="">Karachi</option>
                    <option value="">Lahore</option>
                    <option value="">Islamabad</option>
                    <option value="">Quetta</option>
                    <option value="">Peshawar</option>
                    <option value="">NYC</option>
                </select> 
                <!-- <input class="px-3 py-2 small rounded border-light-gray col-md-12" type="text" name="Address" placeholder="City"> -->
            </div>
            <div class="col-md-6 pl-2 pr-0  mb-2">
                <input class="px-3 py-2 small rounded border-light-gray col-md-12" type="text" name="Address" placeholder="Locality"><br>
            </div>
        </div>
        <div class="col-md-12 px-0 mb-2">
            <input class="px-3 py-2 small rounded border-light-gray col-md-12" type="text" placeholder="Landmark"><br>
        </div>
        <div class="col-md-12 px-0 mb-2">
            <input class="px-3 py-2 small rounded border-light-gray col-md-12" type="text" placeholder="Eg.- House/Flat No, Society/Apartment Name">
        </div>

        <div class="col-md-12 px-0 my-3 small">
            <p>By clicking on "SignUp" you agree to our terms and Conditions.</p>
        </div>
        <div class="col-md-12 d-flex justify-content-center py-3">
            <button type="button" class="sign-up-btn bg-success text-white rounded px-5 py-2 border-0">SIGN UP</button>
        </div>
        <div class="panel-footer">
            <span class="text-muted">
                <span class="p-r-xs">Already had an account?</span>
                <a class="btn btn-default btn-sm">Sign In</a>
            </span>
        </div>
    </form>
</div>
@endsection