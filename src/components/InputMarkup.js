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
    <form className="form__box" onSubmit={handleSubmit}>
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
      <button type="submit" className="form__btn">
        <span className="form__btn_text">Search</span>
      </button>
    </form>
  );
}
