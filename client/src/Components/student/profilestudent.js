import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import StudentSidebar from '../../Partials/studentsidebar'; // Import StudentSidebar component
import '../../css/profile-page.css';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    profilePicture: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:5000/api/student/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setProfile(data.student);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    const confirmation = window.confirm('Are you sure you want to update your profile?');
    if (confirmation) {
      try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('profilePicture', profileImage);
        formData.append('firstName', profile.firstName);
        formData.append('lastName', profile.lastName);
        formData.append('email', profile.email);
        formData.append('phoneNumber', profile.phoneNumber);
        console.log("Form data prepared:", formData);


        await axios.put('http://localhost:5000/api/student/profile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
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
        await axios.delete('http://localhost:5000/api/student/profile', {
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
    return <StudentSidebar />;
  };

  return (
    
    <div className="profile-container">
      {renderSidebar()}
      <main>
      <u><h1 style={{ textAlign: 'center' }}>My Profile</h1></u>

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
          <div className="form-actions">
            <button type="submit">Update Profile</button>
            <button type="button" className="delete" onClick={handleDelete}>Delete Profile</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default UserProfile;
