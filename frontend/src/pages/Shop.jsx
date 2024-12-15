import React, { useState, useEffect } from "react";
import { supabase } from "../config/supabase";

function Shop() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newListing, setNewListing] = useState({
    title: "",
    artist: "",
    price: "",
    description: "",
    image_url: "",
  });

  // get all art pieces
  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase.from("listings").select("*");

      if (error) throw error;
      setListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewListing((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // submit new art piece
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("listings")
        .insert([newListing]);

      if (error) throw error;

      // reset form and refresh list
      setNewListing({
        title: "",
        artist: "",
        price: "",
        description: "",
        image_url: "",
      });
      fetchListings();
      alert("Art piece listed successfully!");
    } catch (error) {
      console.error("Error submitting listing:", error);
      alert("Failed to submit listing");
    }
  };

  return (
    <div className='shop-container'>
      <h2>Shop for Art</h2>
      <p>Support artists by purchasing their masterpieces.</p>

      {/* submit new art piece form */}
      <div className='submit-artwork-form'>
        <h3>Submit Your Art for Sale</h3>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='title'>Artwork Title</label>
            <input
              type='text'
              id='title'
              name='title'
              value={newListing.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='artist'>Artist Name</label>
            <input
              type='text'
              id='artist'
              name='artist'
              value={newListing.artist}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='price'>Price ($)</label>
            <input
              type='number'
              id='price'
              name='price'
              value={newListing.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              name='description'
              value={newListing.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='image_url'>Image URL</label>
            <input
              type='url'
              id='image_url'
              name='image_url'
              value={newListing.image_url}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type='submit' className='submit-button'>
            List Artwork
          </button>
        </form>
      </div>

      {/* show art pieces */}
      <div className='artworks-grid'>
        {loading ? (
          <p>Loading artworks...</p>
        ) : listings.length === 0 ? (
          <p>No artworks listed yet.</p>
        ) : (
          listings.map((listing) => (
            <div key={listing.id} className='artwork-card'>
              <img
                src={listing.image}
                alt={listing.title}
                className='artwork-image'
              />
              <h3>{listing.title}</h3>
              <p>By {listing.artist_name}</p>
              <p className='price'>${listing.price}</p>
              <p className='description'>{listing.description}</p>
              <button className='buy-button'>Contact Seller</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Shop;
