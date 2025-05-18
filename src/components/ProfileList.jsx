import React from "react";

export default function ProfileList({ profiles, onShowMap, onShowDetails }) {
  if (profiles.length === 0) return <p>No profiles found.</p>;

  return (
    <div className="profile-list">
      {profiles.map((profile) => (
        <div key={profile.id} className="profile-card">
          <img src={profile.photo} alt={profile.name} />
          <h3>{profile.name}</h3>
          <p>{profile.description}</p>
          <button onClick={() => onShowMap(profile)}>Summary (Show Map)</button>
          <button onClick={() => onShowDetails(profile)}>Details</button>
        </div>
      ))}
    </div>
  );
}
