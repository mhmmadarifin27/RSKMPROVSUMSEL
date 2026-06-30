"use client";

import React from "react";
import ClinicPage from "./ClinicPage";

export default function Umum() {
  return (
    <ClinicPage
      slug="klinik-umum"
      defaultName="Klinik Umum"
      defaultDesc="Layanan konsultasi kesehatan mata awal, pemeriksaan ketajaman penglihatan (refraksi), penanganan keluhan mata umum (mata merah, kering, gatal), serta skrining rujukan awal ke dokter subspesialis spesifik."
      defaultImg="https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=800&auto=format&fit=crop&q=80"
      defaultFacilities={["Snellen Chart Digital", "Slit Lamp Examination", "Auto Refractometer", "Tonometer Non-kontak"]}
    />
  );
}
