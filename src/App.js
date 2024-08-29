import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import CreateObjectPage from "./pages/CreateObject/CreateObjectPage";
import TestPage from "./pages/Test/TestPage";
import EditObjectPage from "./pages/EditObject/EditObjectPage";
import ObjectPage from "./pages/Object/ObjectPage";
import LoginPage from "./pages/Login/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/admin/object/create" element={<CreateObjectPage />} />
          <Route path={"/admin/object/edit/:object_id"} element={<EditObjectPage />} />
          <Route path={"/object/:object_id"} element={<ObjectPage />} />
          <Route path={"/test"} element={<TestPage />} />
          <Route path={"/login"} element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
