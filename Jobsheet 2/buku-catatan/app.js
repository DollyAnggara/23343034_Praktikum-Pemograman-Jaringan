import fs from 'fs';

fs.writeFileSync('catatan.txt', 'Nama Saya Dolly Anggara');
fs.appendFileSync('catatan.txt', ' Saya tinggal di Kerinci');

//import catatan from './catatan.js';
//const pesan = catatan();
//console.log(pesan);

import validator from 'validator';
import ambilCatatan, { tambahCatatan, hapusCatatan, listCatatan, bacaCatatan } from './catatan.js';
const pesan = ambilCatatan();
console.log(pesan);
console.log(validator.isURL('https://dollyanggara.com'));

import chalk from 'chalk';

// Cetak teks berwarna biru
console.log(chalk.blue('print warna biru sukses'));

// Coba warna dan variasi lain
console.log(chalk.red('print warna merah sukses'));
console.log(chalk.green('print warna hijau sukses'));
console.log(chalk.yellow('print warna kuning sukses'));
console.log(chalk.magenta('print warna magenta sukses'));

const command = process.argv[2];
console.log(process.argv);
console.log(process.argv[2]);

if (command === 'tambah') {
  console.log('Tambah Catatan');
} else if (command === 'hapus') {
  console.log('Hapus Catatan');
}

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

// Konfigurasi Yargs
const yargsInstance = yargs(hideBin(process.argv))
  .version('18.0.0')
  .command({
    command: 'tambah',
    describe: 'tambah sebuah catatan baru',
    builder: {
      judul: {
        describe: 'Judul catatan',
        demandOption: true,
        type: 'string'
      },
      isi: {
        describe: 'Isi catatan',
        demandOption: true,
        type: 'string'
      }
    },
    handler: function (argv) {
      tambahCatatan(argv.judul, argv.isi);
    }
  })
  .command({
    command: 'hapus',
    describe: 'hapus catatan',
    builder: {
      judul: {
        describe: 'Judul catatan',
        demandOption: true,
        type: 'string'
      }
    },
    handler: function (argv) {
      hapusCatatan(argv.judul);
    }
  })
  .command({
    command: 'list',
    describe: 'menampilkan semua catatan',
    handler: function () {
      listCatatan();
    }
  })
  .command({
    command: 'baca',
    describe: 'membaca catatan berdasarkan judul',
    builder: {
      judul: {
        describe: 'Judul catatan yang ingin dibaca',
        demandOption: true,
        type: 'string'
      }
    },
    handler: function (argv) {
      bacaCatatan(argv.judul);
    }
  });

yargsInstance.parse();
