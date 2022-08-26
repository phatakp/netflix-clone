import { ProtectedRoute } from "layout";
import { Account, Browse, Home, SignIn, SignUp } from "pages";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/browse" element={<Browse />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
