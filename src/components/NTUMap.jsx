import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScriptNext, DirectionsRenderer } from '@react-google-maps/api';

// Container Style
const containerStyle = {
  width: '100%',
  height: '400px',
};

// NTU Campus coordinates
const center = {
  lat: 1.3483,  // Latitude for NTU
  lng: 103.6831, // Longitude for NTU
};

// Marker locations
const markerLocations = [
  { lat: 1.3483, lng: 103.6831, svg: 'green' },  // NTU Main Campus
  { lat: 1.3500, lng: 103.6840, svg: 'orange' },  // Another location at NTU
  { lat: 1.3460, lng: 103.6810, svg: 'red' },     // Another location at NTU
];

// Define SVG icons as data URLs
const svgIcons = {
  green: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
    </svg>
  `),
  orange: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="orange">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
    </svg>
  `),
  red: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
    </svg>
  `)
};

// Configure libraries
const libraries = ['marker', 'places', 'directions'];

const NTUMap = () => {
  const mapRef = useRef();
  const markersRef = useRef([]);  // Store markers here
  const [showMarkers, setShowMarkers] = useState(false);  // State to track if markers should be shown
  const [selectedMarker, setSelectedMarker] = useState(null);  // Track the selected marker
  const [directionsResponse, setDirectionsResponse] = useState(null);  // Store the directions response

  // Function to handle adding/removing markers
  const handleMarkersToggle = () => {
    if (showMarkers) {
      // Remove markers when hiding them
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];  // Clear marker references
    } else {
      // Add markers with custom icons and make them clickable
      markerLocations.forEach((location) => {
        const marker = new window.google.maps.Marker({
          position: location,
          map: mapRef.current,
          icon: {
            url: svgIcons[location.svg],  // Use the corresponding custom SVG icon
            scaledSize: new window.google.maps.Size(40, 40),  // Size of the icon (adjust as needed)
            anchor: new window.google.maps.Point(20, 40),  // Adjust the anchor to ensure proper positioning
          }
        });

        // Add click listener to set the selected marker
        marker.addListener('click', () => {
          setSelectedMarker(location);
        });

        markersRef.current.push(marker);  // Store marker reference
      });
    }
    setShowMarkers(!showMarkers);  // Toggle the showMarkers state
  };

  // Function to show directions from user's current location to the selected marker
  const handleShowDirections = () => {
    if (navigator.geolocation && selectedMarker) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const userLocation = { lat: latitude, lng: longitude };

        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
          {
            origin: userLocation,
            destination: selectedMarker,  // Use the selected marker as the destination
            travelMode: window.google.maps.TravelMode.WALKING,  // Set the travel mode to WALKING
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              setDirectionsResponse(result);
            } else {
              console.error(`Error fetching directions: ${status}`);
            }
          }
        );
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="w-full max-w-2xl px-4 sm:px-6 md:px-8 lg:px-10">
        <p>Hello, this is the NTU Map</p>

        {/* Button to show/hide markers */}
        <div className="flex space-x-4 mb-4">
          <button 
            onClick={handleMarkersToggle} 
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {showMarkers ? 'Hide Markers' : 'Show Markers'}
          </button>

          {/* Button to show directions */}
          <button
            onClick={handleShowDirections}
            className={`px-4 py-2 ${selectedMarker ? 'bg-green-600' : 'bg-gray-400 cursor-not-allowed'} text-white rounded`}
            disabled={!selectedMarker}  // Disable if no marker is selected
          >
            Show Directions (Walking)
          </button>
        </div>

        {/* Async Loading of Google Maps API */}
        <LoadScriptNext
          googleMapsApiKey="" 
          libraries={libraries}  // Use the static libraries array
          async  // Load the API asynchronously
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={16}
            options={{ mapId: "" }}
            onLoad={map => (mapRef.current = map)}
          >
            {/* Render the directions if they are available */}
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </LoadScriptNext>
      </div>
    </div>
  );
};

export default NTUMap;
