"use client";

import React from "react";
import StaticPageLayout from "../StaticPageLayout";

export default function JadwalBesuk() {
  return (
    <StaticPageLayout
      title="Jadwal Besuk"
      menuGroup="info_pengunjung"
      layoutType="standard"
      imageUrl="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80"
    >
      <div className="space-y-6">
        <p className="text-sm leading-relaxed text-slate-500 font-medium">
          Untuk mendukung kenyamanan pasien selama masa pemulihan tanpa mengesampingkan keamanan dan sterilitas area perawatan, kami menerapkan ketentuan waktu berkunjung sebagai berikut:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-6 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
            <h4 className="text-sm font-black text-primary mb-3">Waktu Kunjungan (Besuk)</h4>
            <table className="w-full text-xs text-slate-600 font-medium">
              <tbody>
                <tr className="border-b border-emerald-100/50">
                  <td className="py-2.5 font-bold text-slate-700">Sesi Siang</td>
                  <td className="py-2.5 text-right font-mono font-bold text-primary">11:00 - 13:00 WIB</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-slate-700">Sesi Sore</td>
                  <td className="py-2.5 text-right font-mono font-bold text-primary">17:00 - 19:00 WIB</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
            <h4 className="text-sm font-black text-slate-800 mb-3">Ketentuan Pengunjung</h4>
            <ul className="space-y-2 text-xs text-slate-500 list-decimal pl-4 font-semibold">
              <li>Pengunjung maksimal 2 orang secara bergantian masuk kamar.</li>
              <li>Anak di bawah usia 12 tahun tidak diperkenankan masuk demi faktor kesehatan anak.</li>
              <li>Wajib mencuci tangan sebelum dan sesudah masuk ruangan rawat inap.</li>
              <li>Menjaga ketenangan dan kebersihan lingkungan ruang perawatan.</li>
            </ul>
          </div>
        </div>
      </div>
    </StaticPageLayout>
  );
}
