// Types
export interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  slug: string;
}

export interface NewsDetail {
  content: string;
  author: string;
  readTime: string;
  tags: string[];
}

export interface NewsDetailsMap {
  [key: string]: NewsDetail;
}

// News items array
export const newsItems: NewsItem[] = [
  {
    id: 15,
    title: "iPhytos Joins High-Level Summit on Traditional Medicine in Tanzania",
    date: "March 25, 2026",
    category: "News & Events",
    excerpt: "On March 25, 2026, iPhytos participated in a high-level consultative meeting on traditional medicine held in Tanzania. Organized by the Ministry of Health, the summit gathered key industry leaders to shape the future of indigenous healthcare solutions.",
    image: "/news-file/IMG_2115.jpg",
    slug: "high-level-summit-traditional-medicine-tanzania",
  },
  {
    id: 17,
    title: "iPhytos at National Pharmaceutical Investment Forum",
    date: "January, 2026",
    category: "News & Events",
    excerpt: "In January 2026, iPhytos was invited to participate in a high-level forum convened by the Minister of Health Tanzania, bringing together key pharmaceutical investors and strategic stakeholders across sectors.",
    image: "/news-file/IMG_2115.jpg",
    slug: "national-pharmaceutical-investment-forum",
  },
  {
    id: 16,
    title: "iPhytos at TAPHATA Conference – Mwanza",
    date: "November, 2025",
    category: "News & Events",
    excerpt: "iPhytos was honored to participate in the TAPHATA Conference held in Mwanza, a distinguished gathering of pharmaceutical technologists from across the country. iPhytos presented its advanced approach to medicine discovery—where natural product intelligence meets cutting-edge computational design.",
    image: "/news-file/IMG_2115.jpg",
    slug: "taphata-conference-mwanza",
  },
  {
    id: 14,
    title: "iPhytos Participates in Tanzania-Cuba Traditional Medicine Workshop in Havana",
    date: "October, 2025",
    category: "News & Events",
    excerpt: "The Ministry of Health has continued to make a significant contribution to traditional medicine by coordinating a workshop for experience sharing between Tanzania and Cuba aimed at improving traditional medicine services. This workshop is taking place in the city of Havana. As major stakeholders in this sector, we at iPhytos are participating in this workshop.",
    image: "/news-file/cuba.webp",
    slug: "tanzania-cuba-traditional-medicine-workshop",
  },
  {
    id: 13,
    title: "iPhytos CEO Makes History at StatPhys Satellite, Kigali, Rwanda",
    date: "July 5–10, 2025",
    category: "News",
    excerpt: "iPhytos CEO, Dr. Daniel M. Shadrack, participated in the first-ever StatPhys Satellite conference in Kigali, Rwanda, sharing insights on the role of statistical physics in drug design and development.",
    image: "/news-file/two.webp",
    slug: "statphys-conference-kigali-rwanda",
  },
  {
    id: 12,
    title: "TAUS Conference, Mwanza, Tanzania",
    date: "June 12-13, 2025",
    category: "News",
    excerpt: "iPhytos proudly participated in the Urologists' Conference hosted by TAUS. We shared the latest clinical insights on URIPHYTOL®, our flagship herbal medicine for BPH, along with updates on our innovative drug development pipeline in next-generation phytotherapy.",
    image: "/news-file/tausi.webp",
    slug: "taus-conference-mwanza",
  },
  {
    id: 1,
    title: "Pharmaceutical Society of Tanzania (PST) Conference",
    date: "June 4–6, 2025",
    category: "Events",
    excerpt: "iPhytos participated in the PST Conference held in Arusha, Tanzania, showcasing our latest developments and research in pharmaceutical innovation.",
    image: "/images/about-us2.jpeg",
    slug: "pst-conference-arusha",
  },

    

   {
    id: 4,
    title: "iPhytos conducts CME on URIPHYTOL and prostatic disorders",
    date: "March 12, 2024",
    category: "News",
    excerpt: "iPhytos conducts CME on URIPHYTOL and prostatic disorders, educating healthcare professionals about the latest treatments.",
    image: "/news-file/IMG_1713.jpg",
    slug: "cme-uriphytol-prostatic-disorders",
  },
  {
    id: 2,
    title: "Medical Camp in Mara Region",
    date: "December 12, 2024",
    category: "Events",
    excerpt: "iPhytos organized a successful medical camp in Mara Region, providing free health screenings and education about prostate health.",
    image: "/news-file/IMG_1608.jpg",
    slug: "medical-camp-mara-region",
  },
  {
    id: 3,
    title: "iPhytos CEO participate in the African biophysics school in Kigali, Rwanda",
    date: "April 12, 2024",
    category: "News",
    excerpt: "iPhytos CEO participates in the African Biophysics school on experimental and computation in Kigali, Rwanda. The activity brought together both computational and experimental biophysicists.",
    image: "/news-file/IMG_1735.jpg",
    slug: "ceo-african-biophysics-school",
  },
 
  {
    id: 5,
    title: "Hon. Ummy Mwalimu visiting iPhytos booth",
    date: "February 1, 2024",
    category: "News",
    excerpt: "Minister for Health, Hon. Ummy Mwalimu visiting iPhytos booth and receiving details about URIPHYTOL during the TAUS conference, held in June, 2024 in Dar es Salaam, Tanzania.",
    image: "/news-file/IMG_1122.jpg",
    slug: "ummy-mwalimu-visiting-booth",
  },
  {
    id: 6,
    title: "iPhytos joins hands with MDM urology specialized hospital",
    date: "January 12, 2024",
    category: "News",
    excerpt: "iPhytos joins hands with MDM urology specialized hospital to promote health awareness campaign on prostate disorders and other diseases. The campaign was held in Tanga, Tanzania.",
    image: "/news-file/news-image-1-1024x770.jpg",
    slug: "iphytos-mdm-hospital-partnership",
  },
  {
    id: 7,
    title: "Hon. Dr Godwin Moleli visited iPhytos booth",
    date: "December 12, 2023",
    category: "News",
    excerpt: "Deputy minister for Health, Hon. Dr Godwin Moleli visited iPhytos booth during the African tradition medicine week that was held in Mwanza, Tanzania in September, 2024. The deputy minister was impressed by the work on drug /medicine development current done at iPhytos.",
    image: "/news-file/news-image-4-1024x680.jpg",
    slug: "godwin-moleli-visited-booth",
  },
  {
    id: 8,
    title: "Phytos team visited and presented to the ministry of health",
    date: "November 1, 2023",
    category: "News",
    excerpt: "Phytos team visited and presented to the ministry of health on the clinical progress of URIPHYTOL.",
    image: "/news-file/news-image-2-1024x768.jpg",
    slug: "team-presented-ministry-health",
  },
  {
    id: 9,
    title: "iPhytos Founder & CEO fosters science in Africa",
    date: "November 1, 2023",
    category: "News",
    excerpt: "iPhytos Founder & CEO fosters science in Africa through innovative research and development initiatives.",
    image: "/news-file/Shadrack_web-1024x576.jpg",
    slug: "founder-fosters-science-africa",
  },
  {
    id: 10,
    title: "iPhytos sign agreement with UDOM",
    date: "November 1, 2023",
    category: "Events",
    excerpt: "iPhytos sign agreement with the University of Dodoma (UDOM) to advance research on the discovery and development of antiviral medicine.",
    image: "/news-file/109.jpg",
    slug: "agreement-with-udom",
  },
  {
    id: 11,
    title: "iPhytos signs MoU with ITM-MUHAS",
    date: "November 1, 2023",
    category: "Events",
    excerpt: "iPhytos signs MoU with ITM-MUHAS (Institute of Traditional Medicine, Muhumbili University of Health and Allied Sciences) to collaborate and accelerate drug design.",
    image: "/news-file/placeholder-user.jpg",
    slug: "mou-with-itm-muhas",
  },
  
];

// News details map
export const newsDetails: NewsDetailsMap = {
  "national-pharmaceutical-investment-forum": {
    content: `
      <h2>iPhytos at National Pharmaceutical Investment Forum</h2>
      <p>In January 2026, iPhytos was invited to participate in a high-level forum convened by the Minister of Health Tanzania, bringing together key pharmaceutical investors and strategic stakeholders across sectors.</p>

      <p>The forum underscored a national call to action—to advance local pharmaceutical manufacturing and unlock Tanzania's potential as a hub for medicine production.</p>

      <p>Amidst this distinguished gathering, iPhytos engaged in forward-looking discussions on investment opportunities, reaffirming its commitment to shaping the future of therapeutic innovation within Tanzania.</p>
    `,
    author: "iPhytos Communications Team",
    readTime: "4 min read",
    tags: ["Pharmaceutical", "Investment", "Ministry of Health", "Tanzania", "Manufacturing"]
  },
  "taphata-conference-mwanza": {
    content: `
      <h2>iPhytos at TAPHATA Conference – Mwanza</h2>
      <p>iPhytos was honored to participate in the TAPHATA Conference held in Mwanza, a distinguished gathering of pharmaceutical technologists from across the country.</p>

      <p>At this high-level forum, iPhytos presented its advanced approach to medicine discovery—where natural product intelligence meets cutting-edge computational design—reflecting a new standard in therapeutic innovation.</p>

      <p>The conference was officiated by the Regional Commissioner of Mwanza, reinforcing its national significance.</p>

      <p>Our presence reaffirmed iPhytos' position at the forefront of a new era in African drug discovery—defined by precision, purpose, and quiet excellence.</p>
    `,
    author: "iPhytos Communications Team",
    readTime: "4 min read",
    tags: ["TAPHATA", "Pharmaceutical", "Drug Discovery", "Conference", "Mwanza"]
  },
  "high-level-summit-traditional-medicine-tanzania": {
    content: `
      <h2>iPhytos Joins High-Level Summit on Traditional Medicine in Tanzania</h2>
      <p>On March 25, 2026, iPhytos participated in a high-level consultative meeting on traditional medicine held in Tanzania. Organized by the Ministry of Health, the summit gathered key industry leaders to shape the future of indigenous healthcare solutions.</p>

      <p>As a dedicated stakeholder in the sector, iPhytos engaged with the platform to advocate for robust research pipelines and accelerated drug development. By bridging traditional knowledge with modern scientific rigor, we aim to expand the availability of safe, effective, and locally-sourced treatments.</p>

      <h3>Advancing Our Portfolio</h3>
      <p>Our commitment to innovation is reflected in our current therapeutic milestones:</p>
      <ul>
        <li><strong>BPH Treatment:</strong> We have successfully registered our primary medicine for the treatment of Benign Prostatic Hyperplasia (BPH).</li>
        <li><strong>Diabetes Innovation:</strong> A new treatment for diabetes is currently in the final stages of preparation and is expected to launch shortly.</li>
      </ul>

      <p>Through strategic partnerships and continuous research, iPhytos remains at the forefront of transforming traditional medicine into globally recognized healthcare standards.</p>
    `,
    author: "iPhytos Communications Team",
    readTime: "5 min read",
    tags: ["Traditional Medicine", "Summit", "Ministry of Health", "BPH", "Diabetes", "Drug Development", "Tanzania"]
  },
  "tanzania-cuba-traditional-medicine-workshop": {
    content: `
      <h2>iPhytos Participates in Tanzania-Cuba Traditional Medicine Workshop in Havana</h2>
      <p>The Ministry of Health has continued to make a significant contribution to traditional medicine by coordinating a workshop for experience sharing between Tanzania and Cuba aimed at improving traditional medicine services. This workshop is taking place in the city of Havana.</p>
      
      <p>As major stakeholders in this sector, we at iPhytos are participating in this workshop, bringing our expertise in traditional medicine research and development to this important international collaboration.</p>
      
      <h3>Workshop Objectives</h3>
      <p>This bilateral workshop aims to:</p>
      <ul>
        <li>Share experiences and best practices in traditional medicine between Tanzania and Cuba</li>
        <li>Strengthen collaboration in traditional medicine research and development</li>
        <li>Improve traditional medicine services in both countries</li>
        <li>Foster knowledge exchange and capacity building</li>
      </ul>
      
      <h3>iPhytos's Role</h3>
      <p>Our participation in this workshop demonstrates our commitment to advancing traditional medicine through international collaboration. We bring our extensive experience in:</p>
      <ul>
        <li>Research and development of herbal medicines</li>
        <li>Clinical validation of traditional remedies</li>
        <li>Quality control and standardization of traditional medicines</li>
        <li>Capacity building and knowledge transfer</li>
      </ul>
      
      <p>This workshop represents a significant step forward in strengthening traditional medicine practices and fostering international cooperation in healthcare innovation.</p>
    `,
    author: "iPhytos Communications Team",
    readTime: "6 min read",
    tags: ["Traditional Medicine", "International Collaboration", "Cuba", "Workshop", "Ministry of Health", "Research"]
  },
  "statphys-conference-kigali-rwanda": {
    content: `
      <h2>iPhytos CEO, Dr. Daniel M. Shadrack, Makes History at StatPhys Satellite in Kigali, Rwanda</h2>
      <p>We are proud to announce that our CEO, Dr. Daniel M. Shadrack, participated in the first-ever StatPhys Satellite conference hosted in Kigali, Rwanda—marking a historic moment for the global physics community and Africa alike.</p>
      <p>Dr. Shadrack contributed to this landmark event by sharing insights on how statistical physics is driving innovation and accelerating breakthroughs in drug design and development—a core mission at iPhytos.</p>
      <p>The StatPhys Satellite began with an intensive two-day school held on July 5–6, 2025, followed by the main workshop from July 7–10, bringing together leading scientists, researchers, and innovators to exchange knowledge at the intersection of physics and life sciences.</p>
      <p>At iPhytos, we remain committed to advancing the frontiers of phytotherapy and pharmaceutical development through cutting-edge science, collaboration, and a vision for impact driven from Africa to the world.</p>
    `,
    author: "iPhytos Communications Team",
    readTime: "5 min read",
    tags: ["StatPhys", "Physics", "Drug Design", "Innovation", "Conference", "Africa"],
  },
  "medical-camp-mara-region": {
    content: `
      <p>On December 12, 2024, iPhytos organized a comprehensive medical camp in the Mara Region of Tanzania, focusing on men's health and prostate awareness. The event, which drew over 500 participants from surrounding communities, provided free health screenings, consultations, and educational sessions about prostate health and the importance of early detection.</p>
      
    `,
    author: "iPhytos Communications Team",
    readTime: "5 min read",
    tags: ["Medical Camp", "Prostate Health", "Community Outreach", "Healthcare Access"]
  },

  "taus-conference-mwanza": {
  content: `
    <p>On June 12–13, 2025, iPhytos proudly participated in the Tanzania Association of Urological Surgeons (TAUS) Conference in Mwanza. The event brought together leading urologists and researchers from across the region to explore advancements in urological care.</p>

    <p>During the conference, iPhytos presented the latest clinical findings on <strong>URIPHYTOL®</strong>, our flagship herbal formulation for Benign Prostatic Hyperplasia (BPH). Attendees also gained exclusive insights into our ongoing phytotherapy research and development pipeline, focused on next-generation plant-based treatments for urological conditions.</p>

    <p>Our participation underscored iPhytos’ continued commitment to evidence-based herbal medicine and our mission to expand access to innovative, safe, and effective therapies in Tanzania and beyond.</p>
  `,
  author: "iPhytos Communications Team",
  readTime: "5 min read",
  tags: ["TAUS Conference", "URIPHYTOL®", "BPH", "Phytotherapy", "Clinical Research", "Urology"]
},

  "ceo-african-biophysics-school": {
    content: `
      <p>Dr. Daniel M. Shadrack, Founder and CEO of iPhytos, recently participated in the prestigious African Biophysics School held in Kigali, Rwanda from April 5-12, 2024. The week-long intensive program brought together leading computational and experimental biophysicists from across Africa and beyond, fostering collaboration and knowledge exchange in this cutting-edge field.</p>
      
    `,
    author: "Emiliana Z. Biseko",
    readTime: "6 min read",
    tags: ["Biophysics", "Scientific Research", "International Collaboration", "Drug Discovery"]
  },
  "cme-uriphytol-prostatic-disorders": {
    content: `
      <p>On December 2024, iPhytos successfully conducted a Continuing Medical Education (CME) session focused on URIPHYTOL and the management of prostatic disorders. The event, held in Mwanza, brought together over 50 healthcare professionals, including urologists, general practitioners, pharmacists, and medical students.</p>
      
    `,
    author: "Dr. Albentina M. Lotha",
    readTime: "5 min read",
    tags: ["Medical Education", "BPH Treatment", "Healthcare Professionals", "Clinical Training"]
  },
  "ummy-mwalimu-visiting-booth": {
    content: `
      <p>During the TAUS conference in Dar es Salaam, Tanzania in June 2024, we were honored to host the Minister for Health, Hon. Ummy Mwalimu, at the iPhytos booth. The Minister showed great interest in URIPHYTOL and engaged in detailed discussions about its development and potential impact on healthcare in Tanzania.</p>
      <p>During her visit, Hon. Mwalimu learned about our innovative approach to drug development and expressed support for local pharmaceutical research initiatives. The interaction highlighted the growing recognition of iPhytos's contribution to Tanzania's healthcare sector.</p>
    `,
    author: "iPhytos Communications Team",
    readTime: "4 min read",
    tags: ["Government Relations", "Healthcare Policy", "URIPHYTOL", "Conference"]
  },
  "iphytos-mdm-hospital-partnership": {
    content: `
      <p>In a significant step towards expanding healthcare access, iPhytos has established a partnership with MDM Urology Specialized Hospital in Tanga, Tanzania. This collaboration aims to raise awareness about prostate disorders and other urological conditions through comprehensive health campaigns.</p>
      <p>The partnership includes joint health awareness programs, educational initiatives for healthcare providers, and improved access to specialized urological care for patients in the Tanga region. This collaboration represents a crucial step in our mission to improve men's health outcomes in Tanzania.</p>
    `,
    author: "Dr. Sarah M. Kimaro",
    readTime: "5 min read",
    tags: ["Healthcare Partnership", "Urology", "Public Health", "Community Outreach"]
  },
  "godwin-moleli-visited-booth": {
    content: `
      <p>During the African Traditional Medicine Week held in Mwanza, Tanzania in September 2024, Deputy Minister for Health, Hon. Dr. Godwin Moleli, visited the iPhytos exhibition booth. The visit provided an opportunity to showcase our groundbreaking work in medicine development, particularly our innovative approach to combining traditional knowledge with modern scientific methods.</p>
      <p>Dr. Moleli expressed particular interest in our research methodology and the progress we've made in developing effective treatments. The deputy minister's positive response underscores the growing recognition of iPhytos's role in advancing healthcare solutions in Tanzania.</p>
    `,
    author: "iPhytos Communications Team",
    readTime: "4 min read",
    tags: ["Traditional Medicine", "Government Relations", "Research Development", "Healthcare Innovation"]
  },
  "team-presented-ministry-health": {
    content: `
      <p>The iPhytos research team conducted a comprehensive presentation to the Ministry of Health, focusing on the clinical progress of URIPHYTOL. The presentation detailed our rigorous research methodology, clinical trial results, and the potential impact of URIPHYTOL on public health.</p>
      <p>Ministry officials engaged in detailed discussions about our findings and expressed interest in supporting further research and development initiatives. This presentation marks a significant milestone in our ongoing collaboration with government health authorities.</p>
    `,
    author: "Dr. Emmanuel K. Nyambo",
    readTime: "5 min read",
    tags: ["Clinical Research", "Government Relations", "URIPHYTOL", "Healthcare Policy"]
  },
  "founder-fosters-science-africa": {
    content: `
      <p>In the world of science, physics and medicine may seem like two separate, distinct fields. Yet, a remarkable success story emerges from the heart of Africa, showing how the seemingly non-concrete realm of physics can have a direct impact on solving health issues. This story challenges the misconception that physics remains confined to abstract theories, highlighting its crucial role in addressing real-world challenges and changing lives.</p>
      <p>Read more about the intersection of physics and medicine in Africa: <a href="https://www.ictp.it/news/2023/9/chemistry-biophysics" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-primary/80 transition-colors underline">Chemistry meets biophysics at African school</a></p>
    `,
    author: "Prof. Maria J. Kusekwa",
    readTime: "4 min read",
    tags: ["Scientific Leadership", "Biophysics", "Healthcare Innovation", "African Science"]
  },
  "agreement-with-udom": {
    content: `
      <p>iPhytos has entered into a groundbreaking agreement with the University of Dodoma (UDOM) to advance research in antiviral medicine discovery and development. This collaboration brings together iPhytos's expertise in drug development with UDOM's research infrastructure and academic excellence.</p>
      <p>The partnership focuses on developing innovative antiviral treatments, leveraging both traditional knowledge and modern scientific methods. This collaboration will also provide research opportunities for students and faculty, contributing to the development of local scientific expertise.</p>
    `,
    author: "Dr. Frank M. Willison",
    readTime: "5 min read",
    tags: ["Academic Partnership", "Research Collaboration", "Antiviral Research", "Drug Development"]
  },
  "mou-with-itm-muhas": {
    content: `
      <p>iPhytos has signed a Memorandum of Understanding (MoU) with the Institute of Traditional Medicine at Muhimbili University of Health and Allied Sciences (ITM-MUHAS). This partnership aims to accelerate drug design and development by combining traditional medicinal knowledge with modern scientific approaches.</p>
      <p>The collaboration will focus on identifying and developing potential drug candidates from Tanzania's rich botanical resources, while ensuring sustainable use of natural resources and benefit-sharing with local communities. This partnership represents a significant step in bridging traditional medicine with modern pharmaceutical research.</p>
    `,
    author: "Dr. Lucy A. Mgasa",
    readTime: "5 min read",
    tags: ["Traditional Medicine", "Research Partnership", "Drug Development", "Academic Collaboration"]
  },
 "pst-conference-arusha": {
  content: `
    <p>iPhytos proudly participated in the Pharmaceutical Society of Tanzania (PST) Conference, which took place from June 4–6, 2025, in Arusha, Tanzania. This significant event brought together healthcare professionals, researchers, and industry leaders to discuss the latest developments in pharmaceutical science and healthcare innovation.</p>
    
    <h2>Conference Highlights</h2>
    <p>During the conference, iPhytos showcased our latest research and developments in natural medicine, with a special focus on our groundbreaking work with <strong>URIPHYTOL®</strong>. Our team presented innovative approaches to drug development and reaffirmed our commitment to advancing healthcare solutions in Tanzania.</p>
    
    <h2>Our Presence at the Conference</h2>
    <p>Attendees visited our booth to learn more about our research initiatives, ongoing clinical trials, and future development plans. Our team of experts was available for in-depth discussions about our pharmaceutical innovations and explored potential collaboration opportunities.</p>
    
    <h2>Event Recap</h2>
    <ul>
      <li>Date: June 4–6, 2025</li>
      <li>Location: Arusha Conference Center, Tanzania</li>
      <li>Booth: TBA</li>
    </ul>
  `,
  author: "iPhytos Events Team",
  readTime: "3 min read",
  tags: ["Conference", "Pharmaceutical", "Healthcare Innovation", "Research"]
}

};

// Available categories for filtering
export const categories = ["All", "News", "Events"];
