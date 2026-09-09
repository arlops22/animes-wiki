import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans();

export const metadata: Metadata = {
    title: 'Anime Wiki',
    description: 'Site dedicated to share all about animes information',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html lang="en" className={`h-full antialiased bg-dark-gray-700 text-dark-gray-100 ${dmSans.className}`}>
            <body suppressHydrationWarning className="min-h-full flex flex-col">
                {children}
            </body>
        </html>
    );
}
