// eslint-disable-next-line import/prefer-default-export
export const mockSignUp = async (userName: string, password: string) => {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, 500));

  const mockUsers = JSON.parse(localStorage.getItem("mockUsers") || "[]");

  const userExists = mockUsers.some((user: { userName: string }) => user.userName === userName);

  if (userExists) {
    return { status: 400, message: "User already exists" };
  }

  const newUser = { userName, password, profilePicture: "" };
  localStorage.setItem("mockUsers", JSON.stringify([...mockUsers, newUser]));

  return { status: 201, userName };
};
