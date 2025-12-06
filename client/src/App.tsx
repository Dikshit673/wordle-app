import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router';
import { ModalProvider } from './contexts/modal/ModalProvider';
import { ThemeProvider } from './contexts/theme/ThemeProvider';

import Home from './pages/Home';
import HowToPlay from './pages/HowToPlay';
import NewGame from './pages/NewGame';
import Stats from './pages/Stats';
import RootLayout from './layouts/RootLayout';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <ModalProvider>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/how-to-play' element={<HowToPlay />} />
              <Route path='/new-game' element={<NewGame />} />
              <Route path='/stats' element={<Stats />} />
            </Route>
          </Routes>
        </ModalProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
