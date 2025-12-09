import ScrollToTop from "@/components/ScrollToTop";
import CookieBanner from "@/components/CookieBanner";
import AppRoutes from "./routes/AppRoutes";
import Scadentar from "./components/scadentar/scadentar";

function App() {
  return (
    <>
      <ScrollToTop />
      <CookieBanner />

      <AppRoutes />
      <Scadentar />
    </>
  );
}

export default App;
