import { Input } from '@nextui-org/react';
import { SearchIcon } from "../icons";
import { useState } from 'react';

export default function SearchInput({
    handleSearch
} : {
    handleSearch: (term: string) => void
}) {
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleClearSearch = () => {
        setSearchTerm('');
        handleSearch('');
    };
    
    return (
        <div className="flex ml-5">
            <Input
                placeholder="Search post..."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    handleSearch(e.target.value);
                }}
                startContent={<SearchIcon />}
                size="sm"
                isClearable
                onClear={() => handleClearSearch()}
            />
        </div>
    )
}