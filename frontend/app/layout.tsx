import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { DM_Sans } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

import logoImg from '../public/images/logo.png';
import { cn } from '@/lib/utils';
import './globals.css';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' });

import ThemeToggle from '@/components/theme-toggle';

export const metadata: Metadata = {
    title: 'Anime Wiki',
    description: 'Site dedicated to share all about animes information',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html suppressHydrationWarning lang="en" className={cn('h-full', 'antialiased', 'font-sans', dmSans.variable)}>
            <body suppressHydrationWarning className="min-h-full flex flex-col">
                <ThemeProvider attribute="class">
                    <div>
                        <header>
                            <div className="container py-10 mx-auto">
                                <div className="flex flex-row justify-between">
                                    <Link href={'/'}>
                                        <Image alt="Logo" src={logoImg} />
                                    </Link>
                                    <ThemeToggle />
                                </div>
                            </div>
                        </header>
                        {children}
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
