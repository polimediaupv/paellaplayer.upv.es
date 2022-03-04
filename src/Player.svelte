<script>
    import { onMount } from 'svelte';
    import { Paella, getUrlParameter } from 'paella-core';

    export let videoId;

    onMount(async () => {
        const initParams = {
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

