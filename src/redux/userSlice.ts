/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  description: string;
  profilePicture: string;
  userName: string | null;
  phoneNumber: string;
  deliveryAddress: string;
  isAuthenticated: boolean;
}

const loadFromLocalStorage = (): AuthState => {
  const authData = localStorage.getItem("authState");

  if (authData) {
    const parsedAuth = JSON.parse(authData);
    return {
      userName: parsedAuth.userName || null,
      isAuthenticated: parsedAuth.isAuthenticated || false,
      profilePicture: "",
      description: "",
      phoneNumber: parsedAuth.phoneNumber || "",
      deliveryAddress: parsedAuth.deliveryAddress || "",
    };
  }

  return {
    userName: null,
    isAuthenticated: false,
    profilePicture: "",
    description: "",
    phoneNumber: "",
    deliveryAddress: "",
  };
};
const initialState: AuthState = loadFromLocalStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    signOut: (state) => {
      state.userName = null;
      state.isAuthenticated = false;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    signUp: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    updateUser: (
      state,
      action: PayloadAction<{
        userName: string;
        profilePicture: string;
        description: string;
        phoneNumber: string;
        deliveryAddress: string;
      }>,
    ) => {
      const updatedUser = {
        userName: action.payload.userName,
        profilePicture: action.payload.profilePicture,
        description: action.payload.description,
        phoneNumber: action.payload.phoneNumber,
        deliveryAddress: action.payload.deliveryAddress,
      };

      state.userName = updatedUser.userName;
      state.profilePicture = updatedUser.profilePicture;
      state.description = updatedUser.description;
      state.phoneNumber = updatedUser.phoneNumber;
      state.deliveryAddress = updatedUser.deliveryAddress;

      try {
        const mockUsers = JSON.parse(localStorage.getItem("mockUsers") || "{}");
        const updatedMockUsers = {
          ...mockUsers,
          ...updatedUser,
        };
        localStorage.setItem("mockUsers", JSON.stringify(updatedMockUsers));
      } catch (error) {
        console.error("Failed to update mockUsers in localStorage:", error);
      }
    },
  },
});

export const { signIn, signOut, signUp, updateUser } = authSlice.actions;
export default authSlice.reducer;
