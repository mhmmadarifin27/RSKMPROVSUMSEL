"use client";

import React from "react";
import ClinicPage from "./ClinicPage";

export default function PDL() {
  return (
    <ClinicPage
      slug="klinik-pdl"
      defaultName="Klinik PDL"
      defaultDesc="Klinik Penyakit Dalam dan Laboratorium yang menunjang kesiapan fisik pasien sebelum menjalani prosedur operasi mata major guna meminimalisir risiko komplikasi sistemik."
      defaultImg="https://images.unsplash.com/photo-1581594549595-35e6ed37b77a?w=800&auto=format&fit=crop&q=80"
      defaultFacilities={["Elektrokardiogram (EKG)", "Pemeriksaan Gula Darah Cepat", "Laboratorium Darah Lengkap"]}
    />
  );
}
