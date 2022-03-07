<script>
    import { onMount } from 'svelte';
    import SvelteMarkdown from 'svelte-markdown';
    import markdown from '../pages/download.md';
    import lastPacakgeVersion from './lastPackageVersion';

    let source = markdown;

    onMount(async () => {
        const re = /\%VERSION\((.+)\)\%/g;
        let result;
        let mdText = markdown;
        while ((result = re.exec(markdown)) !== null) {
            const library = result[1];
            const version = await lastPacakgeVersion('polimediaupv',library);
            mdText = mdText.replace(result[0], version);
        }
        source = mdText;
    })

</script>

<SvelteMarkdown {source} />