// bootstrap css
import 'bootstrap/dist/css/bootstrap.css';
import 'styles/fbEnlarge.css';
import 'styles/twitterEnlarge.css';
import 'styles/skeltonLoader.css';
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';

export default function App({ Component, pageProps }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: 3,
						// cacheTime: 0,
						retryDelay: 5000,
					},
				},
			})
	);
	const getLayout = Component.getLayout ?? ((page) => page);
	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				{getLayout(
					<div className="">
						<Component {...pageProps} />
					</div>
				)}
				<ToastContainer theme="dark" />
			</Hydrate>
		</QueryClientProvider>
	);
	// return <h1></h1>
}
