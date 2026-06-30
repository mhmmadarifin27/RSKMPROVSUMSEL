"use client";

import React from "react";
import StaticPageLayout from "../StaticPageLayout";

export default function PelayananPublik() {
  return (
    <StaticPageLayout
      title="Pelayanan Publik"
      menuGroup="info_pengunjung"
      layoutType="standard"
      imageUrl="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&auto=format&fit=crop&q=80"
    >
      <div className="space-y-4">
        <p className="text-sm text-slate-500 font-medium">
          Kami senantiasa patuh pada Undang-Undang Pelayanan Publik untuk mewujudkan pelayanan kesehatan mata yang bersih, berintegritas, bebas dari pungutan liar, serta responsif terhadap kritik dan aduan masyarakat melalui SP4N-LAPOR!.
        </p>
      </div>
    </StaticPageLayout>
  );
}
