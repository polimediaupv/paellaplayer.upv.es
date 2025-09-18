
import Player from "@/components/Player.tsx";
import { useEffect, useRef, useState } from "react";
import "./Playground.css";
import defaultConfig from "@/data/playground-default-config.json";
import JsonEditor from "@/components/JsonEditor";
import { getAvailablePlayerPlugins, getAvailableExamples, loadManifest } from "@/services/browser/player";
import usePlayground from "@/stores/usePlayground";

export default function Playground() {
    const { config, setConfig, manifest, setManifest } = usePlayground();
    const configRef = useRef<HTMLElement>(null);
    const manifestRef = useRef<HTMLElement>(null);
    const [currentTab, setCurrentTab] = useState<"config" | "manifest">("config");
    const configEndRef = useRef<HTMLDivElement>(null);
    const manifestEndRef = useRef<HTMLDivElement>(null);
    
    const availablePlugins = getAvailablePlayerPlugins();
    const availableExamples = getAvailableExamples();
    console.log(availableExamples);

    useEffect(() => {
        //console.log(config)
    }, [config]);

    useEffect(() => {
        //console.log(manifest)
    }, [manifest]);

    const handleError = (error: string) => {
        console.error("Config JSON Error:", error);
    }

    const handleLoadManifest = async (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const exampleId: string = evt.target.value;
        const manifest = await loadManifest(exampleId);
        setManifest(manifest);
    }

    const handleAddPlugin = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const pluginName = event.target.value;
        // Find the plugin in the available plugins
        for (const group of availablePlugins) {
            const pluginData = group.plugins.find(p => p.label === pluginName);
            if (pluginData) {
                // Add the plugin to the config
                setConfig({
                        ...config,
                        plugins: {
                            ...config.plugins,
                            [pluginData.plugin]: pluginData.config
                        }    
                });
                break;
            }
        }
        // Reset the select
        event.target.selectedIndex = 0;
        configEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <article className="playground-container">
            <Player config={config} manifest={manifest} />
            <menu className="tab-bar">
                <li><button onClick={() => setCurrentTab("config")} className={currentTab === "config" ? "active" : ""}>Configuration</button></li>
                <li><button onClick={() => setCurrentTab("manifest")} className={currentTab === "manifest" ? "active" : ""}>Manifest</button></li>
            </menu>
            { currentTab === "config" && (
                <section ref={configRef}>
                    <div className="text-editor">
                        <JsonEditor
                            defaultData={config}
                            onChange={setConfig}
                            onError={handleError}
                            debounceMs={1000}
                        />
                        <div ref={configEndRef}></div>
                    </div>
                    <menu className="editor-menu">
                        <li><button onClick={() => setConfig(defaultConfig)}>Reset to default</button></li>
                        <li>Add Plugin: 
                            <select title="Available Plugins" onChange={handleAddPlugin}>
                                { availablePlugins.map(group => (
                                    <optgroup label={group.group} key={group.group}>
                                        { group.plugins.map(p => (
                                            <option key={`${group.group}-${p.plugin}`}>{p.label}</option>
                                        )) }
                                    </optgroup>
                                )) }
                            </select>
                        </li>
                    </menu>
                </section>
            )}
            { currentTab === "manifest" && (
                <section ref={manifestRef}>
                    <div className="text-editor">
                        <JsonEditor
                            defaultData={manifest}
                            onChange={setManifest}
                            onError={handleError}
                            debounceMs={1000}
                        />
                        <div ref={manifestEndRef}></div>
                    </div>
                    <menu className="editor-menu">
                        <li>Load Example: 
                            <select title="Available Plugins" onChange={handleLoadManifest}>
                                { availableExamples.map((example,i) => (
                                    <option key={`${example.manifest}-${i}`} value={example.manifest}>{example.title}</option>
                                )) }
                            </select>
                        </li>
                    </menu>
                </section>
            )}
        </article>
    );
}
