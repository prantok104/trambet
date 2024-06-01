import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css"; //importing font awesome css
import { config } from "@fortawesome/fontawesome-svg-core";
import Layout from "@/components/layout";
config.autoAddCss = false;
import "@/styles/global.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoaderPage from "./LoaderPage";
import { LanguageProvider } from "@/components/Context/LanguageProvider";
import { ToastContainer } from "react-toastify";
import { LogoutProvider } from "@/components/Context/Provider/Users/LogoutProvider";

import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "@/store";
import {
  UserProvider,
} from "@/components/Context/UserDataProvider/UserProvider";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return (
    <>
      {loading ? (
        <LoaderPage />
      ) : (
        <Provider store={store}>
          <UserProvider>
            <LanguageProvider>
              <LogoutProvider>
                <Layout>
                  <ToastContainer />
                  <Component {...pageProps} />
                </Layout>
              </LogoutProvider>
            </LanguageProvider>
          </UserProvider>
        </Provider>
      )}
    </>
  );
}
