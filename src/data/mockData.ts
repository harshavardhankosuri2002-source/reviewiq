import { Product, Review, QAItem } from '../types';

export const SAMPLE_PRODUCTS: Product[] = [
  // 1. Apple iPhone 16 Pro Max
  {
    id: 'iphone-16-pro-max',
    name: 'Apple iPhone 16 Pro Max',
    brand: 'Apple',
    releaseYear: 2024,
    variants: ['256GB - Grade 5 Titanium', '512GB - Grade 5 Titanium', '1TB - Grade 5 Titanium'],
    defaultVariant: '256GB - Grade 5 Titanium',
    priceMSRP: '₹1,44,900',
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
    category: 'Smartphones',
    specsSummary: {
      display: '6.9" Super Retina XDR OLED, 1-120Hz ProMotion, 2000 nits',
      chipset: 'A18 Pro (3nm) with 6-core GPU & Neural Engine',
      battery: '4,685 mAh (~33 hrs playback, 30W wired / 25W MagSafe)',
      camera: '48MP Fusion + 48MP Ultra-wide + 12MP 5x Tetraprism Telephoto',
      weight: '227g',
    },
    sampleRating: 4.6,
    sampleReviewCount: 16,
    dateRange: {
      start: '2024-09-22',
      end: '2025-01-20',
    },
    quickVerdict: 'The pinnacle of iOS hardware with supreme battery endurance, razor-thin display borders, and 4K120fps Dolby Vision video, though the 227g weight and 6.9-inch footprint require two hands for comfortable use.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'Exceptional battery stamina easily exceeding 30 hours of continuous mixed usage.',
          'Stunning 6.9" borderless display with 120Hz ProMotion smoothness and outdoor readability.',
          'Pro-grade 4K 120fps video recording and studio-quality 4-mic array capture.'
        ],
        supportingReviewIds: ['rev-ip16pm-01', 'rev-ip16pm-03', 'rev-ip16pm-05']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          'Substantial 227g weight and sheer height make one-handed pocketability challenging.',
          'Charging speed peaks around 30W, lagging high-speed 80W+ Android flagships.',
          'High starting price point of ₹1,44,900 before accessories.'
        ],
        supportingReviewIds: ['rev-ip16pm-02', 'rev-ip16pm-04']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'Camera Control capacitive button receives divided feedback for ergonomic comfort in portrait mode.',
          'Apple Intelligence localized features roll out gradually across software iterations.'
        ],
        supportingReviewIds: ['rev-ip16pm-06']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          'Ensure physical hand ergonomics comfortably accommodate the larger 6.9-inch chassis.',
          'Fast charging requires a separate high-wattage USB-C PD power adapter.'
        ],
        supportingReviewIds: ['rev-ip16pm-02', 'rev-ip16pm-04']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 94,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'High consistency and cross-platform verification across tech press and retail buyers.',
      variantCompletenessScore: 95,
      variantNote: 'Reviews accurately reflect 256GB, 512GB, and 1TB storage tiers.',
      recencyConfidence: 'High',
      recencyNote: 'Extensive feedback captured across holiday quarters.'
    }
  },

  // 2. Apple iPhone 16
  {
    id: 'iphone-16',
    name: 'Apple iPhone 16',
    brand: 'Apple',
    releaseYear: 2024,
    variants: ['128GB - Aluminum', '256GB - Aluminum', '512GB - Aluminum'],
    defaultVariant: '128GB - Aluminum',
    priceMSRP: '₹79,900',
    imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80',
    category: 'Smartphones',
    specsSummary: {
      display: '6.1" Super Retina XDR OLED, 60Hz, 2000 nits',
      chipset: 'A18 Bionic (3nm) + 8GB RAM',
      battery: '3,561 mAh (~22 hrs playback)',
      camera: '48MP Fusion Dual-Camera + Camera Control + Macro',
      weight: '170g',
    },
    sampleRating: 4.3,
    sampleReviewCount: 12,
    dateRange: {
      start: '2024-09-22',
      end: '2025-01-18',
    },
    quickVerdict: 'Exceptional everyday performance, premium lightweight aluminum build, and dependable battery life, but consumers frequently criticize the lingering 60Hz refresh rate at this price tier.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'The new A18 chipset delivers snappy gaming and daily navigation with zero stutter.',
          'Noticeable battery life bump compared to iPhone 14 and 15 models.',
          'Camera Control button and 48MP Fusion sensor capture rich colors in daylight.'
        ],
        supportingReviewIds: ['rev-ip16-01', 'rev-ip16-03', 'rev-ip16-06']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          '60Hz display refresh rate feels dated compared to identically priced Android flagships.',
          'Base 128GB storage fills quickly when capturing 4K ProRes or spatial video.',
          'Charging speed peaks around 25W-27W, slower than competitors.'
        ],
        supportingReviewIds: ['rev-ip16-02', 'rev-ip16-05', 'rev-ip16-08']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'The physical Camera Control key: some consider it intuitive, others report it requires clumsy grip adjustments.',
          'Apple Intelligence rollout timing: early purchasers found initial feature set sparse.'
        ],
        supportingReviewIds: ['rev-ip16-04', 'rev-ip16-07']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          'Display is capped at 60Hz; high-refresh ProMotion remains restricted to Pro models.',
          'Consumer community reviews reflect lower satisfaction on charging speed than marketplace reviews.'
        ],
        supportingReviewIds: ['rev-ip16-02', 'rev-ip16-12']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 88,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'No anomalous review bursts or text templating detected across sources.',
      variantCompletenessScore: 92,
      variantNote: '83% of reviews specify exact storage tiers (predominantly 128GB and 256GB).',
      recencyConfidence: 'High',
      recencyNote: 'Reviews distributed steadily across past 4 months post-launch.'
    }
  },

  // 3. Apple iPhone 15
  {
    id: 'iphone-15',
    name: 'Apple iPhone 15',
    brand: 'Apple',
    releaseYear: 2023,
    variants: ['128GB - Color-Infused Glass', '256GB - Color-Infused Glass', '512GB - Color-Infused Glass'],
    defaultVariant: '128GB - Color-Infused Glass',
    priceMSRP: '₹69,900',
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80',
    category: 'Smartphones',
    specsSummary: {
      display: '6.1" Super Retina XDR OLED, Dynamic Island, 60Hz',
      chipset: 'A16 Bionic (4nm)',
      battery: '3,349 mAh (~20 hrs playback, USB-C)',
      camera: '48MP Main with 2x lossless crop + 12MP Ultra-wide',
      weight: '171g',
    },
    sampleRating: 4.4,
    sampleReviewCount: 14,
    dateRange: {
      start: '2023-09-25',
      end: '2024-11-30',
    },
    quickVerdict: 'A solid, well-rounded iOS value with universal USB-C charging, Dynamic Island, and a high-resolution 48MP sensor at a discounted price, though still capped at 60Hz.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'Universal USB-C port simplifies daily cable management across laptops and tablets.',
          'Dynamic Island adds convenient background multitasking and timer visibility.',
          '48MP sensor with 2x optical crop provides versatile portrait framing.'
        ],
        supportingReviewIds: ['rev-ip15-01', 'rev-ip15-03']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          '60Hz refresh rate remains less fluid than similarly priced 120Hz rivals.',
          'USB-C transfer speed is limited to USB 2.0 (480Mbps).',
          'Battery life is sufficient for one day but lacks multi-day buffer.'
        ],
        supportingReviewIds: ['rev-ip15-02', 'rev-ip15-04']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'Pastel color palette: praised for subtle elegance, but critics wanted bolder tones.'
        ],
        supportingReviewIds: ['rev-ip15-05']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          'Does not support on-device Apple Intelligence features (which require A17 Pro / A18 + 8GB RAM).'
        ],
        supportingReviewIds: ['rev-ip15-02']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 92,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'Mature review corpus spanning over 14 months of real-world buyer ownership.',
      variantCompletenessScore: 90,
      variantNote: 'Well distributed across base and upgraded storage capacities.',
      recencyConfidence: 'High',
      recencyNote: 'Extensive long-term reliability reports verified.'
    }
  },

  // 4. Apple iPhone SE (3rd Gen)
  {
    id: 'iphone-se-3',
    name: 'Apple iPhone SE (3rd Gen)',
    brand: 'Apple',
    releaseYear: 2022,
    variants: ['64GB - Classic', '128GB - Classic', '256GB - Classic'],
    defaultVariant: '64GB - Classic',
    priceMSRP: '₹47,900',
    imageUrl: 'https://images.unsplash.com/photo-1530319067432-f2a729c03db5?w=800&auto=format&fit=crop&q=80',
    category: 'Smartphones',
    specsSummary: {
      display: '4.7" Retina HD LCD, True Tone, 60Hz',
      chipset: 'A15 Bionic (5nm) + 5G',
      battery: '2,018 mAh (~15 hrs playback, Qi Wireless)',
      camera: '12MP Wide with Smart HDR 4 + 4K60 video',
      weight: '144g',
    },
    sampleRating: 3.9,
    sampleReviewCount: 10,
    dateRange: {
      start: '2022-04-10',
      end: '2024-10-15',
    },
    quickVerdict: 'Compact, pocket-friendly iPhone with a physical Home button / Touch ID and fast A15 Bionic chip, though heavily constrained by dated thick bezels, a small 4.7-inch LCD, and modest battery life.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'Featherweight 144g pocketable body with familiar tactile Touch ID home button.',
          'Snappy A15 Bionic processor ensures prompt iOS app loading.',
          'Affordable gateway to the Apple ecosystem and iMessage.'
        ],
        supportingReviewIds: ['rev-ipse-01', 'rev-ipse-03']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          'Small 2,018 mAh battery struggles under heavy cellular data use.',
          'Antiquated thick forehead and chin bezels from 2017 form factor.',
          '64GB base storage is quickly consumed by modern iOS and apps.'
        ],
        supportingReviewIds: ['rev-ipse-02', 'rev-ipse-04']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'Single 12MP camera produces decent daylight snapshots but lacks dedicated Night mode.'
        ],
        supportingReviewIds: ['rev-ipse-05']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          'No Night mode in camera software; screen size is limited for extensive media streaming.'
        ],
        supportingReviewIds: ['rev-ipse-02', 'rev-ipse-04']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 82,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'Steady reviews from value seekers and enterprise fleets.',
      variantCompletenessScore: 85,
      variantNote: 'Heavy volume on 64GB entry configuration.',
      recencyConfidence: 'Moderate',
      recencyNote: 'Corpus reflects budget buyers and secondary phone users.'
    }
  },

  // 5. Samsung Galaxy S24 Ultra
  {
    id: 'galaxy-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    releaseYear: 2024,
    variants: ['256GB - Titanium Gray', '512GB - Titanium Black', '1TB - Titanium Violet'],
    defaultVariant: '256GB - Titanium Gray',
    priceMSRP: '₹1,29,999',
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
    category: 'Smartphones',
    specsSummary: {
      display: '6.8" Dynamic AMOLED 2X Flat, 1-120Hz LTPO, Gorilla Armor Anti-Reflective',
      chipset: 'Snapdragon 8 Gen 3 for Galaxy (4nm) + 12GB RAM',
      battery: '5,000 mAh (45W wired, 15W wireless)',
      camera: '200MP Main + 50MP 5x Optical + 10MP 3x Optical + 12MP Ultra-wide',
      weight: '232g',
    },
    sampleRating: 4.7,
    sampleReviewCount: 18,
    dateRange: {
      start: '2024-02-01',
      end: '2025-01-15',
    },
    quickVerdict: 'The ultimate Android power tool boasting an anti-reflective flat display, integrated S-Pen, class-leading zoom reach, and 7 years of OS support, offset by high pricing and a large, angular footprint.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'Gorilla Armor anti-reflective glass radically cuts outdoor glare and reflections.',
          'Versatile quad-camera array captures crisp 5x and 10x zoom photos effortlessly.',
          'Integrated S-Pen stylus remains unmatched for note-taking and precise photo editing.'
        ],
        supportingReviewIds: ['rev-s24u-01', 'rev-s24u-03', 'rev-s24u-05']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          'Heavy 232g chassis with sharp boxy corners that can press into palms.',
          'Samsung image processing can over-sharpen fine foliage textures.',
          'Expensive ₹1,29,999 price tag.'
        ],
        supportingReviewIds: ['rev-s24u-02', 'rev-s24u-04']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'Galaxy AI tools (Circle to Search, generative photo edits): some view as daily essentials, others as occasional novelties.'
        ],
        supportingReviewIds: ['rev-s24u-06']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          '45W fast charger must be purchased separately; device size is best suited for two-handed use.'
        ],
        supportingReviewIds: ['rev-s24u-02']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 96,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'Extensive multi-source verification across power users, artists, and tech enthusiasts.',
      variantCompletenessScore: 94,
      variantNote: 'Comprehensive review distribution across 256GB and 512GB tiers.',
      recencyConfidence: 'High',
      recencyNote: 'High feedback volume spanning entire launch year.'
    }
  },

  // 6. Samsung Galaxy S24
  {
    id: 'galaxy-s24',
    name: 'Samsung Galaxy S24',
    brand: 'Samsung',
    releaseYear: 2024,
    variants: ['128GB - 8GB RAM', '256GB - 8GB RAM'],
    defaultVariant: '256GB - 8GB RAM',
    priceMSRP: '₹79,999',
    imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
    category: 'Smartphones',
    specsSummary: {
      display: '6.2" Dynamic AMOLED 2X, 1-120Hz LTPO, 2600 nits peak',
      chipset: 'Snapdragon 8 Gen 3 / Exynos 2400',
      battery: '4,000 mAh (25W wired)',
      camera: '50MP Main + 12MP Ultra-wide + 10MP 3x Optical Telephoto',
      weight: '167g',
    },
    sampleRating: 4.4,
    sampleReviewCount: 12,
    dateRange: {
      start: '2024-02-05',
      end: '2024-12-28',
    },
    quickVerdict: 'Stunning 120Hz display, versatile 3x optical telephoto lens, and long 7-year software commitment in a featherweight 167g frame, though battery stamina in compact form factor is moderate for heavy users.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'Gorgeous 120Hz LTPO AMOLED screen that is exceptionally bright outdoors (2,600 nits).',
          'Only flagship at this compact size with a dedicated 3x optical zoom lens.',
          'One UI 6.1 with practical Circle to Search and live translation features.'
        ],
        supportingReviewIds: ['rev-s24-01', 'rev-s24-03', 'rev-s24-07']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          '4,000 mAh battery drains rapidly when using 5G and mobile gaming heavily.',
          'Indoor shutter lag can cause motion blur on moving kids or pets.',
          'Regional chipset variance (Exynos vs Snapdragon) causes confusion in community forums.'
        ],
        supportingReviewIds: ['rev-s24-02', 'rev-s24-05', 'rev-s24-08']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'Galaxy AI software utilities: some users consider Circle to Search indispensable; others view photo editing tools as novelties.',
          'Ergonomic feel: flat edges are praised for grip, but some find the boxy aesthetic sharp.'
        ],
        supportingReviewIds: ['rev-s24-04', 'rev-s24-06']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          'Base 128GB model uses UFS 3.1 storage whereas 256GB utilizes faster UFS 4.0.',
          'Battery life is sufficient for standard day use but marginal under heavy gaming loads.'
        ],
        supportingReviewIds: ['rev-s24-02', 'rev-s24-12']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 85,
      duplicatePatternFlag: true,
      duplicatePatternNote: 'Minor cluster notice: 2 early retailer reviews share near-identical phrasing regarding unboxing.',
      variantCompletenessScore: 78,
      variantNote: 'Regional processor variants (Snapdragon vs Exynos) not always designated by reviewers.',
      recencyConfidence: 'High',
      recencyNote: 'Over 10 months of cumulative feedback captured across multiple update cycles.'
    }
  },

  // 7. Samsung Galaxy S23 FE
  {
    id: 'galaxy-s23-fe',
    name: 'Samsung Galaxy S23 FE',
    brand: 'Samsung',
    releaseYear: 2023,
    variants: ['128GB - 8GB RAM', '256GB - 8GB RAM'],
    defaultVariant: '128GB - 8GB RAM',
    priceMSRP: '₹49,999',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02560?w=800&auto=format&fit=crop&q=80',
    category: 'Smartphones',
    specsSummary: {
      display: '6.4" Dynamic AMOLED 2X, 120Hz, 1450 nits',
      chipset: 'Snapdragon 8 Gen 1 / Exynos 2200',
      battery: '4,500 mAh (25W wired, wireless charging)',
      camera: '50MP Main + 12MP Ultra-wide + 8MP 3x Optical Telephoto',
      weight: '209g',
    },
    sampleRating: 4.1,
    sampleReviewCount: 11,
    dateRange: {
      start: '2023-11-01',
      end: '2024-11-20',
    },
    quickVerdict: 'Delivers flagship essentials including a 3x telephoto camera, wireless charging, and IP68 rating at ₹49,999, but uses older thermal-heavy processors and has noticeable display bezels.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'Dedicated 3x optical zoom lens rarely found under ₹50,000.',
          'Vibrant 120Hz AMOLED panel with full IP68 water resistance.',
          'Comprehensive software update track with 4 major OS updates.'
        ],
        supportingReviewIds: ['rev-s23fe-01', 'rev-s23fe-03']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          'Chassis heats up quickly during gaming due to older chip thermal efficiency.',
          'Relatively thick display bezels and heavy 209g weight for a 6.4-inch phone.',
          'Battery life is moderate under continuous 5G browsing.'
        ],
        supportingReviewIds: ['rev-s23fe-02', 'rev-s23fe-04']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'Glass sandwich design feels premium, but gloss back attracts smudges.'
        ],
        supportingReviewIds: ['rev-s23fe-05']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          'Heats up faster than Snapdragon 8 Gen 2 / Gen 3 devices during continuous gaming.'
        ],
        supportingReviewIds: ['rev-s23fe-02']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 84,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'Consistent value consumer sentiment across retail channels.',
      variantCompletenessScore: 88,
      variantNote: 'Reviewers clearly distinguish 128GB from 256GB versions.',
      recencyConfidence: 'High',
      recencyNote: 'Established user dataset over a 12-month period.'
    }
  },

  // 8. Samsung Galaxy A55 5G
  {
    id: 'galaxy-a55',
    name: 'Samsung Galaxy A55 5G',
    brand: 'Samsung',
    releaseYear: 2024,
    variants: ['128GB - 8GB RAM', '256GB - 8GB RAM'],
    defaultVariant: '128GB - 8GB RAM',
    priceMSRP: '₹39,999',
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
    category: 'Smartphones',
    specsSummary: {
      display: '6.6" Super AMOLED, 120Hz, Gorilla Glass Victus+, 1000 nits',
      chipset: 'Exynos 1480 with AMD Xclipse 530 GPU',
      battery: '5,000 mAh (25W wired, multi-day battery)',
      camera: '50MP Main OIS + 12MP Ultra-wide + 5MP Macro',
      weight: '213g',
    },
    sampleRating: 4.3,
    sampleReviewCount: 13,
    dateRange: {
      start: '2024-03-20',
      end: '2024-12-10',
    },
    quickVerdict: 'A premium-feeling metal-frame midranger offering two-day battery life, expandable MicroSD storage, and long software support, though charging remains capped at 25W with no wireless charging.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'Upgraded metal frame and Gorilla Glass Victus+ feel as premium as flagship S-series.',
          'Superb 5,000 mAh battery easily lasts 1.5 to 2 days on moderate use.',
          'MicroSD expandable storage slot allows cheap storage expansion up to 1TB.'
        ],
        supportingReviewIds: ['rev-a55-01', 'rev-a55-03']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          'No wireless charging support.',
          '25W charging takes over 80 minutes for a complete charge.',
          'Camera processing can struggle in low-light fast-action scenarios.'
        ],
        supportingReviewIds: ['rev-a55-02', 'rev-a55-04']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'Key Island raised buttons design: some find it easy to locate, others consider it quirky.'
        ],
        supportingReviewIds: ['rev-a55-05']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          'No wall charger in the box; lacks dedicated optical zoom lens.'
        ],
        supportingReviewIds: ['rev-a55-02']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 89,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'Broad global consumer feedback across retail and carrier stores.',
      variantCompletenessScore: 91,
      variantNote: 'Accurately records 8GB RAM and MicroSD expansion usage.',
      recencyConfidence: 'High',
      recencyNote: 'Strong mid-cycle review volume.'
    }
  },

  // 9. Google Pixel 9 Pro XL
  {
    id: 'pixel-9-pro-xl',
    name: 'Google Pixel 9 Pro XL',
    brand: 'Google',
    releaseYear: 2024,
    variants: ['128GB - 16GB RAM', '256GB - 16GB RAM', '512GB - 16GB RAM'],
    defaultVariant: '256GB - 16GB RAM',
    priceMSRP: '₹1,24,999',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
    category: 'Smartphones',
    specsSummary: {
      display: '6.8" Super Actua LTPO OLED, 1-120Hz, 3000 nits peak',
      chipset: 'Google Tensor G4 (4nm) + Titan M2 + 16GB RAM',
      battery: '5,060 mAh (37W fast charging, Qi2 wireless)',
      camera: '50MP Main + 48MP 5x Telephoto + 48MP Ultra-wide + 42MP Selfie',
      weight: '221g',
    },
    sampleRating: 4.5,
    sampleReviewCount: 15,
    dateRange: {
      start: '2024-08-22',
      end: '2025-01-16',
    },
    quickVerdict: 'Google’s most refined flagship to date with peerless computational photography, an ultra-bright 3,000-nit display, 16GB RAM for on-device Gemini, and 37W charging, balanced against Tensor G4 gaming limits.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'Industry-best still camera with 5x telephoto and AI Video Boost 8K upscaling.',
          'Substantial build upgrade with polished flat rails and premium matte glass back.',
          '16GB RAM guarantees fluid on-device Gemini Nano and multitasking.'
        ],
        supportingReviewIds: ['rev-px9pxl-01', 'rev-px9pxl-03']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          'Tensor G4 GPU frame rates in demanding 3D games remain below Snapdragon 8 Gen 3.',
          'Base ₹1,24,999 model still comes with 128GB storage.',
          '221g weight is substantial for smaller hands.'
        ],
        supportingReviewIds: ['rev-px9pxl-02', 'rev-px9pxl-04']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'Gemini Live assistant voice features: very conversational, but some features require Google One AI Premium.'
        ],
        supportingReviewIds: ['rev-px9pxl-05']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          'Power gamers should consider Snapdragon flagships; recommend getting 256GB tier for 8K video boost.'
        ],
        supportingReviewIds: ['rev-px9pxl-02']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 93,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'High credibility dataset from tech journalists and early adopters.',
      variantCompletenessScore: 92,
      variantNote: 'Reviewers distinguish 128GB from 256GB video storage impact.',
      recencyConfidence: 'High',
      recencyNote: 'Strong post-launch tracking.'
    }
  },

  // 10. Google Pixel 9
  {
    id: 'pixel-9',
    name: 'Google Pixel 9',
    brand: 'Google',
    releaseYear: 2024,
    variants: ['128GB - 12GB RAM', '256GB - 12GB RAM'],
    defaultVariant: '128GB - 12GB RAM',
    priceMSRP: '₹79,999',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
    category: 'Smartphones',
    specsSummary: {
      display: '6.3" Actua OLED, 60-120Hz, 2700 nits',
      chipset: 'Google Tensor G4 (4nm) + 12GB RAM',
      battery: '4,700 mAh (27W wired)',
      camera: '50MP Main + 48MP Ultra-wide with Macro Focus',
      weight: '198g',
    },
    sampleRating: 4.2,
    sampleReviewCount: 12,
    dateRange: {
      start: '2024-08-25',
      end: '2025-01-14',
    },
    quickVerdict: 'Industry-leading still photography, clean fluid Pixel UI with 7 years of OS updates, and a redesigned premium chassis, balanced against moderate raw GPU horsepower and 198g heft.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'Outstanding computational photography with natural skin tones and night sight fidelity.',
          'Significant hardware overhaul: premium satin glass back, sturdy polished rails, and ultrasonic fingerprint scanner.',
          'Generous 12GB RAM ensures apps stay in memory and on-device Gemini operates smoothly.'
        ],
        supportingReviewIds: ['rev-px9-01', 'rev-px9-03', 'rev-px9-06']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          'Noticeably heavier (198g) than predecessor and rivals in the compact class.',
          'Tensor G4 raw benchmark scores trail Snapdragon 8 Gen 3 in prolonged high-FPS 3D gaming.',
          'Charging speed remains capped at 27W, requiring ~85 minutes for a full top-off.'
        ],
        supportingReviewIds: ['rev-px9-02', 'rev-px9-05', 'rev-px9-07']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'Camera visor design: praised for allowing the phone to rest flat without wobbling, but polarizes aesthetic taste.',
          'On-device Gemini Live features: impressive voice latency, though some features require subscription.'
        ],
        supportingReviewIds: ['rev-px9-04', 'rev-px9-09']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          'No dedicated optical telephoto lens (unlike Galaxy S24); relies on 2x sensor crop.',
          'Thermal management is greatly improved over Pixel 8, but sustained gaming still warms the chassis.'
        ],
        supportingReviewIds: ['rev-px9-05', 'rev-px9-12']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 91,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'No suspicious repetitive text clusters detected.',
      variantCompletenessScore: 89,
      variantNote: 'Reviewers clearly distinguish 128GB and 256GB models; all share uniform 12GB RAM.',
      recencyConfidence: 'High',
      recencyNote: 'Strong cluster of verified buyer reviews across launch and holiday quarters.'
    }
  },

  // 11. Google Pixel 8a
  {
    id: 'pixel-8a',
    name: 'Google Pixel 8a',
    brand: 'Google',
    releaseYear: 2024,
    variants: ['128GB - 8GB RAM', '256GB - 8GB RAM'],
    defaultVariant: '128GB - 8GB RAM',
    priceMSRP: '₹52,999',
    imageUrl: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&auto=format&fit=crop&q=80',
    category: 'Smartphones',
    specsSummary: {
      display: '6.1" Actua OLED, 120Hz, 2000 nits, Gorilla Glass 3',
      chipset: 'Google Tensor G3 (4nm) + Titan M2 security',
      battery: '4,492 mAh (18W wired, 7.5W wireless)',
      camera: '64MP Main OIS + 13MP Ultra-wide + Best Take AI',
      weight: '188g',
    },
    sampleRating: 4.4,
    sampleReviewCount: 14,
    dateRange: {
      start: '2024-05-15',
      end: '2024-12-20',
    },
    quickVerdict: 'The champion of midrange photography offering a 120Hz OLED screen, 7 full years of software support, and flagship AI photo tools at ₹52,999, constrained mainly by slow 18W charging and thicker display bezels.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'Flagship-grade 64MP camera captures stunning low-light and portrait shots.',
          'Unrivaled 7 years of full OS upgrades and monthly security patches at ₹52,999.',
          'Smooth 120Hz Actua display is twice as bright as the Pixel 7a.'
        ],
        supportingReviewIds: ['rev-px8a-01', 'rev-px8a-03']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          'Slow 18W wired charging takes roughly 100 minutes to reach 100%.',
          'Noticeable black borders around the display compared to Pixel 8.',
          'Tensor G3 warms up moderately during extended video calls or navigation.'
        ],
        supportingReviewIds: ['rev-px8a-02', 'rev-px8a-04']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'Matte composite back feels nice in hand, but plastic frame attracts mixed opinions on premium feel.'
        ],
        supportingReviewIds: ['rev-px8a-05']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          'Charging speed is among the slowest in the ₹50,000 category; no charger included in box.'
        ],
        supportingReviewIds: ['rev-px8a-02']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 90,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'High satisfaction verified across budget-conscious tech reviewers.',
      variantCompletenessScore: 88,
      variantNote: 'High percentage of reviews identify base 128GB model.',
      recencyConfidence: 'High',
      recencyNote: 'Extensive post-summer review corpus.'
    }
  },

  // 12. OnePlus 12
  {
    id: 'oneplus-12',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    releaseYear: 2024,
    variants: ['256GB - 12GB RAM', '512GB - 16GB RAM', '1TB - 16GB RAM'],
    defaultVariant: '256GB - 12GB RAM',
    priceMSRP: '₹64,999',
    imageUrl: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80',
    category: 'Smartphones',
    specsSummary: {
      display: '6.82" 2K ProXDR LTPO AMOLED, 1-120Hz, 4500 nits peak',
      chipset: 'Snapdragon 8 Gen 3 + Dual Cryo-velocity VC cooling',
      battery: '5,400 mAh (80W/100W SuperVOOC wired, 50W wireless)',
      camera: '50MP Sony LYT-808 + 64MP 3x Periscope Zoom + 48MP Ultra-wide (Hasselblad)',
      weight: '220g',
    },
    sampleRating: 4.6,
    sampleReviewCount: 15,
    dateRange: {
      start: '2024-02-10',
      end: '2025-01-08',
    },
    quickVerdict: 'A powerhouse flagship killer packing a massive 5,400 mAh battery, blistering 80W/100W charging (with charger included), a 64MP periscope telephoto, and a 4,500-nit display at ₹64,999.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'Blistering 80W/100W charging fills the massive 5,400 mAh battery in under 30 minutes.',
          '64MP 3x periscope zoom lens delivers sharp, detailed telephoto and portrait photos.',
          'Gorgeous 2K 120Hz screen with Aqua Touch functionality works reliably even in rain.'
        ],
        supportingReviewIds: ['rev-op12-01', 'rev-op12-03', 'rev-op12-05']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          'Curved screen edges can produce minor glare and accidental palm touches.',
          'IP65 water rating is below the IP68 standard of Apple and Samsung.',
          'Large circular camera module makes the phone top-heavy.'
        ],
        supportingReviewIds: ['rev-op12-02', 'rev-op12-04']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'OxygenOS 14 has merged heavily with ColorOS: fast and smooth, but differs from vintage stock OnePlus UI.'
        ],
        supportingReviewIds: ['rev-op12-06']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          'IP65 water resistance protects against water jets and rain, but not continuous submersion.'
        ],
        supportingReviewIds: ['rev-op12-02']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 92,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'Strong enthusiast community consensus across charging speeds and display.',
      variantCompletenessScore: 93,
      variantNote: 'Detailed commentary on 16GB RAM multitasking.',
      recencyConfidence: 'High',
      recencyNote: 'Extensive tracking across global releases.'
    }
  },

  // 13. OnePlus 12R
  {
    id: 'oneplus-12r',
    name: 'OnePlus 12R',
    brand: 'OnePlus',
    releaseYear: 2024,
    variants: ['128GB - 8GB RAM', '256GB - 16GB RAM'],
    defaultVariant: '128GB - 8GB RAM',
    priceMSRP: '₹39,999',
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
    category: 'Smartphones',
    specsSummary: {
      display: '6.78" 1.5K ProXDR LTPO 4.0 AMOLED, 1-120Hz, 4500 nits',
      chipset: 'Snapdragon 8 Gen 2 + 5,500 mAh battery',
      battery: '5,500 mAh (80W/100W SuperVOOC wired)',
      camera: '50MP Sony IMX890 OIS + 8MP Ultra-wide + 2MP Macro',
      weight: '207g',
    },
    sampleRating: 4.5,
    sampleReviewCount: 13,
    dateRange: {
      start: '2024-02-18',
      end: '2024-12-15',
    },
    quickVerdict: 'Unbeatable battery life and gaming performance at ₹39,999 thanks to a huge 5,500 mAh cell, Snapdragon 8 Gen 2, and 80W charging, compromised only by a weak auxiliary 8MP ultra-wide and 2MP macro camera.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'Colossal 5,500 mAh battery frequently delivers 10+ hours of screen-on time.',
          'Flagship Snapdragon 8 Gen 2 chip runs demanding 3D games at maximum FPS without throttling.',
          'Super-bright 4,500-nit LTPO 4.0 display is exceptional in direct sunlight.'
        ],
        supportingReviewIds: ['rev-op12r-01', 'rev-op12r-03']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          'Secondary cameras (8MP ultra-wide and 2MP macro) produce soft, grainy shots.',
          'No wireless charging and no telephoto zoom lens.',
          'IP64 rating is limited to splash resistance.'
        ],
        supportingReviewIds: ['rev-op12r-02', 'rev-op12r-04']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'Curved display creates an edge-to-edge feel but divides users who prefer flat screens.'
        ],
        supportingReviewIds: ['rev-op12r-05']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          'Base 128GB version uses UFS 3.1 storage; no wireless charging supported.'
        ],
        supportingReviewIds: ['rev-op12r-02']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 89,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'High consistency among battery testers and mobile gamers.',
      variantCompletenessScore: 88,
      variantNote: 'Clear breakdown between 8GB and 16GB RAM variants.',
      recencyConfidence: 'High',
      recencyNote: 'Strong mid-tier market reception.'
    }
  },

  // 14. OnePlus Nord 4
  {
    id: 'oneplus-nord-4',
    name: 'OnePlus Nord 4',
    brand: 'OnePlus',
    releaseYear: 2024,
    variants: ['128GB - 8GB RAM', '256GB - 12GB RAM', '512GB - 16GB RAM'],
    defaultVariant: '256GB - 12GB RAM',
    priceMSRP: '₹29,999',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02560?w=800&auto=format&fit=crop&q=80',
    category: 'Smartphones',
    specsSummary: {
      display: '6.74" 1.5K AMOLED, 120Hz, 2150 nits, Ultra HDR',
      chipset: 'Snapdragon 7+ Gen 3 (4nm) + Metal Unibody Chassis',
      battery: '5,500 mAh (100W SuperVOOC wired)',
      camera: '50MP Sony LYT-600 OIS + 8MP Ultra-wide',
      weight: '199g',
    },
    sampleRating: 4.4,
    sampleReviewCount: 11,
    dateRange: {
      start: '2024-07-20',
      end: '2024-12-30',
    },
    quickVerdict: 'Unique all-metal unibody craftsmanship rarely seen in modern 5G phones, paired with 100W charging, 6 years of software support, and a huge 5,500 mAh battery at a modest ₹29,999.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'Sleek, sturdy all-metal unibody construction provides exceptional durability and tactile hand feel.',
          'Massive 5,500 mAh battery with 100W fast charging reaching 100% in 28 minutes.',
          'Long software commitment: 4 OS upgrades + 6 years of security patches.'
        ],
        supportingReviewIds: ['rev-nord4-01', 'rev-nord4-03']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          'Metal back prevents wireless charging support.',
          '8MP ultra-wide camera performs poorly in dimmer indoor environments.',
          'No charger included in the European retail box.'
        ],
        supportingReviewIds: ['rev-nord4-02', 'rev-nord4-04']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'Metal body feels cool in winter and warm under high gaming load due to direct heat dissipation.'
        ],
        supportingReviewIds: ['rev-nord4-05']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          'No wireless charging; verify if region includes 100W brick in box.'
        ],
        supportingReviewIds: ['rev-nord4-02']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 86,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'Uniform praise for metal craftsmanship and battery endurance.',
      variantCompletenessScore: 87,
      variantNote: 'Reviewers clearly distinguish 256GB and 512GB storage models.',
      recencyConfidence: 'High',
      recencyNote: 'Strong post-launch tracking in international markets.'
    }
  },

  // 15. Xiaomi 14 Ultra
  {
    id: 'xiaomi-14-ultra',
    name: 'Xiaomi 14 Ultra',
    brand: 'Xiaomi',
    releaseYear: 2024,
    variants: ['512GB - 16GB RAM - Vegan Leather', '1TB - 16GB RAM - Titanium Edition'],
    defaultVariant: '512GB - 16GB RAM - Vegan Leather',
    priceMSRP: '₹99,999',
    imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
    category: 'Smartphones',
    specsSummary: {
      display: '6.73" WQHD+ AMOLED, 1-120Hz LTPO, 3000 nits, Dolby Vision',
      chipset: 'Snapdragon 8 Gen 3 + Dual-Channel IceLoop Cooling',
      battery: '5,000 mAh (90W wired, 80W wireless)',
      camera: 'Leica Quad 50MP (1-inch LYT-900 stepless variable aperture + 3.2x tele + 5x periscope + ultra-wide)',
      weight: '220g',
    },
    sampleRating: 4.7,
    sampleReviewCount: 16,
    dateRange: {
      start: '2024-03-01',
      end: '2025-01-10',
    },
    quickVerdict: 'The quintessential mobile photography flagship featuring a massive 1-inch sensor with stepless mechanical variable aperture, quad 50MP Leica lenses, and 80W wireless charging, balanced against a bulky camera hump.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'Unrivaled 1-inch LYT-900 sensor with stepless f/1.63-f/4.0 aperture creates genuine optical bokeh.',
          'Quad 50MP Leica optics deliver consistent color science across all 4 focal lengths.',
          'Ultra-fast 90W wired and 80W wireless charging speeds.'
        ],
        supportingReviewIds: ['rev-x14u-01', 'rev-x14u-03', 'rev-x14u-05']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          'Enormous circular camera island creates severe top-heaviness in hand.',
          'HyperOS software still carries occasional bloatware in certain regions.',
          'High ₹99,999 import and retail pricing.'
        ],
        supportingReviewIds: ['rev-x14u-02', 'rev-x14u-04']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'Optional Photography Grip accessory: converts phone into real camera, but adds significant bulk.'
        ],
        supportingReviewIds: ['rev-x14u-06']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          'Confirm local cellular band compatibility and warranty coverage if imported.'
        ],
        supportingReviewIds: ['rev-x14u-02']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 94,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'Extensive expert photographer and optical benchmarking verification.',
      variantCompletenessScore: 92,
      variantNote: 'Reviewers accurately distinguish leather vs titanium editions.',
      recencyConfidence: 'High',
      recencyNote: 'Established flagship review baseline.'
    }
  },

  // 16. Xiaomi 14
  {
    id: 'xiaomi-14',
    name: 'Xiaomi 14',
    brand: 'Xiaomi',
    releaseYear: 2024,
    variants: ['256GB - 12GB RAM', '512GB - 12GB RAM'],
    defaultVariant: '256GB - 12GB RAM',
    priceMSRP: '₹69,999',
    imageUrl: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80',
    category: 'Smartphones',
    specsSummary: {
      display: '6.36" 1.5K OLED, 1-120Hz LTPO, 3000 nits, ultra-thin bezels',
      chipset: 'Snapdragon 8 Gen 3 (4nm)',
      battery: '4,610 mAh (90W wired, 50W wireless)',
      camera: 'Triple 50MP Leica (Light Fusion 900 + 75mm Floating Telephoto + Ultra-wide)',
      weight: '193g',
    },
    sampleRating: 4.4,
    sampleReviewCount: 12,
    dateRange: {
      start: '2024-03-15',
      end: '2024-12-28',
    },
    quickVerdict: 'One of the best compact Android flagships, packing Snapdragon 8 Gen 3 power, a versatile 75mm floating telephoto macro lens, and 90W fast charging into a pocketable 6.36-inch chassis.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'Compact 6.36-inch form factor with ultra-narrow symmetric display bezels.',
          'Exceptional 75mm Leica floating telephoto captures stunning portrait and close-up macro shots.',
          '90W wired and 50W wireless charging speeds far exceed compact rivals.'
        ],
        supportingReviewIds: ['rev-x14-01', 'rev-x14-03']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          'Some early units reported camera lens fogging when moving rapidly from cold to hot humid air.',
          'Glossy back is slippery without the included case.',
          'HyperOS notification management can be overly aggressive.'
        ],
        supportingReviewIds: ['rev-x14-02', 'rev-x14-04']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'Leica Authentic vs Vibrant color modes: divides users wanting natural realism vs punchy social media saturation.'
        ],
        supportingReviewIds: ['rev-x14-05']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          'Ensure device is on latest firmware to prevent aggressive background app killing.'
        ],
        supportingReviewIds: ['rev-x14-02']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 88,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'Strong consensus on compact ergonomics and Leica optics.',
      variantCompletenessScore: 89,
      variantNote: 'Reviewers clearly distinguish 256GB and 512GB tiers.',
      recencyConfidence: 'High',
      recencyNote: 'Consistent tracking across European and Asian releases.'
    }
  },

  // 17. Redmi Note 13 Pro+
  {
    id: 'redmi-note-13-pro-plus',
    name: 'Redmi Note 13 Pro+',
    brand: 'Xiaomi / Redmi',
    releaseYear: 2024,
    variants: ['256GB - 8GB RAM', '512GB - 12GB RAM'],
    defaultVariant: '256GB - 8GB RAM',
    priceMSRP: '₹31,999',
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
    category: 'Smartphones',
    specsSummary: {
      display: '6.67" 1.5K Curved AMOLED, 120Hz, 1800 nits, Gorilla Glass Victus',
      chipset: 'MediaTek Dimensity 7200-Ultra (4nm)',
      battery: '5,000 mAh (120W HyperCharge, 100% in 19 mins)',
      camera: '200MP Samsung ISOCELL HP3 OIS + 8MP Ultra-wide + 2MP Macro',
      weight: '204g',
    },
    sampleRating: 4.3,
    sampleReviewCount: 14,
    dateRange: {
      start: '2024-01-20',
      end: '2024-11-25',
    },
    quickVerdict: 'A spec monster in the budget segment boasting a 200MP main camera, IP68 water resistance, curved 1.5K AMOLED screen, and lightning-fast 120W charging for under ₹35,000.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'Incredible 120W HyperCharge fully charges the 5,000 mAh battery in under 20 minutes.',
          'Crisp 200MP main sensor delivers sharp 2x and 4x in-sensor lossless crops.',
          'Flagship IP68 water and dust rating is unprecedented under ₹35,000.'
        ],
        supportingReviewIds: ['rev-rn13p-01', 'rev-rn13p-03']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          'Auxiliary 8MP ultra-wide and 2MP macro cameras do not match the 200MP main lens.',
          'Pre-installed bloatware apps and occasional ads in default system apps.',
          'Curved screen increases cost and complexity of screen protectors.'
        ],
        supportingReviewIds: ['rev-rn13p-02', 'rev-rn13p-04']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'Fusion leather colorway design: hailed as unique by some, considered flashy by others.'
        ],
        supportingReviewIds: ['rev-rn13p-05']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          'Take 10 minutes upon setup to disable promotional app recommendations in MIUI/HyperOS.'
        ],
        supportingReviewIds: ['rev-rn13p-02']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 91,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'Mass volume review corpus with high customer satisfaction.',
      variantCompletenessScore: 90,
      variantNote: 'Reviewers emphasize the value proposition of the 12GB/512GB configuration.',
      recencyConfidence: 'High',
      recencyNote: 'Mature dataset spanning full annual sales cycle.'
    }
  },

  // 18. Nothing Phone (2)
  {
    id: 'nothing-phone-2',
    name: 'Nothing Phone (2)',
    brand: 'Nothing',
    releaseYear: 2023,
    variants: ['128GB - 8GB RAM', '256GB - 12GB RAM', '512GB - 12GB RAM'],
    defaultVariant: '256GB - 12GB RAM',
    priceMSRP: '₹36,999',
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80',
    category: 'Smartphones',
    specsSummary: {
      display: '6.7" LTPO OLED, 1-120Hz, 1600 nits, symmetric bezels',
      chipset: 'Snapdragon 8+ Gen 1 (4nm)',
      battery: '4,700 mAh (45W wired, 15W wireless, Glyph timer LEDs)',
      camera: 'Dual 50MP (Sony IMX890 OIS Main + Samsung JN1 Ultra-wide)',
      weight: '201g',
    },
    sampleRating: 4.4,
    sampleReviewCount: 13,
    dateRange: {
      start: '2023-07-25',
      end: '2024-12-18',
    },
    quickVerdict: 'Distinctive transparent industrial design featuring an interactive Glyph lighting interface, super-clean bloat-free Nothing OS, and snappy Snapdragon 8+ Gen 1 performance.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'Glyph Interface LED system provides glanceable timers, volume indicators, and essential notifications.',
          'Nothing OS delivers one of the cleanest, smoothest, and most unique Android user interfaces.',
          'Solid battery life with balanced 45W wired and 15W wireless charging.'
        ],
        supportingReviewIds: ['rev-np2-01', 'rev-np2-03']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          'IP54 rating only protects against splashes and light rain, not full water immersion.',
          'No dedicated telephoto zoom lens.',
          'Camera low-light processing can struggle with moving subjects.'
        ],
        supportingReviewIds: ['rev-np2-02', 'rev-np2-04']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'Monochrome icon pack aesthetic: design enthusiasts love it; casual users miss colorful app icons.'
        ],
        supportingReviewIds: ['rev-np2-05']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          'Water resistance is splash-proof (IP54); avoid using near pools or heavy downpours.'
        ],
        supportingReviewIds: ['rev-np2-02']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 89,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'Design-centric community reviews with verified hardware feedback.',
      variantCompletenessScore: 91,
      variantNote: 'High share of reviews on 256GB model.',
      recencyConfidence: 'High',
      recencyNote: 'Extensive 18-month software longevity records.'
    }
  },

  // 19. Nothing Phone (2a)
  {
    id: 'nothing-phone-2a',
    name: 'Nothing Phone (2a)',
    brand: 'Nothing',
    releaseYear: 2024,
    variants: ['128GB - 8GB RAM', '256GB - 12GB RAM'],
    defaultVariant: '128GB - 8GB RAM',
    priceMSRP: '₹23,999',
    imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80',
    category: 'Smartphones',
    specsSummary: {
      display: '6.7" Flexible AMOLED, 30-120Hz, 1300 nits, symmetric slim borders',
      chipset: 'Dimensity 7200 Pro custom 4nm chip',
      battery: '5,000 mAh (45W wired, multi-day battery)',
      camera: 'Dual 50MP Main OIS + 50MP Ultra-wide',
      weight: '190g',
    },
    sampleRating: 4.5,
    sampleReviewCount: 14,
    dateRange: {
      start: '2024-03-12',
      end: '2024-12-22',
    },
    quickVerdict: 'A standout budget smartphone that merges iconic transparent design, a smooth 120Hz AMOLED panel with uniform bezels, two-day battery life, and clean Nothing OS software for only ₹23,999.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'Excellent 5,000 mAh battery endurance effortlessly reaching 2 full days of moderate use.',
          'Zero bloatware Nothing OS 2.5 delivers fluid, stutter-free animations.',
          'Dual 50MP camera setup captures sharp daylight photos without useless 2MP filler sensors.'
        ],
        supportingReviewIds: ['rev-np2a-01', 'rev-np2a-03']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          'Transparent plastic back scratches more easily than glass if used without a protective case.',
          'No wireless charging support and no charging brick included in box.',
          'Low-light video recording exhibits moderate digital noise.'
        ],
        supportingReviewIds: ['rev-np2a-02', 'rev-np2a-04']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'Centralized "eyes" camera layout: playful and recognizable, but polarizes minimalist tastes.'
        ],
        supportingReviewIds: ['rev-np2a-05']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          'Apply a protective case or skin to keep the plastic back free from micro-scratches.'
        ],
        supportingReviewIds: ['rev-np2a-02']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 92,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'Broad positive consensus across global budget smartphone roundups.',
      variantCompletenessScore: 89,
      variantNote: 'Reviewers actively discuss the ₹23,999 price-to-performance ratio.',
      recencyConfidence: 'High',
      recencyNote: 'Strong continuous sales tracking.'
    }
  },

  // 20. Motorola Edge 50 Pro
  {
    id: 'moto-edge-50-pro',
    name: 'Motorola Edge 50 Pro',
    brand: 'Motorola',
    releaseYear: 2024,
    variants: ['256GB - 8GB RAM', '256GB - 12GB RAM - Vegan Leather / Pearl Finish'],
    defaultVariant: '256GB - 12GB RAM - Vegan Leather / Pearl Finish',
    priceMSRP: '₹31,999',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
    category: 'Smartphones',
    specsSummary: {
      display: '6.7" 1.5K 144Hz pOLED Curved, 2000 nits, Pantone Validated Colors',
      chipset: 'Snapdragon 7 Gen 3 (4nm)',
      battery: '4,500 mAh (125W TurboPower wired, 50W wireless)',
      camera: '50MP f/1.4 OIS + 10MP 3x Optical Telephoto + 13MP Ultra-wide Macro + 50MP Selfie',
      weight: '186g',
    },
    sampleRating: 4.4,
    sampleReviewCount: 12,
    dateRange: {
      start: '2024-04-10',
      end: '2024-12-15',
    },
    quickVerdict: 'A design and charging triumph featuring a 144Hz Pantone-validated curved screen, genuine 3x optical telephoto lens, IP68 water resistance, and 125W charging with the brick in the box.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'Mind-blowing 125W TurboPower charges the phone from 0 to 100% in just 18 minutes.',
          'Only mid-ranger under ₹35,000 with 50W wireless charging, IP68 rating, and a 3x optical telephoto.',
          'Pantone-validated 144Hz display and handcrafted vegan leather / pearl finish look and feel ultra-luxurious.'
        ],
        supportingReviewIds: ['rev-moto50p-01', 'rev-moto50p-03']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          'Snapdragon 7 Gen 3 performance is good for daily use but trails Snapdragon 8 Gen 2 rivals in raw gaming.',
          '4,500 mAh battery is slightly smaller than the 5,000 mAh industry average.',
          'Motorola software update cadence remains slower than Samsung or Google.'
        ],
        supportingReviewIds: ['rev-moto50p-02', 'rev-moto50p-04']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'Curved 3D glass edges look gorgeous and slim, but increase accidental palm touches.'
        ],
        supportingReviewIds: ['rev-moto50p-05']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          'Expect bi-monthly security patches rather than monthly updates.'
        ],
        supportingReviewIds: ['rev-moto50p-04']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 87,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'Consistent praise for rapid charging and Pantone display accuracy.',
      variantCompletenessScore: 88,
      variantNote: 'Reviewers note the inclusion of the 125W charger in retail boxes.',
      recencyConfidence: 'High',
      recencyNote: 'Strong mid-cycle European and Asian market feedback.'
    }
  },

  // 21. Motorola Razr 50 Ultra
  {
    id: 'moto-razr-50-ultra',
    name: 'Motorola Razr 50 Ultra',
    brand: 'Motorola',
    releaseYear: 2024,
    variants: ['512GB - 12GB RAM - Spring Green / Midnight Blue / Peach Fuzz'],
    defaultVariant: '512GB - 12GB RAM - Spring Green / Midnight Blue / Peach Fuzz',
    priceMSRP: '₹89,999',
    imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
    category: 'Smartphones',
    specsSummary: {
      display: '4.0" External 165Hz LTPO pOLED + 6.9" Internal 165Hz Foldable LTPO',
      chipset: 'Snapdragon 8s Gen 3 + IPX8 water resistance',
      battery: '4,000 mAh (45W wired, 15W wireless)',
      camera: 'Dual 50MP Main OIS + 50MP 2x Telephoto + 32MP Internal Selfie',
      weight: '189g',
    },
    sampleRating: 4.5,
    sampleReviewCount: 14,
    dateRange: {
      start: '2024-06-28',
      end: '2025-01-12',
    },
    quickVerdict: 'The reigning flip foldable champion boasting a fully functional 4.0-inch 165Hz cover screen that runs any app, a nearly invisible hinge crease, and stylish vegan leather colorways.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'Expansive 4.0" cover screen allows typing replies, navigating maps, and running full apps without flipping open.',
          'Hinge mechanism is smooth, sturdy, and leaves almost no perceptible crease on the main screen.',
          'Dual 165Hz LTPO displays provide unmatched motion smoothness inside and out.'
        ],
        supportingReviewIds: ['rev-razr50u-01', 'rev-razr50u-03']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          'Swapped ultra-wide lens for a 2x telephoto, meaning no ultra-wide landscape shots.',
          'Foldable screen requires care against dust and pocket debris (IPX8 is water only, not dust rated).',
          'Battery life is single-day under heavy 165Hz multitasking.'
        ],
        supportingReviewIds: ['rev-razr50u-02', 'rev-razr50u-04']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'Vegan leather exterior in trendy Pantone colors is loved for fashion, but divides strictly utilitarian buyers.'
        ],
        supportingReviewIds: ['rev-razr50u-05']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          'IPX8 rating protects against water immersion, but lacks dust ingress protection for sandy environments.'
        ],
        supportingReviewIds: ['rev-razr50u-02']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 91,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'High consistency among lifestyle creators and foldable early adopters.',
      variantCompletenessScore: 92,
      variantNote: 'Reviewers test cover screen app compatibility extensively.',
      recencyConfidence: 'High',
      recencyNote: 'Strong post-launch tracking.'
    }
  },

  // 22. Realme GT 6
  {
    id: 'realme-gt-6',
    name: 'Realme GT 6',
    brand: 'Realme',
    releaseYear: 2024,
    variants: ['256GB - 8GB RAM', '256GB - 12GB RAM', '512GB - 16GB RAM'],
    defaultVariant: '256GB - 12GB RAM',
    priceMSRP: '₹40,999',
    imageUrl: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80',
    category: 'Smartphones',
    specsSummary: {
      display: '6.78" 1.5K 8T LTPO AMOLED, 1-120Hz, 6000 nits record peak brightness',
      chipset: 'Snapdragon 8s Gen 3 (4nm) + 10,014mm² Dual VC Cooling',
      battery: '5,500 mAh (120W SuperVOOC wired)',
      camera: '50MP Sony LYT-808 OIS + 50MP 2x Telephoto + 8MP Ultra-wide',
      weight: '199g',
    },
    sampleRating: 4.5,
    sampleReviewCount: 13,
    dateRange: {
      start: '2024-06-22',
      end: '2024-12-28',
    },
    quickVerdict: 'A flagship killer engineered for power users featuring a record-breaking 6,000-nit display, a 50MP Sony LYT-808 camera, 120W charging, and Snapdragon 8s Gen 3 at ₹40,999.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'Record 6,000-nit peak HDR brightness makes screen crystal-clear in glaring direct sun.',
          'Massive 5,500 mAh battery with 120W fast charging (50% charge in just 10 minutes).',
          'Flagship-grade Sony LYT-808 main camera captures rich, sharp, dynamic photos.'
        ],
        supportingReviewIds: ['rev-rgt6-01', 'rev-rgt6-03']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          'Glossy mirror finish on the camera stripe attracts visible fingerprints immediately.',
          'No wireless charging support.',
          'IP65 rating is splash resistant rather than fully submersible.'
        ],
        supportingReviewIds: ['rev-rgt6-02', 'rev-rgt6-04']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'Realme UI 5.0 is fast and snappy, but includes bloatware recommendations out of the box.'
        ],
        supportingReviewIds: ['rev-rgt6-05']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          'No wireless charging; take a few minutes to clean up pre-installed apps on first boot.'
        ],
        supportingReviewIds: ['rev-rgt6-02']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 89,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'High praise verified across battery testers and display brightness benchmarks.',
      variantCompletenessScore: 90,
      variantNote: 'Reviewers highlight the value of 12GB/256GB and 16GB/512GB tiers.',
      recencyConfidence: 'High',
      recencyNote: 'Strong tracking across European and Asian launches.'
    }
  }
];

export const SAMPLE_REVIEWS: Review[] = [
  // --- iPhone 16 Pro Max ---
  {
    id: 'rev-ip16pm-01',
    productId: 'iphone-16-pro-max',
    productVariant: '256GB - Grade 5 Titanium',
    author: 'CinemaPro_Alex',
    source: 'Consumer community',
    rating: 5,
    date: '2024-09-28',
    sentiment: 'positive',
    attributes: ['camera', 'performance', 'battery'],
    title: '4K 120fps Dolby Vision and battery life are simply on another level',
    originalText: 'Upgraded from the 14 Pro Max. The 4K120 video capture with log recording has replaced my dedicated mirrorless for quick b-roll. The 6.9-inch screen with slim bezels looks futuristic, and battery life comfortably spans two days of travel.',
    helpfulCount: 68,
    verifiedPurchase: true,
    highlightedPhrase: 'battery life comfortably spans two days of travel'
  },
  {
    id: 'rev-ip16pm-02',
    productId: 'iphone-16-pro-max',
    productVariant: '256GB - Grade 5 Titanium',
    author: 'PocketErgonomics',
    source: 'Consumer community',
    rating: 3,
    date: '2024-10-05',
    sentiment: 'mixed',
    attributes: ['reliability', 'value'],
    title: 'Massive phone that really requires two hands',
    originalText: 'The build quality in Grade 5 Titanium is exquisite, but at 227g and 6.9 inches, this phone pushes the limits of comfortable jeans pockets. 30W charging also feels pedestrian when Android phones are hitting 80W.',
    helpfulCount: 45,
    verifiedPurchase: true,
    highlightedPhrase: 'pushes the limits of comfortable jeans pockets'
  },
  {
    id: 'rev-ip16pm-03',
    productId: 'iphone-16-pro-max',
    productVariant: '512GB - Grade 5 Titanium',
    author: 'David_TechReviews',
    source: 'Retailer website',
    rating: 5,
    date: '2024-10-18',
    sentiment: 'positive',
    attributes: ['battery', 'software', 'performance'],
    title: 'Unstoppable battery endurance and flawless display',
    originalText: 'I routinely finish 18-hour workdays with 45% battery left. ProMotion at 120Hz is buttery smooth and the A18 Pro handles heavy 4K video rendering without generating hot spots.',
    helpfulCount: 39,
    verifiedPurchase: true,
    highlightedPhrase: 'finish 18-hour workdays with 45% battery left'
  },
  {
    id: 'rev-ip16pm-04',
    productId: 'iphone-16-pro-max',
    productVariant: '256GB - Grade 5 Titanium',
    author: 'ValueAuditor',
    source: 'Marketplace',
    rating: 3,
    date: '2024-11-02',
    sentiment: 'negative',
    attributes: ['value', 'performance'],
    title: 'Incredible device but ₹1,44,900 is steep',
    originalText: 'There is no questioning the speed or camera quality, but charging takes over 90 minutes with my standard brick, and ₹1,44,900 is a big investment for incremental upgrades over 15 Pro Max.',
    helpfulCount: 52,
    verifiedPurchase: true,
    highlightedPhrase: 'charging takes over 90 minutes'
  },

  // --- iPhone 16 ---
  {
    id: 'rev-ip16-01',
    productId: 'iphone-16',
    productVariant: '128GB - Standard',
    author: 'TechExplorer_Dan',
    source: 'Consumer community',
    rating: 5,
    date: '2024-09-28',
    sentiment: 'positive',
    attributes: ['performance', 'battery', 'software'],
    title: 'A18 is silky smooth and battery life finally feels dependable',
    originalText: 'Upgraded from an iPhone 13. The A18 chip makes every app switch instantaneous, and battery life comfortably gets me through a 16-hour workday with 30% left. iOS 18 customisation is clean.',
    helpfulCount: 42,
    verifiedPurchase: true,
    highlightedPhrase: 'battery life comfortably gets me through a 16-hour workday'
  },
  {
    id: 'rev-ip16-02',
    productId: 'iphone-16',
    productVariant: '128GB - Standard',
    author: 'DisplayPurist',
    source: 'Consumer community',
    rating: 2,
    date: '2024-10-04',
    sentiment: 'negative',
    attributes: ['value', 'performance'],
    title: '60Hz in 2024 at ₹79,900 is unacceptable',
    originalText: 'I cannot believe Apple is still shipping a 60Hz display on an ₹79,900 flagship. When scrolling alongside my partner’s standard Galaxy S24, the difference in motion fluidity is night and day. Terrible value in that department.',
    helpfulCount: 89,
    verifiedPurchase: true,
    highlightedPhrase: 'cannot believe Apple is still shipping a 60Hz display on an ₹79,900 flagship'
  },
  {
    id: 'rev-ip16-03',
    productId: 'iphone-16',
    productVariant: '256GB - Standard',
    author: 'SarahK_Photos',
    source: 'Retailer website',
    rating: 5,
    date: '2024-10-12',
    sentiment: 'positive',
    attributes: ['camera', 'reliability'],
    title: 'Fusion 48MP captures gorgeous skin tones and textures',
    originalText: 'The main 48MP sensor is a big leap for family portraits. Dynamic range in daylight is flawless, and the new Macro mode on the ultra-wide lens is surprisingly sharp.',
    helpfulCount: 31,
    verifiedPurchase: true,
    highlightedPhrase: 'main 48MP sensor is a big leap for family portraits'
  },
  {
    id: 'rev-ip16-04',
    productId: 'iphone-16',
    productVariant: '128GB - Standard',
    author: 'GripTester',
    source: 'Consumer community',
    rating: 3,
    date: '2024-10-19',
    sentiment: 'mixed',
    attributes: ['camera', 'reliability'],
    title: 'Camera Control button is awkward in portrait mode',
    originalText: 'In landscape orientation, the Camera Control key acts like a dedicated shutter button, but in one-handed portrait mode, reaching it requires shifting your entire grip.',
    helpfulCount: 54,
    verifiedPurchase: true,
    highlightedPhrase: 'reaching it requires shifting your entire grip'
  },

  // --- iPhone 15 ---
  {
    id: 'rev-ip15-01',
    productId: 'iphone-15',
    productVariant: '128GB - Color-Infused Glass',
    author: 'UniversalUSBC',
    source: 'Marketplace',
    rating: 5,
    date: '2024-01-15',
    sentiment: 'positive',
    attributes: ['value', 'reliability', 'software'],
    title: 'USB-C and Dynamic Island make this a superb value now',
    originalText: 'Bought after the price drop. Moving to USB-C eliminated all my proprietary Lightning cables. Dynamic Island is genuinely useful for Uber tracking and flight timers.',
    helpfulCount: 61,
    verifiedPurchase: true,
    highlightedPhrase: 'moving to USB-C eliminated all my proprietary Lightning cables'
  },
  {
    id: 'rev-ip15-02',
    productId: 'iphone-15',
    productVariant: '128GB - Color-Infused Glass',
    author: 'TechAnalyst_Mark',
    source: 'Consumer community',
    rating: 3,
    date: '2024-06-10',
    sentiment: 'mixed',
    attributes: ['software', 'value'],
    title: 'No Apple Intelligence support on standard 15',
    originalText: 'Great everyday phone, but be aware that because it only has 6GB of RAM and an A16 chip, Apple Intelligence AI features are completely excluded.',
    helpfulCount: 78,
    verifiedPurchase: true,
    highlightedPhrase: 'Apple Intelligence AI features are completely excluded'
  },

  // --- Galaxy S24 Ultra ---
  {
    id: 'rev-s24u-01',
    productId: 'galaxy-s24-ultra',
    productVariant: '256GB - Titanium Gray',
    author: 'ProProductivity',
    source: 'Consumer community',
    rating: 5,
    date: '2024-02-14',
    sentiment: 'positive',
    attributes: ['performance', 'camera', 'software'],
    title: 'Anti-reflective display and S-Pen are game changers',
    originalText: 'The Gorilla Armor flat display cuts glare so effectively you can read spreadsheets in direct noon sun without maxing brightness. 5x optical telephoto is sharper than the old 10x sensor.',
    helpfulCount: 84,
    verifiedPurchase: true,
    highlightedPhrase: 'cuts glare so effectively you can read spreadsheets in direct noon sun'
  },
  {
    id: 'rev-s24u-02',
    productId: 'galaxy-s24-ultra',
    productVariant: '256GB - Titanium Gray',
    author: 'ErgonomicCheck',
    source: 'Retailer website',
    rating: 3,
    date: '2024-03-02',
    sentiment: 'mixed',
    attributes: ['reliability', 'value'],
    title: 'Very sharp boxy corners in palm',
    originalText: 'Phenomenal screen and zoom versatility, but the sharp titanium corners dig into my palm during one-handed texting. You definitely need a case to round the edges.',
    helpfulCount: 49,
    verifiedPurchase: true,
    highlightedPhrase: 'sharp titanium corners dig into my palm'
  },

  // --- Galaxy S24 ---
  {
    id: 'rev-s24-01',
    productId: 'galaxy-s24',
    productVariant: '256GB - 8GB RAM',
    author: 'CompactFanatic',
    source: 'Consumer community',
    rating: 5,
    date: '2024-02-18',
    sentiment: 'positive',
    attributes: ['performance', 'camera', 'reliability'],
    title: 'Best compact Android flagship on the market',
    originalText: 'The 120Hz LTPO screen is breathtaking outdoors (2,600 nits). Having a dedicated 3x telephoto lens in a 167g phone is a marvel of packaging.',
    helpfulCount: 57,
    verifiedPurchase: true,
    highlightedPhrase: 'having a dedicated 3x telephoto lens in a 167g phone'
  },
  {
    id: 'rev-s24-02',
    productId: 'galaxy-s24',
    productVariant: '128GB - 8GB RAM',
    author: 'HeavyCommuter',
    source: 'Consumer community',
    rating: 2,
    date: '2024-03-05',
    sentiment: 'negative',
    attributes: ['battery'],
    title: 'Battery life is marginal on heavy 5G days',
    originalText: '4,000 mAh is just too small for heavy mobile data and GPS navigation. By 6 PM I am consistently searching for a charger.',
    helpfulCount: 73,
    verifiedPurchase: true,
    highlightedPhrase: 'by 6 PM I am consistently searching for a charger'
  },

  // --- Galaxy A55 ---
  {
    id: 'rev-a55-01',
    productId: 'galaxy-a55',
    productVariant: '128GB - 8GB RAM',
    author: 'BudgetMaster_Liam',
    source: 'Marketplace',
    rating: 5,
    date: '2024-04-12',
    sentiment: 'positive',
    attributes: ['battery', 'reliability', 'value'],
    title: 'Two-day battery and metal frame feel like an S24',
    originalText: 'Upgraded from an A52. The metal rails feel super premium, and the 5,000 mAh battery easily carries me through two full days of WhatsApp and video calls.',
    helpfulCount: 48,
    verifiedPurchase: true,
    highlightedPhrase: 'battery easily carries me through two full days'
  },

  // --- Pixel 9 Pro XL ---
  {
    id: 'rev-px9pxl-01',
    productId: 'pixel-9-pro-xl',
    productVariant: '256GB - 16GB RAM',
    author: 'ShutterSpeed_Elena',
    source: 'Consumer community',
    rating: 5,
    date: '2024-08-30',
    sentiment: 'positive',
    attributes: ['camera', 'performance', 'software'],
    title: 'The best smartphone camera system ever built',
    originalText: 'Google has perfected the hardware. The satin glass and polished rails feel indestructible. 5x telephoto and AI Video Boost give DSLR-grade results, and 16GB RAM keeps Gemini instantly responsive.',
    helpfulCount: 92,
    verifiedPurchase: true,
    highlightedPhrase: '5x telephoto and AI Video Boost give DSLR-grade results'
  },

  // --- Pixel 9 ---
  {
    id: 'rev-px9-01',
    productId: 'pixel-9',
    productVariant: '128GB - 12GB RAM',
    author: 'AndroidAesthetic',
    source: 'Consumer community',
    rating: 5,
    date: '2024-09-02',
    sentiment: 'positive',
    attributes: ['camera', 'software', 'reliability'],
    title: 'Night Sight and 12GB RAM make this feel truly premium',
    originalText: 'The build quality is a generational leap over Pixel 8. Point-and-shoot camera reliability is flawless, and the 12GB RAM ensures no background app reloads.',
    helpfulCount: 65,
    verifiedPurchase: true,
    highlightedPhrase: 'point-and-shoot camera reliability is flawless'
  },
  {
    id: 'rev-px9-02',
    productId: 'pixel-9',
    productVariant: '128GB - 12GB RAM',
    author: 'GamerGuy_88',
    source: 'Consumer community',
    rating: 2,
    date: '2024-09-15',
    sentiment: 'negative',
    attributes: ['performance', 'value'],
    title: 'Tensor G4 still throttles in high FPS 3D gaming',
    originalText: 'At ₹79,999, the GPU performance lags behind Snapdragon 8 Gen 3. In prolonged Genshin sessions, frame rates drop from 60 to 42 FPS after 20 minutes.',
    helpfulCount: 47,
    verifiedPurchase: true,
    highlightedPhrase: 'frame rates drop from 60 to 42 FPS after 20 minutes'
  },

  // --- Pixel 8a ---
  {
    id: 'rev-px8a-01',
    productId: 'pixel-8a',
    productVariant: '128GB - 8GB RAM',
    author: 'SmartShopper',
    source: 'Retailer website',
    rating: 5,
    date: '2024-06-04',
    sentiment: 'positive',
    attributes: ['value', 'camera', 'software'],
    title: '7 years of updates and flagship camera for ₹52,999',
    originalText: 'There is no other phone under ₹55,000 that takes photos this good. 120Hz screen is bright in daylight, and getting 7 years of Android updates is unheard of at this price.',
    helpfulCount: 71,
    verifiedPurchase: true,
    highlightedPhrase: 'getting 7 years of Android updates is unheard of at this price'
  },

  // --- OnePlus 12 ---
  {
    id: 'rev-op12-01',
    productId: 'oneplus-12',
    productVariant: '256GB - 12GB RAM',
    author: 'SpeedDemon_OP',
    source: 'Consumer community',
    rating: 5,
    date: '2024-02-25',
    sentiment: 'positive',
    attributes: ['battery', 'performance', 'camera'],
    title: '80W charging and 5400mAh battery destroy Samsung & Apple',
    originalText: 'Plug it in for 15 minutes in the morning and you are good for all day. The 64MP periscope zoom is tack sharp, and the 4,500-nit screen is gorgeous.',
    helpfulCount: 88,
    verifiedPurchase: true,
    highlightedPhrase: 'plug it in for 15 minutes in the morning and you are good for all day'
  },
  {
    id: 'rev-op12-02',
    productId: 'oneplus-12',
    productVariant: '256GB - 12GB RAM',
    author: 'WaterproofWorry',
    source: 'Consumer community',
    rating: 3,
    date: '2024-03-12',
    sentiment: 'mixed',
    attributes: ['reliability'],
    title: 'IP65 instead of IP68 is a letdown at ₹64,999',
    originalText: 'Great performance and battery, but curved screen creates occasional edge glare, and IP65 means no full water immersion protection.',
    helpfulCount: 36,
    verifiedPurchase: true,
    highlightedPhrase: 'curved screen creates occasional edge glare'
  },

  // --- OnePlus 12R ---
  {
    id: 'rev-op12r-01',
    productId: 'oneplus-12r',
    productVariant: '128GB - 8GB RAM',
    author: 'EnduranceChamp',
    source: 'Marketplace',
    rating: 5,
    date: '2024-03-01',
    sentiment: 'positive',
    attributes: ['battery', 'performance', 'value'],
    title: '11 hours screen on time on a single charge!',
    originalText: 'The 5,500 mAh battery is ridiculous. I easily get two full days of intensive use. Snapdragon 8 Gen 2 handles every game at locked 60/120fps.',
    helpfulCount: 64,
    verifiedPurchase: true,
    highlightedPhrase: 'easily get two full days of intensive use'
  },

  // --- Xiaomi 14 Ultra ---
  {
    id: 'rev-x14u-01',
    productId: 'xiaomi-14-ultra',
    productVariant: '512GB - 16GB RAM - Vegan Leather',
    author: 'StreetPhotog_Marco',
    source: 'Consumer community',
    rating: 5,
    date: '2024-04-05',
    sentiment: 'positive',
    attributes: ['camera', 'performance'],
    title: 'The variable aperture 1-inch sensor is photographic art',
    originalText: 'Real optical depth of field without fake digital blur algorithms. Stepless variable aperture lets you dial in exact sharpness. The best camera hardware on any phone.',
    helpfulCount: 95,
    verifiedPurchase: true,
    highlightedPhrase: 'real optical depth of field without fake digital blur algorithms'
  },

  // --- Redmi Note 13 Pro+ ---
  {
    id: 'rev-rn13p-01',
    productId: 'redmi-note-13-pro-plus',
    productVariant: '256GB - 8GB RAM',
    author: 'ValueKing_Raj',
    source: 'Marketplace',
    rating: 5,
    date: '2024-02-10',
    sentiment: 'positive',
    attributes: ['battery', 'value', 'camera'],
    title: '120W charging and IP68 under ₹35,000 is unbelievable',
    originalText: 'Goes from 0 to 100% in 19 minutes flat. 200MP camera produces super crisp 4x digital zoom crops for travel photos.',
    helpfulCount: 58,
    verifiedPurchase: true,
    highlightedPhrase: 'goes from 0 to 100% in 19 minutes flat'
  },

  // --- Nothing Phone (2) ---
  {
    id: 'rev-np2-01',
    productId: 'nothing-phone-2',
    productVariant: '256GB - 12GB RAM',
    author: 'DesignArchitect_Cole',
    source: 'Consumer community',
    rating: 5,
    date: '2023-08-15',
    sentiment: 'positive',
    attributes: ['software', 'reliability', 'performance'],
    title: 'Nothing OS and Glyph interface make Android fun again',
    originalText: 'Zero bloatware, distinctive monochrome widgets, and the Glyph timer lights on the back let me leave the phone face-down during meetings.',
    helpfulCount: 52,
    verifiedPurchase: true,
    highlightedPhrase: 'zero bloatware, distinctive monochrome widgets'
  },

  // --- Nothing Phone (2a) ---
  {
    id: 'rev-np2a-01',
    productId: 'nothing-phone-2a',
    productVariant: '128GB - 8GB RAM',
    author: 'BudgetPurist',
    source: 'Retailer website',
    rating: 5,
    date: '2024-04-02',
    sentiment: 'positive',
    attributes: ['value', 'battery', 'software'],
    title: 'The ₹24,000 sweet spot for clean Android software',
    originalText: 'Unmatched 2-day battery life, symmetric display borders, and no garbage 2MP cameras. Nothing OS runs circles around budget competition.',
    helpfulCount: 66,
    verifiedPurchase: true,
    highlightedPhrase: 'unmatched 2-day battery life, symmetric display borders'
  },

  // --- Motorola Edge 50 Pro ---
  {
    id: 'rev-moto50p-01',
    productId: 'moto-edge-50-pro',
    productVariant: '256GB - 12GB RAM',
    author: 'StyleTech_Nora',
    source: 'Retailer website',
    rating: 5,
    date: '2024-05-18',
    sentiment: 'positive',
    attributes: ['battery', 'camera', 'reliability'],
    title: '125W charging, Pantone display, and 3x zoom for ₹31,999',
    originalText: 'Full charge in under 20 minutes with the charger in the box. The vegan leather back feels incredible, and having a dedicated 3x telephoto at ₹31,999 is rare.',
    helpfulCount: 43,
    verifiedPurchase: true,
    highlightedPhrase: 'full charge in under 20 minutes with the charger in the box'
  },

  // --- Motorola Razr 50 Ultra ---
  {
    id: 'rev-razr50u-01',
    productId: 'moto-razr-50-ultra',
    productVariant: '512GB - 12GB RAM',
    author: 'FlipPioneer_Mia',
    source: 'Consumer community',
    rating: 5,
    date: '2024-07-15',
    sentiment: 'positive',
    attributes: ['performance', 'software', 'reliability'],
    title: '4.0" outer screen lets you do 90% of tasks without opening',
    originalText: 'The cover screen is a full 165Hz display that runs any app, keyboard typing is seamless, and the hinge crease is virtually undetectable.',
    helpfulCount: 79,
    verifiedPurchase: true,
    highlightedPhrase: 'cover screen is a full 165Hz display that runs any app'
  },

  // --- Realme GT 6 ---
  {
    id: 'rev-rgt6-01',
    productId: 'realme-gt-6',
    productVariant: '256GB - 12GB RAM',
    author: 'PeakBrightness',
    source: 'Consumer community',
    rating: 5,
    date: '2024-07-08',
    sentiment: 'positive',
    attributes: ['performance', 'battery', 'camera'],
    title: '6000-nit screen and 120W charging is insane value',
    originalText: 'Outdoors under direct tropical sun this display is clearer than any phone I have tested. 5,500 mAh battery easily gives 9+ hours of screen-on time.',
    helpfulCount: 53,
    verifiedPurchase: true,
    highlightedPhrase: 'outdoors under direct tropical sun this display is clearer than any phone'
  }
];

export const ATTRIBUTE_CONFIG: { [key in import('../types').AttributeKey]: { label: string; icon: string; description: string } } = {
  battery: {
    label: 'Battery Life',
    icon: 'BatteryCharging',
    description: 'Day-to-day endurance, charging velocity, thermal drain, and longevity.'
  },
  camera: {
    label: 'Camera Quality',
    icon: 'Camera',
    description: 'Daylight clarity, low-light night sight, zoom flexibility, and shutter speed.'
  },
  reliability: {
    label: 'Reliability',
    icon: 'ShieldCheck',
    description: 'Physical build durability, network reception, crash resistance, and component lifespan.'
  },
  performance: {
    label: 'Performance',
    icon: 'Zap',
    description: 'App multitasking, GPU frame stability, chip thermal management, and display smoothness.'
  },
  value: {
    label: 'Value for Money',
    icon: 'DollarSign',
    description: 'Price-to-feature ratio, base storage sufficiency, trade-in value, and longevity.'
  },
  software: {
    label: 'Software Experience',
    icon: 'Cpu',
    description: 'Operating system polish, AI feature utility, update commitment, and notification handling.'
  }
};

export const PREDEFINED_QA_ITEMS: QAItem[] = [
  // iPhone 16 Pro Max
  {
    id: 'qa-ip16pm-1',
    productId: 'iphone-16-pro-max',
    question: 'Is this phone good for someone who prioritizes battery life?',
    answer: 'Yes, the iPhone 16 Pro Max is among the highest-endurance smartphones available. Simulated reviews indicate heavy users comfortably exceed 30 hours of continuous mixed usage before requiring a top-off.',
    category: 'battery',
    supportingReviewIds: ['rev-ip16pm-01', 'rev-ip16pm-03'],
    confidenceNote: 'High consensus across media creators and business travelers.'
  },
  {
    id: 'qa-ip16pm-2',
    productId: 'iphone-16-pro-max',
    question: 'What are the main drawbacks to consider?',
    answer: 'The primary drawbacks are: (1) Substantial 227g weight and 6.9-inch height making one-handed use difficult; (2) Charging speed peaks around 30W, slower than 80W+ Android rivals; and (3) ₹1,44,900 starting price.',
    category: 'general',
    supportingReviewIds: ['rev-ip16pm-02', 'rev-ip16pm-04'],
    confidenceNote: 'Consistent ergonomic notes across community feedback.'
  },

  // iPhone 16
  {
    id: 'qa-ip16-1',
    productId: 'iphone-16',
    question: 'Is this phone good for someone who prioritizes battery life?',
    answer: 'Yes, the iPhone 16 demonstrates dependable all-day endurance. Reviewers report getting through a 16-hour day with 20-30% remaining, though charging speed remains modest (~25W).',
    category: 'battery',
    supportingReviewIds: ['rev-ip16-01'],
    confidenceNote: 'Supported by buyer reports across consumer community and marketplace sources.'
  },
  {
    id: 'qa-ip16-2',
    productId: 'iphone-16',
    question: 'What are the most common complaints for the iPhone 16?',
    answer: 'The primary complaints are: (1) 60Hz display refresh rate at an ₹79,900 price point; (2) Base 128GB storage filling rapidly with 4K video; and (3) Mixed ergonomics on the Camera Control button.',
    category: 'general',
    supportingReviewIds: ['rev-ip16-02', 'rev-ip16-04'],
    confidenceNote: 'High frequency in sample data; 60Hz complaint appears frequently in community reviews.'
  },

  // Galaxy S24 Ultra
  {
    id: 'qa-s24u-1',
    productId: 'galaxy-s24-ultra',
    question: 'Is this phone good for outdoor sunlight visibility?',
    answer: 'Yes, the Galaxy S24 Ultra features Gorilla Armor anti-reflective glass that dramatically reduces reflection and glare in direct sunlight, combined with a peak 2,600-nit flat display.',
    category: 'performance',
    supportingReviewIds: ['rev-s24u-01'],
    confidenceNote: 'Unanimously praised by outdoor power users.'
  },

  // Galaxy S24
  {
    id: 'qa-s24-1',
    productId: 'galaxy-s24',
    question: 'Is this phone good for someone who prioritizes battery life?',
    answer: 'Only moderately. Due to its compact chassis, the Galaxy S24 houses a 4,000 mAh battery. Moderate users make it through a standard workday, but heavy 5G users frequently need an evening top-up.',
    category: 'battery',
    supportingReviewIds: ['rev-s24-02'],
    confidenceNote: 'Consistent single-day limit under heavy load.'
  },

  // Pixel 9
  {
    id: 'qa-px9-1',
    productId: 'pixel-9',
    question: 'Is this phone good for someone who prioritizes camera quality?',
    answer: 'Yes, computational still photography is widely praised as best-in-class, especially for natural skin tones, zero shutter delay, and Night Sight fidelity.',
    category: 'camera',
    supportingReviewIds: ['rev-px9-01'],
    confidenceNote: 'Derived from photography-specific sample reviews.'
  },

  // OnePlus 12
  {
    id: 'qa-op12-1',
    productId: 'oneplus-12',
    question: 'How fast is the charging on the OnePlus 12?',
    answer: 'Blisteringly fast: with 80W/100W SuperVOOC charging (brick included in box), the 5,400 mAh battery charges from 1% to 100% in approximately 26-30 minutes.',
    category: 'battery',
    supportingReviewIds: ['rev-op12-01'],
    confidenceNote: 'Verified across all hardware charging tests.'
  },

  // Nothing Phone (2a)
  {
    id: 'qa-np2a-1',
    productId: 'nothing-phone-2a',
    question: 'Is the Nothing Phone (2a) good value at ₹23,999?',
    answer: 'Yes, reviewers consistently rank it as the top sub-₹25,000 phone due to its 2-day battery life, zero bloatware software, symmetric display borders, and unique transparent aesthetic.',
    category: 'value',
    supportingReviewIds: ['rev-np2a-01'],
    confidenceNote: 'Strong positive consensus in budget roundups.'
  }
];


