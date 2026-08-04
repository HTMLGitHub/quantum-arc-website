import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import AdminProjects from './pages/AdminProjects';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import BrightPathHome from './pages/BrightPathHome';
import BrightPathPrograms from './pages/BrightPathPrograms';
import BrightPathAbout from './pages/BrightPathAbout';
import BrightPathGetInvolved from './pages/BrightPathGetInvolved';
import BrightPathContact from './pages/BrightPathContact';
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

        {/*
          BrightPath Youth Collective — concept/showcase portfolio
          project (see BrightPathHeader for the disclaimer shown on
          every page). Five static pages, same pattern as /blog above:
          routes defined here, no dynamic :slug param since this is a
          single fixed project rather than a generic portfolio-detail
          system.
        */}
        <Route path="/portfolio/brightpath" element={<BrightPathHome/>} />
        <Route path="/portfolio/brightpath/programs" element={<BrightPathPrograms/>} />
        <Route path="/portfolio/brightpath/about" element={<BrightPathAbout/>} />
        <Route path="/portfolio/brightpath/get-involved" element={<BrightPathGetInvolved/>} />
        <Route path="/portfolio/brightpath/contact" element={<BrightPathContact/>} />

        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}
