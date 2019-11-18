@extends('common') @section('contents')
<div class="col-12 px-0 py-5">
    <h4 class="col-12 text-center py-3 mb-2 text-center">
        Create your Account
    </h4>
    <div class="col-md-4 col-sm-8 col-xs-10 sign-up-form bg-white">
        <form id="signup-form" class="text-left" method="POST" action="signupprocess">

            <div class="col-12 mt-3 mb-2 small font-weight-bold px-0">
                Mobile Number
            </div>
            <div class="col-12 px-0 mb-2">
                <input class="px-3 py-2 small rounded border-light-gray col-12" type="tel" name="mobilenumber"
                    placeholder="Enter Mobile Number"><br>
            </div>

            <div class="col-12 mt-3 mb-2 small font-weight-bold px-0">
                Name
            </div>
            <div class="col-12 px-0 mb-2">
                <input class="px-3 py-2 small rounded border-light-gray col-12" type="text" name="name"
                    placeholder="Enter Name"><br>
            </div>

            <div class="col-12 mt-3 mb-2 small font-weight-bold px-0">
                Password
            </div>
            <div class="col-12 px-0 mb-2">
                <input class="px-3 py-2 small rounded border-light-gray col-12" type="password" name="password"
                    placeholder="Enter Password"><br>
            </div>

            <div class="col-12 mt-3 mb-2 small font-weight-bold px-0">
                Confirm Password
            </div>
            <div class="col-12 px-0 mb-2">
                <input class="px-3 py-2 small rounded border-light-gray col-12" type="password" name="confirmpassword"
                    placeholder="Enter Password Again">
            </div>

            <div class="col-12 mt-3 mb-2 small font-weight-bold px-0">
                Address
            </div>
            <div class="col-12 px-0 d-flex justify-content-between mb-2">
                <div class="col-6 pr-2 pl-0">
                    <select class="px-3 py-2 small rounded border-light-gray col-12" name="addresscity" placeholder="City">
                        <option value="" selected disabled>Select a City</option>
                        <option value="">Karachi</option>
                        <option value="">Lahore</option>
                        <option value="">Islamabad</option>
                        <option value="">Quetta</option>
                        <option value="">Peshawar</option>
                        <option value="">NYC</option>
                    </select>
                    <!-- <input class="px-3 py-2 small rounded border-light-gray col-12" type="text" name="Address" placeholder="City"> -->
                </div>
                <div class="col-6 pl-2 pr-0  mb-2">
                    <input class="px-3 py-2 small rounded border-light-gray col-12" type="text" name="addresslocality"
                        placeholder="Locality"><br>
                </div>
            </div>
            <div class="col-12 px-0 mb-3 ">
                <input class="px-3 py-2 small rounded border-light-gray col-12" type="text" placeholder="Landmark" name="landmark"><br>
            </div>
            <div class="col-12 px-0 mb-2">
                <input class="px-3 py-2 small rounded border-light-gray col-12" type="text"
                    placeholder="Eg.- House/Flat No, Society/Apartment Name" name="addresseg">
            </div>

            <div class="col-12 px-0 my-3 small">
                <p>By clicking on "SignUp" you agree to our terms and Conditions.</p>
            </div>
            <div class="col-12 d-flex justify-content-center py-3">
                <button type="button" class="sign-up-btn bg-success text-white rounded px-5 py-2 border-0" onclick="modular.inline.signup()">SIGN UP</button>
            </div>
            <div class="panel-footer">
                <span class="text-muted">
                    <span class="p-r-xs">Already had an account?</span>
                    <a class="btn btn-default btn-sm">Sign In</a>
                </span>
            </div>
        </form>
    </div>
</div>
@endsection