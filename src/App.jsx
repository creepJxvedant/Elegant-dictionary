import { Suspense, lazy } from "react";
import Loader from "./Loader";
import Footer from "./Footer";

const DictionaryApp = lazy(() => import("./DictionaryApp.jsx"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white justify-center items-center flex p-4">
        <DictionaryApp />
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
