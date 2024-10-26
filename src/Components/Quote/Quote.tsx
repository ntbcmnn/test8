import React from 'react';
import { IQuote } from '../../types';
import { Link } from 'react-router-dom';

interface Props {
  quote: IQuote;
  onDelete: (id: string) => void;
}

const Quote: React.FC<Props> = ({quote, onDelete}) => {
  return (
    <div className="d-flex flex-column align-items-center">
      {quote ?
        <div className="card mb-4 bg-dark text-white border-0 p-3 w-75">
          <div className="card-body d-flex flex-column gap-1">
            <p className="card-text text-light fw-bold">#{quote.category}</p>
            <hr className="border-white border-1 opacity-100"/>
            <h5 className="card-title">{quote.author}:</h5>
            <p className="card-text">&laquo;{quote.text}&raquo;</p>
            <div className="d-flex gap-3 justify-content-end mt-4">
              <button
                className="btn btn-dark border-white fs-5"
                onClick={() => onDelete(quote.id)}
              >
                <i className="bi bi-trash3"></i>
              </button>
              <Link
                to={`/quotes/${quote.id}/edit`}
                className="btn btn-dark border-white fs-5 border-white"
              >
                <i className="bi bi-pen"></i>
              </Link>
            </div>
          </div>
        </div>
        : <p className="text-center">No quotes found</p>
      }
    </div>
  );
};

export default Quote;