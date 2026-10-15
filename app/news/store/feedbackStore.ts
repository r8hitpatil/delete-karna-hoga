import { create } from "zustand";

type feedBackForm = {
    name : string;
    email : string;
    age : number;
    feedback : string;
    news : string;
    setName: (str:string) => void;
    setEmail: (str:string) => void;
    setAge: (num:number) => void;
    setFeedback: (str:string) => void;
    setNews: (str:string) => void;
}

export const useFeedBackStore = create<feedBackForm>((set) => ({
    name : "",
    email : "",
    age : 0,
    feedback : "",
    news : "",

    setName: (inp:string) => {
        set({ name: inp });
    },

    setEmail: (inp:string) => {
        set({ email : inp });
    },

    setAge: (inp:number) => {
        set({ age : inp });
    },

    setFeedback: (inp:string) => {
        set({ feedback : inp });
    },

    setNews: (inp:string) => {
        set({ news : inp });
    }
}))