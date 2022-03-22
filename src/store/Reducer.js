import { LOGIN, LOGOUT} from "./Types";

const Reducer = (state, action) => {
  const { type,user_id,user_name} = action;
  switch (type) {
    case LOGIN:
      console.log(action);
      return {
        ...state,
        isAuth: true,
        user_id,
        user_name
      };

    case LOGOUT:
      return {
        ...state,
        isAuth: false,
        user_id:null,
        user_name:null
      };

    default:
      return state;
  }
};

export default Reducer;