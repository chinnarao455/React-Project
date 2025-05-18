import React from "react";

export default function ProfileDetails({ profile, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content details-modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <img src={profile.photo} alt={profile.name} />
        <h2>{profile.name}</h2>
        <p>{profile.description}</p>
        <p><b>Contact:</b> {profile.contact}</p>
        <p><b>Interests:</b> {profile.interests.join(", ")}</p>
        <p><b>Address:</b> {profile.address}</p>
      </div>
    </div>
  );
}
