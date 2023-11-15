import { useState } from 'react';

export const App = () => {
  const [bookTitles, setBookTitles] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [abortCtrl, setAbortCtrl] = useState(null);

  const fetchTitles = async () => {
    const controller = new AbortController();
    setAbortCtrl(controller);
    setFetching(true);
    try {
      setBookTitles(['fetching...']);
      const resultJson = await fetch(import.meta.env.VITE_API_BOOKS, {
        signal: controller.signal
      });
      const result = await resultJson.json();
      setBookTitles(result.data);
    } catch (e) {
      setBookTitles(null);
    } finally {
      setFetching(false);
      setAbortCtrl(null);
    }
  };
  const abortRequest = () => {
    abortCtrl?.abort();
  };
  return (
    <div>
      <h2>Here are some books!</h2>
      <hr />
      <div>
        <button disabled={fetching} onClick={fetchTitles}>
          Get the titles!!!
        </button>{' '}
        <button disabled={!fetching} onClick={abortRequest}>
          Abort request!
        </button>
      </div>
      <hr />
      <div>
        {bookTitles && bookTitles.length > 0
          ? bookTitles.map((bookTitle) => (
              <div key={bookTitle}>{bookTitle}</div>
            ))
          : null}
      </div>
    </div>
  );
};
