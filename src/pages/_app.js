// bootstrap css
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { useState, useRef, useEffect } from "react";
import { UserProvider } from "contexts/UserContext";
import { useRouter } from "next/router";
import { CheckUserValid } from "utils/auth.helper";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
// import "styles/fbEnlarge.css";
// import "styles/twitterEnlarge.css";
// import "styles/skeltonLoader.css";

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

  const router = useRouter();
  const authTimerID = useRef(null);
  // const authTimeout = useRef<any>(-999999)

  useEffect(() => {
    const userRemainingTime = CheckUserValid();
    const isUserValid = userRemainingTime > 0;
    // authTimeoutID.current = userRemainingTime

    if (
      router.pathname !== "/register" &&
      router.pathname !== "/reset-password"
    )
      if (!isUserValid) router.replace("/login");

    if (!authTimerID.current) {
      authTimerID.current = setTimeout(() => CheckUserValid, userRemainingTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        {/* <UserProvider> */}
        {getLayout(
          <div className="">
            <Component {...pageProps} />
          </div>
        )}
        <ToastContainer theme="dark" />
        {/* </UserProvider> */}
      </Hydrate>
    </QueryClientProvider>
  );
  // return <h1></h1>
}
