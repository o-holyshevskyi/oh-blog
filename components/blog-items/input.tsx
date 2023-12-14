import { Input } from '@nextui-org/react';
import { SearchIcon } from "../icons";
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function SearchInput({
    handleSearch
} : {
    handleSearch: (term: string) => void
}) {
    const t = useTranslations("blogPage");
    
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleClearSearch = () => {
        setSearchTerm('');
        handleSearch('');
    };
    
    return (
        <div className="flex ml-5">
            <Input
                placeholder={t("searchInputPlaceholder")}
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