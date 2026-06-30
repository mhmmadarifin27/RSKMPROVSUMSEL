"use client";

import React from "react";
import StaticPageLayout from "../StaticPageLayout";

export default function TentangKami() {
  return (
    <StaticPageLayout
      title="Tentang Kami"
      menuGroup="profil"
      layoutType="split"
      imageUrl="https://images.unsplash.com/photo-1582750433449-649352e3ff4a?w=800&auto=format&fit=crop&q=80"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-black text-primary mb-2">Sejarah Singkat & Pendirian</h3>
          <p className="text-sm text-slate-500 font-medium leading-relaxed mb-3">
            Rumah Sakit Khusus Mata (RSKM) Provinsi Sumatera Selatan didirikan awal mulanya sebagai bentuk kepedulian Pemerintah Provinsi Sumatera Selatan terhadap tingginya angka kebutaan akibat katarak dan gangguan refraksi lainnya di wilayah Sumatera Selatan dan sekitarnya. RSKM awalnya beroperasi sebagai UPTD Balai Kesehatan Mata Masyarakat (BKMM) sebelum akhirnya bertransformasi menjadi Rumah Sakit Khusus Mata tipe B milik Pemerintah Provinsi Sumatera Selatan.
          </p>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Sejak transformasi tersebut, RSKM terus berkomitmen menghadirkan pelayanan kesehatan mata terbaik dan menjadi pusat rujukan utama di tingkat regional. Dengan dedikasi tinggi, rumah sakit ini telah berhasil mempertahankan akreditasi <strong className="text-primary">Bintang Lima (Paripurna)</strong> dari Komite Akreditasi Rumah Sakit (KARS).
          </p>
        </div>

        <div>
          <h3 className="text-lg font-black text-primary mb-2">Makna Logo RSKM "BINAR"</h3>
          <p className="text-sm text-slate-500 font-medium leading-relaxed mb-3">
            Logo resmi RSKM Prov. Sumsel memadukan simbol grafis mata, inisial institusi, dan pancaran sinar "Binar" yang merefleksikan nilai-nilai inti rumah sakit:
          </p>
          <ul className="space-y-2 text-sm text-slate-500 list-disc pl-5 font-semibold">
            <li>
              <span className="text-primary font-bold">Simbol Kelopak Mata:</span> Melambangkan spesialisasi dan fokus utama pelayanan medis rumah sakit yang didedikasikan sepenuhnya untuk kesehatan mata masyarakat.
            </li>
            <li>
              <span className="text-primary font-bold">Pancaran Cahaya / Binar:</span> Melambangkan harapan baru, kesembuhan, dan visi yang jernih bagi pasien pasca-perawatan di RSKM.
            </li>
            <li>
              <span className="text-primary font-bold">Dominasi Warna Hijau:</span> Melambangkan pertumbuhan, keseimbangan, serta suasana pelayanan kesehatan yang aman, profesional, dan menyejukkan.
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-black text-primary mb-2">Tonggak Sejarah & Layanan Unggulan</h3>
          <p className="text-sm text-slate-500 font-medium leading-relaxed mb-3">
            Dalam perjalanannya, RSKM terus berinovasi dalam penyediaan sarana dan prasarana medis tingkat internasional, termasuk teknologi operasi Phacoemulsifikasi minimal invasif untuk katarak, laser retina, serta sistem rekam medis elektronik terintegrasi.
          </p>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Didukung oleh jajaran dokter spesialis dan subspesialis mata terbaik, RSKM Prov. Sumsel siap menjaga kesehatan mata Anda dan keluarga dengan layanan yang ramah, cepat, dan terjangkau.
          </p>
        </div>
      </div>
    </StaticPageLayout>
  );
}
