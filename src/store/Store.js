import { createContext } from "react";

const Store = createContext({
    isAuth: false,
    user_id: null,
    user_name: null,
})

export default Store