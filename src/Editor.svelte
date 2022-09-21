<script>
    import {CodeJar} from 'codejar';
    import { onMount } from 'svelte';

    let editorContainer = null;

    export let text = ""
    export let height = "auto";

    onMount(async () => {
        const my = editor => {
            let code = editor.textContent;
            code = code.replace(
                /(\"[a-z0-9\_\-\s\.]*\")/gi,
                '<font class="string">$1</font>'
            );
            code = code.replace(
                /(\:|\[|\,)(\s*)([0-9\-\.]+)/g,
                '$1$2<font class="number">$3</font>'
            );
            code = code.replace(
                /(\{|\}|\[|\])/g,
                '<font class="brackets">$1</font>'
            );
            code = code.replace(
                /(\:|\,)/g,
                '<font class="separator">$1</font>'
            );
            code = code.replace(
                /(true)/gi,
                '<font class="boolean-true">$1</font>'
            );
            code = code.replace(
                /(false)/gi,
                '<font class="boolean-false">$1</font>'
            );
            editor.innerHTML = code;
        }

        const jar = CodeJar(editorContainer, my);
        jar.onUpdate(code => {
            text = code;
        })
    });
</script>

<div class="editor" style="max-height: {height}" bind:this={editorContainer}>{text}</div>

<style>
    .editor {
        min-height: 100px;
        border: 1px solid black;
        padding: 10px;
    }
</style>

<svelte:head>
    <link rel="stylesheet" href="text-edit.css">
</svelte:head>