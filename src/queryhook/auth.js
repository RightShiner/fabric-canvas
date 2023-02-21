import { AUTH_API } from './base';

export const loginRequest = async (formData) => {
	const { data } = await AUTH_API.post(`auth/login`, {
		...formData,
	});
	return data;
};

export const emailLoginRequest = async (email) => {
	const formData = new FormData();
	formData.set('email', email);

	const { data } = await AUTH_API.post(`auth/email-login`, formData);
	return data;
};


export const registerRequest = async (formData) => {
	const { data } = await AUTH_API.post(`auth/sign-up`, {
		...formData,
	});
	return data;
};

export const resetPassword = async (email) => {
	const formData = new FormData();
	formData.set('email', email);

  AUTH_API.options.con
	const { data } = await AUTH_API.post(`auth/reset-password`, formData);
	return data;
};
