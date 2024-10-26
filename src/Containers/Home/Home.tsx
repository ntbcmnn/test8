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

  const fetchQuotes: () => Promise<void> = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      if (params.quoteCategory) {
        const response: {
          data: IQuoteAPI
        } = await axiosApi.get<IQuoteAPI>(`/quotes.json?orderBy="category"&equalTo="${params.quoteCategory}"`);

        if (response.data) {
          const quotesApi: IQuote[] = Object.keys(response.data).map(
            (quoteKey: string) => {
              return {
                ...response.data[quoteKey],
                id: quoteKey,
              };
            },
          );
          setQuotes(quotesApi.reverse());
        }
      } else {
        const response: { data: IQuoteAPI } = await axiosApi.get<IQuoteAPI>('/quotes.json');
        if (response.data) {
          const quotesApi: IQuote[] = Object.keys(response.data).map(
            (quoteKey: string) => {
              return {
                ...response.data[quoteKey],
                id: quoteKey,
              };
            },
          );
          setQuotes(quotesApi.reverse());
        }
      }
    } catch (e) {
      setLoading(false);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [params.quoteCategory]);

  const deleteQuote: (id: string) => Promise<void> = async (id: string): Promise<void> => {
    try {
      setLoading(true);
      await axiosApi.delete(`/quotes/${id}.json`);
      setQuotes((prevState): IQuote[] => prevState.filter((quote) => quote.id !== id));
      navigate('/');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect((): void => {
    void fetchQuotes();
  }, [fetchQuotes, params.quoteCategory]);

  return (
    <>
      {loading ? <Loader/> : (
        <>
          {quotes.length > 0 ? (
            <>
              {quotes.map((quote: IQuote) => (
                <Quote key={quote.id} quote={quote} onDelete={(): Promise<void> => deleteQuote(quote.id)}/>
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