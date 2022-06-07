<script>
    //import { active } from 'svelte-spa-router';
    import { onMount } from 'svelte';
    import lastPacakgeVersion from './lastPackageVersion';

    const menuSections = [
        { link: "#/", title: "Home" },
        { link: "#/features", title: "Features" },
        { link: "#/demos", title: "Demos" },
        { link: "#/about", title: "About" },
        { link: "#/doc/index.md", title: "Documentation" }
    ]

    let paellaCoreVersion = '0.0.0';

    onMount(async () => {
        paellaCoreVersion = await lastPacakgeVersion('polimediaupv','paella-core');
    })
</script>

<header>
	<nav>
        <div class="menu-container">
            <div class="navbar-header">
                <a href="#/">
                    <img src="img/logo_paella.png" alt="paella player logo" />
                </a>
            </div>
            <div class="download-group">
                <a href="#/download" class="linkButton" id="downloadPaella3">Download<br></a>
            </div>
        
            <div class="menu">
                <ul>
                    {#each menuSections as menuItem, i (menuItem) }
                    <!--<li class={menuItem.link == $active.$$href ? 'active' : ''}>-->
                    <li>
                        <a href={menuItem.link}>{menuItem.title}</a>
                    </li>
                    {/each}
                </ul>
            </div>
        </div>
	</nav>
</header>

<style>
    nav {
        height: 160px;
        border-bottom: 1px solid #cc0000;
        background-color: #f8f8f8;
        z-index: 1000;
        border-width: 0 0 1px;
        min-height: 50px;
        margin-bottom: 20px;
    }

    nav div.menu-container {
        width: 90%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
        box-sizing: border-box;
        position: relative;
        height: 152px;
    }

    div.navbar-header {
        margin-right: 0;
        margin-left: 0;
        float: left;
    }

    div.navbar-header a {
        margin-left: -15px;
        height: 160px;
    }

    div.navbar-header a img {
        height: 143px;
        max-width: 100%;
        border: 0;
    }

    div.download-group {
        position: absolute;
        top: 10px;
        right: 10px;
        text-align: center;
    }

    div.download-group a {
        display: block;
        width: 153px;
        margin-top: 33px;
        margin-left: auto;
        margin-right: auto;
        font-size: 17px;
        color: white;
        background-color: #cc0000;
        padding: 8px;
        border-radius: 5px;
        box-shadow: inset -3px -5px 10px 0px #cc0000;
        display: inline-block;
        text-decoration: none;
        text-align: center;
    }

    div.menu {
        position: absolute;
        bottom: 0px;
        right: 0px;
    }

    ul {
        float: right;
        margin-right: -15px;
        margin: 0;
        padding-left: 0;
        list-style: none;
    }

    ul li {
        float: left;
        position: relative;
        display: block;
    }

    ul li a {
        padding: 10px;
        color: #cc0000;
        background-color: white;
    }

    ul li.active a {
        color: white;
        background-color: #cc0000;
    }
</style>