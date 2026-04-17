import { Github, Linkedin, Twitter, Globe } from "lucide-react";

export const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'github':
      return <Github size={18} />;
    case 'linkedin':
      return <Linkedin size={18} />;
    case 'twitter':
      return <Twitter size={18} />;
    case 'researchgate':
    case 'googlescholar':
      return <Globe size={18} />;
    default:
      return null;
  }
};
