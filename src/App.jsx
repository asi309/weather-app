import { useDispatch } from 'react-redux';

import { Sidebar, Weather } from './components';
import { locationUtils } from './utils';
import './App.scss';

function App() {
  const dispatch = useDispatch();

  locationUtils.locate(dispatch);

  return (
    <div className="app">
      <main>
        <Sidebar />
        <Weather />
      </main>
    </div>
  );
}

export default App;
