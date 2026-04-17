export interface Slide {
  id: number;
  image: string;
  title: string;
}

export const slides: Slide[] = [
  {
    id: 0,
    image: "/hero/hero-4.webp",
    title: "Designing Safe, Better And Precision Medicines"
  },
  {
    id: 1,
    image: "/hero/hero-5.webp",
    title: "Extending Health and Longevity with Next generation Phytotherapy"
  },
  {
    id: 2,
    image: "/images/capacity.webp",
    title: "Coding the Future of Medicine"
  },
  {
    id: 3,
    image: "/hero/TAUSI.jpeg",
    title: "Advancing Urological Care Across Tanzania"
  },
  {
    id: 4,
    image: "/hero/TAUSI-2.jpeg",
    title: "TAUS Conference 2026 – Shaping the Future of Urology"
  }
];
