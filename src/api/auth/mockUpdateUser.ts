// eslint-disable-next-line import/prefer-default-export
export const mockUpdateUser = async (userName: string, updatedData: Record<string, unknown>) => {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, 500));

  const mockUsers = JSON.parse(localStorage.getItem("mockUsers") || "[]");

  const userIndex = mockUsers.findIndex((user: { userName: string }) => user.userName === userName);

  if (userIndex === -1) {
    return { status: 404, message: "User not found" };
  }

  mockUsers[userIndex] = { ...mockUsers[userIndex], ...updatedData };
  localStorage.setItem("mockUsers", JSON.stringify(mockUsers));

  return { status: 200, user: mockUsers[userIndex] };
};
