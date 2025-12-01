export type KycStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  cnp: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt?: string;

  kycStatus?: KycStatus;
}

// “baza de date” în memorie
const clients: Client[] = [];
let nextId = 1;

export function createClient(data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Client {
  const client: Client = {
    id: nextId++,
    createdAt: new Date().toISOString(),
    kycStatus: 'PENDING',
    ...data
  };
  clients.push(client);
  return client;
}

export function findClientByEmail(email: string): Client | undefined {
  return clients.find(c => c.email === email);
}

export function findClientByCnp(cnp: string): Client | undefined {
  return clients.find(c => c.cnp === cnp);
}

export function findClientById(id: number): Client | undefined {
  return clients.find(c => c.id === id);
}

export function updateClient(id: number, data: Partial<Client>): Client | null {
  const index = clients.findIndex(c => c.id === id);
  if (index === -1) return null;

  clients[index] = {
    ...clients[index],
    ...data,
    updatedAt: new Date().toISOString()
  };

  return clients[index];
}
