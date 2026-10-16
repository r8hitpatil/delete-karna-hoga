import React from "react";
import { CarouselApi } from "@/components/ui/carousel";

export interface FormContextState {
  name: string;
  age: number;
  email: string;
  feedback: string;
  news: string;
  api?: CarouselApi;
}

export interface FormContextDispatch {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setAge: React.Dispatch<React.SetStateAction<number>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setFeedback: React.Dispatch<React.SetStateAction<string>>;
  setNews: React.Dispatch<React.SetStateAction<string>>;
  setApi: React.Dispatch<React.SetStateAction<CarouselApi | undefined>>;
  nextPage: () => void;
  prevPage: () => void;
  handleSubmit: () => Promise<void>;
  reset: () => void;
}

export type FormContextProps = FormContextState & FormContextDispatch;

const defaultDispatch: FormContextDispatch = {
  setName: () => {},
  setAge: () => {},
  setEmail: () => {},
  setFeedback: () => {},
  setNews: () => {},
  setApi: () => {},
  nextPage: () => {},
  prevPage: () => {},
  handleSubmit: async () => {},
  reset: () => {},
};

const defaultFormContext: FormContextProps = {
  ...defaultDispatch,
  name: "",
  age: 0,
  email: "",
  feedback: "",
  news: "",
  api: undefined,
};

const FormContext = React.createContext<FormContextProps>(defaultFormContext);

export default FormContext;
