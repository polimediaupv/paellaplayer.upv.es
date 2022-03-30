<script>
    import { onMount } from 'svelte';
    import ExternalMarkdown from './ExternalMarkdown.svelte';
    import SvelteMarkdown from 'svelte-markdown';
    
    import source from '../pages/documentation.md';

    export let params = {}

    const prefix = "https://raw.githubusercontent.com/polimediaupv/paella-core/main/doc/"
    
    let page = params.id;
    let site = prefix + page;
    let section = "doc"

    onMount(() => {
        window.onhashchange = () => {
            window.scrollTo(0, 0);
            window.location.reload();
        }
    });

</script>

{#if page !== 'index.md'}
    <p><a href="#/doc/index.md">Documentation index</a></p>
{:else}
    <SvelteMarkdown {source}></SvelteMarkdown>
{/if}

<ExternalMarkdown {site} {section}></ExternalMarkdown>

<p>This documentation is generated from the <a href="https://github.com/polimediaupv/paella-core/tree/main/doc" target="__blank">paella-core repository at GitHub</a>.</p>

{#if page !== 'index.md'}
    <p><a href="#/doc/index.md">Documentation index</a></p>
{/if}