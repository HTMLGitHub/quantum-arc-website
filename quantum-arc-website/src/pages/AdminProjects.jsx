/*
  Quantum Arc Website
  Admin — New Portfolio Project

  Reaching this page at all requires a Supabase Auth session
  (see RequireAdminAuth in App.jsx). Saving a project — and uploading
  its image — additionally requires that session to belong to the
  admin email, enforced by the database and storage RLS policies in
  supabase/portfolio_projects.sql, not by anything in this file.
*/

import { useState } from "react";
import { createProject, uploadPortfolioImage } from "../data/portfolioProjects";
import AdminNav from "../components/AdminNav";

const initialFormState =
{
    name: '',
    label: '',
    description: '',
    websiteUrl: '',
};

export default function AdminProjects()
{
    const [form, setForm] = useState(initialFormState);
    const [imageFile, setImageFile] = useState(null);
    const [status, setStatus] = useState(null); // null | 'saving' | 'success' | 'error'
    const [statusMessage, setStatusMessage] = useState('');

    function handleChange(event)
    {
        const {name, value} = event.target;
        setForm((prev) => ({...prev, [name]: value}));
    }

    function handleImageChange(event)
    {
        setImageFile(event.target.files[0] || null);
    }

    async function handleSubmit(event)
    {
        event.preventDefault();
        setStatus('saving');
        setStatusMessage('');

        try
        {
            // Upload the image first (if there is one) so createProject
            // can save its URL along with everything else in one row.
            const imageUrl = imageFile ? await uploadPortfolioImage(imageFile) : null;

            const project = await createProject({ ...form, imageUrl });

            setStatus('success');
            setStatusMessage(`Saved "${project.name}". It'll show up on the site next time the homepage loads.`);
            setForm(initialFormState);
            setImageFile(null);
            event.target.reset(); // clears the file input, which isn't a controlled field
        }
        catch (err)
        {
            setStatus('error');
            setStatusMessage(err.message);
        }
    }

    return(
        <main className="page-shell page-section">
            <AdminNav />

            <h1>New Portfolio Project</h1>

            <form onSubmit={handleSubmit} className="contact-form">
                <div>
                    <label htmlFor="name">Project name</label>
                    <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required/>
                </div>

                <div>
                    <label htmlFor="label">Label (optional)</label>
                    <input id="label" name="label" type="text" value={form.label} onChange={handleChange} placeholder="e.g. Client Project, Case Study"/>
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" value={form.description} onChange={handleChange} required/>
                </div>

                <div>
                    <label htmlFor="websiteUrl">Website URL (optional)</label>
                    <input id="websiteUrl" name="websiteUrl" type="url" value={form.websiteUrl} onChange={handleChange} placeholder="https://theirsite.com"/>
                </div>

                <div>
                    <label htmlFor="image">Cover image (optional)</label>
                    <input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange}/>
                    <p className="field-hint">
                        Useful before the site is live — a mockup or screenshot. Add the Website URL above once it is.
                    </p>
                </div>

                <button className="button button-primary" type="submit" disabled={status === 'saving'}>
                    {status === 'saving' ? 'Saving...' : 'Save Project'}
                </button>

                {status === 'success' && <p className="form-success">{statusMessage}</p>}
                {status === 'error' && <p className="form-error">{statusMessage}</p>}
            </form>
        </main>
    );
}
