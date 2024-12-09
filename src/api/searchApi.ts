const mockData = [
  { id: 1, name: "Call of Duty" },
  { id: 2, name: "Minecraft" },
  { id: 3, name: "Grand Theft Auto V" },
  { id: 4, name: "The Sims 4" },
  { id: 5, name: "Fortnite" },
];

// eslint-disable-next-line import/prefer-default-export
export const searchProducts = (query: string): Promise<{ id: number; name: string }[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = mockData.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));
      resolve(filtered);
    }, 500);
  });
};
