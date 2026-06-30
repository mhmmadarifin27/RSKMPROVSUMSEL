"use client";

import React, { useState } from "react";
import { useData } from "@/app/context/DataContext";
import StaticPageLayout from "../StaticPageLayout";
import { ArrowRight, Calendar, FileText } from "lucide-react";
import Link from "next/link";

export default function BeritaArtikel() {
  const { posts } = useData();
  const [selectedFilter, setSelectedFilter] = useState("all");

  const newsAndArticles = posts.filter(
    (p) => p.category === "berita" || p.category === "artikel"
  );

  const filteredPosts = newsAndArticles.filter(
    (p) => selectedFilter === "all" || p.category === selectedFilter
  );

  return (
    <StaticPageLayout
      title="Berita & Artikel Kesehatan"
      menuGroup="media"
      layoutType="standard"
    >
      <div className="space-y-8">
        <p className="text-sm leading-relaxed text-slate-500 font-medium">
          Dapatkan pembaruan terbaru mengenai kegiatan rumah sakit, rilis media resmi, serta artikel edukasi kesehatan mata yang ditulis langsung oleh tim medis RSKM Prov. Sumsel.
        </p>

        {/* Tab Filters */}
        <div className="flex gap-2 border-b border-slate-100 pb-3">
          {["all", "berita", "artikel"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black capitalize transition-all cursor-pointer border ${
                selectedFilter === filter
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-slate-200 text-slate-550 hover:bg-slate-50"
              }`}
            >
              {filter === "all" ? "Semua" : filter}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover-lift flex flex-col md:flex-row h-full"
              >
                {/* Image Cover */}
                <div className="w-full md:w-[40%] h-48 md:h-auto shrink-0 bg-slate-50 relative">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  {post.badge && (
                    <span className="absolute top-4 left-4 text-[9px] font-black tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md uppercase">
                      {post.badge}
                    </span>
                  )}
                </div>

                {/* Details Content */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {new Date(post.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-slate-800 leading-snug line-clamp-2">
                      {post.title}
                    </h4>

                    <p className="text-[11px] text-slate-500 font-medium line-clamp-3 leading-normal">
                      {post.content.replace(/<[^>]*>/g, "")}
                    </p>
                  </div>

                  <div className="border-t border-slate-50 pt-4 mt-4">
                    <Link
                      href={`/post/${post.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-black text-primary hover:text-primary-hover group"
                    >
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl text-slate-400">
            <FileText className="w-10 h-10 mx-auto text-slate-300 mb-3" />
            <p className="text-xs font-bold">Belum ada berita atau artikel.</p>
          </div>
        )}
      </div>
    </StaticPageLayout>
  );
}
