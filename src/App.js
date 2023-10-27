import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import './components/JobListComponent';
import JobListComponent from './components/JobListComponent';
import LayoutComponent from "./components/LayoutComponent";
import TranslatorsComponent from "./components/TranslatorsComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutComponent />}>
          <Route index element={<JobListComponent title="Translation Jobs" />} />
          <Route path="translators" element={<TranslatorsComponent title="Translators" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
