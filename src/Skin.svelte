<script>
    import SvelteMarkdown from "svelte-markdown";
    import source from "../pages/skin.md";
    import Player from './Player.svelte';
    import { onDestroy, onMount } from "svelte";
    import config from "../docs/player-config/skin-config.json";
    import Editor from './Editor.svelte';

    const videoId = 'belmar-multiresolution-remote';
    
    let tabPage = 'config';

    let skinConfig = "{}";
    let skinStyle = "";
    let icons = [
        {
            plugin: "es.upv.paellaplayer.playPauseButton",
            identifier: "play",
            icon: 
`<svg width="16" height="20" viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.520812 0.122289C0.841885 -0.0530018 1.23305 -0.0389906 1.54076 0.158822L15.5408 9.15882C15.827 9.34282 16 9.65974 16 10C16 10.3403 15.827 10.6572 15.5408 10.8412L1.54076 19.8412C1.23305 20.039 0.841885 20.053 0.520812 19.8777C0.199739 19.7024 0 19.3658 0 19V1C0 0.634194 0.199739 0.297579 0.520812 0.122289ZM2 2.83167V17.1683L13.1507 10L2 2.83167Z" />
</svg>`
        },
        {
            plugin: "es.upv.paellaplayer.playPauseButton",
            identifier: "pause",
            icon:
`<svg width="100%" height="100%" viewBox="0 0 24 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
    <g id="pause" transform="matrix(1,0,0,0.956522,-48,-7.65217)">
        <path d="M64,8L72,8L72,31L64,31L64,8ZM48,8L56,8L56,31L48,31L48,8Z"/>
    </g>
</svg>
`
        }
    ];

    let updateSkinConfig;
    let updateSkinStyle;

    let paella;
    let reloadPlayer;

    async function loadSkin() {
        const skin = {
            styleSheets: [
                skinStyle
            ],
            configOverrides: JSON.parse(skinConfig),
            icons
        }
        console.log(paella);
        console.log(skin);
        await paella.skin.loadSkin(skin);
        reloadPlayer();
    }

</script>

<SvelteMarkdown {source}></SvelteMarkdown>

<section class="player-section">
    <Player {videoId} {config} bind:paella={paella} bind:reloadPlayer={reloadPlayer}></Player>
</section>

<section class="editor-section">
    <ul>
        <li class="{ tabPage === 'config' ? 'current' : ''}">
            <button on:click={() => tabPage = 'config'}>Configuration</button>
        </li>
        <li class="{ tabPage === 'style' ? 'current' : ''}">
            <button on:click={() => tabPage = 'style'}>Style sheet</button>
        </li>
        <li class="{ tabPage === 'icons' ? 'current' : ''}">
            <button on:click={() => tabPage = 'icons'}>Icons</button>
        </li>
        <li class="tools">
            <button on:click={() => loadSkin()}>Load Skin</button>
        </li>
    </ul>
    {#if tabPage === 'config'}
        <div class="editor-config-page">
            <Editor class="editor-container" height="200px" bind:text={skinConfig} bind:updateText={updateSkinConfig} language="json"></Editor>
        </div>
    {:else if tabPage === 'style'}
        <div class="editor-style-page">
            <Editor class="editor-container" height="200px" bind:text={skinStyle} bind:updateText={updateSkinStyle} language="css"></Editor>
        </div>
    {:else if tabPage === 'icons'}
        <div class="editor-icon-page">
            {#each icons as icon, i}
                <div>
                    <label>
                        Identifier:
                        <input name={`identifier_${ i }`} type="text" bind:value={icon.plugin}/>
                    </label>
                </div>
                <div>
                    <label>
                        Name:
                        <input name={`name_${ i }`} type="text" bind:value={icon.identifier}/>
                    </label>
                </div>
                <div>
                    <label>
                        Icon SVG:
                        <Editor class="editor-container" height="100px" bind:text={icon.icon} language="html"></Editor>
                    </label>
                </div>
            {/each}
        </div>
    {/if}
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