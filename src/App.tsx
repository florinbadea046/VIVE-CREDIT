import ScrollToTop from "@/components/ScrollToTop";
import CookieBanner from "@/components/CookieBanner";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <ScrollToTop />
      <CookieBanner />
      <Toaster />

      <AppRoutes />
    </>
  );
}

export default App;
