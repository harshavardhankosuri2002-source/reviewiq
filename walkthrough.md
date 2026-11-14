# ReviewIQ / VOX: Complete Application Walkthrough & Evaluation Guide

This walkthrough provides step-by-step guidance for testing and demonstrating the ReviewIQ / VOX prototype, specifically highlighting the **5 advanced MBA features** implemented alongside the core review intelligence platform.

---

## Quick Start

1. Ensure the development server is active at `http://localhost:5173/`.
2. Open your browser and navigate to `http://localhost:5173/`.

---

## 1. Feature 1: Multi-Category Expansion & Switcher

### How to test:
1. In the top navigation, click **Catalogue** (or scroll down on the Dashboard).
2. Note the **Category Switcher** pill tabs above the product catalogue:
   - **All Categories (23)**: Displays the full inventory of 20 smartphones and 3 flagship headphones.
   - **Smartphones (20)**: Filters to only smartphones (iPhone 16 Pro Max, Galaxy S24 Ultra, Pixel 9, etc.).
   - **Flagship Wireless ANC Headphones (3 New)**: Filters to:
     - **Sony WH-1000XM5** (MSRP ₹29,990, 4.7 ★, 54 reviews)
     - **Bose QuietComfort Ultra** (MSRP ₹35,900, 4.6 ★, 48 reviews)
     - **Apple AirPods Max** (MSRP ₹59,900, 4.5 ★, 42 reviews)
3. Click on **Sony WH-1000XM5** to inspect its dedicated report:
   - Notice the audio-specific hardware specs: **Integrated Processor V2 + QN1**, **30mm Carbon Driver**, **30hr ANC Battery**, **USB-PD Fast Charge**, **250g Lightweight**.
   - Notice the dynamic **6-Attribute Theme Analysis**: Acoustic Clarity & Bass (92% positive), ANC Isolation (95% positive), Wearing Comfort (85% positive), Battery Endurance (96% positive), Call Clarity (78% mixed), and Value for Money (84% positive).

---

## 2. Feature 2: Shopper Persona Presets ("Quick Profile Match")

### How to test:
1. In the **Catalogue** page or inside any product's **Personalized Decision Engine** card, look for the **Shopper Persona Presets** section.
2. Observe the 4 pre-configured buyer archetypes:
   - ✈️ **Business Traveler**: Prioritizes *ANC Isolation, Battery Endurance, Reliability, Call Clarity*.
   - 🎧 **Creative Pro / Audiophile**: Prioritizes *Acoustic Clarity, Performance, Reliability, Comfort*.
   - 🎓 **Student on a Budget**: Prioritizes *Value for Money, Battery Endurance, Reliability*.
   - ⚡ **Power User / Executive**: Prioritizes *Performance, Battery Endurance, Reliability, Software Experience*.
3. Click **Business Traveler**:
   - Notice how all priority checkboxes are instantly selected.
   - Watch the **Fit Score circular gauge** dynamically recalculate in real-time.
   - For Sony WH-1000XM5, the score jumps to **92% (Good fit)** with tailored advice on flight noise reduction.

---

## 3. Feature 3: "Paste Product Link" / Live Ingestion Simulator

### How to test:
1. On the **Catalogue** page, locate the **Live Ingestion Pipeline Simulator** banner: *"Have a retail link? Test our 8-Stage Real-Time Parser"*.
2. Click **Launch Ingestion Simulator**.
3. In the modal:
   - Choose any of the 1-click sample links (e.g. *Amazon: Sony WH-1000XM5*, *Flipkart: Galaxy S24 Ultra*, or *BestBuy: Bose QC Ultra*), or type a custom URL.
   - Click **Run Live Ingestion Simulation**.
4. Watch the 5-stage animated ingestion progress:
   1. *Scraping DOM & Review Pagination...*
   2. *Normalizing Multi-Source Schemas...*
   3. *Filtering Bot Clusters & Incentivized Reviews...*
   4. *Aspect-Based Sentiment Clustering...*
   5. *Synthesizing Grounded Decoded Report...*
5. Once complete, inspect the ingestion audit card (99.2% extraction confidence, 42 bot reviews purged) and click **Launch Decoded Intelligence** to jump directly to the verified product analysis!

---

## 4. Feature 4: Interactive "Review Manipulation" Stress-Test Tool

### How to test:
1. Open any product report (e.g., iPhone 16 Pro Max or Sony WH-1000XM5).
2. Scroll to the **Trust & Quality Audit** card.
3. Observe the **Stress-Test Review Manipulation Defense** interactive panel.
4. Test the 3 simulation scenarios:
   - **Baseline (Genuine Organic Feedback)**: 0% confidence penalty, Clean audit.
   - **Scenario A: +500 Bot 5★ Surge (Promotional Attack)**:
     - ReviewIQ immediately flags: *"Abnormal burst velocity detected (+500 reviews in 48h). 94.2% semantic similarity across unverified accounts."*
     - Authenticity score drops by -28%, isolating legitimate buyer sentiment from promotional noise.
   - **Scenario B: Competitor 1★ Review Bomb (Smear Campaign)**:
     - ReviewIQ detects: *"Geographic clustering & identical phrasing detected across newly created accounts."*
     - Algorithmic defense penalizes suspicious 1★ spikes by -35%, shielding consumer confidence.
5. Click **Reset to Baseline** to restore organic metrics.

---

## 5. Feature 5: MBA Commercialization & Unit Economics Deck Modal

### How to test:
1. Click the **MBA Pitch Deck** button located in:
   - The top navigation bar (desktop & mobile).
   - The top announcement ribbon (*"MBA Business Model & Unit Economics"*).
   - The bottom SaaS footer (*"MBA Commercialization Strategy & Pitch Deck"*).
2. Explore the 4 interactive presentation tabs:
   - **1. Market Problem & TAM**:
     - Explores the $8.2B global market opportunity, consumer fatigue (76% overwhelmed, 82% distrust 5-star averages), and why Amazon/Google cannot self-solve due to ad conflict.
   - **2. Three Monetization Streams**:
     - **B2C Affiliate Commissions**: 2.8% blended affiliate revenue on high-intent click-outs.
     - **B2B Retailer PDP API**: $15,000/mo enterprise licensing to improve conversion rates and cut returns by 18%.
     - **Brand Intelligence SaaS**: $299–$1,299/mo dashboard for OEM product teams to track real customer defects.
   - **3. Unit Economics**:
     - Blended CAC: **$4.20**
     - Customer Lifetime Value (LTV): **$26.80**
     - **6.4x LTV:CAC Ratio** (Healthy benchmark > 3.0x)
     - **86% Gross Margin** with 2.8-month payback period.
   - **4. 3-Year Projections**:
     - Year 1: $420,000 ARR
     - Year 2: $2,450,000 ARR
     - Year 3: $7,800,000 ARR
     - Cash-flow positive milestone at Month 14.

---

## 6. Verification & Build Integrity

- **TypeScript Compilation**: `npm run build` succeeds with zero errors.
- **Uniform-Denominator Math**: Positive + Mixed + Negative = 100% across all 23 products.
- **Zero Hallucination / Traceability**: Every rating, aspect percentage, and AI claim links directly to specific review IDs and customer quote cards.

