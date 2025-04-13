import { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import './Dashboard.css';
import CategoryCard from '../components/CategoryCard';
import { useAuth } from '../components/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [itemCount, setItemCount] = useState('');
  const [image, setImage] = useState(null);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signup');
    }
  }, [navigate]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
      }
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
      await axios.post('/api/categories', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchCategories();
      setName('');
      setItemCount('');
      setImage(null);
      document.getElementById('add-category-modal').style.display = 'none';
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar-logo">
          <i className="fas fa-shopping-cart cart-icon"></i> fastcard
        </div>
        <nav className="sidebar-nav">
          <a href="#"><i className="fas fa-th-large"></i><span>Dashboard</span></a>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <i className="fas fa-power-off"></i><span>Logout</span>
          </button>
        </div>
      </div>

      <div className="main">
        <div className="topbar">
          <div className="user-info">
            <span>{user?.email}</span>
            <i className="fas fa-user-circle"></i>
          </div>
        </div>

        <div className="categories-header">
          <h1>Categories</h1>
          <button onClick={() =>
            document.getElementById('add-category-modal').style.display = 'block'
          }>
            + Add Category
          </button>
        </div>

        {/* Add Category Modal */}
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
              <div className="modal-buttons">
                <button type="submit">Add</button>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById('add-category-modal').style.display = 'none'
                  }
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
              onUpdated={fetchCategories}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
