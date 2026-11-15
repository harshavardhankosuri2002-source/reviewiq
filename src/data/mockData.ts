import { Product, Review, QAItem } from '../types';
import { EXTENDED_PRODUCTS, EXTENDED_REVIEWS } from './extendedProducts';

const CORE_PRODUCTS: Product[] = [
  // 1. Apple iPhone 16 Pro Max
  {
    id: 'iphone-16-pro-max',
    name: 'Apple iPhone 16 Pro Max',
    brand: 'Apple',
    releaseYear: 2024,
    variants: ['256GB - Grade 5 Titanium', '512GB - Grade 5 Titanium', '1TB - Grade 5 Titanium'],
    defaultVariant: '256GB - Grade 5 Titanium',
    priceMSRP: '₹1,44,900',
    imageUrl: '/images/products/iphone-16-pro-max.png',
    imageVerified: true,
    colorVariant: 'Desert Titanium',
    officialUrl: 'https://www.apple.com/in/iphone-16-pro/',
    retailerName: 'Apple Store (India)',
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
    imageUrl: '/images/products/iphone-16.png',
    imageVerified: true,
    colorVariant: 'Ultramarine Blue',
    officialUrl: 'https://www.apple.com/in/iphone-16/',
    retailerName: 'Apple Store (India)',
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
    imageUrl: '/images/products/iphone-15.png',
    imageVerified: true,
    colorVariant: 'Blue / Black',
    officialUrl: 'https://www.apple.com/in/shop/buy-iphone/iphone-15',
    retailerName: 'Apple Store (India)',
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
    imageUrl: '/images/products/iphone-se-3.png',
    imageVerified: true,
    colorVariant: 'Midnight Black',
    officialUrl: 'https://www.apple.com/in/shop/buy-iphone/iphone-se',
    retailerName: 'Apple Store (India)',
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
    imageUrl: '/images/products/galaxy-s24-ultra.png',
    imageVerified: true,
    colorVariant: 'Titanium Gray',
    officialUrl: 'https://www.samsung.com/in/smartphones/galaxy-s24-ultra/',
    retailerName: 'Samsung Store (India)',
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
    imageUrl: '/images/products/galaxy-s24.png',
    imageVerified: true,
    colorVariant: 'Onyx Black',
    officialUrl: 'https://www.samsung.com/in/smartphones/galaxy-s24/',
    retailerName: 'Samsung Store (India)',
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
    imageUrl: '/images/products/galaxy-s23-fe.png',
    imageVerified: true,
    colorVariant: 'Mint',
    officialUrl: 'https://www.samsung.com/in/smartphones/galaxy-s23-fe/',
    retailerName: 'Samsung Store (India)',
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
    imageUrl: '/images/products/galaxy-a55.png',
    imageVerified: true,
    colorVariant: 'Awesome Navy',
    officialUrl: 'https://www.samsung.com/in/smartphones/galaxy-a55-5g/',
    retailerName: 'Samsung Store (India)',
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
    imageUrl: '/images/products/pixel-9-pro-xl.png',
    imageVerified: true,
    colorVariant: 'Porcelain White',
    officialUrl: 'https://store.google.com/in/product/pixel_9_pro',
    retailerName: 'Google Store (India)',
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
    imageUrl: '/images/products/pixel-9.png',
    imageVerified: true,
    colorVariant: 'Peony Pink',
    officialUrl: 'https://store.google.com/in/product/pixel_9',
    retailerName: 'Google Store (India)',
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
    imageUrl: '/images/products/pixel-8a.png',
    imageVerified: true,
    colorVariant: 'Bay Blue',
    officialUrl: 'https://store.google.com/in/product/pixel_8a',
    retailerName: 'Google Store (India)',
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
    imageUrl: '/images/products/oneplus-12.png',
    imageVerified: true,
    colorVariant: 'Flowy Emerald',
    officialUrl: 'https://www.oneplus.in/12',
    retailerName: 'OnePlus Store (India)',
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
    imageUrl: '/images/products/oneplus-12r.png',
    imageVerified: true,
    colorVariant: 'Cool Blue',
    officialUrl: 'https://www.oneplus.in/12r',
    retailerName: 'OnePlus Store (India)',
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
    imageUrl: '/images/products/oneplus-nord-4.png',
    imageVerified: true,
    colorVariant: 'Mercurial Silver (Metal Unibody)',
    officialUrl: 'https://www.oneplus.in/nord-4',
    retailerName: 'OnePlus Store (India)',
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
    imageUrl: '/images/products/xiaomi-14-ultra.png',
    imageVerified: true,
    colorVariant: 'Black Vegan Leather',
    officialUrl: 'https://www.mi.com/in/product/xiaomi-14-ultra/',
    retailerName: 'Xiaomi Store (India)',
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
    imageUrl: '/images/products/xiaomi-14.png',
    imageVerified: true,
    colorVariant: 'Jade Green',
    officialUrl: 'https://www.mi.com/in/product/xiaomi-14/',
    retailerName: 'Xiaomi Store (India)',
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
    imageUrl: '/images/products/redmi-note-13-pro-plus.png',
    imageVerified: true,
    colorVariant: 'Fusion Purple',
    officialUrl: 'https://www.mi.com/in/product/redmi-note-13-pro-plus-5g/',
    retailerName: 'Xiaomi Store (India)',
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
    imageUrl: '/images/products/nothing-phone-2.png',
    imageVerified: true,
    colorVariant: 'Dark Grey (Glyph Interface)',
    officialUrl: 'https://in.nothing.tech/products/phone-2',
    retailerName: 'Nothing Store (India)',
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
    imageUrl: '/images/products/nothing-phone-2a.png',
    imageVerified: true,
    colorVariant: 'Milk White (Eyes Layout)',
    officialUrl: 'https://in.nothing.tech/products/phone-2a',
    retailerName: 'Nothing Store (India)',
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
    imageUrl: '/images/products/moto-edge-50-pro.png',
    imageVerified: true,
    colorVariant: 'Luxe Lavender (Vegan Leather)',
    officialUrl: 'https://www.motorola.in/smartphones-motorola-edge-50-pro/p',
    retailerName: 'Motorola Store (India)',
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
    imageUrl: '/images/products/moto-razr-50-ultra.png',
    imageVerified: true,
    colorVariant: 'Spring Green (Foldable)',
    officialUrl: 'https://www.motorola.in/smartphones-motorola-razr-50-ultra/p',
    retailerName: 'Motorola Store (India)',
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
    imageUrl: '/images/products/realme-gt-6.png',
    imageVerified: true,
    colorVariant: 'Fluid Silver',
    officialUrl: 'https://buy.realme.com/in/goods/704',
    retailerName: 'Realme Store (India)',
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
  },

  // 21. Sony WH-1000XM5
  {
    id: 'sony-wh1000xm5',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    releaseYear: 2023,
    variants: ['Black', 'Silver', 'Midnight Blue'],
    defaultVariant: 'Black',
    priceMSRP: '₹29,990',
    imageUrl: '/images/products/sony-wh1000xm5.png',
    imageVerified: true,
    colorVariant: 'Black',
    officialUrl: 'https://www.sony.co.in/headphones/products/wh-1000xm5',
    retailerName: 'Sony Center / Retailers',
    category: 'Headphones',
    specsSummary: {
      battery: '30 hrs (ANC on) / 40 hrs (ANC off)',
      weight: '250g',
      anc: 'Auto NC Optimizer (V1 + QN1 processors)',
      driver: '30mm Carbon Fiber composite dome',
      connectivity: 'Bluetooth 5.2, LDAC, Multipoint, 3.5mm jack',
    },
    sampleRating: 4.6,
    sampleReviewCount: 8,
    dateRange: {
      start: '2023-06-10',
      end: '2024-11-20',
    },
    quickVerdict: 'Industry reference active noise cancellation and featherlight 250g comfort with LDAC high-res audio, though the non-folding headband design occupies more backpack space than the predecessor XM4.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'Unrivaled cabin drone and office chatter reduction powered by dual V1/QN1 chips.',
          'Featherlight 250g weight with soft-fit synthetic leather minimizes ear fatigue.',
          'Seamless multipoint Bluetooth pairing between laptop and phone with 30-hour stamina.'
        ],
        supportingReviewIds: ['rev-sony-01', 'rev-sony-03', 'rev-sony-05']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          'Hinges no longer fold inward into a compact ball; larger carrying case occupies significant travel bag volume.',
          'Auto-ANC optimization occasionally shifts intensity unexpectedly during transit head movements.',
          'Ear cushions get warm during summer commutes.'
        ],
        supportingReviewIds: ['rev-sony-02', 'rev-sony-04']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'Touch sensor gestures on right earcup: intuitive for some, prone to accidental brushes when adjusting fit for others.',
          'Slightly slimmer headband padding compared to the plusher XM4.'
        ],
        supportingReviewIds: ['rev-sony-06']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          'Does not fold into a compact shape; check carrying case dimensions if you travel with compact backpacks.',
          'LDAC high-res codec is exclusive to Android and Windows; iOS defaults to AAC.'
        ],
        supportingReviewIds: ['rev-sony-02', 'rev-sony-07']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 94,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'High consensus corroborated across audiophile forums and retail buyers.',
      variantCompletenessScore: 92,
      variantNote: 'Reviewers distinguish between Black, Silver, and Midnight Blue finishes.',
      recencyConfidence: 'High',
      recencyNote: 'Extensive multi-year verification across multiple firmware versions.'
    }
  },

  // 22. Bose QuietComfort Ultra
  {
    id: 'bose-qc-ultra',
    name: 'Bose QuietComfort Ultra',
    brand: 'Bose',
    releaseYear: 2024,
    variants: ['Black', 'White Smoke', 'Sandstone'],
    defaultVariant: 'Black',
    priceMSRP: '₹35,900',
    imageUrl: '/images/products/bose-qc-ultra.png',
    imageVerified: true,
    colorVariant: 'Black',
    officialUrl: 'https://www.bose.com/p/headphones/bose-quietcomfort-ultra-headphones',
    retailerName: 'Bose Store & Authorized Partners',
    category: 'Headphones',
    specsSummary: {
      battery: '24 hrs (standard) / 18 hrs (Immersive Audio)',
      weight: '253g',
      anc: 'CustomTune World-Class ANC + Aware Mode',
      driver: 'Custom Bose High-Excursion Transducers',
      connectivity: 'Bluetooth 5.3, Snapdragon Sound, aptX Adaptive',
    },
    sampleRating: 4.5,
    sampleReviewCount: 8,
    dateRange: {
      start: '2023-10-15',
      end: '2024-12-05',
    },
    quickVerdict: 'The reigning champion of long-haul travel comfort and low-frequency aircraft cabin noise cancellation, with a foldable hinge design, offset by a shorter 24-hour battery life and occasional pop sounds on Bluetooth reconnect.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'Plush memory foam earcups and gentle clamping force provide unmatched 8+ hour flight comfort.',
          'Class-leading active noise cancellation eliminates jet engine hum effortlessly.',
          'Retains a sturdy folding hinge design that collapses into an ultra-compact travel case.'
        ],
        supportingReviewIds: ['rev-bose-01', 'rev-bose-03', 'rev-bose-05']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          'Battery life tops out at 24 hours (drops to ~18 hours with Immersive Audio on), trailing Sony 30 hours.',
          'Bose Music app occasionally experiences Bluetooth sync delays during initial morning wake-up.',
          'Volume slider strip on earcup is overly sensitive to accidental finger grazes.'
        ],
        supportingReviewIds: ['rev-bose-02', 'rev-bose-04']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'Bose Immersive Audio spatializer: captivating for orchestral music and movies, slightly echoey for podcasts and audiobooks.'
        ],
        supportingReviewIds: ['rev-bose-06']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          'Enabling Bose Immersive Audio significantly penalizes battery duration by 25%.',
          'Fast charging provides 2.5 hours in 15 mins, but standard USB-C full recharge requires ~3 hours.'
        ],
        supportingReviewIds: ['rev-bose-02', 'rev-bose-07']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 91,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'Consistent feedback between frequent flyers and audio lab benchmarks.',
      variantCompletenessScore: 88,
      variantNote: 'Color choices and firmware versions clearly specified by verified purchasers.',
      recencyConfidence: 'High',
      recencyNote: 'Strong post-launch tracking with firmware v1.4 stability verified.'
    }
  },

  // 23. Apple AirPods Max (USB-C)
  {
    id: 'airpods-max',
    name: 'Apple AirPods Max (USB-C)',
    brand: 'Apple',
    releaseYear: 2024,
    variants: ['Midnight', 'Starlight', 'Space Gray', 'Sky Blue', 'Orange'],
    defaultVariant: 'Midnight',
    priceMSRP: '₹59,900',
    imageUrl: '/images/products/airpods-max.png',
    imageVerified: true,
    colorVariant: 'Midnight',
    officialUrl: 'https://www.apple.com/in/airpods-max/',
    retailerName: 'Apple Store & Premium Resellers',
    category: 'Headphones',
    specsSummary: {
      battery: '20 hrs (ANC on with Spatial Audio)',
      weight: '386g',
      anc: 'Computational ANC with Natural Transparency Mode',
      driver: '40mm Apple-designed Dynamic Driver with Dual H1 Chips',
      connectivity: 'Bluetooth 5.0, USB-C lossless audio, Handoff',
    },
    sampleRating: 4.4,
    sampleReviewCount: 8,
    dateRange: {
      start: '2024-09-20',
      end: '2025-01-15',
    },
    quickVerdict: 'Unrivaled aluminum and breathable knit-mesh luxury build, industry-benchmark natural Transparency Mode, and USB-C audio, tempered by a heavy 386g footprint, lack of a physical power switch, and a minimalist Smart Case.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Most Appreciated Features',
        points: [
          'Transparency Mode sounds completely natural, allowing effortless conversation without removing headphones.',
          'Exquisite acoustic fidelity with distortion-free sub-bass and crisp instrument separation.',
          'Flawless Apple ecosystem integration with instantaneous switching between Mac, iPad, and iPhone.'
        ],
        supportingReviewIds: ['rev-apm-01', 'rev-apm-03', 'rev-apm-05']
      },
      commonComplaints: {
        title: 'Common Complaints',
        points: [
          'Substantial 386g weight can cause neck and crown pressure during long work sessions exceeding 3 hours.',
          'Absence of an off switch: headphones rely entirely on low-power standby inside the Smart Case.',
          'High premium price point of ₹59,900 without included 3.5mm analog cable or hard case.'
        ],
        supportingReviewIds: ['rev-apm-02', 'rev-apm-04']
      },
      mixedOpinions: {
        title: 'Mixed / Conflicting Opinions',
        points: [
          'Digital Crown volume dial: beloved for tactile precision by watch users, occasionally snagged on shirt collars when reclined.',
          'Smart Case design continues to polarize aesthetic opinions across community forums.'
        ],
        supportingReviewIds: ['rev-apm-06']
      },
      importantCaveats: {
        title: 'Important Caveats Before Buying',
        points: [
          'Weighs 386g—more than 50% heavier than Sony XM5 (250g) and Bose Ultra (253g). Test headband fit before purchasing.',
          'Advanced head-tracked Spatial Audio and fast pairing require Apple devices; functionality on Android is basic SBC/AAC.'
        ],
        supportingReviewIds: ['rev-apm-02', 'rev-apm-07']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 89,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'Consensus verified across studio music producers and Apple ecosystem buyers.',
      variantCompletenessScore: 94,
      variantNote: 'Reviewers clearly designate the new 2024 USB-C variant vs legacy Lightning.',
      recencyConfidence: 'High',
      recencyNote: 'Extensive tracking following the USB-C fall release.'
    }
  },
  // ==========================================
  // LAPTOPS (4 Premium Flagships)
  // ==========================================
  {
    id: 'macbook-pro-16',
    name: 'Apple MacBook Pro 16 (M3 Max)',
    brand: 'Apple',
    releaseYear: 2024,
    variants: ['36GB RAM - 1TB SSD - Space Black', '48GB RAM - 1TB SSD - Space Black', '64GB RAM - 2TB SSD - Silver', '128GB RAM - 4TB SSD - Space Black'],
    defaultVariant: '48GB RAM - 1TB SSD - Space Black',
    priceMSRP: '₹3,49,900',
    imageUrl: '/images/products/macbook-pro-16.png',
    imageVerified: true,
    colorVariant: 'Space Black',
    officialUrl: 'https://www.apple.com/in/macbook-pro-16/',
    retailerName: 'Apple Authorized Premium Stores',
    category: 'Laptops',
    specsSummary: {
      display: '16.2" Liquid Retina XDR (3456x2234), 120Hz ProMotion, 1,600 nits peak HDR',
      chipset: 'Apple M3 Max (16-core CPU, 40-core GPU, 16-core Neural Engine)',
      battery: '22 hrs video playback (100Wh lithium-polymer with 140W USB-C GaN fast charge)',
      weight: '2.16 kg (4.8 lbs) anodized aluminum unibody',
      ports: '3x Thunderbolt 4 (USB-C), HDMI 2.1, SDXC card slot, MagSafe 3, 3.5mm headphone',
    },
    sampleRating: 4.8,
    sampleReviewCount: 14,
    dateRange: {
      start: '2024-01-10',
      end: '2025-01-20',
    },
    quickVerdict: 'The apex mobile workstation: staggering M3 Max sustained CPU/GPU compute that matches desktop rigs on battery power alone, paired with a reference Mini-LED display and peerless battery endurance.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Industry-Dominating Workstation Strengths',
        points: [
          'Unthrottled sustained compute: Compiles multi-million line codebases and exports 8K ProRes footage with virtually zero fan noise.',
          'Legendary battery endurance: Consistently yields 14 to 18 hours of intensive coding, Docker containers, and creative multitasking off the wall plug.',
          'Reference Liquid Retina XDR display: 1,600 nits peak HDR brightness with 1,000,000:1 contrast and true 120Hz ProMotion smoothness.'
        ],
        supportingReviewIds: ['rev-mbp16-01', 'rev-mbp16-03']
      },
      commonComplaints: {
        title: 'Observed Ergonomic & Portability Trade-offs',
        points: [
          'Substantial carrying heft: At 2.16 kg plus the 140W power brick, daily briefcase commute requires genuine commitment.',
          'Premium pricing tier: Configured with 48GB+ unified memory, it represents a substantial enterprise investment.'
        ],
        supportingReviewIds: ['rev-mbp16-02']
      },
      mixedOpinions: {
        title: 'Contested Finish & Port Quirks',
        points: [
          'Space Black anodization significantly resists fingerprints compared to Midnight, though faint palm oils remain noticeable under direct downlighting.'
        ],
        supportingReviewIds: ['rev-mbp16-04']
      },
      importantCaveats: {
        title: 'Hardware Upgradeability Constraints',
        points: [
          'Memory and SSD are soldered onto Apple Silicon substrate; RAM and storage must be accurately projected at initial purchase.'
        ],
        supportingReviewIds: ['rev-mbp16-02']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 94,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'Consensus verified across professional audio engineers, iOS developers, and VFX studios.',
      variantCompletenessScore: 96,
      variantNote: 'All RAM and M3 Max core configurations (36GB through 128GB) clearly differentiated.',
      recencyConfidence: 'High',
      recencyNote: 'Extensive tracking across macOS Sonoma and Sequoia workstation releases.'
    }
  },

  {
    id: 'dell-xps-16',
    name: 'Dell XPS 16 (9640)',
    brand: 'Dell',
    releaseYear: 2024,
    variants: ['Core Ultra 7 - 16GB - 512GB - RTX 4050', 'Core Ultra 7 - 32GB - 1TB - RTX 4060', 'Core Ultra 9 - 32GB - 1TB - RTX 4070 - OLED'],
    defaultVariant: 'Core Ultra 9 - 32GB - 1TB - RTX 4070 - OLED',
    priceMSRP: '₹2,69,990',
    imageUrl: '/images/products/dell-xps-16.png',
    imageVerified: true,
    colorVariant: 'Platinum Silver',
    officialUrl: 'https://www.dell.com/en-in/shop/dell-laptops/xps-16-laptop/spd/xps-16-9640-laptop',
    retailerName: 'Dell Exclusive Outlets & Enterprise Direct',
    category: 'Laptops',
    specsSummary: {
      display: '16.3" 4K+ (3840x2400) InfinityEdge OLED Touch, 100% DCI-P3, 400 nits, Gorilla Glass 3',
      chipset: 'Intel Core Ultra 9 185H (16 cores, 22 threads, up to 5.1GHz with Intel AI Boost NPU)',
      battery: '99.5Wh battery with 130W USB-C Type-C ExpressCharge (8-10 hrs productivity)',
      weight: '2.13 kg (4.7 lbs) CNC machined aluminum and glass',
      gpu: 'NVIDIA GeForce RTX 4070 Laptop GPU (8GB GDDR6, 60W TGP)',
    },
    sampleRating: 4.3,
    sampleReviewCount: 10,
    dateRange: {
      start: '2024-03-15',
      end: '2025-01-18',
    },
    quickVerdict: 'A futuristic design masterpiece with edge-to-edge glass palm rest, seamless capacitive touch function row, and drop-dead gorgeous 4K OLED display, offset by polarising zero-lattice key travel and high power draw.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Futuristic Industrial Engineering',
        points: [
          'Sensational 4K+ OLED InfinityEdge touch panel delivering infinite black levels and vibrant creative color accuracy.',
          'Seamless haptic glass trackpad built directly into the continuous glass palm rest with no visible seams.',
          'Robust RTX 4070 graphic rendering capability in a remarkably slim unibody chassis.'
        ],
        supportingReviewIds: ['rev-xps16-01', 'rev-xps16-03']
      },
      commonComplaints: {
        title: 'Ergonomic Learning Curve & Ports',
        points: [
          'Capacitive touch function/escape keys lack tactile mechanical rebound, triggering occasional accidental presses.',
          'Elimination of USB-A and full-size HDMI forces constant reliance on the included dongles.'
        ],
        supportingReviewIds: ['rev-xps16-02']
      },
      mixedOpinions: {
        title: 'Keyboard Zero-Lattice Typing Experience',
        points: [
          'Flat keycaps with minimal spacing divide opinion: ultra-fast for light typists, but prone to mistypes during blind speed transcription.'
        ],
        supportingReviewIds: ['rev-xps16-01', 'rev-xps16-02']
      },
      importantCaveats: {
        title: 'Thermal Throttling on Heavy Loads',
        points: [
          'Under simultaneous 100% CPU+GPU loads, fan profiles run audibly high and keyboard deck warms up around center.'
        ],
        supportingReviewIds: ['rev-xps16-03']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 88,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'Verified across corporate IT deployments and creative workstation benchmarks.',
      variantCompletenessScore: 92,
      variantNote: 'Reviewers distinguish between FHD+ IPS base models and 4K+ OLED premium trims.',
      recencyConfidence: 'High',
      recencyNote: 'Continuous BIOS update and driver stability tracking throughout 2024-2025.'
    }
  },

  {
    id: 'rog-zephyrus-g14',
    name: 'ASUS ROG Zephyrus G14 (2024)',
    brand: 'ASUS',
    releaseYear: 2024,
    variants: ['Ryzen 9 8945HS - 16GB - 1TB - RTX 4060', 'Ryzen 9 8945HS - 32GB - 1TB - RTX 4070 - Platinum White', 'Ryzen 9 8945HS - 32GB - 1TB - RTX 4070 - Eclipse Gray'],
    defaultVariant: 'Ryzen 9 8945HS - 32GB - 1TB - RTX 4070 - Eclipse Gray',
    priceMSRP: '₹1,74,990',
    imageUrl: '/images/products/rog-zephyrus-g14.png',
    imageVerified: true,
    colorVariant: 'Eclipse Gray',
    officialUrl: 'https://rog.asus.com/in/laptops/rog-zephyrus/rog-zephyrus-g14-2024/',
    retailerName: 'ASUS ROG Stores & Major Online Platforms',
    category: 'Laptops',
    specsSummary: {
      display: '14.0" 3K (2880x1800) 120Hz 0.2ms ROG Nebula OLED, 100% DCI-P3, G-SYNC, VESA DisplayHDR True Black 500',
      chipset: 'AMD Ryzen 9 8945HS (8 cores/16 threads, up to 5.2GHz, Ryzen AI NPU)',
      battery: '73Wh battery (up to 8-9 hrs light productivity, 100W USB-C PD / 180W slim adapter)',
      weight: '1.50 kg (3.31 lbs) CNC aluminum unibody',
      gpu: 'NVIDIA GeForce RTX 4070 Laptop GPU (8GB GDDR6, 90W TGP with ROG Boost)',
    },
    sampleRating: 4.6,
    sampleReviewCount: 12,
    dateRange: {
      start: '2024-02-20',
      end: '2025-01-15',
    },
    quickVerdict: 'The reigning benchmark for compact 14-inch creative and gaming ultrabooks: breathtaking 3K 120Hz OLED screen, precision CNC unibody, and whisper-quiet daily battery life in a featherlight 1.5kg package.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Class-Leading Compact Versatility',
        points: [
          'Spectacular 3K 120Hz OLED with 0.2ms response time and G-SYNC delivers zero-ghosting gaming and studio color accuracy.',
          'Featherlight 1.5kg chassis with Slash Lighting LED slash bar on lid offers clean, non-gamery executive aesthetics.',
          'Outstanding 6-speaker acoustic system with force-cancelling woofers rivals MacBook Pro 14 audio quality.'
        ],
        supportingReviewIds: ['rev-g14-01', 'rev-g14-03']
      },
      commonComplaints: {
        title: 'Memory Upgradeability Limitation',
        points: [
          'LPDDR5X RAM is completely soldered to board; users must purchase the 32GB model upfront for futureproofing.',
          'Under full 90W GPU gaming load, the aluminum deck above the keyboard becomes hot to the touch.'
        ],
        supportingReviewIds: ['rev-g14-02']
      },
      mixedOpinions: {
        title: '90W TGP Ceiling vs Bulkier Rigs',
        points: [
          'Power-capped at 90W TGP to preserve the 1.59cm thickness, yielding 8-12% lower raw FPS than thick 140W gaming tanks.'
        ],
        supportingReviewIds: ['rev-g14-01']
      },
      importantCaveats: {
        title: 'OLED Care in Extended Desktop Use',
        points: [
          'OLED panel requires enabling ASUS OLED Care (pixel shift and hide taskbar) to eliminate static UI image burn-in risk.'
        ],
        supportingReviewIds: ['rev-g14-02']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 92,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'Independent validation from hardware reviewers and traveling creative professionals.',
      variantCompletenessScore: 90,
      variantNote: 'Reviewers clearly separate the RTX 4060 16GB tier from the RTX 4070 32GB tier.',
      recencyConfidence: 'High',
      recencyNote: 'Extensive post-launch BIOS and AMD AGESA firmware stability verified.'
    }
  },

  {
    id: 'thinkpad-x1-carbon',
    name: 'Lenovo ThinkPad X1 Carbon Gen 12',
    brand: 'Lenovo',
    releaseYear: 2024,
    variants: ['Core Ultra 5 125U - 16GB - 512GB', 'Core Ultra 7 155H - 32GB - 1TB SSD - IPS', 'Core Ultra 7 155H - 32GB - 1TB SSD - 2.8K OLED 120Hz'],
    defaultVariant: 'Core Ultra 7 155H - 32GB - 1TB SSD - 2.8K OLED 120Hz',
    priceMSRP: '₹1,98,900',
    imageUrl: '/images/products/thinkpad-x1-carbon.png',
    imageVerified: true,
    colorVariant: 'Deep Black',
    officialUrl: 'https://www.lenovo.com/in/en/p/laptops/thinkpad/thinkpadx1/thinkpad-x1-carbon-gen-12-(14-inch-intel)/len101t0083',
    retailerName: 'Lenovo Commercial & Enterprise Channels',
    category: 'Laptops',
    specsSummary: {
      display: '14.0" 2.8K (2880x1800) OLED 120Hz, 400 nits, 100% DCI-P3, DisplayHDR True Black 500',
      chipset: 'Intel Core Ultra 7 155H (16 cores, 22 threads, up to 4.8GHz, Intel AI Boost)',
      battery: '57Wh battery with Rapid Charge (80% in 60 mins), up to 11 hrs productivity',
      weight: '1.09 kg (2.42 lbs) ultralight carbon fiber + recycled magnesium',
      ports: '2x Thunderbolt 4, 2x USB-A 3.2 Gen 1, HDMI 2.1, 3.5mm audio jack, Nano-SIM slot',
    },
    sampleRating: 4.5,
    sampleReviewCount: 11,
    dateRange: {
      start: '2024-04-10',
      end: '2025-01-20',
    },
    quickVerdict: 'The quintessential enterprise business road-warrior ultralight: featherlight 1.09kg aerospace carbon-fiber body, glorious 2.8K OLED option, legendary typing ergonomics, and MIL-SPEC durability.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Masterclass Business Ergonomics',
        points: [
          'Incredible 1.09kg weight allows one-finger lifting while maintaining MIL-STD-810H structural rigidity.',
          'World-renowned keyboard feel with tactile 1.5mm travel and iconic TrackPoint red navigation nub.',
          'Full enterprise legacy port selection (Thunderbolt 4, native HDMI, and dual USB-A) without dongles.'
        ],
        supportingReviewIds: ['rev-x1c-01', 'rev-x1c-03']
      },
      commonComplaints: {
        title: 'OLED Battery Penalty',
        points: [
          'The 2.8K 120Hz OLED screen draws significantly more power than the standard 400-nit low-power IPS panel, reducing battery life by ~2.5 hours.',
          'Integrated Intel Arc graphics are great for productivity and 4K displays, but unsuitable for heavy AAA 3D gaming.'
        ],
        supportingReviewIds: ['rev-x1c-02']
      },
      mixedOpinions: {
        title: 'New Communications Bar Notch',
        points: [
          'Raised camera bar lip facilitates one-hand lid opening and houses 8MP webcam, though aesthetic purists prefer flush bezels.'
        ],
        supportingReviewIds: ['rev-x1c-01']
      },
      importantCaveats: {
        title: 'Thermal Tuning in Ultralight Chassis',
        points: [
          'Performance profiles favor quiet operation; heavy sustain multi-core exports will settle power down to ~28W.'
        ],
        supportingReviewIds: ['rev-x1c-02']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 91,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'Consistently validated by Fortune 500 IT directors and executive frequent travelers.',
      variantCompletenessScore: 93,
      variantNote: 'IPS and OLED display trims are comprehensively documented with real-world battery deltas.',
      recencyConfidence: 'High',
      recencyNote: 'Extensive tracking through Intel Core Ultra Meteor Lake platform firmware matures.'
    }
  },

  // ==========================================
  // WEARABLES (3 Pro Adventure Smartwatches)
  // ==========================================
  {
    id: 'apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2',
    brand: 'Apple',
    releaseYear: 2024,
    variants: ['49mm Natural Titanium - Ocean Band', '49mm Natural Titanium - Trail Loop', '49mm Black Titanium - Alpine Loop'],
    defaultVariant: '49mm Black Titanium - Alpine Loop',
    priceMSRP: '₹89,900',
    imageUrl: '/images/products/apple-watch-ultra-2.png',
    imageVerified: true,
    colorVariant: 'Black Titanium',
    officialUrl: 'https://www.apple.com/in/apple-watch-ultra-2/',
    retailerName: 'Apple Store & Premium Resellers',
    category: 'Wearables',
    specsSummary: {
      display: '49mm Always-On Retina LTPO OLED, 3,000 nits peak, Sapphire crystal front, Flat glass',
      chipset: 'Apple S9 SiP with 64-bit dual-core processor, 4-core Neural Engine, Precision Finding UWB',
      battery: 'Up to 36 hours standard use / 72 hours in Low Power Mode (fast magnetic charging)',
      weight: '61.4g (case only in Aerospace Grade 5 Titanium)',
      waterResistance: '100m water resistant, 40m recreational dive computer EN13319 certified with Oceanic+',
    },
    sampleRating: 4.7,
    sampleReviewCount: 16,
    dateRange: {
      start: '2024-09-20',
      end: '2025-01-20',
    },
    quickVerdict: 'The ultimate smartwatch for iPhone owners: indestructible 49mm titanium enclosure, blinding 3,000-nit flat display, multi-day battery endurance, and seamless on-device Siri & Double Tap gesture control.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Extreme Durability & Outdoor Readability',
        points: [
          'Blinding 3,000 nits peak brightness remains flawlessly legible under direct blazing high-noon sunlight.',
          'Solid 2 to 3 days real-world battery life without battery anxiety, extending to 72 hours with low-power workouts.',
          'Convenient on-device Siri processing and intuitive Double Tap one-handed finger pinch gesture.'
        ],
        supportingReviewIds: ['rev-awu2-01', 'rev-awu2-03']
      },
      commonComplaints: {
        title: 'Substantial 49mm Wrist Footprint',
        points: [
          '49mm case width and 14.4mm thickness can feel oversized and catch on dress shirt cuffs on slender wrists (<165mm).',
          'Sleep tracking comfort requires swapping heavy silicone dive bands for the lightweight Trail Loop fabric band.'
        ],
        supportingReviewIds: ['rev-awu2-02']
      },
      mixedOpinions: {
        title: 'Action Button Customization Scope',
        points: [
          'Orange Action button is beloved for instant workout/stopwatch start, though deep third-party app shortcut menus remain somewhat rigid.'
        ],
        supportingReviewIds: ['rev-awu2-04']
      },
      importantCaveats: {
        title: 'Platform Exclusivity',
        points: [
          'Strictly non-functional with Android smartphones; requires an iPhone XS or later running modern iOS.'
        ],
        supportingReviewIds: ['rev-awu2-02']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 95,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'Consensus verified by ultra-marathon runners, scuba divers, and daily tech enthusiasts.',
      variantCompletenessScore: 97,
      variantNote: 'Reviewers differentiate between the 2024 Black Titanium finish and original Natural Titanium.',
      recencyConfidence: 'High',
      recencyNote: 'Continuous tracking across watchOS 11 fitness features.'
    }
  },

  {
    id: 'galaxy-watch-ultra',
    name: 'Samsung Galaxy Watch Ultra',
    brand: 'Samsung',
    releaseYear: 2024,
    variants: ['47mm LTE - Titanium Gray', '47mm LTE - Titanium Silver', '47mm LTE - Titanium White'],
    defaultVariant: '47mm LTE - Titanium Gray',
    priceMSRP: '₹59,999',
    imageUrl: '/images/products/galaxy-watch-ultra.png',
    imageVerified: true,
    colorVariant: 'Titanium Gray',
    officialUrl: 'https://www.samsung.com/in/watches/galaxy-watch-ultra/',
    retailerName: 'Samsung Official Online & Flagship Experience Stores',
    category: 'Wearables',
    specsSummary: {
      display: '1.5" Super AMOLED (480x480), 3,000 nits peak, Sapphire Crystal glass, Cushion Case',
      chipset: 'Exynos W1000 (3nm Penta-core processor, Mali-G68 GPU, 2GB RAM + 32GB Storage)',
      battery: '590 mAh (up to 60 hours standard / up to 100 hours power-saving mode)',
      weight: '60.5g (Grade 4 titanium cushion frame)',
      waterResistance: '10ATM + IP68, MIL-STD-810H extreme temperature operating (-20°C to 55°C)',
    },
    sampleRating: 4.4,
    sampleReviewCount: 13,
    dateRange: {
      start: '2024-07-25',
      end: '2025-01-18',
    },
    quickVerdict: 'The rugged champion for Android power users: striking cushion-shaped Grade 4 titanium design, vibrant 3,000-nit screen, dual-frequency GPS, and cutting-edge Galaxy AI fitness coaching metrics.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Rugged Construction & Galaxy AI Health',
        points: [
          'High-contrast 3,000 nits Super AMOLED display with dedicated night-mode red watch faces for night trail visibility.',
          'Snappy 3nm Exynos W1000 chipset renders Wear OS 5 with zero UI stutter or app launch latency.',
          'Advanced health metrics including FDA-authorized sleep apnea detection and personalized Energy Score.'
        ],
        supportingReviewIds: ['rev-gwu-01', 'rev-gwu-03']
      },
      commonComplaints: {
        title: 'Proprietary Lug Band Mechanism',
        points: [
          'Samsung switched to a proprietary dynamic lug system, rendering standard 20mm/22mm watch straps unusable without adapters.',
          'Proprietary sensor hump shape prevents reverse wireless charging from the back of Galaxy smartphones.'
        ],
        supportingReviewIds: ['rev-gwu-02']
      },
      mixedOpinions: {
        title: 'Squircle Cushion Aesthetic',
        points: [
          'The square-outer cushion housing a round display drew debate: bold and distinctive for some, polarizing for traditional round watch purists.'
        ],
        supportingReviewIds: ['rev-gwu-01']
      },
      importantCaveats: {
        title: 'Feature Availability on Non-Samsung Phones',
        points: [
          'ECG, Blood Pressure monitoring, and Sleep Apnea detection strictly require a Samsung Galaxy smartphone with Samsung Health Monitor app.'
        ],
        supportingReviewIds: ['rev-gwu-02']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 89,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'Confirmed across Android fitness testers and triathletes.',
      variantCompletenessScore: 92,
      variantNote: 'Reviewers clearly distinguish between the 47mm LTE Titanium trims and Galaxy Watch 7 standard.',
      recencyConfidence: 'High',
      recencyNote: 'Extensively tracked across One UI 6 Watch software updates.'
    }
  },

  {
    id: 'garmin-fenix-8',
    name: 'Garmin Fenix 8 AMOLED (51mm)',
    brand: 'Garmin',
    releaseYear: 2024,
    variants: ['47mm AMOLED Titanium', '51mm AMOLED Sapphire Titanium - Slate Gray', '51mm Solar Sapphire Titanium'],
    defaultVariant: '51mm AMOLED Sapphire Titanium - Slate Gray',
    priceMSRP: '₹1,09,990',
    imageUrl: '/images/products/garmin-fenix-8.png',
    imageVerified: true,
    colorVariant: 'Slate Gray',
    officialUrl: 'https://www.garmin.co.in/products/wearables/fenix-8-51-amoled-slate-gray/',
    retailerName: 'Garmin Brand Stores & Specialized Running Outlets',
    category: 'Wearables',
    specsSummary: {
      display: '1.4" AMOLED touchscreen (454x454) with Sapphire crystal lens & Titanium bezel',
      battery: 'Up to 29 days in smartwatch mode / 84 hours continuous GPS tracking with SatIQ',
      sensors: 'Multi-band GNSS with SatIQ, Elevate Gen 5 Optical HR, ECG, Pulse Ox, Barometric Altimeter',
      diveRating: '40m scuba dive rating with leakproof inductive buttons, mic and speaker for voice commands',
      flashlight: 'Built-in multi-LED flashlight with variable intensities, red night light, and SOS strobe',
      weight: '95g (with silicone band) / 64g (case only in Grade 5 Titanium)',
    },
    sampleRating: 4.9,
    sampleReviewCount: 9,
    dateRange: {
      start: '2024-09-01',
      end: '2025-01-20',
    },
    quickVerdict: 'The unchallenged king of endurance adventure tools: stunning AMOLED display combined with an astonishing 29-day battery life, 40m scuba diving certification, and unrivaled offline topographic cartography.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Unmatched Expedition Battery & Navigation',
        points: [
          'Mind-boggling 29-day battery life on a vibrant AMOLED display frees you entirely from carrying charging cables on month-long expeditions.',
          'Built-in ultra-bright LED flashlight is a daily game-changer for midnight tent navigation, early morning runs, and emergencies.',
          'Full onboard offline TopoActive maps with dynamic round-trip routing that automatically recalculates if you deviate from trails.'
        ],
        supportingReviewIds: ['rev-fenix8-01', 'rev-fenix8-03']
      },
      commonComplaints: {
        title: 'High Financial Entry & Casual Usability',
        points: [
          'Substantial premium price tag exceeding ₹1,00,000 places it strictly in the serious enthusiast or professional athlete tier.',
          'Lacks smart assistant conversational fluency and deep third-party watch app store compared to Apple Watch or Wear OS.'
        ],
        supportingReviewIds: ['rev-fenix8-02']
      },
      mixedOpinions: {
        title: 'Inductive Button Feel',
        points: [
          'Leakproof inductive sealed buttons provide unmatched waterproofing down to 40m, though tactile click feedback is slightly subtler than mechanical springs.'
        ],
        supportingReviewIds: ['rev-fenix8-01']
      },
      importantCaveats: {
        title: 'Size and Wrist Mass',
        points: [
          '51mm titanium chassis weighs 95g with silicone strap; athletes with wrists under 165mm circumference should opt for the 47mm edition.'
        ],
        supportingReviewIds: ['rev-fenix8-02']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 96,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'Consensus verified by mountaineers, Ironman competitors, and expedition guides.',
      variantCompletenessScore: 95,
      variantNote: 'Distinction between Solar MIP and vibrant AMOLED displays meticulously tracked.',
      recencyConfidence: 'High',
      recencyNote: 'Firmware 11.xx tracking confirms dive sensor reliability.'
    }
  },

  // ==========================================
  // TABLETS (2 Flagship Powerhouses)
  // ==========================================
  {
    id: 'ipad-pro-13-m4',
    name: 'Apple iPad Pro 13" (M4)',
    brand: 'Apple',
    releaseYear: 2024,
    variants: ['256GB - Wi-Fi - Space Black', '512GB - Wi-Fi - Space Black', '1TB - Wi-Fi + 5G - Nano-texture Glass - Silver', '2TB - Wi-Fi + 5G - Space Black'],
    defaultVariant: '512GB - Wi-Fi - Space Black',
    priceMSRP: '₹1,49,900',
    imageUrl: '/images/products/ipad-pro-13-m4.png',
    imageVerified: true,
    colorVariant: 'Space Black',
    officialUrl: 'https://www.apple.com/in/ipad-pro/',
    retailerName: 'Apple Store & Authorised Resellers',
    category: 'Tablets',
    specsSummary: {
      display: '13.0" Ultra Retina XDR Tandem OLED (2752x2064), 1,000 nits full screen, 1,600 nits peak HDR, 120Hz ProMotion',
      chipset: 'Apple M4 chip (up to 10-core CPU, 10-core GPU with hardware ray tracing, 16-core Neural Engine)',
      battery: '38.99Wh battery (up to 10 hours continuous web browsing or video streaming)',
      weight: '579g (Wi-Fi) / 582g (Cellular), ultra-thin 5.1mm chassis',
      accessories: 'Apple Pencil Pro support with haptic feedback, squeeze & barrel roll; redesigned aluminum Magic Keyboard',
    },
    sampleRating: 4.8,
    sampleReviewCount: 15,
    dateRange: {
      start: '2024-05-15',
      end: '2025-01-20',
    },
    quickVerdict: 'An unbelievable engineering marvel: an impossibly thin 5.1mm slate packing groundbreaking Tandem OLED display technology and devastating M4 silicon power, constrained only by iPadOS software workflows.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Breathtaking Display & Impossibly Thin Chassis',
        points: [
          'Tandem OLED panel is the best mobile screen in existence: 1,000 nits full-screen brightness, true zero blooming on subtitles, and infinite contrast.',
          'At 5.1mm thin and 579g, it is noticeably lighter and vastly more comfortable to hold for hours than previous 12.9-inch Mini-LED models.',
          'M4 chip delivers insane performance for 4K multicam video editing in Final Cut Pro and complex 3D sculpting in Nomad Sculpt.'
        ],
        supportingReviewIds: ['rev-ipad13-01', 'rev-ipad13-03']
      },
      commonComplaints: {
        title: 'iPadOS Multitasking Bottlenecks',
        points: [
          'iPadOS window management and file handling remain overly restrictive compared to macOS, preventing it from fully replacing a MacBook Pro for software developers.',
          'Accessories are expensive: Apple Pencil Pro and Magic Keyboard add ₹45,000+ to the purchase price.'
        ],
        supportingReviewIds: ['rev-ipad13-02']
      },
      mixedOpinions: {
        title: 'Nano-Texture Matte Finish Option',
        points: [
          'Nano-texture glass effectively annihilates reflections under studio lights, but reduces deep perceived contrast and is restricted only to costly 1TB/2TB models.'
        ],
        supportingReviewIds: ['rev-ipad13-04']
      },
      importantCaveats: {
        title: 'Pencil Compatibility Shift',
        points: [
          'Due to relocated landscape magnets and wireless charging coil, the older Apple Pencil 2 is incompatible; requires Apple Pencil Pro or USB-C Pencil.'
        ],
        supportingReviewIds: ['rev-ipad13-02']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 94,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'Consensus verified by professional digital illustrators, video editors, and mobile executives.',
      variantCompletenessScore: 95,
      variantNote: 'Reviewers distinguish 256GB/512GB models (9-core CPU / 8GB RAM) from 1TB/2TB models (10-core CPU / 16GB RAM).',
      recencyConfidence: 'High',
      recencyNote: 'Extensively tracked across iPadOS 18 update cycle.'
    }
  },

  {
    id: 'galaxy-tab-s9-ultra',
    name: 'Samsung Galaxy Tab S9 Ultra',
    brand: 'Samsung',
    releaseYear: 2024,
    variants: ['256GB - 12GB RAM - Wi-Fi - Graphite', '512GB - 12GB RAM - 5G - Graphite', '1TB - 16GB RAM - 5G - Graphite'],
    defaultVariant: '512GB - 12GB RAM - 5G - Graphite',
    priceMSRP: '₹1,22,999',
    imageUrl: '/images/products/galaxy-tab-s9-ultra.png',
    imageVerified: true,
    colorVariant: 'Graphite',
    officialUrl: 'https://www.samsung.com/in/tablets/galaxy-tab-s9-ultra/',
    retailerName: 'Samsung Online & Multi-brand Electronics Stores',
    category: 'Tablets',
    specsSummary: {
      display: '14.6" Dynamic AMOLED 2X (2960x1848), 120Hz, HDR10+, Vision Booster, 16:10 cinematic aspect ratio',
      chipset: 'Snapdragon 8 Gen 2 for Galaxy (4nm Octa-core, Adreno 740)',
      battery: '11,200 mAh with 45W fast wired charging (approx 12-14 hours productivity)',
      weight: '732g (Armor Aluminum casing, 5.5mm thin)',
      pen: 'Bundled IP68-rated S-Pen stylus with ultra-low 2.8ms latency included inside the box',
      waterResistance: 'IP68 water and dust resistance (first water-resistant flagship tablet)',
    },
    sampleRating: 4.6,
    sampleReviewCount: 12,
    dateRange: {
      start: '2024-02-15',
      end: '2025-01-18',
    },
    quickVerdict: 'The reigning Android productivity titan: cavernous 14.6-inch Dynamic AMOLED 2X display, Samsung DeX desktop mode, IP68 water resistance, and an included S-Pen stylus in the retail box.',
    aiSummary: {
      appreciatedFeatures: {
        title: 'Desktop-Class Canvas & Value Additions',
        points: [
          'Massive 14.6-inch 120Hz AMOLED canvas provides unmatched side-by-side three-window multitasking and portable second-screen utility for laptops.',
          'Bundled S-Pen stylus inside the retail box saves ₹12,000+ compared to competitors who sell styluses separately.',
          'Samsung DeX environment transforms the tablet into a legitimate windowed desktop workstation with mouse and external monitor support.'
        ],
        supportingReviewIds: ['rev-tabs9u-01', 'rev-tabs9u-03']
      },
      commonComplaints: {
        title: 'Cumbersome Handheld Ergonomics',
        points: [
          'At 14.6 inches and 732g, using it handheld without resting on a desk or lap causes wrist fatigue after 15 minutes.',
          'Camera notch slightly encroaches into 16:10 video content when viewing letterboxed full-bleed media.'
        ],
        supportingReviewIds: ['rev-tabs9u-02']
      },
      mixedOpinions: {
        title: 'Android Tablet App Ecosystem',
        points: [
          'DeX mode brilliantly offsets Android tablet app limitations, though certain niche pro creative tools remain exclusive to iPadOS/macOS.'
        ],
        supportingReviewIds: ['rev-tabs9u-01']
      },
      importantCaveats: {
        title: 'No Charger in Box',
        points: [
          'Despite the 11,200 mAh battery capacity, Samsung omits the 45W charger from the box; must be purchased separately.'
        ],
        supportingReviewIds: ['rev-tabs9u-02']
      }
    },
    trustIndicators: {
      sourceCoverageScore: 91,
      duplicatePatternFlag: false,
      duplicatePatternNote: 'Verified across digital illustrators, architectural estimators, and executive power users.',
      variantCompletenessScore: 94,
      variantNote: 'Reviewers clearly distinguish 5G connectivity models and RAM variants.',
      recencyConfidence: 'High',
      recencyNote: 'Extensively tracked across One UI 6.1 Galaxy AI tablet features.'
    }
  },

];

const CORE_REVIEWS: Review[] = [
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
  },

  // --- Sony WH-1000XM5 Reviews ---
  {
    id: 'rev-sony-01',
    productId: 'sony-wh1000xm5',
    productVariant: 'Black',
    author: 'FrequentFlyer_Vikram',
    source: 'Consumer community',
    rating: 5,
    date: '2024-03-12',
    sentiment: 'positive',
    attributes: ['anc', 'battery', 'sound'],
    title: 'The gold standard for long international flights',
    originalText: 'Wore these on a 14-hour flight to San Francisco. The cabin engine drone simply vanished. Battery still showed 55% upon landing. LDAC playback on Android is stunning.',
    helpfulCount: 68,
    verifiedPurchase: true,
    highlightedPhrase: 'cabin engine drone simply vanished. Battery still showed 55% upon landing'
  },
  {
    id: 'rev-sony-02',
    productId: 'sony-wh1000xm5',
    productVariant: 'Black',
    author: 'PackLight_Dan',
    source: 'Marketplace',
    rating: 3,
    date: '2024-04-18',
    sentiment: 'mixed',
    attributes: ['comfort', 'reliability', 'value'],
    title: 'Great sound, but why did they remove the folding hinges?',
    originalText: 'The audio fidelity and noise cancelling are 10/10, but the case is huge compared to my old XM4. It occupies half my briefcase. Be aware if bag space is your priority.',
    helpfulCount: 84,
    verifiedPurchase: true,
    highlightedPhrase: 'case is huge compared to my old XM4. It occupies half my briefcase'
  },
  {
    id: 'rev-sony-03',
    productId: 'sony-wh1000xm5',
    productVariant: 'Silver',
    author: 'StudioTech_Ananya',
    source: 'Retailer website',
    rating: 5,
    date: '2024-06-04',
    sentiment: 'positive',
    attributes: ['sound', 'callquality', 'performance'],
    title: 'Crisp microphone beamforming during Zoom calls',
    originalText: 'The 4 beamforming microphones filter out my noisy office coffee machine completely. Clients said I sounded like I was in a treated recording booth.',
    helpfulCount: 42,
    verifiedPurchase: true,
    highlightedPhrase: 'microphones filter out noisy office coffee machine completely'
  },
  {
    id: 'rev-sony-04',
    productId: 'sony-wh1000xm5',
    productVariant: 'Midnight Blue',
    author: 'MetroCommuter_Rahul',
    source: 'Consumer community',
    rating: 3,
    date: '2024-08-22',
    sentiment: 'mixed',
    attributes: ['anc', 'comfort'],
    title: 'Auto-ANC optimization can be over-sensitive',
    originalText: 'When moving between walking and seated subway cars, the adaptive ANC shifts its profile and causes an audible pressure change in the ears. Turning off adaptive mode in the app solved it.',
    helpfulCount: 31,
    verifiedPurchase: true,
    highlightedPhrase: 'adaptive ANC shifts its profile and causes an audible pressure change'
  },
  {
    id: 'rev-sony-05',
    productId: 'sony-wh1000xm5',
    productVariant: 'Black',
    author: 'Developer_Priya',
    source: 'Marketplace',
    rating: 5,
    date: '2024-09-15',
    sentiment: 'positive',
    attributes: ['comfort', 'battery', 'reliability'],
    title: 'Extremely lightweight, zero crown hot-spot',
    originalText: 'At 250 grams, these are vastly more comfortable than the 385g AirPods Max. I code for 8 hours daily without any headband sore spot. Multipoint connection between MacBook and phone is instant.',
    helpfulCount: 57,
    verifiedPurchase: true,
    highlightedPhrase: 'code for 8 hours daily without any headband sore spot'
  },
  {
    id: 'rev-sony-06',
    productId: 'sony-wh1000xm5',
    productVariant: 'Silver',
    author: 'AudioCritic_Mark',
    source: 'Consumer community',
    rating: 4,
    date: '2024-10-10',
    sentiment: 'mixed',
    attributes: ['sound', 'performance'],
    title: 'Bass is tight, but default EQ needs a slight treble boost',
    originalText: 'Out of the box the sound signature is warm and consumer-friendly. Once you apply the Bright or Excited preset in the Sony Headphones app, acoustic guitars and hi-hats come alive.',
    helpfulCount: 29,
    verifiedPurchase: true,
    highlightedPhrase: 'once you apply Bright preset, acoustic guitars and hi-hats come alive'
  },
  {
    id: 'rev-sony-07',
    productId: 'sony-wh1000xm5',
    productVariant: 'Black',
    author: 'BudgetTechReviewer',
    source: 'Retailer website',
    rating: 5,
    date: '2024-11-20',
    sentiment: 'positive',
    attributes: ['value', 'anc', 'sound'],
    title: 'Best all-around value in premium flagship ANC',
    originalText: 'At ₹29,990 this beats the ₹35,900 Bose Ultra and ₹59,900 AirPods Max on battery longevity and price-to-performance. The default flagship recommendation.',
    helpfulCount: 46,
    verifiedPurchase: true,
    highlightedPhrase: 'beats competitors on battery longevity and price-to-performance'
  },

  // --- Bose QuietComfort Ultra Reviews ---
  {
    id: 'rev-bose-01',
    productId: 'bose-qc-ultra',
    productVariant: 'Black',
    author: 'Captain_Arjun',
    source: 'Consumer community',
    rating: 5,
    date: '2024-01-20',
    sentiment: 'positive',
    attributes: ['anc', 'comfort'],
    title: 'Nobody beats Bose on low-frequency aircraft rumble',
    originalText: 'As an airline pilot traveling deadhead, Bose ANC remains the pinnacle. The cabin rumble is completely neutralized. The clamping force is gentle like a cloud.',
    helpfulCount: 77,
    verifiedPurchase: true,
    highlightedPhrase: 'cabin rumble is completely neutralized. Clamping force is gentle like a cloud'
  },
  {
    id: 'rev-bose-02',
    productId: 'bose-qc-ultra',
    productVariant: 'White Smoke',
    author: 'RoadWarrior_Sam',
    source: 'Marketplace',
    rating: 3,
    date: '2024-03-15',
    sentiment: 'mixed',
    attributes: ['battery', 'value'],
    title: 'Comfort is unmatched, but 24-hr battery trails Sony',
    originalText: 'I get roughly 20-22 hours of real-world playback with Immersive Audio enabled. Fine for weekly trips, but Sony gives a guaranteed 30+ hours. Fast charging is reliable though.',
    helpfulCount: 48,
    verifiedPurchase: true,
    highlightedPhrase: 'battery tops out around 20-22 hours with Immersive Audio enabled'
  },
  {
    id: 'rev-bose-03',
    productId: 'bose-qc-ultra',
    productVariant: 'Black',
    author: 'CompactTraveler',
    source: 'Retailer website',
    rating: 5,
    date: '2024-05-18',
    sentiment: 'positive',
    attributes: ['reliability', 'comfort', 'anc'],
    title: 'Thank goodness Bose kept the folding hinges!',
    originalText: 'Unlike the Sony XM5 and AirPods Max which stay flat, these fold inward into a compact clamshell. Fits effortlessly in my small sling bag.',
    helpfulCount: 63,
    verifiedPurchase: true,
    highlightedPhrase: 'fold inward into a compact clamshell. Fits effortlessly in my sling'
  },
  {
    id: 'rev-bose-04',
    productId: 'bose-qc-ultra',
    productVariant: 'Black',
    author: 'TechGeek_Naveen',
    source: 'Consumer community',
    rating: 3,
    date: '2024-07-29',
    sentiment: 'mixed',
    attributes: ['software', 'performance'],
    title: 'Volume slider capacitive strip takes getting used to',
    originalText: 'The physical touch volume strip on the right cup is sensitive. When I adjust the headphone angle on my head, I occasionally blast the volume up by accident.',
    helpfulCount: 39,
    verifiedPurchase: true,
    highlightedPhrase: 'capacitive volume strip is overly sensitive to accidental adjustment'
  },
  {
    id: 'rev-bose-05',
    productId: 'bose-qc-ultra',
    productVariant: 'Sandstone',
    author: 'ClassicalListener',
    source: 'Marketplace',
    rating: 5,
    date: '2024-09-08',
    sentiment: 'positive',
    attributes: ['sound', 'comfort'],
    title: 'Immersive Audio elevates symphonic music',
    originalText: 'Listening to Hans Zimmer scores with Bose Immersive mode turned on feels like sitting in the 5th row of a concert hall. Spatial imaging is wide and organic.',
    helpfulCount: 34,
    verifiedPurchase: true,
    highlightedPhrase: 'feels like sitting in the 5th row of a concert hall'
  },
  {
    id: 'rev-bose-06',
    productId: 'bose-qc-ultra',
    productVariant: 'Black',
    author: 'OfficeWorker_Sneha',
    source: 'Retailer website',
    rating: 4,
    date: '2024-10-25',
    sentiment: 'positive',
    attributes: ['callquality', 'anc'],
    title: 'Great voice isolation in open office cubicles',
    originalText: 'Our open-plan office is loud, but Bose Aware mode with ActiveSense automatically drops coworker shouting without me touching a button.',
    helpfulCount: 28,
    verifiedPurchase: true,
    highlightedPhrase: 'ActiveSense drops coworker shouting without me touching a button'
  },
  {
    id: 'rev-bose-07',
    productId: 'bose-qc-ultra',
    productVariant: 'White Smoke',
    author: 'Audiophile_Rohan',
    source: 'Consumer community',
    rating: 4,
    date: '2024-12-05',
    sentiment: 'positive',
    attributes: ['value', 'sound', 'comfort'],
    title: 'Top pick if long-term comfort is your #1 priority',
    originalText: 'If you suffer from headache pressure from heavy headphones, buy the Bose Ultra without hesitation. The acoustic seal is effortless and the foam breathes well.',
    helpfulCount: 52,
    verifiedPurchase: true,
    highlightedPhrase: 'if you suffer from headache pressure, buy the Bose Ultra without hesitation'
  },

  // --- Apple AirPods Max Reviews ---
  {
    id: 'rev-apm-01',
    productId: 'airpods-max',
    productVariant: 'Midnight',
    author: 'AppleEcosystem_Deepak',
    source: 'Consumer community',
    rating: 5,
    date: '2024-09-28',
    sentiment: 'positive',
    attributes: ['sound', 'anc', 'software'],
    title: 'The most natural Transparency Mode ever built',
    originalText: 'You can hold full conversations with people and literally forget you are wearing over-ear headphones. It sounds indistinguishable from open air. USB-C audio with Apple Lossless is sublime.',
    helpfulCount: 88,
    verifiedPurchase: true,
    highlightedPhrase: 'indistinguishable from open air. USB-C audio with Apple Lossless is sublime'
  },
  {
    id: 'rev-apm-02',
    productId: 'airpods-max',
    productVariant: 'Midnight',
    author: 'HeavyNeck_Gaurav',
    source: 'Marketplace',
    rating: 3,
    date: '2024-10-14',
    sentiment: 'mixed',
    attributes: ['comfort', 'value'],
    title: 'Gorgeous aluminum, but 386g is heavy for all-day use',
    originalText: 'The anodized aluminum earcups and stainless steel arms look like luxury jewelry, but at 386 grams you feel the gravitational pull on your neck after two consecutive movie streams.',
    helpfulCount: 95,
    verifiedPurchase: true,
    highlightedPhrase: 'at 386 grams you feel the gravitational pull on your neck'
  },
  {
    id: 'rev-apm-03',
    productId: 'airpods-max',
    productVariant: 'Space Gray',
    author: 'MusicProducer_Kunal',
    source: 'Consumer community',
    rating: 5,
    date: '2024-11-02',
    sentiment: 'positive',
    attributes: ['sound', 'performance', 'reliability'],
    title: 'Distortion-free sub-bass and studio reference tuning',
    originalText: 'Dual neodymium ring magnets deliver zero harmonic distortion even at 90% volume. Kick drums hit with tactile authority without bleeding into vocals. Superior sound to Sony and Bose.',
    helpfulCount: 64,
    verifiedPurchase: true,
    highlightedPhrase: 'zero harmonic distortion even at 90% volume. Superior sound to Sony and Bose'
  },
  {
    id: 'rev-apm-04',
    productId: 'airpods-max',
    productVariant: 'Midnight',
    author: 'MinimalistTraveler',
    source: 'Retailer website',
    rating: 2,
    date: '2024-11-18',
    sentiment: 'negative',
    attributes: ['value', 'reliability'],
    title: 'Still no real case and no power switch at ₹59,900?',
    originalText: 'The Smart Case is still a joke that leaves the mesh canopy completely exposed in your backpack. And having no power button means they drain slowly if left on your desk overnight.',
    helpfulCount: 110,
    verifiedPurchase: true,
    highlightedPhrase: 'Smart Case leaves mesh canopy exposed. Having no power button drains battery'
  },
  {
    id: 'rev-apm-05',
    productId: 'airpods-max',
    productVariant: 'Starlight',
    author: 'MacPowerUser_Neha',
    source: 'Marketplace',
    rating: 5,
    date: '2024-12-10',
    sentiment: 'positive',
    attributes: ['software', 'callquality', 'reliability'],
    title: 'Switching between iPhone, iPad and Mac is pure sorcery',
    originalText: 'I pick up an incoming FaceTime call on my Mac and the audio transfers instantly. Microphones during work calls reject room reverb brilliantly.',
    helpfulCount: 45,
    verifiedPurchase: true,
    highlightedPhrase: 'audio transfers instantly between devices without Bluetooth fiddling'
  },
  {
    id: 'rev-apm-06',
    productId: 'airpods-max',
    productVariant: 'Sky Blue',
    author: 'WatchCollector',
    source: 'Retailer website',
    rating: 4,
    date: '2025-01-05',
    sentiment: 'positive',
    attributes: ['performance', 'sound'],
    title: 'Digital Crown is the finest volume control on any headphone',
    originalText: 'Touch gestures on other headphones are imprecise and annoying. The Apple Digital Crown allows granular single-decibel volume adjustments and instant play/pause.',
    helpfulCount: 38,
    verifiedPurchase: true,
    highlightedPhrase: 'Digital Crown allows granular single-decibel volume adjustments'
  },
  {
    id: 'rev-apm-07',
    productId: 'airpods-max',
    productVariant: 'Midnight',
    author: 'ExecutiveBuyer_Dev',
    source: 'Consumer community',
    rating: 4,
    date: '2025-01-15',
    sentiment: 'positive',
    attributes: ['value', 'sound', 'anc'],
    title: 'Luxury purchase worth it if you live in Apple ecosystem',
    originalText: 'It is undeniably expensive, but the mesh canopy breathability, lossless USB-C audio for Apple Music, and pristine build quality make it a keeper for the next 5+ years.',
    helpfulCount: 51,
    verifiedPurchase: true,
    highlightedPhrase: 'pristine build quality make it a keeper for the next 5+ years'
  },
  // --- MacBook Pro 16 ---
  {
    id: 'rev-mbp16-01',
    productId: 'macbook-pro-16',
    productVariant: '48GB RAM - 1TB SSD - Space Black',
    author: 'DevLead_Marcus',
    source: 'Consumer community',
    rating: 5,
    date: '2024-03-12',
    sentiment: 'positive',
    attributes: ['performance', 'battery', 'reliability'],
    title: 'Compiles massive Rust and Kubernetes trees without breaking a sweat',
    originalText: 'The M3 Max is astonishing. I can build entire distributed services locally in Docker while running multiple VMs, and the cooling fans barely spin up. What blows my mind is getting 14+ hours of full dev work on battery power alone without any performance throttling.',
    helpfulCount: 52,
    verifiedPurchase: true,
    highlightedPhrase: 'getting 14+ hours of full dev work on battery power alone'
  },
  {
    id: 'rev-mbp16-02',
    productId: 'macbook-pro-16',
    productVariant: '48GB RAM - 1TB SSD - Space Black',
    author: 'TravelTech_Elena',
    source: 'Retailer website',
    rating: 4,
    date: '2024-04-05',
    sentiment: 'mixed',
    attributes: ['reliability', 'value'],
    title: 'World class machine but very heavy in a backpack',
    originalText: 'Build quality is unassailable and the Liquid Retina XDR screen is the best I have ever seen. However, at 2.16 kg, you really feel this laptop on cross-country flights. Make sure you also buy whatever unified RAM you need because soldered memory means zero upgrades later.',
    helpfulCount: 38,
    verifiedPurchase: true,
    highlightedPhrase: 'at 2.16 kg, you really feel this laptop on cross-country flights'
  },
  {
    id: 'rev-mbp16-03',
    productId: 'macbook-pro-16',
    productVariant: '64GB RAM - 2TB SSD - Silver',
    author: 'StudioColorist_Neil',
    source: 'Consumer community',
    rating: 5,
    date: '2024-06-18',
    sentiment: 'positive',
    attributes: ['performance', 'software'],
    title: 'Reference Mini-LED display replaces my external monitor',
    originalText: 'Grading 4K HDR footage directly on this 1600-nit panel is miraculous. Color fidelity matches our Flanders reference monitors. MagSafe, 3 Thunderbolt ports, and the full-sized SD card slot make shooting in the field effortless.',
    helpfulCount: 44,
    verifiedPurchase: true,
    highlightedPhrase: 'Grading 4K HDR footage directly on this 1600-nit panel is miraculous'
  },
  {
    id: 'rev-mbp16-04',
    productId: 'macbook-pro-16',
    productVariant: '48GB RAM - 1TB SSD - Space Black',
    author: 'Karan_Design',
    source: 'Consumer community',
    rating: 5,
    date: '2024-08-22',
    sentiment: 'positive',
    attributes: ['performance', 'reliability'],
    title: 'Space Black anodization looks incredible',
    originalText: 'Space Black is the stealth finish we have wanted for a decade. It holds up against fingerprints much better than the old Midnight Air, and the six-speaker soundstage with spatial audio fills my hotel room with rich bass.',
    helpfulCount: 29,
    verifiedPurchase: true,
    highlightedPhrase: 'Space Black is the stealth finish we have wanted'
  },

  // --- Dell XPS 16 ---
  {
    id: 'rev-xps16-01',
    productId: 'dell-xps-16',
    productVariant: 'Core Ultra 9 - 32GB - 1TB - RTX 4070 - OLED',
    author: 'ArchViz_Gaurav',
    source: 'Consumer community',
    rating: 4,
    date: '2024-05-10',
    sentiment: 'positive',
    attributes: ['performance', 'reliability'],
    title: 'Stunning 4K OLED and futuristic design, but key travel is an adjustment',
    originalText: 'Visually, this is the most futuristic laptop on the market. The 4K OLED display is razor sharp with infinite contrast. The invisible haptic glass trackpad works flawlessly once you get used to its boundaries. Keycaps are completely flat so touch typing takes a few days to master.',
    helpfulCount: 31,
    verifiedPurchase: true,
    highlightedPhrase: '4K OLED display is razor sharp with infinite contrast'
  },
  {
    id: 'rev-xps16-02',
    productId: 'dell-xps-16',
    productVariant: 'Core Ultra 7 - 32GB - 1TB - RTX 4060',
    author: 'Siddharth_B',
    source: 'Retailer website',
    rating: 3,
    date: '2024-07-02',
    sentiment: 'mixed',
    attributes: ['value', 'reliability'],
    title: 'Capacitive touch bar can be frustrating during fast workflows',
    originalText: 'The zero-lattice keyboard looks clean but I miss having tactile ESC and function keys. I frequently brush against the capacitive mute or delete button by mistake. Also, carry your dongles because Dell eliminated USB-A and HDMI entirely.',
    helpfulCount: 42,
    verifiedPurchase: true,
    highlightedPhrase: 'frequently brush against the capacitive mute or delete button'
  },
  {
    id: 'rev-xps16-03',
    productId: 'dell-xps-16',
    productVariant: 'Core Ultra 9 - 32GB - 1TB - RTX 4070 - OLED',
    author: 'TechConsultant_R',
    source: 'Consumer community',
    rating: 5,
    date: '2024-09-14',
    sentiment: 'positive',
    attributes: ['performance', 'software'],
    title: 'Serious RTX 4070 GPU grunt in an executive package',
    originalText: 'Running Blender cycles renders and Unreal Engine previews on client sites is seamless with the RTX 4070. Battery lasts about 8-9 hours on office tasks. Dell PremierColor calibrated OLED panel is an absolute joy.',
    helpfulCount: 27,
    verifiedPurchase: true,
    highlightedPhrase: 'Running Blender cycles renders and Unreal Engine previews is seamless'
  },

  // --- ASUS ROG Zephyrus G14 ---
  {
    id: 'rev-g14-01',
    productId: 'rog-zephyrus-g14',
    productVariant: 'Ryzen 9 8945HS - 32GB - 1TB - RTX 4070 - Eclipse Gray',
    author: 'CyberSamurai_99',
    source: 'Consumer community',
    rating: 5,
    date: '2024-04-12',
    sentiment: 'positive',
    attributes: ['performance', 'value', 'reliability'],
    title: 'The holy grail of 14-inch gaming and creative ultrabooks',
    originalText: 'ASUS knocked it out of the park. The CNC aluminum build feels identical to a MacBook. The 3K 120Hz OLED with G-SYNC has virtually zero input lag and colors pop intensely. The fact that it weighs just 1.5kg and plays Cyberpunk 2077 at 75 FPS with DLSS 3 is unbelievable.',
    helpfulCount: 61,
    verifiedPurchase: true,
    highlightedPhrase: 'weighs just 1.5kg and plays Cyberpunk 2077 at 75 FPS'
  },
  {
    id: 'rev-g14-02',
    productId: 'rog-zephyrus-g14',
    productVariant: 'Ryzen 9 8945HS - 16GB - 1TB - RTX 4060',
    author: 'CodeAndGame_Vikram',
    source: 'Retailer website',
    rating: 4,
    date: '2024-06-25',
    sentiment: 'mixed',
    attributes: ['performance', 'value'],
    title: 'Buy the 32GB model upfront! Soldered RAM is the only blemish',
    originalText: 'My only regret was buying the 16GB version because RAM is now fully soldered to the motherboard. Other than that, battery life on light productivity is a solid 8.5 hours thanks to the efficient AMD Ryzen 9 8945HS chip.',
    helpfulCount: 49,
    verifiedPurchase: true,
    highlightedPhrase: 'battery life on light productivity is a solid 8.5 hours'
  },
  {
    id: 'rev-g14-03',
    productId: 'rog-zephyrus-g14',
    productVariant: 'Ryzen 9 8945HS - 32GB - 1TB - RTX 4070 - Eclipse Gray',
    author: 'AudioCreator_T',
    source: 'Consumer community',
    rating: 5,
    date: '2024-10-04',
    sentiment: 'positive',
    attributes: ['reliability', 'performance'],
    title: 'Speakers and keyboard punch way above their weight',
    originalText: 'The 6-speaker acoustic setup has actual sub-bass resonance. The keyboard has deep 1.7mm key travel and feels much better than Dell XPS or Razer Blade. Slash LED on the back adds tasteful customization without screaming gamer.',
    helpfulCount: 35,
    verifiedPurchase: true,
    highlightedPhrase: '6-speaker acoustic setup has actual sub-bass resonance'
  },

  // --- Lenovo ThinkPad X1 Carbon Gen 12 ---
  {
    id: 'rev-x1c-01',
    productId: 'thinkpad-x1-carbon',
    productVariant: 'Core Ultra 7 155H - 32GB - 1TB SSD - 2.8K OLED 120Hz',
    author: 'EnterpriseExec_Raj',
    source: 'Consumer community',
    rating: 5,
    date: '2024-05-18',
    sentiment: 'positive',
    attributes: ['reliability', 'performance', 'battery'],
    title: '1.09 kg featherweight durability with the gold-standard keyboard',
    originalText: 'I have carried ThinkPads for 15 years and Gen 12 is their finest yet. At barely over 1 kg, you can carry it around airport terminals all day. The 2.8K OLED screen makes spreadsheets and documents crisp as printed paper, and the typing feel remains the absolute best in the industry.',
    helpfulCount: 46,
    verifiedPurchase: true,
    highlightedPhrase: 'typing feel remains the absolute best in the industry'
  },
  {
    id: 'rev-x1c-02',
    productId: 'thinkpad-x1-carbon',
    productVariant: 'Core Ultra 7 155H - 32GB - 1TB SSD - 2.8K OLED 120Hz',
    author: 'FinancialAnalyst_P',
    source: 'Retailer website',
    rating: 4,
    date: '2024-07-29',
    sentiment: 'mixed',
    attributes: ['battery', 'value'],
    title: 'OLED screen looks gorgeous but IPS model lasts longer',
    originalText: 'The OLED panel is stunning but expect around 7 to 8 hours of battery life under heavy multitasking. Colleague with the standard 400-nit IPS screen gets 10+ hours. That said, having dual Thunderbolt 4 and full-sized USB-A ports saves me from carrying adapters.',
    helpfulCount: 33,
    verifiedPurchase: true,
    highlightedPhrase: 'full-sized USB-A ports saves me from carrying adapters'
  },
  {
    id: 'rev-x1c-03',
    productId: 'thinkpad-x1-carbon',
    productVariant: 'Core Ultra 7 155H - 32GB - 1TB SSD - IPS',
    author: 'LinuxSysadmin_Jay',
    source: 'Consumer community',
    rating: 5,
    date: '2024-11-08',
    sentiment: 'positive',
    attributes: ['reliability', 'software'],
    title: 'Flawless Linux compatibility and rock solid build',
    originalText: 'Installed Fedora Linux on day one and every component worked out of the box—Wi-Fi 7, TrackPoint, webcam, and fingerprint reader. Magnesium and carbon fiber chassis has zero creaks or flex.',
    helpfulCount: 28,
    verifiedPurchase: true,
    highlightedPhrase: 'chassis has zero creaks or flex'
  },

  // --- Apple Watch Ultra 2 ---
  {
    id: 'rev-awu2-01',
    productId: 'apple-watch-ultra-2',
    productVariant: '49mm Black Titanium - Alpine Loop',
    author: 'UltraRunner_Anand',
    source: 'Consumer community',
    rating: 5,
    date: '2024-10-02',
    sentiment: 'positive',
    attributes: ['battery', 'reliability', 'performance'],
    title: 'Black Titanium is gorgeous and 3,000 nits display cut through glare',
    originalText: 'Upgraded for the new Black Titanium finish which has zero scratches after two 50k trail races. The 3,000 nits screen is readable in the brightest midday desert sunlight. Dual frequency GPS tracked through dense mountain pine canopy with zero drift.',
    helpfulCount: 57,
    verifiedPurchase: true,
    highlightedPhrase: '3,000 nits screen is readable in the brightest midday desert sunlight'
  },
  {
    id: 'rev-awu2-02',
    productId: 'apple-watch-ultra-2',
    productVariant: '49mm Natural Titanium - Ocean Band',
    author: 'Priya_M',
    source: 'Retailer website',
    rating: 4,
    date: '2024-11-12',
    sentiment: 'mixed',
    attributes: ['reliability', 'value'],
    title: 'Outstanding battery life but quite bulky for small wrists',
    originalText: 'Going from daily charging on the Series 8 to charging every 3 days is liberating. However, on my 155mm wrist, the 49mm case looks like a hockey puck and takes getting used to for sleep tracking. Switch to the Trail Loop band for sleep comfort.',
    helpfulCount: 41,
    verifiedPurchase: true,
    highlightedPhrase: 'charging every 3 days is liberating'
  },
  {
    id: 'rev-awu2-03',
    productId: 'apple-watch-ultra-2',
    productVariant: '49mm Natural Titanium - Trail Loop',
    author: 'DiverDan_Goa',
    source: 'Consumer community',
    rating: 5,
    date: '2024-12-05',
    sentiment: 'positive',
    attributes: ['reliability', 'software'],
    title: 'Legitimate dive computer for recreational reef dives',
    originalText: 'Used the Oceanic+ app for 18-meter reef dives in the Andaman Islands. The water temp sensor and auto-depth gauge activated instantly as I submerged. On-device Siri with offline processing allows quick timer settings even with wet fingers.',
    helpfulCount: 36,
    verifiedPurchase: true,
    highlightedPhrase: 'auto-depth gauge activated instantly as I submerged'
  },
  {
    id: 'rev-awu2-04',
    productId: 'apple-watch-ultra-2',
    productVariant: '49mm Black Titanium - Alpine Loop',
    author: 'Rohan_K',
    source: 'Consumer community',
    rating: 5,
    date: '2025-01-08',
    sentiment: 'positive',
    attributes: ['performance', 'battery'],
    title: 'Double Tap gesture makes winter running effortless',
    originalText: 'Being able to tap index and thumb together to stop alarms or reply to voice notes while wearing running gloves is game-changing. Battery consistently lasts 60+ hours with daily 1-hour GPS workouts.',
    helpfulCount: 29,
    verifiedPurchase: true,
    highlightedPhrase: 'Battery consistently lasts 60+ hours with daily workouts'
  },

  // --- Samsung Galaxy Watch Ultra ---
  {
    id: 'rev-gwu-01',
    productId: 'galaxy-watch-ultra',
    productVariant: '47mm LTE - Titanium Gray',
    author: 'AndroidTrailGuy_Sameer',
    source: 'Consumer community',
    rating: 5,
    date: '2024-08-16',
    sentiment: 'positive',
    attributes: ['performance', 'battery', 'reliability'],
    title: 'The heavy-duty endurance watch Android power users needed',
    originalText: 'The 3nm Exynos W1000 makes Wear OS 5 fly. Zero lag between watch tiles. Battery easily lasts 2.5 to 3 days on standard mode and up to 4 days with battery saver. Night mode automatically turns watch face elements dark red in darkness to preserve night vision.',
    helpfulCount: 48,
    verifiedPurchase: true,
    highlightedPhrase: 'Battery easily lasts 2.5 to 3 days on standard mode'
  },
  {
    id: 'rev-gwu-02',
    productId: 'galaxy-watch-ultra',
    productVariant: '47mm LTE - Titanium Silver',
    author: 'Deepak_Tech',
    source: 'Retailer website',
    rating: 4,
    date: '2024-09-21',
    sentiment: 'mixed',
    attributes: ['value', 'reliability'],
    title: 'Great hardware, but why change the band connector?',
    originalText: 'The cushion titanium frame feels indestructible. However, Samsung switched to a proprietary dynamic lug system, so none of my classic 20mm straps fit. Also note that ECG and Sleep Apnea features require a Samsung phone to activate.',
    helpfulCount: 39,
    verifiedPurchase: true,
    highlightedPhrase: 'cushion titanium frame feels indestructible'
  },
  {
    id: 'rev-gwu-03',
    productId: 'galaxy-watch-ultra',
    productVariant: '47mm LTE - Titanium White',
    author: 'FitnessCoach_Neha',
    source: 'Consumer community',
    rating: 5,
    date: '2024-11-04',
    sentiment: 'positive',
    attributes: ['reliability', 'software'],
    title: 'Dual frequency GPS and multisport transition tracking are spot on',
    originalText: 'Triathlon and duathlon workout tracking smoothly switches between open water swimming, cycling, and running with a press of the orange Quick button. Siren alert is surprisingly loud at 86dB if you ever need emergency assistance.',
    helpfulCount: 31,
    verifiedPurchase: true,
    highlightedPhrase: 'Siren alert is surprisingly loud at 86dB'
  },

  // --- Garmin Fenix 8 AMOLED ---
  {
    id: 'rev-fenix8-01',
    productId: 'garmin-fenix-8',
    productVariant: '51mm AMOLED Sapphire Titanium - Slate Gray',
    author: 'Alpinist_Karthik',
    source: 'Consumer community',
    rating: 5,
    date: '2024-09-28',
    sentiment: 'positive',
    attributes: ['battery', 'reliability', 'performance'],
    title: '28 days battery life on an AMOLED screen is sheer wizardry',
    originalText: 'I took the Fenix 8 on a 3-week expedition in Ladakh without a charger. It returned with 22% battery left. The AMOLED display is vivid, the topographic maps reroute on the fly, and the inductive buttons feel completely sealed against freezing glacial mud.',
    helpfulCount: 65,
    verifiedPurchase: true,
    highlightedPhrase: 'took the Fenix 8 on a 3-week expedition without a charger'
  },
  {
    id: 'rev-fenix8-02',
    productId: 'garmin-fenix-8',
    productVariant: '51mm AMOLED Sapphire Titanium - Slate Gray',
    author: 'Triathlete_Dev',
    source: 'Retailer website',
    rating: 4,
    date: '2024-10-30',
    sentiment: 'mixed',
    attributes: ['value', 'reliability'],
    title: 'Costly powerhouse, built strictly for serious endurance',
    originalText: 'At over ₹1 Lakh, this is an expensive tool. But for 80+ hours of continuous GPS tracking, diving down to 40 meters, and comprehensive training readiness algorithms, nothing else in the market touches it. The built-in LED flashlight gets used every single night.',
    helpfulCount: 42,
    verifiedPurchase: true,
    highlightedPhrase: 'built-in LED flashlight gets used every single night'
  },
  {
    id: 'rev-fenix8-03',
    productId: 'garmin-fenix-8',
    productVariant: '47mm AMOLED Titanium',
    author: 'TrailMarathoner_S',
    source: 'Consumer community',
    rating: 5,
    date: '2024-12-14',
    sentiment: 'positive',
    attributes: ['reliability', 'software'],
    title: 'Elevate Gen 5 heart rate sensor matches medical chest straps',
    originalText: 'HR accuracy during high-intensity intervals matches my Polar H10 chest strap within 1 bpm. Voice speaker allows quick voice notes and audio pacing prompts. Best sports watch on the planet bar none.',
    helpfulCount: 37,
    verifiedPurchase: true,
    highlightedPhrase: 'HR accuracy matches my Polar H10 chest strap within 1 bpm'
  },

  // --- Apple iPad Pro 13 (M4) ---
  {
    id: 'rev-ipad13-01',
    productId: 'ipad-pro-13-m4',
    productVariant: '512GB - Wi-Fi - Space Black',
    author: 'ConceptArtist_Arjun',
    source: 'Consumer community',
    rating: 5,
    date: '2024-06-08',
    sentiment: 'positive',
    attributes: ['performance', 'reliability'],
    title: 'Tandem OLED and Apple Pencil Pro barrel roll are next generation',
    originalText: 'The Tandem OLED screen is unbelievable: pure ink blacks and zero halo bloom around bright paint strokes in Procreate. The Pencil Pro barrel roll and haptic squeeze shortcuts have doubled my illustration speed. At 5.1mm thin, it feels like holding a futuristic sheet of digital glass.',
    helpfulCount: 68,
    verifiedPurchase: true,
    highlightedPhrase: 'feels like holding a futuristic sheet of digital glass'
  },
  {
    id: 'rev-ipad13-02',
    productId: 'ipad-pro-13-m4',
    productVariant: '256GB - Wi-Fi - Space Black',
    author: 'TechLead_Saurabh',
    source: 'Retailer website',
    rating: 4,
    date: '2024-07-19',
    sentiment: 'mixed',
    attributes: ['software', 'value'],
    title: 'Hardware from the year 2030, but iPadOS still holds it back',
    originalText: 'The M4 chip runs circles around desktop processors in benchmarks. However, iPadOS file system and window management still cannot match macOS for software development and terminal workflows. With the Magic Keyboard, total price enters high-end MacBook territory.',
    helpfulCount: 54,
    verifiedPurchase: true,
    highlightedPhrase: 'Hardware from the year 2030, but iPadOS still holds it back'
  },
  {
    id: 'rev-ipad13-03',
    productId: 'ipad-pro-13-m4',
    productVariant: '512GB - Wi-Fi - Space Black',
    author: 'Director_Varun',
    source: 'Consumer community',
    rating: 5,
    date: '2024-09-25',
    sentiment: 'positive',
    attributes: ['performance', 'battery'],
    title: 'Effortless 4K multicam editing in Final Cut Pro on battery',
    originalText: 'Renders multiple streams of 4K ProRes without dropping a frame, and battery easily lasts an entire 10-hour flight while reviewing footage. The new aluminum Magic Keyboard feels remarkably premium with the dedicated function row.',
    helpfulCount: 40,
    verifiedPurchase: true,
    highlightedPhrase: 'battery easily lasts an entire 10-hour flight'
  },
  {
    id: 'rev-ipad13-04',
    productId: 'ipad-pro-13-m4',
    productVariant: '1TB - Wi-Fi + 5G - Nano-texture Glass - Silver',
    author: 'CreativePro_Meera',
    source: 'Consumer community',
    rating: 5,
    date: '2024-11-18',
    sentiment: 'positive',
    attributes: ['reliability', 'performance'],
    title: 'Nano-texture glass kills reflections completely',
    originalText: 'Working outdoors or under bright photography studio softboxes, the nano-texture glass completely diffuses harsh reflections. The 13-inch display provides enough room for side-by-side reference boards.',
    helpfulCount: 32,
    verifiedPurchase: true,
    highlightedPhrase: 'nano-texture glass completely diffuses harsh reflections'
  },

  // --- Samsung Galaxy Tab S9 Ultra ---
  {
    id: 'rev-tabs9u-01',
    productId: 'galaxy-tab-s9-ultra',
    productVariant: '512GB - 12GB RAM - 5G - Graphite',
    author: 'DeXPowerUser_Kunal',
    source: 'Consumer community',
    rating: 5,
    date: '2024-04-20',
    sentiment: 'positive',
    attributes: ['performance', 'value', 'reliability'],
    title: 'The 14.6 inch screen and DeX mode replace my laptop for travel',
    originalText: 'Samsung DeX on a 14.6-inch 120Hz AMOLED canvas is the closest any tablet has come to a legitimate desktop workstation. I run 4 windows simultaneously with zero slowdown. Plus, having the S-Pen included in the box is huge customer value.',
    helpfulCount: 59,
    verifiedPurchase: true,
    highlightedPhrase: 'having the S-Pen included in the box is huge customer value'
  },
  {
    id: 'rev-tabs9u-02',
    productId: 'galaxy-tab-s9-ultra',
    productVariant: '256GB - 12GB RAM - Wi-Fi - Graphite',
    author: 'Ananya_Design',
    source: 'Retailer website',
    rating: 4,
    date: '2024-06-14',
    sentiment: 'mixed',
    attributes: ['reliability', 'value'],
    title: 'Massive device that really needs a desk or stand',
    originalText: 'The 14.6 inch display is awe-inspiring for movies and art, but do not expect to read in bed with one hand; at 732g it is too heavy without resting on your lap. Quad AKG speakers are thunderously loud with immersive Dolby Atmos surround sound.',
    helpfulCount: 43,
    verifiedPurchase: true,
    highlightedPhrase: 'Quad AKG speakers are thunderously loud'
  },
  {
    id: 'rev-tabs9u-03',
    productId: 'galaxy-tab-s9-ultra',
    productVariant: '512GB - 12GB RAM - 5G - Graphite',
    author: 'SiteArchitect_Tushar',
    source: 'Consumer community',
    rating: 5,
    date: '2024-08-30',
    sentiment: 'positive',
    attributes: ['reliability', 'performance'],
    title: 'IP68 water resistance saved this tablet on a rainy construction site',
    originalText: 'Having full IP68 water and dust resistance on a tablet of this caliber is revolutionary. Got caught in heavy monsoon rain on a construction inspection site with blueprints open on screen, and both tablet and S-Pen worked flawlessly through wet finger touches.',
    helpfulCount: 37,
    verifiedPurchase: true,
    highlightedPhrase: 'tablet and S-Pen worked flawlessly through wet finger touches'
  },

];

export const SAMPLE_PRODUCTS: Product[] = [...CORE_PRODUCTS, ...EXTENDED_PRODUCTS];
export const SAMPLE_REVIEWS: Review[] = [...CORE_REVIEWS, ...EXTENDED_REVIEWS];

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
  },
  sound: {
    label: 'Sound Quality',
    icon: 'Music',
    description: 'Acoustic fidelity, dynamic range, bass depth, and soundstage imaging.'
  },
  anc: {
    label: 'Noise Cancellation',
    icon: 'VolumeX',
    description: 'Isolation of low-frequency engine drone, office chatter attenuation, and transparency mode.'
  },
  comfort: {
    label: 'Comfort & Fit',
    icon: 'Smile',
    description: 'Clamping force balance, headband weight distribution, ear-cushion breathability, and all-day fatigue.'
  },
  callquality: {
    label: 'Call Clarity',
    icon: 'Mic',
    description: 'Beamforming voice isolation, wind noise suppression, and microphone pickup in public transit.'
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
  },

  // Sony WH-1000XM5 QA
  {
    id: 'qa-sony-1',
    productId: 'sony-wh1000xm5',
    question: 'How effective is the active noise cancellation on the Sony XM5?',
    answer: 'Industry-leading: dual V1 and QN1 noise-cancelling processors create an acoustic dead-zone that effortlessly removes jet engine drone and open-office chatter. The only complaint is that the auto-optimizer occasionally shifts intensity during walking head movements.',
    category: 'anc',
    supportingReviewIds: ['rev-sony-01', 'rev-sony-04'],
    confidenceNote: 'High consensus across international travelers and commute reviewers.'
  },
  {
    id: 'qa-sony-2',
    productId: 'sony-wh1000xm5',
    question: 'Can the Sony WH-1000XM5 fold into a compact travel case?',
    answer: 'No. Sony redesigned the headband with a stepless friction slider that folds flat but does not fold inward into a ball like the prior XM4. The included zippered carrying case occupies noticeably more briefcase or backpack volume.',
    category: 'comfort',
    supportingReviewIds: ['rev-sony-02'],
    confidenceNote: 'Frequently cited by frequent flyers and backpack commuters.'
  },

  // Bose QuietComfort Ultra QA
  {
    id: 'qa-bose-1',
    productId: 'bose-qc-ultra',
    question: 'Is the Bose QuietComfort Ultra comfortable for long-haul flights?',
    answer: 'Yes, it remains the comfort reference standard in personal audio. Plush memory foam earcups, generous acoustic cavity depth, and a featherweight 253g weight completely eliminate crown hot-spots on 10+ hour flights.',
    category: 'comfort',
    supportingReviewIds: ['rev-bose-01', 'rev-bose-07'],
    confidenceNote: 'Unanimous praise from airline crew and frequent flyers.'
  },
  {
    id: 'qa-bose-2',
    productId: 'bose-qc-ultra',
    question: 'How long does the battery last with Immersive Audio turned on?',
    answer: 'Real-world customer feedback indicates battery life reaches 22-24 hours with standard ANC, but drops to approximately 18 hours when Bose Immersive Audio spatial rendering is kept continuously on.',
    category: 'battery',
    supportingReviewIds: ['rev-bose-02'],
    confidenceNote: 'Tested across travel reviews and lab measurements.'
  },

  // Apple AirPods Max QA
  {
    id: 'qa-apm-1',
    productId: 'airpods-max',
    question: 'Are the Apple AirPods Max too heavy for daily 8-hour work sessions?',
    answer: 'For many buyers, yes. At 386 grams, they are over 50% heavier than the Sony XM5 (250g) and Bose Ultra (253g). While the breathable knit canopy distributes weight well, multiple reviewers report neck fatigue after 3-4 continuous hours.',
    category: 'comfort',
    supportingReviewIds: ['rev-apm-02'],
    confidenceNote: 'Consistent ergonomic tradeoff noted across desk workers.'
  },
  {
    id: 'qa-apm-2',
    productId: 'airpods-max',
    question: 'Is Transparency Mode noticeably better than Sony or Bose?',
    answer: 'Yes, reviewers almost universally praise Apple Transparency Mode as the most organic in the industry, sounding indistinguishable from natural open hearing without digitized robotic artifacts.',
    category: 'anc',
    supportingReviewIds: ['rev-apm-01'],
    confidenceNote: 'Unanimous consensus across all audiophile and tech press comparisons.'
  }
];

export const SHOPPER_PERSONAS: import('../types').ShopperPersona[] = [
  {
    id: 'business_traveler',
    name: 'Business Traveler',
    emoji: '🧳',
    tagline: 'All-Day Endurance & Noise Isolation',
    category: 'all',
    priorities: ['battery', 'anc', 'comfort', 'reliability'],
    description: 'Prioritizes dependable battery stamina, gentle long-haul clamping force, and class-topping cabin noise cancellation.'
  },
  {
    id: 'creative_audiophile',
    name: 'Creative / Audiophile',
    emoji: '🎧',
    tagline: 'Acoustic Fidelity & Optical Precision',
    category: 'all',
    priorities: ['sound', 'camera', 'performance'],
    description: 'Demands studio-reference dynamic range, low distortion, or professional 4K120fps video and color calibration.'
  },
  {
    id: 'value_student',
    name: 'Budget / Student',
    emoji: '🎓',
    tagline: 'High Price-to-Performance Ratio',
    category: 'all',
    priorities: ['value', 'battery', 'reliability'],
    description: 'Focuses on multi-year software longevity, durable chassis build, and maximum features per dollar.'
  },
  {
    id: 'power_user',
    name: 'Power Commuter',
    emoji: '⚡',
    tagline: 'Multipoint Speed & Call Clarity',
    category: 'all',
    priorities: ['performance', 'callquality', 'software'],
    description: 'Requires instantaneous device switching, responsive mic beamforming, and seamless OS integration.'
  }
];

export const STRESS_SCENARIOS: import('../types').StressScenario[] = [
  {
    id: 'baseline',
    label: 'Normal Organic Baseline',
    badge: 'Standard Audit',
    description: 'Natural review distribution across verified retail and enthusiast channels. Zero artificial clustering.',
    injectedCount: 0,
    syntheticRating: 0,
    syntheticSentiment: 'positive',
    flagTriggered: false,
    anomalyTitle: 'Clean Organic Distribution',
    anomalyExplanation: 'Lexical analysis shows varied sentence cadence, natural typos, and healthy sentiment variance.',
    confidencePenaltyPct: 0
  },
  {
    id: 'sponsored_surge',
    label: 'Sponsored 5-Star Surge',
    badge: 'Astroturfing Alert',
    description: 'Simulates a vendor promotional burst injecting +50 5-star reviews with repetitive unboxing phrases within 48 hours.',
    injectedCount: 50,
    syntheticRating: 5.0,
    syntheticSentiment: 'positive',
    flagTriggered: true,
    anomalyTitle: 'Repetitive Text Clustering Detected',
    anomalyExplanation: 'ReviewIQ isolated a surge of 50 five-star reviews within a 48-hr window sharing 86% lexical similarity. Confidence penalised by 25%.',
    confidencePenaltyPct: 25
  },
  {
    id: 'review_bomb',
    label: 'Competitor 1-Star Raid',
    badge: 'Review Bombing Alert',
    description: 'Simulates malicious coordinated 1-star brigading (-40 reviews in 12 hours) targeting non-verified accounts.',
    injectedCount: 40,
    syntheticRating: 1.0,
    syntheticSentiment: 'negative',
    flagTriggered: true,
    anomalyTitle: 'Unverified Negative Brigading Cluster',
    anomalyExplanation: 'Sudden spike of 40 unverified single-star reviews lacking variant specifications. Filtered from true consensus rating.',
    confidencePenaltyPct: 35
  }
];


