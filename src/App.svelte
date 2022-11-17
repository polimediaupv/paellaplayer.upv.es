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
	import DemosSinglePage from './DemosSinglePage.svelte';
	import Contributions from './Contributions.svelte';
	import Playground from './Playground.svelte';
	
	import { getCookieConsentData, isConsentSaved, setCookieConsentData, clearConsentData } from './cookies';

	import Router from 'svelte-spa-router';

	import { onMount } from 'svelte';

	import { GoogleAnalytics } from '@beyonk/svelte-google-analytics';

	const routes = {
		'/': Home,
		'/download': Download,
		'/about': About,
		'/features': Features,
		'/demos': Demos,
		'/demos/:id': Demos,
		'/contributions': Contributions,
		'/doc/:id': Doc,
		'/demos-all': DemosSinglePage,
		'/playground': Playground,
		'*': NotFound
	}

	let ga = null;
	let cookiesMessage = true;
	const gaMeasurementId = 'G-WR4KH5R0SN';

	function enableAnalytics() {
		ga.init();
	}

	function updateCookiesEvent(cookiesEnabled) {
		const customEvent = new CustomEvent('cookiesUpdated', {
			detail: {
				cookiesEnabled
			}
		});
		window.dispatchEvent(customEvent);
	}

	function acceptCookies() {
		setCookieConsentData({ analytical: true });
		ga.init();
		cookiesMessage = false;
		updateCookiesEvent(true);
	}

	function denyCookies() {
		setCookieConsentData({ analytical: false });
		cookiesMessage = false;
		updateCookiesEvent(false);
	}

	const updateCookies = () => {
		clearConsentData();
		location.reload();
	};

	onMount(() => {
		// Find google analytics cookie
		const cookieConsent = getCookieConsentData();
		cookiesMessage = !isConsentSaved();
		
		if (cookieConsent.analytical) {
			enableAnalytics();
		}
	});

</script>

<GoogleAnalytics 
	bind:this={ga}
	properties={[ gaMeasurementId ]}
	enabled={false} />

<Menu />
<main>
	<section class="container">
		<Router {routes}/>
	</section>
	<Footer onUpdateCookies={updateCookies}/>
</main>

{#if cookiesMessage}
<div class="rgpd-message">
	<h3>This website uses cookies</h3>
	<p>Functionality cookies are used for the proper functioning of the website, and cannot be disabled, but neither do they collect any information that is not strictly necessary for the proper functioning of the website.</p>
	<p>Statistical cookies help website owners understand how visitors interact with websites by gathering and providing information in an anonymous form. You can choose whether to enable or disable statistical cookies.</p>
	<button on:click={acceptCookies}>
		Accept statistical cookies
	</button>
	<button on:click={denyCookies}>
		Deny statistical cookies
	</button>
</div>
{/if}

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

	div.rgpd-message {
		position: fixed;
		bottom: 0px;
		background-color: lightgray;
		padding: 5px 30px 30px 30px;
		box-shadow: 0px 0px 10px;
		left: 0px;
		right: 0px;
		z-index: 1000;
	}

</style>