export interface Event {
  id: number;
  date: string;
  month: string;
  year: string;
  title: string;
  description: string;
  type: 'upcoming' | 'ongoing' | 'latest';
  slug?: string;
}

export const events: Event[] = [
  // UPCOMING
  {
    id: 11,
    date: "📅 JUNE",
    month: "06",
    year: "2026",
    title: "TAUS Conference 2026",
    description: "iPhytos will participate in the upcoming TAUS Conference in June 2026, continuing to share the latest clinical insights on URIPHYTOL® and our innovative drug development pipeline.",
    type: "upcoming",
    slug: "taus-conference-mwanza"
  },
  // ONGOING
  {
    id: 10,
    date: "📅 APRIL-JUNE",
    month: "04",
    year: "2026",
    title: "URIPHYTOL CMEs",
    description: "iPhytos is conducting Continuing Medical Education (CME) sessions on URIPHYTOL across various health facilities, educating healthcare professionals on BPH management and treatment.",
    type: "ongoing",
    slug: "cme-uriphytol-prostatic-disorders"
  },
  // LATEST (newest first)
  {
    id: 7,
    date: "📅 25 MARCH",
    month: "03",
    year: "2026",
    title: "High-Level Summit on Traditional Medicine, Tanzania",
    description: "iPhytos participated in a high-level consultative meeting on traditional medicine organized by the Ministry of Health, advocating for robust research pipelines and accelerated drug development.",
    type: "latest",
    slug: "high-level-summit-traditional-medicine-tanzania"
  },
  {
    id: 9,
    date: "📅 JANUARY",
    month: "01",
    year: "2026",
    title: "National Pharmaceutical Investment Forum",
    description: "iPhytos participated in a high-level forum convened by the Minister of Health Tanzania, engaging in discussions on investment opportunities and local pharmaceutical manufacturing.",
    type: "latest",
    slug: "national-pharmaceutical-investment-forum"
  },
  {
    id: 8,
    date: "📅 NOVEMBER",
    month: "11",
    year: "2025",
    title: "TAPHATA Conference, Mwanza",
    description: "iPhytos presented its advanced approach to medicine discovery at the TAPHATA Conference, a distinguished gathering of pharmaceutical technologists officiated by the Regional Commissioner of Mwanza.",
    type: "latest",
    slug: "taphata-conference-mwanza"
  },
  {
    id: 6,
    date: "📅 OCTOBER",
    month: "10",
    year: "2025",
    title: "Strategic partnership in Cuba.",
    description: "The Ministry of Health has continued to make a significant contribution to traditional medicine by coordinating a workshop for experience sharing between Tanzania and Cuba aimed at improving traditional medicine services. This workshop is taking place in the city of Havana. As major stakeholders in this sector, we at iPhytos are participating in this workshop.",
    type: "latest",
    slug: "tanzania-cuba-traditional-medicine-workshop"
  },
  {
    id: 5,
    date: "📅 25-31 AUGUST",
    month: "08",
    year: "2025",
    title: "African Traditional Medicine Week",
    description: "iPhytos is pleased to announce its anticipated participation in the conference and exhibitions of the African Traditional Medicine Week, scheduled to take place from August 25 to 31, 2025.",
    type: "latest",
    slug: "african-traditional-medicine-week"
  },
  {
    id: 1,
    date: "📅 5-10 JULY",
    month: "07",
    year: "2025",
    title: "StatPhys conference, Kigali, Rwanda",
    description: "iPhytos CEO, Dr Daniel M Shadrack, participated in the StatPhys conference held in Kigali, Rwanda, sharing insights on statistical physics and drug design.",
    type: "latest",
    slug: "statphys-conference-kigali-rwanda"
  },
  {
    id: 2,
    date: "📅 12-13 JUNE",
    month: "06",
    year: "2025",
    title: "TAUS Conference, Mwanza, Tanzania",
    description: "iPhytos proudly participated in the Urologists' Conference hosted by TAUS. We shared the latest clinical insights on URIPHYTOL®, our flagship herbal medicine for BPH, along with updates on our innovative drug development pipeline in next-generation phytotherapy.",
    type: "latest"
  },
  {
    id: 3,
    date: "📅 4-6 JUNE",
    month: "06",
    year: "2025",
    title: "Pharmaceutical Society of Tanzania (PST) Conference",
    description: "iPhytos participated in the PST Conference held in Arusha, Tanzania.",
    type: "latest",
    slug: "pst-conference-arusha"
  },
  {
    id: 4,
    date: "📅 MAY-JULY",
    month: "05",
    year: "2025",
    title: "CMEs on URIPHYTOL",
    description: "We conducted CMEs on URIPHYTOL in various health facilities.",
    type: "latest",
    slug: "cme-uriphytol-prostatic-disorders"
  }
];
