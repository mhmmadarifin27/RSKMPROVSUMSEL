"use client";

import React from "react";
import StaticPageLayout from "../StaticPageLayout";

export default function TarifLayanan() {
  return (
    <StaticPageLayout
      title="Tarif Layanan"
      menuGroup="info_pengunjung"
      layoutType="standard"
      imageUrl="https://images.unsplash.com/photo-1554224154-7604de381558?w=800&auto=format&fit=crop&q=80"
    >
      <div className="space-y-4">
        <p className="text-sm text-slate-500 font-medium">
          Seluruh tarif pelayanan medis di RS Khusus Mata Provinsi Sumatera Selatan ditetapkan secara transparan berdasarkan Peraturan Gubernur Sumatera Selatan. Kami menjamin biaya tindakan operasi mata, obat-obatan, dan jasa konsultasi terjangkau bagi masyarakat umum.
        </p>
        <p className="text-xs text-slate-400 italic">
          * Untuk rincian daftar biaya konsultasi poliklinik reguler/VIP, biaya pemeriksaan penunjang (USG, OCT), serta paket operasi katarak gratis/mandiri, harap hubungi meja informasi pendaftaran utama.
        </p>
      </div>
    </StaticPageLayout>
  );
}
