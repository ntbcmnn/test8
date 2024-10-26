export interface IQuoteForm {
  author: string;
  text: string;
  category: string;
}

export interface IQuote {
  id: string;
  author: string;
  text: string;
  category: string;
}

export interface IQuoteAPI {
  [key: string]: IQuote;
}