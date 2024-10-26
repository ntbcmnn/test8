import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { IQuote, IQuoteForm } from '../../types';
import Loader from '../../Components/UI/Loader/Loader.tsx';
import QuoteForm from '../../Components/QuoteForm/QuoteForm.tsx';
import axiosAPI from '../../axiosApi.ts';

const Edit = () => {
  const [quote, setQuote] = useState<IQuote>();
  const [loader, setLoader] = useState<boolean>(false);
  const params = useParams<{ quoteId: string }>();
  const navigate = useNavigate();

  const fetchOneQuote = useCallback(async () => {
    try {
      setLoader(true);
      const response: { data: IQuote } = await axiosAPI<IQuote>(
        `/quotes/${params.quoteId}.json`,
      );
      if (response.data) setQuote(response.data);
    } catch (e) {
      console.error(e);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  }, [params.quoteId]);

  const submitForm = async (post: IQuoteForm) => {
    try {
      if (params.quoteId) {
        setLoader(true);
        await axiosAPI.put(`/quotes/${params.quoteId}.json`, {...post});
        navigate('/');
      }
    } catch (e) {
      console.error(e);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  useEffect((): void => {
    if (params.quoteId) {
      void fetchOneQuote();
    }
  }, [params.quoteId, fetchOneQuote]);

  return (
    <>
      {loader ? (
        <Loader/>
      ) : (
        <>
          {quote ? (
            <QuoteForm quoteToEdit={quote} submitForm={submitForm}/>
          ) : null}
        </>
      )}
    </>
  );
};

export default Edit;