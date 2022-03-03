<script>
	import { Router } from 'svelte-hash-router';
	import Menu from './Menu.svelte';
	import Footer from './Footer.svelte';

</script>

<Menu />
<main>
	<section class="container">
		<Router />
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