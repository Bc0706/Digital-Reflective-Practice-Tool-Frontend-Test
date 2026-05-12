# Digital Reflective Practice Tool — GitHub Pages Demo

This is a static React + Vite clickable prototype for a Digital Reflective Practice Tool wireframe.

It is designed for presentation walkthroughs on a phone-sized screen. There is no backend, authentication, database, API call, or saved data. Navigation is handled with simple React state so it works cleanly on GitHub Pages without browser routing issues.

## Included screens

- Login demo screen
- NGRN dashboard
- Find a Clinical Educator
- New Reflection: What?
- New Reflection: So What?
- New Reflection: Now What?
- Reflection Sent recap
- NGRN reflection reply thread
- Clinical Nurse Educator dashboard
- Clinical Nurse Educator review and reply screen

## File structure

```txt
digital-reflective-practice-demo/
├── package.json
├── index.html
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    └── App.css
```

## Run locally

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Build the production version:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## GitHub Pages setup

This project avoids `BrowserRouter` and uses React component state for screen changes. That means refreshing the page on GitHub Pages should not create routing-related 404 errors.

### Base path in `vite.config.js`

The current config uses:

```js
base: './'
```

This relative base path is a safe portable default for GitHub Pages project sites.

Alternatively, you can set an explicit repository path:

```js
base: '/REPOSITORY_NAME/'
```

Examples:

```js
base: '/digital-reflective-practice-demo/'
```

If deploying to a root user site such as `https://username.github.io`, use:

```js
base: '/'
```

## Deploy option 1: GitHub Pages using `/dist`

1. Push this project to GitHub.
2. Run:

```bash
npm install
npm run build
```

3. Upload or publish the `dist` folder through your chosen GitHub Pages workflow.

## Deploy option 2: `gh-pages`

This project includes a deploy script:

```bash
npm run deploy
```

That script runs the build and publishes the `dist` folder using the `gh-pages` package.

General steps:

```bash
npm install
npm run deploy
```

Then in GitHub:

1. Open the repository settings.
2. Go to **Pages**.
3. Set the source branch to `gh-pages`.
4. Save and open the GitHub Pages URL.

## Presentation walkthrough paths

### NGRN flow

Login → Continue as NGRN → NGRN Dashboard → plus button → Find Clinical Educator → select educator → What? → So What? → Now What? → Submit Reflection → Reflection Sent → Reply.

### Clinical Educator flow

Login → Continue as Clinical Nurse Educator → Clinical Educator Dashboard → select awaiting response → Review reflection → Send demo response.

## Notes for editing

- Most content is hardcoded in `src/App.jsx`.
- Styling is in `src/App.css`.
- No data is saved after sending a reply or response.
- Fake voice mode only changes the UI and shows a waveform panel.
- The demo menu at the top lets the presenter quickly jump between Login, NGRN, and CNE screens.
