import { SET_DATA, SET_KEY, SET_PAGE, SET_Q } from "@/pages/Profile/_constant";

export interface IAction {
    type: string;
    payload: any;
}

const set_key =(key:number):IAction=>{
    return {
        type:SET_KEY,
        payload: key
    }
}
const set_data =(data:any):IAction=>{
    return {
        type:SET_DATA,
        payload: data
    }
}
const set_page =(page:number):IAction=>{
    return {
        type:SET_PAGE,
        payload: page
    }
}
const set_q =(q:string):IAction=>{
    return {
        type:SET_Q,
        payload: q
    }
}
export {
    set_key,
    set_data,
    set_page,
    set_q
}