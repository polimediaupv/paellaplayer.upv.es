
import type { Manifest, Config } from "@asicupv/paella-core";
import Player from "@/components/Player.tsx";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce.ts";
import "./Playground.css";
import defaultConfig from "@/data/playground-default-config.json";
import defaultManifest from "@/data/playground-default-manifest.json";
import JsonEditor from "@/components/JsonEditor";

export default function Playground() {
    const [config, setConfig] = useState<Config>(defaultConfig);
    const [manifest, setManifest] = useState<Manifest>(defaultManifest);

    useEffect(() => {
        console.log("Config updated")
    }, [config]);

    useEffect(() => {
        console.log("Manifest updated")
    }, [manifest]);

    const handleError = (error: string) => {
        console.error("Config JSON Error:", error);
    }

    return (
        <article className="playground-container">
            <h2>Playground</h2>
            <Player config={config} manifest={manifest} />
            <JsonEditor
                title="Configuration"
                defaultData={config}
                onChange={setConfig}
                onError={handleError}
            />
            <JsonEditor
                title="Manifest"
                defaultData={manifest}
                onChange={setManifest}
                onError={handleError}
            />
        </article>
    );
}
