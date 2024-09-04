import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import User from "./page/admin-user/user";
import MainLayout from "./page/layouts/MainLayout";
import PrivateRouter from "./page/layouts/PrivateRouter";
import { UserProvider } from "./page/layouts/UserContext";
import Login from "./page/login/Login";
import MyInfor from "./page/my-infor/MyInfor";
function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRouter />}>
            <Route
              path="/"
              element={
                <MainLayout>
                  {" "}
                  <MyInfor />
                </MainLayout>
              }
            />
            <Route
              path="/user"
              element={
                <MainLayout>
                  {" "}
                  <User />
                </MainLayout>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
