<script>
    import { onMount } from 'svelte';
    import showdown from 'showdown';
    
    export let site;

    let htmlText = "";
    
    onMount(async () => {
        const converter = new showdown.Converter();

        const response = await fetch(site);
        if (response.ok) {
            const mdText = await response.text();

            // TODO: Change markdown links
            const linkRE = /\[(.+)\]\(((?!http).+)\)/ig;
            const links = mdText.replace(linkRE,`[$1](#/doc/$2)`);
            
            htmlText = converter.makeHtml(links);
        }
    })
</script>

<div>{@html htmlText}</div>