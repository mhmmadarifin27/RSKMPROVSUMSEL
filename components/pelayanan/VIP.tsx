"use client";

import React from "react";
import ClinicPage from "./ClinicPage";

export default function VIP() {
  return (
    <ClinicPage
      slug="layanan-vip"
      defaultName="Layanan VIP"
      defaultDesc="Pelayanan kesehatan mata premium dengan fasilitas jalur prioritas satu atap (one-stop service). Bebas antrean umum, konsultasi di ruang tunggu privat mewah, dan penanganan eksklusif."
      defaultImg="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80"
      defaultFacilities={["Lounge VIP Ber-AC", "One-Stop Registration", "Subspesialis Senior Konsultan"]}
    />
  );
}
