"use client";

import React, { useState } from "react";
import { useData } from "@/app/context/DataContext";
import StaticPageLayout from "../StaticPageLayout";
import { BookOpen, Download, Search } from "lucide-react";

export default function Perpustakaan() {
  const { libraryItems } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredItems = libraryItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <StaticPageLayout
      title="Perpustakaan Digital"
      menuGroup="media"
      layoutType="standard"
    >
      <div className="space-y-8">
        <p className="text-sm leading-relaxed text-slate-500 font-medium">
          Selamat datang di Perpustakaan Digital RS Khusus Mata Provinsi Sumatera Selatan. Di sini Anda dapat mengunduh buku saku, dokumen panduan pelayanan, jurnal riset, dan presentasi materi seputar kesehatan mata.
        </p>

        {/* Filter & Search Bar */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col md:flex-row items-center gap-4">
          {/* Search Input */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-4 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari buku atau panduan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs font-bold bg-slate-50 border border-slate-200/80 rounded-2xl p-3 pl-12 text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {["all", "buku", "jurnal", "panduan", "presentasi"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize whitespace-nowrap border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary border-primary text-white"
                    : "bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100"
                }`}
              >
                {cat === "all" ? "Semua" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Library Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col justify-between hover-lift"
              >
                <div className="space-y-4">
                  {/* File Image Cover */}
                  <div className="w-full h-40 rounded-2xl bg-slate-50 overflow-hidden border border-slate-200 relative">
                    <img
                      src={item.image_url || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 right-3 text-[9px] font-black tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md uppercase">
                      {item.category}
                    </span>
                  </div>

                  {/* Text details */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-slate-800 leading-tight line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-semibold line-clamp-3 leading-normal">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Download action button */}
                <div className="border-t border-slate-100 pt-4 mt-4 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono font-bold">
                    {item.file_name}
                  </span>

                  <a
                    href={item.file_url}
                    download={item.file_name}
                    className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100/50 text-emerald-700 px-3.5 py-2 rounded-xl text-[10px] font-black uppercase transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl text-slate-400">
            <BookOpen className="w-10 h-10 mx-auto text-slate-300 mb-3" />
            <p className="text-xs font-bold">Tidak ada dokumen perpustakaan yang cocok.</p>
          </div>
        )}
      </div>
    </StaticPageLayout>
  );
}
