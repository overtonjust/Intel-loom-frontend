import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import './SearchBar.scss';

const SearchBar = ({ placeholder }) => {
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord)
    };

    const clearInput = () => {
        setWordEntered("")
    };

    return (

        <div className='search'>
            <button className='filterButton'>
                <FilterListIcon />
            </button>
            <div className='searchInputs'>
                <input
                    type='text'
                    placeholder={placeholder || 'Search'}
                    value={wordEntered}
                    onChange={handleFilter}
                />

                <button onClick={clearInput}>
                    <SearchIcon />
                </button>
            </div>
        </div>
    );
};

export default SearchBar;