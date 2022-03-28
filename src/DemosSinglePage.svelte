<script>
    import Player from './Player.svelte';
    import { onMount } from 'svelte';
    import {PlayerState} from 'paella-core';
    import source from '../pages/demos-single-page.md';
    import SvelteMarkdown from 'svelte-markdown';

    let demos = [];

    const loadDemo = async () => {
        const response = await fetch('demos/demos.json');
        if (response.ok) {
            demos = await response.json();
        }
        else {
            throw new Error("Error loading demos index.");
        }
    }

    onMount(async () => {
        await loadDemo();
    });

    const onPlay = (targetPlayer => {
        __paella_instances__.forEach(player => {
            if (targetPlayer !== player && player.state === PlayerState.LOADED) {
                player.pause();
            }
        })
    });

</script>

<section class="demos-container">
    <SvelteMarkdown {source}></SvelteMarkdown>
    
    {#each demos as demoSection}
        <h2>{demoSection.title}</h2>
        {#each demoSection.demos as demo}
            <h3>{demo.name}</h3>
            <div class="demo-player">
                <Player videoId={demo.id} containerId={demo.id} onPlay={(target) => onPlay(target)}></Player>
            </div>
        {/each}
    {/each}
</section>

<style>
    div.demo-player {
        margin-bottom: 60px;
        width: 70%;
        margin-left: auto;
        margin-right: auto;
    }
</style>