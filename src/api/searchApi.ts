import callOfDutyImg from "@/assets/images/CallOfDuty.jpg";
import fortniteImg from "@/assets/images/Fortnite.jpg";
import minecraftImg from "@/assets/images/Minecraft.jpg";

const mockData = [
  {
    id: 1,
    name: "Call of Duty",
    category: "playstation",
    description:
      "An intense and gritty FPS experience featuring a gripping campaign, realistic combat, and cutting-edge multiplayer modes. Engage in tactical warfare across iconic missions and immersive battlefields.",
    price: "$59.99",
    dateAdded: "2024-12-05",
    image: callOfDutyImg,
  },
  {
    id: 2,
    name: "Minecraft",
    category: "pc",
    description:
      "A creative sandbox game where players can build, explore, and survive in a blocky, procedurally generated world. Gather resources, craft tools, and unleash your imagination in infinite possibilities!",
    price: "$26.95",
    dateAdded: "2024-12-03",
    image: minecraftImg,
  },
  {
    id: 3,
    name: "Grand Theft Auto V",
    category: "xbox",
    description: "Open-world action",
    price: "$29.99",
    dateAdded: "2024-12-02",
    image: "",
  },
  { id: 4, name: "The Sims 4", category: "pc", description: "Life simulation game", price: "$39.99", dateAdded: "2024-12-01", image: "" },
  {
    id: 5,
    name: "Fortnite",
    category: "playstation",
    description:
      " A thrilling and dynamic Battle Royale game where players build, strategize, and fight to be the last one standing. Featuring vibrant visuals, unique characters, and constantly evolving gameplay with exciting seasonal updates",
    price: "Free",
    dateAdded: "2024-12-06",
    image: fortniteImg,
  },
];

export const searchProducts = (
  query: string,
  category?: string,
): Promise<
  {
    id: number;
    name: string;
    category: string;
    description: string;
    price: string;
    dateAdded: string;
  }[]
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = mockData;
      if (category) {
        filtered = filtered.filter((product) => product.category === category);
      }
      if (query) {
        filtered = filtered.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));
      }
      resolve(filtered);
    }, 500);
  });
};

export const getTopGames = (): Promise<
  {
    id: number;
    name: string;
    category: string;
    description: string;
    price: string;
    dateAdded: string;
    image: string;
  }[]
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sortedGames = [...mockData].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      resolve(sortedGames.slice(0, 3));
    }, 500);
  });
};
