import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Form1 from './components/Form1';
import Form2 from './components/Form2';
import Form3 from './components/Form3';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get('https://dummyjson.com/products/category-list');
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Form1 />} />
          <Route path="/form2" element={<Form2 categories={categories} />} />
          <Route path="/form3" element={<Form3 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;