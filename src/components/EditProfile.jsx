import React, { useState } from 'react';
import axios from 'axios';
import './EditProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';

const EditProfile = ({ userData, setUserData }) => {
  const [formData, setFormData] = useState({
    firstname: userData.firstname || '',
    lastname: userData.lastname || '',
    email: userData.email || '',
    mobile: userData.mobile || '',
  });
  const [saving, setSaving] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axios.put(
        'https://wrighto-sustainables-backend.onrender.com/api/user/update-profile',
        formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert(res.data.message || 'Profile updated!');
      // pull out the actual user object
      if (setUserData) setUserData(res.data.user);
    } catch (err) {
      console.error(err);
      alert('Update failed!');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        {/* First Name */}
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faUser} /> First Name
          </label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faUser} /> Last Name
          </label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Mobile */}
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faPhone} /> Mobile
          </label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>

        {/* Save Button at the bottom right */}
        <div className="edit-profile-actions">
          <button
            type="submit"
            className="profile-save-btn"
            disabled={saving}
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
