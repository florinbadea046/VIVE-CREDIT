export interface SalesApplication {
  id: string;
  client: string;
  product: string;
  productValue: string;
  amount: number;
  status: string;
  statusValue: string;
  agent: string;
  score: number;
}

export const salesData: SalesApplication[] = [
  {
    id: "AP-1001",
    client: "Popescu Ana",
    product: "Credit Casa",
    productValue: "casa",
    amount: 120000,
    status: "Nou",
    statusValue: "nou",
    agent: "Andrei",
    score: 500,
  },
  {
    id: "AP-1002",
    client: "Vasilescu Ion",
    product: "Credit Auto",
    productValue: "auto",
    amount: 35000,
    status: "În lucru",
    statusValue: "in_lucru",
    agent: "Mihai",
    score: 700,
  },
  {
    id: "AP-1003",
    client: "Mirela Ionescu",
    product: "Card Credit",
    productValue: "card",
    amount: 15000,
    status: "Finalizat",
    statusValue: "finalizat",
    agent: "Andrada",
    score: 300,
  },
  {
    id: "AP-1004",
    client: "George Matei",
    product: "Credit Casa",
    productValue: "casa",
    amount: 90000,
    status: "În lucru",
    statusValue: "in_lucru",
    agent: "Andrei",
    score: 650,
  },
  {
    id: "AP-1005",
    client: "Lavinia Pop",
    product: "Card Credit",
    productValue: "card",
    amount: 11000,
    status: "Nou",
    statusValue: "nou",
    agent: "Mihai",
    score: 400,
  },
  {
    id: "AP-1006",
    client: "Cristina Marin",
    product: "Credit Auto",
    productValue: "auto",
    amount: 42000,
    status: "Finalizat",
    statusValue: "finalizat",
    agent: "Andrei",
    score: 800,
  },
];