---
title: "AI-assisted intrusions are here, and they walk through old doors"
date: 2026-11-27
slug: ai-assisted-intrusions
summary: "Three reports from one week: MiCollab zero-days that Accenture assesses were driven partly by AI tooling, Swiss and Italian agencies confirming AI-agent attacks, and a Check Point management-server campaign GreyNoise believes used agentic systems. None of them needed a new technique. Cut exposure, patch internet-facing systems fast, and watch for machine-speed behavior."
youtube: ""
tags:
  - ai-assisted-attacks
  - mitel-micollab
  - check-point
  - artex
  - cisa-kev
  - actively-exploited
  - attack-surface
cve:
  - CVE-2026-133323
  - CVE-2026-133303
  - CVE-2026-133275
  - CVE-2026-133324
  - CVE-2026-133311
  - CVE-2026-16232
episode: "IA-005"
severity: High
status: actively exploited
pillar: AI and security
updated: 2026-11-27
draft: true
corrections:
  - date: 2026-11-27
    change: Page created
    reason: Initial publication
---

> **How this was made.** This page uses AI-assisted source gathering, timeline cross-checking, and claim checking against primary records. A human reviewed every claim, link, and recommendation before publication. The video narration uses a synthetic voice.

## TL;DR

In one week, four primary sources described attackers using AI to move faster:

- **Mitel MiCollab.** Accenture APEX Labs assesses, with high confidence, that five MiCollab flaws were exploited before Mitel's Nov 16, 2026 patch. At one victim the actor went from first request to a domain controller login in 32 minutes. Accenture also assesses that AI-assisted tooling drove parts of the intrusion.
- **Switzerland and Italy.** The Swiss NCSC confirmed its first AI-agent attacks, and says every case it knows of ended in a successful compromise. CSIRT Italia named four agent frameworks seen in real campaigns.
- **ARTEX.** Microsoft says many threat actors have abused the ARTEX framework, and names six, state-sponsored and financially motivated, that it has seen integrating it into their tooling.
- **Check Point.** GreyNoise found a campaign against at least 22 organizations through 24 Check Point Security Management Servers, using a flaw patched in July 2026. GreyNoise believes the actor used LLMs and agentic systems.

The pattern is the point. None of these sources describes a new attack technique. Every confirmed entry point was a system exposed to the internet. Most had a known fix or a password that should not have worked. MiCollab was the exception: a zero-day, per Accenture.

> **What people assume vs what's true.** People assume AI attacks need AI defenses. What's true: the Swiss and Italian agencies, Microsoft, Accenture and GreyNoise all point to the same basics. Less exposure, faster patching, MFA, least privilege, and logs that live somewhere the attacker cannot edit.

## Am I affected?

- **You run Mitel MiCollab 10.3.0.18 or earlier with AWV reachable from the internet.** Assume you need to investigate, not just patch.
- **You run Check Point Security Management or Multi-Domain Management** reachable from the internet without IP restrictions, and you have not installed the Jul 22, 2026 Jumbo hotfix. Treat this as urgent.
- **You have any internet-facing management console, VPN, webmail or collaboration server** with default or reused passwords. This is the general target class the Swiss NCSC describes.
- **You are an individual.** You are not the direct target of these campaigns. Your employer's exposed systems are, along with the accounts that sign in to them.

## What happened

All times UTC. Dates are when the source says the event happened, not when it was reported.

| Date (UTC) | Event | Source |
|---|---|---|
| Jul 22, 2026 | Check Point ships a Jumbo hotfix for CVE-2026-16232 and notes in-the-wild use against "a handful of customers". CISA adds it to KEV the same day. | Check Point, CISA |
| Jul 2026 | ARTEX is published as open source on GitHub. | Microsoft |
| Oct 2, 2026 | GT13 actor compromises an HFS server it later uses as a relay box. | GreyNoise |
| Oct 17 to Nov 2, 2026 | Confirmed GT13 attack activity against Check Point management servers. | GreyNoise |
| Oct 26, 2026, 02:17 UTC | Bulk certificate task sent to 24 compromised management servers. Outputs show it failed. | GreyNoise |
| Nov 7 to 17, 2026 | MiCollab actor's server talks to two commercial AI APIs for a combined 155 hours. | Accenture |
| Nov 9, 2026 | A second organization's MiCollab server opens a persistent HTTPS channel to the actor's server. | Accenture |
| Nov 15, 2026, before 23:00 UTC | Web shell activity on a MiCollab victim, before any patch exists. | Accenture |
| Nov 16, 2026 | Mitel publishes MISA-2026-0012 and a patch. | Mitel |
| Nov 23, 2026 | GreyNoise publishes the GT13 report. CSIRT Italia publishes bulletin BL01/261123. | GreyNoise, ACN |
| Nov 24, 2026 | The Swiss NCSC confirms first AI-agent attacks. Mitel revises its advisory to 2.0. | NCSC, Mitel |
| Nov 25, 2026 | Microsoft publishes its ARTEX defender guide. CISA adds all five MiCollab CVEs to KEV at 19:48 UTC. | Microsoft, CISA |
| Nov 28, 2026 | KEV due date for four MiCollab CVEs. CVE-2026-133311 is due Dec 9, 2026. | CISA |

## Scope and impact

<div class="stats-bar">

**32 minutes** from first request to a domain controller login at one MiCollab victim (Accenture)

**24 servers** of Check Point management data on the GT13 relay box (GreyNoise)

**About 2x** growth in internet-reachable AI attack agents since October 2026 (Swiss NCSC)

</div>

What each source actually says about scale:

- **Accenture** describes one confirmed MiCollab victim in detail and a second server with a persistent channel to the same actor. Accenture judges this to be part of a broader campaign and expects wider exploitation now that the advisory is public.
- **GreyNoise** counts at least 22 organizations with assets in 17 countries and territories. They span financial services, energy, government, transportation, mining, engineering and manufacturing. GreyNoise expects the campaign is ongoing.
- **The Swiss NCSC** reports attacks across at least two sectors, including critical infrastructure operators. It does not name the sectors.
- **CSIRT Italia** describes "mass compromise campaigns" in Italy. It does not give a count.
- **Microsoft** says many threat actors have abused ARTEX, and names six: Storm-0940, Storm-3358, Onyx Sleet, Pearl Sleet, Crystal Typhoon and Salt Typhoon.

What nobody has confirmed: any victim names, the actor behind the MiCollab or GT13 activity, or any link between those two campaigns and ARTEX.

## Technical breakdown

### The MiCollab chain

Mitel's advisory covers five flaws in the Audio, Web and Video Conferencing (AWV) component. Mitel notes that chaining them "can significantly amplify their impact."

| CVE | Type (Mitel / CWE) | CVSS 3.1 | KEV due |
|---|---|---|---|
| CVE-2026-133323 | Blind command injection / CWE-78 | 10.0 | Nov 28, 2026 |
| CVE-2026-133303 | XML injection / CWE-91 | 9.0 | Nov 28, 2026 |
| CVE-2026-133275 | Arbitrary file upload / CWE-434 | 5.3 | Nov 28, 2026 |
| CVE-2026-133324 | Authentication bypass / CWE-636 | 5.3 | Nov 28, 2026 |
| CVE-2026-133311 | Unauthorized access / CWE-1390 | 5.9 | Dec 9, 2026 |

Accenture's victim timeline, measured from the first observed request:

| Elapsed | What Accenture saw |
|---|---|
| T+1 min | Authentication bypass |
| T+12 min | First web shell command |
| T+30 min | Root on the server; system logs reset |
| T+32 min | MiCollab's stored LDAP connector credentials used against a domain controller |
| T+36 min | Web shell requests filtered out of local logs |
| T+2 h | Multiple domain controllers in just over two minutes; directory export |
| T+20 to 23 h | Backup server and line-of-business database dumped |

The exploitation passed through an internet-facing reverse proxy. Accenture warns that organizations should not assume a proxy protects AWV.

**Why Accenture assesses AI was involved.** There are three timing signals, all from sampled network data:

1. The actor's server resumed traffic to two commercial AI APIs in the same second as the authentication-bypass request, after more than eight hours of silence.
2. For about 2.5 hours, web shell commands kept flowing at the victim with no sampled operator traffic reaching the actor's server.
3. About 10% of the AI API traffic fell in hours with no operator traffic.

Accenture is explicit that it cannot say how the AI services were used.

### ARTEX and its peers

Microsoft describes ARTEX as a multi-agent framework:

- **The planner.** A planner agent reads a knowledge graph of discovered assets and issues short "intents".
- **The workers.** Worker agents carry those intents out with a real shell and standard tools such as nmap and netcat, then write their results back to the graph.
- **The models.** It can run on almost any language model and fail over to another when a key or quota runs out.

Microsoft is blunt that ARTEX "does not introduce new attack techniques" and, by default, does not obfuscate anything.

CSIRT Italia saw four frameworks in real campaigns: ARTEX, CyberStrikeAI, DeepSeek Harness (Red Team) and PentAGI. Its write-up of DeepSeek Harness describes a built-in system prompt that frames attacks as a scored team exercise to get past model guardrails. It also describes a coordinator agent that hands work to five specialist agents.

### Check Point GT13

CVE-2026-16232 is an authentication bypass in the SmartConsole login using an application token. Check Point rates it CVSS 9.3. Check Point says exploitation needs the Management Server reachable from the internet without Trusted Client restrictions.

GreyNoise reports what GT13 did through a Chisel tunnel:

- ran more than 100 management tasks
- copied the firewall database and the internal certificate authority
- minted a new certificate
- unloaded security policies

GreyNoise also saw password spraying with lists themed to the victim, and probes against older Citrix, Ivanti, Exchange, vCenter and Netlogon bugs. Check Point told reporters that both the vulnerability and the Metasploit-derived exploitation method were already public.

## Detection and indicators

These are defanged indicators from the primary sources. Block or hunt them per the source's guidance.

MiCollab actor infrastructure (Accenture; hunt from the dates given in the report):

```
204.76.203[.]204     actor server, hunt from 2026-11-06
204.76.203[.]216     second actor server, hunt from 2026-11-12
204-76-203-204.sslip[.]io
TLS SHA-256: df2184dda5ca97d0c8589640ac1eb9392dfab8cc990f51949099ce757f47397f
```

Check Point July advisory IPs (Check Point):

```
151.241.99[.]207  151.241.99[.]233  158.62.198[.]182
192.142.10[.]99   139.28.37[.]250   194.213.18[.]137
```

ARTEX default user agents (Microsoft; actors change these, so they support a finding rather than prove one):

```
artex-enrich/*
norma/*
```

Behavioral signals that all four primaries point to:

- **Machine-speed bursts.** Many varied requests in a short window, with retries of the same technique, then an immediate jump to the next stage (Microsoft).
- **Web server processes spawning shells.** Watch for new script files in upload directories, and short-lived web shells with incrementing names (Microsoft).
- **Outbound traffic from servers to places they never talk to.** That covers AI platforms, tunnels, webhook services and out-of-band testing domains (CSIRT Italia, Accenture).
- **A service account behaving like a person in a hurry.** MiCollab's LDAP connector authenticated to many domain controllers and requested bursts of RC4 Kerberos tickets (Accenture).
- **Logs that shrink.** Compare local logs with proxy, WAF and gateway logs (Accenture).

## Protect yourself roadmap

### If you're an individual

- Turn on MFA or a passkey for your work email and VPN if your employer offers it. The Swiss NCSC lists this as a core defense.
- Expect convincing follow-on phishing after any breach notice from your employer or a vendor. Verify through a channel you already know.
- If you run a home lab or self-hosted service, take its admin pages off the open internet.

### Small business

- **Find what is exposed.** List every admin page, VPN, phone system and file server reachable from the internet. CISA's free Cyber Hygiene scanning helps eligible US organizations.
- **Patch the exposed list first.** The Swiss NCSC's bar is critical internet-facing fixes within 24 hours.
- **Kill default and reused passwords** on anything exposed. Agents try those first.
- **If you run MiCollab:** apply Mitel's patch or restrict external access to AWV. Ask your Mitel partner to check for compromise, not just version.

### Enterprise

- **MiCollab:**
  - image servers before patching
  - hunt upstream logs from Nov 6, 2026
  - reset the LDAP connector account and any Kerberoastable service accounts
  - review that account on every domain controller
- **Check Point:**
  - install the Jul 22, 2026 Jumbo hotfix
  - restrict Trusted Clients and Management access to trusted IPs
  - review management task history for unexpected scripts, CA exports, certificate creation or policy unloads
  - if the server was exposed, treat its internal CA and stored credentials as compromised
- **Everywhere:**
  - baseline how fast your admin and service identities normally act
  - alert on bursts
  - send logs off-host
  - consider deception (decoys, tarpits, honeytokens), which Microsoft says reduced attack traffic reaching real assets in its testing

### What not to panic about

AI agents are not magic. In GreyNoise's report the actor failed to download its own implant, and its bulk certificate task failed on all 24 servers. Speed is what changed. The doors these attackers used still close the same way.

## Broader context and lessons learned

### Patched is not the same as clean

Mitel shipped a fix on Nov 16, 2026. Accenture's evidence puts a web shell on a victim before that. Patching closes the door, but it does not tell you who already came in. For MiCollab and for Check Point, the job after patching is to look.

### The labels are assessments

The AI part of each story comes with a different level of certainty:

- **Accenture assesses** AI tooling drove parts of the MiCollab intrusion, based on timing.
- **GreyNoise believes** agentic systems were involved, alongside hands-on-keyboard work.
- **The Swiss NCSC** says it confirmed AI-agent use in the cases it knows of.
- **Microsoft** names six actors it has seen integrating ARTEX.

None of these sources ties the MiCollab or Check Point activity to ARTEX or to each other.

### Defenders get the same speed

Microsoft and CSIRT Italia both frame these tools as dual-use. They are the same class of tool penetration testers run. Running one against your own perimeter before someone else does is now a reasonable line item.

## Free tools, trainings, and runbooks

- [CISA Cyber Hygiene Services](https://www.cisa.gov/cyber-hygiene-services): free external vulnerability scanning for eligible US organizations
- [UK NCSC 10 Steps to Cyber Security](https://www.ncsc.gov.uk/collection/10-steps)
- [Microsoft: automatic attack disruption](https://learn.microsoft.com/en-us/defender-xdr/automatic-attack-disruption)
- [MITRE ATT&CK](https://attack.mitre.org/)
- [SigmaHQ detection rules](https://github.com/SigmaHQ/sigma)
- [Accenture APEX Labs MiCollab indicators](https://accenture.github.io/cyber-intelligence/micollab-exploitation/) (full IOC list)

## Sources

### Cited and authoritative

- Mitel, [MISA-2026-0012](https://www.mitel.com/support/security-advisories/mitel-product-security-advisory-misa-2026-0012), Nov 16, 2026, rev 2.0 Nov 24, 2026
- Accenture APEX Labs, [When patch day comes too late](https://accenture.github.io/cyber-intelligence/micollab-exploitation/), Nov 2026
- CISA, [Known Exploited Vulnerabilities catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog?field_cve=CVE-2026-133323), version 2026.11.25
- CVE Program: [CVE-2026-133323](https://www.cve.org/CVERecord?id=CVE-2026-133323), [CVE-2026-133303](https://www.cve.org/CVERecord?id=CVE-2026-133303), [CVE-2026-133275](https://www.cve.org/CVERecord?id=CVE-2026-133275), [CVE-2026-133324](https://www.cve.org/CVERecord?id=CVE-2026-133324), [CVE-2026-133311](https://www.cve.org/CVERecord?id=CVE-2026-133311), [CVE-2026-16232](https://www.cve.org/CVERecord?id=CVE-2026-16232)
- Swiss NCSC, [Cyberattacks involving AI agents: First confirmed cases in Switzerland](https://www.bacs.admin.ch/en/26-ki-agenten-1-en), Nov 24, 2026
- ACN / CSIRT Italia, [BL01/261123/CSIRT-ITA](https://www.acn.gov.it/portale/w/impiego-di-agenti-di-ia-in-campagne-di-compromissione-automatizzate), Nov 23, 2026 (Italian; summaries here are our translation)
- Microsoft Threat Intelligence, [What defenders need to know about ARTEX](https://www.microsoft.com/en-us/security/blog/2026/11/25/what-defenders-need-to-know-artex-agentic-ai-framework-threat-actors-abuse/), Nov 25, 2026
- GreyNoise, [An Active Intrusion Campaign Against Check Point Security Management Servers](https://www.greynoise.io/blog/check-point-security-management-servers-intrusion-campaign), Nov 23, 2026
- Check Point, [July 2026 Security Update](https://blog.checkpoint.com/security/security-advisory-action-required-active-exploitation-of-check-point-smartconsole-authentication-bypass-cve-2026-16232/), Jul 22, 2026

### Research and inspiration

- [SecurityWeek](https://www.securityweek.com/mitel-micollab-zero-days-exploited-in-suspected-ai-assisted-attacks/), [The Layman Security](https://thelaymansecurity.com/mitel-micollab-exploited-cve-2026-133323/), [KyberKit](https://kyberkit.com/en/articles/mitel-micollab-awv-exploited-flaws-misa-2026-0012) on MiCollab
- [The Record](https://therecord.media/microsoft-china-salt-typhoon-using-artex-ai-tool) and Microsoft's earlier ARTEX posts ([Oct 21](https://www.microsoft.com/en-us/security/blog/2026/10/21/storm-0940-uses-artex-agentic-ai-connectwise-supply-chain-compromise/), [Nov 5](https://www.microsoft.com/en-us/security/blog/2026/11/05/threat-actors-use-agentic-ai-tooling-to-find-and-abuse-exposed-secrets/), [Nov 6](https://www.microsoft.com/en-us/security/blog/2026/11/06/artex-abuse-expands-as-cybercriminals-target-financial-sector/))
- [BleepingComputer](https://www.bleepingcomputer.com/news/security/italy-and-switzerland-warn-of-autonomous-ai-driven-cyberattacks/), [Red Tiger Security](https://www.redtigersecurity.com/advisory/italy-switzerland-ai-agent-attacks), [Five Nines](https://www.thefivenines.com/security/italy-and-switzerland-warn-of-autonomous-ai-hacking-agents) on the agency notices
- [BleepingComputer](https://www.bleepingcomputer.com/news/security/hackers-compromise-check-point-servers-in-22-organizations/), [The Hacker News](https://thehackernews.com/2026/11/hackers-compromise-24-check-point.html), [Cybersecurity Dive](https://www.cybersecuritydive.com/news/ai-enabled-campaign-targets-check-point-security-management-servers/875622/), [Rescana](https://www.rescana.com/post/checkpoint-smartconsole-cve-2026-16232-gt13-management-server-intrusions-patch-and-hunt-now) on GT13

## Corrections log

| Date | Change | Reason |
|---|---|---|
| Nov 27, 2026 | Page created | Initial publication |

## About this page

Last updated Nov 27, 2026. Facts were checked against primary sources on Nov 26, 2026. If a source changes, we update this page and log it above.
