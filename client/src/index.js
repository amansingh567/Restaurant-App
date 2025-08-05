import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainContainer, CreateContainer } from "./components";
import Errorpage from "./components/Errorpage";
import store from "./redux";
import { Provider } from "react-redux";
import MenuPage from "./page/MenuPage";
import Cart from "./page/Cart";
import MenuStatic from "./page/MenuStatic";

import Success from "./page/Success";
import Canceled from "./page/Canceled";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Errorpage errorCode={404} />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
        errorElement: <Errorpage errorCode={400} />,
      },
      {
        path: "/menu",
        element: <MenuStatic />,
      },
      {
        path: "/menu/:productId",
        element: <MenuPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/createitem",
        element: <CreateContainer />,
      },
      {
        path: "/Success",
        element: <Success />,
      },
      {
        path: "/Canceled",
        element: <Canceled />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
