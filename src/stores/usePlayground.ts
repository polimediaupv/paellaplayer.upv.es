import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Config, Manifest } from "@asicupv/paella-core";
import defaultConfig from "@/data/playground-default-config.json";
import defaultManifest from "@/data/playground-default-manifest.json";

export interface PlaygroundStore {
    config: Config
    manifest: Manifest

    setConfig: (config: Config) => Promise<void>
    setManifest: (manifest: Manifest) => Promise<void>
}

const usePlayground = create<PlaygroundStore>()(persist((set,get) => {
    return {
        config: defaultConfig,
        manifest: defaultManifest,

        setConfig: async (config: Config) => {
            set({ config });
        },

        setManifest: async (manifest: Manifest) => {
            set({ manifest });
        }
    }
}, {
    name: 'playground-store'
}));

export default usePlayground;
