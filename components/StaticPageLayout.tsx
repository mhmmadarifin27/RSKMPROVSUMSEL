"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Grid, Eye } from "lucide-react";
import { useData } from "@/app/context/DataContext";

interface StaticPageLayoutProps {
  title: string;
  menuGroup: string;
  layoutType?: "standard" | "split" | "grid";
  imageUrl?: string;
  gridImages?: string[];
  children: React.ReactNode;
}

export default function StaticPageLayout({
  title,
  menuGroup,
  layoutType: initialLayoutType = "standard",
  imageUrl: initialImageUrl,
  gridImages: initialGridImages,
  children,
}: StaticPageLayoutProps) {
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const { pages } = useData();

  // Resolve DB page slug from title
  let slug = title.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-").replace(/[^a-z0-9\-]/g, "");
  if (slug === "reanstra") slug = "renstra";

  const dbPage = pages.find((p) => p.slug === slug);

  // Overrides from DB if available
  const activeLayoutType = dbPage?.layout_type || initialLayoutType;
  const activeImageUrl = dbPage?.image_url || initialImageUrl;
  const activeGridImages = dbPage?.grid_images || initialGridImages;
  const hasDbContent = !!dbPage?.content;

  return (
    <div className="w-full py-12 md:py-16 bg-slate-50/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        {/* ================= LAYOUT: STANDARD ================= */}
        {activeLayoutType === "standard" && (
          <article className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <header className="space-y-3 text-center border-b border-slate-100 pb-6">
              <span className="inline-block bg-slate-100 text-slate-500 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                Menu {menuGroup.replace("_", " ")}
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-800 tracking-tight leading-tight">
                {title}
              </h2>
            </header>

            {/* Display Cover Image if present */}
            {activeImageUrl && (
              <div className="w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-md border border-slate-150">
                <img
                  src={activeImageUrl}
                  alt={title}
                  className={`w-full h-full object-cover ${
                    dbPage?.image_position === "top"
                      ? "object-top"
                      : dbPage?.image_position === "bottom"
                      ? "object-bottom"
                      : "object-center"
                  }`}
                />
              </div>
            )}

            {/* Content Body */}
            <div className="text-sm leading-relaxed text-slate-650 font-medium font-sans">
              {hasDbContent && dbPage && (
                <div className="space-y-6" dangerouslySetInnerHTML={{ __html: dbPage.content }} />
              )}
              {(!hasDbContent || !dbPage || [
                "renstra", 
                "tentang-kami", 
                "visi-misi", 
                "struktur-organisasi", 
                "jajaran-direksi", 
                "aksesibilitas-rs", 
                "dokter-kami", 
                "jadwal-besuk", 
                "syarat-pendaftaran-bpjs", 
                "tarif-layanan", 
                "tempat-tidur", 
                "pelayanan-publik",
                "rawat-inap"
              ].includes(slug)) && (
                <div className={hasDbContent && dbPage ? "mt-6 border-t border-slate-100 pt-6" : ""}>{children}</div>
              )}
            </div>
          </article>
        )}

        {/* ================= LAYOUT: SPLIT ================= */}
        {activeLayoutType === "split" && (
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-fade-in">
            {/* Image (Left) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md h-[300px] md:h-[420px] rounded-3xl overflow-hidden shadow-xl border border-slate-150 hover-lift">
                <img
                  src={activeImageUrl || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80"}
                  alt={title}
                  className={`w-full h-full object-cover ${
                    dbPage?.image_position === "top"
                      ? "object-top"
                      : dbPage?.image_position === "bottom"
                      ? "object-bottom"
                      : "object-center"
                  }`}
                />
              </div>
            </div>

            {/* Content (Right) */}
            <div className="lg:col-span-7 space-y-6">
              <header className="space-y-2">
                <span className="inline-block bg-slate-100 text-slate-500 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                  Menu {menuGroup.replace("_", " ")}
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-800 tracking-tight leading-tight">
                  {title}
                </h2>
              </header>

              {/* Content Body */}
              <div className="text-sm leading-relaxed text-slate-650 font-medium">
                {hasDbContent && dbPage && (
                  <div className="space-y-6" dangerouslySetInnerHTML={{ __html: dbPage.content }} />
                )}
                {(!hasDbContent || !dbPage || [
                  "renstra", 
                  "tentang-kami", 
                  "visi-misi", 
                  "struktur-organisasi", 
                  "jajaran-direksi", 
                  "aksesibilitas-rs", 
                  "dokter-kami", 
                  "jadwal-besuk", 
                  "syarat-pendaftaran-bpjs", 
                  "tarif-layanan", 
                  "tempat-tidur", 
                  "pelayanan-publik",
                  "rawat-inap"
                ].includes(slug)) && (
                  <div className={hasDbContent && dbPage ? "mt-6 border-t border-slate-100 pt-6" : ""}>{children}</div>
                )}
              </div>
            </div>
          </article>
        )}

        {/* ================= LAYOUT: GRID ================= */}
        {activeLayoutType === "grid" && (
          <article className="space-y-12 animate-fade-in">
            <header className="space-y-3 text-center max-w-2xl mx-auto border-b border-slate-100 pb-6">
              <span className="inline-block bg-slate-100 text-slate-500 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                Menu {menuGroup.replace("_", " ")}
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-800 tracking-tight leading-tight">
                {title}
              </h2>
            </header>

            {/* Cover photo if uploaded */}
            {activeImageUrl && (
              <div className="w-full h-[300px] md:h-[420px] rounded-3xl overflow-hidden shadow-md border border-slate-150 max-w-5xl mx-auto">
                <img
                  src={activeImageUrl}
                  alt={title}
                  className={`w-full h-full object-cover ${
                    dbPage?.image_position === "top"
                      ? "object-top"
                      : dbPage?.image_position === "bottom"
                      ? "object-bottom"
                      : "object-center"
                  }`}
                />
              </div>
            )}

            {/* Description Text */}
            <div className="max-w-3xl mx-auto text-sm text-slate-650 font-medium">
              {hasDbContent && dbPage && (
                <div className="space-y-6" dangerouslySetInnerHTML={{ __html: dbPage.content }} />
              )}
              {(!hasDbContent || !dbPage || [
                "renstra", 
                "tentang-kami", 
                "visi-misi", 
                "struktur-organisasi", 
                "jajaran-direksi", 
                "aksesibilitas-rs", 
                "dokter-kami", 
                "jadwal-besuk", 
                "syarat-pendaftaran-bpjs", 
                "tarif-layanan", 
                "tempat-tidur", 
                "pelayanan-publik",
                "rawat-inap"
              ].includes(slug)) && (
                <div className={hasDbContent && dbPage ? "mt-6 border-t border-slate-100 pt-6" : ""}>{children}</div>
              )}
            </div>

            {/* Gallery Grid */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-400 tracking-wider uppercase text-center flex items-center justify-center gap-1.5">
                <Grid className="w-4 h-4 text-primary" />
                <span>Galeri Penunjang Halaman</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {(activeGridImages && activeGridImages.length > 0 ? activeGridImages : [
                  "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=400&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400&auto=format&fit=crop&q=80"
                ]).map((imgUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedGalleryImg(imgUrl)}
                    className="relative rounded-2xl overflow-hidden h-48 border border-slate-150 shadow-xs hover-lift group cursor-pointer"
                  >
                    <img src={imgUrl} alt="Gallery Item" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        )}
      </div>

      {/* ================= GALLERY LIGHTBOX MODAL ================= */}
      {selectedGalleryImg && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xs flex items-center justify-center z-55 p-4" onClick={() => setSelectedGalleryImg(null)}>
          <div className="relative max-w-3xl w-full max-h-[85vh] overflow-hidden rounded-2xl">
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
    </div>
  );
}
