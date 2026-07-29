import { Link } from "react-router-dom";

export default function NotFound()
{
    return (
        <main className="page-shell page-section">
            <p className="section-kicker">404</p>
            <h1>Page not found</h1>
            <p className="section description">
                The page you're looking for doesn't exist or may have been moved.
            </p>
            <Link className="button button-secondary" to="/">Back to home</Link>
        </main>
    );
}