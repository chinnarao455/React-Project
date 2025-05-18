import React, { useState } from "react";

export default function AdminPanel({ profiles, onClose, onAdd, onEdit, onDelete }) {
  const [editingProfile, setEditingProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    description: "",
    address: "",
    contact: "",
    interests: "",
  });

  function startEdit(profile) {
    setEditingProfile(profile);
    setFormData({
      name: profile.name,
      photo: profile.photo,
      description: profile.description,
      address: profile.address,
      contact: profile.contact,
      interests: profile.interests.join(", "),
    });
  }

  function resetForm() {
    setEditingProfile(null);
    setFormData({
      name: "",
      photo: "",
      description: "",
      address: "",
      contact: "",
      interests: "",
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const interestsArr = formData.interests.split(",").map((i) => i.trim());
    if (editingProfile) {
      onEdit({ ...editingProfile, ...formData, interests: interestsArr });
    } else {
      onAdd({ ...formData, interests: interestsArr });
    }
    resetForm();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content admin-modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Admin Panel</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            required
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
          />
          <input
            required
            placeholder="Photo URL"
            value={formData.photo}
            onChange={(e) => setFormData((f) => ({ ...f, photo: e.target.value }))}
          />
          <input
            required
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData((f) => ({ ...f, description: e.target.value }))}
          />
          <input
            required
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData((f) => ({ ...f, address: e.target.value }))}
          />
          <input
            required
            placeholder="Contact"
            value={formData.contact}
            onChange={(e) => setFormData((f) => ({ ...f, contact: e.target.value }))}
          />
          <input
            placeholder="Interests (comma separated)"
            value={formData.interests}
            onChange={(e) => setFormData((f) => ({ ...f, interests: e.target.value }))}
          />
          <button type="submit">{editingProfile ? "Save" : "Add"} Profile</button>
          {editingProfile && <button onClick={resetForm}>Cancel Edit</button>}
        </form>

        <h3>Existing Profiles</h3>
        <ul className="admin-profile-list">
          {profiles.map((p) => (
            <li key={p.id}>
              {p.name}
              <button onClick={() => startEdit(p)}>Edit</button>
              <button onClick={() => onDelete(p.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
