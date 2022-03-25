import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { BsChevronRight } from 'react-icons/bs';

import { useSearchLocationNameQuery } from '../../reducers';
import './Search.scss';
import { locationActions } from '../../actions';

const preloadedLocations = [
  {
    title: 'London',
    location_type: 'City',
    woeid: 44418,
    latt_long: '51.506321,-0.12714',
  },
  {
    title: 'Barcelona',
    location_type: 'City',
    woeid: 753692,
    latt_long: '41.385578,2.168740',
  },
  {
    title: 'Long Beach',
    location_type: 'City',
    woeid: 2441472,
    latt_long: '33.766720,-118.192398',
  },
];

const Search = ({ closeFn }) => {
  const [location, setLocation] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const dispatch = useDispatch();

  const { data, isFetching } = useSearchLocationNameQuery(location);

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const handleLocation = (e) => {
    let selectedResult = {};
    if (searchResults.length === 0) {
      selectedResult = preloadedLocations[e.target.value];
    } else {
      selectedResult = searchResults[e.target.value];
    }
    const latLong = selectedResult?.latt_long.split(',');
    dispatch(locationActions.setLocation(selectedResult.title));
    dispatch(locationActions.setWoeId(selectedResult.woeid));
    dispatch(locationActions.setLatLong(latLong[0], latLong[1]));
    closeFn(false);
  };

  const handleSearch = () => {
    if (data) {
      setSearchResults(data);
    }
  };

  const mapLocations = (loc, idx) => (
    <li
      key={loc + idx}
      className="search__item"
      onClick={handleLocation}
      value={idx}
    >
      {loc.title}
      <BsChevronRight fontSize={14} color="#616475" />
    </li>
  );

  return (
    <div className="search app__flex">
      <div className="search__close" onClick={() => closeFn(false)}>
        <AiOutlineClose fontSize={18} color="#E7E7EB" />
      </div>
      <form className="app__flex">
        <div className="search__input">
          <AiOutlineSearch fontSize={19} color="#616475" />
          <input
            type="text"
            value={location}
            onChange={handleChange}
            placeholder="search location"
          />
        </div>
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </form>
      <ul className="search__results">
        {searchResults?.length !== 0
          ? searchResults.map(mapLocations)
          : preloadedLocations.map(mapLocations)}
      </ul>
    </div>
  );
};

export default Search;
