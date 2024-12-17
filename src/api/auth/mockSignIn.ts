// eslint-disable-next-line import/prefer-default-export
export const mockSignIn = async (userName: string, password: string) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  const mockUsers = [
    { userName: "testUser", password: "password123" },
    { userName: "exampleUser", password: "mypassword" },
  ];

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const user = mockUsers.find((user) => user.userName === userName && user.password === password);

  if (user) {
    return { status: 200, userName: user.userName };
  }
  return { status: 401 };
};
