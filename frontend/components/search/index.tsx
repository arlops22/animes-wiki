'use client';

import { Search as SearchIcon } from 'lucide-react';

import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { ChangeEvent, useState } from 'react';

interface SearchFieldProps {
    onSearch: (value: string) => void;
    placeholder: string;
    setIsLoading: Function;
}

export function SearchField(props: SearchFieldProps) {
    const { onSearch, setIsLoading, placeholder } = props;

    const [debounce_timeout, setDebounceTimeout] = useState<NodeJS.Timeout | undefined>(undefined);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        clearTimeout(debounce_timeout);
        const current_timeout = setTimeout(async () => {
            await onSearch(event.target.value);
            setIsLoading(false);
        }, 1500);
        setDebounceTimeout(current_timeout);
    };

    return (
        <InputGroup className="max-w-xs">
            <InputGroupInput onChange={onChange} placeholder={placeholder} />
            <InputGroupAddon>
                <SearchIcon />
            </InputGroupAddon>
        </InputGroup>
    );
}
