# PraPla
![VueJS](https://img.shields.io/badge/Vue.js-35495e.svg?logo=vue.js&logoColor=4FC08D&style=for-the-badge)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](#license)
[![issues - prapla](https://img.shields.io/github/issues/MarvinMichel/prapla?style=for-the-badge)](https://github.com/MarvinMichel/prapla/issues)
![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=prapla&style=for-the-badge)

Praatje-Plaatje (Prapla) is a speech- controlled learning application for young children that hardly speak Dutch. With Prapla, a child learns new words and phrases, and practices proper Dutch pronunciation using a combination of speech technology and images. The web-app works on any mobile phone, tablet or desktop.

## Live demo
Check out the application [here](prapla.vercel.app)

> ⚠️ Due to bad browser compatabillity, the app might not work on your browser. Check the [compatabillity](https://caniuse.com/?search=web%20speech%20api) first.

## Documentation
You can look at our Design Rationale [here](https://www.notion.so/Design-Rationale-c8b9232b837b4df981de78a2a4ac5585). (Dutch only)

## Requirement List (MoSCoW)
### Must haves
- [x] Research privacy aspects of Web Speech API
- [x] Build Dutch support for Web Speech API
- [ ] Connect with external database for words ([BAK](https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-M_p4V46StBPnyvvNBnN%2F-M_tYEYRZ0suAyLWPQUR%2F-M_tYV_IezP-m0Mw3ikE%2FBAK%20groep%201.xlsx?alt=media&token=7a24d3d8-6310-4b33-9f10-90f2b338c88f))

### Should haves
- [ ] Visual representation of the words (vector images)
- [ ] Sounds for positive and negative feedback
- [ ] A Content Management System for exercises

### Could haves
- [ ] Different categories of exercises
- [ ] Alternative for a recording button

## Dependencies
- [NuxtJS(Vue)](https://nuxtjs.org/)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

## Getting started
1. Clone this repository or download [the zip file](https://github.com/MarvinMichel/prapla/archive/refs/heads/main.zip)
2. Open the terminal and `cd` into the project folder
3. Run `npm install` to install the dependencies

### Start for development
`npm run dev`

### Build for production
`npm run build`
`npm run start`

### Generate static files
`npm run generate`

## License
Released under [MIT](/LICENSE) by [@Marvin Sernee](https://github.com/MarvinMichel), [@Roeland van Stee](https://github.com/roelandvs) en [@Vincent van Leeuwen](https://github.com/Vincentvanleeuwen).

### Contributors
<a href="https://github.com/MarvinMichel/prapla/graphs/contributors"><img src="https://contrib.rocks/image?repo=MarvinMichel/prapla" width="100" /></a>
