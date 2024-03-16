import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TutorSidebar from '../../Partials/tutorsidebar';
import '../../css/profile-page.css';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import Link and useNavigate

const TutorProfile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    languages: '',
    courses: '',
    profilePicture: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        console.log("Fetching profile data...");
        const response = await fetch('http://localhost:5000/api/tutor/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log("Response from fetch:", response);
        const data = await response.json();
        console.log("Data received:", data);
        setProfile(data.tutor);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
  
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} to ${value}`);
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };
  
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProfileImage(imageFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data...");
    const confirmation = window.confirm('Are you sure you want to update your profile?');
    if (confirmation) {
      try {
        console.log("Preparing form data...");
        console.log("Profile before submission:", profile);
        
        // Prepare the data payload
        const data = {
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phoneNumber: profile.phoneNumber,
          languages: profile.languages,
          courses: profile.courses,
        };
  
        // If profile image is selected, add it to the payload
        if (profileImage) {
          data.profilePicture = profileImage;
        }
  
        console.log("Data payload prepared:", data);
  
        // Send the data payload to the server
        const token = localStorage.getItem('token');
        const response = await axios.put('http://localhost:5000/api/tutor/profile', data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
  
        console.log("Profile updated successfully!");
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };
  

  const handleDelete = async () => {
    const confirmation = window.confirm('Are you sure you want to delete your profile?');
    if (confirmation) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete('http://localhost:5000/api/tutor/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        alert('Profile deleted successfully!');
        // Redirect to login page after profile deletion
        navigate('/');
      } catch (error) {
        console.error('Error deleting profile:', error);
      }
    }
  };

  const renderSidebar = () => {
    return <TutorSidebar />;
  };

  return (
    <div className="profile-container">
      {renderSidebar()}
      <main>
        <form onSubmit={handleSubmit}>
          <div className="profile-picture">
            <img src={profile.profilePicture} alt="Profile" />
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <label>
            First Name:
            <input type="text" name="firstName" value={profile.firstName} onChange={handleChange} />
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName" value={profile.lastName} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={profile.email} onChange={handleChange} />
          </label>
          <label>
            Phone No:
            <input type="tel" name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} />
          </label>
          <label>
            Languages:
            <input type="text" name="languages" value={profile.languages} onChange={handleChange} />
          </label>
          <label>
            Courses:
            <input type="text" name="courses" value={profile.courses} onChange={handleChange} />
          </label>
          <div className="form-actions">
            <button type="submit">Update Profile</button>
            <button type="button" className="delete" onClick={handleDelete}>Delete Profile</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default TutorProfile;
