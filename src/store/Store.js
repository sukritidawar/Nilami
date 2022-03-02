import { createContext } from "react";

const Store = createContext({
    isAuth: false,
    user_id: null,
})

export default Store