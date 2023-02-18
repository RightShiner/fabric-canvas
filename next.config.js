/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		outputStandalone: true,
	},
	env: {
		API_URL: 'https://image-gen-v2-hvrhzwzgoa-uc.a.run.app/',
		UPLOAD_URL: 'https://uploadimagetobucket-4nmvcvrxta-uc.a.run.app/',
		CONTENT_URL:
			'http://35.230.100.160/content_gen/content/generateAttributes/',
		AUTH_URL: 'https://image-gen-v2-hvrhzwzgoa-uc.a.run.app',
		API_KEY: '70e1571f30ad402e94c3ff8c4d49ff07',
		API_KEY_IMAGE: '542b285ce44c4c0b851332256e240674',
	},
};

module.exports = nextConfig;
