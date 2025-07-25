
import './App.css';

import { Header } from './components/Header';
import { Route, Routes }   from 'react-router-dom';
import { Home } from './pages/Home';
import { ArticlePage } from './pages/ArticlePage';
import { Footer } from './components/Footer'; 


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<ArticlePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;