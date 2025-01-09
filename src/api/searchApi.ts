import callOfDutyImg from "@/assets/images/CallOfDuty.jpg";
import fortniteImg from "@/assets/images/Fortnite.jpg";
import minecraftImg from "@/assets/images/Minecraft.jpg";
import sims4Img from "@/assets/images/Sims4.jpg";
import gta5 from "@/assets/images/Grand_Theft_Auto_V.png";
import godOfWar from "@/assets/images/GodOfWar.jpg";
import cyberpunk2077 from "@/assets/images/Cyberpunk2077.jpg";
import halo from "@/assets/images/Halo.jpg";
import animalCrossing from "@/assets/images/AnimalCrossing.png";
import redDeadRedemption from "@/assets/images/RedDeadRedemption2.jpg";
import marioKart from "@/assets/images/MarioKart.jpg";
import assasinCreed from "@/assets/images/AssasinCreed.jpg";
import zelda from "@/assets/images/Zelda.jpg";
import fifa24 from "@/assets/images/Fifa24.jpg";
import overwatch2 from "@/assets/images/Overwatch2.png";
import eldenRing from "@/assets/images/EldenRing.jpg";

const mockData = [
  {
    id: 1,
    name: "Call of Duty",
    category: "playstation",
    genre: "Shooter",
    age: 18,
    rating: 4.5,
    description:
      "An intense and gritty FPS experience featuring a gripping campaign, realistic combat, and cutting-edge multiplayer modes. Engage in tactical warfare across iconic missions and immersive battlefields.",
    price: 59.99,
    dateAdded: "2024-12-05",
    image: callOfDutyImg,
  },
  {
    id: 2,
    name: "Minecraft",
    category: "pc",
    genre: "Strategy",
    age: 6,
    rating: 4.8,
    description:
      "A creative sandbox game where players can build, explore, and survive in a blocky, procedurally generated world. Gather resources, craft tools, and unleash your imagination in infinite possibilities!",
    price: 26.95,
    dateAdded: "2024-12-03",
    image: minecraftImg,
  },
  {
    id: 3,
    name: "Grand Theft Auto V",
    category: "xbox",
    genre: "Action",
    age: 18,
    rating: 4.2,
    description:
      "GTA V is an open-world action game by Rockstar Games, set in San Andreas. Players control three characters through heists and criminal missions. The game offers exploration, shooting, driving, and multiplayer modes, making it one of the best-selling games ever.",
    price: 29.99,
    dateAdded: "2024-12-02",
    image: gta5,
  },
  {
    id: 4,
    name: "The Sims 4",
    category: "pc",
    genre: "Strategy",
    age: 6,
    rating: 4.8,
    description:
      "The Sims 4 is a life simulation game where players create and control virtual characters (Sims). Build homes, form relationships, pursue careers, and explore different life stories in an open, customizable world.",
    price: 39.99,
    dateAdded: "2024-12-01",
    image: sims4Img,
  },
  {
    id: 5,
    name: "Fortnite",
    category: "playstation",
    genre: "Strategy",
    age: 6,
    rating: 4.8,
    description:
      " A thrilling and dynamic Battle Royale game where players build, strategize, and fight to be the last one standing. Featuring vibrant visuals, unique characters, and constantly evolving gameplay with exciting seasonal updates",
    price: 0,
    dateAdded: "2024-12-06",
    image: fortniteImg,
  },
  {
    id: 6,
    name: "God of War: Ragnarok",
    category: "playstation",
    genre: "Action",
    age: 18,
    rating: 4.9,
    description:
      "An epic action-adventure game that follows Kratos and Atreus on a journey through the realms of Norse mythology. Experience breathtaking combat, gripping storytelling, and stunning visuals.",
    price: 69.99,
    dateAdded: "2024-12-07",
    image: godOfWar,
  },
  {
    id: 7,
    name: "Cyberpunk 2077",
    category: "pc",
    genre: "RPG",
    age: 18,
    rating: 4.3,
    description:
      "A sprawling open-world RPG set in a dystopian future. Customize your character, make impactful choices, and explore the neon-lit streets of Night City.",
    price: 49.99,
    dateAdded: "2024-11-30",
    image: cyberpunk2077,
  },
  {
    id: 8,
    name: "Halo Infinite",
    category: "xbox",
    genre: "Shooter",
    age: 16,
    rating: 4.6,
    description:
      "A legendary first-person shooter featuring Master Chief in a new chapter of the Halo saga. Experience epic battles, open-world exploration, and multiplayer modes.",
    price: 59.99,
    dateAdded: "2024-12-10",
    image: halo,
  },
  {
    id: 9,
    name: "Animal Crossing: New Horizons",
    category: "nintendo",
    genre: "Simulation",
    age: 3,
    rating: 4.9,
    description:
      "A charming life simulation game where you create your own paradise on a deserted island. Customize your home, interact with villagers, and enjoy a relaxing escape.",
    price: 59.99,
    dateAdded: "2024-12-02",
    image: animalCrossing,
  },
  {
    id: 10,
    name: "Red Dead Redemption 2",
    category: "pc",
    genre: "Action",
    age: 18,
    rating: 4.8,
    description:
      "An open-world epic set in the American Wild West. Experience a gripping story, stunning landscapes, and detailed characters in this critically acclaimed masterpiece.",
    price: 59.99,
    dateAdded: "2024-12-01",
    image: redDeadRedemption,
  },
  {
    id: 11,
    name: "Mario Kart 8 Deluxe",
    category: "nintendo",
    genre: "Racing",
    age: 3,
    rating: 4.7,
    description:
      "An exciting kart racing game featuring beloved Nintendo characters and thrilling tracks. Compete in high-speed races, use power-ups, and race against friends locally or online.",
    price: 49.99,
    dateAdded: "2024-12-11",
    image: marioKart,
  },
  {
    id: 12,
    name: "Assassin's Creed Valhalla",
    category: "xbox",
    genre: "RPG",
    age: 18,
    rating: 4.4,
    description:
      "A Viking-themed action-RPG where you explore a dynamic open world, build your settlement, and lead raids across England in the Dark Ages.",
    price: 59.99,
    dateAdded: "2024-11-29",
    image: assasinCreed,
  },
  {
    id: 13,
    name: "The Legend of Zelda: Breath of the Wild",
    category: "nintendo",
    genre: "Adventure",
    age: 12,
    rating: 4.9,
    description:
      "An expansive open-world adventure game filled with exploration, puzzles, and epic battles. Discover the secrets of Hyrule and defeat the evil Calamity Ganon.",
    price: 59.99,
    dateAdded: "2024-12-08",
    image: zelda,
  },
  {
    id: 14,
    name: "FIFA 24",
    category: "playstation",
    genre: "Sports",
    age: 3,
    rating: 4.1,
    description:
      "The latest installment in the popular football simulation series. Enjoy realistic gameplay, updated rosters, and new features to enhance the experience.",
    price: 69.99,
    dateAdded: "2024-12-04",
    image: fifa24,
  },
  {
    id: 15,
    name: "Overwatch 2",
    category: "pc",
    genre: "Shooter",
    age: 12,
    rating: 4.5,
    description:
      "A fast-paced team-based shooter featuring unique heroes, dynamic abilities, and tactical gameplay. Join forces with friends and compete in various game modes.",
    price: 0,
    dateAdded: "2024-11-28",
    image: overwatch2,
  },
  {
    id: 16,
    name: "Elden Ring",
    category: "pc",
    genre: "RPG",
    age: 16,
    rating: 4.9,
    description:
      "A critically acclaimed action-RPG developed by FromSoftware, featuring a vast open world, challenging combat, and deep lore. Explore the Lands Between and forge your own path to become the Elden Lord.",
    price: 59.99,
    dateAdded: "2024-12-09",
    image: eldenRing,
  },
];

export const searchProducts = (
  query: string,
  category?: string,
  sortType: string = "rating",
  sortDir: string = "asc",
  genre: string = "",
  age: number = 100,
): Promise<
  {
    id: number;
    name: string;
    category: string;
    description: string;
    price: number;
    dateAdded: string;
    genre: string;
    age: number;
    rating: number;
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

      if (genre) {
        filtered = filtered.filter((product) => product.genre === genre);
      }

      filtered = filtered.filter((product) => product.age <= age);

      filtered.sort((a, b) => {
        const fieldA = a[sortType as keyof typeof a];
        const fieldB = b[sortType as keyof typeof b];

        if (typeof fieldA === "string" && typeof fieldB === "string") {
          return sortDir === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
        }
        if (typeof fieldA === "number" && typeof fieldB === "number") {
          return sortDir === "asc" ? fieldA - fieldB : fieldB - fieldA;
        }

        return 0;
      });

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
    price: number;
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

export const getProducts = (
  sortType: string,
  sortDir: string,
  genre?: string,
  age?: number,
  searchName?: string,
): Promise<typeof mockData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = mockData;

      if (searchName) {
        filtered = filtered.filter((product) => product.name.toLowerCase().includes(searchName.toLowerCase()));
      }

      if (genre) {
        filtered = filtered.filter((product) => product.genre === genre);
      }

      if (age) {
        if (age === 100) {
          filtered = filtered.filter((product) => product.age <= age);
        } else if (age === 3) {
          filtered = filtered.filter((product) => product.age >= 1 && product.age <= 3);
        } else if (age === 6) {
          filtered = filtered.filter((product) => product.age >= 6 && product.age < 12);
        } else if (age === 12) {
          filtered = filtered.filter((product) => product.age >= 12 && product.age < 18);
        } else if (age === 18) {
          filtered = filtered.filter((product) => product.age >= 18);
        }
      }

      filtered.sort((a, b) => {
        if (sortType === "rating") {
          return sortDir === "asc" ? a.rating - b.rating : b.rating - a.rating;
        }
        if (sortType === "price") {
          return sortDir === "asc" ? a.price - b.price : b.price - a.price;
        }
        if (sortType === "name") {
          return sortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }
        return 0;
      });

      resolve(filtered);
    }, 500);
  });
};
