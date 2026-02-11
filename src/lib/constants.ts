export interface Industry {
  id: string;
  color: string;
  icon: string;
  image: string;
}

export const INDUSTRIES: Industry[] = [
  {
    id: "epc",
    color: "#3fbad2",
    icon: "/svgs/epc.svg",
    image: "/images/architecture.jpg",
  },
  {
    id: "water",
    color: "#3b82f6", // blue
    icon: "/svgs/water.svg",
    image: "/images/water.jpg",
  },
  {
    id: "furniture",
    color: "#8b5cf6", // purple
    icon: "/svgs/furniture.svg",
    image: "/images/furniture.jpg",
  },
  {
    id: "feed",
    color: "#10b981", // green
    icon: "/svgs/feed.svg",
    image: "/images/feed.jpg",
  },
  {
    id: "service",
    color: "#f59e0b", // amber
    icon: "/svgs/service.svg",
    image: "/images/service.png",
  },
  {
    id: "auto",
    color: "#ef4444", // red
    icon: "/svgs/auto.svg",
    image: "/images/auto.jpg",
  },
  {
    id: "retail",
    color: "#1a8fa6",
    icon: "/svgs/retail.svg",
    image: "/images/retail.jpg",
  },
  {
    id: "equipment",
    color: "#22c55e", // lime
    icon: "/svgs/landscaping.svg",
    image: "/images/equipment.png",
  },
];
