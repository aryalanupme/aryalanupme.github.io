# Anup Aryal Portfolio — September 2026 Build

This package contains the current website code and existing site assets.

## Major changes in this build
- Added a dedicated SAT Math Handbook web reader (`sat-handbook.html`). The handbook PDF/DOCX is **not** published in the site package.
- Added a structured SAT Practice Library and four domain pages.
- Practice cards do not show fixed question counts.
- Added stable asset paths so practice PDFs can be replaced later without changing the HTML.
- Removed temporary/fake testimonial placeholders.
- Replaced development-stage Solar Water Lifting copy with public-facing text.
- Added JavaScript-failure fallback for reveal animations and mobile navigation.
- Improved mobile navigation, keyboard accessibility, focus states and Escape-to-close behavior.
- Added lazy image loading, a 404 page, favicon, canonical links, Open Graph metadata, `robots.txt`, `sitemap.xml`, and Person structured data on the homepage.
- Added responsive handling for handbook tables and MathML.

## Before publishing SAT practice PDFs
Read `ADD_SAT_FILES_BEFORE_DEPLOYING.txt` and copy only the final public PDFs into the listed `assets/sat-resources/...` folders.

The website intentionally does not require public DOCX files. Keep your editable DOCX masters privately unless you want visitors to download them.

## Handbook visibility
The handbook is rendered as HTML on `sat-handbook.html`. There is no PDF download link and the handbook PDF is not included in this package. This reduces casual file redistribution, but content shown on a public website can still be copied, printed, screenshotted, or saved. GitHub Pages does not provide DRM or authenticated document access.

## Deployment
1. Copy this package over the existing site folder.
2. Add final SAT practice PDFs at the exact paths listed in `ADD_SAT_FILES_BEFORE_DEPLOYING.txt`.
3. Test locally with Live Server.
4. Commit and push to the GitHub Pages repository.
