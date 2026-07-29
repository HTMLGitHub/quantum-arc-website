/*
  Quantum Arc Website
  Admin — New Blog Post

  Reaching this page at all requires a Supabase Auth session
  (see RequireAdminAuth in App.jsx). Saving a post additionally requires
  that session to belong to the admin email — enforced by the database's
  Row Level Security policy, not by anything in this file.
*/

import { useState } from "react";
import { createPost } from "../data/blogPosts";
import AdminNav from "../components/AdminNav";

const initialFormState =
{
    title:'',
    excerpt:'',
    body:'',
};

/*
  Returns today's date as YYYY-MM-DD (the same format the old date
  input produced), using the visitor's local time so "today" matches
  what they'd expect when hitting Save.
*/
function getTodayDate()
{
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${now.getFullYear()}-${month}-${day}`;
}

export default function Admin()
{
    const [form, setForm] = useState(initialFormState);
    const [status, setStatus] = useState(null); // null | 'saving' | 'success' | 'error'
    const [statusMessage, setStatusMessage] = useState('');

    function handleChange(event)
    {
        const {name, value} = event.target;
        setForm((prev) => ({...prev, [name]: value}));
    }

    async function handleSubmit(event)
    {
        event.preventDefault();
        setStatus('saving');
        setStatusMessage('');

        try
        {
            // Posts are always dated the day they're written — no
            // manual date field to fill in or get wrong.
            const post = await createPost({ ...form, date: getTodayDate() });

            setStatus('success');
            setStatusMessage(`Saved "${post.title}".`);
            setForm(initialFormState);
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

            <h1>New Blog Post</h1>

            <form onSubmit={handleSubmit} className="contact-form">
                <div>
                    <label htmlFor="title">Title</label>
                    <input id="title" name="title" type="text" value={form.title} onChange={handleChange} required/>
                </div>

                <div>
                    <label htmlFor="excerpt">Excerpt</label>
                    <textarea id="excerpt" name="excerpt" value={form.excerpt} onChange={handleChange} required/>
                </div>

                <div>
                    <label htmlFor="body">Body</label>
                    <textarea id="body" name="body" value={form.body} onChange={handleChange} required/>
                </div>

                <button className="button button-primary" type="submit" disabled={status === 'saving'}>
                    {status === 'saving' ? 'Saving...' : 'Save Post'}
                </button>

                {status === 'success' && <p className="form-success">{statusMessage}</p>}
                {status === 'error' && <p className="form-error">{statusMessage}</p>}
            </form>
        </main>
    );
}
