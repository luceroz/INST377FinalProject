import React, { useState, useEffect } from 'react';
import { fetchArticArtworks, fetchMetArtworks } from '../service/api';
import ArtStats from '../components/ArtStats';
import LoadingSpinner from '../components/LoadingSpinner';

function Home() {
  const [articArtworks, setArticArtworks] = useState([]);
  const [metArtworks, setMetArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // get 2 API data
        const [articData, metData] = await Promise.all([
          fetchArticArtworks('famous'),
          fetchMetArtworks('famous')
        ]);

        setArticArtworks(articData.data || []);
        setMetArtworks(metData.objectIDs?.slice(0, 5) || []);
      } catch (err) {
        setError('Failed to load data: ' + err.message);
        console.error('Loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div>
      <h2>Welcome to Art Gallery</h2>
      
      <ArtStats 
        articData={articArtworks}
        metData={metArtworks}
      />

      <section>
        <h3>Featured Artworks from Art Institute of Chicago</h3>
        <div className="artworks-grid">
          {articArtworks.map(artwork => (
            <div key={artwork.id} className="artwork-card">
              <h4>{artwork.title}</h4>
              <p>{artwork.artist_display}</p>
              <p>{artwork.date_display}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3>Featured Artworks from Metropolitan Museum</h3>
        <div className="artworks-grid">
          {metArtworks.map(objectID => (
            <div key={objectID} className="artwork-card">
              <p>Artwork ID: {objectID}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
