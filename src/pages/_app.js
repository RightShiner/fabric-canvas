// bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/globals.css'
import '@/styles/fbEnlarge.css'
import '@/styles/twitterEnlarge.css'
import '@/styles/skeltonLoader.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
  // return <h1></h1>
}
