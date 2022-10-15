import { useRef } from "react";

const Search = ({ searchUsername,successfull }) => {
    
    const inputRef = useRef();
    const searched = e => {
        e.preventDefault();
        const searchKeyword = inputRef.current.value;
        searchUsername(searchKeyword);
    }
    return (
        <div className="card search">
            <h1>Search for username</h1>
            <form onSubmit={searched}>
                <input type="text" ref={inputRef} className={successfull === false ? "incorrect-input": ""} />
                <button>Search</button>
            </form>    
            {
                successfull === false ? (
                    <p className="incorrect">Invalid Username</p>
                ) : true}
         
        </div>  
    ) 
}
export default Search