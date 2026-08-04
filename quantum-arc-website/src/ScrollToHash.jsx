import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash()
{
    const {hash} = useLocation();

    useEffect(()=>
    {
        if(!hash){return;}

        // Not every hash is a scrollable anchor -- Supabase's password
        // reset / magic link redirects land here with the session
        // tokens themselves in the hash (e.g. "#access_token=...&type=
        // recovery"), which isn't valid CSS selector syntax and throws
        // if passed straight to querySelector. That's fine: those
        // hashes were never meant to be scroll targets, so just skip
        // them instead of crashing the page.
        let target;
        try
        {
            target = document.querySelector(hash);
        }
        catch
        {
            return;
        }

        if(target) { target.scrollIntoView({behavior: 'smooth'}); }
    }, [hash]);

    return null;
}
