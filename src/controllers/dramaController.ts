import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getAllDramas = async (req: Request, res: Response): Promise<void> => {
  const dramas = await prisma.drama.findMany();
  res.json(dramas);
};

export const createDrama = async (req: Request, res: Response): Promise<void> => {
  const { title, episodes, description, quote } = req.body;

  const newDrama = await prisma.drama.create({
    data: {
      title,
      episodes: Number(episodes),
      description,
      quote
    }
  });

  res.status(201).json(newDrama);
};

export const updateDrama = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  const { title, episodes, description, quote } = req.body;

  const existing = await prisma.drama.findUnique({ where: { id } });

  if (!existing) {
    res.status(404).json({ message: 'Data drama tidak ditemukan' });
    return;
  }

  const updated = await prisma.drama.update({
    where: { id },
    data: {
      title,
      episodes: Number(episodes),
      description,
      quote
    }
  });

  res.json(updated);
};

export const deleteDrama = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);

  const existing = await prisma.drama.findUnique({ where: { id } });

  if (!existing) {
    res.status(404).json({ message: 'Data drama tidak ditemukan' });
    return;
  }

  const deleted = await prisma.drama.delete({ where: { id } });
  res.json(deleted);
};
