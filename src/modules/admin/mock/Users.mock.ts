import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(1, "Acest camp este obligatoriu"),
  email: z
    .string()
    .min(1, "Acest camp este obligatoriu")
    .email("Adresa de email este invalida"),
  status: z.enum(["active", "inactive"]).default("active"),
  role: z.enum(["client", "operator", "admin"]).default("client"),
});

export const UserSchema = CreateUserSchema.extend({
  id: z.string(),
});

export type UserInputs = z.infer<typeof CreateUserSchema>;
export type User = z.infer<typeof UserSchema>;

export const usersData: User[] = [
  {
    id: "f3b1c2a4-8d5e-4f1a-9e6a-1c3a5b7d9e01",
    name: "John Doe",
    email: "john.doe@example.com",
    status: "active",
    role: "admin",
  },
  {
    id: "a7c9d2e1-1b6a-4c8f-9d22-3a5e1b9f0a11",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "active",
    role: "operator",
  },
  {
    id: "d91a3c6e-5b2f-4a8b-8d10-7e1c2a4f9b21",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    status: "inactive",
    role: "client",
  },
  {
    id: "b2f4e9a7-9c1d-4b55-8a6e-11c3d7e0f331",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    status: "active",
    role: "client",
  },
  {
    id: "c8e3a4d1-7f2b-4a91-9b5f-2d0e6c1a4432",
    name: "Daniel Wilson",
    email: "daniel.wilson@example.com",
    status: "active",
    role: "operator",
  },
  {
    id: "e5c1b7a9-3d2f-4c6e-9a12-8b0d4f2a5533",
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    status: "inactive",
    role: "client",
  },
  {
    id: "1a7d9c4e-2f8b-4d3a-9e10-b5c6f8a66434",
    name: "James Anderson",
    email: "james.anderson@example.com",
    status: "active",
    role: "client",
  },
  {
    id: "9f2a6d3c-4b7e-4a9c-8d55-0b1e7f8c7535",
    name: "Sophia Taylor",
    email: "sophia.taylor@example.com",
    status: "active",
    role: "operator",
  },
  {
    id: "4e8a7c9d-1f3b-4c2e-9a61-d5b0e2f86436",
    name: "William Thomas",
    email: "william.thomas@example.com",
    status: "inactive",
    role: "client",
  },
  {
    id: "0b1e4a6f-9c7d-4b28-8a77-5e3d2f9c7537",
    name: "Isabella Moore",
    email: "isabella.moore@example.com",
    status: "active",
    role: "client",
  },
  {
    id: "7f5a1c8d-2e9b-4d3c-9a88-0b4e6f2d8638",
    name: "Alexander Martin",
    email: "alexander.martin@example.com",
    status: "active",
    role: "admin",
  },
  {
    id: "c3b5d9f8-1a6e-4f2b-8d99-7e0a4c1b9739",
    name: "Mia Lee",
    email: "mia.lee@example.com",
    status: "inactive",
    role: "client",
  },
  {
    id: "6d9f8a2c-3e1b-4a55-9d10-c7b4e0f10840",
    name: "Benjamin Harris",
    email: "benjamin.harris@example.com",
    status: "active",
    role: "operator",
  },
  {
    id: "1c2a5b9f-7e3d-4c66-8a11-9f0b4e8d1941",
    name: "Charlotte Clark",
    email: "charlotte.clark@example.com",
    status: "active",
    role: "client",
  },
  {
    id: "e9a6d5f2-8c7b-4a77-9d12-1b0f3c4e2942",
    name: "Henry Lewis",
    email: "henry.lewis@example.com",
    status: "inactive",
    role: "client",
  },
  {
    id: "2f4d7b8e-5a9c-4c88-8a13-6e1b0f3d3943",
    name: "Amelia Walker",
    email: "amelia.walker@example.com",
    status: "active",
    role: "client",
  },
  {
    id: "9c8b7a2f-3d5e-4a99-9d14-f1c0e6b44944",
    name: "Lucas Hall",
    email: "lucas.hall@example.com",
    status: "active",
    role: "operator",
  },
  {
    id: "b3e7f9a4-2c8d-4b11-8a15-0d6c5f1e5945",
    name: "Evelyn Allen",
    email: "evelyn.allen@example.com",
    status: "inactive",
    role: "client",
  },
  {
    id: "4c1b8f2e-9d7a-4c22-9a16-5e0d6f3b6946",
    name: "Logan Young",
    email: "logan.young@example.com",
    status: "active",
    role: "client",
  },
  {
    id: "a9e8d2c7-1f5b-4d33-8a17-6c0f3b4e7947",
    name: "Harper King",
    email: "harper.king@example.com",
    status: "active",
    role: "operator",
  },
  {
    id: "7b5c1a9f-2d8e-4a44-9d18-e6f0c3b88948",
    name: "Jack Wright",
    email: "jack.wright@example.com",
    status: "inactive",
    role: "client",
  },
  {
    id: "c8f1b7d9-5a4e-4c55-8a19-2e0f6b3d9949",
    name: "Lily Scott",
    email: "lily.scott@example.com",
    status: "active",
    role: "client",
  },
  {
    id: "f2a3c9e8-1d7b-4a66-9d20-5b6e0f4c1050",
    name: "Sebastian Green",
    email: "sebastian.green@example.com",
    status: "active",
    role: "operator",
  },
  {
    id: "3d9e5c7b-1a8f-4c77-8a21-0f6e2b4d1151",
    name: "Zoey Adams",
    email: "zoey.adams@example.com",
    status: "inactive",
    role: "client",
  },
  {
    id: "8c1f2b7a-5e9d-4a88-9d22-6f0e3b4c1252",
    name: "Noah Perez",
    email: "noah.perez@example.com",
    status: "active",
    role: "admin",
  },
];
