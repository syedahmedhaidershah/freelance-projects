const app = {
	init: () => document.addEventListener('DOMContentLoaded', app.proceed, false),
	proceed: () => {
		app.setStyles();
	},
	setStyles: () => {
		const main = document.getElementById('main');

		main.setAttribute('style', 'min-height: ' + (window.innerHeight - 128) + 'px!important;');
	}
}

app.init();