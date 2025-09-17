import { plugins, type Plugin } from "@asicupv/paella-core";
import { aiToolsPlugins } from "@asicupv/paella-ai-plugins"
import { basicPlugins } from "@asicupv/paella-basic-plugins"
import { extraPlugins } from "@asicupv/paella-extra-plugins"
import { slidePlugins } from "@asicupv/paella-slide-plugins"
import { videoPlugins } from "@asicupv/paella-video-plugins"
import { webglPlugins } from "@asicupv/paella-webgl-plugins"
import { zoomPlugins } from "@asicupv/paella-zoom-plugin"


function getPluginData(p: any) {
    if (p.plugin) {
        const inst = new p.plugin();
        return {
            plugin: inst.name,
            label: inst.name.split(".").pop(),
            config: {
                ...p.config,
                enabled: true
            }
        }
    }
    else {
        return {
            p,
            config: {
                enabled: true
            }
        }
    }
}

export function getAvailablePlayerPlugins() {
    return [
        {
            group: "Paella Core Plugins",
            plugins: plugins.map(p => getPluginData(p))
        },
        {
            group: "AI Tools Plugins",
            plugins: aiToolsPlugins.map(p => getPluginData(p))
        },
        {
            group: "Basic Plugins",
            plugins: basicPlugins.map(p => getPluginData(p))
        },
        {
            group: "Extra Plugins",
            plugins: extraPlugins.map(p => getPluginData(p))
        },
        {
            group: "Slide Plugins",
            plugins: slidePlugins.map(p => getPluginData(p))
        },
        {
            group: "Video Plugins",
            plugins: videoPlugins.map(p => getPluginData(p))
        },
        {
            group: "WebGL Plugins",
            plugins: webglPlugins.map(p => getPluginData(p))
        },
        {
            group: "Zoom Plugins",
            plugins: zoomPlugins.map(p => getPluginData(p))
        }
    ]
}