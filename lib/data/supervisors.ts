export interface Supervisor {
  name: string;
  title: string;
  institution: string;
  department: string;
  image: string;
  bio: string;
  researchInterests: string[];
  contributions: string[];
  email: string;
  linkedin: string;
  type: "academic" | "industry";
}

export const supervisors: Supervisor[] = [
  {
    name: "Dr. Magda Ibrahim",
    title: "Associate Professor of Power Electric Engineering",
    institution: "University",
    department: "Department of Electronics & Communication Engineering",
    image: "/supervisors/dr-magda.jpg",
    bio: "Leading researcher in AI for emergency response with extensive publications in deep learning and computer vision applied to disaster management. Primary academic supervisor guiding the Phoenix project's AI architecture and research methodology.",
    researchInterests: ["Deep Learning", "Computer Vision", "Emergency AI", "Machine Learning", "Neural Architecture Search", "Transfer Learning"],
    contributions: ["AI Architecture Guidance", "Research Methodology", "Model Optimization", "Paper Review", "Dataset Strategy", "Academic Mentorship"],
    email: "magda@university.edu",
    linkedin: "https://linkedin.com/in/dr-magda-ibrahim",
    type: "academic",
  },
  {
    name: "Eng. Ahmed Yasser",
    title: "Senior Software Architect",
    institution: "Industry Partner",
    department: "Research & Development",
    image: "/supervisors/eng-ahmed.jpg",
    bio: "Industry veteran with extensive experience in software architecture, IoT systems, and deploying AI solutions for real-world applications.",
    researchInterests: ["Applied AI", "Edge Computing", "IoT Systems", "Cloud Architecture"],
    contributions: ["Industry Perspective", "Deployment Strategy", "Performance Optimization", "Real-world Testing"],
    email: "ahmed.yasser@industry.com",
    linkedin: "https://linkedin.com/in/ahmed-yasser",
    type: "industry",
  },
];
