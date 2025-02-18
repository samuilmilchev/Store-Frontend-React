/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "@/elements/user/inputText";
import { mockUpdateUser } from "@/api/auth/mockUpdateUser";

import { toast } from "react-toastify";
import Modal from "../modal";
import * as styles from "./edit.module.scss";

interface EditUserModalProps {
  userName: string;
  currentDescription: string;
  currentProfilePicture: string;
  onClose: () => void;
}

function EditUserModal({ userName, currentDescription, currentProfilePicture, onClose }: EditUserModalProps) {
  const dispatch = useDispatch();
  const [profilePicture, setProfilePicture] = useState<string | null>(currentProfilePicture);
  const [description, setDescription] = useState(currentDescription);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");

    const phoneRegex = /^\d{10}$/;
    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      setError("Phone number must be exactly 10 digits.");
      setIsLoading(false);
      return;
    }

    try {
      const updatedUser: {
        userName?: string;
        profilePicture?: string;
        description?: string;
        phoneNumber?: string;
        deliveryAddress?: string;
      } = {};

      if (profilePicture !== currentProfilePicture && profilePicture !== null) {
        updatedUser.profilePicture = profilePicture;
      }
      if (description !== currentDescription) updatedUser.description = description;
      if (phoneNumber) updatedUser.phoneNumber = phoneNumber;
      if (deliveryAddress) updatedUser.deliveryAddress = deliveryAddress;

      if (Object.keys(updatedUser).length === 0) {
        toast.info("No changes were made.");
        return;
      }

      const response = await mockUpdateUser(userName, updatedUser);

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        dispatch({ type: "user/update", payload: response.user });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        onClose();
      } else {
        setError("Failed to update user details");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>
        <InputText label="Description" value={description} onChange={(e) => setDescription(e.target.value)} type="text" />
        <InputText label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" />
        <InputText label="Delivery Address" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} type="text" />
        <label>
          Profile Picture
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        {profilePicture && (
          <div>
            <img src={profilePicture} alt="Profile Preview" />
          </div>
        )}
        {error && <div className={styles.error}>{error}</div>}
        {successMessage && <div className={styles.success}>{successMessage}</div>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </Modal>
  );
}

export default EditUserModal;
