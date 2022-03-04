<script>
    import SvelteMarkdown from 'svelte-markdown';
    import source from '../pages/index.md';
    import Player from './Player.svelte';
</script>

<SvelteMarkdown {source} />

<Player videoId="belmar-multiresolution-remote"></Player>