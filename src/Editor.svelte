<script>
    import {CodeJar} from 'codejar';
    import {withLineNumbers} from 'codejar/linenumbers';
    import { onMount } from 'svelte';
    import { json, css } from './syntax-coloring';

    let editorContainer = null;

    export let text = ""
    export let language = "json";

    let jar = null;

    export const updateText = () => {
        if (jar) {
            jar.updateCode(text);
        }
    };

    onMount(async () => {
        const my = editor => {
            switch (language) {
            case 'json':
                json(editor);
                break;
            case 'css':
                css(editor);
                break;
            }
            
        };

        jar = CodeJar(editorContainer, withLineNumbers(my, {backgroundColor: "auto", color: "auto"}));
        jar.onUpdate(code => {
            text = code;
        })
    });

</script>

<div class="editor" bind:this={editorContainer}>{text}</div>

<style>
    .editor {
        min-height: 100px;
        border: 1px solid black;
        padding: 10px;
        height: 50vh;
    }
</style>

<svelte:head>
    <link rel="stylesheet" href="text-edit.css">
</svelte:head>