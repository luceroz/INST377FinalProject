import React, { useState, useEffect } from 'react';
import { fetchArticArtworks, fetchMetArtworks, fetchMetArtworkDetails } from '../service/api';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ artic: [], met: [] });
  const [metDetails, setMetDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get Met Artwork details
  useEffect(() => {
    const fetchMetDetails = async () => {
      if (searchResults.met.length > 0) {
        try {
          const details = await Promise.all(
            searchResults.met.map(id => fetchMetArtworkDetails(id))
          );
          setMetDetails(details);
        } catch (err) {
          console.error('Error fetching Met details:', err);
        }
      }
    };

    fetchMetDetails();
  }, [searchResults.met]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setMetDetails([]); // clean previous details

    try {
      const [articResults, metResults] = await Promise.all([
        fetchArticArtworks(searchQuery),
        fetchMetArtworks(searchQuery)
      ]);

      setSearchResults({
        artic: articResults.data || [],
        met: metResults.objectIDs?.slice(0, 5) || []
      });
    } catch (err) {
      setError('Failed to fetch search results: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h2>Search Artworks</h2>
      
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for artworks..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <div>Searching...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <div>
          <section>
            <h3>Results from Art Institute of Chicago</h3>
            <div className="artworks-grid">
              {searchResults.artic.map(artwork => (
                <div key={artwork.id} className="artwork-card">
                  <h4>{artwork.title}</h4>
                  <p>{artwork.artist_display}</p>
                  <p>{artwork.date_display}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3>Results from Metropolitan Museum</h3>
            <div className="artworks-grid">
              {metDetails.map(artwork => (
                <div key={artwork.objectID} className="artwork-card">
                  <h4>{artwork.title}</h4>
                  <p>{artwork.artistDisplayName}</p>
                  <p>{artwork.objectDate}</p>
                  {artwork.primaryImage && (
                    <img 
                      src={artwork.primaryImage} 
                      alt={artwork.title}
                      style={{ width: '100%', height: 'auto', marginTop: '10px' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Search;
