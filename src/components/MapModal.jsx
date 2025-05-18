import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

mapboxgl.accessToken = "pk.eyJ1IjoibWFwYm94dXNlciIsImEiOiJja3d6aHB2dGswMWFvMnZwZW11aG5tN3lzIn0.Pk3xP3WdCQ2s5N0Y_n9qxA";
const geocodingClient = mbxGeocoding({ accessToken: mapboxgl.accessToken });

export default function MapModal({ address, onClose, setError }) {
  const [map, setMap] = useState(null);
  const mapContainer = React.useRef(null);

  useEffect(() => {
    if (!address) return;

    geocodingClient
      .forwardGeocode({
        query: address,
        limit: 1,
      })
      .send()
      .then(response => {
        const match = response.body.features[0];
        if (!match) {
          setError("Address not found on map.");
          return;
        }

        const [lng, lat] = match.geometry.coordinates;

        const mapInstance = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [lng, lat],
          zoom: 12,
        });

        new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapInstance);
        setMap(mapInstance);
      })
      .catch(err => {
        console.error(err);
        setError("Error fetching map data.");
      });

    return () => map?.remove(); // cleanup on unmount
  }, [address]);

  return (
    <div className="map-modal">
      <div ref={mapContainer} style={{ height: "400px", width: "100%" }} />
      <button onClick={onClose}>Close</button>
    </div>
  );
}






// import React, { useEffect, useState } from "react";
// import mapboxgl from "mapbox-gl";


// //mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";
// mapboxgl.accessToken = "your_actual_mapbox_access_token";


// export default function MapModal({ address, onClose, setError }) {
//   const [map, setMap] = useState(null);
//   const [loadingMap, setLoadingMap] = useState(true);

//   useEffect(() => {
//     async function initMap() {
//       try {
//         // Geocode address using Mapbox API
//         const response = await fetch(
//           `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//             address
//           )}.json?access_token=${mapboxgl.accessToken}`
//         );
//         const data = await response.json();
//         if (!data.features || data.features.length === 0) {
//           setError("Address not found on map.");
//           onClose();
//           return;
//         }
//         const [lng, lat] = data.features[0].center;

//         const mapInstance = new mapboxgl.Map({
//           container: "map",
//           style: "mapbox://styles/mapbox/streets-v11",
//           center: [lng, lat],
//           zoom: 14,
//         });

//         new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapInstance);

//         setMap(mapInstance);
//         setLoadingMap(false);
//       } catch (e) {
//         setError("Failed to load map.");
//         onClose();
//       }
//     }
//     initMap();

//     return () => map?.remove();
//   }, [address, onClose, setError]);

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content map-modal">
//         <button className="close-btn" onClick={onClose}>
//           ×
//         </button>
//         {loadingMap ? <p>Loading map...</p> : <div id="map" style={{ height: "400px" }} />}
//       </div>
//     </div>
//   );
// }
