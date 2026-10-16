auth.onAuthStateChanged((user) => {
  const currentPath = window.location.pathname;
  const isLoginPage = currentPath.includes("index.html") || currentPath.endsWith("/");
  const isDashboardPage = currentPath.includes("dashboard.html");
  const namaUser = document.getElementById("namaUser");

  if (user) {
    currentUser = user;
    const usernameAsli = user.email.replace("@gmail.com", "");
    if (namaUser) namaUser.innerText = usernameAsli;

    const selectTribulan = document.getElementById("pilihTribulan");
    if (selectTribulan) tribulanAktif = selectTribulan.value;

    // Jika pengguna sudah login tapi berada di index.html, arahkan ke dashboard
    if (isLoginPage) {
      window.location.href = "dashboard.html";
      return;
    }

    // Tentukan role & tipe koleksi Firestore
    if (usernameAsli.startsWith("admin")) {
      aturTampilanBerdasarkanRole("admin");
      tarikSemuaDataAdmin(); // Memuat rekapitulasi data RSUD & Puskesmas
    } 
    else if (usernameAsli.startsWith("rsud_")) {
      tipeKoleksi = "evaluasi_kinerja_rsud";
      formRef = db.collection(tipeKoleksi).doc(`${user.uid}_${tribulanAktif}`); 
      
      aturTampilanBerdasarkanRole("rsud");
      muatDataDariFirebase(); // Memuat khusus data RSUD
    } 
    else if (usernameAsli.startsWith("pkm_")) {
      tipeKoleksi = "evaluasi_kinerja_pkm";
      formRef = db.collection(tipeKoleksi).doc(`${user.uid}_${tribulanAktif}`);
      
      aturTampilanBerdasarkanRole("pkm");
      muatDataDariFirebase(); // Memuat khusus data PKM
    } 
    else {
      alert("Akses Ditolak: Kategori pengguna tidak dikenali.");
      auth.signOut();
    }

  } else {
    currentUser = null;
    formRef = null;
    // Jika belum login dan mencoba masuk ke dashboard, redirect ke index.html
    if (isDashboardPage) {
      window.location.href = "index.html";
    }
  }
});









function aturTampilanBerdasarkanRole(role) {
  // Ambil elemen-elemen navigasi/menu
  const menuPenilaian = document.getElementById("navPenilaian");
  const menuLaporan = document.getElementById("navLaporan");
  const menuAdmin = document.getElementById("navAdminRecap");
  
  // Ambil kontainer ringkasan / section di halaman
  const sectionPenilaian = document.getElementById("sectionPenilaianForm");
  const ringkasanUser = document.getElementById("ringkasanUser");
  const ringkasanAdmin = document.getElementById("ringkasanAdmin");

  if (role === "admin") {
    // ADMIN:
    // - Sembunyikan menu & form penilaian
    if (menuPenilaian) menuPenilaian.style.display = "none";
    if (sectionPenilaian) sectionPenilaian.style.display = "none";

    // - Tampilkan menu rekapitulasi & ringkasan admin (gabungan RSUD & PKM)
    if (menuAdmin) menuAdmin.style.display = "block";
    if (ringkasanAdmin) ringkasanAdmin.style.display = "block";
    if (ringkasanUser) ringkasanUser.style.display = "none";
  } 
  else if (role === "rsud" || role === "pkm") {
    // RSUD & PUSKESMAS:
    // - Tampilkan menu penilaian & laporan milik masing-masing
    if (menuPenilaian) menuPenilaian.style.display = "block";
    if (menuLaporan) menuLaporan.style.display = "block";
    
    // - Sembunyikan menu khusus rekapitulasi admin
    if (menuAdmin) menuAdmin.style.display = "none";
    if (ringkasanAdmin) ringkasanAdmin.style.display = "none";
    if (ringkasanUser) ringkasanUser.style.display = "block";

    // Opsi Tambahan: Jika ada indikator/pertanyaan khusus RSUD vs PKM di form penilaian
    const indikatorRsud = document.querySelectorAll(".khusus-rsud");
    const indikatorPkm = document.querySelectorAll(".khusus-pkm");

    if (role === "rsud") {
      indikatorRsud.forEach(el => el.style.display = "block");
      indikatorPkm.forEach(el => el.style.display = "none");
    } else {
      indikatorRsud.forEach(el => el.style.display = "none");
      indikatorPkm.forEach(el => el.style.display = "block");
    }
  }
}