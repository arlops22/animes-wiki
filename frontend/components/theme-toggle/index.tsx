'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <button
            type="button"
            role="switch"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={cn(
                'relative inline-flex h-8 w-16 items-center transition-colors duration-300 cursor-pointer',
                theme === 'dark' ? 'bg-dark-gray-500' : 'bg-light-gray-300',
            )}
        >
            <Moon
                className={cn(
                    'absolute left-2 h-4 w-4 text-primary z-10',
                    theme === 'dark' ? 'text-primary' : 'text-light-gray-500',
                )}
            />

            <Sun
                className={cn(
                    'absolute right-2 h-4 w-4 z-10',
                    theme === 'dark' ? 'text-dark-gray-100' : 'text-primary',
                )}
            />

            <span
                className={cn(
                    'z-[5] h-7 w-7 transform transition-transform duration-300',
                    theme === 'dark' ? 'translate-x-0.5 bg-dark-gray-700' : 'translate-x-8.5 bg-light-gray-100',
                )}
            />
        </button>
    );
}
