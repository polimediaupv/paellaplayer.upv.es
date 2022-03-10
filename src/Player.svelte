<script>
    import { onMount } from 'svelte';
    import { Paella, getUrlParameter } from 'paella-core';
    import getBasicPluginContext from 'paella-basic-plugins';
    import getSlidePluginContext from 'paella-slide-plugins';
    import getZoomPluginContext from 'paella-zoom-plugin';
    import getUserTrackingPluginContext from 'paella-user-tracking';

    export let videoId;

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
                if (!videoId) {
                    videoId = getUrlParameter("id");
                }
                return videoId;
            }
        };

        const paella = new Paella('player-container', initParams);

        paella.loadManifest()
            .then(() => console.log("Done"))
            .catch(err => console.error(err));
    })
</script>

<div id="player-container"></div>

<style>
    #player-container {
        min-height: 450px;
    }
</style>