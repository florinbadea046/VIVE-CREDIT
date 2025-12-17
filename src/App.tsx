import { useEffect } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import CookieBanner from "@/components/CookieBanner";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { initMockClientAccount } from "@/modules/auth/mock/initMockClientAccount";
import { initMockOperatorAccount } from "@/modules/auth/mock/initMockOperatorAccount";

function App() {
  useEffect(() => {
    initMockClientAccount();
    initMockOperatorAccount();
  }, []);

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
