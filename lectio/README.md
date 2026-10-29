# Lectio Bible Reader

A speed reader for the whole Bible, served at `tomyates.org/lectio/`. One self-contained page (`index.html`) with no build step and no server code.

- **Texts** (`data/*.gz.txt`): nine public-domain translations (KJV, NHEB, AKJV, ASV, Webster, YLT, Darby, BBE, Douay-Rheims), from [scrollmapper/bible_databases](https://github.com/scrollmapper/bible_databases). Each file is gzipped JSON stored as base64 text and unpacked in the browser.
- **Chapter summaries** (`data/summaries.json`): [Bible Summary](https://biblesummary.info) by Chris Juby, used with his permission.
- **Progress** is kept in the browser's local storage. Readers move it between devices with a progress code (in "Through the Bible").
- **Offline and install**: `sw.js` caches the page, icons and any translation once it has been opened; `manifest.webmanifest` lets phones add it to the home screen.

To change the cache contents, bump `CACHE` in `sw.js` so returning visitors pick up the new files.
