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
function BlogPostCard({title, excerpt, date})
{
    return(
        <article className="card card-padded blog-card">
            <p className="blog-label">Article Preview</p>
            
            <h3>{title}</h3>

            <p>{excerpt}</p>

            <p className="blog-date">{date}</p>
        </article>
    )
}

/*
  BlogPreviewSection Component

  Props:
  - posts: array from siteContent.js
*/
function BlogPreviewSection({posts}) {
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
                {posts.map((post) => (
                    <BlogPostCard
                        key={post.title}
                        title={post.title}
                        excerpt={post.excerpt}
                        date={post.date}
                    /> 
                ))}
        </div>
        </section>
    )
}

export default BlogPreviewSection