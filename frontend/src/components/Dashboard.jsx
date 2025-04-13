import { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Custom CSS for styling
import CategoryCard from '../components/CategoryCard';
import { useAuth } from '../components/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [itemCount, setItemCount] = useState('');
  const [image, setImage] = useState(null);

  const { user,logout } = useAuth();
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await axios.get('https://category-management-fvw8.onrender.com/api/categories',{
         headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('itemCount', itemCount);
    if (image) formData.append('image', image);

    try {
      await axios.post('https://category-management-fvw8.onrender.com/api/categories', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },

      });
      fetchCategories(); // Reload categories after adding a new one
      setName('');
      setItemCount('');
      setImage(null);
    } catch(err) {
      console.error(err);
    }
  };

  
  const handleLogout = () => {
    logout(); // clear context
    navigate('/login'); // redirect to login page
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar-logo">
          <i className="fas fa-shopping-cart cart-icon"></i> fastcard
        </div>
        <nav className="sidebar-nav">
          <a href="#"><i className="fas fa-th-large"></i><span>Dashboard</span></a>
          <a href="#"><i className="fas fa-box"></i><span>Orders</span></a>
          <a href="#"><i className="fas fa-tags"></i><span>Products</span></a>
          <a href="#"><i className="fas fa-users"></i><span>Customers</span></a>
        </nav>
        <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
            <i className="fas fa-power-off"></i><span>Logout</span>
          </button>
        </div>
      </div>

      <div className="main">
        <div className="topbar">
          <div className="search-container">
            <input type="text"
  placeholder="Search"
  />
            <i className="fas fa-search search-icon"></i>
          </div>
          <div className="user-info">
            <span>{user?.email}</span>
            <i className="fas fa-user-circle"></i>
          </div>
        </div>

        <div className="categories-header">
          <h1>Categories</h1>
          <button
            onClick={() => document.getElementById('add-category-modal').style.display = 'block'}
          >
            + Add Category
          </button>
        </div>

        {/* Modal for Adding Category */}
        <div id="add-category-modal" className="modal">
          <div className="modal-content">
            <h3>Add New Category</h3>
            <form onSubmit={handleAddCategory}>
              <input
                type="text"
                placeholder="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Item Count"
                value={itemCount}
                onChange={(e) => setItemCount(e.target.value)}
                required
              />
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <div>
                <button type="submit">Add Category</button>
                <button
                  type="button"
                  onClick={() => document.getElementById('add-category-modal').style.display = 'none'}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="category-grid">
          {categories.map((cat) => (
            <CategoryCard
              key={cat._id}
              category={cat}
              onUpdated={fetchCategories} // Fetch updated categories after editing
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard
