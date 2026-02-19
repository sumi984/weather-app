import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="search-container glass-panel"
        >
            <Search className="search-icon" size={28} />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search city..."
                className="search-input"
            />
            <button
                type="submit"
                className="search-btn-primary"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;
