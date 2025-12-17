import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ThemeWrapper from "@/components/layout/ThemeWrapper";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeWrapper>
        <div className="min-h-dvh bg-gray-100 dark:bg-[#0b1220] transition-colors duration-300">
          <div className="mx-auto max-w-6xl px-3 py-4">
            <div className="grid grid-cols-[220px_1fr] gap-4">
              <aside className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f172a] p-3">
                <div className="mb-3 text-sm font-extrabold tracking-wide text-gray-900 dark:text-gray-50">
                  Admin Panel
                </div>
                <nav className="space-y-1">
                  <a href="/admin" className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#0b1324]">Dashboard</a>
                  <a href="/admin/donations" className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#0b1324]">Donasi</a>
                  <a href="/admin/campaigns" className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#0b1324]">Campaign</a>
                  <a href="/admin/users" className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#0b1324]">Pengguna</a>
                  <a href="/admin/settings" className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#0b1324]">Pengaturan</a>
                </nav>
              </aside>
              <main className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f172a] p-3">
                {children}
              </main>
            </div>
          </div>
        </div>
      </ThemeWrapper>
    </AppRouterCacheProvider>
  );
}

