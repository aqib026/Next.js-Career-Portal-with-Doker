import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import Head from "next/head";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";

import "../public/assets/css/custom.css";
import { AuthContextProvider } from "../context/AuthContext";
import { store, persistor } from "../redux/store";

import { useRouter } from "next/router";
import ProtectedRoute from "../components/ProtectedRoute";
import RedirectToDashboard from "../components/RedirectToDashboard";
import SeperateRoutes from "../components/SeperateRoutes";
import { useAuth } from "../context/AuthContext";

const noAuthRequireList = ["/forgot", "/", "/applyJob", "/login", "/signup"];
const authScreens = ["/forgot", "/login", "/signup"]
function MyApp({ Component, pageProps }) {
  
  const router = useRouter();
  const { user } = useAuth();


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthContextProvider>
          <Head>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js" integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ=" crossorigin="anonymous"></script>
            <script
              src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js"
              integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ="
              crossOrigin="anonymous"
              defer
            ></script>
            <script
              src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"
              integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns"
              crossOrigin="anonymous"
              defer
            ></script>









            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
              integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
              crossOrigin="anonymous"
            />
        
            <link
              href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
              rel="stylesheet"
            />

            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
            />
          </Head>
          {noAuthRequireList.includes(router.pathname) ?
            <>
              
              {
                authScreens.includes(router.pathname) ?
                  <RedirectToDashboard>
                    <Component {...pageProps} />
                  </RedirectToDashboard>
                  :
                  <Component {...pageProps} />

              }
              
            </> : (
              <ProtectedRoute>
                <SeperateRoutes>
                  <Component {...pageProps} />
                </SeperateRoutes>

              </ProtectedRoute>
            )}{" "}
        </AuthContextProvider>
      </PersistGate>
    </Provider>
  );
}
export default MyApp;
