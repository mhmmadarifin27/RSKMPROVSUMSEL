"use client";

import React from "react";
import { useData } from "@/app/context/DataContext";
import StaticPageLayout from "../StaticPageLayout";

export default function DokterKami() {
  const { doctors } = useData();

  return (
    <StaticPageLayout
      title="Dokter Kami"
      menuGroup="profil"
      layoutType="standard"
      imageUrl="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop&q=80"
    >
      <div className="space-y-8">
        <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="space-y-3 flex-1">
            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest block">KOMITMEN TIM MEDIS</span>
            <h3 className="text-2xl font-black text-slate-800 leading-tight">Melayani Dengan Keahlian & Ketulusan Hati</h3>
            <p className="text-xs text-slate-550 font-semibold leading-relaxed">
              Tim dokter spesialis mata kami merupakan praktisi berpengalaman yang memiliki spesialisasi khusus (subspesialis) di bidang glaukoma, vitreoretina, infeksi imunologi, mata anak, dan rekonstruksi okuloplasti.
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <div className="text-center bg-white border border-slate-100 p-4 rounded-2xl shadow-xs">
              <div className="text-xl font-black text-emerald-650">15+</div>
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">Dokter Spesialis</div>
            </div>
            <div className="text-center bg-white border border-slate-100 p-4 rounded-2xl shadow-xs">
              <div className="text-xl font-black text-emerald-650">8+</div>
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">Sub-Spesialis</div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-black text-slate-800 mb-4 text-center">Jadwal Praktek Dokter Spesialis Mata</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {doctors.map((doc) => (
              <div key={doc.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col justify-between hover-lift">
                <div className="space-y-4">
                  <div className="w-full h-48 rounded-2xl bg-slate-50 overflow-hidden border border-slate-200 relative">
                    <img src={doc.image_url} alt={doc.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-800 leading-tight">{doc.name}</h4>
                    <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1">
                      {doc.specialization}
                    </span>
                  </div>
                  
                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Jadwal Praktek</span>
                    <div className="space-y-1 bg-slate-50 rounded-xl p-2.5">
                      {Object.entries(doc.schedule).map(([days, hours]: any) => (
                        <div key={days} className="flex justify-between text-[11px] font-semibold text-slate-600">
                          <span>{days}</span>
                          <span className="text-primary font-mono">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StaticPageLayout>
  );
}
