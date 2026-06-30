"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useData } from "@/app/context/DataContext";
import Swal from "sweetalert2";
import {
  FileText,
  BookOpen,
  Mail,
  Users,
  Layers,
  Bed,
  UserCheck,
  Image as ImageIcon,
  Download,
  LogOut,
  Home,
  Loader,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  CheckCircle,
  GitBranch,
  Sun,
  Moon,
} from "lucide-react";

type Tab =
  | "media"
  | "perpus"
  | "feedback"
  | "doctors"
  | "clinics"
  | "beds"
  | "directors"
  | "struktur"
  | "hero"
  | "subscribers";

export default function DashboardPage() {
  const {
    posts,
    libraryItems,
    feedbackMessages,
    doctors,
    clinics,
    beds,
    directors,
    pages,
    heroSlides,
    subscribers,
    currentUser,
    isLoading,
    logout,
    createOrUpdatePost,
    removePost,
    createOrUpdateLibraryItem,
    removeLibraryItem,
    createOrUpdateFeedbackMessage,
    removeFeedbackMessage,
    createOrUpdateDoctor,
    removeDoctor,
    updateClinicProfile,
    updateBedCapacity,
    createOrUpdateDirector,
    removeDirector,
    createOrUpdatePage,
    createOrUpdateHeroSlide,
    removeHeroSlide,
    removeSubscriber,
    refreshData,
  } = useData();

  const router = useRouter();

  // Authentication check
  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/login");
    }
  }, [currentUser, isLoading, router]);

  const role = currentUser?.role || "ADMIN_BIASA";
  const [activeTab, setActiveTab] = useState<Tab>("media");
  const [isLightMode, setIsLightMode] = useState(false);

  // State for forms & modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form inputs states
  const [mediaTitle, setMediaTitle] = useState("");
  const [mediaCategory, setMediaCategory] = useState<"berita" | "artikel" | "kegiatan">("berita");
  const [mediaContent, setMediaContent] = useState("");
  const [mediaImage, setMediaImage] = useState("");
  const [mediaBadge, setMediaBadge] = useState("");

  const [perpusTitle, setPerpusTitle] = useState("");
  const [perpusCategory, setPerpusCategory] = useState<"buku" | "jurnal" | "panduan" | "presentasi">("buku");
  const [perpusDesc, setPerpusDesc] = useState("");
  const [perpusImage, setPerpusImage] = useState("");
  const [perpusFileUrl, setPerpusFileUrl] = useState("");
  const [perpusFileName, setPerpusFileName] = useState("");

  const [docName, setDocName] = useState("");
  const [docSpec, setDocSpec] = useState("");
  const [docCategory, setDocCategory] = useState("");
  const [docImage, setDocImage] = useState("");
  const [docClinic, setDocClinic] = useState("");
  const [docScheduleRaw, setDocScheduleRaw] = useState("Senin - Jumat: 08:00 - 12:00");

  const [clinicName, setClinicName] = useState("");
  const [clinicDesc, setClinicDesc] = useState("");
  const [clinicImage, setClinicImage] = useState("");
  const [clinicFacilitiesText, setClinicFacilitiesText] = useState("");

  const [bedClassName, setBedClassName] = useState("");
  const [bedTotal, setBedTotal] = useState(0);
  const [bedFilled, setBedFilled] = useState(0);
  const [bedAvailable, setBedAvailable] = useState(0);

  const [dirName, setDirName] = useState("");
  const [dirPos, setDirPos] = useState("");
  const [dirImage, setDirImage] = useState("");

  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroBadge, setHeroBadge] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [heroOrder, setHeroOrder] = useState(1);

  const [strukturImage, setStrukturImage] = useState("");

  // Populate structure image url from pages table
  useEffect(() => {
    const page = pages.find((p) => p.slug === "struktur-organisasi");
    if (page?.image_url) {
      setStrukturImage(page.image_url);
    }
  }, [pages]);

  // Adjust active tab if role changes
  useEffect(() => {
    if (role === "ADMIN_BIASA" && !["media", "perpus", "feedback"].includes(activeTab)) {
      setActiveTab("media");
    }
  }, [role, activeTab]);

  if (isLoading || !currentUser) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center flex-col gap-4 text-white">
        <Loader className="w-8 h-8 animate-spin text-emerald-500" />
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Memeriksa Autentikasi...</p>
      </div>
    );
  }

  // Handle Logout
  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  // Switch Tab Helper
  const changeTab = (tab: Tab) => {
    setActiveTab(tab);
    setIsModalOpen(false);
    resetForms();
  };

  const resetForms = () => {
    setEditingId(null);
    setMediaTitle("");
    setMediaCategory("berita");
    setMediaContent("");
    setMediaImage("");
    setMediaBadge("");

    setPerpusTitle("");
    setPerpusCategory("buku");
    setPerpusDesc("");
    setPerpusImage("");
    setPerpusFileUrl("");
    setPerpusFileName("");

    setDocName("");
    setDocSpec("");
    setDocCategory("");
    setDocImage("");
    setDocClinic("");
    setDocScheduleRaw("Senin - Jumat: 08:00 - 12:00");

    setClinicName("");
    setClinicDesc("");
    setClinicImage("");
    setClinicFacilitiesText("");

    setDirName("");
    setDirPos("");
    setDirImage("");

    setHeroTitle("");
    setHeroSubtitle("");
    setHeroBadge("");
    setHeroImage("");
    setHeroOrder(1);
  };

  // SUBMIT HANDLERS
  const handleMediaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        id: editingId || `post_${Date.now()}`,
        title: mediaTitle,
        category: mediaCategory,
        content: mediaContent,
        image_url: mediaImage || "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80",
        badge: mediaBadge || (mediaCategory === "artikel" ? "EDUKASI" : "KEGIATAN"),
      };
      await createOrUpdatePost(payload);
      Swal.fire("Berhasil", "Postingan berhasil disimpan", "success");
      setIsModalOpen(false);
      resetForms();
      refreshData();
    } catch {
      Swal.fire("Error", "Gagal menyimpan postingan", "error");
    }
  };

  const handlePerpusSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        id: editingId || `lib_${Date.now()}`,
        title: perpusTitle,
        category: perpusCategory,
        description: perpusDesc,
        image_url: perpusImage || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80",
        file_url: perpusFileUrl || "data:application/pdf;base64,JVBERi...",
        file_name: perpusFileName || "dokumen.pdf",
        created_at: new Date().toISOString(),
      };
      await createOrUpdateLibraryItem(payload);
      Swal.fire("Berhasil", "Berkas perpustakaan berhasil disimpan", "success");
      setIsModalOpen(false);
      resetForms();
      refreshData();
    } catch {
      Swal.fire("Error", "Gagal menyimpan berkas", "error");
    }
  };

  const handleDoctorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const scheduleObj: Record<string, string> = {};
      const lines = docScheduleRaw.split("\n");
      lines.forEach((l) => {
        const parts = l.split(":");
        if (parts.length >= 2) {
          scheduleObj[parts[0].trim()] = parts.slice(1).join(":").trim();
        } else if (l.trim()) {
          scheduleObj["Jadwal"] = l.trim();
        }
      });

      const payload = {
        id: editingId || `doc_${Date.now()}`,
        name: docName,
        specialization: docSpec,
        category: docCategory || docSpec,
        image_url: docImage || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80",
        clinic_slug: docClinic || "klinik-umum",
        schedule: scheduleObj,
      };
      await createOrUpdateDoctor(payload);
      Swal.fire("Berhasil", "Data dokter berhasil disimpan", "success");
      setIsModalOpen(false);
      resetForms();
      refreshData();
    } catch {
      Swal.fire("Error", "Gagal menyimpan data dokter", "error");
    }
  };

  const handleClinicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    try {
      const facilitiesArr = clinicFacilitiesText
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      const payload = {
        id: editingId,
        name: clinicName,
        slug: editingId,
        description: clinicDesc,
        image_url: clinicImage,
        facilities: facilitiesArr,
      };
      await updateClinicProfile(payload);
      Swal.fire("Berhasil", "Profil poliklinik berhasil diperbarui", "success");
      setIsModalOpen(false);
      resetForms();
      refreshData();
    } catch {
      Swal.fire("Error", "Gagal menyimpan poliklinik", "error");
    }
  };

  const handleBedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    try {
      const payload = {
        id: editingId,
        class_name: bedClassName,
        total_capacity: Number(bedTotal),
        filled: Number(bedFilled),
        available: Number(bedAvailable),
      };
      await updateBedCapacity(payload);
      Swal.fire("Berhasil", "Kapasitas bed berhasil diperbarui", "success");
      setIsModalOpen(false);
      resetForms();
      refreshData();
    } catch {
      Swal.fire("Error", "Gagal memperbarui kapasitas bed", "error");
    }
  };

  const handleDirectorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        id: editingId || `dir_${Date.now()}`,
        name: dirName,
        position: dirPos,
        image_url: dirImage || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
      };
      await createOrUpdateDirector(payload);
      Swal.fire("Berhasil", "Data jajaran direksi berhasil disimpan", "success");
      setIsModalOpen(false);
      resetForms();
      refreshData();
    } catch {
      Swal.fire("Error", "Gagal menyimpan data direksi", "error");
    }
  };

  const handleStrukturSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        id: "p2",
        title: "Struktur Organisasi",
        slug: "struktur-organisasi",
        content: '<div class="space-y-4"><p class="text-sm text-slate-500 font-medium">Bagan Struktur Organisasi RSKM Prov Sumsel</p></div>',
        layout_type: "standard" as const,
        menu_group: "profil" as const,
        is_published: true,
        image_url: strukturImage,
      };
      await createOrUpdatePage(payload);
      Swal.fire("Berhasil", "Gambar bagan struktur organisasi berhasil diperbarui!", "success");
      refreshData();
    } catch {
      Swal.fire("Error", "Gagal memperbarui bagan", "error");
    }
  };

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        id: editingId || `hero_${Date.now()}`,
        title: heroTitle,
        subtitle: heroSubtitle,
        badge: heroBadge,
        image_url: heroImage || "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=1600&auto=format&fit=crop&q=80",
        order_index: Number(heroOrder),
      };
      await createOrUpdateHeroSlide(payload);
      Swal.fire("Berhasil", "Foto hero banner berhasil disimpan", "success");
      setIsModalOpen(false);
      resetForms();
      refreshData();
    } catch {
      Swal.fire("Error", "Gagal menyimpan foto hero", "error");
    }
  };

  // DELETE TRIGGERS
  const confirmDelete = (id: string, removeFn: (id: string) => Promise<void>) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data yang dihapus tidak dapat dipulihkan kembali!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#005B2B",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      customClass: {
        popup: "rounded-3xl font-sans",
        confirmButton: "rounded-xl text-xs font-bold px-6 py-2.5",
        cancelButton: "rounded-xl text-xs font-bold px-6 py-2.5",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await removeFn(id);
        Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
        refreshData();
      }
    });
  };

  // EDIT POPULATORS
  const openEditMedia = (post: any) => {
    setModalType("edit");
    setEditingId(post.id);
    setMediaTitle(post.title);
    setMediaCategory(post.category);
    setMediaContent(post.content);
    setMediaImage(post.image_url);
    setMediaBadge(post.badge || "");
    setIsModalOpen(true);
  };

  const openEditPerpus = (item: any) => {
    setModalType("edit");
    setEditingId(item.id);
    setPerpusTitle(item.title);
    setPerpusCategory(item.category);
    setPerpusDesc(item.description);
    setPerpusImage(item.image_url);
    setPerpusFileUrl(item.file_url);
    setPerpusFileName(item.file_name);
    setIsModalOpen(true);
  };

  const openEditDoctor = (doc: any) => {
    setModalType("edit");
    setEditingId(doc.id);
    setDocName(doc.name);
    setDocSpec(doc.specialization);
    setDocCategory(doc.category || "");
    setDocImage(doc.image_url);
    setDocClinic(doc.clinic_slug);

    const lines = Object.entries(doc.schedule || {}).map(([day, hour]) => `${day}: ${hour}`);
    setDocScheduleRaw(lines.join("\n"));
    setIsModalOpen(true);
  };

  const openEditClinic = (cli: any) => {
    setModalType("edit");
    setEditingId(cli.id);
    setClinicName(cli.name);
    setClinicDesc(cli.description);
    setClinicImage(cli.image_url);
    setClinicFacilitiesText((cli.facilities || []).join(", "));
    setIsModalOpen(true);
  };

  const openEditBed = (b: any) => {
    setModalType("edit");
    setEditingId(b.id);
    setBedClassName(b.class_name);
    setBedTotal(b.total_capacity);
    setBedFilled(b.filled);
    setBedAvailable(b.available);
    setIsModalOpen(true);
  };

  const openEditDirector = (dir: any) => {
    setModalType("edit");
    setEditingId(dir.id);
    setDirName(dir.name);
    setDirPos(dir.position);
    setDirImage(dir.image_url);
    setIsModalOpen(true);
  };

  const openEditHero = (hero: any) => {
    setModalType("edit");
    setEditingId(hero.id);
    setHeroTitle(hero.title);
    setHeroSubtitle(hero.subtitle);
    setHeroBadge(hero.badge);
    setHeroImage(hero.image_url);
    setHeroOrder(hero.order_index);
    setIsModalOpen(true);
  };

  // EXPORTS FOR SUBSCRIBERS
  const downloadSubscribersCSV = () => {
    if (subscribers.length === 0) {
      Swal.fire("Info", "Tidak ada data subscriber.", "info");
      return;
    }
    const csvHeaders = "No,Email Subscriber,Tanggal Terdaftar\n";
    const csvRows = subscribers
      .map((sub, idx) => {
        const date = new Date(sub.created_at).toLocaleString("id-ID");
        return `${idx + 1},"${sub.email.replace(/"/g, '""')}","${date}"`;
      })
      .join("\n");

    const blob = new Blob([csvHeaders + csvRows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `subscribers_rskm_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printSubscribersPDF = () => {
    if (subscribers.length === 0) {
      Swal.fire("Info", "Tidak ada data subscriber.", "info");
      return;
    }
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const dateStr = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    let html = `
      <html>
      <head>
        <title>Daftar Subscriber RSKM - ${dateStr}</title>
        <style>
          body { font-family: sans-serif; padding: 40px; color: #333; }
          h2 { margin-bottom: 5px; color: #005B2B; }
          p { margin-top: 0; font-size: 12px; color: #666; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #ddd; padding: 12px 10px; text-align: left; font-size: 12px; }
          th { background-color: #f4f6f8; font-weight: bold; }
          tr:nth-child(even) { background-color: #fafbfc; }
        </style>
      </head>
      <body>
        <h2>Daftar Subscriber Newsletter</h2>
        <p>RS Khusus Mata Provinsi Sumatera Selatan - Dicetak pada ${dateStr}</p>
        <table>
          <thead>
            <tr>
              <th style="width: 80px;">No</th>
              <th>Email Subscriber</th>
              <th>Tanggal Terdaftar</th>
            </tr>
          </thead>
          <tbody>
    `;

    subscribers.forEach((sub, idx) => {
      const date = new Date(sub.created_at).toLocaleString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      html += `
        <tr>
          <td>${idx + 1}</td>
          <td><b>${sub.email}</b></td>
          <td>${date}</td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
        <script>
          window.onload = function() { window.print(); window.close(); }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <div className={`h-screen flex flex-col font-sans transition-colors duration-200 overflow-hidden ${
      isLightMode ? "bg-slate-50 text-slate-800" : "bg-slate-950 text-slate-100"
    }`}>
      {/* 1. TOP FIXED NAVBAR (STAYS AT THE TOP) */}
      <header className={`h-16 shrink-0 border-b flex items-center justify-between px-6 z-20 transition-colors duration-200 ${
        isLightMode ? "bg-white border-slate-200 text-slate-800" : "bg-slate-950 border-slate-850 text-white"
      }`}>
        {/* Brand header */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center p-0.5 shadow-sm border border-slate-200/50">
            <img src="/logo.png" alt="Logo RSKM" className="w-8 h-8 object-contain" />
          </div>
          <div>
            <h2 className={`text-xs font-black uppercase leading-none ${isLightMode ? "text-slate-800" : "text-white"}`}>
              RS. Khusus Mata
            </h2>
            <p className="text-[8px] font-bold text-emerald-600 tracking-wider uppercase mt-1 leading-none">
              SUMATERA SELATAN
            </p>
          </div>
        </div>

        {/* Navbar Right Actions */}
        <div className="flex items-center gap-5">
          {/* Identity Tag */}
          <div className="text-right hidden sm:block">
            <span className={`text-[8px] font-black uppercase tracking-widest block ${isLightMode ? "text-slate-400" : "text-emerald-300/80"}`}>
              Logged In As:
            </span>
            <span className={`text-xs font-bold truncate block ${isLightMode ? "text-slate-700" : "text-white"}`}>
              {currentUser.email}
            </span>
          </div>

          {/* Mode Terang Switcher */}
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              isLightMode 
                ? "bg-slate-100 border-slate-250 text-slate-700 hover:bg-slate-200" 
                : "bg-slate-900 border-slate-800 text-emerald-400 hover:text-white"
            }`}
          >
            {isLightMode ? <Moon className="w-3.5 h-3.5 text-slate-600" /> : <Sun className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isLightMode ? "Mode Gelap" : "Mode Terang"}</span>
          </button>

          {/* Lihat Website Utama Link */}
          <Link
            href="/"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              isLightMode 
                ? "bg-slate-50 border-slate-250 text-slate-650 hover:bg-slate-100" 
                : "bg-slate-900 border-slate-800 text-slate-350 hover:text-white"
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Website Utama</span>
          </Link>

          {/* Keluar Sistem Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 text-red-400 cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </header>

      {/* LOWER WRAPPER (SIDEBAR & WORKSPACE SIDE-BY-SIDE) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* 2. SIDEBAR PANEL (SCROLLS INDEPENDENTLY) */}
        <aside className={`w-64 shrink-0 flex flex-col p-5 overflow-y-auto h-full border-r transition-colors duration-200 ${
          isLightMode 
            ? "bg-[#005B2B] border-emerald-950 text-white" 
            : "bg-black border-slate-900 text-slate-200"
        }`}>
          <div className="space-y-6">
            <div className={`p-3 rounded-2xl text-center border transition-colors ${
              isLightMode ? "bg-[#004D24]/60 border-[#003C1B]" : "bg-slate-900/50 border-slate-800"
            }`}>
              <span className={`inline-block border text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-md tracking-wider transition-colors ${
                isLightMode 
                  ? "bg-emerald-950 border-emerald-800 text-emerald-400" 
                  : "bg-slate-950 border-slate-800 text-slate-400"
              }`}>
                {role.replace("_", " ")}
              </span>
            </div>

            {/* Navigation links */}
            <nav className="space-y-1.5">
              <span className={`text-[9px] font-black uppercase tracking-widest block px-2 pb-2 transition-colors ${
                isLightMode ? "text-emerald-250/70" : "text-slate-500"
              }`}>
                Menu Dashboard
              </span>

              <button
                onClick={() => changeTab("media")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                  activeTab === "media"
                    ? (isLightMode ? "bg-[#004D24] text-white shadow-inner" : "bg-slate-900 text-emerald-400 border border-slate-800")
                    : (isLightMode ? "text-emerald-100 hover:bg-[#004D24]/40 hover:text-white" : "text-slate-450 hover:bg-slate-900/60 hover:text-slate-200")
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Modul Media</span>
              </button>

              <button
                onClick={() => changeTab("perpus")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                  activeTab === "perpus"
                    ? (isLightMode ? "bg-[#004D24] text-white shadow-inner" : "bg-slate-900 text-emerald-400 border border-slate-800")
                    : (isLightMode ? "text-emerald-100 hover:bg-[#004D24]/40 hover:text-white" : "text-slate-450 hover:bg-slate-900/60 hover:text-slate-200")
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Modul Perpus</span>
              </button>

              <button
                onClick={() => changeTab("feedback")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                  activeTab === "feedback"
                    ? (isLightMode ? "bg-[#004D24] text-white shadow-inner" : "bg-slate-900 text-emerald-400 border border-slate-800")
                    : (isLightMode ? "text-emerald-100 hover:bg-[#004D24]/40 hover:text-white" : "text-slate-450 hover:bg-slate-900/60 hover:text-slate-200")
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Pesan & Aduan</span>
              </button>

              {role === "SUPER_ADMIN" && (
                <>
                  <span className={`text-[9px] font-black uppercase tracking-widest block px-2 pt-4 pb-2 transition-colors ${
                    isLightMode ? "text-emerald-200/70" : "text-slate-500"
                  }`}>
                    Pengelolaan Utama
                  </span>

                  <button
                    onClick={() => changeTab("doctors")}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                      activeTab === "doctors"
                        ? (isLightMode ? "bg-[#004D24] text-white shadow-inner" : "bg-slate-900 text-emerald-400 border border-slate-800")
                        : (isLightMode ? "text-emerald-100 hover:bg-[#004D24]/40 hover:text-white" : "text-slate-450 hover:bg-slate-900/60 hover:text-slate-200")
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Kelola Dokter</span>
                  </button>

                  <button
                    onClick={() => changeTab("clinics")}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                      activeTab === "clinics"
                        ? (isLightMode ? "bg-[#004D24] text-white shadow-inner" : "bg-slate-900 text-emerald-400 border border-slate-800")
                        : (isLightMode ? "text-emerald-100 hover:bg-[#004D24]/40 hover:text-white" : "text-slate-450 hover:bg-slate-900/60 hover:text-slate-200")
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    <span>Kelola Poliklinik</span>
                  </button>

                  <button
                    onClick={() => changeTab("beds")}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                      activeTab === "beds"
                        ? (isLightMode ? "bg-[#004D24] text-white shadow-inner" : "bg-slate-900 text-emerald-400 border border-slate-800")
                        : (isLightMode ? "text-emerald-100 hover:bg-[#004D24]/40 hover:text-white" : "text-slate-450 hover:bg-slate-900/60 hover:text-slate-200")
                    }`}
                  >
                    <Bed className="w-4 h-4" />
                    <span>Kapasitas Bed</span>
                  </button>

                  <button
                    onClick={() => changeTab("directors")}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                      activeTab === "directors"
                        ? (isLightMode ? "bg-[#004D24] text-white shadow-inner" : "bg-slate-900 text-emerald-400 border border-slate-800")
                        : (isLightMode ? "text-emerald-100 hover:bg-[#004D24]/40 hover:text-white" : "text-slate-450 hover:bg-slate-900/60 hover:text-slate-200")
                    }`}
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Kelola Direksi</span>
                  </button>

                  <button
                    onClick={() => changeTab("struktur")}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                      activeTab === "struktur"
                        ? (isLightMode ? "bg-[#004D24] text-white shadow-inner" : "bg-slate-900 text-emerald-400 border border-slate-800")
                        : (isLightMode ? "text-emerald-100 hover:bg-[#004D24]/40 hover:text-white" : "text-slate-450 hover:bg-slate-900/60 hover:text-slate-200")
                    }`}
                  >
                    <GitBranch className="w-4 h-4" />
                    <span>Struktur Organisasi</span>
                  </button>

                  <button
                    onClick={() => changeTab("hero")}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                      activeTab === "hero"
                        ? (isLightMode ? "bg-[#004D24] text-white shadow-inner" : "bg-slate-900 text-emerald-400 border border-slate-800")
                        : (isLightMode ? "text-emerald-100 hover:bg-[#004D24]/40 hover:text-white" : "text-slate-450 hover:bg-slate-900/60 hover:text-slate-200")
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Kelola Foto Hero</span>
                  </button>

                  <button
                    onClick={() => changeTab("subscribers")}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                      activeTab === "subscribers"
                        ? (isLightMode ? "bg-[#004D24] text-white shadow-inner" : "bg-slate-900 text-emerald-400 border border-slate-800")
                        : (isLightMode ? "text-emerald-100 hover:bg-[#004D24]/40 hover:text-white" : "text-slate-450 hover:bg-slate-900/60 hover:text-slate-200")
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Kelola Subscriber</span>
                  </button>
                </>
              )}
            </nav>
          </div>
        </aside>

        {/* 3. MAIN WORKSPACE CONTENT (SCROLLS INDEPENDENTLY) */}
        <main className={`flex-1 p-8 overflow-y-auto h-full transition-colors duration-200 ${
          isLightMode ? "bg-slate-50 text-slate-800" : "bg-slate-900/40 text-slate-100"
        }`}>
          
          {/* ================= TAB 1: MODUL MEDIA ================= */}
          {activeTab === "media" && (
            <div className="space-y-6">
              <div className={`border-b pb-4 flex justify-between items-center transition-colors ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <div>
                  <h2 className={`text-lg font-black transition-colors ${isLightMode ? "text-slate-800" : "text-white"}`}>Modul Media</h2>
                  <p className={`text-xs transition-colors ${isLightMode ? "text-slate-500" : "text-slate-400"}`}>Pengelolaan Berita, Artikel Kesehatan, dan Dokumentasi Kegiatan</p>
                </div>
                <button
                  onClick={() => {
                    setModalType("add");
                    setIsModalOpen(true);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 px-4 rounded-xl flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-950/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Postingan</span>
                </button>
              </div>

              <div className={`border rounded-3xl overflow-hidden transition-colors ${isLightMode ? "bg-white border-slate-200 shadow-xs" : "bg-slate-950 border-slate-800"}`}>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`border-b text-[10px] uppercase tracking-wider transition-colors ${
                      isLightMode ? "border-slate-200 bg-slate-100/50 text-slate-500 font-extrabold" : "border-slate-800 bg-slate-900/30 text-slate-400"
                    }`}>
                      <th className="p-4 w-12 text-center">No</th>
                      <th className="p-4">Postingan</th>
                      <th className="p-4">Kategori</th>
                      <th className="p-4">Badge</th>
                      <th className="p-4">Tanggal Buat</th>
                      <th className="p-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post, idx) => (
                      <tr key={post.id} className={`border-b text-xs transition-colors ${
                        isLightMode ? "border-slate-200 hover:bg-slate-50/50 text-slate-700" : "border-slate-800 hover:bg-slate-900/10 text-slate-300"
                      }`}>
                        <td className="p-4 text-center text-slate-450 font-bold">{idx + 1}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={post.image_url} alt="" className="w-10 h-10 object-cover rounded-lg shrink-0" />
                            <span className={`font-extrabold line-clamp-1 ${isLightMode ? "text-slate-800" : "text-white"}`}>{post.title}</span>
                          </div>
                        </td>
                        <td className="p-4 font-bold capitalize">{post.category}</td>
                        <td className="p-4">
                          <span className={`border px-2 py-0.5 rounded text-[10px] font-bold ${
                            isLightMode ? "bg-slate-100 text-emerald-700 border-slate-250" : "bg-slate-900 text-emerald-455 border-slate-800"
                          }`}>
                            {post.badge || "-"}
                          </span>
                        </td>
                        <td className="p-4 font-mono">{new Date(post.created_at).toLocaleDateString("id-ID")}</td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => openEditMedia(post)}
                              className={`p-2 border rounded-lg cursor-pointer ${
                                isLightMode ? "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100" : "bg-slate-900 border-slate-850 text-slate-300 hover:bg-slate-800"
                              }`}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => confirmDelete(post.id, removePost)}
                              className="p-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 rounded-lg text-red-400 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= TAB 2: MODUL PERPUS ================= */}
          {activeTab === "perpus" && (
            <div className="space-y-6">
              <div className={`border-b pb-4 flex justify-between items-center transition-colors ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <div>
                  <h2 className={`text-lg font-black transition-colors ${isLightMode ? "text-slate-800" : "text-white"}`}>Modul Perpus</h2>
                  <p className={`text-xs transition-colors ${isLightMode ? "text-slate-500" : "text-slate-400"}`}>Dokumen, Buku Saku Kesehatan Mata, Panduan Klaim BPJS, dan Presentasi</p>
                </div>
                <button
                  onClick={() => {
                    setModalType("add");
                    setIsModalOpen(true);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 px-4 rounded-xl flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-950/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Dokumen</span>
                </button>
              </div>

              <div className={`border rounded-3xl overflow-hidden transition-colors ${isLightMode ? "bg-white border-slate-200 shadow-xs" : "bg-slate-950 border-slate-800"}`}>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`border-b text-[10px] uppercase tracking-wider transition-colors ${
                      isLightMode ? "border-slate-200 bg-slate-100/50 text-slate-500 font-extrabold" : "border-slate-800 bg-slate-900/30 text-slate-400"
                    }`}>
                      <th className="p-4 w-12 text-center">No</th>
                      <th className="p-4">Judul Dokumen</th>
                      <th className="p-4">Kategori</th>
                      <th className="p-4">Berkas (File Name)</th>
                      <th className="p-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {libraryItems.map((item, idx) => (
                      <tr key={item.id} className={`border-b text-xs transition-colors ${
                        isLightMode ? "border-slate-200 hover:bg-slate-50/50 text-slate-700" : "border-slate-800 hover:bg-slate-900/10 text-slate-300"
                      }`}>
                        <td className="p-4 text-center text-slate-450 font-bold">{idx + 1}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={item.image_url} alt="" className="w-10 h-10 object-cover rounded-lg shrink-0" />
                            <div>
                              <span className={`font-extrabold block ${isLightMode ? "text-slate-800" : "text-white"}`}>{item.title}</span>
                              <span className={`text-[10px] line-clamp-1 mt-0.5 ${isLightMode ? "text-slate-500" : "text-slate-400"}`}>{item.description}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-bold capitalize">{item.category}</td>
                        <td className="p-4 font-mono text-[10px]">{item.file_name}</td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => openEditPerpus(item)}
                              className={`p-2 border rounded-lg cursor-pointer ${
                                isLightMode ? "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100" : "bg-slate-900 border-slate-850 text-slate-300 hover:bg-slate-800"
                              }`}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => confirmDelete(item.id, removeLibraryItem)}
                              className="p-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 rounded-lg text-red-400 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= TAB 3: PESAN & ADUAN ================= */}
          {activeTab === "feedback" && (
            <div className="space-y-6">
              <div className={`border-b pb-4 transition-colors ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h2 className={`text-lg font-black transition-colors ${isLightMode ? "text-slate-800" : "text-white"}`}>Pesan & Aduan Masyarakat</h2>
                <p className={`text-xs transition-colors ${isLightMode ? "text-slate-500" : "text-slate-400"}`}>Masukan dan laporan pengaduan masuk melalui formulir Hubungi Kami</p>
              </div>

              <div className={`border rounded-3xl overflow-hidden transition-colors ${isLightMode ? "bg-white border-slate-200 shadow-xs" : "bg-slate-950 border-slate-800"}`}>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`border-b text-[10px] uppercase tracking-wider transition-colors ${
                      isLightMode ? "border-slate-200 bg-slate-100/50 text-slate-500 font-extrabold" : "border-slate-800 bg-slate-900/30 text-slate-400"
                    }`}>
                      <th className="p-4 w-12 text-center">No</th>
                      <th className="p-4">Tanggal</th>
                      <th className="p-4">Nama / Pengirim</th>
                      <th className="p-4">Kontak</th>
                      <th className="p-4">Perihal</th>
                      <th className="p-4">Isi Pesan</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbackMessages.map((msg, idx) => (
                      <tr key={msg.id} className={`border-b text-xs transition-colors ${
                        isLightMode ? "border-slate-200 hover:bg-slate-50/50 text-slate-700" : "border-slate-800 hover:bg-slate-900/10 text-slate-300"
                      }`}>
                        <td className="p-4 text-center text-slate-450 font-bold">{idx + 1}</td>
                        <td className="p-4 font-mono">{new Date(msg.created_at).toLocaleDateString("id-ID")}</td>
                        <td className={`p-4 font-extrabold ${isLightMode ? "text-slate-800" : "text-white"}`}>{msg.name}</td>
                        <td className="p-4">{msg.contact}</td>
                        <td className={`p-4 font-bold ${isLightMode ? "text-slate-750" : "text-slate-200"}`}>{msg.subject}</td>
                        <td className={`p-4 max-w-xs truncate ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>{msg.message}</td>
                        <td className="p-4">
                          <select
                            value={msg.status}
                            onChange={async (e) => {
                              const updated = { ...msg, status: e.target.value as any };
                              await createOrUpdateFeedbackMessage(updated);
                              refreshData();
                            }}
                            className={`border text-[10px] font-bold rounded-lg p-1.5 focus:outline-none focus:border-emerald-500 ${
                              isLightMode ? "bg-slate-100 border-slate-250 text-slate-800" : "bg-slate-900 border-slate-800 text-white"
                            }`}
                          >
                            <option value="unread">Belum Dibaca</option>
                            <option value="read">Dibaca</option>
                            <option value="replied">Dibalas</option>
                          </select>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => confirmDelete(msg.id, removeFeedbackMessage)}
                            className="p-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 rounded-lg text-red-400 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= TAB 4: KELOLA DOKTER ================= */}
          {activeTab === "doctors" && role === "SUPER_ADMIN" && (
            <div className="space-y-6">
              <div className={`border-b pb-4 flex justify-between items-center transition-colors ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <div>
                  <h2 className={`text-lg font-black transition-colors ${isLightMode ? "text-slate-800" : "text-white"}`}>Kelola Dokter & Jadwal Praktek</h2>
                  <p className={`text-xs transition-colors ${isLightMode ? "text-slate-500" : "text-slate-400"}`}>Tambah, Edit data spesialis, dan susun tabel jadwal praktek</p>
                </div>
                <button
                  onClick={() => {
                    setModalType("add");
                    setIsModalOpen(true);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 px-4 rounded-xl flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-950/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Dokter</span>
                </button>
              </div>

              <div className={`border rounded-3xl overflow-hidden transition-colors ${isLightMode ? "bg-white border-slate-200 shadow-xs" : "bg-slate-950 border-slate-800"}`}>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`border-b text-[10px] uppercase tracking-wider transition-colors ${
                      isLightMode ? "border-slate-200 bg-slate-100/50 text-slate-500 font-extrabold" : "border-slate-800 bg-slate-900/30 text-slate-400"
                    }`}>
                      <th className="p-4 w-12 text-center">No</th>
                      <th className="p-4">Nama Dokter</th>
                      <th className="p-4">Spesialisasi</th>
                      <th className="p-4">Kategori Menu</th>
                      <th className="p-4">Jadwal Praktek</th>
                      <th className="p-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doc, idx) => (
                      <tr key={doc.id} className={`border-b text-xs transition-colors ${
                        isLightMode ? "border-slate-200 hover:bg-slate-50/50 text-slate-700" : "border-slate-800 hover:bg-slate-900/10 text-slate-300"
                      }`}>
                        <td className="p-4 text-center text-slate-450 font-bold">{idx + 1}</td>
                        <td className="p-4 font-extrabold">
                          <div className="flex items-center gap-3">
                            <img src={doc.image_url} alt="" className="w-10 h-10 object-cover rounded-lg shrink-0 object-top" />
                            <span className={isLightMode ? "text-slate-850" : "text-white"}>{doc.name}</span>
                          </div>
                        </td>
                        <td className="p-4">{doc.specialization}</td>
                        <td className="p-4 font-bold text-emerald-600">{doc.category || "-"}</td>
                        <td className="p-4">
                          <div className="space-y-1">
                            {Object.entries(doc.schedule || {}).map(([d, h]) => (
                              <div key={d} className={`text-[10px] font-medium ${isLightMode ? "text-slate-500" : "text-slate-400"}`}>
                                <span className={`font-bold ${isLightMode ? "text-slate-700" : "text-slate-300"}`}>{d}</span>: {h}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => openEditDoctor(doc)}
                              className={`p-2 border rounded-lg cursor-pointer ${
                                isLightMode ? "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100" : "bg-slate-900 border-slate-850 text-slate-300 hover:bg-slate-800"
                              }`}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => confirmDelete(doc.id, removeDoctor)}
                              className="p-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 rounded-lg text-red-400 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= TAB 5: KELOLA POLIKLINIK ================= */}
          {activeTab === "clinics" && role === "SUPER_ADMIN" && (
            <div className="space-y-6">
              <div className={`border-b pb-4 transition-colors ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h2 className={`text-lg font-black transition-colors ${isLightMode ? "text-slate-800" : "text-white"}`}>Kelola Profil Poliklinik</h2>
                <p className={`text-xs transition-colors ${isLightMode ? "text-slate-500" : "text-slate-400"}`}>Ubah deskripsi layanan poliklinik dan perbarui foto sampul poliklinik</p>
              </div>

              <div className={`border rounded-3xl overflow-hidden transition-colors ${isLightMode ? "bg-white border-slate-200 shadow-xs" : "bg-slate-950 border-slate-800"}`}>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`border-b text-[10px] uppercase tracking-wider transition-colors ${
                      isLightMode ? "border-slate-200 bg-slate-100/50 text-slate-500 font-extrabold" : "border-slate-800 bg-slate-900/30 text-slate-400"
                    }`}>
                      <th className="p-4 w-12 text-center">No</th>
                      <th className="p-4">Nama Poliklinik</th>
                      <th className="p-4">Deskripsi Layanan</th>
                      <th className="p-4">Fasilitas / Alat</th>
                      <th className="p-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clinics.map((cli, idx) => (
                      <tr key={cli.id} className={`border-b text-xs transition-colors ${
                        isLightMode ? "border-slate-200 hover:bg-slate-50/50 text-slate-700" : "border-slate-800 hover:bg-slate-900/10 text-slate-300"
                      }`}>
                        <td className="p-4 text-center text-slate-450 font-bold">{idx + 1}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={cli.image_url} alt="" className="w-12 h-10 object-cover rounded-lg shrink-0" />
                            <span className={`font-extrabold ${isLightMode ? "text-slate-800" : "text-white"}`}>{cli.name}</span>
                          </div>
                        </td>
                        <td className={`p-4 max-w-sm truncate ${isLightMode ? "text-slate-600" : "text-slate-400"}`}>{cli.description}</td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {(cli.facilities || []).map((f: string, i: number) => (
                              <span key={i} className={`text-[9px] border px-1.5 py-0.5 rounded ${
                                isLightMode ? "bg-slate-100 border-slate-200 text-slate-600" : "bg-slate-900 border-slate-800 text-slate-400"
                              }`}>
                                {f}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => openEditClinic(cli)}
                            className={`p-2 border rounded-lg cursor-pointer ${
                              isLightMode ? "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100" : "bg-slate-900 border-slate-850 text-slate-300 hover:bg-slate-800"
                            }`}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= TAB 6: KAPASITAS BED ================= */}
          {activeTab === "beds" && role === "SUPER_ADMIN" && (
            <div className="space-y-6">
              <div className={`border-b pb-4 transition-colors ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h2 className={`text-lg font-black transition-colors ${isLightMode ? "text-slate-800" : "text-white"}`}>Ketersediaan Bed Rawat Inap</h2>
                <p className={`text-xs transition-colors ${isLightMode ? "text-slate-500" : "text-slate-400"}`}>Update jumlah total kapasitas bed dan bed terisi secara real-time</p>
              </div>

              <div className={`border rounded-3xl overflow-hidden transition-colors ${isLightMode ? "bg-white border-slate-200 shadow-xs" : "bg-slate-950 border-slate-800"}`}>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`border-b text-[10px] uppercase tracking-wider transition-colors ${
                      isLightMode ? "border-slate-200 bg-slate-100/50 text-slate-500 font-extrabold" : "border-slate-800 bg-slate-900/30 text-slate-400"
                    }`}>
                      <th className="p-4 w-12 text-center">No</th>
                      <th className="p-4">Kelas Ruangan</th>
                      <th className="p-4">Kapasitas Total</th>
                      <th className="p-4">Terisi</th>
                      <th className="p-4">Tersedia (Kosong)</th>
                      <th className="p-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {beds.map((b, idx) => (
                      <tr key={b.id} className={`border-b text-xs transition-colors ${
                        isLightMode ? "border-slate-200 hover:bg-slate-50/50 text-slate-700" : "border-slate-800 hover:bg-slate-900/10 text-slate-300"
                      }`}>
                        <td className="p-4 text-center text-slate-450 font-bold">{idx + 1}</td>
                        <td className={`p-4 font-extrabold ${isLightMode ? "text-slate-800" : "text-white"}`}>{b.class_name}</td>
                        <td className="p-4 font-mono font-bold">{b.total_capacity} Bed</td>
                        <td className="p-4 font-mono text-red-400 font-bold">{b.filled} Bed</td>
                        <td className="p-4 font-mono text-emerald-500 font-bold">{b.available} Bed</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => openEditBed(b)}
                            className={`p-2 border rounded-lg cursor-pointer ${
                              isLightMode ? "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100" : "bg-slate-900 border-slate-850 text-slate-300 hover:bg-slate-800"
                            }`}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= TAB 7: KELOLA DIREKSI ================= */}
          {activeTab === "directors" && role === "SUPER_ADMIN" && (
            <div className="space-y-6">
              <div className={`border-b pb-4 flex justify-between items-center transition-colors ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <div>
                  <h2 className={`text-lg font-black transition-colors ${isLightMode ? "text-slate-800" : "text-white"}`}>Kelola Jajaran Direksi</h2>
                  <p className={`text-xs transition-colors ${isLightMode ? "text-slate-500" : "text-slate-400"}`}>Mengatur nama, jabatan komando, dan foto resmi direksi</p>
                </div>
                <button
                  onClick={() => {
                    setModalType("add");
                    setIsModalOpen(true);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 px-4 rounded-xl flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-950/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Direksi</span>
                </button>
              </div>

              <div className={`border rounded-3xl overflow-hidden transition-colors ${isLightMode ? "bg-white border-slate-200 shadow-xs" : "bg-slate-950 border-slate-800"}`}>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`border-b text-[10px] uppercase tracking-wider transition-colors ${
                      isLightMode ? "border-slate-200 bg-slate-100/50 text-slate-500 font-extrabold" : "border-slate-800 bg-slate-900/30 text-slate-400"
                    }`}>
                      <th className="p-4 w-12 text-center">No</th>
                      <th className="p-4">Nama Pejabat</th>
                      <th className="p-4">Jabatan Organisasi</th>
                      <th className="p-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {directors.map((dir, idx) => (
                      <tr key={dir.id} className={`border-b text-xs transition-colors ${
                        isLightMode ? "border-slate-200 hover:bg-slate-50/50 text-slate-700" : "border-slate-800 hover:bg-slate-900/10 text-slate-300"
                      }`}>
                        <td className="p-4 text-center text-slate-450 font-bold">{idx + 1}</td>
                        <td className="p-4 font-extrabold">
                          <div className="flex items-center gap-3">
                            <img src={dir.image_url} alt="" className="w-10 h-10 object-cover rounded-lg shrink-0 object-top" />
                            <span className={isLightMode ? "text-slate-800" : "text-white"}>{dir.name}</span>
                          </div>
                        </td>
                        <td className="p-4 font-bold">{dir.position}</td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => openEditDirector(dir)}
                              className={`p-2 border rounded-lg cursor-pointer ${
                                isLightMode ? "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100" : "bg-slate-900 border-slate-850 text-slate-300 hover:bg-slate-800"
                              }`}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => confirmDelete(dir.id, removeDirector)}
                              className="p-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 rounded-lg text-red-400 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= TAB 8: STRUKTUR ORGANISASI ================= */}
          {activeTab === "struktur" && role === "SUPER_ADMIN" && (
            <div className="space-y-6">
              <div className={`border-b pb-4 transition-colors ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <h2 className={`text-lg font-black transition-colors ${isLightMode ? "text-slate-800" : "text-white"}`}>Struktur Organisasi (Upload Gambar)</h2>
                <p className={`text-xs transition-colors ${isLightMode ? "text-slate-500" : "text-slate-400"}`}>Input link url gambar bagan struktur komando rumah sakit</p>
              </div>

              <div className={`border rounded-3xl p-6 max-w-2xl transition-colors ${isLightMode ? "bg-white border-slate-200 shadow-xs" : "bg-slate-950 border-slate-800"}`}>
                <form onSubmit={handleStrukturSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Upload File Gambar Bagan Struktur (Folder)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setStrukturImage(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className={`w-full text-xs rounded-xl p-3 focus:outline-none focus:border-emerald-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-emerald-950 file:text-emerald-450 hover:file:bg-emerald-900 ${
                        isLightMode ? "bg-slate-100 border border-slate-250 text-slate-800" : "bg-slate-900 border border-slate-800 text-emerald-400"
                      }`}
                    />
                  </div>

                  {strukturImage && (
                    <div className="space-y-2">
                      <span className="text-[9px] font-black text-slate-450 uppercase tracking-widest block">Pratinjau Bagan:</span>
                      <div className={`p-3 border rounded-2xl overflow-hidden max-h-80 flex items-center justify-center ${
                        isLightMode ? "bg-slate-50 border-slate-200" : "bg-slate-900/60 border-slate-850"
                      }`}>
                        <img src={strukturImage} alt="Pratinjau Struktur" className="max-h-72 object-contain" />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-3 px-6 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-950/20"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Bagan Struktur</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ================= TAB 9: KELOLA FOTO HERO ================= */}
          {activeTab === "hero" && role === "SUPER_ADMIN" && (
            <div className="space-y-6">
              <div className={`border-b pb-4 flex justify-between items-center transition-colors ${isLightMode ? "border-slate-200" : "border-slate-800"}`}>
                <div>
                  <h2 className={`text-lg font-black transition-colors ${isLightMode ? "text-slate-800" : "text-white"}`}>Kelola Banner Slide Hero</h2>
                  <p className={`text-xs transition-colors ${isLightMode ? "text-slate-500" : "text-slate-400"}`}>Mengubah gambar latar banner slide dan teks promosi di beranda utama</p>
                </div>
                <button
                  onClick={() => {
                    setModalType("add");
                    setIsModalOpen(true);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 px-4 rounded-xl flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-950/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Banner Slide</span>
                </button>
              </div>

              <div className={`border rounded-3xl overflow-hidden transition-colors ${isLightMode ? "bg-white border-slate-200 shadow-xs" : "bg-slate-950 border-slate-800"}`}>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`border-b text-[10px] uppercase tracking-wider transition-colors ${
                      isLightMode ? "border-slate-200 bg-slate-100/50 text-slate-500 font-extrabold" : "border-slate-800 bg-slate-900/30 text-slate-400"
                    }`}>
                      <th className="p-4 w-12 text-center">No</th>
                      <th className="p-4">Judul Slide</th>
                      <th className="p-4">Subjudul</th>
                      <th className="p-4">Badge Promosi</th>
                      <th className="p-4 text-center">Urutan</th>
                      <th className="p-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {heroSlides.map((slide, idx) => (
                      <tr key={slide.id} className={`border-b text-xs transition-colors ${
                        isLightMode ? "border-slate-200 hover:bg-slate-50/50 text-slate-700" : "border-slate-800 hover:bg-slate-900/10 text-slate-300"
                      }`}>
                        <td className="p-4 text-center text-slate-450 font-bold">{idx + 1}</td>
                        <td className="p-4 font-extrabold">
                          <div className="flex items-center gap-3">
                            <img src={slide.image_url} alt="" className="w-16 h-10 object-cover rounded-lg shrink-0" />
                            <span className={isLightMode ? "text-slate-850" : "text-white"}>{slide.title}</span>
                          </div>
                        </td>
                        <td className={`p-4 max-w-xs truncate ${isLightMode ? "text-slate-600" : "text-slate-450"}`}>{slide.subtitle}</td>
                        <td className="p-4">
                          <span className={`border px-2 py-0.5 rounded text-[10px] font-bold ${
                            isLightMode ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-emerald-950/40 text-emerald-400 border-emerald-900/30"
                          }`}>
                            {slide.badge}
                          </span>
                        </td>
                        <td className="p-4 text-center font-mono font-bold text-slate-400">#{slide.order_index}</td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => openEditHero(slide)}
                              className={`p-2 border rounded-lg cursor-pointer ${
                                isLightMode ? "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100" : "bg-slate-900 border-slate-850 text-slate-300 hover:bg-slate-800"
                              }`}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => confirmDelete(slide.id, removeHeroSlide)}
                              className="p-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 rounded-lg text-red-400 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= TAB 10: KELOLA SUBSCRIBER ================= */}
          {activeTab === "subscribers" && role === "SUPER_ADMIN" && (
            <div className="space-y-6">
              <div className={`border-b pb-3 flex flex-wrap justify-between items-center gap-4 transition-colors ${isLightMode ? "border-slate-200" : "border-slate-850"}`}>
                <div>
                  <h2 className={`text-lg font-black transition-colors ${isLightMode ? "text-slate-800" : "text-white"}`}>Kelola Subscriber Newsletter</h2>
                  <p className={`text-xs transition-colors ${isLightMode ? "text-slate-550" : "text-slate-400"}`}>Daftar email pengunjung yang berlangganan kabar berita & publikasi RSKM</p>
                </div>
                <div className="flex gap-2.5">
                  <button
                    onClick={downloadSubscribersCSV}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Ekspor Excel (CSV)</span>
                  </button>
                  <button
                    onClick={printSubscribersPDF}
                    className={`border text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                      isLightMode ? "bg-slate-100 border-slate-250 text-slate-700 hover:bg-slate-200" : "bg-slate-800 border border-slate-700 text-white hover:bg-slate-750"
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Cetak PDF</span>
                  </button>
                </div>
              </div>

              <div className={`border rounded-3xl overflow-hidden transition-colors ${isLightMode ? "bg-white border-slate-200 shadow-xs" : "bg-slate-950 border-slate-800"}`}>
                <div className={`p-4 border-b flex justify-between items-center ${isLightMode ? "border-slate-200 bg-slate-50" : "border-slate-800 bg-slate-900/30"}`}>
                  <span className={`text-xs font-black ${isLightMode ? "text-slate-600" : "text-slate-300"}`}>Total Terdaftar: {subscribers.length} email</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className={`border-b text-[10px] uppercase tracking-wider transition-colors ${
                        isLightMode ? "border-slate-200 bg-slate-100/50 text-slate-500 font-extrabold" : "border-slate-800 bg-slate-900/10 text-slate-400"
                      }`}>
                        <th className="py-4 px-6 w-16 text-center">No</th>
                        <th className="py-4 px-6">Email Address</th>
                        <th className="py-4 px-6">Tanggal Terdaftar</th>
                        <th className="py-4 px-6 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((sub, idx) => (
                        <tr key={sub.id || idx} className={`border-b text-xs transition-colors ${
                          isLightMode ? "border-slate-200 hover:bg-slate-50/50 text-slate-700" : "border-slate-800 hover:bg-slate-900/10 text-slate-300"
                        }`}>
                          <td className="py-4 px-6 text-center text-slate-450 font-bold">{idx + 1}</td>
                          <td className={`py-4 px-6 font-extrabold ${isLightMode ? "text-slate-800" : "text-white"}`}>{sub.email}</td>
                          <td className="py-4 px-6 font-mono">{new Date(sub.created_at).toLocaleString("id-ID")}</td>
                          <td className="py-4 px-6 text-center">
                            <button
                              onClick={() => {
                                if (sub.id) {
                                  confirmDelete(sub.id, removeSubscriber);
                                }
                              }}
                              className="p-2 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 rounded-lg text-red-400 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ================= EDIT / ADD FORM MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`rounded-3xl w-full max-w-xl max-h-[85vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl animate-fade-in transition-colors ${
            isLightMode ? "bg-white border border-slate-200 text-slate-800" : "bg-slate-950 border border-slate-800 text-slate-200"
          }`}>
            {/* Modal header */}
            <div className={`flex justify-between items-center border-b pb-4 ${isLightMode ? "border-slate-200" : "border-slate-850"}`}>
              <h3 className={`text-base font-black capitalize ${isLightMode ? "text-slate-800" : "text-white"}`}>
                {modalType === "add" ? "Tambah" : "Edit"} {activeTab === "media" ? "Postingan Media" : activeTab === "perpus" ? "Berkas Perpus" : activeTab === "doctors" ? "Data Dokter" : activeTab === "clinics" ? "Profil Poliklinik" : activeTab === "beds" ? "Kapasitas Bed" : activeTab === "directors" ? "Data Direksi" : "Slide Hero Banner"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className={`p-1 rounded-lg border cursor-pointer ${
                  isLightMode ? "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200" : "border-slate-800 bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* FORM INPUTS MATCHING CURRENT ACTIVE TAB */}
            {activeTab === "media" && (
              <form onSubmit={handleMediaSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Judul Postingan</label>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan judul berita/artikel..."
                    value={mediaTitle}
                    onChange={(e) => setMediaTitle(e.target.value)}
                    className={`w-full text-xs font-bold rounded-xl p-3 focus:outline-none focus:border-emerald-500 ${
                      isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                    }`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Kategori</label>
                    <select
                      value={mediaCategory}
                      onChange={(e) => setMediaCategory(e.target.value as any)}
                      className={`w-full text-xs font-bold rounded-xl p-3 focus:outline-none focus:border-emerald-500 ${
                        isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                      }`}
                    >
                      <option value="berita">Berita</option>
                      <option value="artikel">Artikel</option>
                      <option value="kegiatan">Kegiatan</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Badge/Label</label>
                    <input
                      type="text"
                      placeholder="Contoh: PRESTASI, EDUKASI"
                      value={mediaBadge}
                      onChange={(e) => setMediaBadge(e.target.value)}
                      className={`w-full text-xs font-bold rounded-xl p-3 focus:outline-none focus:border-emerald-500 ${
                        isLightMode ? "bg-slate-50 border border-slate-200 text-slate-805" : "bg-slate-900 border border-slate-800 text-white"
                      }`}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Cover Gambar (Folder)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setMediaImage(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className={`w-full text-xs rounded-xl p-3 focus:outline-none focus:border-emerald-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-emerald-950 file:text-emerald-400 hover:file:bg-emerald-900 ${
                      isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                    }`}
                  />
                  {mediaImage && (
                    <div className="mt-2 w-16 h-16 rounded-xl overflow-hidden border border-slate-200">
                      <img src={mediaImage} alt="Cover Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Isi Konten Postingan</label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Masukkan narasi atau artikel berita lengkap..."
                    value={mediaContent}
                    onChange={(e) => setMediaContent(e.target.value)}
                    className={`w-full text-xs font-medium rounded-xl p-3 focus:outline-none focus:border-emerald-500 resize-none ${
                      isLightMode ? "bg-slate-50 border border-slate-200 text-slate-850" : "bg-slate-900 border border-slate-800 text-white"
                    }`}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl p-3.5 text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Simpan Postingan</span>
                </button>
              </form>
            )}

            {activeTab === "perpus" && (
              <form onSubmit={handlePerpusSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Judul Dokumen</label>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan judul dokumen perpustakaan..."
                    value={perpusTitle}
                    onChange={(e) => setPerpusTitle(e.target.value)}
                    className={`w-full text-xs font-bold rounded-xl p-3 focus:outline-none focus:border-emerald-500 ${
                      isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                    }`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Kategori</label>
                    <select
                      value={perpusCategory}
                      onChange={(e) => setPerpusCategory(e.target.value as any)}
                      className={`w-full text-xs font-bold rounded-xl p-3 focus:outline-none focus:border-emerald-500 ${
                        isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                      }`}
                    >
                      <option value="buku">Buku</option>
                      <option value="jurnal">Jurnal</option>
                      <option value="panduan">Panduan</option>
                      <option value="presentasi">Presentasi</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Nama File PDF/PPT</label>
                    <input
                      type="text"
                      required
                      placeholder="panduan-klaim-bpjs.pdf"
                      value={perpusFileName}
                      onChange={(e) => setPerpusFileName(e.target.value)}
                      className={`w-full text-xs font-bold rounded-xl p-3 focus:outline-none focus:border-emerald-500 ${
                        isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                      }`}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Cover Gambar (Folder)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setPerpusImage(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className={`w-full text-xs rounded-xl p-3 focus:outline-none focus:border-emerald-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-emerald-950 file:text-emerald-450 hover:file:bg-emerald-900 ${
                      isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                    }`}
                  />
                  {perpusImage && (
                    <div className="mt-2 w-12 h-12 rounded-xl overflow-hidden border border-slate-200">
                      <img src={perpusImage} alt="Cover Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Upload Berkas Dokumen (PDF, PPT, dll)</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPerpusFileName(file.name);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setPerpusFileUrl(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className={`w-full text-xs rounded-xl p-3 focus:outline-none focus:border-emerald-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-emerald-950 file:text-emerald-450 hover:file:bg-emerald-900 ${
                      isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                    }`}
                  />
                  {perpusFileUrl && (
                    <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1 mt-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Berkas "{perpusFileName}" siap disimpan!</span>
                    </span>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Deskripsi Singkat</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tuliskan sinopsis buku atau rincian dokumen panduan..."
                    value={perpusDesc}
                    onChange={(e) => setPerpusDesc(e.target.value)}
                    className={`w-full text-xs font-medium rounded-xl p-3 focus:outline-none focus:border-emerald-500 resize-none ${
                      isLightMode ? "bg-slate-50 border border-slate-200 text-slate-850" : "bg-slate-900 border border-slate-800 text-white"
                    }`}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl p-3.5 text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Simpan Dokumen</span>
                </button>
              </form>
            )}

            {activeTab === "doctors" && (
              <form onSubmit={handleDoctorSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Nama Dokter</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: dr. Ahmad Syuhada, Sp.M(K)"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    className={`w-full text-xs font-bold rounded-xl p-3 focus:outline-none focus:border-emerald-500 ${
                      isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                    }`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Spesialisasi</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Vitreoretina"
                      value={docSpec}
                      onChange={(e) => setDocSpec(e.target.value)}
                      className={`w-full text-xs font-bold rounded-xl p-3 focus:outline-none focus:border-emerald-500 ${
                        isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                      }`}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Kategori Menu</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Vitreoretina"
                      value={docCategory}
                      onChange={(e) => setDocCategory(e.target.value)}
                      className={`w-full text-xs font-bold rounded-xl p-3 focus:outline-none focus:border-emerald-500 ${
                        isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                      }`}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Poliklinik Asosiasi</label>
                    <select
                      value={docClinic}
                      onChange={(e) => setDocClinic(e.target.value)}
                      className={`w-full text-xs font-bold rounded-xl p-3 focus:outline-none focus:border-emerald-500 ${
                        isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                      }`}
                    >
                      {clinics.map((c) => (
                        <option key={c.id} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Foto Dokter (Folder)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setDocImage(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className={`w-full text-xs rounded-xl p-3 focus:outline-none focus:border-emerald-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-emerald-950 file:text-emerald-450 hover:file:bg-emerald-900 ${
                        isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                      }`}
                    />
                    {docImage && (
                      <div className="mt-2 w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                        <img src={docImage} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Jadwal Praktek (Format: Hari: Jam, Pisahkan baris baru untuk beberapa jadwal)
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Senin - Rabu: 08:00 - 12:00&#10;Kamis: 13:00 - 15:30"
                    value={docScheduleRaw}
                    onChange={(e) => setDocScheduleRaw(e.target.value)}
                    className={`w-full text-xs font-mono rounded-xl p-3 focus:outline-none focus:border-emerald-500 resize-none ${
                      isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-emerald-400"
                    }`}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl p-3.5 text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Simpan Data Dokter</span>
                </button>
              </form>
            )}

            {activeTab === "clinics" && (
              <form onSubmit={handleClinicSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Nama Poliklinik</label>
                  <input
                    type="text"
                    required
                    disabled
                    value={clinicName}
                    className={`w-full text-xs font-bold rounded-xl p-3 ${
                      isLightMode ? "bg-slate-100 border border-slate-200 text-slate-500" : "bg-slate-900 border border-slate-800 text-slate-500"
                    }`}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Foto Sampul Poliklinik (Folder)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setClinicImage(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className={`w-full text-xs rounded-xl p-3 focus:outline-none focus:border-emerald-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-emerald-950 file:text-emerald-450 hover:file:bg-emerald-900 ${
                      isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                    }`}
                  />
                  {clinicImage && (
                    <div className="mt-2 w-16 h-12 rounded-xl overflow-hidden border border-slate-350/40">
                      <img src={clinicImage} alt="Clinic Cover Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Fasilitas Medis (Pisahkan dengan tanda koma)</label>
                  <input
                    type="text"
                    placeholder="OCT Scan, Slit Lamp, Auto Refractometer"
                    value={clinicFacilitiesText}
                    onChange={(e) => setClinicFacilitiesText(e.target.value)}
                    className={`w-full text-xs font-bold rounded-xl p-3 focus:outline-none focus:border-emerald-500 ${
                      isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                    }`}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Deskripsi Poliklinik</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tulis rincian profil poliklinik spesialis mata..."
                    value={clinicDesc}
                    onChange={(e) => setClinicDesc(e.target.value)}
                    className={`w-full text-xs font-medium rounded-xl p-3 focus:outline-none focus:border-emerald-500 resize-none ${
                      isLightMode ? "bg-slate-50 border border-slate-200 text-slate-850" : "bg-slate-900 border border-slate-800 text-white"
                    }`}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl p-3.5 text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Perbarui Poliklinik</span>
                </button>
              </form>
            )}

            {activeTab === "beds" && (
              <form onSubmit={handleBedSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Kelas Rawat Inap</label>
                  <input
                    type="text"
                    required
                    disabled
                    value={bedClassName}
                    className={`w-full text-xs font-bold rounded-xl p-3 ${
                      isLightMode ? "bg-slate-100 border border-slate-200 text-slate-500" : "bg-slate-900 border border-slate-800 text-slate-500"
                    }`}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Kapasitas Total</label>
                    <input
                      type="number"
                      required
                      value={bedTotal}
                      onChange={(e) => {
                        const total = Number(e.target.value);
                        setBedTotal(total);
                        setBedAvailable(total - bedFilled);
                      }}
                      className={`w-full text-xs font-bold rounded-xl p-3 focus:outline-none focus:border-emerald-500 ${
                        isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                      }`}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Terisi</label>
                    <input
                      type="number"
                      required
                      value={bedFilled}
                      onChange={(e) => {
                        const filled = Number(e.target.value);
                        setBedFilled(filled);
                        setBedAvailable(bedTotal - filled);
                      }}
                      className={`w-full text-xs font-bold rounded-xl p-3 focus:outline-none focus:border-emerald-500 ${
                        isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                      }`}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tersedia (Kosong)</label>
                    <input
                      type="number"
                      required
                      disabled
                      value={bedAvailable}
                      className={`w-full text-xs font-bold rounded-xl p-3 ${
                        isLightMode ? "bg-slate-100 border border-slate-200 text-slate-500" : "bg-slate-900 border border-slate-800 text-slate-500"
                      }`}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl p-3.5 text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Perbarui Kapasitas Bed</span>
                </button>
              </form>
            )}

            {activeTab === "directors" && (
              <form onSubmit={handleDirectorSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Nama Pejabat Direksi</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: dr. Lady Kavotiner, Sp.M"
                    value={dirName}
                    onChange={(e) => setDirName(e.target.value)}
                    className={`w-full text-xs font-bold rounded-xl p-3 focus:outline-none focus:border-emerald-500 ${
                      isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                    }`}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Jabatan</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Direktur Utama"
                    value={dirPos}
                    onChange={(e) => setDirPos(e.target.value)}
                    className={`w-full text-xs font-bold rounded-xl p-3 focus:outline-none focus:border-emerald-500 ${
                      isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                    }`}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Foto Pejabat Direksi (Folder)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setDirImage(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className={`w-full text-xs rounded-xl p-3 focus:outline-none focus:border-emerald-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-emerald-950 file:text-emerald-450 hover:file:bg-emerald-900 ${
                      isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                    }`}
                  />
                  {dirImage && (
                    <div className="mt-2 w-16 h-16 rounded-xl overflow-hidden border border-slate-350/40">
                      <img src={dirImage} alt="Director Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl p-3.5 text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Simpan Data Direksi</span>
                </button>
              </form>
            )}

            {activeTab === "hero" && (
              <form onSubmit={handleHeroSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Judul Banner Slide</label>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan judul banner utama..."
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    className={`w-full text-xs font-bold rounded-xl p-3 focus:outline-none focus:border-emerald-500 ${
                      isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                    }`}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Subjudul Deskripsi</label>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan narasi pendukung slide..."
                    value={heroSubtitle}
                    onChange={(e) => setHeroSubtitle(e.target.value)}
                    className={`w-full text-xs font-bold rounded-xl p-3 focus:outline-none focus:border-emerald-500 ${
                      isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                    }`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Badge/Label</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: LAYANAN MATA"
                      value={heroBadge}
                      onChange={(e) => setHeroBadge(e.target.value)}
                      className={`w-full text-xs font-bold rounded-xl p-3 focus:outline-none focus:border-emerald-500 ${
                        isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                      }`}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Urutan Slide (Index)</label>
                    <input
                      type="number"
                      required
                      value={heroOrder}
                      onChange={(e) => setHeroOrder(Number(e.target.value))}
                      className={`w-full text-xs font-bold rounded-xl p-3 focus:outline-none focus:border-emerald-500 ${
                        isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                      }`}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Foto Slide Banner (Folder)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setHeroImage(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className={`w-full text-xs rounded-xl p-3 focus:outline-none focus:border-emerald-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-emerald-950 file:text-emerald-450 hover:file:bg-emerald-900 ${
                      isLightMode ? "bg-slate-50 border border-slate-200 text-slate-800" : "bg-slate-900 border border-slate-800 text-white"
                    }`}
                  />
                  {heroImage && (
                    <div className="mt-2 w-16 h-10 rounded-xl overflow-hidden border border-slate-350/40">
                      <img src={heroImage} alt="Hero Slide Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl p-3.5 text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Simpan Foto Banner</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
