<script>
    import { onMount } from 'svelte';
    import SvelteMarkdown from 'svelte-markdown';
    import source from '../pages/index.md';
    import Player from './Player.svelte';

    import ExternalMarkdown from './ExternalMarkdown.svelte';
</script>

<SvelteMarkdown {source} />

<Player videoId="belmar-multiresolution-remote"></Player>

