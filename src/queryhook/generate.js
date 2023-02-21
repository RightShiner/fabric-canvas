import API from './base';

export const generate = async (data) => {
	API.interceptors.request.use(
		(config) => (config.headers['Content-Type'] = 'multipart/form-data')
	);

	const { out } = await API.post(`predict-image`, data);
	return out;
};


export const generateSuperResolution = async (imageUrl) => {
	const formData = new FormData()
	formData.append('image_url', imageUrl)
	// API.interceptors.request.use(
	// 	(config) => (config.headers['Content-Type'] = 'multipart/form-data')
	// );

	const { data} = await API.post(`image-gen/super-resolution`, formData);
	return data;
}