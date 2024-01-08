import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LibraryPage from './pages/LibraryPage';
import BookPage from './pages/BookPage';

function App() {

  return (
    <Router>
      <Routes path="">
        <Route path="/books" element={<LibraryPage />} />
        <Route path="/books/:id" element={<BookPage />} />
        <Route path='*' element={<h1>Error</h1>} />
      </Routes>
    </Router>
  )
}

export default App
