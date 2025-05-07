import React, { useState, useEffect } from "react";
import "../styles/ProfilePage.css";
import { MdClose } from "react-icons/md";
import RestaurantDetailsForm from "../../forms/restaurantDetailsForm";
import { getCookiesData } from "../../utils/cookiesData";
import { getRestaurantImagesById, getRestaurantProfileById } from "../../api/restaurentApi";
import { getUserById } from "../../api/authApi";
import { baseUrl } from "../../config/constants";
import RestaurantImagesForm from "../../forms/restaurantImagesForm";

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [isOpenProfileDetails, setIsOpenProfileDetails] = useState(false);
  const [isOpenImageForm, setIsOpenImageForm] = useState(false);
  const [restaurantImages, setRestaurantImages] = useState([]);
  // const [completeProfileButton, setCompleteProfileButton] = useState(false);

  const [userData, setUserData] = useState({
    email: "",
    phone: "",
  });

  const [profile, setProfile] = useState({
    name: "",
    location: "",
    image_url: "",
    coverImage: "",
    description: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const ownerId = getCookiesData().userId;
        const restaurantData = await getRestaurantProfileById(ownerId);
        const userDataRes = await getUserById(ownerId);
        const restaurantImagesRes = await getRestaurantImagesById(restaurantData[0]?.id);

        setRestaurantImages(restaurantImagesRes || []);
        console.log("Restaurant Images:", restaurantImagesRes);
        

        setUserData({
          email: userDataRes.email || "",
          phone: userDataRes.phone || "",
        });

        setProfile({
          id: restaurantData[0]?.id || "",
          name: restaurantData[0]?.name || "",
          location: restaurantData[0]?.location || "",
          image_url: restaurantData[0]?.image_url || "",
          coverImage: restaurantData[0]?.coverImage || "",
          description: restaurantData[0]?.description || "",
        });
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image_url" || name === "coverImage") {
      const file = files[0];
      if (file) {
        const imageURL = URL.createObjectURL(file);
        setProfile({ ...profile, [name]: imageURL });
      }
    } else if (name === "email" || name === "phone") {
      setUserData({ ...userData, [name]: value });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSave = () => {
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  const calculateProfileCompletion = () => {
    const totalFields = 6;
    let filled = 0;
    if (profile.name) filled++;
    if (userData.email) filled++;
    if (userData.phone) filled++;
    if (profile.location) filled++;
    if (profile.description) filled++;
    if (profile.image_url) filled++;
    return Math.round((filled / totalFields) * 100);
  };

  return (
    <div className="os-profile-container">
      <div className="os-profile-cover">
        <img
          src={profile.coverImage || "/profile/profile-cover-image.jpg"}
          alt="Cover"
        />
      </div>

      <div className="os-profile-logo">
        <img
          className="os-logo"
          src={`${baseUrl}${profile.image_url}` || "/profile/profile-logo.png"}
          alt="Logo"
        />
      </div>

      <div className="os-profile-header">
        <h2 className="os-page-title">{profile.name || "Restaurant Name"}</h2>
        <button
          className="os-edit-profile-btn"
          onClick={() => setIsOpenProfileDetails(true)}
        >
          Complete Profile
        </button>
      </div>

      <div className="os-profile-completion">
        <p>Profile Completion: {calculateProfileCompletion()}%</p>
        <progress value={calculateProfileCompletion()} max="100"></progress>
      </div>

      <div className="os-profile-card">
        <div className="os-profile-info">
          <div className="os-field">
            <label>Description</label>
            {editMode ? (
              <textarea
                name="description"
                value={profile.description}
                onChange={handleChange}
              />
            ) : (
              <p>{profile.description}</p>
            )}
          </div>

          <div className="os-field">
            <label>Email</label>
            {editMode ? (
              <input
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            ) : (
              <p>{userData.email}</p>
            )}
          </div>

          <div className="os-field">
            <label>Phone</label>
            {editMode ? (
              <input
                name="phone"
                value={userData.phone}
                onChange={handleChange}
              />
            ) : (
              <p>{userData.phone}</p>
            )}
          </div>

          <div className="os-field">
            <label>Address</label>
            {editMode ? (
              <textarea
                name="address"
                value={profile.location}
                onChange={handleChange}
              />
            ) : (
              <p>{profile.location}</p>
            )}
          </div>

          <div className="os-profile-actions">
            {editMode ? (
              <button onClick={handleSave}>Save Changes</button>
            ) : (
              <button onClick={() => setEditMode(true)}>Edit Profile</button>
            )}
          </div>
        </div>
      </div>

      <div className="os-gallery">
        <div className="os-gallery-title">
          <h3>Our Restaurant in Pictures</h3>{" "}
          <button
            onClick={() => setIsOpenImageForm(true)}
            className="os-gallery-add-btn"
          >
            Add Images
          </button>
        </div>
        <div className="os-gallery-grid">
          {restaurantImages.map((image, index) => (
            <img
              key={index}
              src={`${baseUrl}${image.image_url}`}
              alt={`Restaurant ${index + 1}`} className="os-gallery-image"
            />
          ))}
        </div>
      </div>

      {isOpenProfileDetails && (
        <div className="login-popup-overlay">
          <div className="login-popup">
            <button
              className="order-login-close-button"
              onClick={() => setIsOpenProfileDetails(false)}
            >
              <MdClose />
            </button>
            <div className="order-login-page">
              <RestaurantDetailsForm
                fullName={"Ramarao"}
                onClose={() => setIsOpenProfileDetails(false)}
              />
            </div>
          </div>
        </div>
      )}

      {isOpenImageForm && (
        <div className="login-popup-overlay">
          <div className="login-popup">
            <button
              className="order-login-close-button"
              onClick={() => setIsOpenImageForm(false)}
            >
              <MdClose />
            </button>
            <div className="order-login-page">
              <RestaurantImagesForm
                restaurantData={profile}
                onClose={() => setIsOpenImageForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
