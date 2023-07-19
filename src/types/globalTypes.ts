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
export interface IReview {
  reviewer?: string;
  rating?: number;
  comment?: string;
}
