<script>
    import { onMount, afterUpdate } from 'svelte';
    import { setCookie, getCookie, getCookieConsentData } from './cookies';
    import { Paella, utils, PlayerState, Events, defaultLoadConfigFunction, defaultLoadVideoManifestFunction } from 'paella-core';
    import getBasicPluginContext from 'paella-basic-plugins';
    import getSlidePluginContext from 'paella-slide-plugins';
    import getZoomPluginContext from 'paella-zoom-plugin';
    import getUserTrackingPluginContext from 'paella-user-tracking';
    import getLayoutPluginContext from 'paella-layout-plugins';
    import getWebGLPluginContext from 'paella-webgl-plugins';

    // Customized icons
    import backwardIcon from './icons/backwardIcon.svg';
    import captionsIcon from './icons/captionsIcon.svg';
    import downloadIcon from './icons/downloadIcon.svg';
    import findCaptionsIcon from './icons/findCaptionsIcon.svg';
    import forwardIcon from './icons/forwardIcon.svg';
    import fullscreenIcon from './icons/fullscreenIcon.svg';
    import keyboardIcon from './icons/keyboardIcon.svg';
    import layoutIcon from './icons/layoutIcon.svg';
    import screenIcon from './icons/screenIcon.svg';
    import slidesIcon from './icons/slidesIcon.svg';
    import volumeHighIcon from './icons/volumeHighIcon.svg';
    import volumeLowIcon from './icons/volumeLowIcon.svg';
    import volumeMidIcon from './icons/volumeMidIcon.svg';
    import volumeMuteIcon from './icons/volumeMuteIcon.svg';
    import windowedIcon from './icons/windowedIcon.svg';

    export let videoId;
    export let containerId = 'player-container';

    export let onVideoIdChanged;
    export let onPlay;

    export let config;
    export let manifest;

    export const cancelLoad = (nextVideoId) => {
        if (paella && (paella.state === PlayerState.LOADING_MANIFEST || paella.state === PlayerState.LOADING_PLAYER)) {
            // To break a player load, the only option is to reload the page
            setCookie('nextVideo',nextVideoId);
            location.reload();
            //paella.unload();
        }
    }

    export const reloadPlayer = async () => {
        await paella.reload();
    }

    export let paella = null;

    onMount(async () => {
        const initParams = {
            customPluginContext: [
                getBasicPluginContext(),
                getSlidePluginContext(),
                getZoomPluginContext(),
                getUserTrackingPluginContext(),
                getLayoutPluginContext(),
                getWebGLPluginContext()
            ],

            configResourcesUrl: 'player-config/',
            configUrl: 'player-config/config.json',

            loadConfig: async (configUrl,player) => {
                if (config) {
                    return config;
                }
                else {
                    return await defaultLoadConfigFunction(configUrl,player);
                }
            },

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
                    videoId = utils.getUrlParameter("id");
                }
                return videoId;
            },

            loadVideoManifest: async (videoManifestUrl,config,player) => {
                if (manifest) {
                    return manifest;
                }
                else {
                    return await defaultLoadVideoManifestFunction(videoManifestUrl,config,player);
                }
            },

            getCookieConsentFunction: (type) => {
                const consentData = getCookieConsentData();
                return consentData[type];
            }
        };

        paella = new Paella(containerId, initParams);

        window.addEventListener('cookiesUpdated', () => {
            paella.cookieConsent.updateConsentData();
        })

        paella.loadManifest()
            .then(() => {
                paella.addCustomPluginIcon("es.upv.paella.backwardButtonPlugin","backwardIcon",backwardIcon);
                paella.addCustomPluginIcon("es.upv.paella.captionsSelectorPlugin","captionsIcon",captionsIcon);
                paella.addCustomPluginIcon("es.upv.paella.downloadsPlugin","downloadIcon",downloadIcon);
                paella.addCustomPluginIcon("es.upv.paella.findCaptionsPlugin","findCaptionsIcon",findCaptionsIcon);
                paella.addCustomPluginIcon("es.upv.paella.forwardButtonPlugin","forwardIcon",forwardIcon);
                paella.addCustomPluginIcon("es.upv.paella.fullscreenButton","fullscreenIcon",fullscreenIcon);
                paella.addCustomPluginIcon("es.upv.paella.fullscreenButton","windowedIcon",windowedIcon);
                paella.addCustomPluginIcon("es.upv.paella.keyboardShortcutsHelp","keyboardIcon",keyboardIcon);
                paella.addCustomPluginIcon("es.upv.paella.layoutSelector","layoutIcon",layoutIcon);
                paella.addCustomPluginIcon("es.upv.paella.qualitySelector","screenIcon",screenIcon);
                paella.addCustomPluginIcon("es.upv.paella.audioSelector","screenIcon",screenIcon);
                paella.addCustomPluginIcon("es.upv.paella.frameControlButtonPlugin","photoIcon",slidesIcon);
                paella.addCustomPluginIcon("es.upv.paella.volumeButtonPlugin","volumeHighIcon",volumeHighIcon);
                paella.addCustomPluginIcon("es.upv.paella.volumeButtonPlugin","volumeLowIcon",volumeLowIcon);
                paella.addCustomPluginIcon("es.upv.paella.volumeButtonPlugin","volumeMidIcon",volumeMidIcon);
                paella.addCustomPluginIcon("es.upv.paella.volumeButtonPlugin","volumeMuteIcon",volumeMuteIcon);

                utils.loadStyle('./paella_player_styles.css');
            })
            .catch(err => console.error(err));

        paella.bindEvent(Events.PLAY, () => {
            if (typeof(onPlay) === "function") {
                onPlay(paella);
            }
        });
    })

    afterUpdate(async () => {
        setCookie('nextVideo',"");

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
        min-height: 438px;
        user-select: none;
    }
</style>