import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/User/Home/HomePage';
import CreateObjectPage from "./pages/Admin/CreateObject/CreateObjectPage";
import TestPage from "./pages/Test/TestPage";
import EditObjectPage from "./pages/Admin/EditObject/EditObjectPage";
import ObjectPage from "./pages/User/Object/ObjectPage";
import LoginPage from "./pages/Admin/Login/LoginPage";
import NewsPage from "./pages/User/News/News";
import CreateNewsPage from "./pages/Admin/CreateNews/CreateNewsPage";
import Objects from "./pages/User/Objects/Objects";

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
        <Route path={"/admin/news/create"} element={<CreateNewsPage />} />
        <Route path={"/news"} element={<NewsPage />} />
        <Route path={"/objects/:type"} element={<Objects />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
