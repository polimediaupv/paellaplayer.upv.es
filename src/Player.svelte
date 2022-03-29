<script>
    import { onMount, afterUpdate } from 'svelte';
    import { setCookie, getCookie } from './cookies';
    import { Paella, getUrlParameter, PlayerState, Events } from 'paella-core';
    import getBasicPluginContext from 'paella-basic-plugins';
    import getSlidePluginContext from 'paella-slide-plugins';
    import getZoomPluginContext from 'paella-zoom-plugin';
    import getUserTrackingPluginContext from 'paella-user-tracking';

    export let videoId;
    export let containerId = 'player-container';

    export let onVideoIdChanged;
    export let onPlay;

    let paella = null;
    let firstLoad = true;

    onMount(async () => {
        const initParams = {
            customPluginContext: [
                getBasicPluginContext(),
                getSlidePluginContext(),
                getZoomPluginContext(),
                getUserTrackingPluginContext()
            ],

            configResourcesUrl: 'player-config/',
            configUrl: 'player-config/config.json',

            getVideoId: (config,player) => {
                const cookieVideo = getCookie('nextVideo');
                if (cookieVideo !== "") {
                    videoId = cookieVideo;
                    if (onVideoIdChanged) {
                        onVideoIdChanged(videoId);
                    }
                    return cookieVideo;
                }
                if (!videoId) {
                    videoId = getUrlParameter("id");
                }
                return videoId;
            }
        };

        paella = new Paella(containerId, initParams);

        paella.loadManifest()
            .then(() => console.log("Done"))
            .catch(err => console.error(err));

        paella.bindEvent(Events.PLAY, () => {
            if (typeof(onPlay) === "function") {
                onPlay(paella);
            }
        });
    })

    afterUpdate(async () => {
        if (firstLoad) {
            firstLoad = false;
            return;
        }
        else {
            setCookie('nextVideo',"");
        }

        if (paella && (paella.state === PlayerState.LOADING_MANIFEST || paella.state === PlayerState.LOADING_PLAYER)) {
            // To break a player load, the only option is to reload the page
            setCookie('nextVideo',videoId);
            location.reload();
        }

        if (paella && paella.state === PlayerState.ERROR) {
            await paella.unload();
        }

        if (paella && (paella.state === PlayerState.LOADED ||
            paella.state == PlayerState.MANIFEST))
        {
            await paella.unload();
            await paella.loadManifest();
        }
        else if (paella && paella.state === PlayerState.UNLOADED) {
            await paella.load();
        }
    })
</script>

<div id={containerId} class="player-container"></div>

<style>
    div.player-container {
        min-height: 450px;
    }
</style>