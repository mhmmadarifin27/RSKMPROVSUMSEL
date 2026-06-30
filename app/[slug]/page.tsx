"use client";

import React, { use } from "react";
import StaticPageLayout from "@/components/StaticPageLayout";
import { useData } from "@/app/context/DataContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CustomDynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { pages } = useData();

  // Find the custom page matching the slug
  const page = pages.find((p) => p.slug === slug);

  if (!page) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-24 text-center">
        <h3 className="text-xl font-black text-slate-800">Halaman Tidak Ditemukan</h3>
        <p className="text-sm text-slate-400 mt-2">
          Mohon maaf, halaman yang Anda cari tidak tersedia.
        </p>
      </div>
    );
  }

  return (
    <StaticPageLayout
      title={page.title}
      menuGroup={page.menu_group}
      layoutType={page.layout_type as any}
      imageUrl={page.image_url}
      gridImages={page.grid_images}
    >
      <div className="space-y-6" dangerouslySetInnerHTML={{ __html: page.content }} />
    </StaticPageLayout>
  );
}
