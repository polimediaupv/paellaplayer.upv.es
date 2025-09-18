import { plugins, type Manifest } from "@asicupv/paella-core";
import { aiToolsPlugins } from "@asicupv/paella-ai-plugins"
import { basicPlugins } from "@asicupv/paella-basic-plugins"
import { extraPlugins } from "@asicupv/paella-extra-plugins"
import { slidePlugins } from "@asicupv/paella-slide-plugins"
import { videoPlugins } from "@asicupv/paella-video-plugins"
import { webglPlugins } from "@asicupv/paella-webgl-plugins"
import { zoomPlugins } from "@asicupv/paella-zoom-plugin"
import examples from "@/data/examples.json"
import * as fs from "fs/promises";
import * as path from "path";
import * as mime from "mime-types";

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

export function getAvailableExamples() {
    return examples;
}

function isAbsoluteUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

async function loadImageAsBase64String(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.onload = () => {
            try {
                const canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;
                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    reject(new Error("No se pudo obtener el contexto 2D del canvas"));
                    return;
                }
                ctx.drawImage(image, 0, 0);
                const dataUrl = canvas.toDataURL();
                resolve(dataUrl);
            } catch (err) {
                reject(err);
            }
        };
        image.onerror = reject;
        image.src = filePath;
    });
}

export async function loadManifest(manifestId: string) {
    const req = await fetch(`/repo/${manifestId}/data.json`, { method: 'GET' });
    if (req) {
        const manifestData = await req.json() as Manifest;

        // If the manifest file contains resources in a relative path, we must load and convert them into base64 strings
        // Frame list

        // Preview image

        // Chapter images

        // Thumbnails
        if (manifestData?.metadata?.timeline?.url && !isAbsoluteUrl(manifestData?.metadata?.timeline?.url)) {
            // Puedes usar lógica adicional aquí si la URL es absoluta
            const url = `/repo/${manifestId}/${manifestData?.metadata?.timeline?.url}`;
            manifestData.metadata.timeline.url = await loadImageAsBase64String(url);
        }

        return manifestData;
    }
    throw new Error(`Error loading manifest: ${manifestId}`);
}