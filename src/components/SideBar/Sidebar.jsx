import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BiCurrentLocation } from 'react-icons/bi';

import WeatherSummary from './WeatherSummary';
import Search from './Search';
import { locationUtils } from '../../utils';
import './Sidebar.scss';

const Sidebar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const dispatch = useDispatch();

  return (
    <aside className="sidebar app__flex">
      <div className="sidebar__controls app__flex">
        <button
          type="button"
          className="sidebar__search-btn"
          onClick={() => setSearchOpen(true)}
        >
          Search for places
        </button>
        <button
          type="button"
          className="sidebar__location-btn"
          onClick={() => locationUtils.locate(dispatch)}
        >
          <BiCurrentLocation fontSize={22} />
        </button>
      </div>
      <WeatherSummary />
      {searchOpen && <Search closeFn={setSearchOpen} />}
    </aside>
  );
};

export default Sidebar;
