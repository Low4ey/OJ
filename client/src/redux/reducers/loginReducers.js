// reducers.js
const initialState = {
	isLoggedIn: false,
	role: null,
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case "LOGIN_SUCCESS":
			return {
				...state,
				isLoggedIn: true,
				role: action.payload.role,
			};
		case "LOGOUT":
			return {
				...state,
				isLoggedIn: false,
				role: null,
			};
		default:
			return state;
	}
};

export default rootReducer;
