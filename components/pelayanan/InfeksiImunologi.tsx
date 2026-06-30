"use client";

import React from "react";
import ClinicPage from "./ClinicPage";

export default function InfeksiImunologi() {
  return (
    <ClinicPage
      slug="klinik-infeksi-dan-imunology"
      defaultName="Klinik Infeksi dan Imunology"
      defaultDesc="Spesialis dalam penanganan kasus uveitis, skleritis, peradangan bola mata non-infeksi akibat penyakit autoimun, serta infeksi mata parah/langka yang membutuhkan penanganan imunosupresan."
      defaultImg="https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?w=800&auto=format&fit=crop&q=80"
      defaultFacilities={["Pemeriksaan Slit Lamp", "Uji Laboratorium Imunologi", "Terapi Imunosupresif"]}
    />
  );
}
