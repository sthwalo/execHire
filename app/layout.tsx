import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ReduxProvider } from '@/src/store/provider';
import { SafeComponent } from '@/components/error-boundary';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ExecuHire - Luxury Car Hire Service',
  description: 'Experience luxury and sophistication with ExecuHire\'s premium car hire service.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; 
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Providers>
            <ReduxProvider>
              <SafeComponent>
                <div className="flex min-h-screen flex-col">
                  <Navigation />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
              </SafeComponent>
            </ReduxProvider>
          </Providers>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}