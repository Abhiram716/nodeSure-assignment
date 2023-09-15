import { Route, Routes } from "react-router";

import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductsPage from "./pages/ProductsPage";
import AuthContextProvider from "./contexts/AuthContextProvider";
function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
