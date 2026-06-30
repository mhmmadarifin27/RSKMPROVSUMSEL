"use client";

import React from "react";
import ClinicPage from "./ClinicPage";

export default function Glaukoma() {
  return (
    <ClinicPage
      slug="glaukoma"
      defaultName="Glaukoma"
      defaultDesc="Skrining, manajemen, dan tindakan bedah untuk penyakit glaukoma. Pelayanan meliputi terapi obat tetes mata, laser glaukoma (SLT/YAG), hingga operasi trabekulektomi atau pemasangan implan katup."
      defaultImg="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&auto=format&fit=crop&q=80"
      defaultFacilities={["Goldmann Applanation Tonometer", "Pachymetry", "YAG/SLT Laser System", "Operating Microscope"]}
    />
  );
}
