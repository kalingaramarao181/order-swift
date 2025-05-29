export const getAddressFromCoords = async (lat, lng) => {
    const apiKey = "AIzaSyDpQYynPI5mi2WKRjpElTO5epXqPcvATBk";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "OK") {
        return data.results[0]?.formatted_address || "Unknown address";
      }
      return "Unknown address";
    } catch (error) {
      console.error("Geocoding error:", error);
      return "Unknown address";
    }
  };

