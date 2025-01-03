/* eslint-disable react/button-has-type */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ChangePasswordModal from "@/components/user/Edit/changePasswordModal";
import EditUserModal from "@/components/user/Edit/editUserModal";
import * as styles from "./profilePage.module.scss";

interface UserProfile {
  userName: string;
  profilePicture: string;
  description: string;
  isAuthenticated: boolean;
  phoneNumber: string;
  deliveryAddress: string;
}

function Profile(): JSX.Element {
  const auth = useSelector((state: RootState) => state.auth);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

  useEffect(() => {
    if (auth.userName) {
      const mockUsers = JSON.parse(localStorage.getItem("mockUsers") || "[]");
      const userProfile = mockUsers.find((user: UserProfile) => user.userName === auth.userName);

      if (userProfile) {
        setProfile(userProfile);
      }
    }
  }, [auth.userName]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.profilePage}>
      <h1>Profile</h1>
      <hr />
      <div className={styles.userInfo}>
        <img src={profile.profilePicture || "/default-profile.png"} alt={`${profile.userName}'s profile`} className={styles.Picture} />
        <h4>
          Username:<h2>{profile.userName}</h2>
        </h4>
        <h4>
          Description:<p>{profile.description || "No description provided."}</p>
        </h4>
        <h4>
          Phone:<p>{profile.phoneNumber || "No phone number provided."}</p>
        </h4>
        <h4>
          Delivery Address:<p>{profile.deliveryAddress || "No delivery address provided."}</p>
        </h4>
      </div>
      <div className={styles.profileActions}>
        <button onClick={() => setEditUserModalOpen(true)}>Edit Info</button>
        <button onClick={() => setChangePasswordModalOpen(true)}>Change Password</button>
      </div>

      {isEditUserModalOpen && (
        <EditUserModal
          onClose={() => setEditUserModalOpen(false)}
          userName={profile.userName}
          currentDescription=""
          currentProfilePicture=""
        />
      )}
      {isChangePasswordModalOpen && <ChangePasswordModal onClose={() => setChangePasswordModalOpen(false)} userName={profile.userName} />}
    </div>
  );
}

export default Profile;
