<script>
	import Menu from './Menu.svelte';
	import Footer from './Footer.svelte';
	import Home from './Home.svelte';
	import Download from './Download.svelte';
	import About from './About.svelte';
	import Features from './Features.svelte';
	import NotFound from './NotFound.svelte';
	import Demos from './Demos.svelte';
	import Doc from './Doc.svelte';

	import Router from 'svelte-spa-router';

	const routes = {
		'/': Home,
		'/download': Download,
		'/about': About,
		'/features': Features,
		'/demos': Demos,
		'/doc/:id': Doc,
		'*': NotFound
	}

</script>

<Menu />
<main>
	<section class="container">
		<Router {routes}/>
	</section>
	<Footer />	
</main>


<style>	
	main {
		margin-top: -20px;
	}

	section {
		padding-top: 40px;
		padding-bottom: 90px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>