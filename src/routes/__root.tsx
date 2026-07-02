import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Preloader } from "../components/Preloader";
import { CustomCursor } from "../components/CustomCursor";
import { CMSProvider } from "../hooks/useCMS";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 font-display text-2xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">This page doesn't exist. Let's get you back home.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 font-button text-sm font-semibold text-primary-foreground">Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-semibold">Something broke.</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-full bg-primary px-5 py-2.5 font-button text-sm font-semibold text-primary-foreground">Try again</button>
          <a href="/" className="rounded-full border border-border px-5 py-2.5 font-button text-sm">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Brand Shoots — Create · Shoot · Grow" },
      { name: "description", content: "Brand Shoots is a premium digital marketing & creative studio in Rajahmundry and Vijayawada — branding, content, photography, videography and performance marketing across India." },
      { name: "author", content: "Brand Shoots" },
      { name: "theme-color", content: "#050505" },
      { property: "og:title", content: "Brand Shoots — Create · Shoot · Grow" },
      { property: "og:description", content: "Brand Shoots is a premium digital marketing & creative studio in Rajahmundry and Vijayawada — branding, content, photography, videography and performance marketing across India." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Brand Shoots" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Brand Shoots — Create · Shoot · Grow" },
      { name: "twitter:description", content: "Brand Shoots is a premium digital marketing & creative studio in Rajahmundry and Vijayawada — branding, content, photography, videography and performance marketing across India." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bb1fd6f7-f3ca-4523-8d2c-0d4e5cd7f5fb/id-preview-a1e09478--38662353-3315-4f13-ac54-69c27867cafe.lovable.app-1782459742039.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bb1fd6f7-f3ca-4523-8d2c-0d4e5cd7f5fb/id-preview-a1e09478--38662353-3315-4f13-ac54-69c27867cafe.lovable.app-1782459742039.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CMSProvider>
        <Preloader />
        <CustomCursor />
        <Navbar />
        <main className="overflow-x-clip">
          <Outlet />
        </main>
        <Footer />
      </CMSProvider>
    </QueryClientProvider>
  );
}
