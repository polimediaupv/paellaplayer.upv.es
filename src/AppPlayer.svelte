<script>
	import Player from './Player.svelte';
	
	import { setCookie, getCookie } from './cookies';;

	import { onMount } from 'svelte';

	import { GoogleAnalytics } from '@beyonk/svelte-google-analytics';


	let ga = null;
	let cookiesMessage = true;

    let videoId = null;

	function enableAnalytics() {
		ga.init();
	}

	function acceptCookies() {
		setCookie("enable-analytics","true");
		ga.init();
		cookiesMessage = false;
	}

	function denyCookies() {
		setCookie("enable-analytics","false");
		cookiesMessage = false;
	}

	onMount(() => {
		// Find google analytics cookie
		const analyticsEnabled = getCookie("enable-analytics");

		if (analyticsEnabled === "") {
			cookiesMessage = true;
		}
		else if (analyticsEnabled === "true") {
			enableAnalytics();
			cookiesMessage = false;
		}
		else if (analyticsEnabled === "false") {
			cookiesMessage = false;
		}
	});

</script>

<GoogleAnalytics 
	bind:this={ga}
	properties={[ 'UA-26470475-6' ]}
	enabled={false} />

<Player {videoId} ></Player>

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