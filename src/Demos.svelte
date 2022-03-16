<script>
    import SvelteMarkdown from 'svelte-markdown';
    import source from '../pages/demos.md';
    import { onMount } from 'svelte';
    import Player from './Player.svelte';

    let demos = [];
    let videoId = "belmar-multiresolution-remote";

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
    } 

    const videoIdChanged = (newVideoId) => {
        videoId = newVideoId;
    }

</script>

<SvelteMarkdown {source} />

<ul>
    {#each demos as demo}
        <li><button on:click={loadDemo(demo.id)} class={demo.id==videoId ? 'anchor-button disabled' : 'anchor-button'}>{demo.name}</button></li>
    {/each}
</ul>

<Player {videoId} onVideoIdChanged={videoIdChanged}></Player>

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
</style>