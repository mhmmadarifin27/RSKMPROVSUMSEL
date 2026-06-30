"use client";

import React from "react";
import ClinicPage from "./ClinicPage";

export default function PediatrikOftamologi() {
  return (
    <ClinicPage
      slug="ruang-pediatrik-oftamologi"
      defaultName="Ruang Pediatrik Oftamologi"
      defaultDesc="Layanan kesehatan mata khusus bayi, balita, dan anak-anak. Fokus pada penanganan kelainan bawaan lahir, juling (strabismus), mata malas (amblyopia), serta skrining retinopati pada bayi prematur (ROP)."
      defaultImg="https://images.unsplash.com/photo-1502740479091-6398407d3288?w=800&auto=format&fit=crop&q=80"
      defaultFacilities={["Children-Friendly Examination Room", "Lea Symbols Charts", "Retinoskopi Streak", "Synoptophore"]}
    />
  );
}
