import QuoteForm from '../../Components/QuoteForm/QuoteForm.tsx';
import Loader from '../../Components/UI/Loader/Loader.tsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IQuoteForm } from '../../types';
import axiosAPI from '../../axiosApi.ts';

const Add = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();

  const submitForm = async (post: IQuoteForm) => {
    try {
      setLoader(true);
      await axiosAPI.post('/quotes.json', {...post});
      navigate('/');
    } catch (e) {
      console.error(e);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  return <>
    {loader ?
      <Loader/>
      :
      <QuoteForm submitForm={submitForm}/>}
  </>;
};

export default Add;
