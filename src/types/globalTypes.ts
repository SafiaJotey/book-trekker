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
export interface IFaq {
  question: string;
  answer: string;
}
export interface ICategory {
  image: string;
  genra: string;
}
export type IFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};
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

export interface IAddBookForm {
  image: string;
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  bookPdf: string;
  user: string;
}
export interface IGetBook {
  image: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
  };
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  bookPdf: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
  };
  reviews?: {
    reviewer: string;
    rating: number;
    comment: string;
  }[];
  _id: string;
  user: string;
}
export interface IList {
  book: IGetBook;
  user: string;
  _id: string;
}
