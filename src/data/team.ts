export interface TeamMember {
  id: number;
  name: string;
  role: string;
  section: 'leadership' | 'board' | 'sab';
  boardRole?: string;
  image: string;
  location: string;
  bio: string;
  longBio: string;
  expertise: string[];
  contact: {
    email: string;
    phone?: string;
    office?: string;
  };
  socialLinks: {
    [key: string]: string | undefined;
  };
}

export const advisoryBoard: TeamMember[] = [
  {
    id: 101,
    name: "Prof. James Smith, PhD",
    role: "Scientific Advisor | Medicinal Chemistry",
    section: 'sab',
    boardRole: "Advisory Board Chair",
    image: "/team/team4.png", // TODO: Update with actual advisor image
    location: "Cambridge, UK",
    bio: "Prof. Smith advises on our drug development strategy and medicinal chemistry approaches.",
    longBio: "Professor Smith brings decades of experience in medicinal chemistry and drug development. His expertise helps guide our natural product research and drug optimization processes.",
    expertise: [
      "Medicinal Chemistry",
      "Drug Development",
      "Natural Products",
      "Pharmaceutical Research"
    ],
    contact: {
      email: "advisoryboard@iphytos.co.tz",
      office: "iPhytos Scientific Advisory Board"
    },
    socialLinks: {}
  },
  {
    id: 102,
    name: "Dr. Maria Rodriguez, MD, PhD",
    role: "Scientific Advisor | Clinical Research",
    section: 'sab',
    boardRole: "Clinical Advisory Lead",
    image: "/team/team1.png", // TODO: Update with actual advisor image
    location: "Barcelona, Spain",
    bio: "Dr. Rodriguez provides expertise in clinical research methodology and trial design.",
    longBio: "Dr. Rodriguez is an expert in clinical research and trial design, helping ensure our research meets international standards and best practices.",
    expertise: [
      "Clinical Trials",
      "Research Methodology",
      "Medical Research",
      "Drug Safety"
    ],
    contact: {
      email: "clinicaladvisory@iphytos.co.tz",
      office: "iPhytos Clinical Advisory Board"
    },
    socialLinks: {}
  },
  {
    id: 103,
    name: "Dr. David Chen, PhD",
    role: "Scientific Advisor | Computational Biology",
    section: 'sab',
    boardRole: "Technology Advisory Lead",
    image: "/team/team2.JPG", // TODO: Update with actual advisor image
    location: "Singapore",
    bio: "Dr. Chen advises on computational approaches and AI integration in drug discovery.",
    longBio: "Dr. Chen is a leading expert in computational biology and AI applications in drug discovery. He helps guide our technological strategy and computational methods.",
    expertise: [
      "Computational Biology",
      "Artificial Intelligence",
      "Drug Discovery",
      "Bioinformatics"
    ],
    contact: {
      email: "techadvisory@iphytos.co.tz",
      office: "iPhytos Technology Advisory Board"
    },
    socialLinks: {}
  }
];

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Daniel M. Shadrack, PhD",
    role: "Founder, Chairman & CEO | Computational Biophysicist",
    section: 'leadership',
    boardRole: "Executive Director & Chairman",
    image: "/team/team1.png",
    location: "Arusha, Tanzania",
    bio: "Dr. Shadrack is the founder and CEO of iPhytos, leading our mission to redefine medicine through biophysics, AI, and natural products.",
    longBio: "Dr. Daniel M. Shadrack is a computational biophysicist with expertise in drug discovery and development. As the founder and CEO of iPhytos, he leads our efforts to harness the power of biophysics, artificial intelligence, and natural products to design life-saving medicines that are better, safer, and more precise. His vision drives our company's commitment to challenging the status quo in pharmaceutical development.",
    expertise: [
      "Computational Biophysics",
      "Drug Discovery",
      "Artificial Intelligence",
      "Natural Product Chemistry"
    ],
    contact: {
      email: "ceo@iphytos.co.tz",
      office: "iPhytos Headquarters, Arusha"
    },
    socialLinks: {
      linkedin: "https://linkedin.com/company/iphytos"
    }
  },
  {
    id: 2,
    name: "Emiliana Z. Biseko, MSc",
    role: "Cofounder & CTO | Pharmaceutical Scientist",
    section: 'leadership',
    boardRole: "Secretary",
    image: "/team/team3.jpeg",
    location: "Arusha, Tanzania",
    bio: "Emiliana leads our research initiatives, focusing on developing natural product-based treatments with enhanced efficacy and fewer side effects.",
    longBio: "Emiliana Z. Biseko brings extensive expertise in pharmaceutical science and natural product research to iPhytos. As our Research Director, she oversees the development of our innovative treatments, including our flagship product URIPHYTOL®. Her work focuses on unlocking the healing potential of natural compounds while ensuring rigorous scientific validation of all our products.",
    expertise: [
      "Pharmaceutical Science",
      "Natural Product Research",
      "Clinical Trials",
      "Product Development"
    ],
    contact: {
      email: "emiliana.biseko@iphytos.co.tz",
      office: "iPhytos Research Laboratory"
    },
    socialLinks: {}
  },
  {
    id: 3,
    name: "Dr. Albertina M. Lotha, MD",
    role: "Operations Manager & Director of Medical Services | Clinical Research",
    section: 'leadership',
    boardRole: "Member",
    image: "/team/team2.avif",
    location: "Arusha, Tanzania",
    bio: "Dr. Lotha oversees the clinical aspects of our product development, ensuring all treatments meet the highest standards of safety and efficacy.",
    longBio: "Dr. Albentina M. Lotha brings valuable clinical expertise to iPhytos as our Medical Director. With her background in medicine, she plays a crucial role in translating our research into practical treatments that address real patient needs. She leads our clinical trials and works closely with healthcare providers to gather feedback on our products, including URIPHYTOL®.",
    expertise: [
      "Clinical Medicine",
      "Medical Research",
      "Patient Care",
      "Healthcare Integration"
    ],
    contact: {
      email: "albentina.lotha@iphytos.co.tz",
      office: "iPhytos Clinical Division"
    },
    socialLinks: {}
  }
];
