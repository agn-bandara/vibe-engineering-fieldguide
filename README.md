# Vibe → Engineer

An interactive field guide connecting AI-assisted coding with deliberate software engineering. It covers software design, testing and QA, compliance, tech-stack selection and the software development lifecycle.

This is a static website: no build step, package installation, API keys or server are required. All styles and scripts are included in this repository.

## Update from anywhere

1. Open this repository on GitHub and sign in.
2. Open the file you want to change, then choose the pencil icon (**Edit this file**).
3. Make a small change and choose **Commit changes**. Commit to `main` to publish directly, or create a branch and pull request for review.
4. Once the change reaches `main`, GitHub Pages republishes the website. Check the **Actions** tab for the Pages build/deployment status.
5. Refresh the website after deployment. If an old version remains cached, refresh without the browser cache.

### Which file should I edit?

| File | Purpose |
| --- | --- |
| `data.js` | Pattern descriptions, principles, testing methods, compliance references, lifecycle approaches, sources, glossary and checklist items. |
| `app.js` | Page layouts, introductory text, stack recommendations, AI prompts and interactive behaviour. |
| `style.css` | Colours, typography, spacing, responsive layout and print formatting. |
| `index.html` | Main page shell, browser title/description, navigation containers and script loading. |
| `.nojekyll` | Keeps GitHub Pages serving these static files without Jekyll processing. |

Keep quotation marks, commas and brackets intact when editing JavaScript. Check sources and the guide's reviewed date when changing standards or tooling advice. If you add or remove catalog items, update any visible counts and check the affected filters.

## GitHub Pages configuration

In **Settings → Pages → Build and deployment**:

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/ (root)**

The website uses relative asset paths and hash-based navigation so it works beneath a GitHub Pages project path. The README and source are public in this repository. Never commit credentials or private project records.

## Run locally

From the repository directory, with Python installed:

```sh
python -m http.server 8000
```

Open `http://localhost:8000` in your browser. A static hosting preview in your editor also works.

If Node.js is installed, check JavaScript syntax before publishing:

```sh
node --check data.js
node --check app.js
```

After editing, check navigation, design filters/details, global search, stack selection, compliance filters, checklist storage and print layout.

## Browser-local progress

Bookmarks and checklist marks use this browser's local storage. The website and committed content updates are accessible across devices, but personal marks do not sync between browsers, devices, or the original ChatGPT Site and this GitHub Pages origin. No accounts, analytics or remote data storage are included in this application.

## Scope

Educational guidance, not a certification or a substitute for project-specific design, code review, testing, security, legal applicability or specialist assurance. Official references are linked in **Sources & scope** and in the compliance cards. The original explanations are teaching summaries; consult the applicable primary documents for requirements.
