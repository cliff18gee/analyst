# Business Analyst Portfolio (static website)

A fast, minimal portfolio for a Health Tech Business Analyst. It is plain **HTML, CSS and JavaScript** — no Next.js, React, npm, Node.js or build step. Upload the files and it works.

## What's inside

```
business-analyst-portfolio/
├── index.html                 ← main page (entry point)
├── favicon.ico
├── README.md
├── PORTFOLIO-INPUT.md         ← questionnaire for adding more content
├── .gitignore
├── assets/
│   ├── css/style.css          ← all styling (colours + fonts at the top)
│   ├── js/data.js             ← your name, email, links, Formspree endpoint
│   ├── js/script.js           ← theme toggle, menu, CV viewer, form handling
│   ├── images/                ← profile.jpg, project-01.svg, project-02.svg, favicon.ico
│   └── documents/CV.pdf       ← your CV
└── projects/
    ├── pod-orion.html         ← case study 1
    └── bp-compliance.html     ← case study 2
```

## Upload to GitHub

1. Sign in to GitHub and click **New repository**. Name it (e.g. `portfolio` or `<your-username>.github.io`). Keep it **Public**.
2. Click **uploading an existing file** (or **Add file → Upload files**).
3. Drag in **everything inside** the `business-analyst-portfolio` folder (not the folder itself) so that `index.html` sits in the **root** of the repository, with the `assets` and `projects` folders beside it.
4. Click **Commit changes**.

## Turn on GitHub Pages

1. In your repository go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch **main** and folder **/ (root)**, then **Save**.
4. After a minute or two your site appears at `https://<your-username>.github.io/<repository-name>/`.

GitHub Pages uses `index.html` as the entry page automatically. The site also works on Netlify, Vercel (static) and by double-clicking `index.html` locally. (When opened locally, the in-page CV viewer and the contact form may behave differently — test them on the live site.)

## Update your information

| What | Where |
|---|---|
| Name, tagline, location, years of experience | `assets/js/data.js` (name also appears in page `<title>`/meta tags in `index.html` and in `projects/*.html`) |
| Email, phone, LinkedIn, GitHub | `assets/js/data.js` |
| CV file path | `assets/js/data.js` → `resume` |
| Formspree endpoint | `assets/js/data.js` → `formspreeEndpoint` (also in the `<form action="…">` in `index.html`) |
| Short bio and About text | `index.html`, section `id="about"` |
| Experience | `index.html`, section `id="experience"` (copy an `<article class="job">` block to add a job) |
| Skills | `index.html`, section `id="skills"` (each skill is an `<li>`) |
| Projects | `index.html`, section `id="projects"` plus the pages in `projects/` |
| SEO / social sharing | `<head>` of `index.html` (look for "SEO / SHARING") |

**Placeholders:** anything highlighted in yellow on the site (for example `[INSERT YEAR]`, `[ADD TOOLS USED AT AMDARI INC.]`, `[INSERT LOCATION OR REMOTE]`) is something still to be completed. Search the files for `[` to find them all. Delete the highlighted text if you do not want to show it.

## Images

Put images in `assets/images/`.
- **Profile photo:** replace `assets/images/profile.jpg` (keep the same name, or update the `<img>` in `index.html`). A portrait around 800×1000 px works well.
- **Project images:** `project-01.svg` and `project-02.svg` are simple illustrations. Replace them with your own images (e.g. `project-01.jpg`) and update the `src` in the project cards in `index.html`. Do not publish patient-identifiable or confidential information.
- **Favicon:** replace `favicon.ico` in the root (and `assets/images/favicon.ico`).

## CV

Put your CV in `assets/documents/`. The **View CV** button opens it in a pop-up viewer on the page, with an "Open in new tab" link for devices that cannot display PDFs inline. To change the file, replace `CV.pdf` or change `resume` in `data.js`.

## Add a project

1. Copy `projects/pod-orion.html` and rename it (e.g. `projects/my-project.html`).
2. Edit the text. The structure is Business problem → Objective → Approach → Analysis → Findings → Recommendations → Outcome → Business impact.
3. In `index.html`, copy one `<article class="project-card">` block, update the image, title, text, skills and set the button's `href` to your new page.
4. Only state results you can evidence — avoid inventing metrics.

## Change colours

Open `assets/css/style.css`. The first block, `:root { … }`, holds the **light theme** colours; `[data-theme="dark"] { … }` holds the **dark theme**. Change `--accent` to restyle buttons and highlights.

## Change fonts

Fonts are set at the top of `assets/css/style.css` (`--font-sans`, `--font-serif`) and loaded by the Google Fonts `<link>` in each HTML page's `<head>`. Pick fonts at fonts.google.com, replace the link, then update the two variables. Delete the Google Fonts links to use system fonts only.

## Contact form (Formspree)

The form posts to your Formspree endpoint and shows loading, success and error messages. Confirm your Formspree form is set up to notify `cliffduah@googlemail.com`. There are no passwords or keys in this project — the endpoint is public by design.

## Notes

- Dark/light preference is saved in the browser (`localStorage`).
- Animations are subtle and switch off for visitors who prefer reduced motion.
- Your CV shows a phone number and email publicly once published — remove them from the PDF if you prefer.
