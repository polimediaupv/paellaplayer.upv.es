<script>
    import SvelteMarkdown from 'svelte-markdown';
    import source from '../pages/playground.md';
    import { onDestroy, onMount } from 'svelte';
    import Player from './Player.svelte';
    import Editor from './Editor.svelte';
    import defaultConfig from "../docs/player-config/config.json";
    import defaultManifest from "../docs/demos/belmar-multiresolution-remote/data.json";
    import demos from "../docs/demos/demos.json";

    export let params = {};

    let updateEditorText;

    const ids = [];
    demos.forEach(group => {
        if (group.id !== "error-handling") {
            group.demos.forEach(id => ids.push(id));
        }
    });

    let config = defaultConfig;
    let configText = JSON.stringify(config, "", "  ");
    let error = "";

    let manifest = {};
    let manifestText = ""
    let videoId = params.id || "belmar-multiresolution-remote";

    const loadManifest = async (id) => {
        const response = await fetch(`demos/${id.id}/data.json`);
        if (response.ok) {
            manifest = await response.json();
            manifestText = JSON.stringify(manifest,"","  ");
            setTimeout(() => updateEditorText(), 100);
        }
    }


    let styleText = "";
    let styleElem = null;

    let reloadPlayer;

    let tabPage = 'config';

    const reloadStyle = (styleText) => {
        if (styleElem) {
            styleElem.parentNode.removeChild(styleElem);
        }

        styleElem = document.createElement('style');
        styleElem.innerHTML = styleText;
        document.head.appendChild(styleElem);
    }

    onMount(async () => {
        manifest = defaultManifest;
        manifestText = JSON.stringify(manifest, "", "  ");

        const defaultCssResponse = await fetch("playground-style.css");
        styleText = await defaultCssResponse.text();
        reloadStyle(styleText);
    })

    onDestroy(() => {
        if (styleElem) {
            styleElem.parentNode.removeChild(styleElem);
        }
    });

    const reload = async () => {
        let currentError = "";
        try {
            error = "";
            currentError = "Error in configuration file: ";
            config = JSON.parse(configText);

            currentError = "Error in video manifest file: ";
            manifest = JSON.parse(manifestText);
            
            await reloadPlayer();

            reloadStyle(styleText);
        }
        catch(err) {
            error = currentError + err.message;
        }
    }

    const idChanged = async (evt) => {
        const selected = ids[evt.target.selectedIndex];
        loadManifest(selected);
    }

</script>

<SvelteMarkdown {source}></SvelteMarkdown>

<section class="player-section">
    <Player {videoId} {config} {manifest} bind:reloadPlayer={reloadPlayer}></Player>
</section>

<section class="editor-section">
    <ul>
        <li class="{ tabPage === 'config' ? 'current' : '' }">
            <button on:click={() => tabPage = 'config' }>Configuration</button>
        </li>
        <li class="{ tabPage === 'manifest' ? 'current' : '' }">
            <button on:click={() => tabPage = 'manifest' }>Video Manifest</button>
        </li>
        <li class="{ tabPage === 'style' ? 'current' : '' }">
            <button on:click={() => tabPage = 'style' }>Custom Styles</button>
        </li>
        <li class="tools">
            <button on:click={() => reload()}>ReloadPlayer</button>
        </li>
    </ul>
    { #if tabPage === 'config' }
        <div class="editor-config-page">
            <Editor class="editor-container" height="200px" bind:text={configText} language="json"></Editor>
        </div>
    { :else if tabPage === 'manifest' }
        <div class="editor-manifest-page">
            <div class="tab-tools-container">
                <label for="videoIdSelector">Example video manifests:</label>
                <select id="videoIdSelector" name="videoIdSelector" on:change="{idChanged}">
                    {#each ids as id}
                        <option value={id}>{id.name}</option>
                    {/each}
                </select>
            </div>
            <Editor class="editor-container" height="200px" bind:text={manifestText} bind:updateText={updateEditorText} language="json"></Editor>
        </div>
    { :else if tabPage === 'style' }
        <div class="editor-style-page">
            <Editor class="editor-container" height="200px" bind:text={styleText} language="css"></Editor>
        </div>
    { /if }
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

    .editor-section ul {
        display: flex;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .editor-section ul li button {
        background-color: #4c4c4c;
        color: white;
        cursor: pointer;
        border: 0px;
        lighting-color: transparent;
        padding: 10px;
    }
    .editor-section ul li.current button {
        pointer-events: none;
        background-color: #cc0000;
        color: white;
    }

    .editor-section ul .tools {
        margin-left: auto;
    }

    .editor-section ul .tools button {
        background-color: #cc0000;
    }

    .editor-section ul .tools button:hover {
        background-color: red;
    }

    .tab-tools-container {
        background-color: #4c4c4c;
        border: 1px solid black;
        color: white;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 20px;
    }

</style>