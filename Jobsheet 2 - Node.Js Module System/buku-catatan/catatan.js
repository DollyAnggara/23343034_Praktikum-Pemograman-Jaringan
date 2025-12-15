import fs from 'fs';
import chalk from 'chalk';

const ambilCatatan = function () {
  return 'Ini Catatan Dolly Anggara...';
};

// Tambah Catatan
export const tambahCatatan = function (judul, isi) {
  const catatan = muatCatatan();
  const catatanGanda = catatan.filter((note) => note.judul === judul);

  if (catatanGanda.length === 0) {
    catatan.push({
      judul: judul,
      isi: isi,
    });
    simpanCatatan(catatan);
    console.log(chalk.green.inverse('Catatan baru ditambahkan!'));
  } else {
    console.log(chalk.red.inverse('Judul catatan telah dipakai!'));
  }
};

// Hapus Catatan
export const hapusCatatan = function (judul) {
  const catatan = muatCatatan();
  const catatanUntukDisimpan = catatan.filter((note) => note.judul !== judul);

  if (catatan.length > catatanUntukDisimpan.length) {
    console.log(chalk.green.inverse('Catatan dihapus!'));
    simpanCatatan(catatanUntukDisimpan);
  } else {
    console.log(chalk.red.inverse('Catatan tidak ditemukan!'));
  }
};

// Menampilkan Semua Catatan (List)
export const listCatatan = function () {
  const catatan = muatCatatan();
  console.log(chalk.blue.inverse('Daftar Catatan:'));
  catatan.forEach((note, index) => {
    console.log(`${index + 1}. ${note.judul}`);
  });
};

// Membaca Catatan (Read)
export const bacaCatatan = function (judul) {
  const catatan = muatCatatan();
  const note = catatan.find((note) => note.judul === judul);

  if (note) {
    console.log(chalk.green.inverse('Catatan Ditemukan:'));
    console.log('Judul: ' + note.judul);
    console.log('Isi: ' + note.isi);
  } else {
    console.log(chalk.red.inverse('Catatan tidak ditemukan!'));
  }
};

// Fungsi bantu: simpan ke file JSON
const simpanCatatan = function (catatan) {
  const dataJSON = JSON.stringify(catatan);
  fs.writeFileSync('catatan.json', dataJSON);
};

// Fungsi bantu: muat dari file JSON
const muatCatatan = function () {
  try {
    const dataBuffer = fs.readFileSync('catatan.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

export default ambilCatatan;
