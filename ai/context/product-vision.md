# Product Vision — betivi

**Version:** 0.1  
**Date:** May 2025  
**Source:** betivi-product-vision.md (ANBR Internal)

---

## What We Are Building

betivi.ro is a community platform for alcohol drinkers in Romania built around three concrete things: **discovery** (find good places), **memory** (remember what you drank), and **identity** (belong to a community with a sense of humor).

The tone is playful, but the utility is real. It is not a lifestyle app with Instagram filters, not a disguised advertisement, not a discount aggregator. It is the place where the Romanian who knows what they drink comes to find, log, and share.

---

## The Problem We Solve

A Romanian who wants to discover a good pub in another city has nowhere to look seriously. TripAdvisor is for tourists. Google Maps is okay but lacks context. Facebook groups are chaos. Untappd is in English and completely ignores the Romanian context: beers from PET bottles, unmarked local pubs, attic-distilled palincă, small wineries in Oltenia.

Romanian craft beer and wine are growing rapidly, but there is no place where the community can document and recommend them to each other.

---

## Target Users

**Primary:** Romanians aged 25–45 who drink thoughtfully, discover new places, appreciate craft beer or local wine, and have a sense of humor.

**Secondary:** Tourists and expats who want to find authentic, non-tourist venues.

**Tertiary:** Small producers (craft breweries, wineries) who want organic visibility without paying for ads.

---

## Success Looks Like

- New user can complete registration and post their first review within 3 minutes of landing on the site
- At least 50 venues listed at launch across 3+ Romanian cities (Cluj, București, Iași)
- Venue detail pages load in under 2 seconds on a 4G mobile connection (Lighthouse)
- Users can search for a venue by name or city and see results within 500ms
- Each registered user can submit a venue review with a rating and text in under 60 seconds
- Zero critical security vulnerabilities in Supabase RLS policies at launch (manual audit)
- Mobile-responsive layout renders correctly on iOS Safari and Android Chrome without horizontal scroll
- User authentication flow (sign-up, email confirmation, login) completes without errors across all supported browsers

---

## Product Principles

**1. Useful before fun.**  
Humor is the top layer, not the foundation. Strip all the jokes and the platform must still be valuable.

**2. Community-generated content, system-curated.**  
No editorial staff. Community adds venues and drinks. System filters via ratings, reviews, and light moderation.

**3. Every feature must answer a real question.**  
"Where do I drink in Cluj tomorrow night?" "What new Romanian beer is worth trying?" "What did I drink at Andrei's wedding?"  
If a feature does not answer a question the user asks in real life, we do not build it.

**4. Mobile-first, always.**  
People drink at the pub with their phone in hand, not a laptop.

---

## MVP Features (Phase 1)

### Venue Map (Harta birturilor)
Interactive map of all pubs, breweries, wineries, and terraces in Romania. Each location has: type, rating, specialty, review count, address. User-generated: anyone can add a new venue, anyone can review. Simple moderation via community flagging.

*Why it makes sense:* It is the most searched thing. "Where do we drink?" is the base question.

### Drink Tracker
Personal log of consumed drinks: name, producer, location, rating, notes. Visualized as a filling glass/mug. Split by category: beer, wine, spirits.

*Why it makes sense:* Untappd has 10 million users. There is proven demand for this. The Romanian version does not exist.

### Betiv Profile (Profilul de betiv)
ANBR membership card with unique number, grade (Stagiar / Autorizat / Emerit / Academician), statistics (beers, wines, venues visited), earned badges. The card image is downloadable as PNG for WhatsApp Status.

*Why it makes sense:* It is the platform's organic virality. People will share it on WhatsApp.

### Romanian Producers Directory
Catalog of Romanian breweries and wineries with their products. Linkable from the tracker: when you log a beer, you can view the producer's page.

*Why it makes sense:* Completes the tracker and brings small producers onto the platform organically.

---

## Phase 2 Features (after MVP validation)

### Pub Circuits (Circuite de birt)
User-curated routes: "Top 5 craft beer bars in Cluj", "Dealu Mare winery tour", "Pubs that serve after midnight in Bucharest". Each circuit is a collection of venues with order and notes.

### Minimal Social Feed
Not a social network. An activity feed: what friends have been drinking, what new pubs appeared in your city, what badges others earned. Optional, not forced.

### "Beer of the Month" / "Wine of the Month"
One featured drink per month, chosen by community vote from drinks logged that month. Simple banner on homepage.

### Pub Check-in
"I am now at [Berea lui Dorel, Cluj]" visible on your profile and optionally in the feed. Expires after 4 hours.

### Venue Detail Page
Each map location gets a dedicated page: user-generated photos, menu if available, text reviews, community-voted "house specialty", list of users who have been there.

---

## What We Are NOT Building

| Feature | Why Not |
|---|---|
| Blog / editorial | Costs time and money, does not scale, not core business |
| Marketplace / delivery | A completely different business with different complexity |
| Events / calendar | Who maintains it? Data expires, becomes garbage fast |
| Chat / messaging | WhatsApp exists. We do not reinvent the wheel |
| Stories / short content | If you want to post a beer on stories, use Instagram |
| Points / virtual currency | Grades and badges are enough. Points complicate UX |
| Native ads / sponsored content | Community credibility is worth more than early ad revenue |
| Multi-language support | Romanian-only for v1 |
| Native mobile apps | Web-only for v1 |
| In-app payments or reservations | Out of scope for v1 |

---

## How the Platform Grows

**Organic virality:** Downloadable ANBR membership card image. People will post it on WhatsApp Status and Instagram Story. Zero marketing costs.

**Local SEO:** Every added venue is an indexable page. "Craft brewery Cluj" brought by the community, not by us.

**Producers as allies:** Small breweries and wineries lack visibility. We give them a free page. They promote it to their audience. We gain content and traffic.

**Retention loop:** Log a beer → glass fills up → earn a badge → share card → friend signs up.

---

## Monetization (later, not now)

When the platform has real traction:

- **Verified producer pages** (breweries, wineries): extended profile, logo, site link, search priority. Small monthly subscription.
- **Betiv Premium**: extra features for passionate users, no ads. Detailed statistics, PDF journal export, card themes.
- **Sponsored circuits**: a beer festival or winery can sponsor a themed circuit. Clearly marked as sponsored, never disguised.

No display ads. No data sales. No aggressive freemium that blocks basic features.

---

## Core Value Proposition

betivi.ro is Romania's home for drinking culture — the one place to discover venues, log what you drink, and belong to a community that gets it.

*"Bem cu rost. Știm ce bem."* — We drink with purpose. We know what we drink.
