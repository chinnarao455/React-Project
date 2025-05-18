// App.js
import React, { useState, useEffect } from "react";
import ProfileList from "./components/ProfileList";
import ProfileDetails from "./components/ProfileDetails";
import AdminPanel from "./components/AdminPanel";
import MapModal from "./components/MapModal";
import SearchFilter from "./components/SearchFilter";
import "./App.css";

const initialProfiles = [
  {
    id: 1,
    name: "Alice Johnson",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    description: "Software engineer from NY.",
    address: "1600 Pennsylvania Avenue NW, Washington, DC 20500",
    contact: "alice@example.com",
    interests: ["Hiking", "Photography"],
  },
  {
    id: 2,
    name: "Bob Smith",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    description: "Marketing specialist based in CA.",
    address: "1 Infinite Loop, Cupertino, CA 95014",
    contact: "bob@example.com",
    interests: ["Reading", "Gaming"],
  },
];

function App() {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [mapAddress, setMapAddress] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter profiles by search term
  const filteredProfiles = profiles.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle summary button click - show map modal
  function handleShowMap(profile) {
    setError(null);
    setLoading(true);
    setMapAddress(profile.address);
    setShowMap(true);

    // Simulate address validation (replace with real API if needed)
    setTimeout(() => {
      if (!profile.address) {
        setError("Invalid address.");
        setShowMap(false);
      }
      setLoading(false);
    }, 1000);
  }

  // Handle profile card click - show details modal
  function handleShowDetails(profile) {
    setSelectedProfile(profile);
    setShowDetails(true);
  }

  // Handle add/edit/delete from admin panel
  function handleAddProfile(newProfile) {
    setProfiles((prev) => [...prev, { id: Date.now(), ...newProfile }]);
  }

  function handleEditProfile(updatedProfile) {
    setProfiles((prev) =>
      prev.map((p) => (p.id === updatedProfile.id ? updatedProfile : p))
    );
  }

  function handleDeleteProfile(id) {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="app-container">
      <header>
        <h1>Profile Explorer</h1>
        <button onClick={() => setShowAdmin(true)} className="admin-btn">
          Admin Panel
        </button>
      </header>

      <SearchFilter value={searchTerm} onChange={setSearchTerm} />

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      <ProfileList
        profiles={filteredProfiles}
        onShowMap={handleShowMap}
        onShowDetails={handleShowDetails}
      />

      {showMap && (
        <MapModal
          address={mapAddress}
          onClose={() => setShowMap(false)}
          setError={setError}
        />
      )}

      {showDetails && selectedProfile && (
        <ProfileDetails
          profile={selectedProfile}
          onClose={() => setShowDetails(false)}
        />
      )}

      {showAdmin && (
        <AdminPanel
          profiles={profiles}
          onClose={() => setShowAdmin(false)}
          onAdd={handleAddProfile}
          onEdit={handleEditProfile}
          onDelete={handleDeleteProfile}
        />
      )}
    </div>
  );
}

export default App;
