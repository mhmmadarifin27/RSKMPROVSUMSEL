"use client";

import React from "react";
import StaticPageLayout from "../StaticPageLayout";

export default function SyaratPendaftaranBPJS() {
  return (
    <StaticPageLayout
      title="Syarat Pendaftaran BPJS"
      menuGroup="info_pengunjung"
      layoutType="standard"
      imageUrl="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80"
    >
      <div className="space-y-4">
        <p className="text-sm text-slate-500 font-medium">
          Sebagai rumah sakit rujukan tipe B, RSKM Provinsi Sumatera Selatan melayani pasien jaminan BPJS Kesehatan dengan menyertakan persyaratan administratif wajib berikut saat pendaftaran:
        </p>
        <ul className="space-y-2 text-sm text-slate-500 list-disc pl-5 font-semibold">
          <li>Kartu BPJS Kesehatan asli (atau kartu digital di Mobile JKN).</li>
          <li>Kartu Tanda Penduduk (KTP) asli / Kartu Keluarga bagi anak.</li>
          <li>Surat Rujukan asli dari Fasilitas Kesehatan Tingkat Pertama (FKTP / Puskesmas / Klinik) yang masih berlaku.</li>
          <li>Surat Kontrol Ulang (SKDP) dari dokter spesialis RSKM (khusus untuk pasien kontrol berkala).</li>
        </ul>
      </div>
    </StaticPageLayout>
  );
}
