"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function SessionRefresher() {
  useEffect(() => {
    const supabase = createClient();
    // Initialize the browser client with the current session from cookies.
    // createBrowserClient automatically starts auto-refresh, so the access
    // token is silently refreshed before it expires — meaning middleware's
    // getUser() always finds a valid token and never clears the session.
    supabase.auth.getSession();
  }, []);

  return null;
}
