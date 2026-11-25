---
title: "One GitHub account inside 1Password: what was taken and what to do"
date: 2026-11-25
slug: 1password-backend-incident-nov-2026
summary: "1Password says an attacker used an employee's corporate GitHub account to copy source code, reach its CI/CD system and push code that downloaded account records for a subset of customers. Vaults and the keys that protect them were not accessed, per 1Password. The practical risk now is convincing phishing. Open 1Password from the app or a typed address, never from an email link."
youtube: "https://youtu.be/rmWYI3Aqzow"
tags:
  - 1password
  - data-breach
  - phishing
  - github
  - ci-cd
  - developer-security
episode: "IA-003"
severity: Medium
status: disclosed
pillar: Breaches and incidents
updated: 2026-11-25
draft: false
corrections:
  - date: 2026-11-25
    change: Page created
    reason: Initial publication
---

> **How this was made.** This page uses AI-assisted source gathering, timeline cross-checking, and claim checking against primary records. A human reviewed every claim, link, and recommendation before publication. The video narration uses a synthetic voice.

## TL;DR

- **What:** 1Password says an attacker gained access to an employee's corporate GitHub account, copied source code from private repositories, reached its CI/CD system, and pushed malicious code to backend services. That code downloaded account records for a subset of customers.
- **What leaked, per 1Password:** names and email addresses, account and user identifiers, account creation and last sign-in times, public keys, Secure Remote Password (SRP) parameters, tokens from certain invitation, provisioning and recovery emails, and other internal metadata.
- **What did not, per 1Password:** vaults and the items in them, the keys that protect vaults, account recovery keys, and the apps and browser extensions. 1Password says it does not store your account password or Secret Key.
- **Do this now:** Nothing changes in your 1Password account, according to 1Password. Treat any unexpected email, text or call about 1Password, an invitation, or an account recovery as hostile. Open the app yourself or type the address. Never enter your account password or Secret Key on a page you reached from a link.
- **If you run engineering:** use this as a prompt to check that one compromised developer account cannot push code to production by itself.

| 6 days | 6 to 10 | 0 |
| --- | --- | --- |
| From the start of 1Password's investigation (Nov 19, 2026) to its public post (Nov 25, 2026) | Invitation and recovery codes went from six numeric digits to ten alphanumeric characters | Vault contents or vault keys accessed, according to 1Password |

## Am I affected?

1Password says the attacker downloaded records for "a subset of our users." It has not published how many, or how it chose them. If you use 1Password, assume your name and email address could be in that set and act accordingly. That costs you nothing and covers the real risk.

A small number of users were in the middle of an invitation, provisioning or account recovery during the incident. 1Password says those users have been notified directly. If you did not get that notice, 1Password's post does not ask you to do anything about tokens.

If you are an administrator of a 1Password Business or Teams account, you have a bit more to check. See the enterprise steps in the roadmap below.

## What happened

1Password published its account on Nov 25, 2026, and announced it on X at Nov 25, 2026, 17:28 UTC. It has not published times of day for the earlier events, so the table below gives dates only where that is all we have.

| Time (UTC) | Event | Who says so |
| --- | --- | --- |
| Nov 19, 2026 | Time of day not published. 1Password begins investigating signs that an attacker had access to an employee's corporate GitHub account | 1Password blog |
| Not published | Attacker copies source code from private repositories and gains access to the CI/CD system | 1Password blog |
| Not published | Attacker pushes malicious code to backend services, which download account records for a subset of users | 1Password blog |
| Not published | GitHub account disabled, stolen token revoked, attacker access removed, exposed credentials rotated, clean service versions restored | 1Password blog |
| Nov 25, 2026 | Time of day not published. Blog post "Update on a security incident involving 1Password's backend systems" published | 1Password blog |
| Nov 25, 2026, 17:28 UTC | Announcement posted on X | 1Password on X |

The sequence matters more than the exact clock. The attacker did not need a database password or a cracked encryption key. According to 1Password, the company's own deploy path ran code the attacker pushed, and that code asked for the data.

1Password says it disabled the affected GitHub account, revoked the stolen token, removed the access the attacker created, rotated or revoked every internal credential that may have been exposed, tightened GitHub, CI/CD and endpoint controls, added detections, and brought in independent experts to validate containment. It also says it found no internal evidence of account takeovers using the exposed tokens.

What 1Password has not said yet: how the employee's account or token was compromised, when the malicious code went live, how long it ran, which backend services were changed, or how many customers are in the subset.

## What was taken, and what it means

1Password lists the downloaded fields. Here is the list with a plain reading of each:

| Field | Plain reading | Risk on its own |
| --- | --- | --- |
| Names and email addresses | Who you are and where to reach you | Phishing fuel |
| Account and user identifiers | Internal IDs | Low, but adds realism to a lure |
| Account creation and last sign-in times | When you joined and last signed in | Adds realism to a lure |
| Public keys | Public by design | 1Password says no impact |
| SRP protocol parameters | Values the server uses to verify your sign-in | 1Password says they cannot be used to access your account |
| Tokens in certain emailed links | Invitation, provisioning (SCIM Bridge or Hosted Provisioning) and recovery links | Needs SSO or an emailed code too, per 1Password |
| Other internal metadata | Version and file numbers | Low |

### Why the SRP parameters are not a password hash

1Password's Security Design White Paper describes two-secret key derivation. Your account password is combined with a Secret Key, a 128-bit random value generated on your device when you sign up. The value the server keeps for sign-in is derived from both. That is the design reason 1Password gives for saying a stolen copy cannot be used to guess your password. This is the vendor's design claim. We have not seen an independent analysis of the specific data taken here.

### Why the tokens are not keys

When 1Password emails an invitation or a recovery link, the link carries a token. 1Password says the token only works when combined with an SSO sign-in or a short code sent to the registered email address. To make guessing that code impractical, it changed the code from six numeric digits to ten alphanumeric characters.

### The contrast that matters

What people assume: if the vault is safe, nothing that matters leaked.

What is actually true: a verified list of real customers, with names, email addresses and last sign-in dates, is the hard part of a targeted phishing campaign already done.

## Technical breakdown

The attack path, as 1Password describes it, maps to a familiar defender's checklist. We are labeling these with MITRE ATT&CK techniques for defensive triage only. No exploit details are public and none are given here.

| Stage | What 1Password says | ATT&CK reference (defensive label) |
| --- | --- | --- |
| Initial access | An employee's corporate GitHub account; a "stolen token" was later revoked | T1078 Valid Accounts |
| Collection | Source code copied from private repositories | T1213 Data from Information Repositories |
| Credential access | Access to CI/CD, which holds infrastructure secrets | T1552 Unsecured Credentials (possible; rotation was triggered) |
| Execution | Malicious code pushed to backend services | Not mapped: internal deploy path, details not disclosed |
| Exfiltration | Backend code downloaded account records | Not mapped: method not disclosed |

This is not a supply-chain attack on 1Password's customers in the usual sense. 1Password says its apps and browser extensions were not affected. It is an attack on 1Password's own build and deploy path, which then reached customer account data on the server side.

## Detection and indicators

1Password has not published indicators of compromise, attacker infrastructure, or malicious commit details. We will not invent any. What you can watch for is the follow-on phishing.

```text
Lure themes to flag (not confirmed campaigns; expected based on the leaked fields):
  - "Finish your account recovery"            -> recovery you did not start
  - "Your administrator invited you"          -> invite you did not expect
  - "New sign-in detected" + a real-looking date
  - "Verify your Secret Key" / "re-enter your account password"
  - Any 1Password "security" SMS              -> 1Password says it does not use SMS for account contact
Sender check:
  Account mail comes from 1password.com / .ca / .eu (see 1Password's published domain list)
Report:
  Suspicious 1Password-themed mail -> abuse@1password.com
  Anything you already clicked or entered -> support@1password.com
```

For Business administrators, the useful places to look are the 1Password audit log and reports, plus provisioning activity if you run SCIM Bridge or Hosted Provisioning. Look for invitations, recoveries or device sign-ins nobody on your team started.

## Protect yourself roadmap

### Individuals and families

1. Do not change anything in your 1Password account because of this incident. 1Password says no action is required.
2. Treat any unexpected email, text or call about 1Password, an invitation or an account recovery as hostile until you check it in the app.
3. Never sign in from a link. Open the app you already have, or type the address yourself.
4. Check the sender against 1Password's published list of email domains.
5. If your 1Password account password is reused anywhere, change it. That is good hygiene regardless of this incident.
6. Turn on two-factor authentication for your 1Password account, ideally with a security key.
7. Tell your family members the same thing in one sentence: vaults were not affected, expect fake emails, never sign in from a link.

### Small business

1. Send one short message to your team: 1Password had an incident, vaults were not affected, expect fake emails, never sign in from a link, report any recovery email you did not ask for.
2. Make sure two-factor authentication is on for every member. Prefer security keys for owners and admins.
3. If you have the audit log, scan it for invitations and recoveries nobody started.
4. Agree on one internal channel for "is this real?" questions, so nobody clicks first and asks later.

### Enterprise

1. Review the 1Password audit log and reports for unexpected provisioning, recovery and device events.
2. If you run SCIM Bridge or Hosted Provisioning, confirm recent provisioning events match your identity provider's records.
3. Enforce two-factor authentication, with security keys where you can, and limit failed sign-in attempts in your account policies.
4. Add 1Password-themed lures to mail filtering rules and to this month's awareness messaging.
5. Then look at your own house. The same path exists in most engineering orgs:
   - Require approval from someone other than the last pusher on every branch that deploys (GitHub rulesets: required approvals and "require approval of the most recent reviewable push").
   - Put required reviewers on production deployment environments and turn on "Prevent self-review."
   - Scope CI secrets to the jobs that need them, and prefer OIDC and short-lived tokens over long-lived secrets.
   - Alert on direct pushes, new workflow files, and workflow edits nobody planned.

### What not to panic about

You do not need to export your vault and move to another product. You do not need to rotate every password you own because of this incident. Based on what 1Password has disclosed, vault data is encrypted with keys it does not hold. If 1Password's account changes, this page will change too.

## Broader context and lessons learned

### Practitioner commentary (opinion, labeled)

These are views from practitioners on X, not findings:

- @_mwc called the day-before-Thanksgiving timing (the US holiday) "an attempt to bury bad news," then let it slide because the incident was six days old and earlier notice beats a post-holiday one. He argued one engineer's compromise should not equal malicious code pushes, and asked 1Password to add a second approver on internal code changes, which its "what we've done" list does not name specifically.
- The same account posted a short company checklist: do not panic, review 1Password logs and reports, confirm strong authentication policies, and warn users about ambulance-chasing phishing.
- @yenkel warned 1Password users to expect phishing emails built from the breached data.

Our read: six days from investigation to public notice is not slow for an incident of this kind. The second-approver point is the most useful one in the thread. 1Password says it "tightened internal GitHub, CI/CD, and endpoint controls," which may include exactly that. It has not said.

### The pattern this month (context only, not linked)

Two other November 2026 incidents follow the same shape. Nobody has connected them to 1Password's attacker, and neither do we.

- The Hacker News, citing Aikido Security and SafeDep, reported on Nov 12, 2026, that stolen credentials for 4,837 GitHub accounts were used to plant a CI secret stealer that ran in at least 1,806 repositories.
- Todoist said on Nov 25, 2026, that a stolen credential associated with its version-control system was used on Nov 22 and 23, 2026, to modify automated workflows, obtain more credentials, and reach customer data for about 6% of users.

The shared lesson: developer identity, then CI/CD, then production. The encryption design held at 1Password, and that deserves credit. The door that opened was one developer account with a path to code that touches customer data.

## Free tools, trainings, and runbooks

- [1Password email and marketing domains](https://support.1password.com/email-domains/): check a sender before you trust it.
- [1Password: How to keep your account secure](https://support.1password.com/account-security/): account hygiene steps.
- [1Password: Use two-factor authentication](https://support.1password.com/two-factor-authentication/): includes security keys.
- [CISA: Recognize and Report Phishing](https://www.cisa.gov/secure-our-world/recognize-and-report-phishing): a short training to forward to family.
- [CISA: Implementing Phishing-Resistant MFA](https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf): why FIDO keys resist phishing.
- [GitHub: Available rules for rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets): two-person review on deploy branches.
- [GitHub: Managing environments for deployment](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment): required reviewers and preventing self-review.
- [GitHub: Security hardening for GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions): least privilege and OIDC.
- [OpenSSF Scorecard](https://github.com/ossf/scorecard): open source checks for branch protection and risky workflows.
- [Gitleaks](https://github.com/gitleaks/gitleaks): open source secret scanning for repositories.
- [StepSecurity Harden-Runner](https://github.com/step-security/harden-runner): open source egress monitoring for GitHub Actions runners.
- [SLSA v1.0](https://slsa.dev/spec/v1.0/): a framework for build integrity.

## Sources

### Cited and authoritative

1. [1Password: Update on a security incident involving 1Password's backend systems (Nov 25, 2026)](https://1password.com/blog/update-on-nov-2026-security-incident). Used for: timeline start, attack path, affected and unaffected data, token and code change, remediation, customer guidance.
2. [1Password on X: incident announcement (Nov 25, 2026, 17:28 UTC)](https://x.com/1Password/status/2125642686443258030). Used for: disclosure time and the "no vault content or keys accessed" statement.
3. [1Password Security Design White Paper](https://agilebits.github.io/security-design/1Password_Security_Design.pdf). Used for: two-secret key derivation and the SRP verifier.
4. [1Password Support: email and marketing domains](https://support.1password.com/email-domains/). Used for: sender domains.
5. [1Password Support: How to keep your 1Password account secure](https://support.1password.com/account-security/). Used for: no SMS account contact, account hygiene.
6. [1Password Community: Phishing guide](https://www.1password.community/cybersecurity-glossary-67/phishing-22018). Used for: what 1Password will never ask for, abuse@1password.com.
7. [1Password Support: audit log in 1Password Business](https://support.1password.com/activity-log/). Used for: where admins review events.
8. [1Password Support: two-factor authentication](https://support.1password.com/two-factor-authentication/). Used for: security keys as a second factor.
9. [GitHub Docs: Available rules for rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets). Used for: required approvals and most-recent-push approval.
10. [GitHub Docs: Managing environments for deployment](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment). Used for: required reviewers and preventing self-review.
11. [GitHub Docs: Security hardening for GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions). Used for: least privilege and OIDC.
12. [CISA: Implementing Phishing-Resistant MFA](https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf). Used for: FIDO and phishing resistance.
13. [Todoist: Security incident in November 2026](https://www.todoist.com/help/todoist/get-started/security-incident-in-november-2026-cG0EIACNU). Used for: the separate same-week incident.
14. [The Hacker News: 4,837 hijacked GitHub accounts ran a CI secret stealer (Nov 12, 2026)](https://thehackernews.com/2026/11/4837-hijacked-github-accounts-ran-ci.html). Used for: the November hijacked-account wave, context only.

### Research and inspiration

- [@_mwc on X: timing and dual-control take](https://x.com/_mwc/status/2125645321032335604)
- [@_mwc on X: company checklist](https://x.com/_mwc/status/2125652592562995492)
- [@yenkel on X: phishing warning](https://x.com/yenkel/status/2125654320217559327)
- [@opsek_io on X: phishing summary](https://x.com/opsek_io/status/2125652301171867666)
- [@samotg on X: open from the app, not the email](https://x.com/samotg/status/2125655929613926765)
- [X News story on the disclosure](https://x.com/i/trending/2125650658129027107)
- [RuntimeWire coverage (partly paywalled)](https://runtimewire.com/article/1password-says-attacker-copied-customer-account-records-through-a-compromised)
- [Caschys Blog coverage (German)](https://stadt-bremerhaven.de/sicherheitsvorfall-bei-1password/)
- [1Password: Okta Support System incident and 1Password (2023)](https://1password.com/blog/okta-incident)
- [1Password: How 1Password uses SRP](https://1password.com/blog/developers-how-we-use-srp-and-you-can-too)
- [1Password: What the Secret Key does](https://1password.com/blog/what-the-secret-key-does)
- [1Password: After the breach, attackers go credential harvesting](https://1password.com/blog/ai-credential-harvesting)
- [CISA and partners: Phishing Guidance, Stopping the Attack Cycle at Phase One](https://www.cisa.gov/resources-tools/resources/phishing-guidance-stopping-attack-cycle-phase-one)
- [Have I Been Pwned](https://haveibeenpwned.com/)

## Corrections log

| Date | Change | Reason |
| --- | --- | --- |
| Nov 25, 2026 | Page created | Initial publication |

## About this page

This companion page is the source of truth for Intelligence Adjacent episode IA-003. It was prepared with AI-assisted research and drafting. A human reviewed the claims, the links, and the recommendations. The narration uses a synthetic voice, and the YouTube upload is labeled as altered or synthetic content.

Times on this page are UTC only. Where 1Password has not published a time of day, we say so rather than guess. If 1Password updates its post, the change will be recorded in the corrections log above.

Corrections go to [hello@intelligenceadjacent.com](mailto:hello@intelligenceadjacent.com). Nothing here is legal advice or exploit guidance.
