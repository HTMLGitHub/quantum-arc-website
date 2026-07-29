/*
  Quantum Arc Website
  Blog Preview Section Component

  This section previews future blog content.

  For now, the blog cards are placeholders.
  Later, each card can link to a real blog post page.
*/

/*
  BlogPostCard Component

  This is defined before BlogPreviewSection because BlogPreviewSection uses it
  while mapping through blog post data.
*/

import { Link } from "react-router-dom";

function BlogPostCard({slug, title, excerpt, date})
{
    return(
        <Link className="card card-padded blog-card" to={`/blog/${slug}`}>
            <p className="blog-label">Article Preview</p>
            
            <h3>{title}</h3>

            <p>{excerpt}</p>

            <p className="blog-date">{date}</p>
        </Link>
    )
}

/*
  BlogPreviewSection Component

  Props:
  - posts: array from siteContent.js
*/
function BlogPreviewSection({posts}) {
    if (!posts || posts.length === 0) { return null;}

    return (
        <section id="blog" className="page-section">
            <div className="section-header">
                <p className="section-kicker">Blogs</p>
                <h2 className="section-title">From the Quantum Arc Blog</h2>

                <p className="section-description">
                    The blog area gives the site room to grow with helpful articles,
                    business insights, tutorials, and updates.
                </p>    
            </div>

            <div className="grid grid-3">
                {
                    posts.slice(0, 3).map((post) =>
                    (
                        <BlogPostCard
                            key={post.slug}
                            slug={post.slug}
                            title={post.title}
                            excerpt={post.excerpt}
                            date={post.date}
                        /> 
                    ))}
            </div>
            
            {
                posts.length > 3 && 
                (
                    <Link className="button button-secondary" to="/blog">View All Posts</Link>
                )
            }            
        </section>
    );
}

export default BlogPreviewSection