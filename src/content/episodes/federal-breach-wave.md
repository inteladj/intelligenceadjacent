---
title: "Four federal breaches, one confirmed: FinCEN, the CIA and ODNI system, NGA and Air Force Cloud One"
date: 2026-11-27
slug: federal-breach-wave
summary: "FinCEN has confirmed unauthorized access to some of its systems. The breach of a CIA and ODNI open-source intelligence system, NGA's involvement, and an intrusion at the Air Force's Cloud One platform are reported by news outlets citing unnamed sources and have not been confirmed by the agencies. No official link between the incidents and no attacker has been named. What is on the record, what isn't, and what defenders can take from it."
youtube: "https://youtu.be/Czqqqj-qfsE"
tags:
  - breaking
  - federal-government
  - fincen
  - cloud-security
  - control-plane
  - osint
  - incident-response
cve: []
episode: "IA-006"
severity: High
status: under investigation
pillar: Incidents
updated: 2026-11-27
draft: false
corrections:
  - date: 2026-11-27
    change: "Update: Air Force Cloud One is now reported by Reuters and confirmed by a US official to NBC News (published Nov 27, 2026, 15:28 UTC). The Air Force still does not comment. No timing, scope, attribution or link to the other incidents has been confirmed. The Air Force has not confirmed it on the record."
    reason: "New reporting. Source: NBC News, https://www.nbcnews.com/news/us-news/hackers-attack-penetrate-air-forces-computing-platform-rcna611559"
  - date: 2026-11-27
    change: "NGA is now reported by two outlets, not one. CNN's updated English report (Nov 25, 2026, 20:40 UTC) says two of its sources said a Defense Department agency was affected and one named NGA; a Defense Department official declined to comment. Removed the claims that no second outlet had its own sourcing and that CNN's report did not mention NGA. Corrected the CNN timeline entry: the English report was first posted Nov 24, 2026, 21:53 UTC, and 02:50 UTC on Nov 25 was the Spanish edition. NGA remains unconfirmed. Re-checked Nov 27, 2026, 15:33 UTC: no official statement from NGA, the CIA, ODNI, the Air Force or FinCEN changes any status."
    reason: "We had read CNN's Spanish edition, which does not include the NGA line. Source: CNN via CBS 58, https://cbs58.com/news/cia-hit-by-hack-impacting-unclassified-information"
  - date: 2026-11-27
    change: Page created
    reason: Initial publication
---

## Four breaches in the headlines, one confirmed

Since Nov 24, 2026, four federal breaches have made headlines: the Treasury Department's Financial Crimes Enforcement Network (FinCEN), an open-source intelligence system used by the CIA and the Office of the Director of National Intelligence (ODNI), the National Geospatial-Intelligence Agency (NGA), and the Air Force's flagship Cloud One computing platform. Only one of the four, FinCEN, has been confirmed by the agency that runs it. The other three rest on reporting by news organizations that cite people who were not named.

This page keeps those two kinds of claims apart. **Confirmed** means the affected organization said it on the record. **Reported** means journalists heard it from unnamed sources and the organization has not confirmed it. Reported doesn't mean wrong. It means a different level of certainty, and every item below carries a label.

Two things are not on the record at all. No official source has linked these incidents to each other, and no government has named an attacker for any of them. Some coverage repeats anonymous guesses about who is responsible. This page doesn't.

> **AI disclosure:** This page and the companion video were prepared with AI-assisted research and drafting. A human reviewed every claim, link and recommendation. The video narration uses a synthetic voice.

## Timeline (UTC)

| When (UTC) | What | Status | Source |
| --- | --- | --- | --- |
| Nov 18, 2026 | Start of FinCEN's deadline relief window. The order covers filings otherwise due from this date. It does not say the attack started then. | Confirmed (filing date only) | FinCEN Order FIN-2026-R002 |
| Nov 24, 2026 | FinCEN issues Order FIN-2026-R002, moving some filing deadlines to Dec 30, 2026, because of a "service disruption" | Confirmed | FinCEN |
| Nov 24, 2026 | The New York Times reports a breach of an open-source intelligence system affecting the CIA and at least two other spy agencies, including ODNI and NGA | Reported | NYT, followed by CNN, WaPo, AP, Nextgov, CyberScoop |
| Nov 24, 2026, 21:53 | CNN reports the CIA and ODNI incident with four sources and an on-record ODNI line (time as posted on the syndicated copy; Spanish edition followed Nov 25, 02:50) | Reported | CNN |
| Before Nov 25, 2026, 01:00 | FinCEN posts an alert on its BSA E-Filing site confirming unauthorized access to "a limited subset of its systems" | Confirmed | FinCEN; first reported by The Verge at 01:00 |
| Nov 25, 2026 | Federal Reserve, FDIC, NCUA and OCC staffs say they won't penalize late Bank Secrecy Act filings caused by the disruption | Confirmed | Joint statement |
| Nov 25, 2026, 20:40 | CNN updates its report: two of its sources say a Defense Department agency was also affected, and one names NGA. A Defense Department official declines to comment. | Reported | CNN |
| Within about a month before Nov 27, 2026 | Intrusion at Air Force Cloud One discovered during upgrade work, per two people | Reported | Reuters |
| Nov 27, 2026, about 11:00 | Reuters publishes its Cloud One exclusive | Reported | Reuters |
| Nov 27, 2026, 12:40 | FinCEN alert still live; no CISA advisory on any of the four incidents | Checked | FinCEN, CISA |
| Nov 27, 2026, 15:28 | NBC News reports that a US official confirmed the Cloud One hack, without details on timing or impact. The Air Force again declines to comment on specific systems. | Reported; confirmed by a US official | NBC News |

## Scope: what each agency has and hasn't said

| 1 of 4 | Dec 30, 2026 | 0 |
| --- | --- | --- |
| incidents confirmed by the agency itself | new deadline for affected FinCEN filers | attackers officially named, and 0 official links between the incidents |

| Incident | Status | On the record | Not known |
| --- | --- | --- | --- |
| FinCEN | **Confirmed** | Alert, relief order, spokesperson | Attacker, entry point, start date, data touched, restoration date |
| CIA and ODNI open-source intelligence system | **Reported** | ODNI official: no disruptions to critical capabilities or classified systems. CIA declined to comment. | Scope, timing, data, attacker; whether resolved (sources disagree) |
| NGA | **Reported** (two outlets) | NGA did not respond to the NYT. A Defense Department official told CNN the department does not comment on the status of its networks or systems. | Everything beyond what two NYT sources and one CNN source said: what NGA data or systems were involved, and when |
| Air Force Cloud One | **Reported** by Reuters; confirmed by a US official to NBC News | Air Force declined to comment on specific systems | Timing, vulnerability, attacker, how far they got, whether data was stolen, any link to the other incidents |

## What's known, incident by incident

### FinCEN (confirmed)

FinCEN is the Treasury bureau that receives suspicious activity reports and other Bank Secrecy Act (BSA) filings from financial institutions and shares that financial intelligence with law enforcement. Its alert, still on the BSA E-Filing site on Nov 27, 2026, reads in part: "FinCEN is investigating a cybersecurity incident that resulted in unauthorized access to a limited subset of its systems. As a proactive measure, FinCEN has taken some systems offline." The site stays up, though "some services may be temporarily unavailable."

Order FIN-2026-R002 gives relief to institutions that used Secure Data Transfer Mode (SDTM) as of Nov 18, 2026, and to certain beneficial ownership filers and FinCEN ID updates. Anything they owed between Nov 18 and Dec 29, 2026 is now due by Dec 30, 2026. The bank regulators' joint statement backs this up. Both documents describe a "service disruption." Neither mentions the intrusion or names a cause, so the Nov 18 date should not be read as the start of the attack.

A FinCEN spokesperson told The Record that the FBI and CISA are involved, and that investigators currently see no evidence of a breach of the BSA or beneficial ownership databases. Reuters attributes the same assessment to a person familiar with the matter rather than to FinCEN. Either way, it is an interim view. FinCEN has not said who was responsible, how they got in, when it started, or what they reached.

### The CIA and ODNI open-source intelligence system (reported)

The New York Times reported on Nov 24, 2026 that the CIA and at least two other spy agencies had discovered a breach of an open-source intelligence analysis system. Systems like this analyze public and commercially available material: news, social media, satellite imagery and data bought from vendors. CNN (four sources), The Washington Post, the Associated Press, Nextgov/FCW and CyberScoop followed, each with sources who were not named.

The only on-record statement came from an ODNI official, who told CNN and the NYT there had been no disruptions to critical capabilities or classified systems. That line neither confirms nor denies a breach. The CIA declined to comment. According to the anonymous sources, the exposed data was unclassified and classified material wasn't affected. One source told the NYT, Nextgov and AP that the issue was resolved. CNN's sources said it wasn't immediately clear when the hack happened or whether it had been resolved.

### NGA (reported, two outlets)

The NYT reported that NGA was also affected, according to two of its sources. NGA did not respond to the NYT. CNN updated its report on Nov 25, 2026 at 20:40 UTC: two of its sources said a Defense Department agency was also affected, and one of them identified it as NGA. Asked about NGA, a Defense Department official told CNN that "as a matter of policy, the Department does not comment on the status of its networks or systems." That is not a confirmation or a denial. NGA is now reported by two outlets with their own sources, and it is still unconfirmed. It remains the least detailed item on this page: neither outlet says what NGA data or systems were involved, or when.

### Air Force Cloud One (reported; confirmed by a US official to NBC News)

> **Update (Nov 27, 2026):** At 15:28 UTC, NBC News reported that a US official confirmed the hack of Cloud One. The official gave no details on timing or impact. The Air Force still does not comment on specific networks and systems. Nothing about timing, scope, attribution or a link to the other incidents has been confirmed. ([NBC News](https://www.nbcnews.com/news/us-news/hackers-attack-penetrate-air-forces-computing-platform-rcna611559))

Reuters reported at about 11:00 UTC on Nov 27, 2026 that hackers had breached Cloud One, citing three people familiar with the matter (five anonymous sources in total contributed details). Per Reuters, Cloud One started in 2017 and combines cloud resources from Microsoft, Amazon, Oracle and Alphabet. It runs applications for personnel, pay, logistics and maintenance, including a command and control system that collates air defense radar feeds and a system that tracks munitions across more than 200 Air Force locations.

The intrusion was discovered "within the past month or so" during upgrade work, two sources said. One source said the attackers exploited a software vulnerability to reach the control plane, and compared that access to a universal remote. Reuters could not identify the vulnerability, the attacker, the scope, or whether data was stolen. Per Reuters' sources, Cyber Command was called in to assess the damage, back-office migrations were paused, updates to running applications were blocked and some users lost admin rights. The Air Force told Reuters it "does not comment on the security posture, vulnerabilities or operational status of specific networks and systems." No CVE has been tied to this report.

## Detection and response: what the record supports

Not much detection detail is public for any of the four. There are no indicators, no CVE and no advisory. CISA had published nothing on these incidents when checked on Nov 27, 2026. So this section separates what the record supports from general practice.

Supported by the record:

- **Control-plane access is the reported pivot at Cloud One.** If the reporting holds, the attacker didn't need a single application. They needed the layer that manages all of them.
- **Freezes have a cost.** Per Reuters, blocking updates during the investigation left personnel unable to apply fixes as new serious vulnerabilities were being disclosed.
- **Query data is sensitive even when the source data is public.** The experts quoted by Nextgov and CyberScoop say intrusion into an analytic system can reveal what analysts look for, and so their priorities and gaps.

General practice (not from these incidents' sources): log every control-plane API call to a store administrators can't modify; alert on new admin roles, new access keys, new federation or trust relationships, and disabled logging; review who can reach management interfaces from the internet.

## Roadmap by audience

The contrast that matters here: **a confirmed incident needs action, a reported one needs readiness.**

**Individuals**
- Nothing on the record says personal financial data was taken from FinCEN. FinCEN's interim view is that there's no evidence its core databases were breached.
- Expect phishing that name-drops FinCEN, the Treasury or your bank. Verify through a channel you already know, not a link in the message. (General advice.)

**Financial institutions that file with FinCEN** (sourced from the order and the regulators' statement)
- Check whether you're covered by Order FIN-2026-R002, and file by Dec 30, 2026.
- Keep transaction monitoring going; the order doesn't pause it.
- Document delayed submissions and the dates you tried to file.
- Use the Financial Institutions Hotline (1-866-556-3974) for anything urgent. FinCEN says it's not affected.

**Cloud and platform teams** (my recommendations, not from the sources)
- Treat the control plane as your most sensitive system. Require phishing-resistant MFA and separate admin identities.
- Grant admin rights just in time, and make them expire.
- Send control-plane audit logs somewhere the admin plane can't delete them.
- Patch the management layer first, and keep a list of every management interface reachable from the internet.
- Write down how you'll ship an urgent security fix while an investigation freezes changes: a clean build path and a break-glass change process.

**Teams that run analytic or research platforms** (my recommendation)
- Classify search history, watchlists and saved queries as sensitive data, with access controls and logging to match, even when the underlying data is public.

## Context: one campaign or several?

The record doesn't support calling this one campaign. The Verge said it was unclear whether FinCEN's incident was related to the spy-agency reports. CNN's sources said the intelligence system breach did not appear related to a separate FBI incident. Reuters counts at least six other recently disclosed federal incidents. A cluster of disclosures is a pattern in the news. It isn't evidence of a single actor, and disclosure dates say little about when intrusions began.

What the four do have in common is structural. Each is a large shared service: FinCEN takes filings from financial institutions nationwide, the intelligence system faces the open internet by design, and Cloud One serves an entire military branch. When a shared service is compromised or taken offline, everyone downstream feels it. That lesson holds whoever turns out to be responsible.

Questions that would change this page:

- **FinCEN:** which systems were reached, how, since when, and whether the Nov 18 filing disruption and the intrusion share a cause.
- **The intelligence system:** an on-record confirmation from the CIA or ODNI, what data was exposed, and whether the issue is resolved.
- **NGA:** a statement from NGA or the Defense Department, and what NGA data or systems were involved.
- **Cloud One:** an on-record Air Force or Defense Department confirmation (the NBC News confirmation came from a US official who was not named), the vulnerability involved, the discovery date, and whether data left the platform.
- **All four:** any official attribution, any official link between them, and any CISA advisory with indicators defenders can use.

If any of these get answered, this page is updated first and the change is logged below with a UTC timestamp.

## Resources

- FinCEN BSA E-Filing alert: https://bsaefiling.fincen.gov/main.html
- FinCEN Order FIN-2026-R002 (PDF): https://www.fincen.gov/sites/default/files/100/ORDER-FIN-2026-R002.pdf
- Joint Statement of Supervisory Policy (FDIC): https://www.fdic.gov/news/financial-institution-letters/2026/joint-statement-supervisory-policy-bank-secrecy-act
- OCC Bulletin 2026-59: https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-59.html
- CISA cybersecurity advisories: https://www.cisa.gov/news-events/cybersecurity-advisories

## Sources

1. FinCEN, BSA E-Filing System alert, "ALERT: Service Disruption" (rendered Nov 27, 2026, 12:40 UTC). https://bsaefiling.fincen.gov/main.html
2. FinCEN, Order FIN-2026-R002 (Nov 24, 2026). https://www.fincen.gov/sites/default/files/100/ORDER-FIN-2026-R002.pdf
3. Federal Reserve, FDIC, NCUA and OCC, "Joint Statement of Supervisory Policy for Bank Secrecy Act Reporting in Response to a Service Disruption" (Nov 25, 2026). https://www.fdic.gov/news/financial-institution-letters/2026/joint-statement-supervisory-policy-bank-secrecy-act
4. Reuters, "Hackers breach US Air Force flagship Cloud One computing platform" (Nov 27, 2026). https://www.reuters.com/world/hackers-breach-us-air-force-flagship-cloud-one-computing-platform-2026-11-27/ (syndicated text: https://www.channelnewsasia.com/world/hackers-breach-us-air-force-cloud-one-computing-platform-6587501)
5. The New York Times, "US spy agencies suffer breach of unclassified data" (Nov 24, 2026; syndicated text read Nov 27, 2026). https://mobileapp.bostonglobe.com/11262026_a74161b8-e925-11f1-ac71-b3bf3d056470/content.html
6. CNN, "CIA hit by hack impacting unclassified information" (first posted Nov 24, 2026, 21:53 UTC; updated Nov 25, 2026, 20:40 UTC; syndicated by CBS 58). https://cbs58.com/news/cia-hit-by-hack-impacting-unclassified-information . Spanish edition (Nov 25, 2026, 02:50 UTC, translation ours; does not include the NGA line): https://cnnespanol.cnn.com/2026/11/24/eeuu/cia-ciberataque-informacion-no-clasificada-trax
7. Nextgov/FCW, "CIA, ODNI unclassified intelligence system hacked" (Nov 24, 2026). https://www.nextgov.com/cybersecurity/2026/11/cia-odni-unclassified-intelligence-system-hacked/417438/
8. The Record, "Treasury's FinCEN takes systems offline after cybersecurity incident" (Nov 25, 2026). https://therecord.media/treasury-fincen-takes-systems-offline-after-cyber-incident
9. CyberScoop, "Unclassified intel system hit by hackers, affecting CIA, ODNI" (Nov 24, 2026). https://cyberscoop.com/cia-odni-osint-data-breach/
10. Associated Press, "An unclassified CIA system was breached in a cyberattack, AP source says" (Nov 24, 2026). https://apnews.com/article/cia-cyberattack-unclassified-system-bfa6d3b02e3b0e2779dfb613c900bd77
11. The Verge, "US financial crimes bureau discloses 'cybersecurity incident'" (Nov 25, 2026, 01:00 UTC). https://www.theverge.com/policy/1041957/fincen-treasury-cybersecurity-incident
12. CISA, news and cybersecurity advisories listings (checked Nov 27, 2026, 12:50 UTC). https://www.cisa.gov/news-events/cybersecurity-advisories
13. NBC News, "Hackers attack and penetrate Air Force's computing platform" (Nov 27, 2026, 15:28 UTC). https://www.nbcnews.com/news/us-news/hackers-attack-penetrate-air-forces-computing-platform-rcna611559

## Corrections log

| Date | Change | Reason |
|---|---|---|
| Nov 27, 2026 | Update: Air Force Cloud One is now reported by Reuters and confirmed by a US official to NBC News (Nov 27, 2026, 15:28 UTC). The Air Force still does not comment. No timing, scope, attribution or link to the other incidents has been confirmed. | New reporting ([source](https://www.nbcnews.com/news/us-news/hackers-attack-penetrate-air-forces-computing-platform-rcna611559)) |
| Nov 27, 2026 | NGA is now reported by two outlets, not one. CNN's updated English report (Nov 25, 2026, 20:40 UTC) says two of its sources said a Defense Department agency was affected and one named NGA; a Defense Department official declined to comment. Removed the claims that no second outlet had its own sourcing and that CNN's report did not mention NGA. Corrected the CNN timeline entry (English report first posted Nov 24, 2026, 21:53 UTC; 02:50 UTC on Nov 25 was the Spanish edition). NGA remains unconfirmed. Re-checked Nov 27, 2026, 15:33 UTC: no official status change. | We had read CNN's Spanish edition, which does not include the NGA line ([source](https://cbs58.com/news/cia-hit-by-hack-impacting-unclassified-information)) |
| Nov 27, 2026 | Page created. Status of every item as of Nov 27, 2026, 12:50 UTC; re-checked 13:50 UTC, unchanged. | Initial publication |

## About this page

Last updated Nov 27, 2026. Facts were checked against primary sources on Nov 27, 2026, last at 15:33 UTC; Cloud One re-checked against NBC News at 17:29 UTC. If a source changes, we update this page and log it above.
