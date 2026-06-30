"use client";

import React from "react";
import ClinicPage from "./ClinicPage";

export default function KorneaBedahRefraktif() {
  return (
    <ClinicPage
      slug="kornea-dan-bedah-refraktif"
      defaultName="Kornea dan Bedah Refraktif"
      defaultDesc="Fokus pada diagnosis dan tindakan bedah untuk penyakit kornea serta bedah refraktif mutakhir (operasi LASIK/Phakic IOL) untuk melepaskan ketergantungan kacamata."
      defaultImg="https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&auto=format&fit=crop&q=80"
      defaultFacilities={["Topografi Kornea (Pentacam)", "Spekular Mikroskop", "Pachymetry Kornea"]}
    />
  );
}
