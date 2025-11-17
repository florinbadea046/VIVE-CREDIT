  import { Request, Response } from 'express';
  import {
    createClient,
    findClientByEmail,
    findClientById,
    updateClient, 
    findClientByCnp
  } from '../data/clients';

  function isValidCnp(cnp: string): boolean {
    return typeof cnp === 'string' && /^\d{13}$/.test(cnp);
  }

  function isValidEmail(email: string): boolean {
    return typeof email === 'string' && email.includes('@');
  }

  function isValidPhone(phone: string): boolean {
    return typeof phone === 'string' && phone.replace(/\D/g, '').length >= 10;
  }

  // POST /client
  export const createClientHandler = (req: Request, res: Response) => {
    const { firstName, lastName, cnp, email, phone, address } = req.body;

    if (!firstName || !lastName || !cnp || !email || !phone || !address) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!isValidCnp(cnp)) {
      return res.status(400).json({ error: 'Invalid CNP' });
    }

    if (findClientByCnp(cnp)) {
      return res.status(409).json({ error: 'CNP already exists' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    if (findClientByEmail(email)) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    if (!isValidPhone(phone)) {
      return res.status(400).json({ error: 'Invalid phone' });
    }

    const client = createClient({ firstName, lastName, cnp, email, phone, address });

    console.log('[AUDIT] CLIENT_CREATED', {
      clientId: client.id,
      email: client.email,
      createdAt: client.createdAt
    });

    return res.status(201).json(client);
  };

  // GET /client/:id
  export const getClientHandler = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const client = findClientById(id);

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    return res.json(client);
  };

  // PUT /client/:id
  export const updateClientHandler = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const updated = updateClient(id, req.body);

    if (!updated) {
      return res.status(404).json({ error: 'Client not found' });
    }

    console.log('[AUDIT] CLIENT_UPDATED', {
      clientId: updated.id,
      updatedAt: updated.updatedAt
    });

    return res.json(updated);
  };
