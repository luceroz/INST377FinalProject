import axios from 'axios';

// Art Institute of Chicago API
const ARTIC_API_BASE = 'https://api.artic.edu/api/v1';
const MET_API_BASE = 'https://collectionapi.metmuseum.org/public/collection/v1';

// Art Institute of Chicago API calls
export const fetchArticArtworks = async (query) => {
  try {
    const response = await axios.get(`${ARTIC_API_BASE}/artworks/search`, {
      params: {
        q: query,
        limit: 10,
        fields: 'id,title,artist_display,date_display,medium_display,image_id'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching ARTIC artworks:', error);
    throw error;
  }
};

// Metropolitan Museum API calls
export const fetchMetArtworks = async (query) => {
  try {
    const response = await axios.get(`${MET_API_BASE}/search`, {
      params: {
        q: query,
        hasImages: true
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Met artworks:', error);
    throw error;
  }
};

// Get artwork details from Met API
export const fetchMetArtworkDetails = async (objectID) => {
  try {
    const response = await axios.get(`${MET_API_BASE}/objects/${objectID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Met artwork details:', error);
    throw error;
  }
};

// Backend API Call 1 - Get data from our database
export const fetchGalleryStats = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching gallery stats:', error);
    throw error;
  }
};

// Backend API Call 2 - Submit User Feedback
export const submitFeedback = async (feedback) => {
  try {
    const response = await axios.post('http://localhost:3001/api/feedback', feedback);
    return response.data;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};
