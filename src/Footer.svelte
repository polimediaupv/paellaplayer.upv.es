<script>

    export let onUpdateCookies;

    function updateCookies() {
        if (onUpdateCookies) {
            onUpdateCookies();
        }
    }
</script>

<div class="container footer">
    <div class="footerText">Supported by:</div>
    <a href="http://www.upv.es" class="upvlogo"><img src="img/upvlogo.png" alt="upvlogo" class="sponsorLogo"></a>
    <button class="cookies-button" on:click={updateCookies}>Update cookie settings</button>
</div>

<style>
    div.footer {
        border-top: 3px solid #cc0000;
        font-size: 11px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    div.footer div {
        float: left;
    }

    img {
        height: 30px;
    }

    .cookies-button {
        float: right;
        background: none;
        border: none;
        text-decoration: underline;
        color: rgb(106, 106, 106);
        cursor: pointer;
    }

    .cookies-button:hover {
        color: rgb(42, 41, 41);
    }
</style>