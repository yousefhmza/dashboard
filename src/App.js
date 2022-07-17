import "./style/dark.scss";
import "./App.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Routes, Route } from "react-router-dom";
import { userInputs } from "./formSource";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Categories from "./pages/categories/Categories";
import NewCategory from "./pages/categories/NewCategory";
import EditCategory from "./pages/categories/EditCategory";
import ProductsCategoriesPage from "./pages/products/ProductsCategoriesPage";
import Sidebar from "./components/organisms/sidebar/Sidebar";
import Navbar from "./components/organisms/navbar/Navbar";
import CategoryProductsPage from "./pages/products/CategoryProductsPage";
import NewProductPage from "./pages/products/NewProductPage";
import EditProductPage from "./pages/products/EditProductPage";
import OffersPage from "./pages/offers/OffersPage";
import NewOfferPage from "./pages/offers/NewOfferPage";
import EditOfferPage from "./pages/offers/EditOfferPage";

const queryClient = new QueryClient();

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={darkMode ? "app dark" : "app"}>
        <div className="app-container">
          <Sidebar />
          <div className="body-container">
            <Navbar />
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="users">
                  <Route index element={<List />} />
                  <Route path=":userId" element={<Single />} />
                  <Route
                    path="new"
                    element={<New inputs={userInputs} title="Add New User" />}
                  />
                </Route>
                <Route path="categories">
                  <Route index element={<Categories />} />
                  <Route path="new" element={<NewCategory />} />
                  <Route path="edit" element={<EditCategory />} />
                </Route>
                <Route path="products-categories">
                  <Route index element={<ProductsCategoriesPage />} />
                  <Route
                    path=":categoryId/:categoryName"
                    element={<CategoryProductsPage />}
                  />
                  <Route
                    path=":categoryId/:categoryName/new-product"
                    element={<NewProductPage />}
                  />
                  <Route
                    path=":categoryId/:categoryName/edit-product/:productId"
                    element={<EditProductPage />}
                  />
                </Route>
                <Route path="offers">
                  <Route index element={<OffersPage />} />
                  <Route path="new-offer" element={<NewOfferPage />} />
                  <Route
                    path="edit-offer/:offerId"
                    element={<EditOfferPage />}
                  />
                </Route>
              </Route>
            </Routes>
          </div>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
    </QueryClientProvider>
  );
}

export default App;
