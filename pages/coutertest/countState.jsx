import { atom } from "recoil";

export const countState = atom({
    key : 'coutess',
    default : 50
  })

  export const histryState = atom({
    key : "histryStates",
    default : []
  })