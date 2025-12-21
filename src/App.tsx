import ScrollToTop from "@/components/ScrollToTop";
import CookieBanner from "@/components/CookieBanner";
import AppRoutes from "./routes/AppRoutes";
import Scadentar from "./components/scadentar/scadentar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <ScrollToTop />
      <CookieBanner />
      <Toaster />

      <AppRoutes />
      <Scadentar />
    </>
  );
}

export default App;
