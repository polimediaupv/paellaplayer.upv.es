// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://paellaplayer.upv.es',
	security: {
		checkOrigin: false
	},
	integrations: [
		starlight({
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
					label: 'Integrations',
					autogenerate: { directory: 'integrations' },
				},
				{
					label: 'Guides',
					autogenerate: { directory: 'guides' },
				}
			],
		}),
	],
});
