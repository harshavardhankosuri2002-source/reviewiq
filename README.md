# VOX: AI Customer Review Intelligence Platform

> **HEAR WHAT MATTERS**  
> *"Understand the experience behind the rating."*

**VOX** is an AI-powered customer review intelligence web application prototype developed for an MBA academic demonstration. It decodes scattered customer feedback across online marketplaces, retailer websites, and consumer communities into calm, transparent, evidence-backed, and personalized purchasing insights.

The interface combines **VOX’s signature Clean Blue and Midnight Navy identity** on a clean, light background with **calm minimalism**, generous whitespace, clear typography, thin subtle borders, and full mathematical calculation transparency.

---

## 1. Brand Identity & Visual Design System

- **Brand Name**: VOX
- **Tagline**: HEAR WHAT MATTERS
- **Emblem**: Minimalist soundwave-inspired geometric "V" with deep navy foundation and vibrant clean blue frequency bars.
- **Palette**:
  - **Deep Navy (`#182C45`)**: Structural elements, primary headings, dark buttons, high-contrast badges.
  - **Clean Sky Blue (`#0284C7` / `#38BDF8`)**: Primary brand accent, active navigation, interactive elements, fit score highlights.
  - **Iceberg Tint (`#EAF5FF`)**: Light surface badges, active state fills, soft containers.
  - **Sky Tint (`#D5E9FA`)**: Crisp borders, dividers, subtle card outlines.
  - **Glacier Accent (`#8CBCE5`)**: Hover rings, secondary indicators.
  - **Canvas Background (`#F5F8FC` / `#FFFFFF`)**: Modern, spacious, light-themed consumer tech experience.

---

## 2. Implemented Screens & User Workflows

### 1. Dedicated Supporting Reviews Screen (`src/pages/SupportingReviewsPage.tsx`)
Accessible via *"View supporting reviews"* on any product recommendation card or insight evidence link:
- **Header**: Back navigation with state preservation, product name, brand, release year, and selected variant.
- **Dynamic Review Summary**: Real-time review count, positive/mixed/negative counts, 3-tier sentiment distribution bar, and active priority tags calculated directly from the dataset.
- **Immediate Multi-Facet Filters**:
  - Sentiment filter pills (All, Positive, Negative, Mixed).
  - Attribute / purchasing priority pills (All, Battery life, Camera quality, Reliability, Performance, Value for money, Software experience).
  - Source channel filter (All, Marketplace, Retailer website, Consumer community).
  - Sort order (Most helpful, Most recent, Oldest, Highest star rating, Lowest star rating).
  - Real-time text search across review titles, body text, authors, and variants.
- **Evidence Traceability**: Automatically filters when navigating from a specific insight (e.g. Battery Life), showing a contextual focus banner and clearly distinguishing between **Supporting Evidence** and **Conflicting / Alternative Views**.
- **Individual Expandable Review Cards**: Star rating, review title, expandable full text, fictional reviewer name, date, source badge, product variant, attribute pills, sentiment badge, and interactive helpful counter.
- **Honest Empty State**: Clean recovery UI with a 1-click filter reset when no reviews match.
- **Direct Navigation**: Deep-link to the Transparent Calculation screen.

### 2. Dedicated Transparent Calculation Screen (`src/pages/TransparentCalculationPage.tsx`)
Accessible via *"How is this calculated?"* on the recommendation card:
- **Section A: Your Selected Priorities**:
  - Interactive priority toggles (Battery, Camera, Reliability, Performance, Value, Software) that recalculate attribute consensus and recommendations in real time.
  - Plain-language explanation of why VOX isolates attribute-specific reviews rather than relying on misleading aggregate 5-star averages.
- **Section B: Attribute-Level Calculations & Arithmetic**:
  - For each selected priority: Total relevant reviews ($N$), positive ($P$), negative ($N_{neg}$), and mixed ($M$).
  - Exact formulas using a uniform denominator:
    $$\text{Positive Consensus} = \frac{P}{N} \times 100\%$$
    $$\text{Negative Consensus} = \frac{N_{neg}}{N} \times 100\%$$
    $$\text{Mixed Consensus} = \frac{M}{N} \times 100\%$$
  - Verification that $P + M + N_{neg} = N$ and percentages sum to 100%.
  - Step-by-step arithmetic display with visual distribution bars.
  - Direct *"Inspect supporting reviews"* jump button for every attribute.
- **Section C: Personalized Recommendation Decision Logic**:
  - Prototype heuristic decision rules:
    - **Good fit**: Positive consensus $\ge 70\%$, sufficient evidence ($N \ge 4$), and negative $< 20\%$.
    - **Mixed fit**: Positive consensus between $40\%$ and $69\%$, or meaningful conflicting opinions.
    - **Potential mismatch**: Positive consensus $< 40\%$ with sufficient evidence ($N \ge 4$).
    - **Not enough evidence**: Fewer than 4 relevant sample reviews.
  - Multi-priority conflict analysis: Explicitly calls out conflicting attributes (e.g., exceptional camera vs weak battery) rather than burying them behind a single averaged score.
- **Section D: Limitations, Uncertainty & Caveats**:
  - Plain-language disclosure of sample size limits, self-selection reporting bias, variant differences, NLP sentiment nuances, and the distinction between consensus percentage and individual satisfaction probability.

### 3. Multi-Category Catalogue & Switcher (`src/pages/DiscoverPage.tsx`)
- **23 verified products across 2 major hardware categories**:
  - **20 Smartphones** across 8 manufacturers: Apple, Samsung, Google Pixel, OnePlus, Xiaomi/Redmi, Nothing, Motorola, and Realme.
  - **3 Flagship Wireless ANC Headphones**: Sony WH-1000XM5, Bose QuietComfort Ultra, and Apple AirPods Max with audio-specific dimensions (Acoustics, ANC Isolation, Comfort, Battery, Call Clarity).
- **Multi-Category Switcher Tabs**: 1-click toggling between *All Categories (23)*, *Smartphones (20)*, and *Flagship Headphones (3)*.
- 4 price segments: Budget (<₹30,000), Midrange (₹30,000–₹50,000), Flagship (₹50,000–₹1,00,000), and Ultra-Premium (₹1,00,000+).
- Live search by model/brand/specs, 11 brand filter pills, price tier tabs, sorting by rating/price/relevance/reviews, active counter, and empty states.

### 4. Advanced MBA Innovation Features
1. **Shopper Persona Presets ("Quick Profile Match")** (`src/components/PersonaPresets.tsx`):
   - 4 pre-configured buyer archetypes: *Business Traveler*, *Creative Pro / Audiophile*, *Student on a Budget*, and *Power User / Executive*.
   - 1-click matching directly adjusts purchasing priorities and recalculates compatibility scores across all products.
2. **"Paste Product Link" / Live Ingestion Simulator** (`src/components/LinkIngestionModal.tsx`):
   - Interactive retail link scanner simulating an 8-stage ingestion pipeline (DOM Scraping, Source Normalization, Bot Filtering, Aspect Sentiment Clustering, and Report Generation).
   - Includes 1-click sample links for Amazon, Flipkart, and BestBuy.
3. **Interactive "Review Manipulation" Stress-Test Tool** (`src/components/TrustAndQualityCard.tsx`):
   - Lets users inject synthetic 5-star promotional bot surges or competitor 1-star review bombs.
   - Shows real-time anomaly detection, confidence penalties, and score defense.
4. **MBA Commercialization & Unit Economics Pitch Deck Modal** (`src/components/CommercializationModal.tsx`):
   - 4 structured interactive pitch tabs:
     - **Market Opportunity & Problem**: $8.2B TAM, 82% consumer distrust in 5-star averages.
     - **3 Monetization Streams**: B2C Affiliate Commissions (2.8%), B2B Retailer PDP API Licensing ($15k/mo/retailer), Brand Intelligence SaaS ($299–$1,299/mo).
     - **Unit Economics**: Blended CAC $4.20, LTV $26.80, 6.4x LTV:CAC ratio, 86% Gross Margin.
     - **3-Year Financial Projections**: Year 1 ($420K), Year 2 ($2.4M), Year 3 ($7.8M ARR) with cash-flow positive inflection at Month 14.

### 5. Product Intelligence & Personalized Decision Engine (`src/pages/ProductAnalysisPage.tsx`)
- **Product Overview** (`src/components/ProductOverview.tsx`): 5 key hardware spec cards with full text wrapping and zero ellipsis truncation.
- **Personalized Decision Engine** (`src/components/PersonalizedInsights.tsx`): Circular SVG fit score gauge, priority selector, tailored advice narrative, and direct triggers to Supporting Reviews and Transparent Calculation.
- **Evidence-Backed AI Summary** (`src/components/AISummaryCard.tsx`): 4 quadrants (Appreciated Features, Common Complaints, Mixed Opinions, Caveats).
- **Theme Breakdown** (`src/components/ThemeBreakdown.tsx`): 6-attribute sentiment bars and buyer quotes.
- **Natural Language Assistant** (`src/components/AskVox.tsx`): Grounded Q&A with evidence citations.
- **Cross-Source Intelligence** (`src/components/CrossSourceCard.tsx`): Multi-channel comparison.
- **Trust & Quality Audit** (`src/components/TrustAndQualityCard.tsx`): Review authenticity and variant completeness scores.
- **Review Recency Timeline** (`src/components/ReviewTimelineCard.tsx`): Longitudinal feedback stream.

### 5. Multi-Device Comparison & Shortlist (`src/pages/ComparePage.tsx` & `SavedProductsPage.tsx`)
- Dynamic 2 to 4 phone side-by-side comparison across all 22 models.
- Persistent shortlist bookmarking with `localStorage`.

---

## 3. Calculation Methodology & Formula Audit

| Metric | Formula | Description |
| :--- | :--- | :--- |
| **Positive Consensus** | $\frac{\text{Positive Mentions}}{\text{Total Mentions}} \times 100\%$ | Proportion of relevant sample reviews reporting positive experience. |
| **Negative Consensus** | $\frac{\text{Negative Mentions}}{\text{Total Mentions}} \times 100\%$ | Proportion of relevant sample reviews reporting critical feedback. |
| **Mixed Consensus** | $\frac{\text{Mixed Mentions}}{\text{Total Mentions}} \times 100\%$ | Proportion of relevant sample reviews reporting nuanced or mixed sentiment. |
| **Total Sum Rule** | $\text{Pos} + \text{Mix} + \text{Neg} = 100\%$ | All three categories use the exact same denominator $N$. |
| **Personalized Fit Score** | $\frac{\sum \text{Positive Consensus of Selected Priorities}}{\text{Number of Selected Priorities}}$ | Unweighted arithmetic mean across user-selected criteria. |

---

## 4. Technology Stack & Running Locally

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS with custom Clean Blue, Navy, and Soft Light design tokens
- **Icons**: Lucide React
- **Data & Analytics**: Local TypeScript dataset (`mockData.ts`) and analytics utilities (`analytics.ts`)

### Commands:
```bash
# Start development server
npm run dev

# Run TypeScript typecheck and production build
npm run build
```

---

## 5. Academic Demonstration Notice

> [!IMPORTANT]
> **Simulated Academic Dataset**: This application is an MBA academic demonstration prototype. All customer reviews, ratings, user handles, dates, and AI summaries are simulated to demonstrate the UI/UX and algorithmic transparency of review intelligence systems. No real-world customer endorsement or warranty is implied.
