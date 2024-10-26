import { IQuoteForm } from '../../types';
import React, { useEffect, useState } from 'react';
import { categories } from '../../Helpers/categories.ts';
import Loader from '../UI/Loader/Loader.tsx';

const initialForm = {
  author: '',
  text: '',
  category: '',
};

interface Props {
  quoteToEdit?: IQuoteForm;
  submitForm: (post: IQuoteForm) => void;
}

const QuoteForm: React.FC<Props> = ({quoteToEdit, submitForm}) => {
  const [form, setForm] = useState({...initialForm});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect((): void => {
    if (quoteToEdit) {
      setForm((prevState) => ({
        ...prevState,
        ...quoteToEdit,
      }));
    }
  }, [quoteToEdit]);

  const onSubmitForm = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    try {
      setLoading(true);
      e.preventDefault();

      if (!form.author.trim() || !form.text.trim() || !form.category.trim()) {
        alert('Please fill out all fields.');
        return;
      }
      submitForm({...form});

      if (!quoteToEdit) {
        setForm({...initialForm});
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  };

  return (
    <>
      {loading ? <Loader/> : (
        <div className="d-flex flex-column align-items-center">
          <h2 className="mb-5">{quoteToEdit ? 'Edit quote' : 'Add new quote'}</h2>
          <form onSubmit={onSubmitForm} className="w-50">
            <div className="mb-3">
              <select
                className="form-select"
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select quote category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={form.author}
                name="author"
                className="form-control"
                placeholder="Author"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <textarea
                value={form.text}
                name="text"
                className="form-control"
                placeholder="Quote"
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-dark w-100">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default QuoteForm;