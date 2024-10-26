import { useCallback, useEffect, useState } from 'react';
import { IQuote, IQuoteAPI } from '../../types';
import axiosApi from '../../axiosApi.ts';
import Loader from '../../Components/UI/Loader/Loader.tsx';
import Quote from '../../Components/Quote/Quote.tsx';
import { useNavigate, useParams } from 'react-router-dom';

const Home = () => {
  const [quotes, setQuotes] = useState<IQuote[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams<{ quoteCategory: string }>();

  const fetchQuotes = useCallback(async () => {
    try {
      setLoading(true);
      const response: { data: IQuoteAPI } = await axiosApi.get<IQuoteAPI>('/quotes.json');
      if (response.data) {
        const quotesApi: IQuote[] = Object.keys(response.data).map(
          (quoteKey) => {
            return {
              ...response.data[quoteKey],
              id: quoteKey,
            };
          },
        );
        setQuotes(quotesApi);
      }
    } catch (e) {
      setLoading(false);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchQuotesByCategory = useCallback(async () => {
    if (params.quoteCategory) {
      try {
        const response: {
          data: IQuoteAPI
        } = await axiosApi.get<IQuoteAPI>(`/quotes.json?orderBy="category"&equalTo="${params.quoteCategory}"`);

        if (response.data) {
          const quotesApi: IQuote[] = Object.keys(response.data).map(
            (quoteKey) => {
              return {
                ...response.data[quoteKey],
                id: quoteKey,
              };
            },
          );
          setQuotes(quotesApi);
        }
      } catch (e) {
        console.error(e);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  }, [params.quoteCategory]);

  const deleteQuote = async (id: string) => {
    try {
      setLoading(true);
      await axiosApi.delete(`/quotes/${id}.json`);
      setQuotes((prevState) => prevState.filter((quote) => quote.id !== id));
      navigate('/');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.quoteCategory) {
      void fetchQuotesByCategory();
    } else {
      void fetchQuotes();
    }
  }, [fetchQuotes, fetchQuotesByCategory, params.quoteCategory]);

  return (
    <>
      {loading ? <Loader/> : (
        <>
          {quotes.length > 0 ? (
            <>
              {quotes.map((quote: IQuote) => (
                <Quote key={quote.id} quote={quote} onDelete={() => deleteQuote(quote.id)}/>
              ))}
            </>
          ) : (
            <h4 className="text-center">No quotes in this category yet</h4>
          )}
        </>
      )}
    </>
  );
};

export default Home;