import { BrowserRouter , Route, Routes } from 'react-router-dom';
import LibraryPage from './pages/LibraryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookPage from './pages/BookPage';
import Layout from './pages/Layout';
import RequireAuth from './components/RequireAuth';

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>

        {/* Unprotected routes */}
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route element={<RequireAuth/>}>
          <Route path="/books" element={<LibraryPage />} />
          <Route path="/books/:id" element={<BookPage />} />
        </Route>

        <Route path='*' element={<h1>Error</h1>} />
      </Route>
    </Routes>
  )
}

export default App