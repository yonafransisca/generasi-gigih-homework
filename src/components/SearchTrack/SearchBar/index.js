import './SearchBar.css';

const SearchBar = ({ handleSubmit, query, handleQuery }) => {
    return (
        <div className="search-bar">
            <h1 className="search-headline">Discover your favorite music.</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Songs, artists, or albums."
                    className="bar"
                    value={query}
                    onChange={handleQuery}
                />
                <button
                    type="submit"
                    value="Search"
                    className="btn secondary hide"
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
