import 'dotenv/config';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '../src/generated/prisma/client';

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL
});
const prisma = new PrismaClient({ adapter });

const initialDramas = [
  {
    title: 'Daily Dose of Sunshine',
    episodes: 12,
    description: 'Mengisahkan Jung Da-eun, seorang perawat berhati hangat yang baru dipindahkan ke departemen kesehatan jiwa (psikiatri) dan berjuang memberikan secercah harapan bagi para pasiennya.',
    quote: 'Malam paling gelap selalu datang tepat sebelum fajar menyingsing.'
  },
  {
    title: 'Resident Playbook',
    episodes: 12,
    description: 'Spin-off dari Hospital Playlist yang menyoroti kehidupan nyata, perjuangan berat, dan persahabatan para dokter residen obstetri dan ginekologi (OBGYN) di Yulje Medical Center cabang Jongno.',
    quote: 'Setiap kelahiran adalah keajaiban, begitu pula proses kita bertumbuh menjadi dokter sejati.'
  },
  {
    title: 'Hospital Playlist',
    episodes: 24,
    description: 'Kisah lima dokter spesialis yang telah bersahabat sejak masuk sekolah kedokteran pada tahun 1999. Mereka bekerja di rumah sakit yang sama dan menyalurkan hobi bermusik lewat sebuah band.',
    quote: 'Orang jahat tidak akan pernah berpikir bahwa dirinya jahat. Hanya orang baik yang khawatir apakah mereka sudah cukup baik.'
  },
  {
    title: 'Our Unwritten Seoul',
    episodes: 12,
    description: 'Kisah dua saudari kembar identik dengan kepribadian dan kehidupan yang sangat bertolak belakang. Karena suatu keadaan, mereka bertukar identitas dan mulai menemukan arti hidup serta penyembuhan diri di kota Seoul.',
    quote: 'Halaman yang belum tertulis di kota ini adalah milik kita untuk dilukis bersama.'
  }
];

const seed = async (): Promise<void> => {
  const count = await prisma.drama.count();

  if (count > 0) {
    console.log(`Seed dilewati: tabel Drama sudah berisi ${count} data.`);
    return;
  }

  await prisma.drama.createMany({ data: initialDramas });
  console.log(`Seed selesai: ${initialDramas.length} drama berhasil ditambahkan.`);
};

seed()
  .catch((error) => {
    console.error('Seed gagal:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
