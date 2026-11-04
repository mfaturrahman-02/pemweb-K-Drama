import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

export const validateDramaInput = (req: Request, res: Response, next: NextFunction): void => {
  const { title, episodes, description, quote } = req.body;

  if (!title || !episodes || !description || !quote) {
    res.status(400).json({ message: 'Semua kolom (judul, episode, deskripsi, quote) wajib diisi!' });
    return;
  }

  if (isNaN(Number(episodes)) || Number(episodes) <= 0) {
    res.status(400).json({ message: 'Jumlah episode harus berupa angka positif!' });
    return;
  }

  next();
};
