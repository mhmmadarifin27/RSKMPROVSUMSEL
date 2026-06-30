"use client";

import React from "react";
import StaticPageLayout from "../StaticPageLayout";

export default function AksesibilitasRS() {
  return (
    <StaticPageLayout
      title="Aksesibilitas RS"
      menuGroup="profil"
      layoutType="standard"
      imageUrl="https://images.unsplash.com/photo-1508847154043-be12a62861c1?w=800&auto=format&fit=crop&q=80"
    >
      <div className="space-y-4">
        <p className="text-sm text-slate-500 font-medium">
          Kami berkomitmen menyediakan lingkungan rumah sakit yang ramah bagi seluruh kalangan, termasuk penyandang disabilitas, lansia, dan ibu hamil. Fasilitas aksesibilitas kami meliputi:
        </p>
        <ul className="space-y-2 text-sm text-slate-500 list-disc pl-5 font-semibold">
          <li>Ram atau jalur landai untuk kursi roda di setiap pintu masuk utama.</li>
          <li>Ubin pemandu (Guiding Blocks) bagi tunanetra di selasar utama.</li>
          <li>Toilet khusus disabilitas yang dilengkapi pegangan tangan (handrails).</li>
          <li>Layanan prioritas antrean pendaftaran khusus disabilitas dan lansia.</li>
        </ul>
      </div>
    </StaticPageLayout>
  );
}
