import { useState } from 'react';
export default function InputMurkup({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.currentTarget.value.toLowerCase().trim());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      alert('Please, type the movie name.');
      return;
    }
    onSubmit(query);
    setQuery('');
  };
  return (
    <header className="Searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={query}
          name="query"
          className="form__input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Type film name"
        />
        <button type="submit" className="form__addBtn">
          <span className="form__label">Search</span>
        </button>
      </form>
    </header>
  );
}
