import { useContext } from "react";

import ContactContext from "../../context/ContactContext";

const SearchContact = () => {
  const { onContactSearch, onSubmitSearch } = useContext(ContactContext);
  return (
    <form onSubmit={(event) => onSubmitSearch(event)} className='d-flex'>
      <input
        className='form-control me-1 '
        type='search'
        placeholder='جستجو کنید...'
        onChange={(event) => onContactSearch(event)}
      />
      <button type='submit' className='btn btn-primary btn-sm'>
        جستجو
      </button>
    </form>
  );
};

export default SearchContact;
