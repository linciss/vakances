import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './_root/index';

function App() {
  return (
    <main>
      <Router>
        <Navbar />
        <div className="m-auto">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </main>
  );
}

export default App;
