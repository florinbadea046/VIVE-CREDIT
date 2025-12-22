import { clientAccountMock } from "./clientAccount.mock";

export const initMockClientAccount = () => {
  const existingAccount = localStorage.getItem("clientAccount");

  if (!existingAccount) {
    localStorage.setItem("clientAccount", JSON.stringify(clientAccountMock));
  }
};
