import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import AdminProjects from './pages/AdminProjects';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import HomePage from "./pages/HomePage";
import NotFound from './pages/NotFound';
import RequireAdminAuth from './components/RequireAdminAuth';
import ScrollToHash from './ScrollToHash';

export default function App()
{
  return(
    <BrowserRouter>
      <ScrollToHash/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route
          path="/admin"
          element={
            <RequireAdminAuth>
              <Admin/>
            </RequireAdminAuth>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <RequireAdminAuth>
              <AdminProjects/>
            </RequireAdminAuth>
          }
        />
        <Route path='/blog' element={<BlogIndex/>}/>
        <Route path="/blog/:slug" element={<BlogPost/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}