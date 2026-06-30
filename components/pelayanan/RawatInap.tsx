"use client";

import React from "react";
import StaticPageLayout from "../StaticPageLayout";

export default function RawatInap() {
  return (
    <StaticPageLayout
      title="Rawat Inap"
      menuGroup="pelayanan"
      layoutType="split"
      imageUrl="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80"
    >
      <div className="space-y-6">
        <p className="text-sm leading-relaxed text-slate-500 font-medium">
          Layanan Rawat Inap RS Khusus Mata Provinsi Sumatera Selatan menyediakan akomodasi perawatan pasca-operasi mata maupun perawatan intensif okular yang ditangani secara langsung oleh perawat spesialis mata berpengalaman.
        </p>
        <div className="space-y-3 border-t border-slate-100 pt-4">
          <h4 className="text-sm font-black text-primary uppercase">Fasilitas Kamar</h4>
          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
            Kamar rawat inap kami terbagi menjadi beberapa kelas (VIP, Kelas I, Kelas II, dan Kelas III) yang masing-masing dilengkapi tempat tidur medis ergonomis, AC, nurse call system 24 jam, serta layanan konsumsi sesuai anjuran ahli gizi rumah sakit.
          </p>
        </div>
      </div>
    </StaticPageLayout>
  );
}
