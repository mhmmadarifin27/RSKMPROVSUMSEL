"use client";

import React, { useState } from "react";
import { useData } from "@/app/context/DataContext";
import StaticPageLayout from "../StaticPageLayout";
import { Camera, Eye, Calendar } from "lucide-react";

export default function DokumentasiKegiatan() {
  const { posts } = useData();
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);

  const kegiatanPosts = posts.filter((p) => p.category === "kegiatan");

  return (
    <StaticPageLayout
      title="Dokumentasi Kegiatan"
      menuGroup="media"
      layoutType="standard"
    >
      <div className="space-y-8">
        <p className="text-sm leading-relaxed text-slate-500 font-medium">
          Kumpulan galeri foto dokumentasi berbagai kegiatan pelayanan medis, bakti sosial operasi katarak gratis, penyuluhan kesehatan mata masyarakat, dan agenda internal RSKM Prov. Sumsel.
        </p>

        {kegiatanPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {kegiatanPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedGalleryImg(post.image_url)}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover-lift group cursor-pointer"
              >
                {/* Image Cover */}
                <div className="h-48 bg-slate-50 relative overflow-hidden">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold uppercase">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date(post.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h4 className="text-xs font-black text-slate-800 leading-snug line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 line-clamp-2">
                    {post.content.replace(/<[^>]*>/g, "")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl text-slate-400">
            <Camera className="w-10 h-10 mx-auto text-slate-300 mb-3" />
            <p className="text-xs font-bold">Belum ada dokumentasi kegiatan.</p>
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
