---
title: "Drupal's installer patch didn't hold: SA-CORE-2026-019 and what to do this weekend"
date: 2026-11-26
slug: drupal-installer-sa-core-2026-019
summary: "Drupal's Nov 18 fix for an exploited installer flaw left some sites in unusual or incomplete install states still open to anonymous takeover, production sites included. That gap is also exploited in the wild. Update to 11.4.14, 11.3.23 or 10.6.23, run update.php, block /core/install.php, and check user 1."
youtube: "https://youtu.be/8YKwJH4nglU"
tags:
  - drupal
  - cve-2026-136716
  - cve-2026-132165
  - actively-exploited
  - cisa-kev
  - patch-management
cve:
  - CVE-2026-136716
  - CVE-2026-132165
episode: "IA-004"
severity: High
status: actively exploited
pillar: Exploited vulnerabilities and patches
updated: 2026-11-26
draft: false
corrections:
  - date: 2026-11-26
    change: Page created
    reason: Initial publication
---

> **How this was made.** This page uses AI-assisted source gathering, timeline cross-checking, and claim checking against primary records. A human reviewed every claim, link, and recommendation before publication. The video narration uses a synthetic voice.

## TL;DR

- **What:** On Nov 25, 2026, Drupal published SA-CORE-2026-019 (CVE-2026-136716). It says the Nov 18 installer fix, SA-CORE-2026-017 (CVE-2026-132165), left "certain sites in unusual or incomplete install states" still open to site takeover, "including production sites."
- **Is it exploited:** Yes, according to Drupal: "This is being exploited in the wild." The first installer flaw was also exploited, and CISA added it to its Known Exploited Vulnerabilities (KEV) catalog on Nov 24, 2026.
- **Why it's nasty:** Drupal says "it is not apparent in the user interface if a site is in the affected vulnerable state." Your admin screens won't tell you.
- **Do this now:** Update to Drupal 11.4.14, 11.3.23 or 10.6.23. Then run `update.php` (or `drush updatedb`), because "an update hook must run to fix existing production sites in this state." Block `/core/install.php` at the web server. Check user 1's email, password and recent changes.
- **If you already blocked the installer:** Drupal says you are not vulnerable to this one. Patch anyway.

| 21/25 | About 1 day | 7 days |
| --- | --- | --- |
| Drupal's risk score for SA-CORE-2026-019, "Highly critical" | From the Nov 18, 2026 release window to the first reported exploitation (Nov 19, 2026, 19:00 UTC) | Between the first installer fix (Nov 18, 2026) and the second (Nov 25, 2026) |

## Am I affected?

You might be if all three of these are true:

1. Your site runs Drupal 10 before 10.6.23, Drupal 11.0.0 through 11.3.22, or Drupal 11.4.0 through 11.4.13.
2. Anyone on the internet can reach `/core/install.php` on it.
3. The site is in what Drupal calls an "unusual or incomplete install state."

You can't easily check the third one from the admin UI, and Drupal hasn't published how sites end up there. So don't try to reason your way out of it. If the first two are true, treat the site as exposed: update, run the database update, block the installer, and check user 1.

Drupal 7 is not affected, according to Pantheon and HeroDevs. Drupal 8, Drupal 9, 10.5.x and older, and 11.2.x and older are end-of-life and won't get a fix. If you're on one of those, blocking the installer is your mitigation and upgrading is your real fix.

## What happened

All times are UTC. Where Drupal hasn't published a time of day, we say so.

| When (UTC) | What happened | Source |
| --- | --- | --- |
| Nov 16, 2026 | Drupal pre-announces core security releases for Nov 18, 2026, between 17:00 and 21:00 UTC, rated Critical 18/25. It warns that "exploits might be developed within hours or days." | PSA-2026-11-16 |
| Nov 18, 2026 | SA-CORE-2026-017 (CVE-2026-132165) ships. Fixed in 11.4.13, 11.3.22 and 10.6.22. As first sent, it's Critical 18/25 with a proof of concept, not known attacks. | SA-CORE-2026-017; security-news list |
| Nov 19, 2026, 19:00 UTC | Earliest exploitation on live sites that Drupal says it has received a report of. | SA-CORE-2026-017 (updated) |
| By Nov 24, 2026 | Drupal re-rates SA-CORE-2026-017 to Highly critical 20/25 with the exploit flag set. The exact time isn't published. | SA-CORE-2026-017 |
| Nov 24, 2026 | CISA adds CVE-2026-132165 to KEV, with a federal due date of Nov 27, 2026 and forensic triage required. | CISA KEV; CISA alert |
| Nov 25, 2026 | SA-CORE-2026-019 (CVE-2026-136716) ships. Fixed in 11.4.14, 11.3.23 and 10.6.23. Highly critical 21/25. Exploited in the wild. The OSV record was published at 17:04 UTC. | SA-CORE-2026-019; OSV |
| Nov 26, 2026, 00:44 UTC | CVE records for both issues appear on cve.org. | cve.org |
| Nov 27, 2026 | KEV due date for CVE-2026-132165 for US federal civilian agencies. | CISA KEV |

Two things stand out. First, Drupal did the responsible thing up front: a public warning two days ahead, a release window in UTC, and a plain statement that attacks could follow fast. They did, about a day later. Second, the fix that most admins rushed out last week turned out not to cover every site. That's the "patch didn't hold" part.

## Scope and impact

**Confirmed, per Drupal:**

- An attacker doesn't need an account. Both advisories are about the installer being reachable by anonymous visitors.
- SA-CORE-2026-017 could lead to "a site takeover or remote code execution."
- SA-CORE-2026-019 is an access bypass that leaves some sites "vulnerable to site takeover," and it's exploited in the wild.
- Production sites are included. This isn't only about half-built staging boxes.
- A compromised site "may no longer be in the vulnerable state." A clean check today doesn't prove nothing happened last week.

**Not published:**

- How many sites are or were in the affected state.
- How sites end up in an "unusual or incomplete" install state.
- Indicators of compromise beyond "check user 1."
- Who's attacking, or what they do after taking a site.

SecurityWeek noted on Nov 25, 2026 that no public information on the attacks appeared to be available. We haven't found any since. We're not going to guess at victims.

**About KEV:** CVE-2026-132165 (the first flaw) is in KEV. CVE-2026-136716 (the second flaw) was **not** in KEV as of catalog version 2026.11.25, released Nov 25, 2026 at 19:48 UTC, when we checked on Nov 26, 2026, and again at 02:44 UTC the same day. Drupal itself says it's exploited, so don't wait for a KEV listing to act.

## Technical breakdown

This section explains the mechanics at the level a defender needs. It doesn't include, and won't link to, anything that walks through an attack.

### What the installer is

Drupal core ships with `core/install.php`. You use it once, to install a site. After that, Drupal's own guide says you should block it, because you don't need it and every installer bug becomes irrelevant if it can't be reached.

Here's the uncomfortable bit. On many sites it's still reachable. Nothing in a normal deployment removes it, and Composer puts the file back every time it installs or updates core.

### What the first fix did

SA-CORE-2026-017 stopped the installer from re-running on a site that's already installed, under the conditions Drupal knew about. Drupal says some, but not all, exploit paths were also blocked if the web server can't write to `settings.php` or change its permissions.

### Why it didn't hold

Drupal keeps a record of how far an install got. The first fix trusted that record to decide whether a site was "already installed." SA-CORE-2026-019 says some sites, production sites included, have an unusual or incomplete record even though they're running fine. On those sites, the first fix could be bypassed.

A public code analysis by Corgea goes further. It says the new release adds a second check in the installer and a post-update hook that marks the install as finished on sites that never recorded it. That lines up with Drupal's instruction that "an update hook must run." The detail is Corgea's reading of the code, not Drupal's guidance.

### What the fix requires from you

| Step | Why | Source |
| --- | --- | --- |
| Update core to 11.4.14, 11.3.23 or 10.6.23 | The code fix for CVE-2026-136716 | SA-CORE-2026-019 |
| Run `update.php` or `drush updatedb` | The update hook repairs sites already in the bad state. Updating the code alone doesn't. | SA-CORE-2026-019; Pantheon |
| Block `/core/install.php` at the web server | Drupal says sites with a secured installer aren't vulnerable | SA-CORE-2026-019; Securing the installer |
| Check user 1 | Takeover shows up as changes to or by the user 1 account | SA-CORE-2026-019 |

### Weakness classes, per the CVE records

```
CVE-2026-132165  CWE-306  Missing Authentication for Critical Function
CVE-2026-136716  CWE-754  Improper Check for Unusual or Exceptional Conditions
KEV entry for CVE-2026-132165 lists CWE-636 (Not Failing Securely)
```

## Detection and indicators

Drupal hasn't published indicators of compromise. These checks come from its advisory, its documentation and common incident-response practice. Run them on every Drupal site you're responsible for, including staging and multisite installs.

**1. Confirm the version.**

```
drush status --field=drupal-version
# Want: 11.4.14, 11.3.23, 10.6.23 or later on your branch
```

**2. Confirm the installer is blocked.** These come from Drupal's guide. All three should return 403 or 404.

```
curl -I https://example.com/core/install.php
curl -IL https://example.com/install.php
curl -I https://example.com/core/install.php/foo
```

**3. Look for installer requests in your web logs since Nov 18, 2026.** Any request that reached the installer and got a 200 back deserves a closer look.

```
grep -h "install.php" /var/log/nginx/access.log* /var/log/apache2/access.log* 2>/dev/null
```

**4. Check user 1.** Drupal's advisory: check "unexpected changes to or by the user 1 account," make sure the user 1 email "is set to something you control," and consider resetting its password.

```
drush user:information --uid=1
# Check the name, email, and last login against what you expect
```

**5. Look for the things a takeover leaves behind.** New administrator accounts, role changes, configuration changes, and unexpected PHP files in your files directory or code directories. If you use the Database Logging module, review its entries for the same window.

If any of this looks wrong, stop and follow Drupal's "Your Drupal site got hacked. Now what?" guide. Preserve evidence first, then restore or rebuild.

## Protect yourself roadmap

### If you just visit Drupal sites

There's nothing to patch on your end. This is a server-side problem. The usual rule applies if a site you trust starts acting strangely or asks you to log in again out of nowhere: close the tab and go back in through a bookmark.

### Small business or a site run by an agency

1. Ask whoever runs your site three questions today: Are we on 11.4.14, 11.3.23 or 10.6.23? Did you run the database update? Is `/core/install.php` blocked?
2. If you're on a managed host, read its notice. Pantheon says its platform blocks the known path, and U-M says Acquia-hosted sites are protected too. Both still say to update.
3. Make sure user 1's email is an address your business controls, not a former contractor's.
4. Get the curl check result in writing. "We patched last week" isn't an answer anymore.

### Enterprise and agencies running many sites

1. Inventory every Drupal install, including staging, forgotten microsites, multisite children and anything a vendor stood up for a campaign.
2. Patch to the 019 releases and run `drush updatedb` across the fleet. Track the database update as its own step in your change ticket.
3. Block `/core/install.php` at the edge or web server on every site. Drupal's guide recommends doing both: block it at the server and remove the file after each Composer run.
4. Review web logs from Nov 18, 2026 onward for installer requests, and check user 1 on every site.
5. If you're a US federal civilian agency, CVE-2026-132165 is due Nov 27, 2026 under KEV, with forensic triage required. Treat CVE-2026-136716 the same way, KEV listing or not.
6. Write down who's on call over the holiday weekend and who can approve an emergency change. Attackers don't take holidays off.

### What not to panic about

- If your installer was already blocked, Drupal says you're not vulnerable to SA-CORE-2026-019.
- If you're on Drupal 7, this one doesn't apply, according to Pantheon and HeroDevs.
- Site visitors don't need to do anything.

## Broader context and lessons learned

### What people assume vs what's true

People assume: "We patched SA-CORE-2026-017 last week, so we're done."

What's true: That patch didn't cover every site. You need the Nov 25 release, a database update, and ideally a blocked installer. And if the installer was reachable after Nov 18, Drupal says the site "may still have been compromised."

### Patched is an event, not a state

The lesson I keep relearning: "patched" describes something you did on a Tuesday. It doesn't describe the site you're running on Saturday. A fix can be incomplete. A deploy can skip a step. A post-update hook can sit there waiting for someone to run it.

The control that held through both advisories wasn't a patch at all. It was a web server rule that made `install.php` unreachable. Drupal says sites with a secured installer weren't vulnerable to 019. That's the point of defense in depth: the boring layer covered the gap in the clever one.

### Credit where it's due

Drupal's security team did a lot right here: an advance warning with a UTC release window, a plain "exploits might be developed within hours or days," an honest public update when reports of attacks came in, a re-rating, and a second fix a week later that says in plain words that the first one wasn't enough. Vendors who quietly ship a follow-up and hope nobody notices could learn from that. The first advisory credits an automated open-source code scanner from Anthropic with the original find.

## Free tools, trainings, and runbooks

- [Drupal: Securing the installer (install.php)](https://www.drupal.org/docs/administering-a-drupal-site/security-in-drupal/securing-the-installer-installphp): Apache, Nginx and Composer options, plus the curl test.
- [Drupal: Your Drupal site got hacked. Now what?](https://www.drupal.org/docs/develop/security/your-drupal-site-got-hacked-now-what): the official incident checklist.
- [Drupal Security Advisories](https://www.drupal.org/security): subscribe to core advisories by email or RSS.
- [CISA KEV catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog): watch for a CVE-2026-136716 entry.
- [OSV: DRUPAL-CORE-2026-019](https://osv.dev/vulnerability/DRUPAL-CORE-2026-019): machine-readable ranges for dependency scanners.
- [Drush](https://www.drush.org/): `status`, `updatedb` and `user:information` used above.

## Sources

### Cited and authoritative

- [Drupal Security Team, SA-CORE-2026-019 (Nov 25, 2026)](https://www.drupal.org/sa-core-2026-019). Used for: the second advisory, versions, rating, exploitation status, update.php requirement and user 1 checks.
- [Drupal Security Team, SA-CORE-2026-017 (Nov 18, 2026, updated)](https://www.drupal.org/sa-core-2026-017). Used for: the first advisory, versions, settings.php mitigation, exploitation update and re-rating.
- [Drupal Security Team, PSA-2026-11-16 (Nov 16, 2026)](https://www.drupal.org/psa-2026-11-16). Used for: the advance warning, release window and original rating.
- [Drupal security-news mailing list](https://lists.drupal.org/mailman3/hyperkitty/list/security-news@drupal.org/latest). Used for: the as-sent text of SA-CORE-2026-017.
- [CISA, Known Exploited Vulnerabilities Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog). Used for: the CVE-2026-132165 entry and our check for CVE-2026-136716.
- [CISA, "CISA Adds Three Known Exploited Vulnerabilities to Catalog" (Nov 24, 2026)](https://www.cisa.gov/news-events/alerts/2026/11/24/cisa-adds-three-known-exploited-vulnerabilities-catalog). Used for: the KEV announcement.
- [CISA, BOD 26-04](https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk). Used for: what the KEV due date means.
- [CVE-2026-136716 on cve.org](https://www.cve.org/CVERecord?id=CVE-2026-136716). Used for: CWE-754 and record publication time.
- [CVE-2026-132165 on cve.org](https://www.cve.org/CVERecord?id=CVE-2026-132165). Used for: CWE-306.
- [Drupal: Securing the installer (install.php)](https://www.drupal.org/docs/administering-a-drupal-site/security-in-drupal/securing-the-installer-installphp). Used for: blocking, removal and the curl test.
- [Drupal: Your Drupal site got hacked. Now what?](https://www.drupal.org/docs/develop/security/your-drupal-site-got-hacked-now-what). Used for: compromise response.
- [Drupal Steward](https://www.drupal.org/drupal-security-team/steward). Used for: what Steward covers.
- [Pantheon release note (Nov 25, 2026)](https://docs.pantheon.io/release-notes/2026/11/drupal-core-security-release-sa-core-2026-019). Used for: platform block, required database update, Drupal 7 not affected.
- [U-M Safe Computing alert (Nov 25, 2026)](https://safecomputing.umich.edu/security-alerts/apply-drupal-update-access-bypass-vulnerability). Used for: "update again" and managed-host protection.
- [Canadian Centre for Cyber Security, AV26-1209](https://www.cyber.gc.ca/en/alerts-advisories/drupal-security-advisory-av26-1209). Used for: national CERT confirmation.
- [NHS England Digital, CC-4904](https://digital.nhs.uk/cyber-alerts/2026/cc-4904). Used for: second national response to the first flaw.
- [OSV, DRUPAL-CORE-2026-019](https://osv.dev/vulnerability/DRUPAL-CORE-2026-019). Used for: publication time and Composer ranges.

### Research and inspiration

- [SecurityWeek: Drupal Flaw Found by Anthropic Scanner Exploited in Attacks](https://www.securityweek.com/drupal-flaw-found-by-anthropic-scanner-exploited-in-attacks/)
- [BleepingComputer: Hackers now exploit critical Drupal RCE flaw to hijack sites](https://www.bleepingcomputer.com/news/security/hackers-now-exploit-critical-drupal-rce-flaw-to-hijack-sites/)
- [Corgea: Fail2Install, patched twice](https://corgea.com/research/cve-2026-132165-132166-drupal-core-installer-reinstall-takeover-gadget-chain-november-2026)
- [StepSecurity: Fail2Install (CVE-2026-132165)](https://www.stepsecurity.io/blog/fail2install-cve-2026-132165)
- [LNX Inc.: MSP threat briefing (Nov 25, 2026)](https://lnxinc.com/news/msp-threat-briefing-2026-11-25/)
- [Five Nines: Drupal patches critical installer flaw](https://www.thefivenines.com/security/drupal-patches-critical-installer-flaw-that-can-let-anonymous-users-seize-sites)
- [Brandefense: Drupal installer takeover response playbook](https://brandefense.io/security-news/drupal-installer-takeover-response-playbook/)
- [HeroDevs: Is Drupal 7 affected by CVE-2026-136716?](https://www.herodevs.com/blog-posts/drupal-7-cve-2026-136716-sa-core-2026-019)
- [Webforta: SA-CORE-2026-019 installer takeover exploited](https://webforta.com/blog/drupal-sa-core-2026-019-installer-access-bypass)
- [2-Spyware: Drupal installer flaw is now exploited](https://www.2-spyware.com/drupal-installer-flaw-exploited-cisa-orders-fixes)
- [HOL: fix and block install.php](https://hol.org/blog/cve-2026-132165-drupal-installer-takeover-cisa-kev)
- [Flawfence: CVE-2026-132165 versions and fix](https://flawfence.com/blog/en/cve-2026-132165-drupal-installer-remote-code-execution/)
- [Digital Matters: Drupal installer exploit seen on live sites](https://digitalmatters.me/security/drupal-installer-exploited-live-sites/)

## Corrections log

| Date | Change | Reason |
| --- | --- | --- |
| Nov 26, 2026 | Page created | Initial publication |
| Nov 26, 2026, 02:44 UTC | Rechecked CISA KEV catalog 2026.11.25 | CVE-2026-136716 still not listed |

## About this page

This companion page is the source of truth for Intelligence Adjacent episode IA-004. It was prepared with AI-assisted research and drafting. A human reviewed the claims, the links, and the recommendations. The narration uses a synthetic voice, and the YouTube upload is labeled as altered or synthetic content.

Times on this page are UTC only. If Drupal updates either advisory, or CISA adds CVE-2026-136716 to KEV, the change will be recorded in the corrections log above.

Corrections go to [hello@intelligenceadjacent.com](mailto:hello@intelligenceadjacent.com). Nothing here is legal advice or exploit guidance.
