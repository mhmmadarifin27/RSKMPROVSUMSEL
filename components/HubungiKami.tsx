"use client";

import React, { useState } from "react";
import { useData } from "@/app/context/DataContext";
import StaticPageLayout from "./StaticPageLayout";
import Swal from "sweetalert2";
import { Mail, Phone, MapPin, Send, Loader } from "lucide-react";

export default function HubungiKami() {
  const { createOrUpdateFeedbackMessage } = useData();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const feedbackData = {
        id: `fb_${Date.now()}`,
        name,
        contact,
        subject,
        message,
        created_at: new Date().toISOString(),
        status: "unread" as const,
      };

      await createOrUpdateFeedbackMessage(feedbackData);

      Swal.fire({
        title: "Pesan Terkirim!",
        text: "Terima kasih atas masukan/aduan Anda. Tim kami akan segera menindaklanjutinya.",
        icon: "success",
        confirmButtonColor: "#005B2B",
        customClass: {
          popup: "rounded-3xl font-sans",
          confirmButton: "rounded-xl text-xs font-bold px-6 py-2.5",
        },
      });

      setName("");
      setContact("");
      setSubject("");
      setMessage("");
    } catch (err) {
      Swal.fire({
        title: "Gagal Mengirim",
        text: "Terjadi kesalahan sistem. Silakan coba lagi nanti.",
        icon: "error",
        confirmButtonColor: "#005B2B",
        customClass: {
          popup: "rounded-3xl font-sans",
          confirmButton: "rounded-xl text-xs font-bold px-6 py-2.5",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StaticPageLayout
      title="Hubungi Kami"
      menuGroup="info_pengunjung"
      layoutType="standard"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
        {/* Left Column: Contact Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-black text-slate-800 border-b border-slate-100 pb-3">
              Informasi Kontak RSKM
            </h3>

            <div className="space-y-4 pt-2">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Telepon Resmi</h4>
                  <p className="text-xs font-extrabold text-slate-700 mt-1 font-mono">(0711) 5612838</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Email Korespondensi</h4>
                  <p className="text-xs font-extrabold text-slate-700 mt-1">info@rsudmata.sumselprov.go.id</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Alamat Utama</h4>
                  <p className="text-xs font-semibold text-slate-500 mt-1 leading-relaxed">
                    Jl. Kolonel H. Burlian KM. 6, Sukabangun, Kec. Sukarami, Palembang, Sumatera Selatan 30151
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Widget */}
          <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs overflow-hidden h-60 relative group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.455648833157!2d104.7283454749666!3d-2.9472304970420794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b75e6d6d45f47%3A0x633d7b4b397a6e17!2sRS+Khusus+Mata+Masyarakat+Provinsi+Sumatera+Selatan!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
            ></iframe>
            {/* Clickable Overlay Link to Google Maps */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=RS+Khusus+Mata+Masyarakat+Provinsi+Sumatera+Selatan"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10 bg-black/0 hover:bg-black/5 flex items-center justify-center transition-colors cursor-pointer"
              title="Buka Rute di Google Maps"
            >
              <span className="bg-emerald-600/90 text-white font-extrabold text-[10px] px-3.5 py-2 rounded-full uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
                Buka Rute di Google Maps
              </span>
            </a>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xs">
          <h3 className="text-base font-black text-slate-800 border-b border-slate-100 pb-3 mb-6">
            Kirim Kritik, Saran, atau Pengaduan
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full text-xs font-bold bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-slate-850 focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Contact Info */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">No. HP / Email</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 081234567890"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full text-xs font-bold bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-slate-850 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subjek / Perihal</label>
              <input
                type="text"
                required
                placeholder="Contoh: Pertanyaan Syarat Pendaftaran UGD"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={isSubmitting}
                className="w-full text-xs font-bold bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-slate-850 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Message Body */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Isi Pengaduan / Pesan</label>
              <textarea
                required
                rows={5}
                placeholder="Tuliskan detail kritik, saran, atau aduan Anda secara lengkap..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isSubmitting}
                className="w-full text-xs font-bold bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-slate-850 focus:outline-none focus:border-primary transition-colors resize-none"
              ></textarea>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-hover text-white rounded-2xl p-4 text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-md shadow-primary/10 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Mengirim...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </StaticPageLayout>
  );
}
