"use client";

import React from "react";
import { useData } from "@/app/context/DataContext";
import StaticPageLayout from "../StaticPageLayout";

export default function JajaranDireksi() {
  const { directors } = useData();

  return (
    <StaticPageLayout
      title="Jajaran Direksi"
      menuGroup="profil"
      layoutType="standard"
    >
      <div className="space-y-8">
        <p className="text-sm leading-relaxed text-slate-500 font-medium">
          Pengelolaan RS Khusus Mata Provinsi Sumatera Selatan diamanatkan kepada jajaran direksi profesional yang berdedikasi tinggi terhadap pelayanan kesehatan publik yang akuntabel dan bermutu tinggi.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto justify-center pt-4">
          {directors.map((dir) => (
            <div key={dir.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col items-center text-center hover-lift">
              <div className="w-40 h-40 rounded-2xl bg-slate-50 overflow-hidden border border-slate-200 mb-4">
                <img src={dir.image_url} alt={dir.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-slate-800 leading-tight">{dir.name}</h4>
                <span className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-100 px-3 py-0.5 rounded-md text-[10px] font-extrabold uppercase">
                  {dir.position}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaticPageLayout>
  );
}
