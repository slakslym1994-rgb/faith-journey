# Faith Journey – Android PWA

A static, installable Progressive Web App for Christian devotionals, Bible-study references, prayer journaling, quizzes and spiritual-growth goals. The interface is Afrikaans-first and uses Afrikaans 2020 Bible **references**, not reproduced copyrighted Bible passages.

## Included
- Seven-day devotional cycle with Afrikaans Bible references and reflection prompts.
- Daily habit checklist.
- Bible-study topic guides and a short quiz.
- Prayer journal, reflection journal and personal goal.
- Local saving using the browser's `localStorage`.
- PWA manifest, icons and service worker for offline use after the first successful load.

## Important privacy and storage notes
- Journal entries and progress are saved only in the browser storage on the device where the app is used.
- This starter version does not have accounts, cloud sync, backups or a central database. Clearing browser/site data or changing devices can remove entries.
- Do not use a shared/public device for private journal entries.
- The full Afrikaans 2020 Bible text is not included. Open your own licensed Bible to read each reference.
- The app is a devotional aid, not a replacement for Scripture, church fellowship or pastoral care.

## Test locally
A PWA needs HTTPS or localhost; opening `index.html` directly as a `file://` page will not enable installation/offline caching.

With Python installed, open a terminal in this folder and run:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

## Publish free with GitHub Pages
1. Create or sign in to a GitHub account.
2. Create a **public** repository named `faith-journey`.
3. Upload all files and folders from this package. Keep `index.html` in the repository root.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main` and folder `/ (root)`, then save.
7. Wait for GitHub Pages to publish. The public address will look like `https://YOUR-USERNAME.github.io/faith-journey/`.
8. Open that HTTPS address on your Android phone using Chrome.

## Install on Android
1. Open the published HTTPS address in Chrome.
2. Open Chrome's three-dot menu.
3. Tap **Install app** or **Add to Home screen** (wording varies).
4. Confirm. Faith Journey will appear on your home screen and open in its own app window.

## Updating the public app
Edit the relevant files in the GitHub repository and commit the changes. GitHub Pages republishes the site. If an older version remains cached, close and reopen the app or clear the site's cached data.

## Customisation
- Colours and layout: `styles.css`
- Devotional days and Bible quiz: `app.js` (`days` and `questions`)
- Page content and navigation: `index.html`
- App name and icons metadata: `manifest.webmanifest`
- App icon images: `icons/`
