<div align="center">
<img height="150px" src="https://raw.githubusercontent.com/Cobalt-Web/Cobalt/main/src/assets/logo.svg">
<h1>Cobalt</h1>
<h3>A new minimal yet powerful proxy site, built for both users and developers.</h3>
<p>View the censored web like never before with this new web proxy service made in React supporting many sites. Entry for <a href="https://github.com/titaniumnetwork-dev">TN</a>'s 2023 Proxathon.</p>
</div>

<p align="center">
<a href="https://repl.it/github/Cobalt-Web/Cobalt"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/replit2.svg"><img></a>
<a href="https://glitch.com/edit/#!/import/github/Cobalt-Web/Cobalt"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/glitch2.svg"><img></a>
<a href="https://railway.app/new/template?template=https://github.com/Cobalt-Web/Cobalt"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/railway2.svg"><img></a>
<a href="https://app.koyeb.com/deploy?type=git&repository=github.com/Cobalt-Web/Cobalt&branch=main&name=Cobalt"><img height="30px" src="https://raw.githubusercontent.com/FogNetwork/Tsunami/main/deploy/koyeb2.svg"><img></a>
</p>

## Features
- Simple clean design
- Side panel for quick access to anything, anywhere
- Extremely customizable
- Massive library of themes
- Star you favorite sites and view you browsing history
- Extensions

## Setup
**Run**
Run `npm start` to start a webserver and the Bare server. You may deploy Cobalt by using an external bare server and a static file host. Cobalt must be built before attempting to start.

**Build**
Run `npm run build` to build app for production to the `build` folder.

**Development**
Run `npm run dev` to run the app in development mode.

**Deploy**
Click a button at the top of this page and follow the directions for an easy way to host Cobalt.

## Configuration

**Obfuscation**
File: [/src/consts.js](https://github.com/Cobalt-Web/Cobalt/blob/main/src/consts.js)

`const obfuscation = true | false;` - Choose to obfuscate text

**Github and Discord**
File: [/src/consts.js](https://github.com/Cobalt-Web/Cobalt/blob/main/src/consts.js)

`const github = "string";` - Update the Github links

`const discord = "string";` - Update the Discord link

**Bare Server**
File: [/public/uv/uv.config.js](https://github.com/Cobalt-Web/Cobalt/blob/main/public/uv/uv.config.js)

`bare: url,` - Ultraviolet bare server

## Goal
My goal for Cobalt was to make a proxy site this was very simple and easy to use, with only a side panel insted of pages, which you could access on any site. Along with having it be simple and easy to use, I also wanted it to have many configuration options and an extension system where the community could build amazing tools to help you better use the web.

I will continue to work on Cobalt, and hopefully I can achive everything I want in this project.

Overall I think it turned out very well and if I was to choose a web proxy to use, I would choose Cobalt!

## To Do
- [ ] Keyboard shortcuts (reload, back, forward, favorite)
- [ ] Have real components and not everything in one file
- [ ] Devtools
- [ ] Blocklist with custom bloacked page
- [ ] Syntax highlighting for view-source: (make it work with theme)
- [ ] Make Monaco Editor use style
- [ ] Update iframe on custom style change
- [ ] Section to change headers sent to site on proxy (eg. user-agent)
- [ ] Share button
- [ ] Dashboard with widgets
- [ ] Make Ultraviolet take less space
- [ ] URL option for cloaking
- [ ] Update iframe on custom style change
- [ ] Suggestions for home page
- [ ] Games
- [ ] Use Typescript

## License
Cobalt uses the MIT license.