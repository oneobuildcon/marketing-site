import { createClient } from '@supabase/supabase-js';

export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      // Prevent Next.js from caching Supabase REST calls. Without this, the App
      // Router can serve a stale snapshot of the data even after an admin save.
      global: {
        fetch: (url, options) =>
          fetch(url as RequestInfo, { ...options, cache: 'no-store' }),
      },
    }
  );
}
