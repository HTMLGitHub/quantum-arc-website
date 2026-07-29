/*
  Quantum Arc Website
  Blog Index Page

  Lists every blog post, newest first, fetched from Supabase. This is
  the full list — the homepage only shows a preview of the latest few
  (see BlogPreviewSection.jsx).
*/

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllPosts } from "../data/blogPosts";

/*
  BlogIndexCard Component

  Defined before BlogIndex because BlogIndex uses it while mapping
  through the full post list.
*/

function BlogIndexCard({slug, title, excerpt, date})
{
    return(
        <Link className="card card-padded blog-card" to={`/blog/${slug}`}>
            <p className="blog-label">Article Preview</p>
            <h3>{title}</h3>
            <p>{excerpt}</p>
            <p className="blog-date">{date}</p>
        </Link>
    );
}

export default function BlogIndex()
{
    const [posts, setPosts] = useState([]);
    const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'

    useEffect(() => {
        let cancelled = false;

        fetchAllPosts()
            .then((data) => {
                if (cancelled) return;
                setPosts(data);
                setStatus('ready');
            })
            .catch(() => {
                if (cancelled) return;
                setStatus('error');
            });

        return () => { cancelled = true; };
    }, []);

    return (
        <main className="page-shell page-section">
            <div className="button-row blog-post-back-link">
                <Link className="button button-secondary" to='/'>Home</Link>
            </div>
            <div className="section-header">
                <p className="section-kicker">Blog</p>
                <h1 className="section-title">All Posts</h1>

                <p className="section-description">
                    Every article from the Quantum Arc blog, newest first.
                </p>

                {status === 'error' && <p className="form-error">Couldn&apos;t load posts right now.</p>}

                {
                    status === 'ready' && posts.length === 0 &&
                    (
                        <p>No posts yet - check back soon.</p>
                    )
                }

                {
                    posts.length > 0 &&
                    (
                        <div className="grid grid-3">
                            {posts.map((post) =>
                            (
                                <BlogIndexCard
                                key={post.slug}
                                slug={post.slug}
                                title={post.title}
                                excerpt={post.excerpt}
                                date={post.date}
                                />
                            ))}
                        </div>
                    )
                }
            </div>
        </main>
    );
}
