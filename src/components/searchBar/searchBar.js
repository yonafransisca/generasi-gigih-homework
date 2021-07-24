import React from 'react'

const searchBar = ({handleSubmit, query, handleQuery}) => {
    return (
        <div>
            <h1>Discover your favorite music.</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Songs, artists, or albums."
                    className="bar"
                    value={query}
                    onChange={handleQuery}
                />
                <input 
                    type="submit"
                    value="Search"
                    className="btn search" 
                />
            </form>
        </div>
    )
}

export default searchBar
