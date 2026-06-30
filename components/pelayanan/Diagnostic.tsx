"use client";

import React from "react";
import ClinicPage from "./ClinicPage";

export default function Diagnostic() {
  return (
    <ClinicPage
      slug="klinik-diagnostic"
      defaultName="Klinik Diagnostic"
      defaultDesc="Pusat investigasi pencitraan mata mutakhir yang menyediakan jasa diagnostik penunjang seperti foto fundus, USG mata, OCT (Optical Coherence Tomography), dan perimetri lapangan pandang."
      defaultImg="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&auto=format&fit=crop&q=80"
      defaultFacilities={["Optical Coherence Tomography (OCT)", "Fundus Camera", "USG Mata A-Scan & B-Scan", "Visual Field Analyzer (Perimetry)"]}
    />
  );
}
