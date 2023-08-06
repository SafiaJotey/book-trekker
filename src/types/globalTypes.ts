import { ReactNode } from 'react';

export interface IFormSignupInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IFormLoginInput {
  email: string;
  password: string;
}

export interface IProps {
  children: ReactNode;
}

export interface IBook {
  book: IBook;
  _id: string;
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  image: string;
  reviews?: {
    reviewer: string;
    rating: number;
    comment: string;
  }[];
}
export interface ISingleBook {
  book: IBook;
  _id: string;
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  image: string;
  reviews?: {
    reviewer: string;
    rating: number;
    comment: string;
  }[];
}
export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IReview {
  _id?: string;
  reviewer?: string;
  rating?: number;
  comment?: string;
}
export interface IWishlist {
  _id: string;
  book?: ISingleBook;
  user?: IUser;
}
export interface IReadinglist {
  _id: string;
  book?: ISingleBook;
  user?: IUser;
}
export interface IFaq{
  question: string,
  answer:string}
  export interface ICategory {
  image: string;
  genra: string;
}
export interface ICompletelist {
  _id: string;
  book?: ISingleBook;
  user?: IUser;
}
export type AddReviewModalProps = {
  open: boolean;
  onClose: () => void;
  onAddReview: (data: IReview) => void;
};
export type DeleteModalProps = {
  onCancel: () => void;
  onDelete: () => void;
};

export interface IAddBookInput {
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  image: string;
  user?: string;
}
