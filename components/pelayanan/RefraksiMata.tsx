"use client";

import React from "react";
import ClinicPage from "./ClinicPage";

export default function RefraksiMata() {
  return (
    <ClinicPage
      slug="klinik-refraksi-mata"
      defaultName="Klinik Refraksi Mata"
      defaultDesc="Spesialisasi dalam penentuan resep kacamata dan lensa kontak yang akurat untuk mengatasi kelainan refraksi seperti rabun jauh (miopia), rabun dekat (hipermetropia), silinder (astigmatisme), dan mata tua (presbiopia)."
      defaultImg="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80"
      defaultFacilities={["Phoropter Manual & Otomatis", "Lensmeter Digital", "Fitting Lensa Kontak", "Trial Lens Set"]}
    />
  );
}
