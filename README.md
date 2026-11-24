# Intelligence Adjacent

Public website for [Intelligence Adjacent](https://intelligenceadjacent.com), an anonymous cybersecurity, AI, and technology news explainer. Viewers land here from YouTube descriptions to read the notes behind a video: what happened, whether it matters to them, what to do, the extra detail that did not fit on screen, and every source.

The site is a static [Astro](https://astro.build) build. It has no analytics, no trackers, no cookie banner, no comments, no forms, and no third-party scripts. Fonts are system fonts.

## Run it locally

You need Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:4321.

To build the production site and preview that output:

```bash
npm run build
npm run preview
```

`npm run build` writes the site to `dist/`. `node scripts/check-site.mjs` checks that build for the pages, the custom domain file, and a few content rules. The GitHub Actions workflow runs both.

## Add an episode

Adding an episode is one Markdown file.

1. Copy [`episode-template.md`](episode-template.md) to `src/content/episodes/<slug>.md`. The filename should match the `slug` field.
2. Fill in the frontmatter and the sections.
3. Set `draft: false` when it should be published. Drafts are left out of the site, the episode index, the RSS feed, and the sitemap.
4. Run `npm run dev` and open the new page.

Published files are rendered newest first at `/episodes/`.

### Frontmatter

```yaml
title: "Episode title"
date: 2026-11-24          # publication date, YYYY-MM-DD
updated: 2026-11-24      # optional, omit if it matches date
slug: episode-slug       # lowercase words and hyphens, used in the URL
summary: "One or two sentences."
youtube: ""              # https URL, or empty until the video exists
tags:                    # lowercase words and hyphens
  - openssh
cve:                     # optional
  - CVE-2026-123158
severity: High           # optional
status: actively exploited   # optional
episode: IA-001          # optional
pillar: Exploited vulnerabilities and patches  # optional
draft: false
corrections:             # optional, also feeds /corrections/
  - date: 2026-11-24
    change: Page created
    reason: Initial publication
```

`title`, `date`, `slug`, and `summary` are required. `youtube` may be an empty string. `tags`, `cve`, and `corrections` may be empty lists.

### Sections

The page title is the frontmatter `title`. Do not add an h1 in the Markdown. Use these h2 headings so the on-page contents and the layout stay aligned:

- `## TL;DR`
- `## Am I affected?`
- `## What happened`
- `## How to protect yourself`
- `## Going deeper`
- `## Free tools, trainings, and runbooks`
- `## Sources`
- `## Corrections log`
- `## About this page`

Put the extra commands, detection notes, and context that go past the video under **Going deeper**. Sources should say what each one was used for. The episode layout adds a short AI-assistance disclosure on every episode page. Say the specifics, including a synthetic narration voice when one is used, under About this page.

Code blocks get a copy button from the site template. No plugin is required.

When `youtube` is an http(s) URL, the page shows a **Watch the video** link. Leave it empty until the URL is real.

## Swap the logo and favicon

The logo files live in `public/`. Replace a file and keep the name:

| File | Use |
| --- | --- |
| `public/wordmark-lockup.svg` | Header. The mark plus the words Intelligence Adjacent. |
| `public/mark.svg` | The IA mark alone, transparent background. |
| `public/favicon.svg` | Browser tab icon. |
| `public/favicon.ico` | Fallback tab icon. |
| `public/apple-touch-icon.png` | Home-screen icon, 180 by 180. |
| `public/icon-192.png` and `public/icon-512.png` | Manifest icons. |
| `public/og-image.png` | Open Graph and Twitter image, 1200 by 630. No faces. |

Do not add a photo of a person. The header image alt text is set in `src/components/Header.astro`.

## Where the other settings live

`src/config.ts` holds the channel-wide values:

- `youtube`: the channel URL (placeholder `https://www.youtube.com/@IntelligenceAdjacent`)
- `supportUrl`: the single Buy Me a Coffee style link (placeholder `https://buymeacoffee.com/inteladj`)
- `email`: `hello@intelligenceadjacent.com`
- `tagline`: `Security news, minus the hype.` Shown on the home page. The longer positioning line is `description`.

Episode video URLs are per file, not in that config.

## How deploy works

Pushes to `main` run `.github/workflows/pages.yml`. The workflow installs dependencies, builds `dist/`, checks the output, uploads that folder, and deploys it to GitHub Pages. Pull requests run the same build and check, and they do not deploy.

The site is built for the domain root (`https://intelligenceadjacent.com`), not for a `github.io/<repo>/` subpath. `public/CNAME` contains `intelligenceadjacent.com`, and Astro copies it into the deployed site.

The `github.io` project URL will not look right, because asset paths are absolute from the domain root. Use `npm run dev` to preview, and use the custom domain once DNS is in place.

## One-time GitHub Pages and DNS setup

Do this once, in this order. Verifying the domain before you point DNS at GitHub Pages is what stops someone else from attaching your domain to their Pages site.

1. On GitHub, open this repository's **Settings > Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Merge this site to `main` (or re-run the **Site** workflow) so the first deploy succeeds.
4. Verify the domain on the **account** that owns the repository, not only on the repo. For a user account that is **Settings > Pages**. For the `inteladj` organization it is the organization **Settings > Pages**. Under **Verified domains**, add `intelligenceadjacent.com`. GitHub shows a TXT record. Create that record at your DNS host, then click **Verify**.
5. Back on the repository's **Settings > Pages**, set **Custom domain** to `intelligenceadjacent.com` and save. This must match `public/CNAME`.
6. At your DNS host, remove any old A, AAAA, or CNAME records for the apex and for `www`. Do not add a wildcard record. GitHub documents that a wildcard can be used to take over subdomains. Then add:

   Apex `A` records for `@`:

   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

   Apex `AAAA` records for `@`:

   - `2606:50c0:8000::153`
   - `2606:50c0:8001::153`
   - `2606:50c0:8002::153`
   - `2606:50c0:8003::153`

   A `CNAME` record for `www` pointing at GitHub Pages:

   - `inteladj.github.io`

   The CNAME target is the account host only. Do not append the repository name.

7. Wait until the certificate is ready, then on the repository **Settings > Pages** page turn on **Enforce HTTPS**. The checkbox stays disabled until GitHub can issue the certificate.

After that, `https://intelligenceadjacent.com` serves the site and `https://www.intelligenceadjacent.com` redirects to the apex, because the custom domain field is the apex.

GitHub's reference for this setup:

- [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Verifying your custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)

## Still to do by hand

- Enable GitHub Pages (**Settings > Pages > Source: GitHub Actions**), add the DNS records above, verify the domain, and turn on **Enforce HTTPS**.
- Replace `supportUrl` in `src/config.ts` if the Buy Me a Coffee URL changes.
- Replace `youtube` in `src/config.ts` if the channel URL changes, and set each episode's `youtube` field when the video is public.
- The logo, favicon, and social image in `public/` are the current artwork. Swap a file in place if the art changes.
