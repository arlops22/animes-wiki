import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { DM_Sans, Inter } from 'next/font/google';

import logoImg from '../public/images/logo.png';
import './globals.css';
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const dmSans = DM_Sans();

export const metadata: Metadata = {
    title: 'Anime Wiki',
    description: 'Site dedicated to share all about animes information',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html lang="en" className={cn("h-full", "antialiased", "bg-dark-gray-700", "text-dark-gray-100", dmSans.className, "font-sans", inter.variable)}>
            <body suppressHydrationWarning className="min-h-full flex flex-col">
                <header>
                    <div className="container py-10 mx-auto">
                        <Link href={'/'}>
                            <Image alt="Logo" src={logoImg} />
                        </Link>
                    </div>
                </header>
                {children}
            </body>
        </html>
    );
}
