import React, { useState, useEffect } from "react";
import { supabase } from "../config/supabase";

function Shop() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newListing, setNewListing] = useState({
    title: "",
    artist_name: "",
    price: "",
    description: "",
    image: "",
  });

  const [selectedSeller, setSelectedSeller] = useState(null);
  const [message, setMessage] = useState("");

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
        artist_name: "",
        price: "",
        description: "",
        image: "",
      });
      fetchListings();
      alert("Art piece listed successfully!");
    } catch (error) {
      console.error("Error submitting listing:", error);
      alert("Failed to submit listing");
    }
  };

  const openContactModal = (seller) => {
    setSelectedSeller(seller);
  };

  const closeContactModal = () => {
    setSelectedSeller(null); 
    setMessage(""); 
  };

  return (
    <div className="shop-container">
      <h2>Shop for Art</h2>
      <p>Support artists by purchasing their masterpieces.</p>

      {/* submit new art piece form */}
      <div className="submit-artwork-form">
        <h3>Submit Your Art for Sale</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Artwork Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newListing.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="artist">Artist Name</label>
            <input
              type="text"
              id="artist"
              name="artist_name"
              value={newListing.artist_name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={newListing.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={newListing.description}
              onChange={handleInputChange}
              required
            />
          </div>


          <div className="form-group">
            <label htmlFor="image_url">Image URL</label>
            <input
              type="url"
              id="image_url"
              name="image"
              value={newListing.image}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            List Artwork
          </button>
        </form>
      </div>

      {/* show art pieces */}
      <div className="artworks-grid">
        {loading ? (
          <p>Loading artworks...</p>
        ) : listings.length === 0 ? (
          <p>No artworks listed yet.</p>
        ) : (
          listings.map((listing) => (
            <div key={listing.id} className="artwork-card">
              <img
                src={listing.image}
                alt={listing.title}
                className="artwork-image"
              />
              <h3>{listing.title}</h3>
              <p>By {listing.artist_name}</p>
              <p className="price">${listing.price}</p>
              <p className="description">{listing.description}</p>
              <button
                className="buy-button"
                onClick={() => openContactModal(listing)} 
              >
                Contact Seller
              </button>
            </div>
          ))
        )}
      </div>

      {/* seller contact */}
      {selectedSeller && (
        <div
          className="contact-modal"
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "300px",
              textAlign: "center",
            }}
          >
            <h3>Contact {selectedSeller.artist_name}</h3>
            <textarea
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ width: "100%", height: "100px" }}
            />
            <br />
            <button
              type="button"
              onClick={() => {
                console.log(`Message sent to ${selectedSeller.artist_name}:`, message);
                setMessage(""); 
                closeContactModal(); 
              }}
              style={{ marginTop: "10px", padding: "10px", backgroundColor: "green", color: "white" }}
            >
              Send Message
            </button>
            <br />
            <button
              type="button"
              onClick={closeContactModal}
              style={{
                marginTop: "10px",
                padding: "10px",
                backgroundColor: "red",
                color: "white",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shop;
