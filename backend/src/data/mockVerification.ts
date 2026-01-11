import { saveKycResult } from "./kycResults";
import { saveAmlResult } from "./aml";
import { createClient } from "./clients";

// Inițializează date mock pentru testing
export function initMockVerificationData() {
  // Client 1 - Doar trimis KYC (pas 1)
  const client1 = createClient({
    firstName: "Ion",
    lastName: "Popescu",
    cnp: "1800101123456",
    email: "ion.popescu@test.ro",
    phone: "0712345678",
    address: "Str. Test nr. 1",
  });

  // Salvăm status KYC "PENDING" pentru a avea dată la "Trimis"
  saveKycResult({
    clientId: client1.id,
    documentType: "ID_CARD",
    score: 0,
    livenessResult: "FAILED", // sau "PASSED", nu contează la "trimis"
    status: "PENDING",
  });
  // console.log("Client 1 (doar trimis KYC):", client1);

  // Client 2 - KYC APPROVED, în așteptarea AML
  const client2 = createClient({
    firstName: "Maria",
    lastName: "Ionescu",
    cnp: "2850202234567",
    email: "maria.ionescu@test.ro",
    phone: "0723456789",
    address: "Str. Test nr. 2",
  });

  saveKycResult({
    clientId: client2.id,
    documentType: "ID_CARD",
    score: 85,
    livenessResult: "PASSED",
    status: "APPROVED",
  });

  // console.log("Client 2 (KYC approved, așteaptă AML):", client2);

  // Client 3 - Tot completat (KYC + AML)
  const client3 = createClient({
    firstName: "Client",
    lastName: "Test",
    cnp: "1234567890123",
    email: "client@client.ro",
    phone: "0734567890",
    address: "Str. Test nr. 3",
  });

  saveKycResult({
    clientId: client3.id,
    documentType: "ID_CARD",
    score: 85,
    livenessResult: "PASSED",
    status: "APPROVED",
  });

  saveAmlResult({
    clientId: client3.id,
    fullName: "Client Test",
    cnp: "1234567890123",
    isPep: false,
    hasSanctions: false,
    riskScore: 15,
    riskLevel: "LOW",
    matchedLists: [],
  });

  // console.log("Client 3 (KYC + AML completat):", client3);

  // Client 4 - KYC REJECTED
  const client4 = createClient({
    firstName: "Ana",
    lastName: "Georgescu",
    cnp: "2900303345678",
    email: "ana.georgescu@test.ro",
    phone: "0745678901",
    address: "Str. Test nr. 4",
  });

  saveKycResult({
    clientId: client4.id,
    documentType: "ID_CARD",
    score: 45,
    livenessResult: "FAILED",
    status: "REJECTED",
  });

  // console.log("Client 4 (KYC respins):", client4);

  // Client 5 - KYC APPROVED dar AML REJECTED (HIGH risk)
  const client5 = createClient({
    firstName: "Andrei",
    lastName: "Stanescu",
    cnp: "1850404456789",
    email: "andrei.stanescu@test.ro",
    phone: "0756789012",
    address: "Str. Test nr. 5",
  });

  saveKycResult({
    clientId: client5.id,
    documentType: "ID_CARD",
    score: 88,
    livenessResult: "PASSED",
    status: "APPROVED",
  });

  saveAmlResult({
    clientId: client5.id,
    fullName: "Andrei Stanescu",
    cnp: "1850404456789",
    isPep: true,
    hasSanctions: true,
    riskScore: 92,
    riskLevel: "HIGH",
    matchedLists: ["EU Sanctions List", "PEP Database"],
  });

  // console.log("Client 5 (KYC approved, AML respins - HIGH risk):", client5);
}
