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
| `data.js` | Pattern descriptions, principles, testing methods, compliance references, lifecycle approaches, sources, glossary, checklist items and the `codeExamples` catalog. |
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

## Paired Python and JavaScript examples

Open any design concept for language tabs, copyable snippets, expected output and scope notes. Testing & QA cards also have a paired-example button. The catalog has **69 pairs**: 57 design concepts and 12 testing methods.

Examples are stored in `data.js` under `codeExamples`, keyed by the corresponding stable concept ID (`p0`–`p22`, `d0`–`d19`, `a0`–`a13`, `t0`–`t11`). Each item includes `use` and `avoid` selection guidance as well as `summary`, `python`, `javascript`, `output`, `limit` and `verification`. One timing example also defines `outputPattern` for variable output.

- The **134 self-contained snippets** were executed and their expected output checked in Python 3.12 and Node.js 24.
- The **four Playwright templates** (two methods × two languages) were syntax-checked; they need optional dependencies, a browser installation and the running local guide. They were not executed with Playwright in this environment.
- JavaScript examples target Node.js and should be saved as `.cjs`; some use Node.js 24's built-in SQLite module. They are not all browser-console snippets.
- Architecture examples are limited local sketches; they do not deploy distributed services, send real payments or establish compliance.
- The website only displays/copies code. It never evaluates the examples.

If you edit a snippet, re-run it, check its expected output and retain an accurate verification label. When adding concepts, keep the IDs and examples aligned. Verify outputs independently of the implementation and test relevant failure cases.

All 69 pairs also include explicit when-to-use and when-not-to-use/pitfall guidance. For design principles, the avoid section describes misuse of the principle rather than recommending abandonment of it.

## Reading the guide

The design catalog uses responsive cards; select a card to open it, or use its separate star button to save it. Each detail view has **Guide**, **Code** and **AI prompt** tabs. Guide opens first with use/avoid guidance and a practical example. Technical caveats remain available in an expandable section. Code retains the Python/JavaScript switcher, expected output, copy button and verification details. Arrow keys, Home and End navigate both sets of tabs.

The five main field sheets stay visible in the sidebar; supporting tools are grouped under **Tools & references**. The longer design introduction is expandable so the catalog is near the top of the page. Body text and contrast have been increased while retaining the original visual theme.
