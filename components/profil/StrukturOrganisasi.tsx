"use client";

import React, { useState } from "react";
import { useData } from "@/app/context/DataContext";
import StaticPageLayout from "../StaticPageLayout";

export default function StrukturOrganisasi() {
  const { pages } = useData();
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);

  // Find page data
  const page = pages.find((p) => p.slug === "struktur-organisasi");
  const imageUrl = page?.image_url || "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=800&auto=format&fit=crop&q=80";

  return (
    <StaticPageLayout
      title="Struktur Organisasi"
      menuGroup="profil"
      layoutType="standard"
    >
      <div className="space-y-6 text-center">
        <p className="text-sm text-slate-500 font-medium text-left">
          Struktur organisasi RS Khusus Mata Provinsi Sumatera Selatan disusun berdasarkan peraturan daerah untuk menjamin pelayanan yang tanggap, efisien, dan memiliki rantai komando yang transparan. Bagan struktur komando ini dipimpin oleh Direktur Utama dan didukung oleh komite medis beserta kepala bagian.
        </p>

        {imageUrl ? (
          <div 
            className="w-full bg-white p-4 border border-slate-200 rounded-3xl shadow-xs overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedGalleryImg(imageUrl)}
          >
            <img 
              src={imageUrl} 
              alt="Struktur Organisasi RSKM" 
              className="w-full h-auto object-contain rounded-2xl max-h-[600px] mx-auto"
            />
            <p className="text-[10px] text-slate-400 mt-3 font-semibold">Klik gambar untuk melihat dalam ukuran penuh</p>
          </div>
        ) : (
          <div className="w-full bg-white p-12 border border-slate-200 rounded-3xl text-center shadow-xs text-slate-400">
            Bagan struktur belum diunggah oleh administrator.
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedGalleryImg && (
        <div 
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-xs flex items-center justify-center z-55 p-4" 
          onClick={() => setSelectedGalleryImg(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[85vh] overflow-hidden rounded-2xl">
            <button
              onClick={() => setSelectedGalleryImg(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer z-10 font-bold"
            >
              X
            </button>
            <img src={selectedGalleryImg} alt="Lightbox Preview" className="w-full h-auto object-contain mx-auto max-h-[85vh] rounded-xl" />
          </div>
        </div>
      )}
    </StaticPageLayout>
  );
}
