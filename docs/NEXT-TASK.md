# NEXT TASK — For Muse

**Priority: DOCS ONLY. No code work.**

## Task 1: Paste Crew Loyalty into GDD Section 8

Open the Crew Loyalty draft in Google Drive:
https://docs.google.com/document/d/1YNT-ONI1sgxJ2xai75tZC1oHeCibzUL02tgRDAeObPU/edit

Paste the Section 8 replacement text below into the Game Design Document, replacing the current short Section 8. Bump the GDD version number.

### Section 8 – Crew and Loyalty (replacement text)

Named crew are hired at ports. Each has a personality, skills, and a Loyalty value (0–100). Crew run vessels and automated work, and are required to operate fitted gear. Loyalty is stored and tuned entirely in data files.

Loyalty rises with fair or generous pay, shared wins, on-time wages, and cutting crew in on profit. It falls with unpaid wages, reckless risks, long hot-cargo runs without an extra cut, and being ignored or insulted.

**Thresholds**
- 70–100 (Loyal): full gear performance; small chance of bonus help (extra repair, tip, refuse a bribe).
- 40–69 (Steady): normal performance.
- 15–39 (Uneasy): gear ~10% slower or less effective; occasional minor theft or grumbling.
- 0–14 (Hostile): gear heavily penalized; high chance of desertion or a one-time betrayal (selling information to Silvio or a rival), then they leave permanently.

The Crew Loyalty skill (Command group) reduces the size of negative changes and slightly increases positive ones. Loyalty shifts are logged in the Captain's Log with a short line. Crew can be fired at any time; high-loyalty crew may demand a small severance.

Chispa uses the same system as every other crew member. His starting loyalty is set by the first-session pay choice. He is slightly more sensitive to long Dragon Blow runs (higher loss multiplier in data). If he reaches Hostile he can take a one-time bribe and leave; there is no unique permanent traitor path for him.

All gain/loss amounts, thresholds, and multipliers live in data files so they can be balanced without touching code.

## Task 2: Resolve Chispa open question in Story Bible

In the Story Bible, mark the Chispa long-term loyalty open question as **RESOLVED** with this note:

> Chispa uses the same loyalty system as all crew. Starting loyalty set by first-session pay choice (generous 65 / fair 50 / cheap 35). Slightly more sensitive to long Dragon Blow runs. If Hostile: starts forgetting repairs, then takes a one-time bribe from Silvio and leaves permanently. No unique traitor path.

## Task 3: Add first-session crew roles

Add to Section 8 (or as a subsection). Only three roles are active for the first 15 minutes. All others are later roles.

**Engineer (Chispa's starting role)**
- Primary: repairs and maintains gear; patches hull damage.
- Loyal (70–100): faster repairs; small chance to restore a damaged fitting mid-fight.
- Steady (40–69): normal repairs.
- Uneasy (15–39): slower repairs; chance a repair fails.
- Hostile (0–14): may sabotage a fitting or abandon a repair, then leave.

**Pilot**
- Primary: steers the vessel, manages altitude and wind.
- Loyal: +5% speed in favorable wind; smoother altitude changes.
- Steady: normal handling.
- Uneasy: –5% speed; occasional delayed response.
- Hostile: may refuse a risky climb or dive, then leave.

**General Crew**
- Can fill any open slot when no specialist is present.
- Uses base loyalty thresholds only. No role-specific bonuses or penalties.

**Later roles (not in first session):** Gunner, Lookout, Quartermaster, Dragon Handler. Added after the first 15 minutes are playable and tested. Same pattern, data-driven.

## Shared rules
- Gear performance uses the lowest loyalty of any crew required to run that gear.
- A Hostile crew member can trigger one role-tied betrayal.
- Role-specific lines appear in the Captain's Log when loyalty crosses a threshold.
- All numbers live in `src/data/loyalty.json` and `src/data/crew_roles.json`. No hard-coded values.

## Rules
- Design doc + Story Bible + GitHub are the only source of truth.
- Do not start code work. Docs only.
- If a doc link fails, say so in your comment instead of guessing.

## Done when
- GDD Section 8 contains the full loyalty text.
- Story Bible Chispa question is no longer OPEN.
- Three roles are listed; later roles are marked.
- Comment on this file's commit or open a GitHub issue noting completion.
