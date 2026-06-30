"use client";

import React from "react";
import StaticPageLayout from "../StaticPageLayout";

export default function Renstra() {
  return (
    <StaticPageLayout
      title="REANSTRA"
      menuGroup="profil"
      layoutType="standard"
      imageUrl="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80"
    >
      <div className="space-y-6">
        <p className="text-sm leading-relaxed text-slate-500 font-medium">
          Rencana Strategis (RENSTRA) RS Khusus Mata Provinsi Sumatera Selatan disusun sebagai pedoman penyelenggaraan pelayanan dan pembangunan rumah sakit untuk jangka waktu 5 tahun ke depan.
        </p>
        <div>
          <h3 className="text-lg font-black text-primary mb-2">Arah Kebijakan</h3>
          <p className="text-slate-600 border-l-4 border-primary pl-4 py-2 text-sm bg-emerald-50/50 rounded-r font-medium">
            Fokus utama RENSTRA adalah modernisasi peralatan diagnostik dan operasi mata, perluasan gedung rawat inap, serta penguatan kompetensi dokter spesialis untuk mencapai predikat pusat rujukan mata regional terkemuka.
          </p>
        </div>
      </div>
    </StaticPageLayout>
  );
}
