
import type { Manifest, Config } from "@asicupv/paella-core";
import Player from "@/components/Player.tsx";
import { useState } from "react";
import "./Playground.css";

export default function Playground() {
    const [config, setConfig] = useState<Config>({
        defaultLayout: "presenter-presentation",

        plugins: {
            "es.upv.paella.singleVideoDynamic": {
                enabled: true,
                dualVideoContentIds: [
                    "presenter-presentation-dynamic",
                    "presenter-2-presentation-dynamic",
                    "presenter-presenter-2-dynamic",
                    "presenter-presentation",
                    "presenter-2-presentation",
                    "presenter-presenter-2"
                ],
                validContent: [
                    { id: "presenter", content: ["presenter"], icon: "present-mode-2.svg", title: "Presenter" },
                    { id: "presentation", content: ["presentation"], icon: "present-mode-1.svg", title: "Presentation" },
                    { id: "presenter-2", content: ["presenter-2"], icon: "present-mode-1.svg", title: "Presentation" }
                ]
            },
            "es.upv.paella.dualVideo": {
                enabled: false,
                validContent: [
                    { id: "presenter-presentation", content: ["presenter","presentation"], icon: "present-mode-3.svg", title: "Presenter and presentation" },
                    { id: "presenter-2-presentation", content: ["presenter-2","presentation"], icon: "present-mode-3.svg", title: "Presenter and presentation" },
                    { id: "presenter-presenter-2", content: ["presenter","presenter-2"], icon: "present-mode-3.svg", title: "Presenter and presentation" }
                ],
                tabIndexStart: 20
            },
            "es.upv.paella.dualVideoPiP": {
                enabled: true,
                validContent: [
                    { id: "presenter-presentation-pip", content: ["presenter","presentation"], icon: "present-mode-pip.svg", title: "Picture in Picture" },
                    { id: "presenter-2-presentation-pip", content: ["presenter-2","presentation"], icon: "present-mode-pip.svg", title: "Picture in Picture" },
                    { id: "presenter-presenter-2-pip", content: ["presenter","presenter-2"], icon: "present-mode-pip.svg", title: "Picture in Picture" }
                ],
                dualVideoContentIds: [
                    "presenter-presentation-dynamic",
                    "presenter-2-presentation-dynamic",
                    "presenter-presenter-2-dynamic",
                    "presenter-presentation",
                    "presenter-2-presentation",
                    "presenter-presenter-2"
                ],
                tabIndexStart: 20
            },
            "es.upv.paella.dualVideoDynamic": {
                enabled: true,
                validContent: [
                    { id: "presenter-presentation-dynamic", content: ["presentation","presenter"], icon: "present-mode-3.svg", title: "Presenter and presentation" },
                    { id: "presenter-2-presentation-dynamic", content: ["presenter-2","presentation"], icon: "present-mode-3.svg", title: "Presenter and presentation" },
                    { id: "presenter-presenter-2-dynamic", content: ["presenter","presenter-2"], icon: "present-mode-3.svg", title: "Presenter and presentation" }
                ],
                pipContentIds: [
                    "presenter-presentation-pip",
                    "presenter-2-presentation-pip",
                    "presenter-presentation-2-pip"
                ],
                allowSwitchSide: false
            },
            "es.upv.paella.imageVideoFormat": {
                enabled: true,
                order: 3
            },
            "es.upv.paella.htmlVideoFormat": {
                enabled: true,
                order: 1
            },
            "es.upv.paella.mp4VideoFormat": {
                enabled: false
            },
            "es.upv.paella.mp4MultiQualityVideoFormat": {
                enabled: true,
                order: 2
            },
            "es.upv.paella.hlsVideoFormat": {
                enabled: true,
                order: 0,
                audioTrackLabel: "name",
                enableCache: true,
                forceNative: false,
                hlsConfig: {
                },
                corsConfig: {
                    withCredentials: false,
                    requestHeaders: {
                        "Access-Control-Allow-Credentials": false
                    }
                }
            },
            "es.upv.paella.hlsLiveVideoFormat": {
                enabled: true,
                order: 0,
                enableCache: true,
                hlsConfig: {
                },
                corsConfig: {
                    withCredentials: false,
                    requestHeaders: {
                        "Access-Control-Allow-Credentials": false
                    }
                }
            },
            "es.upv.paella.audioVideoFormat": {
                enabled: true
            },

            "es.upv.paella.videoCanvas": {
                enabled: false,
                order: 1
            },

            "es.upv.paella.zoomPlugin": {
                enabled: true,
                order: 0,
                maxZoom: 800
            },

            "es.upv.paella.audioCanvas": {
                enabled: true,
                order: 1
            },

            "es.upv.paella.playPauseButton": {
                enabled: true,
                order: 0,
                container: "playbackBar",
                side: "left",
                description: "Play/pause",
                ariaLabel: "Play/pause",
                id: "playPauseButton"
            },
        }
    });
    const [manifest, setManifest] = useState<Manifest>({
        metadata: {
            preview: "https://repository.paellaplayer.upv.es/belmar-multiresolution/preview/belmar-preview.jpg"
        },

        streams: [
            {
                sources: {
                    html: [
                        {
                            src: "https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presentation.mp4",
                            mimetype: "video/mp4",
                            res: {
                                w: 1442,
                                h: 1080
                            }
                        }
                    ]
                },
                content: "presentation"
            },
            {
                sources: {
                    html: [
                        {
                            src: "https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presenter.mp4",
                            mimetype: "video/mp4",
                            res: {
                                w: 1920,
                                h: 1080
                            }
                        }
                    ]
                },
                content: "presenter",
                role: "mainAudio"
            }
        ]
    });
    
    const handleChangeConfig = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        try {
            const newConfig = JSON.parse(event.target.value);
            setConfig(newConfig);
        } catch (error) {
            console.error("Invalid JSON:", error);
        }
    }

    const handleChangeManifest = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        try {
            const newManifest = JSON.parse(event.target.value);
            setManifest(newManifest);
        } catch (error) {
            console.error("Invalid JSON:", error);
        }
    }

    return (
        <article className="playground-container">
            <h2>Playground</h2>
            <Player config={config} manifest={manifest} />
            <details>
                <summary>Configuration</summary>
                <textarea onChange={handleChangeConfig}>{JSON.stringify(config, null, 2)}</textarea>
            </details>
            <details>
                <summary>Manifest</summary>
                <textarea onChange={handleChangeManifest}>{JSON.stringify(manifest, null, 2)}</textarea>
            </details>
        </article>
    );
}
