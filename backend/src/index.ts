import express from "express";
import cors from "cors";
import clientRoutes from "./routes/clientRoutes";
import documentsRoutes from "./routes/documentsRoutes";
import kycRoutes from "./routes/kycRoutes";
import amlRoutes from "./routes/amlRoutes";

// Populează datele mock pentru verificare KYC/AML
import { initMockVerificationData } from "./data/mockVerification";

const app = express();

// Apelează funcția de populare mock la pornirea serverului
initMockVerificationData();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend up & running");
});

// toate rutele pentru clienți: POST/GET/PUT
app.use("/client", clientRoutes);
app.use("/documents", documentsRoutes);
app.use("/api/documents", documentsRoutes);
app.use("/kyc", kycRoutes);
app.use("/aml", amlRoutes);

app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});
