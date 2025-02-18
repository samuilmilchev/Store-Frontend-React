// eslint-disable-next-line import/prefer-default-export
export const mockChangePassword = async (userName: string, oldPassword: string, newPassword: string) => {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, 500));

  const mockUsers = JSON.parse(localStorage.getItem("mockUsers") || "[]");

  const userIndex = mockUsers.findIndex(
    (user: { userName: string; password: string }) => user.userName === userName && user.password === oldPassword,
  );

  if (userIndex === -1) {
    return { status: 401, message: "Incorrect old password" };
  }

  if (newPassword.length < 6) {
    return { status: 400, message: "New password must be at least 6 characters long." };
  }

  mockUsers[userIndex].password = newPassword;
  localStorage.setItem("mockUsers", JSON.stringify(mockUsers));

  return { status: 200, message: "Password updated successfully" };
};
