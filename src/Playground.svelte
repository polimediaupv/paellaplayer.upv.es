<script>
    import SvelteMarkdown from 'svelte-markdown';
    import source from '../pages/playground.md';
    import { onMount } from 'svelte';
    import Player from './Player.svelte';
    import Editor from './Editor.svelte';
    import defaultConfig from "../docs/player-config/config.json";

    export let params = {};

    let config = defaultConfig;
    let configText = JSON.stringify(config, "", "  ");
    let error = "";

    let videoId = params.id || "belmar-multiresolution-remote";


    let reloadPlayer;

    onMount(async () => {
        
    })

    const reload = async () => {
        try {
            error = "";
            config = JSON.parse(configText);
            await reloadPlayer(config);
        }
        catch(err) {
            error = err.message;
        }
    }

</script>

<SvelteMarkdown {source}></SvelteMarkdown>

<section class="player-section">
    <Player {videoId} {config} bind:reloadPlayer={reloadPlayer}></Player>
</section>

<section class="editor-section">
    <Editor class="editor-container" height="200px" bind:text={configText}></Editor>
    <div class="editor-buttons">
        <button on:click={reload}>Reload</button>
    </div>
</section>

<section class="error-output-section">
    <div class="error-output">{error}</div>
</section>

<style>
    .player-section {
        padding: 20px;
    }

    .editor-section {
        padding: 20px;
    }

    .error-output-section {
        padding: 20px;
    }

    .error-output {
        color: red;
    }

</style>