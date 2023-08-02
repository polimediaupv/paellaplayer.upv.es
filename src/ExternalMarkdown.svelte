<script>
    import { onMount } from 'svelte';
    import showdown from 'showdown';
    
    export let site;
    export let section;
    export let folder;

    let htmlText = "";
    
    onMount(async () => {
        const converter = new showdown.Converter();

        const response = await fetch(site);
        if (response.ok) {
            const mdText = await response.text();

            const linkRE = /[^\!]\[(.+)\]\(((?!http).+)\)/ig;
            const links = folder ?
                mdText.replace(linkRE,` [$1](#/${section}/${folder}/$2)`) :
                mdText.replace(linkRE,` [$1](#/${section}/$2)`);
            
            const imgRE = /\!\[(.+)\]\(((?!http).+)\)/ig;
            const images = folder ? 
                links.replace(imgRE, ` ![$1](https://github.com/polimediaupv/paella-core/raw/main/${section}/${folder}/$2)`) :
                links.replace(imgRE, ` ![$1](https://github.com/polimediaupv/paella-core/raw/main/${section}/$2)`);
            
            htmlText = converter.makeHtml(images);
        }
    })
</script>

<div>{@html htmlText}</div>