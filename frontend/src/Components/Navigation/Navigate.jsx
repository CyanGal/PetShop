import React, { useState, useEffect, useContext } from 'react';
import { NavDropdown, Nav } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingCart, faDog, faCat, faDove, faFish, faMagnifyingGlass, } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import navbarImage from '../Images/petBanner6.jpg';
import { UserContext } from '../../UserContext';
import axios from 'axios';
import './Navigate.css';
import Cardd from '../About/Cardd'



const Navigate = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { adminInfo, setAdminInfo } = useContext(UserContext);
  // Search
  const [query, setQuery] = useState("")
  const [searchResult, setSearchResult] = useState([])

  // }, [userInfo, setUserInfo])
  useEffect(() => {
    if (!userInfo.email) {
      axios.get('http://localhost:5000/user', {
        withCredentials: true,
      })
        .then(response => {
          console.log("User Info:", response.data)
          setUserInfo(response.data);

        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  },
    [userInfo.email, setUserInfo]);
  const logoutClient = () => {

    axios.post('http://localhost:5000/logout', null, { withCredentials: true })
      .then(res => {

        setUserInfo({});
      })

      .catch(error => {
        console.error('Error logging out:', error);
      });

  }

  useEffect(() => {
    if (!adminInfo.email) {
      axios.get('http://localhost:5000/admin', {
        withCredentials: true,
      })
        .then(response => {
          setAdminInfo(response.data);
        })
        .catch(error => {
          console.error('Error fetching admin data:', error);
        });
    }
  }, [adminInfo.email, setAdminInfo]);

  // Funksioni për logout të adminit
  const logoutAdmin = () => {
    axios.post('http://localhost:5000/logout', null, { withCredentials: true })
      .then(res => {
        setAdminInfo({});
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the server when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/readCat");
        setCategories(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Search bar code
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const showSearchModal = () => {
    setIsSearchModalVisible(true);
  };
  const hideSearchModal = () => {
    setIsSearchModalVisible(false);
  };

  //Navbar styles
  const navbarStyle = {
    backgroundImage: `url(${navbarImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '325px',

  };
  const getCategoryIcon = (categoryName) => {
    switch (categoryName) {
      case "Dog":
      case "Dog Product":
        return faDog;
      case "Cat":
      case "Cat Product":
        return faCat;
      case "Bird":
      case "Bird Product":
        return faDove;
      case "Fish":
      case "Fish Product":
        return faFish;
      // Add more cases as needed
      default:
        return null;
    }
  };
  // Search
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/search', { query });

      if (response.data && response.data.results) {
        console.log("Search Results:", response.data.results);
        setSearchResult(response.data.results);
      } else {
        console.log("No search results found");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
    <>
      <div className="navbar-container" style={navbarStyle}>

        <nav className="navbar">

          {/*SOCIAL MEDIAS */}
          <div className='social-icons-left'>
            <a href="https://www.facebook.com/" target='_blank' className="navbar-icons"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="https://www.instagram.com/" target='_blank' className="navbar-icons"><FontAwesomeIcon icon={faInstagram} /></a>
          </div>

          {/*PET SHOP LOGO */}
          <a className="navbar-brand-title" href="/">Purrfect Pets</a>

          {/*SEARCH BAR*/}

          <div className='social-icons-right'>
            <div className="navbar-icons" onClick={showSearchModal}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>

            {/*SHOPPING CART */}
            <a href="/cart" className="navbar-icons"><FontAwesomeIcon icon={faShoppingCart} /></a>
          </div>

          {/*HOME AND PRODUCT ICONS */}
          <div className='social-icons-bottom'>
            <a href="/" className="navbar-icons"><FontAwesomeIcon icon={faHome} /></a>

            {categories.map((category, index) => {
              const categoryIcon = getCategoryIcon(category.category_name);
              return (
                <a href={`/category/${category.category_name}`}
                  className="navbar-icons"
                  key={index}
                >
                  <FontAwesomeIcon icon={categoryIcon} />
                </a>
              );
            })}

          </div>
          <div className='login-info'>
            {userInfo.email ?
              <>
                <Nav.Link onClick={logoutClient}>Logout: {userInfo.email}</Nav.Link>
              </>
              :
              <>
              </>
            }

            {adminInfo.email ?
              <>
                <Nav.Link onClick={logoutAdmin}>Logout Admin: {adminInfo.email}</Nav.Link>
              </>
              :
              <>
              </>
            }
          </div>
        </nav>
        <div className="header-content">

        </div>
      </div>
      {/*SEARCH BAR CODE */}
      {isSearchModalVisible && (
        <div className="search-modal">
          <div className="search-modal-content">
            <form onSubmit={handleSubmit}>
              <input
                className="search-input"
                type="text"
                placeholder="Search"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <input type="submit" />
            </form>
            <button onClick={hideSearchModal} className="close-search">
              ×
            </button>
            {/* Result */}
            <div style={{ "z-index": "2" }} className="search">
              {
                searchResult.map((ele, index) => {
                  return (
                    <Cardd key={index} {...ele} />
                  )
                })}
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default Navigate