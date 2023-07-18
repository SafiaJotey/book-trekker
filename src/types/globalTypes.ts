import { ReactNode } from "react";

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

export interface IProps{
  children:ReactNode;
}