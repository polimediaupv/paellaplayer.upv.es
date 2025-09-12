// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    site: 'https://paellaplayer.webs.upv.es',

    security: {
        checkOrigin: false
    },

    vite: {
        plugins: [tailwindcss()],
    },

    integrations: [starlight({
        title: 'Documentation',
        customCss: [
            './src/styles/custom.css'
        ],
        logo: {
            light: './src/assets/light-logo.webp',
            dark: './src/assets/dark-logo.webp',
            replacesTitle: true,
        },
        social: [
            {
                icon: 'github',
                label: 'GitHub',
                href: 'https://github.com/polimediaupv/paella-player'
            }
        ],
        /*prerender: false,*/
        sidebar: [
            {
                label: 'Tutorial',
                items: [
                    // Each item here is one entry in the navigation menu.
                    { label: 'Vanilla Player', slug: 'tutorial/vanilla' },
                    { label: 'Quick Start', slug: 'tutorial/quick_start' },
                    { label: 'Two Streams', slug: 'tutorial/two_streams' },
                    { label: 'Init Params', slug: 'tutorial/init_params' },
                    { label: 'Plugins', slug: 'tutorial/plugins' },
                    { label: 'Group Buttons', slug: 'tutorial/group_buttons' },
                    { label: 'Styling', slug: 'tutorial/styling' },
                    { label: 'Skins', slug: 'tutorial/skins' }
                ],
            },
            {
                label: 'Reference',
                autogenerate: { directory: 'reference' },
            },
            {
                label: 'Plugins',
                items: [
                    { label: 'Paella Player Plugins', slug: 'plugins/plugins'},
                    { label: 'Plugin Modules', slug: 'plugins/plugin_modules' },
                    { label: 'Button Plugins', slug: 'plugins/button_plugins' },
                    { label: 'Pop Up Plugins', slug: 'plugins/pop_up_button_plugins' },
                    { label: 'Menu Button Plugins', slug: 'plugins/menu_button_plugins' },
                    { label: 'Table Info Pop Up Plugins', slug: 'plugins/table_info_pop_up_plugins' },
                    { label: 'Canvas Button Plugins', slug: 'plugins/canvas_button_plugins' },
                    { label: 'Canvas Plugins', slug: 'plugins/canvas_plugins' },
                    { label: 'Video Plugins', slug: 'plugins/video_plugins' },
                    { label: 'Video Layout Plugins', slug: 'plugins/video_layout' },
                    { label: 'Data Plugins', slug: 'plugins/data_plugins' },
                    { label: 'Event Log Plugins', slug: 'plugins/event_log_plugins' },
                    { label: 'Plugin pacakges', items: [
                        { label: 'Core Plugins', slug: 'plugins/plugins_core' },
                        { label: 'Basic Plugins', slug: 'plugins/plugins_basic' },
                        { label: 'Slide Plugins', slug: 'plugins/plugins_slides' },
                        { label: 'Zoom Plugin', slug: 'plugins/plugins_zoom' },
                        { label: 'User Tracking Plugins', slug: 'plugins/plugins_user_tracking' },
                        { label: 'Video Plugins', slug: 'plugins/plugins_video' },
                        { label: 'WebGL Plugins', slug: 'plugins/plugins_webgl' }
                    ]}
                ]
            },
            {
                label: 'Integrations',
                autogenerate: { directory: 'integrations' },
            },
            {
                label: 'Guides',
                autogenerate: { directory: 'guides' },
            }
        ],
    }), react()],

    adapter: node({
        mode: 'standalone',
    }),
});