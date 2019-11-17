<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="{{ url('/css/bootstrap.min.css') }}" />
	<link rel="stylesheet" type="text/css" href="{{ url('/css/bootstrap-grid.min.css') }}" />
	<link rel="stylesheet" type="text/css" href="{{ url('/css/bootstrap-reboot.min.css') }}" />
	<link rel="stylesheet" type="text/css" href="{{ url('/css/style.css') }}" />
	<title>The Kabadiwala</title>
</head>
<body>

	@include('top')
	<div id="main" class="min-h-body main col-md-12 px-5 py-2 bg-lightest-gray">
		@yield('contents')
	</div>
	@include('bottom')

	<script src="{{ url('/js/index.js') }}"></script>
	<script src="{{ url('/js/jquery.js') }}"></script>
	<script src="{{ url('/js/popper.js') }}"></script>
	<script src="{{ url('/js/bootstrap.bundle.min.js') }}"></script>
	<script src="{{ url('/js/bootstrap.min.js') }}"></script>
</body>
</html>