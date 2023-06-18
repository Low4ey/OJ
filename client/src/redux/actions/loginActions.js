export const loginSuccess = (role) => {
	return {
		type: "LOGIN_SUCCESS",
		payload: {
			role,
		},
	};
};

export const logout = () => {
	return {
		type: "LOGOUT",
	};
};
