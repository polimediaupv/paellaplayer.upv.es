<script>
    import SvelteMarkdown from 'svelte-markdown';
    import source from '../pages/demos.md';
    import { onMount } from 'svelte';
    import Player from './Player.svelte';

    export let params = {};

    let demos = [];
    let videoId = params.id || "belmar-multiresolution-remote";

    let cancelLoad

    const loadDemos = async () => {
        const response = await fetch('demos/demos.json');
        if (response.ok) {
            demos = await response.json();
        }
        else {
            throw new Error("Error loading demos index.");
        }
    }

    onMount(async () => {
        await loadDemos();
    });

    const loadDemo = async (demoId) => {
        videoId = demoId;
        location.hash = `#/demos/${demoId}`;
        cancelLoad(demoId);

    } 

    const videoIdChanged = (newVideoId) => {
        videoId = newVideoId;
        location.hash = `#/demos/${newVideoId}`;
    }

</script>

<SvelteMarkdown {source} />

<section class="demos-container">
    <div class="demos-index">
        {#each demos as demoSection}
        <h2>{demoSection.title}</h2>
        <ul>
            {#each demoSection.demos as demo}
                <li><button on:click={loadDemo(demo.id)} class={demo.id==videoId ? 'anchor-button disabled' : 'anchor-button'}>{demo.name}</button></li>
            {/each}
        </ul>
        {/each}
    </div>
    
    <div class="demo-player-container">
        {#each demos as demoSection}
            {#each demoSection.demos as demo}
                {#if demo.id === videoId}
                    <h1>{demo.name}</h1>
                {/if}
            {/each}
        {/each}
        <Player {videoId} onVideoIdChanged={videoIdChanged} bind:cancelLoad={cancelLoad}></Player>
    </div>
</section>

<style>
    button.anchor-button {
        border: 0;
        background: transparent;
        text-decoration: underline;
        color: #5e5e5e;
        cursor: pointer;
    }

    button.anchor-button:hover {
        color: red;
    }

    button.anchor-button.disabled {
        color: #6f6f6f;
        text-decoration: none;
        cursor: default;
    }

    section.demos-container {
        display: flex;

    }

    ul {
        padding: 0px;
    }

    li {
        list-style: none;
    }

    div.demos-index {
        width: 20%;
    }

    div.demos-index h2 {
        margin: 0;
    }

    div.demo-player-container {
        width: 70%;
        padding: 2px;
    }

</style>