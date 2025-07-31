import { Routes, Route } from "react-router-dom";
import HomePage from "@/components/pages/HomePage";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;