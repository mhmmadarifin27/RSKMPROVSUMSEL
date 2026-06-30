"use client";

import React from "react";
import ClinicPage from "./ClinicPage";

export default function RekonstruksiOkuloplastiOnkologi() {
  return (
    <ClinicPage
      slug="rekonstruksi-okuloplasti-dan-onkologi"
      defaultName="Rekonstruksi Okuloplasti dan Onkologi"
      defaultDesc="Bedah plastik rekonstruksi kelopak mata, saluran air mata yang tersumbat, penanganan tumor di sekitar bola mata, serta pembuatan dan pemasangan prostesis mata (mata palsu) estetis."
      defaultImg="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&auto=format&fit=crop&q=80"
      defaultFacilities={["Kelengkapan Bedah Mikro", "Endoskopi Saluran Air Mata (DCR)", "Prostesis Custom"]}
    />
  );
}
