"use client";

import React, { use } from "react";
import Glaukoma from "@/components/pelayanan/Glaukoma";
import Diagnostic from "@/components/pelayanan/Diagnostic";
import InfeksiImunologi from "@/components/pelayanan/InfeksiImunologi";
import PDL from "@/components/pelayanan/PDL";
import RefraksiMata from "@/components/pelayanan/RefraksiMata";
import Retina from "@/components/pelayanan/Retina";
import Umum from "@/components/pelayanan/Umum";
import KorneaBedahRefraktif from "@/components/pelayanan/KorneaBedahRefraktif";
import VIP from "@/components/pelayanan/VIP";
import RekonstruksiOkuloplastiOnkologi from "@/components/pelayanan/RekonstruksiOkuloplastiOnkologi";
import PediatrikOftamologi from "@/components/pelayanan/PediatrikOftamologi";

export default function PelayananPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  switch (slug) {
    case "glaukoma":
      return <Glaukoma />;
    case "klinik-diagnostic":
      return <Diagnostic />;
    case "klinik-infeksi-dan-imunology":
      return <InfeksiImunologi />;
    case "klinik-pdl":
      return <PDL />;
    case "klinik-refraksi-mata":
      return <RefraksiMata />;
    case "klinik-retina":
      return <Retina />;
    case "klinik-umum":
      return <Umum />;
    case "kornea-dan-bedah-refraktif":
      return <KorneaBedahRefraktif />;
    case "layanan-vip":
      return <VIP />;
    case "rekonstruksi-okuloplasti-dan-onkologi":
      return <RekonstruksiOkuloplastiOnkologi />;
    case "ruang-pediatrik-oftamologi":
      return <PediatrikOftamologi />;
    default:
      return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-24 text-center">
          <h3 className="text-xl font-black text-slate-800">Layanan Tidak Ditemukan</h3>
          <p className="text-sm text-slate-400 mt-2">
            Mohon maaf, klinik spesialis mata yang Anda cari tidak tersedia.
          </p>
        </div>
      );
  }
}
