import NProgress from "nprogress";
import { Router } from "next/router";
import Head from "next/head";
import store from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "nprogress/nprogress.css";
import "tailwindcss/tailwind.css";
import "../style/global.css";

function MyApp({ Component, pageProps }) {
  NProgress.configure({ showSpinner: false });
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());
  let persistor = persistStore(store);

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link
          rel='shortcut icon'
          href='/pokeball-red.png'
          type='image/x-icon'
        />
      </Head>

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
