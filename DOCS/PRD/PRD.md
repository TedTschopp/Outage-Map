# Product Requirements Document (PRD)

## Document Information & Revision History

**Project/Product Name:** Outage Map Website
**Subtitle/Description:** Customer-tailorable outage map experience for real-time and proactive outage awareness
**Document Version:** v1.0 (Draft)
**Date:** TBD (Q-21)
**Author/Owner:** Grant Littman
**Status:** Draft
**Approvals/Sign-offs:** Executive Sponsor – Chief Customer Officer (CCO)

### Source Document Index

| Doc Label | Attachment Name / Title | Version/Date | Notes |
| --------- | ----------------------- | ------------ | ----- |
| Doc-1     | TBD                     | TBD          | TBD   |

### Revision History

| Version | Date | Author        | Summary of Changes |
| ------: | ---- | ------------- | ------------------ |
|    v1.0 | TBD  | Grant Littman | Initial draft      |

---

## Executive Summary

### Problem / Opportunity

* Customers do not want a generic outage map; they want a **tailorable, location-aware outage experience** accessible instantly on mobile devices.
* Call center volume increases during outages due to customers seeking localized, real-time information.
* There is an opportunity to improve customer satisfaction and reduce call center demand **without increasing the digital channels budget**.

### Target Users

* Primary: Customers (residential and small commercial)
* Environment: iOS, Android, and Web; mobile-first usage with geolocation

### Proposed Solution

* A customer-facing Outage Map Website that:

  * Launches with a single action (push of a button) on mobile devices
  * Automatically centers on the customer’s current location
  * Detects whether the location is under an active outage
  * Allows customers to opt into real-time outage updates for their location
  * Allows proactive notifications for future outages at the location (12, 24, 36, 48, or 72 hours)
* OMS remains the system of record for outage data; ArcGIS Online provides mapping.

### Leading Indicators (first 30–90 days)

| Indicator                        | Baseline   | Target            | Measurement Window | Data Source         | Owner           |
| -------------------------------- | ---------- | ----------------- | ------------------ | ------------------- | --------------- |
| Mobile outage map launches       | TBD (Q-06) | +30% vs prior map | 30 days            | Web analytics       | Digital Product |
| Opt-in to outage notifications   | TBD (Q-06) | ≥25% of users     | 60 days            | App analytics       | Digital Product |
| Call center outage-related calls | TBD (Q-06) | −10%              | 90 days            | Call center reports | Customer Ops    |

### Success Metrics (Outcomes)

| Outcome KPI                            | Baseline   | Target      | Timeframe | Data Source  | Owner             |
| -------------------------------------- | ---------- | ----------- | --------- | ------------ | ----------------- |
| Customer satisfaction with outage info | TBD (Q-06) | +10 pts     | 6 months  | CSAT surveys | CCO               |
| Outage-related call volume             | TBD (Q-06) | −20%        | 6 months  | Call center  | Customer Ops      |
| Digital channel cost                   | Current    | No increase | Ongoing   | Finance      | Digital Portfolio |

### Scope Summary

* In scope: Mobile/web outage map, location detection, outage detection, opt-in notifications, multilingual support, WCAG AA.
* Not included: OMS reporting, audits, data retention, internal operational tools.

---

## Project Background & Overview

### Background

Customers increasingly rely on mobile devices for real-time information. During outages, existing outage maps are perceived as generic and insufficiently personalized, resulting in increased call center volume and reduced customer satisfaction.

### Overview

The Outage Map Website provides a **customer-tailorable, location-aware outage experience** that surfaces relevant outage information instantly and enables customers to receive proactive updates for locations they care about.

### Strategic Alignment

* Improves customer experience during outages
* Reduces operational load on call centers
* Aligns with digital-first customer engagement without increasing spend

---

## Objectives & Success Metrics

| Objective ID | Objective Statement                                    | Rationale                                | Primary KPI(s) | Baseline   | Target      | Timeframe | Owner             | Data Source |
| ------------ | ------------------------------------------------------ | ---------------------------------------- | -------------- | ---------- | ----------- | --------- | ----------------- | ----------- |
| OBJ-001      | Increase customer satisfaction with outage information | Personalized, timely info improves trust | CSAT score     | TBD (Q-06) | +10 pts     | 6 months  | CCO               | Surveys     |
| OBJ-002      | Decrease call center volume for outage inquiries       | Self-service reduces calls               | Call volume    | TBD (Q-06) | −20%        | 6 months  | Customer Ops      | Call logs   |
| OBJ-003      | Deliver enhancements without increasing digital budget | Cost discipline                          | Digital spend  | Current    | No increase | Ongoing   | Digital Portfolio | Finance     |

---

## Scope of Work

### In Scope

* One-tap launch of outage map on mobile devices
* Automatic location detection and map zoom
* Detection of active outages at current location
* Customer opt-in to real-time outage updates
* Proactive outage notifications (12/24/36/48/72 hours)
* iOS, Android, and Web support
* Multilanguage support based on OS language
* WCAG 2.1 AA accessibility compliance

### Out of Scope

* Outage data creation or modification
* Data retention and auditing
* Internal OMS workflows
* Call center tooling

---

## Release Plan / Phasing

### Release Approach

* Pilot-first with limited audience
* Full customer rollout (“big bang”) after pilot success

| Phase | Goal                            | Users                   | Included Capabilities                       | Exit Criteria                      | Not Included       |
| ----- | ------------------------------- | ----------------------- | ------------------------------------------- | ---------------------------------- | ------------------ |
| Pilot | Validate usability and security | Limited customer cohort | Core map, location detection, notifications | No Sev-1 issues; security sign-off | Marketing campaign |
| GA    | Full customer availability      | All customers           | Pilot + scaling and monitoring              | Performance and security validated | New features       |

---

## Out of Scope / Anti-Goals / Future Ideas

| Item                        | Category     | Rationale                  | Revisit Trigger | Owner           |
| --------------------------- | ------------ | -------------------------- | --------------- | --------------- |
| OMS reporting               | Anti-Goal    | OMS remains SoR            | Strategy change | Sponsor         |
| Data retention              | Out of Scope | Owned by OMS               | Policy change   | IT              |
| Predictive outage analytics | Future Idea  | Requires analytics program | New funding     | Digital Product |

---

## Stakeholders

* **Author / Functional Owner:** Grant Littman
* **Executive Sponsor:** Chief Customer Officer (CCO)
* **Cyber Security Team:** Security controls and approvals
* **IT Front Office Portfolio Team:** Technical controls and architecture
* **Customer Operations:** Call center impact and metrics
* **Marketing:** Multichannel customer communications

---

## Operating Environment & Technical Constraints

* Platforms: iOS, Android, Web
* Frontend: ReactJS
* Hosting: Azure
* Integrations:

  * Outage Management System (SoR)
  * ArcGIS Online (mapping)
* Accessibility: WCAG 2.1 AA
* Language: Auto-detect from OS

---

## User Personas

### Customer (Primary)

* Uses mobile device to check outage status
* Wants instant, relevant information
* Values proactive updates without effort

---

## User Scenarios & Use Cases

### User Scenarios

#### SCN-001 — Launch Outage Map (Persona: Customer)

* Related Objective IDs: OBJ-001, OBJ-002
* Trigger/Context: Customer opens outage map on mobile device
* Main Flow:

  * Launches map with one action
  * Map centers on current location
* Outcome: Immediate visibility into local outage status
* Acceptance Criteria:

  * Given the user launches the app, when the map loads, then it centers on the user’s location.

#### SCN-002 — Active Outage Opt-In

* Related Objective IDs: OBJ-001
* Trigger/Context: Location under active outage
* Outcome: Customer receives real-time updates
* Acceptance Criteria:

  * Given an active outage, when detected, then the user is prompted to opt into updates.

#### SCN-003 — Proactive Monitoring

* Related Objective IDs: OBJ-002
* Trigger/Context: No active outage
* Outcome: Customer opts into future outage alerts
* Acceptance Criteria:

  * Given no outage, when prompted, then the user can select 12/24/36/48/72 hours.

---

## Functional Requirements & Features

| ID     | Requirement                      | Priority | Related Objective IDs | Related Scenario IDs | Acceptance Criteria     | Source |
| ------ | -------------------------------- | -------- | --------------------- | -------------------- | ----------------------- | ------ |
| FR-001 | One-tap launch of outage map     | Must     | OBJ-001               | SCN-001              | Map loads in ≤3s        | TBD    |
| FR-002 | Auto-detect user location        | Must     | OBJ-001               | SCN-001              | Map centers on location | TBD    |
| FR-003 | Detect active outage at location | Must     | OBJ-001               | SCN-002              | Prompt displayed        | OMS    |
| FR-004 | Opt-in to outage notifications   | Must     | OBJ-001               | SCN-002              | Subscription stored     | OMS    |
| FR-005 | Future outage monitoring options | Should   | OBJ-002               | SCN-003              | Time window selectable  | OMS    |

---

## UI / UX Design Specifications

* Mobile-first, minimal interaction
* Large, touch-friendly controls
* Clear outage/no-outage states
* Multilingual labels via OS language
* WCAG 2.1 AA contrast and navigation

---

## Data Management & Governance

| ID     | Requirement                      | Priority | Related Objective IDs | Related Scenario IDs | Acceptance Criteria  | Source |
| ------ | -------------------------------- | -------- | --------------------- | -------------------- | -------------------- | ------ |
| DG-001 | All outage data sourced from OMS | Must     | OBJ-003               | SCN-002              | No local persistence | OMS    |

---

## Security & Compliance Requirements

| ID      | Requirement                       | Priority | Related Objective IDs | Related Scenario IDs | Acceptance Criteria        | Source   |
| ------- | --------------------------------- | -------- | --------------------- | -------------------- | -------------------------- | -------- |
| SEC-001 | CCPA compliance for customer data | Must     | OBJ-001               | SCN-001              | Privacy controls enforced  | Policy   |
| SEC-002 | Prevent misuse by bad actors      | Must     | OBJ-002               | SCN-001              | Rate limiting, obfuscation | Security |

---

## Non-Functional Requirements / Quality Attributes

* Performance: Map loads ≤3s on mobile
* Availability: 99.9%
* Security: TLS 1.2+, WAF, rate limiting
* Accessibility: WCAG 2.1 AA
* Scalability: Supports outage spikes

---

## Traceability Matrix

### Objective → Scenario → Requirement Mapping

| Objective ID | Objective                      | Scenario IDs     | Requirement IDs        | Notes |
| ------------ | ------------------------------ | ---------------- | ---------------------- | ----- |
| OBJ-001      | Increase customer satisfaction | SCN-001, SCN-002 | FR-001–FR-004, SEC-001 | —     |
| OBJ-002      | Decrease call volume           | SCN-003          | FR-005, SEC-002        | —     |
| OBJ-003      | No budget increase             | SCN-001          | DG-001                 | —     |

### Orphans

* Scenarios with no Objective: None
* Requirements with no Objective: None

---

## Product Architecture Overview

* ReactJS frontend hosted in Azure
* Integration with OMS APIs and ArcGIS Online
* WAF + API throttling
* No data persistence beyond session state

---

## Assumptions & Dependencies

### Assumptions

* Customers allow location access
* OMS data is accurate and timely

### Dependencies

* OMS availability and API performance
* ArcGIS Online uptime
* Marketing rollout execution

---

## Risks & Mitigations

* **Risk:** Bad actors monitoring outages
  **Mitigation:** Rate limiting, delayed precision, anomaly detection
* **Risk:** Low adoption
  **Mitigation:** Multichannel marketing and simple UX

---

## Open Questions / Issues Log

| Q-ID | PRD Section   | Question / Issue              | Owner                  | Needed-by | Status | Notes      |
| ---- | ------------- | ----------------------------- | ---------------------- | --------- | ------ | ---------- |
| Q-06 | Metrics       | No baseline metrics available | TBD (Assign in review) | TBD       | OPEN   | User input |
| Q-21 | Document Info | Confirm document date         | TBD (Assign in review) | TBD       | OPEN   | —          |

---

## Supporting Materials

### Appendix & References

* Outage Management System documentation
* ArcGIS Online integration guides
* CCPA policy documentation
* WCAG 2.1 AA standards
