<div align="center">
<img height="150px" src="https://raw.githubusercontent.com/cognetwork-dev/Cobalt/main/src/assets/logo.svg">
<h1>Cobalt</h1>
<h3>A new minimal yet powerful proxy site built for users and developers.</h3>
<p>View the censored web like never before with this new web proxy service in React supporting many sites. Third place winner for <a href="https://github.com/titaniumnetwork-dev">TN</a>'s 2023 Proxathon.</p>
</div>

<p align="center">
<a href="https://repl.it/github/cognetwork-dev/Cobalt"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/replit2.svg"><img></a>
<a href="https://glitch.com/edit/#!/import/github/cognetwork-dev/Cobalt"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/glitch2.svg"><img></a>
<a href="https://railway.app/new/template?template=https://github.com/cognetwork-dev/Cobalt"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/railway2.svg"><img></a>
<a href="https://app.koyeb.com/deploy?type=git&repository=github.com/cognetwork-dev/Cobalt&branch=main&name=Cobalt"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/koyeb2.svg"><img></a>
</p>

## Features
- Simple clean design
- Side panel for quick access to anything, anywhere
- Extremely customizable
- Massive library of themes
- Star your favorite sites
- View you browsing history
- Extensions
- Devtools (Eruda)

## Setup
**Run**

Run `npm start` to start a webserver and the Bare server. You may deploy Cobalt by using an external bare server and a static file host. Cobalt must be built before attempting to start.

**Build**

Run `npm run build` to build the app for production to the `build` folder.

**Development**

Run `npm run dev` to run the app in development mode.

**Deploy**

Click a button at the top of this page and follow the directions for an easy way to host Cobalt.

## Configuration

**Obfuscation**

File: [/src/consts.js](https://github.com/cognetwork-dev/Cobalt/blob/main/src/consts.js)

`const obfuscation = true | false;` - Choose to obfuscate text

**GitHub and Discord**

File: [/src/consts.js](https://github.com/cognetwork-dev/Cobalt/blob/main/src/consts.js)

`const github = "string";` - Update the Github links

`const discord = "string";` - Update the Discord link

**Bare Server**

File: [/public/uv/uv.config.js](https://github.com/cognetwork-dev/Cobalt/blob/main/public/uv/uv.config.js)

`bare: url,` - Ultraviolet bare server

## Goal
My goal for Cobalt was to make a proxy site that is very simple and easy to use, with only a side panel instead of pages, which you could access on any site. Along with having it be simple and easy to use, I also wanted it to have many configuration options and an extension system where the community could build unique tools to help you better use the web.

I will continue to work on Cobalt, and I hope to achieve everything I want in this project.

Overall it turned out very well, and if I were to choose a web proxy to use, I would select Cobalt!

## To Do
- [ ] Reading mode extension
- [ ] Popup for how to use Cobalt on the first load
- [ ] Keyboard shortcuts (reload, back, forward, favorite)
- [ ] Have real components and not everything in one file
- [ ] Blocklist with custom blocked page
- [ ] Syntax highlighting for view-source: (make it work with the theme)
- [ ] Make Monaco Editor use style
- [ ] Update iframe on custom style change
- [ ] Section to change headers sent to the site on the proxy (eg. user-agent)
- [ ] Share button
- [ ] Dashboard with widgets
- [ ] Make Ultraviolet take less space
- [ ] URL option for cloaking
- [ ] Update iframe on custom style change
- [ ] Suggestions for home page
- [ ] Games

## License
Cobalt uses the MIT license.
