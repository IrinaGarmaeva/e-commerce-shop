import { type ChangeEvent, type FormEvent, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { VALIDATION_MESSAGES } from "../../../utils/validationConstants";

const SearchForm = () => {
  const [searchRequest, setSearchRequest] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChangeSearchRequest = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchRequest(e.target.value);
    const searchError = document.getElementById("search-error");
    searchError?.classList.add("hidden");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchRequest) {
      setError(VALIDATION_MESSAGES.emptySearchRequest);
      const searchError = document.getElementById("search-error");
      searchError?.classList.remove("hidden");
      return;
    }
    console.log("you have submitted the search form");
  };

  const handleCloseSearchForm = () => {
    const searchForm = document.getElementById("search-form");
    const overlay = document.getElementById("search-form-overlay");
    const searchError = document.getElementById("search-error");
    searchForm?.classList.add("hidden");
    overlay?.classList.add("hidden");
    searchError?.classList.add("hidden");
    setSearchRequest("");
  };

  return (
    <div
    id="search-form-overlay"
    className="w-full h-screen bg-bg-opacity fixed top-0 left-0 z-10 hidden"
  >
    <form
      id="search-form"
      className="bg-white min-h-20 px-5 z-20 hidden"
      onSubmit={handleSubmit}
    >
      <div className="min-h-20 max-container flex flew-row flex-nowrap items-center gap-3 max-sm:gap-1">
        <div className="min-h-full w-11/12 relative max-350px:w-3/5">
          <input
            type="text"
            value={searchRequest}
            name="search"
            placeholder="Search by keyword"
            onChange={handleChangeSearchRequest}
            autoComplete="off"
            minLength={3}
            maxLength={40}
            className="min-h-full w-full bg-transparent outline-none text-xl max-sm:text-base"
          />
          <span
            id="search-error"
            className="absolute bottom-[-21px] left-0 text-sm text-orange hidden max-sm:text-xs"
          >
            {error}
          </span>
        </div>
        <button
          type="submit"
          className="bg-pink border border-pink px-6 py-2 rounded-md text-white max-sm:px-3 max-sm:text-sm max-sm:py-1.5"
        >
          Search
        </button>
        <IoCloseOutline
          size={30}
          className=""
          onClick={handleCloseSearchForm}
        />
      </div>
    </form>
  </div>
  )
}

export default SearchForm
