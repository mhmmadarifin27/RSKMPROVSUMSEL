"use client";

import React from "react";
import { useData } from "@/app/context/DataContext";
import StaticPageLayout from "../StaticPageLayout";

export default function TempatTidur() {
  const { beds } = useData();

  return (
    <StaticPageLayout
      title="Tempat Tidur"
      menuGroup="info_pengunjung"
      layoutType="standard"
      imageUrl="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=80"
    >
      <div className="space-y-6">
        <p className="text-sm text-slate-500 font-medium">
          RSKM berkomitmen menyajikan transparansi ketersediaan tempat tidur rawat inap guna menjamin kepastian pelayanan bagi pasien rawat inap darurat maupun berjadwal.
        </p>

        <div className="p-6 md:p-8 bg-slate-50 border border-slate-200 rounded-3xl space-y-6 shadow-xs mt-4">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-base font-black text-slate-800">
              Informasi Real-Time Ketersediaan Tempat Tidur
            </h3>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Data okupansi kamar rawat inap RS Khusus Mata Provinsi Sumatera Selatan yang terintegrasi dengan Satu Data Diskominfo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {beds.map((bed) => {
              const pct = Math.round((bed.filled / bed.total_capacity) * 100);
              return (
                <div key={bed.id} className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-black text-slate-800">{bed.class_name}</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">
                      Tersedia: {bed.available} Bed
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-xs text-slate-500 font-bold">
                    <span>Terisi: {bed.filled} / {bed.total_capacity} Bed</span>
                    <span>{pct}% Terisi</span>
                  </div>
                  
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-150 rounded-2xl text-xs font-semibold leading-relaxed">
            * Data ketersediaan bed di atas diperbarui setiap ada perubahan pasien masuk/keluar. Pendaftaran rawat inap memerlukan rujukan poliklinik spesialis atau kondisi darurat UGD.
          </div>
        </div>
      </div>
    </StaticPageLayout>
  );
}
