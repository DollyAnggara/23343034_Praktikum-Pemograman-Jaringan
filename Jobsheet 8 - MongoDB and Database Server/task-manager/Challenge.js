// CHALLENGE: Menggunakan deleteOne untuk menghapus salah satu data tugas

const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const namaDatabase = 'task-manager';

async function main() {
    try {
        // Menghubungkan ke MongoDB database server
        await client.connect();
        console.log('Berhasil terhubung ke MongoDB database server');

        // Memilih database
        const db = client.db(namaDatabase);

        // Menampilkan data tugas sebelum dihapus
        console.log('\n=== Data Tugas Sebelum Dihapus ===');
        const tugasSebelum = await db.collection('tugas').find({}).toArray();
        console.log(tugasSebelum);

        // CHALLENGE: Menghapus satu dokumen tugas menggunakan deleteOne
        // Menghapus tugas dengan deskripsi "Membeli Makanan"
        const deleteTugas = await db.collection('tugas').deleteOne({
            Deskripsi: 'Membeli Makanan'
        });

        // Menampilkan hasil penghapusan
        console.log('\n=== Hasil DeleteOne ===');
        console.log('Dokumen yang dihapus:', deleteTugas.deletedCount);
        console.log('Acknowledged:', deleteTugas.acknowledged);

        // Menampilkan data tugas setelah dihapus
        console.log('\n=== Data Tugas Setelah Dihapus ===');
        const tugasSesudah = await db.collection('tugas').find({}).toArray();
        console.log(tugasSesudah);

        return 'Penghapusan data tugas selesai.';

    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    } finally {
        // Menutup koneksi ke database
        await client.close();
    }
}

// Menjalankan fungsi main
main().then(console.log).catch(console.error);
