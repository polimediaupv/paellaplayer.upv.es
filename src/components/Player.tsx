
import {
    Paella,
    type Manifest,
    type Config
} from '@asicupv/paella-core'
import { basicPlugins } from "@asicupv/paella-basic-plugins";
import { slidePlugins } from "@asicupv/paella-slide-plugins";
import { videoPlugins } from "@asicupv/paella-video-plugins";
import { webglPlugins } from "@asicupv/paella-webgl-plugins";
import { zoomPlugins } from "@asicupv/paella-zoom-plugin";
import "@asicupv/paella-core/paella-core.css";
import "@asicupv/paella-basic-plugins/paella-basic-plugins.css";
import "@asicupv/paella-slide-plugins/paella-slide-plugins.css";
import "@asicupv/paella-zoom-plugin/paella-zoom-plugin.css";

import { useEffect, useRef } from 'react';
import "./Player.css";

type Props = {
    config: Config
    manifest: Manifest
};

export default function Player({ config, manifest }: Props) {
    const playerContainer = useRef<HTMLDivElement>(null);
    const playerInstance = useRef<Paella | null>(null);

    useEffect(() => {
        if (playerContainer.current) {
            if (playerInstance.current) {
                playerInstance.current.unload();
                playerInstance.current = null;
            }

            console.log(basicPlugins);

            const paella = new Paella(playerContainer.current, {
                plugins: [
                    ...basicPlugins,
                    ...slidePlugins,
                    ...videoPlugins,
                    ...webglPlugins,
                    ...zoomPlugins
                ],
                async loadConfig() {
                    return config;
                },

                async getVideoId() {
                    return "playgroundVideo"
                },

                async loadVideoManifest() {
                    return manifest;
                }
            });

            paella.skin.loadSkin("/skin/skin_1.json")
                .then(() => paella.loadManifest())
                .then(() => {

                })
                .catch(error => {
                    console.error("Error loading manifest:", error);
                });
            playerInstance.current = paella;
        }
    }, [config, manifest]);

    useEffect(() => {
        return () => {
            if (playerInstance.current) {
                playerInstance.current.unload();
                playerInstance.current = null;
            }
        }
    }, []);

    return <div className="player-container" ref={playerContainer}></div>;
}