'use client';

import { SearchField } from '@/components/search';
import { useState } from 'react';

export default function Home() {
    const [terms, setTerms] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="container mx-auto py-4">
            <SearchField
                onSearch={value => setTerms(value)}
                placeholder="Search anime..."
                setIsLoading={setIsLoading}
            />

            <p>{terms}</p>
        </div>
    );
}
