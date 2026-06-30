"use client";

import React from "react";
import StaticPageLayout from "../StaticPageLayout";

export default function VisiMisi() {
  return (
    <StaticPageLayout
      title="Visi & Misi"
      menuGroup="profil"
      layoutType="split"
      imageUrl="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80"
    >
      <div className="space-y-6">
        <p className="text-sm leading-relaxed text-slate-500 font-medium">
          Sebagai pusat rujukan pelayanan kesehatan mata utama di wilayah Sumatera Selatan, RSKM Provinsi Sumatera Selatan berkomitmen memberikan pelayanan berkualitas tinggi yang didukung teknologi modern dan tenaga medis profesional.
        </p>
        
        <div>
          <h3 className="text-lg font-black text-primary mb-2">Visi Kami</h3>
          <p className="text-slate-655 border-l-4 border-primary pl-4 py-2 italic text-sm bg-emerald-50/50 rounded-r font-medium">
            "Menjadi Rumah Sakit Khusus Mata Unggulan dengan Pelayanan Prima, Terpercaya, dan Terjangkau di Tingkat Nasional pada Tahun 2030."
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-black text-primary">Misi Kami</h3>
          <ul className="space-y-2 text-sm text-slate-500 list-disc pl-5 font-medium">
            <li>Menyelenggarakan pelayanan kesehatan mata yang paripurna, bermutu, dan mengutamakan keselamatan pasien (Patient Safety).</li>
            <li>Mengembangkan pusat layanan mata subspesialis unggulan dengan dukungan sarana dan prasarana berteknologi tinggi.</li>
            <li>Meningkatkan kompetensi, profesionalisme, dan integritas sumber daya manusia kesehatan secara berkelanjutan.</li>
            <li>Menerapkan tata kelola rumah sakit yang akuntabel, transparan, efektif, dan efisien demi kepuasan pelanggan.</li>
          </ul>
        </div>
      </div>
    </StaticPageLayout>
  );
}
