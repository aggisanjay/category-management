import React, { useState } from 'react';
import axios from '../api/axiosConfig'; // Ensure you have axios config
import './CategoryCard.css'; // Add custom CSS for styling

const CategoryCard = ({ category, onUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(category.name);
  const [newItemCount, setNewItemCount] = useState(category.itemCount);
  const [newImage, setNewImage] = useState(null);

  // Handle updating category
  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('name', newName);
    formData.append('itemCount', newItemCount);
    if (newImage) formData.append('image', newImage);

    try {
      await axios.put(`/api/categories/${category._id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setIsEditing(false); // Exit edit mode
      onUpdated(); // Trigger parent function to reload categories
    } catch (err) {
      console.error('Failed to update category', err);
    }
  };

  
  

  return (
    <div className="category-card">
      <div className="category-image">
        <img
          src={category.imageUrl ? `https://loclalhost:5000/${category.imageUrl}` : '/images/default-image.jpg'}
          alt={category.name}
        />
      </div>
      <div className="category-details">
        {isEditing ? (
          <>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="edit-input"
            />
            <input
              type="number"
              value={newItemCount}
              onChange={(e) => setNewItemCount(e.target.value)}
              className="edit-input"
            />
            <input
              type="file"
              onChange={(e) => setNewImage(e.target.files[0])}
              className="edit-input"
            />
          </>
        ) : (
          <>
            <h3>{category.name}</h3>
            <p>{category.itemCount} Items</p>
          </>
        )}
      </div>
      <div className="category-actions">
        {isEditing ? (
          <>
            <button onClick={handleUpdate} className="btn-save">Save</button>
            <button onClick={() => setIsEditing(false)} className="btn-cancel">Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="btn-edit">Edit</button>
           
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
