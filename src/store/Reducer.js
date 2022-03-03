import { LOGIN, LOGOUT} from "./Types";

const Reducer = (state, action) => {
  const { type,user_id} = action;
  switch (type) {
    case LOGIN:
      console.log(action);
      return {
        ...state,
        isAuth: true,
        user_id,
      };

    case LOGOUT:
      return {
        ...state,
        isAuth: false,
        user_id:null,
      };

    default:
      return state;
  }
};

export default Reducer;