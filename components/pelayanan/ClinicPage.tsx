"use client";

import React from "react";
import { useData } from "@/app/context/DataContext";
import StaticPageLayout from "../StaticPageLayout";
import { Check } from "lucide-react";

interface ClinicPageProps {
  slug: string;
  defaultName: string;
  defaultDesc: string;
  defaultImg: string;
  defaultFacilities: string[];
}

export default function ClinicPage({
  slug,
  defaultName,
  defaultDesc,
  defaultImg,
  defaultFacilities,
}: ClinicPageProps) {
  const { clinics } = useData();
  const clinic = clinics.find((c) => c.slug === slug);

  const name = clinic?.name || defaultName;
  const description = clinic?.description || defaultDesc;
  const imageUrl = clinic?.image_url || defaultImg;
  const facilities = clinic?.facilities || defaultFacilities;

  return (
    <StaticPageLayout title={name} menuGroup="pelayanan" layoutType="split" imageUrl={imageUrl}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-black text-primary mb-3">Deskripsi Pelayanan</h3>
          <p className="text-sm leading-relaxed text-slate-500 font-medium">{description}</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-black text-primary">Fasilitas & Peralatan Medis</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            {facilities.map((fac: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-3 rounded-2xl">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-slate-700">{fac}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StaticPageLayout>
  );
}
