import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './SearchPage.css';
import axios from 'axios';

const SearchPage = ({ closeSearch }) => {

  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
 
  useEffect(() => {
    // Fetch all data from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data');
        setData(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    // Perform client-side search and update filteredData
    const filteredResults = data.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.content.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredData(filteredResults);
  };

  return (
    <div className="search-overlay">
      <div className="search-box">
        <input
          type="text"
          id='search-button'
          // className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch} className="search-btn">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button> 
      </div>
      {filteredData.length > 0 && (
        <div className="search-results">
          {filteredData.map((item, index) => (
            <div key={index}>
              <p>{item.title}</p>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;