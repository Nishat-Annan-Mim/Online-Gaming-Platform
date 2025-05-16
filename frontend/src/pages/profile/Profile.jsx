import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaUser, FaEnvelope, FaBell, FaSignOutAlt, FaEdit } from "react-icons/fa";
import axios from "axios";
import styles from "./Profile.module.css";

const Profile = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(true);

  useEffect(() => {
    if (authUser) {
      setFormData({
        username: authUser.username || "",
        email: authUser.email || "",
      });
      fetchNotifications();
    }
  }, [authUser]);

  const fetchNotifications = async () => {
    try {
      setLoadingNotifications(true);
      const response = await axios.get("/api/notifications", {
        withCredentials: true,
      });
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("Failed to load notifications");
    } finally {
      setLoadingNotifications(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await axios.put(
        "/api/profile",
        formData,
        { withCredentials: true }
      );
      
      setAuthUser(response.data);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update profile";
      toast.error(errorMessage);
      if (error.response?.data?.field) {
        setErrors((prev) => ({
          ...prev,
          [error.response.data.field]: errorMessage,
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setAuthUser(null);
    navigate("/");
    toast.success("Logged out successfully");
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      await axios.put(`/api/notifications/${notificationId}/read`, {}, {
        withCredentials: true,
      });
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
      toast.error("Failed to mark notification as read");
    }
  };

  if (!authUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
              <FaUser />
            </div>
          </div>
          {!isEditing ? (
            <>
              <h1 className={styles.username}>{authUser.username}</h1>
              <p className={styles.email}>
                <FaEnvelope className={styles.icon} />
                {authUser.email}
              </p>
            </>
          ) : (
            <div className={styles.editForm}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.username ? styles.inputError : ""}`}
                  placeholder="Username"
                />
                {errors.username && (
                  <span className={styles.errorMessage}>{errors.username}</span>
                )}
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                  placeholder="Email"
                />
                {errors.email && (
                  <span className={styles.errorMessage}>{errors.email}</span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={styles.actionsContainer}>
          {isEditing ? (
            <>
              <button
                className={`${styles.actionButton} ${styles.saveButton}`}
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                className={`${styles.actionButton} ${styles.cancelButton}`}
                onClick={() => setIsEditing(false)}
                disabled={loading}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className={styles.actionButton}
              onClick={() => setIsEditing(true)}
            >
              <FaEdit /> Edit Profile
            </button>
          )}
          <button
            className={`${styles.actionButton} ${styles.logoutButton}`}
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        <div className={styles.notificationsContainer}>
          <h2 className={styles.sectionTitle}>
            <FaBell className={styles.icon} /> Notifications
          </h2>
          {loadingNotifications ? (
            <div>Loading notifications...</div>
          ) : notifications.length > 0 ? (
            <div className={styles.notificationsList}>
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`${styles.notification} ${
                    !notification.read ? styles.unread : ""
                  }`}
                  onClick={() => markNotificationAsRead(notification._id)}
                >
                  <p>{notification.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noNotifications}>No notifications</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 