<!DOCTYPE html>
<html>
<head>
	<title>The Kabadiwala</title>
	<link rel="stylesheet" type="text/css" href="{{ url('/css/bootstrap.min.css') }}" />
	<link rel="stylesheet" type="text/css" href="{{ url('/css/bootstrap-grid.min.css') }}" />
	<link rel="stylesheet" type="text/css" href="{{ url('/css/bootstrap-reboot.min.css') }}" />
	<link rel="stylesheet" type="text/css" href="{{ url('/css/style.css') }}" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<script src="{{ url('/js/env.js') }}"></script>
	<script src="{{ url('/js/modular.js') }}"></script>
</head>
<body>

	<div class="col-12 p-0">
	@include('top')
	</div>
	<div id="main" class="min-h-body main col-12 px-5 py-2 bg-lightest-gray">
		@yield('contents')
	</div>
	<div class="col-12 p-0">
	@include('bottom')
	</div>

	<script src="{{ url('/js/jquery.js') }}"></script>
	<script src="{{ url('/js/popper.js') }}"></script>
	<script src="{{ url('/js/bootstrap.bundle.min.js') }}"></script>
	<script src="{{ url('/js/bootstrap.min.js') }}"></script>
</body>
</html>