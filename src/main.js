import { routes } from 'svelte-hash-router';
import App from './App.svelte';
import Home from './Home.svelte';
import Download from './Download.svelte';
import About from './About.svelte';
import Features from './Features.svelte';
import NotFound from './NotFound.svelte';
import Demos from './Demos.svelte';

routes.set({
	'/': Home,
	'/download': Download,
	'/about': About,
	'/features': Features,
	'/demos': Demos,
	'*': NotFound
});

export default new App({ target: document.body });
