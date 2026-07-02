"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useData } from "@/app/context/DataContext";
import {
  Search,
  Clock,
  ArrowRight,
  ShieldCheck,
  Microscope,
  TrendingUp,
  User,
  X,
  Camera,
  ChevronLeft,
  ChevronRight,
  Bed,
  Phone,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const servicesData = [
  {
    number: "01",
    category: "Poliklinik Utama",
    title: "Katarak & Bedah Refraktif",
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80",
    content: (
      <div className="space-y-4">
        <p className="font-bold text-slate-800 text-lg">Poliklinik Katarak & Bedah Refraktif</p>
        <p>
          RS Khusus Mata Provinsi Sumatera Selatan didukung oleh teknologi operasi katarak termodern Phacoemulsification. Prosedur minimal invasif ini memungkinkan pengangkatan katarak tanpa jahitan, tanpa rasa sakit, dan pemulihan penglihatan berjalan dengan sangat cepat.
        </p>
        <p>
          Layanan ini ditujukan bagi pasien mandiri maupun jaminan BPJS Kesehatan secara penuh dengan komitmen mutu keselamatan pasien terbaik.
        </p>
      </div>
    )
  },
  {
    number: "02",
    category: "Retina",
    title: "Poliklinik Vitreoretina",
    src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=80",
    content: (
      <div className="space-y-4">
        <p className="font-bold text-slate-800 text-lg">Pusat Diagnosis & Terapi Retinopati</p>
        <p>
          Layanan Poliklinik Vitreoretina menangani berbagai kelainan pada segmen posterior bola mata, termasuk ablasi retina, retinopati diabetik, perdarahan vitreous, dan degenerasi makula terkait usia (AMD).
        </p>
        <p>
          Dilengkapi dengan teknologi Laser Retina, Optical Coherence Tomography (OCT), dan USG Mata resolusi tinggi untuk memantau kondisi makula dan saraf mata pasien secara detail.
        </p>
      </div>
    )
  },
  {
    number: "03",
    category: "Glaukoma",
    title: "Poliklinik Glaukoma",
    src: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&auto=format&fit=crop&q=80",
    content: (
      <div className="space-y-4">
        <p className="font-bold text-slate-800 text-lg">Pencegahan Kerusakan Saraf Mata Akibat Glaukoma</p>
        <p>
          Glaukoma merupakan penyebab kebutaan permanen kedua terbesar. Layanan kami menyediakan pemeriksaan tekanan intraokular (Tonometer), pemeriksaan lapang pandang (Perimetri Humphrey), dan terapi laser/bedah filtrasi (trabekulektomi) untuk menjaga sisa penglihatan Anda.
        </p>
      </div>
    )
  },
  {
    number: "04",
    category: "Pediatri",
    title: "Mata Anak & Strabismus",
    src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80",
    content: (
      <div className="space-y-4">
        <p className="font-bold text-slate-800 text-lg">Pelayanan Kesehatan Mata Anak & Koreksi Juling</p>
        <p>
          Kesehatan mata anak membutuhkan pendekatan khusus dan ramah anak. Kami mendiagnosis gangguan refraksi (mata minus/plus/silinder) pada anak, mata malas (ambliopia), serta tindakan bedah rekonstruktif untuk koreksi juling (strabismus).
        </p>
      </div>
    )
  },
  {
    number: "05",
    category: "Emergency",
    title: "UGD Mata 24 Jam",
    src: "https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=800&auto=format&fit=crop&q=80",
    content: (
      <div className="space-y-4">
        <p className="font-bold text-slate-800 text-lg">Unit Gawat Darurat Khusus Cedera & Infeksi Mata</p>
        <p>
          UGD Mata kami siap melayani 24 jam penuh untuk penanganan trauma/kecelakaan mata, kemasukan benda asing (corpus alienum), luka bakar kimia pada mata, infeksi akut, atau penurunan penglihatan mendadak.
        </p>
        <p>
          Didukung oleh tim perawat terlatih dan dokter spesialis mata on-call yang siap melakukan tindakan penyelamatan darurat.
        </p>
      </div>
    )
  },
  {
    number: "06",
    category: "Rawat Inap",
    title: "Pelayanan Rawat Inap",
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80",
    content: (
      <div className="space-y-4">
        <p className="font-bold text-slate-800 text-lg">Kenyamanan Perawatan & Monitoring Bed Real-time</p>
        <p>
          Bagi pasien pasca-operasi besar maupun perawatan medis intensif, kami menyediakan fasilitas kamar rawat inap yang tenang, bersih, dan berstandar pelayanan KARS paripurna.
        </p>
        <p>
          Kapasitas ketersediaan bed juga terintegrasi secara real-time melalui dashboard informasi Satu Data Diskominfo Sumsel.
        </p>
      </div>
    )
  }
];

const faqData = [
  {
    q: "Apakah RSKM Provinsi Sumsel melayani pasien BPJS?",
    a: "Ya, kami melayani pasien jaminan BPJS Kesehatan secara penuh. Pastikan Anda membawa rujukan asli dari Fasilitas Kesehatan Tingkat Pertama (FKTP / Puskesmas / Klinik) serta Surat Kontrol Ulang (SKDP) jika sebelumnya sudah pernah kontrol."
  },
  {
    q: "Bagaimana alur pendaftaran konsultasi online?",
    a: "Pendaftaran konsultasi online dapat dilakukan secara praktis melalui aplikasi Mobile JKN (pilih faskes rujukan RSKM) atau melalui loket mandiri digital saat tiba di meja informasi utama rumah sakit."
  },
  {
    q: "Apa saja jam besuk pasien rawat Inap?",
    a: "Jam besuk pasien terbagi menjadi dua sesi: Sesi Siang (11:00 - 13:00 WIB) dan Sesi Sore (17:00 - 19:00 WIB). Pengunjung dibatasi maksimal 2 orang bergantian demi kenyamanan pemulihan pasien."
  },
  {
    q: "Apakah UGD 24 Jam melayani kasus kecelakaan mata?",
    a: "Ya, layanan Unit Gawat Darurat (UGD) kami siaga 24 jam dengan dokter spesialis mata on-call dan peralatan mikrooperasi darurat untuk menangani trauma/cedera mata, infeksi akut, atau penurunan penglihatan mendadak."
  },
  {
    q: "Bagaimana cara memeriksa ketersediaan tempat tidur kosong?",
    a: "Anda dapat melihat ketersediaan bed secara real-time pada menu Info Pengunjung -> Tempat Tidur di website ini, yang terintegrasi langsung dengan database Satu Data Diskominfo."
  }
];

export default function Beranda() {
  const { doctors, clinics, posts, heroSlides, isLoading } = useData();

  // Hero Carousel State
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Search Widget State
  const [selectedClinic, setSelectedClinic] = useState("all");
  const [searchResults, setSearchResults] = useState<typeof doctors | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Modal States
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);

  // Kegiatan Photo Carousel State
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isKegiatanHovered, setIsKegiatanHovered] = useState(false);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Video Modal State
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Service Card Modal State
  const [selectedService, setSelectedService] = useState<any | null>(null);

  // Marquee Refs and Hover States
  const clinicsMarqueeRef = useRef<HTMLDivElement>(null);
  const [isClinicsHovered, setIsClinicsHovered] = useState(false);

  const doctorMarqueeRef = useRef<HTMLDivElement>(null);
  const [isDoctorHovered, setIsDoctorHovered] = useState(false);



  // Filter posts by category
  const articlePosts = posts.filter((p) => p.category === "artikel" || p.category === "berita");
  const kegiatanPosts = posts.filter((p) => p.category === "kegiatan").slice(0, 8);
  const defaultKegiatan = [
    {
      id: "k1",
      title: "Duplikat Sepeda Listrik",
      image_url: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=600&auto=format&fit=crop&q=80",
      badge: "SENTUHAN AHLI",
      content: "Dokumentasi tim medis BKMM dalam melakukan skrining visus dan refraksi mata bagi warga prasejahtera."
    },
    {
      id: "k2",
      title: "Sentuhan Ahli",
      image_url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&auto=format&fit=crop&q=80",
      badge: "BAKTI SOSIAL",
      content: "Penyuluhan berkala mengenai pentingnya menjaga higienitas dan bahaya infeksi mata di tingkat sekolah dasar."
    },
    {
      id: "k3",
      title: "Logika Tanpa Beban",
      image_url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80",
      badge: "EDUKASI",
      content: "Latihan rutin kesiapsiagaan tanggap darurat bencana kebakaran dan mitigasi resiko UGD rumah sakit."
    }
  ];
  const displayedKegiatan = kegiatanPosts.length > 0 ? kegiatanPosts : defaultKegiatan;

  // 1. Hero Carousel Auto-Slide Effect (Slide to the right)
  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides]);

  const handlePrevSlide = () => {
    if (heroSlides.length === 0) return;
    setActiveSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    if (heroSlides.length === 0) return;
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  // 2. Clinics Marquee Auto-Scroll Effect
  useEffect(() => {
    const marquee = clinicsMarqueeRef.current;
    if (!marquee || isClinicsHovered) return;

    let animationFrameId: number;
    
    const scroll = () => {
      if (marquee.scrollWidth <= marquee.clientWidth) return;
      marquee.scrollLeft += 1;
      if (marquee.scrollLeft >= marquee.scrollWidth - marquee.clientWidth - 2) {
        marquee.scrollLeft = 0;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isClinicsHovered, clinics]);

  // 3. Doctors Marquee Auto-Scroll Effect
  useEffect(() => {
    const marquee = doctorMarqueeRef.current;
    if (!marquee || isDoctorHovered) return;

    let animationFrameId: number;
    
    const scroll = () => {
      if (marquee.scrollWidth <= marquee.clientWidth) return;
      marquee.scrollLeft += 0.8; // slightly slower scroll for text readability
      if (marquee.scrollLeft >= marquee.scrollWidth - marquee.clientWidth - 2) {
        marquee.scrollLeft = 0;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDoctorHovered, doctors, searchResults]);

  // Centering Photo Carousel dynamically
  useEffect(() => {
    if (displayedKegiatan.length > 0) {
      setActivePhotoIdx(Math.floor(displayedKegiatan.length / 2));
    }
  }, [displayedKegiatan.length]);

  // Auto-scroll effect for kegiatan posts horizontal gallery
  useEffect(() => {
    if (displayedKegiatan.length === 0 || isKegiatanHovered) return;
    const interval = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % displayedKegiatan.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [displayedKegiatan.length, isKegiatanHovered]);



  // Search Handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    let filtered = [...doctors];
    
    if (selectedClinic !== "all") {
      filtered = filtered.filter((d) => d.clinic_slug === selectedClinic);
    }

    setSearchResults(filtered);
    setHasSearched(true);

    // Scroll smoothly to doctor section to see results
    const docSection = document.getElementById("tim-medis");
    if (docSection) {
      docSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Reset Search
  const handleResetSearch = () => {
    setSelectedClinic("all");
    setSearchResults(null);
    setHasSearched(false);
  };

  const displayedDoctors = searchResults !== null ? searchResults : doctors;

  const safePhotoIdx = displayedKegiatan.length > 0
    ? ((activePhotoIdx % displayedKegiatan.length) + displayedKegiatan.length) % displayedKegiatan.length
    : 0;

  return (
    <div className="w-full flex flex-col">
      
      {/* 1. DYNAMIC FULL-WIDTH HERO CAROUSEL */}
      <section className="relative w-full h-[450px] md:h-[550px] bg-slate-950 overflow-hidden select-none">
        {heroSlides.length > 0 ? (
          <div 
            className="flex h-full transition-transform duration-750 ease-out"
            style={{ 
              width: `${heroSlides.length * 100}%`,
              transform: `translateX(-${(activeSlide * 100) / heroSlides.length}%)` 
            }}
          >
            {heroSlides.map((slide, idx) => (
              <div 
                key={slide.id} 
                className="w-full h-full relative flex items-center shrink-0"
                style={{ width: `${100 / heroSlides.length}%` }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={slide.image_url}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center"
                    loading={idx === 0 ? "eager" : "lazy"}
                    {...(idx === 0 ? { fetchPriority: "high" } : {})}
                  />
                  {/* Premium overlay to enhance text readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent"></div>
                </div>

                {/* Slide Content */}
                <div className="max-w-7xl mx-auto w-full px-4 md:px-8 relative z-10 text-white space-y-5">

                  <h2 className="text-3xl md:text-5xl lg:text-6.5xl font-black tracking-tight text-white leading-tight max-w-2xl drop-shadow-md">
                    {slide.title}
                  </h2>

                  <p className="text-sm md:text-base text-slate-350 max-w-xl leading-relaxed font-medium drop-shadow-xs">
                    {slide.subtitle}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Link
                      href="#tim-medis"
                      className="bg-primary hover:bg-emerald-700 text-white px-8 py-3.5 rounded-2xl text-xs font-black tracking-wider uppercase transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 flex items-center gap-2 max-w-max"
                    >
                      <span>Lihat Jadwal Dokter</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </Link>

                    <button
                      onClick={() => setIsVideoOpen(true)}
                      className="bg-white hover:bg-slate-100 text-primary border border-slate-200/60 px-8 py-3.5 rounded-2xl text-xs font-black tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center gap-2 max-w-max cursor-pointer"
                    >
                      <span>Video Profil RS</span>
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-400">
            Memuat Hero...
          </div>
        )}

        {/* Carousel Controls */}
        {heroSlides.length > 1 && (
          <>
            {/* Left Button */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/10 cursor-pointer z-20"
              title="Slide Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {/* Right Button */}
            <button
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/10 cursor-pointer z-20"
              title="Slide Selanjutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    activeSlide === idx ? "w-8 bg-accent" : "w-2.5 bg-white/40 hover:bg-white/60"
                  }`}
                  title={`Ke slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* 2. INTEGRATED SEARCH WIDGET (FLOATING OVER CAROUSEL) */}
      <section id="cari-jadwal" className="w-full max-w-7xl mx-auto px-4 md:px-8 -mt-8 relative z-30">
        <form
          onSubmit={handleSearch}
          className="w-full bg-white text-slate-800 rounded-3xl p-6 md:p-8 shadow-xl border border-emerald-500/10 shadow-emerald-950/5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
        >
          {/* Title Area */}
          <div className="md:col-span-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black tracking-wide uppercase text-emerald-600">Cari Dokter</h3>
              <p className="text-xs text-slate-500 font-medium">Temukan spesialis & poliklinik</p>
            </div>
          </div>

          {/* Filter: Clinic */}
          <div className="md:col-span-7 flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Poliklinik Layanan</label>
            <select
              value={selectedClinic}
              onChange={(e) => setSelectedClinic(e.target.value)}
              className="w-full bg-slate-50 text-slate-800 text-xs font-bold border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
            >
              <option value="all">Semua Poliklinik Mata</option>
              {clinics.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="md:col-span-2 flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-3.5 px-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              <span>Cari</span>
            </button>
            
            {hasSearched && (
              <button
                type="button"
                onClick={handleResetSearch}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-3.5 px-4 rounded-xl border border-slate-200 transition-all cursor-pointer"
                title="Reset Pencarian"
              >
                Reset
              </button>
            )}
          </div>
        </form>
      </section>

      {/* 3. TENTANG KAMI SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Video Profile Embed */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-xl border border-slate-150">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/231xK3rXG9E"
            title="Video Profil RSKM"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        {/* Right: Text Contents */}
        <div className="space-y-5">
          <div className="text-xs font-black text-primary tracking-widest uppercase">TENTANG KAMI</div>
          <h3 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight">
            Pusat Rujukan Kesehatan Mata <br />
            Sumatera Selatan
          </h3>
          
          <p className="text-sm text-slate-500 leading-relaxed font-medium">
            RSKM Provinsi Sumatera Selatan adalah rumah sakit khusus mata tipe B yang menjadi rujukan tertinggi untuk wilayah Sumatera Selatan. Kami berkomitmen memberikan pelayanan kesehatan mata paripurna dengan didukung oleh dokter spesialis dan subspesialis mata yang kompeten di bidangnya.
          </p>
          
          <p className="text-sm text-slate-500 leading-relaxed font-medium">
            Dengan fasilitas modern dan teknologi terkini, kami memastikan setiap pasien mendapatkan diagnosis yang akurat dan penanganan yang optimal untuk berbagai gangguan penglihatan.
          </p>

          <div className="pt-2">
            <Link
              href="/tentang-kami"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              <span>Profil Lengkap RSKM</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. VALUE PROPOSITION SECTION ("MUTU & LAYANAN" - GRID SERVICES CUSTOM LAYOUT) */}
      <section className="w-full py-20 border-t border-slate-100 bg-[#fafafa] font-sans">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-slate-200/80 rounded-3xl overflow-hidden shadow-xl bg-white">
            {/* 1. Header Card (Spans Col 1-2) */}
            <div className="md:col-span-2 p-8 md:p-12 flex items-center justify-between border-b md:border-r border-slate-150">
              <div className="space-y-4 max-w-md">
                <span className="text-xs font-black text-primary tracking-widest uppercase">MUTU & LAYANAN</span>
                <h3 className="text-2xl md:text-3.5xl font-black text-slate-800 tracking-tight leading-tight">
                  Perawatan Mata Modern. <br />
                  <span className="text-slate-400">Keunggulan Klinis Terintegrasi.</span>
                </h3>
                <p className="text-xs md:text-sm text-slate-500 font-semibold leading-relaxed">
                  Kami berkomitmen memberikan pelayanan kesehatan mata paripurna berstandar nasional dan internasional demi memulihkan penglihatan Anda.
                </p>
              </div>
              {/* Decorative Dots Grid (Matches Example image) */}
              <div className="hidden lg:flex flex-col gap-2 opacity-35 mr-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex gap-2">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="w-1.5 h-1.5 rounded-full bg-primary" />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Service Card 01 */}
            <div className="md:col-span-1 h-[240px] md:h-auto border-b md:border-r border-slate-150 relative overflow-hidden group">
              <div
                onClick={() => setSelectedService(servicesData[0])}
                className="relative w-full h-full cursor-pointer overflow-hidden flex flex-col justify-end p-8"
              >
                <img
                  src={servicesData[0].src}
                  alt={servicesData[0].title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/60 group-hover:bg-slate-950/50 transition-colors duration-300" />
                <div className="relative z-10 text-white space-y-2">
                  <span className="block text-[10px] font-black text-white/70 tracking-widest uppercase">
                    {servicesData[0].number}
                  </span>
                  <h4 className="text-base font-black leading-tight text-white drop-shadow-sm group-hover:underline">
                    {servicesData[0].title}
                  </h4>
                </div>
              </div>
            </div>

            {/* 3. Service Card 02 */}
            <div className="md:col-span-1 h-[240px] md:h-auto border-b border-slate-150 relative overflow-hidden group">
              <div
                onClick={() => setSelectedService(servicesData[1])}
                className="relative w-full h-full cursor-pointer overflow-hidden flex flex-col justify-end p-8"
              >
                <img
                  src={servicesData[1].src}
                  alt={servicesData[1].title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/60 group-hover:bg-slate-950/50 transition-colors duration-300" />
                <div className="relative z-10 text-white space-y-2">
                  <span className="block text-[10px] font-black text-white/70 tracking-widest uppercase">
                    {servicesData[1].number}
                  </span>
                  <h4 className="text-base font-black leading-tight text-white drop-shadow-sm group-hover:underline">
                    {servicesData[1].title}
                  </h4>
                </div>
              </div>
            </div>

            {/* 4. Service Card 03 */}
            <div className="md:col-span-1 h-[240px] border-b md:border-r border-slate-150 relative overflow-hidden group">
              <div
                onClick={() => setSelectedService(servicesData[2])}
                className="relative w-full h-full cursor-pointer overflow-hidden flex flex-col justify-end p-8"
              >
                <img
                  src={servicesData[2].src}
                  alt={servicesData[2].title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/60 group-hover:bg-slate-950/50 transition-colors duration-300" />
                <div className="relative z-10 text-white space-y-2">
                  <span className="block text-[10px] font-black text-white/70 tracking-widest uppercase">
                    {servicesData[2].number}
                  </span>
                  <h4 className="text-base font-black leading-tight text-white drop-shadow-sm group-hover:underline">
                    {servicesData[2].title}
                  </h4>
                </div>
              </div>
            </div>

            {/* 5. Service Card 04 */}
            <div className="md:col-span-1 h-[240px] border-b md:border-r border-slate-150 relative overflow-hidden group">
              <div
                onClick={() => setSelectedService(servicesData[3])}
                className="relative w-full h-full cursor-pointer overflow-hidden flex flex-col justify-end p-8"
              >
                <img
                  src={servicesData[3].src}
                  alt={servicesData[3].title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/60 group-hover:bg-slate-950/50 transition-colors duration-300" />
                <div className="relative z-10 text-white space-y-2">
                  <span className="block text-[10px] font-black text-white/70 tracking-widest uppercase">
                    {servicesData[3].number}
                  </span>
                  <h4 className="text-base font-black leading-tight text-white drop-shadow-sm group-hover:underline">
                    {servicesData[3].title}
                  </h4>
                </div>
              </div>
            </div>

            {/* 6. Service Card 05 */}
            <div className="md:col-span-1 h-[240px] border-b md:border-r border-slate-150 relative overflow-hidden group">
              <div
                onClick={() => setSelectedService(servicesData[4])}
                className="relative w-full h-full cursor-pointer overflow-hidden flex flex-col justify-end p-8"
              >
                <img
                  src={servicesData[4].src}
                  alt={servicesData[4].title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/60 group-hover:bg-slate-950/50 transition-colors duration-300" />
                <div className="relative z-10 text-white space-y-2">
                  <span className="block text-[10px] font-black text-white/70 tracking-widest uppercase">
                    {servicesData[4].number}
                  </span>
                  <h4 className="text-base font-black leading-tight text-white drop-shadow-sm group-hover:underline">
                    {servicesData[4].title}
                  </h4>
                </div>
              </div>
            </div>

            {/* 7. Service Card 06 */}
            <div className="md:col-span-1 h-[240px] border-b border-slate-150 relative overflow-hidden group">
              <div
                onClick={() => setSelectedService(servicesData[5])}
                className="relative w-full h-full cursor-pointer overflow-hidden flex flex-col justify-end p-8"
              >
                <img
                  src={servicesData[5].src}
                  alt={servicesData[5].title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/60 group-hover:bg-slate-950/50 transition-colors duration-300" />
                <div className="relative z-10 text-white space-y-2">
                  <span className="block text-[10px] font-black text-white/70 tracking-widest uppercase">
                    {servicesData[5].number}
                  </span>
                  <h4 className="text-base font-black leading-tight text-white drop-shadow-sm group-hover:underline">
                    {servicesData[5].title}
                  </h4>
                </div>
              </div>
            </div>

            {/* 8. Phone Contact Banner (Row 3, Col 1-2 - Curved bottom-right banner matching image) */}
            <div className="md:col-span-2 bg-[#72abd4] text-white p-8 md:p-10 flex flex-col justify-center rounded-br-[100px] gap-1 shadow-inner md:border-r border-slate-150">
              <div className="flex items-center gap-2.5 text-white/95">
                <Phone className="w-4 h-4 fill-white text-[#72abd4]" />
                <span className="text-[10px] font-black tracking-widest uppercase">HUBUNGI KONTAK</span>
              </div>
              <p className="text-xl md:text-2xl font-black font-mono tracking-wide text-white mt-1">
                (0711) 5612838
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. TIM MEDIS AHLI KAMI SECTION (WITH AUTO-SCROLL CAROUSEL) */}
      <section id="tim-medis" className="w-full bg-slate-50 border-y border-slate-100 py-20 transition-colors overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
          {/* Header Row */}
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div className="space-y-2">
              <div className="text-xs font-black text-primary tracking-widest uppercase">TIM MEDIS AHLI KAMI</div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                Dokter Spesialis & Subspesialis Mata Terbaik
              </h3>
              <p className="text-xs text-slate-400 font-semibold">
                Tim dokter ahli yang berdedikasi menjaga dan memulihkan penglihatan Anda. Geser secara horizontal untuk melihat semua dokter.
              </p>
            </div>
            
            {hasSearched && (
              <button
                onClick={handleResetSearch}
                className="px-5 py-2.5 rounded-full bg-primary text-white text-xs font-bold transition-all shadow-md cursor-pointer hover:bg-primary-hover"
              >
                Tampilkan Semua Dokter ({doctors.length})
              </button>
            )}
          </div>

          {/* Search Result Banner */}
          {hasSearched && (
            <div className="mt-6 bg-emerald-50 text-emerald-800 px-5 py-3.5 rounded-2xl text-xs font-bold border border-emerald-100 flex items-center justify-between animate-fade-in">
              <span>
                Ditemukan {displayedDoctors.length} Dokter sesuai dengan kriteria pencarian Anda.
              </span>
              <button onClick={handleResetSearch} className="underline hover:text-emerald-900 font-extrabold cursor-pointer">
                Clear Filter
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          /* Loading Skeleton Marquee */
          <div className="w-full overflow-x-auto scrollbar-none flex gap-6 py-4 px-8 select-none animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs flex flex-col justify-between w-72 h-[380px] shrink-0"
              >
                <div className="p-4 space-y-4">
                  <div className="w-full h-48 rounded-2xl bg-slate-200" />
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse" />
                    <div className="h-3 bg-slate-200 rounded w-1/2 animate-pulse" />
                  </div>
                </div>
                <div className="p-4 pt-0 border-t border-slate-50 mt-2">
                  <div className="h-10 bg-slate-100 rounded w-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : displayedDoctors.length === 0 ? (
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="w-full bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-xs">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 flex items-center justify-center rounded-full mx-auto mb-4">
                <User className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-700 mb-1">Dokter Tidak Ditemukan</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
                Maaf, tidak ada dokter spesialis yang bertugas untuk filter poliklinik atau kata kunci pencarian yang Anda masukkan.
              </p>
              <button
                onClick={handleResetSearch}
                className="bg-primary text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                Reset Pencarian
              </button>
            </div>
          </div>
        ) : (
          /* Doctor Cards Marquee Carousel */
          <div 
            ref={doctorMarqueeRef}
            onMouseEnter={() => setIsDoctorHovered(true)}
            onMouseLeave={() => setIsDoctorHovered(false)}
            className="w-full overflow-x-auto scrollbar-none flex gap-6 py-4 px-8 select-none cursor-grab active:cursor-grabbing"
            style={{ scrollBehavior: "auto" }}
          >
            {displayedDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs flex flex-col justify-between hover-lift group w-72 h-[380px] shrink-0"
              >
                <div className="p-4 space-y-4">
                  {/* Doctor Image */}
                  <div className="w-full h-48 rounded-2xl bg-slate-50 overflow-hidden border border-slate-150 relative">
                    <img
                      src={doctor.image_url}
                      alt={doctor.name}
                      className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-300 pointer-events-none"
                    />
                    {doctor.clinic_slug === "layanan-vip" && (
                      <span className="absolute top-2.5 right-2.5 bg-yellow-400 text-black text-[9px] font-black px-2 py-0.5 rounded-md shadow-sm">
                        VIP
                      </span>
                    )}
                  </div>

                  {/* Doctor Details */}
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-black text-slate-800 tracking-tight group-hover:text-primary transition-colors leading-tight line-clamp-1">
                      {doctor.name}
                    </h4>
                    <span className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-100/60 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold">
                      {doctor.specialization}
                    </span>
                  </div>
                </div>

                {/* Doctor Actions */}
                <div className="p-4 pt-0 border-t border-slate-50 mt-2">
                  <button
                    onClick={() => setSelectedDoctor(doctor)}
                    className="w-full bg-primary hover:bg-primary-hover text-white py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Lihat Jadwal</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5.5. RAWAT INAP VARIATION SECTION */}
      <section className="w-full bg-slate-50 border-b border-slate-100 py-20 transition-colors relative overflow-hidden">
        {/* Faded green diagonal triangle background */}
        <div className="absolute inset-0 bg-emerald-100/50 [clip-path:polygon(100%_35%,_100%_100%,_0_100%)] z-0 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Column: Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black text-emerald-600 tracking-widest uppercase block">FASILITAS & KENYAMANAN RAWAT INAP</span>
              <h3 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight">
                Kamar Perawatan Pasca-Operasi yang Tenang dan Higienis
              </h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                RSKM menyediakan fasilitas rawat inap pasca-tindakan bedah mata dengan pemantauan medis berkala oleh perawat spesialis mata dan lingkungan yang tenang untuk kenyamanan pemulihan Anda.
              </p>
            </div>

            {/* List items style like the 3rd image */}
            <div className="space-y-4 border-t border-slate-200/60 pt-6">
              {/* Item 1 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border border-slate-200/80 rounded-2xl gap-4 hover:shadow-xs transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-650 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Bed className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-800">Kamar VIP & Kelas Utama</h4>
                    <p className="text-[11px] text-slate-450 font-bold leading-normal mt-0.5">
                      Fasilitas privat AC, TV, kamar mandi dalam, sofa penunggu, dan tombol panggilan darurat 24 jam.
                    </p>
                  </div>
                </div>
                <Link
                  href="/rawat-inap"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-[11px] font-black px-4 py-2.5 rounded-xl transition-colors shrink-0 text-center inline-block cursor-pointer self-start sm:self-center"
                >
                  Selengkapnya
                </Link>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border border-slate-200/80 rounded-2xl gap-4 hover:shadow-xs transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-650 flex items-center justify-center shrink-0 border border-emerald-100">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-800">Kelas I, II, & III (BPJS)</h4>
                    <p className="text-[11px] text-slate-450 font-bold leading-normal mt-0.5">
                      Kamar perawatan yang bersih, sejuk, higienis, dan dijamin penuh oleh BPJS Kesehatan tanpa biaya tambahan.
                    </p>
                  </div>
                </div>
                <Link
                  href="/rawat-inap"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-[11px] font-black px-4 py-2.5 rounded-xl transition-colors shrink-0 text-center inline-block cursor-pointer self-start sm:self-center"
                >
                  Selengkapnya
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative w-full h-[320px] md:h-[420px] rounded-none overflow-hidden shadow-lg border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80"
              alt="Rawat Inap RSKM"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/20 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* 6. LAYANAN INFINITE AUTO-SCROLL MARQUEE (11 CLINICS) */}
      <section id="layanan-unggulan" className="w-full bg-gradient-to-b from-slate-50 to-white border-y border-slate-100 py-16 transition-colors overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
          <div className="space-y-2">
            <div className="text-xs font-black text-primary tracking-widest uppercase">KESEHATAN MATA YANG DIRANCANG UNTUK ANDA</div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
              Layanan Unggulan Subspesialis Mata
            </h3>
            <p className="text-xs text-slate-400 font-semibold">
              Geser secara horizontal untuk melihat 11 Klinik Spesialisasi kami. Arahkan mouse untuk menjeda putaran otomatis.
            </p>
          </div>
        </div>

        {/* Horizontal Marquee Container */}
        <div 
          ref={clinicsMarqueeRef}
          onMouseEnter={() => setIsClinicsHovered(true)}
          onMouseLeave={() => setIsClinicsHovered(false)}
          className="w-full overflow-x-auto scrollbar-none flex gap-6 py-4 px-8 select-none cursor-grab active:cursor-grabbing"
          style={{ scrollBehavior: "auto" }}
        >
          {clinics.map((clinic) => (
            <Link
              key={clinic.id}
              href={`/pelayanan/${clinic.slug}`}
              className="bg-white rounded-3xl overflow-hidden border border-slate-150/80 shadow-xs hover-lift flex flex-col justify-between w-72 h-85 shrink-0 group hover:border-primary/40 transition-colors"
            >
              <div className="w-full h-40 bg-slate-100 overflow-hidden relative">
                <img
                  src={clinic.image_url}
                  alt={clinic.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"></div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className="text-xs font-black text-slate-800 mb-1 group-hover:text-primary transition-colors leading-tight">
                    {clinic.name}
                  </h4>
                  <p className="text-[10px] text-slate-450 leading-relaxed line-clamp-3 font-semibold">
                    {clinic.description}
                  </p>
                </div>
                <div className="text-[10px] font-bold text-primary flex items-center gap-1 mt-1 group-hover:translate-x-1.5 transition-transform">
                  <span>Selengkapnya</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="w-full py-20 bg-emerald-950 text-white relative overflow-hidden">
        {/* Background decorative patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-10 relative z-10">
          <div className="text-center space-y-3">
            <span className="inline-block bg-emerald-900/60 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider">
              FAQ RSKM
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h3>
            <p className="text-xs text-emerald-200 font-semibold">
              Informasi ringkas mengenai alur pasien, BPJS, dan layanan di RSKM Provinsi Sumsel
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {faqData.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-emerald-900/40 border border-emerald-800/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-emerald-700/80"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 flex justify-between items-center text-left font-black text-xs md:text-sm text-white hover:text-emerald-300 transition-colors cursor-pointer select-none"
                  >
                    <span>{faq.q}</span>
                    <span className={`w-6 h-6 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-350 font-bold transition-transform duration-350 ${isOpen ? "rotate-180 text-emerald-450 border-emerald-600 bg-emerald-900/50" : ""}`}>
                      {isOpen ? "-" : "+"}
                    </span>
                  </button>
                  
                  <div 
                    className={`transition-all duration-350 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-40 border-t border-emerald-850" : "max-h-0"
                    }`}
                  >
                    <div className="p-5 text-xs text-slate-200 font-semibold leading-relaxed bg-emerald-950/80">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. MEDIA BERITA & ARTIKEL (ASYMMETRIC GRID LAYOUT) */}
      <section id="berita-kegiatan" className="w-full py-20 border-b border-slate-100 bg-slate-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Header Layout */}
          <div className="flex justify-between items-end pb-4 border-b-2 border-emerald-600 mb-10">
            <div className="space-y-1.5">
              <span className="text-xs font-black text-emerald-600 tracking-widest uppercase block">INFORMASI TERKINI</span>
              <h3 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">
                Media RSKM / Berita & Artikel
              </h3>
            </div>
            <Link
              href="/perpustakaan"
              className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-600 hover:text-emerald-700 hover:translate-x-1 transition-all"
            >
              <span>Lihat Semua Berita</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {articlePosts.length === 0 ? (
            <div className="text-center py-12 text-xs font-bold text-slate-400">
              Belum ada berita atau artikel terpublikasi.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
              
              {/* Left Side: Headline / Berita Utama (60% width on lg) */}
              <div className="lg:col-span-3 space-y-4 group">
                {(() => {
                  const headline = articlePosts[0];
                  return (
                    <Link href={`/post/${headline.id}`} className="block space-y-4">
                      {/* Big Thumbnail */}
                      <div className="w-full h-[240px] sm:h-[360px] rounded-3xl overflow-hidden bg-slate-100 border border-slate-150 relative shadow-xs">
                        <img
                          src={headline.image_url}
                          alt={headline.title}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 pointer-events-none"
                        />
                        <span className="absolute top-4 left-4 bg-emerald-600 text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-md shadow-md tracking-wider">
                          Berita Utama
                        </span>
                      </div>
                      
                      {/* Date */}
                      <span className="block text-[11px] text-slate-450 font-extrabold tracking-wide uppercase">
                        {new Date(headline.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        })}
                      </span>

                      {/* Title */}
                      <h4 className="text-lg md:text-xl font-black text-slate-800 leading-snug group-hover:text-primary transition-colors">
                        {headline.title}
                      </h4>

                      {/* Excerpt */}
                      <p className="text-xs text-slate-500 leading-relaxed font-semibold line-clamp-3">
                        {headline.content}
                      </p>
                    </Link>
                  );
                })()}
              </div>

              {/* Right Side: Sidebar List of 4 items (40% width on lg) */}
              <div className="lg:col-span-2 space-y-6">
                {articlePosts.slice(1, 5).length === 0 ? (
                  <div className="text-center py-8 text-xs font-bold text-slate-400 border border-dashed border-slate-200 rounded-2xl">
                    Tidak ada berita tambahan saat ini.
                  </div>
                ) : (
                  <div className="flex flex-col divide-y divide-slate-200/60">
                    {articlePosts.slice(1, 5).map((post, idx) => (
                      <Link 
                        key={post.id} 
                        href={`/post/${post.id}`} 
                        className={`flex gap-4 group cursor-pointer hover:bg-white/50 p-2.5 -mx-2.5 rounded-2xl transition-all ${
                          idx > 0 ? "pt-4 pb-4" : "pb-4"
                        }`}
                      >
                        {/* Small Thumbnail */}
                        <div className="w-24 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 shrink-0 shadow-3xs">
                          <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300 pointer-events-none"
                          />
                        </div>

                        {/* Title & Metadata */}
                        <div className="space-y-1">
                          <span className="block text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none">
                            {post.badge || "BERITA"} • {new Date(post.created_at).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short"
                            })}
                          </span>
                          <h5 className="text-xs md:text-xs font-black text-slate-800 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h5>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </section>

      {/* 9. "KEGIATAN RUMAH SAKIT" PHOTO DOCUMENTATION SECTION (MULTI-CARD TILTED CAROUSEL) */}
      <section id="kegiatan-rs" className="w-full py-16 space-y-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-3">
          <h3 className="text-2xl font-black text-slate-850 tracking-tight uppercase">DOKUMENTASI KEGIATAN</h3>
          <div className="w-16 h-1 bg-emerald-500 mx-auto"></div>
        </div>

        {displayedKegiatan.length === 0 ? (
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center py-8 text-xs font-bold text-slate-400">
            Belum ada dokumentasi kegiatan terpublikasi.
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative select-none">
            {/* Viewport showing 3 cards side by side */}
            <div 
              className="flex justify-center items-center gap-4 md:gap-8 py-10"
              onMouseEnter={() => setIsKegiatanHovered(true)}
              onMouseLeave={() => setIsKegiatanHovered(false)}
            >
              {/* Left Card */}
              {displayedKegiatan.length > 1 && (
                <div 
                  onClick={() => setActivePhotoIdx((prev) => (prev === 0 ? displayedKegiatan.length - 1 : prev - 1))}
                  className="w-1/4 max-w-[240px] bg-white p-3 pb-6 rounded-3xl shadow-lg border border-slate-100/50 -rotate-6 scale-90 opacity-60 transition-all duration-500 cursor-pointer hidden sm:block hover:opacity-90"
                >
                  <div className="w-full h-36 md:h-48 rounded-2xl overflow-hidden bg-slate-50">
                    <img src={displayedKegiatan[(safePhotoIdx - 1 + displayedKegiatan.length) % displayedKegiatan.length].image_url} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                      {displayedKegiatan[(safePhotoIdx - 1 + displayedKegiatan.length) % displayedKegiatan.length].badge || "DOKUMENTASI"}
                    </p>
                    <h5 className="text-[11px] font-black text-slate-600 mt-1 line-clamp-1 font-serif italic">
                      {displayedKegiatan[(safePhotoIdx - 1 + displayedKegiatan.length) % displayedKegiatan.length].title}
                    </h5>
                  </div>
                </div>
              )}

              {/* Center Card (Active) */}
              <div 
                className="w-full sm:w-1/2 max-w-[360px] bg-white p-4 pb-8 rounded-3xl shadow-2xl border border-slate-100 z-10 scale-100 transition-all duration-500 relative"
              >
                <div className="w-full h-48 md:h-64 rounded-2xl overflow-hidden bg-slate-50 relative group">
                  <img src={displayedKegiatan[safePhotoIdx].image_url} alt="" className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-[#005B2B]/95 backdrop-blur-xs text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md">
                    {displayedKegiatan[safePhotoIdx].badge || "DOKUMENTASI"}
                  </span>
                </div>
                <div className="mt-5 text-center px-2">
                  <h4 className="text-sm font-black text-slate-800 line-clamp-2 leading-snug">
                    {displayedKegiatan[safePhotoIdx].title}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-2 font-medium line-clamp-2 leading-relaxed">
                    {displayedKegiatan[safePhotoIdx].content}
                  </p>
                </div>

                {/* Left/Right manual buttons overlapping the center card edges */}
                <button
                  onClick={() => setActivePhotoIdx((prev) => (prev === 0 ? displayedKegiatan.length - 1 : prev - 1))}
                  className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-lg border border-slate-150 z-20"
                  title="Sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-600" />
                </button>

                <button
                  onClick={() => setActivePhotoIdx((prev) => (prev + 1) % displayedKegiatan.length)}
                  className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-lg border border-slate-150 z-20"
                  title="Selanjutnya"
                >
                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Right Card */}
              {displayedKegiatan.length > 1 && (
                <div 
                  onClick={() => setActivePhotoIdx((prev) => (prev + 1) % displayedKegiatan.length)}
                  className="w-1/4 max-w-[240px] bg-white p-3 pb-6 rounded-3xl shadow-lg border border-slate-100/50 rotate-6 scale-90 opacity-60 transition-all duration-500 cursor-pointer hidden sm:block hover:opacity-90"
                >
                  <div className="w-full h-36 md:h-48 rounded-2xl overflow-hidden bg-slate-50">
                    <img src={displayedKegiatan[(safePhotoIdx + 1) % displayedKegiatan.length].image_url} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                      {displayedKegiatan[(safePhotoIdx + 1) % displayedKegiatan.length].badge || "DOKUMENTASI"}
                    </p>
                    <h5 className="text-[11px] font-black text-slate-600 mt-1 line-clamp-1 font-serif italic">
                      {displayedKegiatan[(safePhotoIdx + 1) % displayedKegiatan.length].title}
                    </h5>
                  </div>
                </div>
              )}
            </div>
            
            {/* Pagination Circle Dot Indicators */}
            <div className="flex justify-center gap-2 mt-2">
              {displayedKegiatan.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === safePhotoIdx 
                      ? "w-8 bg-emerald-600 border border-emerald-600" 
                      : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  title={`Ke slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ================= MODALS & OVERLAYS ================= */}

      {/* MODAL 1: DOCTOR SCHEDULE DETAILS */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden border border-slate-100 shadow-2xl relative animate-fade-in">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 space-y-6">
              <div className="flex gap-4 items-center border-b border-slate-100 pb-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 overflow-hidden shrink-0 border border-slate-200">
                  <img src={selectedDoctor.image_url} alt={selectedDoctor.name} className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-850 leading-tight">{selectedDoctor.name}</h4>
                  <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1">
                    {selectedDoctor.specialization}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Jadwal Pelayanan Rutin</span>
                </h5>
                
                <div className="bg-slate-50 border border-slate-200 rounded-2xl divide-y divide-slate-150 p-1">
                  {selectedDoctor.schedule && typeof selectedDoctor.schedule === "object" ? (
                    Object.entries(selectedDoctor.schedule).map(([days, hours]: any) => (
                      <div key={days} className="p-3.5 flex justify-between items-center text-xs font-medium">
                        <span className="text-slate-600 font-bold">{days}</span>
                        <span className="text-primary font-extrabold bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                          {hours}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs font-semibold text-slate-500">
                      {typeof selectedDoctor.schedule === "string" ? selectedDoctor.schedule : "Jadwal tidak tersedia"}
                    </div>
                  )}
                </div>
              </div>

              <p className="text-[10px] text-slate-400 leading-relaxed italic">
                * Jadwal dapat berubah sewaktu-waktu akibat tindakan operasi darurat. Konfirmasi kedatangan disarankan via WhatsApp hotline.
              </p>

              <button
                onClick={() => setSelectedDoctor(null)}
                className="w-full bg-slate-800 hover:bg-slate-750 text-slate-200 py-3.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Tutup Jadwal
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Video Modal Popup */}
      <AnimatePresence>
        {isVideoOpen && (
          <div className="fixed inset-0 h-screen z-55 overflow-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/40 cursor-pointer"
              onClick={() => setIsVideoOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl relative aspect-video z-10 border border-slate-100"
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/231xK3rXG9E?autoplay=1"
                title="Video Profil RSKM"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Service Details Modal Popup */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 h-screen z-55 overflow-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/40 cursor-pointer"
              onClick={() => setSelectedService(null)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white max-w-3xl w-full h-[80vh] md:h-[85vh] rounded-3xl overflow-hidden border border-slate-100 shadow-2xl relative flex flex-col animate-fade-in"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="h-56 md:h-80 w-full relative shrink-0">
                <img src={selectedService.src} alt={selectedService.title} className="w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-6 text-white space-y-1">
                  <span className="inline-block bg-white/20 text-white backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                    {selectedService.category}
                  </span>
                  <h4 className="text-lg md:text-2xl font-black">{selectedService.title}</h4>
                </div>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto flex-1 text-xs md:text-sm leading-relaxed text-slate-650 font-medium font-sans">
                {selectedService.content}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

