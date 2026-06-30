"use client";

import React from "react";
import ClinicPage from "./ClinicPage";

export default function Retina() {
  return (
    <ClinicPage
      slug="klinik-retina"
      defaultName="Klinik Retina"
      defaultDesc="Penanganan penyakit segmen posterior mata, meliputi ablasi retina, retinopati diabetik akibat kencing manis, perdarahan vitreous, degenerasi makula terkait usia (AMD), serta suntikan intravitreal obat anti-VEGF."
      defaultImg="https://images.unsplash.com/photo-1579156492880-050104b3951d?w=800&auto=format&fit=crop&q=80"
      defaultFacilities={["Laser Fotokoagulasi Retina", "Indirect Ophthalmoscope", "Vitrectomy Machine", "Intravitreal Injection Suite"]}
    />
  );
}
