import { operatorAccountMock } from "./operatorAccount.mock";

export const initMockOperatorAccount = () => {
  const existing = localStorage.getItem("operatorAccount");

  if (!existing) {
    localStorage.setItem(
      "operatorAccount",
      JSON.stringify(operatorAccountMock)
    );
  }
};
