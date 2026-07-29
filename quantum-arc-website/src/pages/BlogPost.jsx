/*
  Quantum Arc Website
  Blog Post Page

  Fetches a single post from Supabase by its slug.
*/

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPostBySlug } from "../data/blogPosts";

export default function BlogPost()
{
    const {slug} = useParams();
    const [post, setPost] = useState(null);
    const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'

    useEffect(() => {
        let cancelled = false;

        fetchPostBySlug(slug)
            .then((data) => {
                if (cancelled) return;
                setPost(data);
                setStatus('ready');
            })
            .catch(() => {
                if (cancelled) return;
                setStatus('error');
            });

        return () => { cancelled = true; };
    }, [slug]);

    if (status === 'loading')
    {
        return (
            <main className="page-shell page-section">
                <p>Loading...</p>
            </main>
        );
    }

    if (status === 'error' || !post)
    {
        return(
            <main className="page-shell page-section">
                <p className="section-kicker">Blog</p>
                <h1>Post not found</h1>
                <p>We couldn't find a post at this address</p>
                <Link className="button button-secondary" to="/">Back to home</Link>
            </main>
        );
    }

    return (
        <main className="page-shell page-section">
            <div className="button-row blog-post-back-link">
                <Link className="button button-secondary" to='/'>Home</Link>
                <Link className="button button-secondary" to="/blog">Back to Blogs</Link>
            </div>


            <article>
                <p className="section-kicker">{post.date}</p>
                <h1>{post.title}</h1>
                <p className="section-description" style={{whiteSpace: 'pre-wrap'}}>
                    {post.body}
                </p>
            </article>
        </main>
    );
}
