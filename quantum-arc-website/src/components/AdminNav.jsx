/*
  Quantum Arc Website
  Admin Nav

  Small link row shown at the top of every /admin page — switches
  between admin tools and logs out. Shared here instead of duplicating
  the same links/logout logic in Admin.jsx, AdminProjects.jsx, and
  AdminMfaSetup.jsx.
*/

import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

function AdminNav()
{
    const navigate = useNavigate();

    async function handleLogout()
    {
        await supabase.auth.signOut();
        navigate('/admin/login');
    }

    return (
        <div className="button-row blog-post-back-link">
            <Link className="button button-secondary" to="/admin">New Blog Post</Link>
            <Link className="button button-secondary" to="/admin/projects">New Project</Link>
            <Link className="button button-secondary" to="/admin/security">Security</Link>
            <button className="button button-secondary" type="button" onClick={handleLogout}>
                Log Out
            </button>
        </div>
    )
}

export default AdminNav
