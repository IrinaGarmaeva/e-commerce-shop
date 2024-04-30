import { type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import {
  VALIDATION_MESSAGES,
  handleChangeInput,
} from "../../../utils/validationConstants";
import useFormAndValidation from "../../../hooks/useFormAndValidation";
import Input from "../Input/Input";

const SearchForm = () => {
  const navigate = useNavigate();
  const { keyword } = useParams();

  const { values, setValues, errors, setErrors, handleChange, isValid } =
    useFormAndValidation({
      searchRequest: keyword || "",
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.searchRequest) {
      setErrors({ searchRequest: VALIDATION_MESSAGES.emptySearchRequest });
      const searchError = document.getElementById("search-error");
      searchError?.classList.remove("hidden");
      return;
    }
    navigate(`/search/${values.searchRequest}`);
    setValues({ searchRequest: "" });
    handleCloseSearchForm();
  };

  const handleCloseSearchForm = () => {
    const searchForm = document.getElementById("search-form");
    const overlay = document.getElementById("search-form-overlay");
    const searchError = document.getElementById("search-error");
    searchForm?.classList.add("hidden");
    overlay?.classList.add("hidden");
    searchError?.classList.add("hidden");
    setValues({ searchRequest: "" });
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
            <Input
              type="text"
              value={values.searchRequest}
              name="searchRequest"
              placeholder="Search by keyword"
              onChange={(e) =>
                handleChangeInput(
                  e,
                  errors,
                  setErrors,
                  handleChange,
                  VALIDATION_MESSAGES.emptySearchRequest
                )
              }
              inputClassName="min-h-full w-full bg-transparent outline-none text-xl max-sm:text-base"
              error={errors.searchRequest}
              spanClassName="absolute bottom-[-21px] left-0 text-sm text-orange hidden max-sm:text-xs"
              spanId="search-error"
              minLength={3}
              maxLength={40}
            />
          </div>
          <button
            type="submit"
            className="bg-pink border border-pink px-6 py-2 rounded-md text-white max-sm:px-3 max-sm:text-sm max-sm:py-1.5 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={!isValid}
          >
            Search
          </button>
          <IoCloseOutline size={30} onClick={handleCloseSearchForm} />
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
