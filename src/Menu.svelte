<script>
    import { active } from 'svelte-hash-router';

    const menuSections = [
        { link: "#/", title: "Home" },
        { link: "#/features", title: "Features" },
        { link: "#/demos", title: "Demos" },
        { link: "#/about", title: "About" }
    ]
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
                <div style="margin-top:3px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="98" height="18">
                        <linearGradient id="a" x2="0" y2="100%">
                            <stop offset="0" stop-color="#fff" stop-opacity=".7"></stop>
                            <stop offset=".1" stop-color="#aaa" stop-opacity=".1"></stop>
                            <stop offset=".9" stop-opacity=".3"></stop>
                            <stop offset="1" stop-opacity=".5"></stop>
                        </linearGradient>
                        <rect rx="4" width="98" height="18" fill="#555"></rect>
                        <rect rx="4" x="52" width="46" height="18" fill="#97CA00"></rect>
                        <path fill="#97CA00" d="M52 0h4v18h-4z"></path>
                        <rect rx="4" width="98" height="18" fill="url(#a)"></rect>
                        <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
                            <text x="27" y="14" fill="#010101" fill-opacity=".3">version</text>
                            <text x="27" y="13">version</text>
                            <text x="74.5" y="14" fill="#010101" fill-opacity=".3">6.5.4</text>
                            <text x="74.5" y="13">6.5.4</text>
                        </g>
                    </svg>
                </div>
            </div>
        
            <div class="menu">
                <ul>
                    {#each menuSections as menuItem, i (menuItem) }
                    <li class={menuItem.link == $active.$$href ? 'active' : ''}>
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