// ========================================================
// 1. CONFIG & INITIALIZATION FIREBASE (CLOUD FIRESTORE)
// ========================================================
const firebaseConfig = {
  apiKey: "AIzaSyAGoWJ5UfF1lyQAhEiR06f6Qm_uDc_Xo0w",
  authDomain: "lap-bsc.firebaseapp.com",
  projectId: "lap-bsc",
  storageBucket: "lap-bsc.firebasestorage.app",
  messagingSenderId: "1075222206362",
  appId: "1:1075222206362:web:acb8cb5839cd58560b8c23",
  measurementId: "G-3NWWX99KPP",
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

let currentUser = null;
let formRef = null;
let currentRole = ""; // Menyimpan role aktif (admin / rsud / pkm)
let currentNamaInstansi = ""; // Menyimpan nama resmi instansi aktif

// Variabel Global Baru
let tribulanAktif = "TW1-2026";
let tipeKoleksi = ""; // Menyimpan jenis database (rsud / pkm)
let isSedangMemuat = false;

// ========================================================
// 2. SISTEM LOGIN & LOGOUT (Multi-Dashboard: RSUD & PKM)
// ========================================================
auth.onAuthStateChanged((user) => {
  const currentPath = window.location.pathname;
  const isLoginPage =
    currentPath.includes("index.html") || currentPath.endsWith("/");
  const isDashboardPage = currentPath.includes("dashboard.html");
  const isPenilaianPage =
    currentPath.includes("penilaian-rsud.html") ||
    currentPath.includes("penilaian-pkm.html");

  if (user) {
    currentUser = user;

    // AMBIL PROFIL DARI KOLEKSI 'users' DI FIRESTORE BERDASARKAN UID
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          currentRole = userData.opd; // Misal: "rsud_bangil", "pkm_purworejo", atau "admin"
          currentNamaInstansi = userData.namaInstansi || "Administrator";
          // PERBAIKAN: Jika di database masih "Administrator", paksa generate dari format role

          // Tampilkan Nama Instansi Resmi ke SEMUA elemen dengan class="namaUser"
          document.querySelectorAll(".namaUser").forEach((el) => {
            el.innerText = currentNamaInstansi;
          });

          const selectTribulan = document.getElementById("pilihTribulan");
          if (selectTribulan) tribulanAktif = selectTribulan.value;

          if (isLoginPage) {
            window.location.href = "dashboard.html";
            return;
          }

          // JIKA BERADA DI HALAMAN LAPORAN, LANGSUNG TARIK DATA SESUAI USER
          if (currentPath.includes("laporan.html")) {
            if (typeof tarikSemuaDataAdmin === "function") {
              tarikSemuaDataAdmin();
            }
          }

          // Tentukan Hak Akses & Koleksi Database Berdasarkan Atribut 'opd' di Database
          if (currentRole === "admin") {
            aturTampilanBerdasarkanRole("admin");
            if (currentPath.includes("user-login.html")) {
              tarikDaftarUserAdmin();
            } else if (typeof tarikSemuaDataAdmin === "function") {
              tarikSemuaDataAdmin();
            }
          } else if (currentRole.startsWith("rsud_")) {
            tipeKoleksi = "evaluasi_kinerja_rsud";
            formRef = db
              .collection(tipeKoleksi)
              .doc(`${user.uid}_${tribulanAktif}`);
            aturTampilanBerdasarkanRole("rsud");

            if (currentPath.includes("penilaian-pkm.html")) {
              window.location.href = "penilaian-rsud.html";
            } else if (
              !currentPath.includes("laporan.html") &&
              typeof muatDataDariFirebase === "function"
            ) {
              muatDataDariFirebase();
            }
          } else if (currentRole.startsWith("pkm_")) {
            tipeKoleksi = "evaluasi_kinerja_pkm";
            // Khusus PKM, formRef merujuk ke dokumen rawat inap secara default untuk pemuatan awal
            formRef = db
              .collection(tipeKoleksi)
              .doc(`${user.uid}_${tribulanAktif}_rawatinap`);
            aturTampilanBerdasarkanRole("pkm");

            if (currentPath.includes("penilaian-rsud.html")) {
              window.location.href = "penilaian-pkm.html";
            } else if (
              !currentPath.includes("laporan.html") &&
              typeof muatDataDariFirebase === "function"
            ) {
              muatDataDariFirebase();
            }
          } else {
            alert("Akses Ditolak: Profil instansi tidak valid.");
            auth.signOut();
          }
        } else {
          alert(
            "Akses Ditolak: Data profil user tidak ditemukan di database sistem.",
          );
          auth.signOut();
        }
      })
      .catch((err) => {
        console.error("Gagal memuat profil:", err);
      });
  } else {
    currentUser = null;
    formRef = null;
    currentRole = "";
    currentNamaInstansi = "";
    if (
      isDashboardPage ||
      isPenilaianPage ||
      currentPath.includes("laporan.html")
    ) {
      window.location.href = "index.html";
    }
  }
});

// ========================================================
// Mengatur tampilan menu berdasarkan role pengguna
// ========================================================
function aturTampilanBerdasarkanRole(role) {
  const menuRsud = document.getElementById("menuPenilaianRsud");
  const menuPkm = document.getElementById("menuPenilaianPkm");
  const menuUser = document.getElementById("menuUserLogin");
  const menuDashboard = document.getElementById("menuDashboard");
  const menuLaporan = document.getElementById("menuLaporan");
  const sectionAdminRecap = document.getElementById("sectionAdminRecap");
  const wrapperOpdAdmin = document.getElementById("wrapperPilihOpdAdmin");
  const rekappredikat = document.getElementById("sectionAdminRekapPredikat");

  if (menuRsud) {
    menuRsud.style.display = "none";
    menuRsud.classList.remove("tampil-menu");
  }
  if (menuPkm) {
    menuPkm.style.display = "none";
    menuPkm.classList.remove("tampil-menu");
  }
  if (menuUser) {
    menuUser.style.display = "none";
    menuUser.classList.remove("tampil-menu");
  }
  if (sectionAdminRecap) {
    sectionAdminRecap.style.display = "none";
    sectionAdminRecap.classList.remove("tampil-menu");
  }
  if (wrapperOpdAdmin) {
    wrapperOpdAdmin.style.display = "none";
  }

  if (role === "admin") {
    if (menuRsud) {
      menuRsud.style.display = "block";
      menuRsud.classList.add("tampil-menu");
      menuLaporan.style.display = "block";
      menuLaporan.classList.add("tampil-menu");
      menuDashboard.style.display = "block";
      menuDashboard.classList.add("tampil-menu");
    }
    if (wrapperOpdAdmin) {
      wrapperOpdAdmin.style.display = "block";
    }
    if (rekappredikat) {
      rekappredikat.style.display = "block";
    }
    if (menuPkm) {
      menuPkm.style.display = "block";
      menuPkm.classList.add("tampil-menu");
      menuLaporan.style.display = "block";
      menuLaporan.classList.add("tampil-menu");
      menuDashboard.style.display = "block";
      menuDashboard.classList.add("tampil-menu");
    }
    if (menuUser) {
      menuUser.style.display = "block";
      menuUser.classList.add("tampil-menu");
      menuLaporan.style.display = "block";
      menuLaporan.classList.add("tampil-menu");
      menuDashboard.style.display = "block";
      menuDashboard.classList.add("tampil-menu");
    }
    if (sectionAdminRecap) {
      sectionAdminRecap.style.display = "block";
      sectionAdminRecap.classList.add("tampil-menu");
    }
  } else if (role === "rsud") {
    if (menuRsud) {
      menuRsud.style.display = "block";
      menuRsud.classList.add("tampil-menu");
      menuLaporan.style.display = "block";
      menuLaporan.classList.add("tampil-menu");
      menuDashboard.style.display = "block";
      menuDashboard.classList.add("tampil-menu");
    }
  } else if (role === "pkm") {
    if (menuPkm) {
      menuPkm.style.display = "block";
      menuPkm.classList.add("tampil-menu");
      menuLaporan.style.display = "block";
      menuLaporan.classList.add("tampil-menu");
      menuDashboard.style.display = "block";
      menuDashboard.classList.add("tampil-menu");
    }
  }
}

async function gantiOpdAdmin() {
  const selectOpd = document.getElementById("pilihOpdAdmin");
  const selectTribulan = document.getElementById("pilihTribulan");
  if (!selectOpd || !selectTribulan) return;

  const opdTerpilih = selectOpd.value;
  const triwulanTerpilih = selectTribulan.value;

  if (!opdTerpilih) {
    document
      .querySelectorAll('input[type="number"], select')
      .forEach((input) => {
        if (input.id !== "pilihTribulan" && input.id !== "pilihOpdAdmin")
          input.value = "";
      });
    document
      .querySelectorAll('[id^="skor_"], [id^="subTotal_"]')
      .forEach((el) => (el.innerText = "0.00"));
    formRef = null;
    return;
  }

  if (opdTerpilih.startsWith("rsud_")) {
    tipeKoleksi = "evaluasi_kinerja_rsud";
  } else if (opdTerpilih.startsWith("pkm_")) {
    tipeKoleksi = "evaluasi_kinerja_pkm";
  }

  try {
    const userSnapshot = await db
      .collection("users")
      .where("opd", "==", opdTerpilih)
      .get();

    if (userSnapshot.empty) {
      alert("Profil instansi tidak ditemukan di database pengguna sistem.");
      return;
    }

    const userData = userSnapshot.docs[0].data();
    const targetUid = userData.uid;

    if (tipeKoleksi === "evaluasi_kinerja_pkm") {
      formRef = db
        .collection(tipeKoleksi)
        .doc(`${targetUid}_${triwulanTerpilih}_rawatinap`);
    } else {
      formRef = db
        .collection(tipeKoleksi)
        .doc(`${targetUid}_${triwulanTerpilih}`);
    }

    document
      .querySelectorAll('input[type="number"], select')
      .forEach((input) => {
        if (input.id !== "pilihTribulan" && input.id !== "pilihOpdAdmin")
          input.value = "";
      });
    document
      .querySelectorAll('[id^="skor_"], [id^="subTotal_"]')
      .forEach((el) => (el.innerText = "0.00"));

    // Gunakan fungsi yang benar tanpa kata 'Async' di belakangnya
    muatDataDariFirebase();
    muatRingkasanDashboard();
  } catch (error) {
    console.error("Gagal memuat data instansi untuk admin:", error);
    alert("Terjadi kesalahan saat mengambil data: " + error.message);
  }
}

function gantiTribulan() {
  const selectTribulan = document.getElementById("pilihTribulan");
  if (!selectTribulan || !currentUser || !tipeKoleksi) return;

  tribulanAktif = selectTribulan.value;
  if (tipeKoleksi === "evaluasi_kinerja_pkm") {
    formRef = db
      .collection(tipeKoleksi)
      .doc(`${currentUser.uid}_${tribulanAktif}_rawatinap`);
  } else {
    formRef = db
      .collection(tipeKoleksi)
      .doc(`${currentUser.uid}_${tribulanAktif}`);
  }

  document.querySelectorAll('input[type="number"], select').forEach((input) => {
    if (input.id !== "pilihTribulan") input.value = "";
  });
  document
    .querySelectorAll('[id^="skor_"], [id^="subTotal_"]')
    .forEach((el) => (el.innerText = "0.00"));

  muatDataDariFirebase();
  muatRingkasanDashboard();
}

function aksiLogin() {
  const emailLengkap = document.getElementById("inputEmail").value.trim();
  const password = document.getElementById("inputPassword").value;

  if (!emailLengkap || !password) {
    alert("Harap isi Email dan Password dengan lengkap!");
    return;
  }

  auth
    .signInWithEmailAndPassword(emailLengkap, password)
    .then((userCredential) => {
      alert("Berhasil masuk sebagai " + emailLengkap);
    })
    .catch((error) => {
      alert("Login Gagal: " + error.message);
    });
}

function togglePassword() {
  const input = document.getElementById("inputPassword");
  const icon = document.getElementById("iconPassword");

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

function logoutUser() {
  const konfirmasi = confirm("Apakah Anda yakin ingin keluar?");
  if (konfirmasi) {
    auth.signOut();
  }
}

// ========================================================
// 3. FUNGSI PENYIMPANAN CLOUD FIRESTORE
// ========================================================
function simpanKeFirebase(namaPoin, nilaiRealisasi, nilaiTarget, skorAkhir) {
  if (!currentUser || !formRef || isSedangMemuat) return;

  let dataObjek = {};
  dataObjek[`real_${namaPoin}`] = nilaiRealisasi;
  if (nilaiTarget !== null) {
    dataObjek[`target_${namaPoin}`] = nilaiTarget;
  }
  dataObjek[`skor_${namaPoin}`] = skorAkhir;

  formRef.set(dataObjek, { merge: true }).catch((err) => {
    console.error("Gagal menyimpan ke Firestore:", err);
  });
}

function muatDataDariFirebase() {
  if (!formRef) return;
  isSedangMemuat = true;

  formRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        let daftarPoinUnik = new Set();

        for (const [key, value] of Object.entries(data)) {
          let elemen = document.getElementById(key);

          if (!elemen && key.startsWith("real_")) {
            const poinMurni = key.replace("real_", "");
            elemen = document.getElementById(`select_${poinMurni}`);
          }

          if (
            elemen &&
            (elemen.tagName === "INPUT" || elemen.tagName === "SELECT")
          ) {
            elemen.value = value;
          }

          let namaPoin = "";
          if (key.startsWith("real_")) namaPoin = key.replace("real_", "");
          else if (key.startsWith("target_"))
            namaPoin = key.replace("target_", "");
          else if (key.startsWith("select_"))
            namaPoin = key.replace("select_", "");

          if (namaPoin && !namaPoin.includes("_Total")) {
            daftarPoinUnik.add(namaPoin);
          }
        }

        daftarPoinUnik.forEach((poin) => {
          if (typeof hitungSkorOtomatis === "function") {
            hitungSkorOtomatis(poin);
          }
        });

        if (typeof hitungTotalPoin11 === "function") hitungTotalPoin11();
        if (typeof hitungTotalPoin21 === "function") hitungTotalPoin21();
        if (typeof hitungTotalPoin31 === "function") hitungTotalPoin31();
        if (typeof hitungTotalPoin41 === "function") hitungTotalPoin41();
        if (typeof hitungGrandTotal === "function") hitungGrandTotal();
      }

      setTimeout(() => {
        isSedangMemuat = false;
      }, 500);
    })
    .catch((error) => {
      console.error("Gagal memuat data dari Firebase: ", error);
      isSedangMemuat = false;
    });
}

// ========================================================
// TARIK DATA KHUSUS UNTUK DASHBOARD ADMIN
// ========================================================
async function muatRekapPredikatAdmin() {
  const tabelRef = document.getElementById("tabelRekapPredikatAdmin");
  if (!tabelRef) return;

  tabelRef.innerHTML = `<tr><td colspan="5" class="text-center">Mengambil data rekap...</td></tr>`;

  try {
    let htmlTabel = "";
    let nomor = 1;

    let targetKoleksi = ["evaluasi_kinerja_rsud", "evaluasi_kinerja_pkm"];

    for (let colName of targetKoleksi) {
      const snapshot = await db.collection(colName).get();
      snapshot.forEach((doc) => {
        const data = doc.data();
        const idParts = doc.id.split("_");
        const triwulan = idParts[1] || "-";

        let tambahanLabel = "";
        if (colName === "evaluasi_kinerja_pkm") {
          if (doc.id.includes("nonrawatinap"))
            tambahanLabel = " (Non-Rawat Inap)";
          else if (doc.id.includes("rawatinap"))
            tambahanLabel = " (Rawat Inap)";
        }

        const namaInstansi = (data.nama_instansi || "Instansi") + tambahanLabel;

        let totalVal = parseFloat(data.grand_total) || 0;
        if (totalVal === 0) {
          const t1 = parseFloat(data.skor_11_Total) || 0;
          const t2 = parseFloat(data.skor_21_Total) || 0;
          const t3 = parseFloat(data.skor_31_Total) || 0;
          const t4 = parseFloat(data.skor_41_Total) || 0;
          totalVal = t1 + t2 + t3 + t4;
        }

        const totalStr = totalVal.toFixed(2);
        const predikat =
          data.predikat && data.predikat !== "-"
            ? data.predikat
            : tentukanPredikat(totalVal);

        // Badge warna predikat agar menarik
        let badgeClass = "bg-secondary";
        if (predikat.startsWith("AA")) badgeClass = "bg-success";
        else if (predikat.startsWith("A")) badgeClass = "bg-primary";
        else if (predikat.startsWith("BB")) badgeClass = "bg-info text-dark";
        else if (predikat.startsWith("B")) badgeClass = "bg-warning text-dark";
        else if (predikat.startsWith("C")) badgeClass = "bg-danger";

        htmlTabel += `
          <tr>
            <td>${nomor++}</td>
            <td><strong>${namaInstansi}</strong></td>
            <td>${triwulan}</td>
            <td><strong>${totalStr}</strong></td>
            <td><span class="badge ${badgeClass}">${predikat}</span></td>
          </tr>
        `;
      });
    }

    if (htmlTabel === "") {
      tabelRef.innerHTML = `<tr><td colspan="5" class="text-center">Belum ada data rekapitulasi ditemukan.</td></tr>`;
    } else {
      tabelRef.innerHTML = htmlTabel;
    }
  } catch (error) {
    console.error("Gagal memuat rekap admin:", error);
    tabelRef.innerHTML = `<tr><td colspan="5" class="text-center text-danger">Gagal memuat data: ${error.message}</td></tr>`;
  }
}

// ========================================================
// 4. FUNGSI KALKULASI & PENJUMLAHAN (Mendukung RI & NRI PKM)
// ========================================================
function ambilAngkaSaja(idElement) {
  const el = document.getElementById(idElement);
  if (!el) return 0;

  let teks = el.textContent.trim().replace(",", ".");
  if (teks.includes(":")) {
    teks = teks.split(":").pop().trim();
  }
  return parseFloat(teks) || 0;
}

function hitungSkorOtomatis(namaPoin) {
  // === JIKA SEDANG DI PUSKESMAS, LEMPAR KE FUNGSI KHUSUS PKM ===
  if (tipeKoleksi === "evaluasi_kinerja_pkm") {
    hitungSkorPkm(namaPoin);
    return;
  }

  // === LOGIKA ASLI RSUD (DIJAMIN TIDAK BERUBAH / AMAN) ===
  const elSkor = document.getElementById(`skor_${namaPoin}`);
  const elSubTotal = document.getElementById(`subTotal_${namaPoin}`);

  if (!elSkor) return;

  const elSelect = document.getElementById(`select_${namaPoin}`);
  if (elSelect) {
    const skorPilihan =
      parseFloat(elSelect.value.toString().replace(",", ".")) || 0;
    elSkor.innerText = skorPilihan.toFixed(2);
    if (elSubTotal) elSubTotal.innerText = skorPilihan.toFixed(2);
    cekDanHitungTotalKelompok(namaPoin);
    simpanKeFirebase(namaPoin, skorPilihan, null, skorPilihan);
    return;
  }

  const elReal = document.getElementById(`real_${namaPoin}`);
  if (!elReal) return;

  if (elReal.value.trim() === "") {
    elSkor.innerText = "Salah";
    if (elSubTotal) elSubTotal.innerText = "Salah";
    cekDanHitungTotalKelompok(namaPoin);
    simpanKeFirebase(namaPoin, "", null, 0);
    return;
  }

  const elTarget = document.getElementById(`target_${namaPoin}`);
  const realisasi = parseFloat(elReal.value.replace(",", ".")) || 0;
  let rasio = 0;

  if (elTarget) {
    const target = parseFloat(elTarget.value.replace(",", ".")) || 0;
    if (target === 0) {
      elSkor.innerText = "0.00";
      if (elSubTotal) elSubTotal.innerText = "0.00";
      cekDanHitungTotalKelompok(namaPoin);
      simpanKeFirebase(namaPoin, realisasi, target, 0);
      return;
    }
    rasio = realisasi / target;
  } else {
    rasio = realisasi;
  }

  if (namaPoin === "212_K" || namaPoin === "212K") {
    rasio = rasio * 1000;
  }
  if (namaPoin === "111_J6" || namaPoin === "111J6") {
    rasio = rasio / 60;
  }
  if (namaPoin === "212_I" || namaPoin === "212I") {
    rasio = rasio * 60;
  }

  let skorFinal = null;
  const daftarAturan = aturanPenilaian[namaPoin].kondisiSkor;

  for (let i = 0; i < daftarAturan.length; i++) {
    if (rasio <= daftarAturan[i].batas) {
      skorFinal = daftarAturan[i].nilai;
      break;
    }
  }

  if (skorFinal === null) {
    elSkor.innerText = "Salah";
    if (elSubTotal) elSubTotal.innerText = "Salah";
    skorFinal = 0;
  } else {
    elSkor.innerText = skorFinal.toFixed(2);
    if (elSubTotal) elSubTotal.innerText = skorFinal.toFixed(2);
  }

  cekDanHitungTotalKelompok(namaPoin);

  const nilaiTarget = elTarget
    ? parseFloat(elTarget.value.replace(",", ".")) || 0
    : null;
  simpanKeFirebase(namaPoin, realisasi, nilaiTarget, skorFinal);
}

function hitungSkorPkm(namaPoin) {
  const elSkor = document.getElementById(`skor_${namaPoin}`);
  const elSubTotal = document.getElementById(`subTotal_${namaPoin}`);
  if (!elSkor) return;

  let skorRI = 0;
  let skorNonRI = 0;
  let nilaiRealisasi = 0;
  let nilaiTarget = null;

  // Tentukan nama instansi
  let namaInstansiSimpan = currentNamaInstansi;
  if (
    !namaInstansiSimpan ||
    namaInstansiSimpan === "Administrator" ||
    namaInstansiSimpan === "admin"
  ) {
    if (currentRole.startsWith("pkm_")) {
      namaInstansiSimpan = formatNamaInstansi(currentRole);
    }
  }
  if (currentRole === "admin") {
    const selectOpd = document.getElementById("pilihOpdAdmin");
    if (
      selectOpd &&
      selectOpd.options[selectOpd.selectedIndex] &&
      selectOpd.value !== ""
    ) {
      namaInstansiSimpan = selectOpd.options[selectOpd.selectedIndex].text;
    }
  }

  // Cek apakah elemen menggunakan Select Option
  const elSelect = document.getElementById(`select_${namaPoin}`);
  if (elSelect) {
    const skorPilihan =
      parseFloat(elSelect.value.toString().replace(",", ".")) || 0;
    skorRI = skorPilihan;
    skorNonRI = skorPilihan;

    elSkor.innerText = skorRI.toFixed(2);
    if (elSubTotal) elSubTotal.innerText = skorRI.toFixed(2);

    tampilkanKotakNonRI(elSkor, namaPoin, skorNonRI);
    cekDanHitungTotalKelompok(namaPoin);
    // === CUKUP TAMBAHKAN BARIS INI (SAMA SEPERTI RSUD) ===
    simpanKeFirebase(namaPoin, skorPilihan, null, skorPilihan);
    return;
  }

  // Jika menggunakan Input Realisasi & Target biasa
  const elReal = document.getElementById(`real_${namaPoin}`);
  if (!elReal) return;

  if (elReal.value.trim() === "") {
    elSkor.innerText = "Salah";
    if (elSubTotal) elSubTotal.innerText = "Salah";
    hapusKotakNonRI(namaPoin);
    cekDanHitungTotalKelompok(namaPoin);
    return;
  }

  const elTarget = document.getElementById(`target_${namaPoin}`);
  nilaiRealisasi = parseFloat(elReal.value.replace(",", ".")) || 0;
  let rasio = 0;

  if (elTarget) {
    nilaiTarget = parseFloat(elTarget.value.replace(",", ".")) || 0;
    if (nilaiTarget === 0) {
      elSkor.innerText = "0.00";
      if (elSubTotal) elSubTotal.innerText = "0.00";
      tampilkanKotakNonRI(elSkor, namaPoin, 0);
      cekDanHitungTotalKelompok(namaPoin);
      return;
    }
    rasio = nilaiRealisasi / nilaiTarget;
  } else {
    rasio = nilaiRealisasi;
  }

  // Hitung Skor Rawat Inap
  if (
    typeof aturanPenilaian !== "undefined" &&
    aturanPenilaian.rawatInap &&
    aturanPenilaian.rawatInap[namaPoin]
  ) {
    const aturanRI = aturanPenilaian.rawatInap[namaPoin].kondisiSkor;
    for (let item of aturanRI) {
      if (rasio <= item.batas) {
        skorRI = item.nilai;
        break;
      }
    }
  }

  // Hitung Skor Non-Rawat Inap
  if (
    typeof aturanPenilaian !== "undefined" &&
    aturanPenilaian.nonRawatInap &&
    aturanPenilaian.nonRawatInap[namaPoin]
  ) {
    const aturanNonRI = aturanPenilaian.nonRawatInap[namaPoin].kondisiSkor;
    for (let item of aturanNonRI) {
      if (rasio <= item.batas) {
        skorNonRI = item.nilai;
        break;
      }
    }
  }

  // Tampilkan skor Rawat Inap di kotak utama
  elSkor.innerText = skorRI.toFixed(2);
  if (elSubTotal) elSubTotal.innerText = skorRI.toFixed(2);

  // TAMPILKAN KOTAK NON-RAWAT INAP DI SAMPINGNYA SECARA OTOMATIS
  tampilkanKotakNonRI(elSkor, namaPoin, skorNonRI);

  cekDanHitungTotalKelompok(namaPoin);
}

// Fungsi Bantu untuk Menampilkan / Memperbarui Kotak Non-RI di Layar
function tampilkanKotakNonRI(elSkor, namaPoin, skorNonRI) {
  let elSkorNonRI = document.getElementById(`skorNonRI_${namaPoin}`);
  if (!elSkorNonRI && elSkor.parentElement) {
    elSkorNonRI = document.createElement("span");
    elSkorNonRI.id = `skorNonRI_${namaPoin}`;
    elSkorNonRI.className = elSkor.className; // Meniru gaya kotak skor asli
    elSkorNonRI.style.marginLeft = "8px";
    elSkorNonRI.style.backgroundColor = "#e2e8f0"; // Warna latar sedikit berbeda agar bisa dibedakan
    elSkorNonRI.title = "Skor Non-Rawat Inap";
    elSkor.parentElement.appendChild(elSkorNonRI);
  }
  if (elSkorNonRI) {
    elSkorNonRI.innerText = skorNonRI.toFixed(2);
  }
}

function hapusKotakNonRI(namaPoin) {
  const elSkorNonRI = document.getElementById(`skorNonRI_${namaPoin}`);
  if (elSkorNonRI) elSkorNonRI.remove();
}

// Fungsi Bantu Kalkulasi Paralel Khusus PKM (Input Sekali, 2 Hasil)
function hitungDanSimpanPkmParalel(namaPoin, realisasi, nilaiTarget, rasio) {
  // 1. Hitung untuk Rawat Inap
  let skorRI = 0;
  if (aturanPenilaian.rawatInap && aturanPenilaian.rawatInap[namaPoin]) {
    const aturanRI = aturanPenilaian.rawatInap[namaPoin].kondisiSkor;
    for (let item of aturanRI) {
      if (rasio <= item.batas) {
        skorRI = item.nilai;
        break;
      }
    }
  }

  // 2. Hitung untuk Non-Rawat Inap
  let skorNonRI = 0;
  if (aturanPenilaian.nonRawatInap && aturanPenilaian.nonRawatInap[namaPoin]) {
    const aturanNonRI = aturanPenilaian.nonRawatInap[namaPoin].kondisiSkor;
    for (let item of aturanNonRI) {
      if (rasio <= item.batas) {
        skorNonRI = item.nilai;
        break;
      }
    }
  }

  // Tampilkan skor Rawat Inap secara default di layar form utama
  const elSkor = document.getElementById(`skor_${namaPoin}`);
  const elSubTotal = document.getElementById(`subTotal_${namaPoin}`);
  if (elSkor) elSkor.innerText = skorRI.toFixed(2);
  if (elSubTotal) elSubTotal.innerText = skorRI.toFixed(2);

  cekDanHitungTotalKelompok(namaPoin);

  // Simpan ke 2 dokumen Firestore secara otomatis di background
  if (currentUser) {
    let dataBase = {
      nama_instansi: currentNamaInstansi || "Puskesmas",
      updated_at: firebase.firestore.FieldValue.serverTimestamp(),
    };
    dataBase[`real_${namaPoin}`] = realisasi;
    if (nilaiTarget !== null) dataBase[`target_${namaPoin}`] = nilaiTarget;

    const docRefRI = db
      .collection("evaluasi_kinerja_pkm")
      .doc(`${currentUser.uid}_${tribulanAktif}_rawatinap`);
    const docRefNonRI = db
      .collection("evaluasi_kinerja_pkm")
      .doc(`${currentUser.uid}_${tribulanAktif}_nonrawatinap`);

    docRefRI
      .set({ ...dataBase, [`skor_${namaPoin}`]: skorRI }, { merge: true })
      .catch((err) => console.error(err));
    docRefNonRI
      .set({ ...dataBase, [`skor_${namaPoin}`]: skorNonRI }, { merge: true })
      .catch((err) => console.error(err));
  }
}

function cekDanHitungTotalKelompok(namaPoin) {
  // 1. Penanganan sub-poin spesifik
  if (namaPoin.includes("111_H")) hitungTotalPoinH();
  else if (namaPoin.includes("111_J")) hitungTotalPoinJ();
  else if (namaPoin.includes("314_A")) hitungTotalPoin314A();

  // Sub-poin khusus PKM hanya dipanggil jika tipe koleksinya PKM
  if (tipeKoleksi === "evaluasi_kinerja_pkm" && namaPoin.includes("111_A")) {
    if (typeof hitungTotalPoin111APkm === "function") hitungTotalPoin111APkm();
  }
  // Panggil Skor Total 111_B
  if (tipeKoleksi === "evaluasi_kinerja_pkm" && namaPoin.includes("111_B")) {
    if (typeof hitungTotalPoin111BPkm === "function") hitungTotalPoin111BPkm();
  }
  // Panggil Skor Total 111_C
  if (tipeKoleksi === "evaluasi_kinerja_pkm" && namaPoin.includes("111_C")) {
    if (typeof hitungTotalPoin111CPkm === "function") hitungTotalPoin111CPkm();
  }
  // Panggil Skor Total 111_D
  if (tipeKoleksi === "evaluasi_kinerja_pkm" && namaPoin.includes("111_D")) {
    if (typeof hitungTotalPoin111DPkm === "function") hitungTotalPoin111DPkm();
  }

  // 2. Penanganan kelompok utama berdasarkan awalan
  if (namaPoin.startsWith("111_")) {
    if (tipeKoleksi === "evaluasi_kinerja_pkm") {
      // Jalankan rumus khusus total 111 milik PKM
      if (typeof hitungTotalPoin111Pkm === "function") hitungTotalPoin111Pkm();
      if (typeof hitungTotalPoin111APkm === "function")
        hitungTotalPoin111APkm();
      if (typeof hitungTotalPoin111BPkm === "function")
        hitungTotalPoin111BPkm();
      if (typeof hitungTotalPoin111CPkm === "function")
        hitungTotalPoin111CPkm();
      if (typeof hitungTotalPoin111DPkm === "function")
        hitungTotalPoin111DPkm();
      hitungTotalPoin11(); // Akumulasi ke total level 11
    } else {
      // Jalankan murni rumus RSUD tanpa terganggu PKM
      hitungTotalPoin111();
      hitungTotalPoin11();
    }
  } else if (namaPoin.startsWith("211_")) {
    hitungTotalPoin211();
    hitungTotalPoin21();
  } else if (namaPoin.startsWith("212_")) {
    hitungTotalPoin212();
    hitungTotalPoin21();
  } else if (namaPoin.startsWith("311_")) {
    hitungTotalPoin311();
    hitungTotalPoin31();
  } else if (namaPoin.startsWith("312_")) {
    hitungTotalPoin312();
    hitungTotalPoin31();
  } else if (namaPoin.startsWith("313_")) {
    hitungTotalPoin313();
    hitungTotalPoin31();
  } else if (namaPoin.startsWith("314_")) {
    hitungTotalPoin314();
    hitungTotalPoin31();
  } else if (namaPoin.startsWith("315_")) {
    hitungTotalPoin315();
    hitungTotalPoin31();
  } else if (namaPoin.startsWith("411_")) {
    hitungTotalPoin411();
    hitungTotalPoin41();
  } else if (namaPoin.startsWith("412_")) {
    hitungTotalPoin412();
    hitungTotalPoin41();
  } else if (namaPoin.startsWith("413_")) {
    hitungTotalPoin413();
    hitungTotalPoin41();
  } else if (namaPoin.startsWith("414_")) {
    if (typeof hitungTotalPoin414 === "function") hitungTotalPoin414();
    hitungTotalPoin41();
  }
  hitungGrandTotal();
}

// ========================================================
// 5. TOTAL LEVEL 3 & 6. PENJUMLAHAN AKUMULASI UTAMA
// ========================================================
// ========================================================
// RUMUS PENJUMLAHAN RSUD
// ========================================================
function hitungTotalPoin111() {
  const total =
    ambilAngkaSaja("subTotal_111_A") +
    ambilAngkaSaja("subTotal_111_B") +
    ambilAngkaSaja("subTotal_111_C") +
    ambilAngkaSaja("subTotal_111_D") +
    ambilAngkaSaja("subTotal_111_E") +
    ambilAngkaSaja("subTotal_111_F") +
    ambilAngkaSaja("subTotal_111_G") +
    ambilAngkaSaja("skor_111_H_Total") +
    ambilAngkaSaja("subTotal_111_I") +
    ambilAngkaSaja("skor_111_J_Total") +
    ambilAngkaSaja("subTotal_111_K");
  const el = document.getElementById("skor_111_Total");
  if (el) el.innerText = total.toFixed(2);
}

function hitungTotalPoinH() {
  const totalH =
    ambilAngkaSaja("skor_111_H1") +
    ambilAngkaSaja("skor_111_H2") +
    ambilAngkaSaja("skor_111_H3");
  const elTotalH = document.getElementById("skor_111_H_Total");
  if (elTotalH) elTotalH.innerText = totalH.toFixed(2);
}

function hitungTotalPoinJ() {
  const totalJ =
    ambilAngkaSaja("skor_111_J1") +
    ambilAngkaSaja("skor_111_J2") +
    ambilAngkaSaja("skor_111_J3") +
    ambilAngkaSaja("skor_111_J4") +
    ambilAngkaSaja("skor_111_J5") +
    ambilAngkaSaja("skor_111_J6") +
    ambilAngkaSaja("skor_111_J7");
  const elTotalJ = document.getElementById("skor_111_J_Total");
  if (elTotalJ) elTotalJ.innerText = totalJ.toFixed(2);
}

function hitungTotalPoin211() {
  const total =
    ambilAngkaSaja("subTotal_211_A") +
    ambilAngkaSaja("subTotal_211_B") +
    ambilAngkaSaja("subTotal_211_C") +
    ambilAngkaSaja("subTotal_211_D") +
    ambilAngkaSaja("subTotal_211_E") +
    ambilAngkaSaja("subTotal_211_F") +
    ambilAngkaSaja("subTotal_211_G") +
    ambilAngkaSaja("subTotal_211_H") +
    ambilAngkaSaja("subTotal_211_I");
  const el = document.getElementById("skor_211_Total");
  if (el) el.innerText = total.toFixed(2);
}
function hitungTotalPoin212() {
  const total =
    ambilAngkaSaja("subTotal_212_A") +
    ambilAngkaSaja("subTotal_212_B") +
    ambilAngkaSaja("subTotal_212_C") +
    ambilAngkaSaja("subTotal_212_D") +
    ambilAngkaSaja("subTotal_212_E") +
    ambilAngkaSaja("subTotal_212_F") +
    ambilAngkaSaja("subTotal_212_G") +
    ambilAngkaSaja("subTotal_212_H") +
    ambilAngkaSaja("subTotal_212_I") +
    ambilAngkaSaja("subTotal_212_J") +
    ambilAngkaSaja("subTotal_212_K");
  const el = document.getElementById("skor_212_Total");
  if (el) el.innerText = total.toFixed(2);
}

function hitungTotalPoin311() {
  const total =
    ambilAngkaSaja("subTotal_311_A") +
    ambilAngkaSaja("subTotal_311_B") +
    ambilAngkaSaja("subTotal_311_C") +
    ambilAngkaSaja("subTotal_311_D") +
    ambilAngkaSaja("subTotal_311_E") +
    ambilAngkaSaja("subTotal_311_F") +
    ambilAngkaSaja("subTotal_311_G") +
    ambilAngkaSaja("subTotal_311_H") +
    ambilAngkaSaja("subTotal_311_I") +
    ambilAngkaSaja("subTotal_311_J") +
    ambilAngkaSaja("subTotal_311_K") +
    ambilAngkaSaja("subTotal_311_L") +
    ambilAngkaSaja("subTotal_311_M") +
    ambilAngkaSaja("subTotal_311_N") +
    ambilAngkaSaja("subTotal_311_O") +
    ambilAngkaSaja("subTotal_311_P");
  const el = document.getElementById("skor_311_Total");
  if (el) el.innerText = total.toFixed(2);
}
function hitungTotalPoin312() {
  const total =
    ambilAngkaSaja("subTotal_312_A") +
    ambilAngkaSaja("subTotal_312_B") +
    ambilAngkaSaja("subTotal_312_C") +
    ambilAngkaSaja("subTotal_312_D") +
    ambilAngkaSaja("subTotal_312_E") +
    ambilAngkaSaja("subTotal_312_F") +
    ambilAngkaSaja("subTotal_312_G") +
    ambilAngkaSaja("subTotal_312_H");
  const el = document.getElementById("skor_312_Total");
  if (el) el.innerText = total.toFixed(2);
}
function hitungTotalPoin313() {
  const total =
    ambilAngkaSaja("subTotal_313_A") +
    ambilAngkaSaja("subTotal_313_B") +
    ambilAngkaSaja("subTotal_313_C") +
    ambilAngkaSaja("subTotal_313_D") +
    ambilAngkaSaja("subTotal_313_E") +
    ambilAngkaSaja("subTotal_313_F");
  const el = document.getElementById("skor_313_Total");
  if (el) el.innerText = total.toFixed(2);
}

function hitungTotalPoin314() {
  const skor314Total = ambilAngkaSaja("skor_314_A_Total");
  const el = document.getElementById("skor_314_Total");
  if (el) el.innerText = skor314Total.toFixed(2);
}

function hitungTotalPoin314A() {
  const totalA =
    ambilAngkaSaja("skor_314_A1") +
    ambilAngkaSaja("skor_314_A2") +
    ambilAngkaSaja("skor_314_A3") +
    ambilAngkaSaja("skor_314_A4");
  const elTotalA = document.getElementById("skor_314_A_Total");
  if (elTotalA) elTotalA.innerText = totalA.toFixed(2);
}

function hitungTotalPoin315() {
  const skor315Total = ambilAngkaSaja("subTotal_315_A");
  const el = document.getElementById("skor_315_Total");
  if (el) el.innerText = skor315Total.toFixed(2);
}
function hitungTotalPoin411() {
  const total =
    ambilAngkaSaja("subTotal_411_A") +
    ambilAngkaSaja("subTotal_411_B") +
    ambilAngkaSaja("subTotal_411_C") +
    ambilAngkaSaja("subTotal_411_D") +
    ambilAngkaSaja("subTotal_411_E");
  const el = document.getElementById("skor_411_Total");
  if (el) el.innerText = total.toFixed(2);
}
function hitungTotalPoin412() {
  const total =
    ambilAngkaSaja("subTotal_412_A") + ambilAngkaSaja("subTotal_412_B");
  const el = document.getElementById("skor_412_Total");
  if (el) el.innerText = total.toFixed(2);
}
function hitungTotalPoin413() {
  const total =
    ambilAngkaSaja("subTotal_413_A") + ambilAngkaSaja("subTotal_413_B");
  const el = document.getElementById("skor_413_Total");
  if (el) el.innerText = total.toFixed(2);
}
function hitungTotalPoin414() {
  const total =
    ambilAngkaSaja("subTotal_414_A") + ambilAngkaSaja("subTotal_414_B");
  const el = document.getElementById("skor_414_Total");
  if (el) el.innerText = total.toFixed(2);
}
function hitungTotalPoin11() {
  const skor11 = ambilAngkaSaja("skor_111_Total");
  const el = document.getElementById("skor_11_Total");
  if (el) el.innerText = skor11.toFixed(2);
}
function hitungTotalPoin21() {
  const total21 =
    ambilAngkaSaja("skor_211_Total") + ambilAngkaSaja("skor_212_Total");
  const el = document.getElementById("skor_21_Total");
  if (el) el.innerText = total21.toFixed(2);
}
function hitungTotalPoin31() {
  const total31 =
    ambilAngkaSaja("skor_311_Total") +
    ambilAngkaSaja("skor_312_Total") +
    ambilAngkaSaja("skor_313_Total") +
    ambilAngkaSaja("skor_314_Total") +
    ambilAngkaSaja("skor_315_Total");
  const el = document.getElementById("skor_31_Total");
  if (el) el.innerText = total31.toFixed(2);
}
function hitungTotalPoin41() {
  const total41 =
    ambilAngkaSaja("skor_411_Total") +
    ambilAngkaSaja("skor_412_Total") +
    ambilAngkaSaja("skor_413_Total") +
    ambilAngkaSaja("skor_414_Total");
  const el = document.getElementById("skor_41_Total");
  if (el) el.innerText = total41.toFixed(2);
}

// ========================================================
// RUMUS PENJUMLAHAN PUSKESMAS
// ========================================================
function hitungTotalPoin111Pkm() {
  const total =
    ambilAngkaSaja("skor_111_A_Total") +
    ambilAngkaSaja("skor_111_B_Total") +
    ambilAngkaSaja("skor_111_C_Total") +
    ambilAngkaSaja("skor_111_D_Total") +
    ambilAngkaSaja("subTotal_111_E") +
    ambilAngkaSaja("subTotal_111_F") +
    ambilAngkaSaja("subTotal_111_G");
  const el = document.getElementById("skor_111_Total");
  if (el) el.innerText = total.toFixed(2);
}

function hitungTotalPoin111APkm() {
  const total1A =
    ambilAngkaSaja("skor_111_A1") +
    ambilAngkaSaja("skor_111_A2") +
    ambilAngkaSaja("skor_111_A3") +
    ambilAngkaSaja("skor_111_A4") +
    ambilAngkaSaja("skor_111_A5") +
    ambilAngkaSaja("skor_111_A6");
  const elTotal1A = document.getElementById("skor_111_A_Total");
  if (elTotal1A) elTotal1A.innerText = total1A.toFixed(2);
}

function hitungTotalPoin111BPkm() {
  const total1B =
    ambilAngkaSaja("skor_111_B1") +
    ambilAngkaSaja("skor_111_B2") +
    ambilAngkaSaja("skor_111_B3");
  const elTotal1B = document.getElementById("skor_111_B_Total");
  if (elTotal1B) elTotal1B.innerText = total1B.toFixed(2);
}

function hitungTotalPoin111CPkm() {
  const total1C =
    ambilAngkaSaja("skor_111_C1") +
    ambilAngkaSaja("skor_111_C2") +
    ambilAngkaSaja("skor_111_C3");
  const elTotal1C = document.getElementById("skor_111_C_Total");
  if (elTotal1C) elTotal1C.innerText = total1C.toFixed(2);
}

function hitungTotalPoin111DPkm() {
  const total1D =
    ambilAngkaSaja("skor_111_D1") +
    ambilAngkaSaja("skor_111_D2") +
    ambilAngkaSaja("skor_111_D3");
  const elTotal1D = document.getElementById("skor_111_D_Total");
  if (elTotal1D) elTotal1D.innerText = total1D.toFixed(2);
}

// ========================================================
// 7. FUNGSI GRAND TOTAL & "SAPU JAGAT" DATABASE
// ========================================================
function hitungGrandTotal() {
  const total1 = ambilAngkaSaja("skor_11_Total");
  const total2 = ambilAngkaSaja("skor_21_Total");
  const total3 = ambilAngkaSaja("skor_31_Total");
  const total4 = ambilAngkaSaja("skor_41_Total");

  const grandTotal = total1 + total2 + total3 + total4;

  const elGrandTotal = document.getElementById("grandTotal");
  if (elGrandTotal) elGrandTotal.innerText = grandTotal.toFixed(2);

  const elPredikat = document.getElementById("predikatGrandTotal");
  let predikatHasil = "-";

  if (elPredikat) {
    predikatHasil = tentukanPredikat(grandTotal);
    elPredikat.innerText = predikatHasil;
  }
  // 🛑 PENTING: JANGAN SIMPAN KE FIREBASE JIKA SEDANG DALAM PROSES MEMUAT DATA!
  if (isSedangMemuat) return;

  // === FITUR SAPU JAGAT: REKAM SELURUH NILAI KE FIREBASE ===
  if (currentUser && formRef) {
    let namaInstansiSimpan = currentNamaInstansi;

    // Cegah agar "Administrator" tidak ikut tersimpan sebagai nama instansi operasional
    if (!namaInstansiSimpan || namaInstansiSimpan === "Administrator") {
      if (currentRole.startsWith("pkm_")) {
        namaInstansiSimpan = formatNamaInstansi(currentRole);
      } else if (currentRole.startsWith("rsud_")) {
        namaInstansiSimpan = formatNamaInstansi(currentRole);
      }
    }

    if (currentRole === "admin") {
      const selectOpd = document.getElementById("pilihOpdAdmin");
      if (
        selectOpd &&
        selectOpd.options[selectOpd.selectedIndex] &&
        selectOpd.value !== ""
      ) {
        namaInstansiSimpan = selectOpd.options[selectOpd.selectedIndex].text;
      }
    }

    let dataLengkap = {
      nama_instansi: namaInstansiSimpan || "Instansi Resmi",
      grand_total: grandTotal.toFixed(2),
      predikat: predikatHasil,
    };

    const semuaElemen = document.querySelectorAll(
      '[id^="skor_"], [id^="subTotal_"], [id^="real_"], [id^="target_"]',
    );

    semuaElemen.forEach((el) => {
      let nilai = 0;
      if (el.tagName === "INPUT" || el.tagName === "SELECT") {
        nilai = parseFloat(el.value.replace(",", ".")) || 0;
      } else {
        nilai = parseFloat(el.innerText.replace(",", ".")) || 0;
      }
      dataLengkap[el.id] = nilai;
    });

    // Simpan data Rawat Inap ke dokumen aktif
    formRef.set(dataLengkap, { merge: true }).catch((err) => {
      console.error("Gagal menyimpan rekap laporan ke Firestore:", err);
    });

    // Jika koleksi PKM, simpan juga dokumen Non-Rawat Inap dengan skorNonRI yang terekam
    // Jika koleksi PKM, simpan juga dokumen Non-Rawat Inap berdasarkan skorNonRI yang tampil di layar
    if (tipeKoleksi === "evaluasi_kinerja_pkm") {
      const docIdRaw = formRef.id;
      if (docIdRaw.includes("_rawatinap")) {
        const docIdNonRI = docIdRaw.replace("_rawatinap", "_nonrawatinap");

        let dataNonRI = { ...dataLengkap };
        const elemenNonRI = document.querySelectorAll('[id^="skorNonRI_"]');

        elemenNonRI.forEach((el) => {
          const namaPoin = el.id.replace("skorNonRI_", "");
          const valNonRI = parseFloat(el.innerText.replace(",", ".")) || 0;
          dataNonRI[`skor_${namaPoin}`] = valNonRI;
          dataNonRI[`subTotal_${namaPoin}`] = valNonRI;
        });

        db.collection("evaluasi_kinerja_pkm")
          .doc(docIdNonRI)
          .set(dataNonRI, { merge: true })
          .catch((err) => console.error("Gagal menyimpan Non-RI:", err));
      }
    }
  }
}

function tentukanPredikat(skor) {
  if (skor < 60) return "C (Kurang)";
  if (skor < 70) return "B (Cukup)";
  if (skor < 80) return "BB (Baik)";
  if (skor < 90) return "A (Sangat Baik)";
  return "AA (Memuaskan)";
}

// ========================================================
// 8. FUNGSI EXPORT (EXCEL) 2-IN-1 & RESET
// ========================================================
async function exportToExcel(
  namaKoleksi = null,
  docId = null,
  namaInstansi = null,
  triwulan = null,
) {
  try {
    alert("Sedang mengambil template dan menyuntikkan data... Mohon tunggu.");
    let dataAdmin = null;

    if (namaKoleksi && docId) {
      const doc = await db.collection(namaKoleksi).doc(docId).get();
      if (doc.exists) {
        dataAdmin = doc.data();
      } else {
        throw new Error("Data instansi tidak ditemukan di database.");
      }
    }

    const response = await fetch("assets/template/template_excel.xlsx");
    if (!response.ok) {
      throw new Error(
        "Gagal memuat template. Pastikan file berada di 'assets/template/template_excel.xlsx'",
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);
    const worksheet = workbook.worksheets[0];

    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        if (typeof cell.value === "string" && cell.value.startsWith("$")) {
          const idTarget = cell.value.substring(1);
          let nilaiAkhir = 0;

          if (dataAdmin) {
            let nilaiDariDatabase = dataAdmin[idTarget];

            if (nilaiDariDatabase !== undefined) {
              nilaiAkhir = isNaN(parseFloat(nilaiDariDatabase))
                ? nilaiDariDatabase
                : parseFloat(nilaiDariDatabase);
            } else {
              if (idTarget.startsWith("subTotal_")) {
                const skorAsli = idTarget.replace("subTotal_", "skor_");
                nilaiAkhir = parseFloat(dataAdmin[skorAsli]) || 0;
              } else {
                nilaiAkhir = 0;
              }
            }
          } else {
            nilaiAkhir = ambilAngkaSaja(idTarget);
          }
          cell.value = nilaiAkhir;
        }
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    if (dataAdmin && namaInstansi && triwulan) {
      const namaFileBersih = namaInstansi.replace(/\s+/g, "_");
      a.download = `Laporan_${namaFileBersih}_${triwulan}.xlsx`;
    } else {
      a.download = "Laporan_Kinerja_Otomatis.xlsx";
    }

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error("Gagal export:", error);
    alert("Terjadi kesalahan: \n" + error.message);
  }
}

function resetData() {
  const konfirmasi = confirm(
    "⚠️ PERHATIAN!\n\nApakah Anda yakin ingin MENGHAPUS SEMUA DATA di form ini?",
  );
  if (konfirmasi) {
    if (formRef) {
      formRef
        .delete()
        .then(() => {
          alert("Semua data berhasil dihapus dari sistem.");
          location.reload();
        })
        .catch((error) => {
          alert("Gagal menghapus data: " + error.message);
        });
    } else {
      location.reload();
    }
  }
}

function formatNamaInstansi(username) {
  let tipe = "";
  let nama = "";

  if (username.startsWith("pkm_")) {
    tipe = "Puskesmas ";
    nama = username.replace("pkm_", "");
  } else if (username.startsWith("rsud_")) {
    tipe = "RSUD ";
    nama = username.replace("rsud_", "");
  } else {
    return username;
  }
  nama = nama.charAt(0).toUpperCase() + nama.slice(1);
  return tipe + nama;
}

// ========================================================
// 9. FUNGSI KHUSUS DASHBOARD ADMIN (Mendukung Pemisahan RI & NRI)
// ========================================================
async function tarikSemuaDataAdmin() {
  const tabelRef = document.getElementById("tabelRekapAdmin");
  if (!tabelRef) return;

  tabelRef.innerHTML = `<tr><td colspan="6" style="text-align:center;">Memuat laporan...</td></tr>`;

  try {
    let htmlTabel = "";
    let nomor = 1;

    let targetKoleksi = [
      { name: "evaluasi_kinerja_rsud", type: "rsud-row" },
      { name: "evaluasi_kinerja_pkm", type: "pkm-row" },
    ];

    for (let col of targetKoleksi) {
      const snapshot = await db.collection(col.name).get();
      snapshot.forEach((doc) => {
        const data = doc.data();

        if (currentRole && currentRole !== "admin") {
          const milikUid =
            currentUser && doc.id.startsWith(currentUser.uid + "_");
          const milikNama =
            currentNamaInstansi && data.nama_instansi === currentNamaInstansi;
          if (!milikUid && !milikNama) {
            return;
          }
        }

        const idParts = doc.id.split("_");
        const triwulan = idParts[1] || "Tidak Diketahui";

        // Deteksi kategori layanan khusus PKM
        // Deteksi kategori layanan khusus PKM (Cek nonrawatinap terlebih dahulu)
        let tambahanLabel = "";
        if (col.name === "evaluasi_kinerja_pkm") {
          if (doc.id.includes("nonrawatinap")) {
            tambahanLabel = " (Non-Rawat Inap)";
          } else if (doc.id.includes("rawatinap")) {
            tambahanLabel = " (Rawat Inap)";
          }
        }

        const nama =
          (data.nama_instansi || "Instansi (Belum Input)") + tambahanLabel;

        let totalVal = parseFloat(data.grand_total) || 0;
        if (totalVal === 0) {
          const t1 = parseFloat(data.skor_11_Total) || 0;
          const t2 = parseFloat(data.skor_21_Total) || 0;
          const t3 = parseFloat(data.skor_31_Total) || 0;
          const t4 = parseFloat(data.skor_41_Total) || 0;
          totalVal = t1 + t2 + t3 + t4;
        }

        const total = totalVal.toFixed(2);
        const predikat =
          data.predikat && data.predikat !== "-"
            ? data.predikat
            : tentukanPredikat(totalVal);

        htmlTabel += `
          <tr class="${col.type}">
              <td>${nomor++}</td>
              <td><strong>${nama}</strong></td>
              <td>${triwulan}</td>
              <td><strong>${total}</strong></td>
              <td>${predikat}</td>
              <td>
                <button class="btn btn-sm btn-success me-1" onclick="exportToExcel('${col.name}', '${doc.id}', '${nama}', '${triwulan}')" title="Cetak ke Excel Sesuai Template">
                  <i class="fa fa-solid fa-print"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="hapusDataAdmin('${col.name}', '${doc.id}', '${nama}', '${triwulan}')" title="Hapus Laporan Ini">
                  <i class="fa fa-solid fa-trash"></i>
                </button>
              </td>
          </tr>
        `;
      });
    }

    if (htmlTabel === "") {
      tabelRef.innerHTML = `<tr><td colspan="6" style="text-align:center;">Belum ada laporan data ditemukan.</td></tr>`;
    } else {
      tabelRef.innerHTML = htmlTabel;
    }
  } catch (error) {
    console.error("Gagal memuat laporan:", error);
    tabelRef.innerHTML = `<tr><td colspan="6" style="text-align:center; color:red;">Gagal memuat data laporan: ${error.message}</td></tr>`;
  }
}

async function exportExcelAdmin() {
  try {
    alert(
      "Sistem sedang mengumpulkan seluruh data instansi dan menyusunnya ke dalam Excel. Mohon tunggu beberapa saat...",
    );

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Rekapitulasi Kinerja");

    let semuaData = [];
    let daftarPoinUnik = new Set();

    const snapRsud = await db.collection("evaluasi_kinerja_rsud").get();
    snapRsud.forEach((doc) => {
      let data = doc.data();
      data.idDokumen = doc.id;
      semuaData.push(data);
      Object.keys(data).forEach((k) => {
        if (k.startsWith("skor_") || k.startsWith("subTotal_"))
          daftarPoinUnik.add(k);
      });
    });

    const snapPkm = await db.collection("evaluasi_kinerja_pkm").get();
    snapPkm.forEach((doc) => {
      let data = doc.data();
      data.idDokumen = doc.id;
      semuaData.push(data);
      Object.keys(data).forEach((k) => {
        if (k.startsWith("skor_") || k.startsWith("subTotal_"))
          daftarPoinUnik.add(k);
      });
    });

    if (semuaData.length === 0) {
      alert("Belum ada data dari instansi manapun untuk dicetak.");
      return;
    }

    const kolomDasar = [
      { header: "Nama Instansi", key: "nama", width: 30 },
      { header: "Periode/TW", key: "tw", width: 15 },
      { header: "Grand Total", key: "gt", width: 15 },
      { header: "Predikat", key: "predikat", width: 20 },
    ];

    const poinUrut = Array.from(daftarPoinUnik).sort();
    poinUrut.forEach((poin) => {
      kolomDasar.push({ header: poin, key: poin, width: 15 });
    });
    worksheet.columns = kolomDasar;

    worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF1E3A8A" },
    };

    semuaData.forEach((d) => {
      const tw = d.idDokumen ? d.idDokumen.split("_")[1] : "-";
      let barisData = {
        nama: d.nama_instansi || "Instansi",
        tw: tw,
        gt: d.grand_total || "0",
        predikat: d.predikat || "-",
      };

      poinUrut.forEach((poin) => {
        barisData[poin] = d[poin] !== undefined ? d[poin] : "0";
      });

      worksheet.addRow(barisData);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Rekapitulasi_Lengkap_Dinkes.xlsx";
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error("Gagal export admin Excel:", error);
    alert("Terjadi kesalahan saat membuat file Excel: " + error.message);
  }
}

// Pagination Start
function pindahHalaman(numPage) {
  const sections = document.querySelectorAll(".page-section");
  sections.forEach((sec) => {
    sec.style.display = "none";
  });

  document.getElementById("section-page-" + numPage).style.display = "block";

  for (let i = 1; i <= 4; i++) {
    const btn = document.getElementById("btn-page-" + i);
    if (btn) {
      if (i === numPage) {
        btn.classList.add("btn-primary");
        btn.classList.remove("btn-secondary");
      } else {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-secondary");
      }
    }
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ========================================================
// 10. FITUR AUTO LOGOUT KARENA TIDAK AKTIF (IDLE TIMEOUT)
// ========================================================
let idleTimer;
const waktuBatasIdle = 15 * 60 * 1000;

function resetIdleTimer() {
  if (!currentUser) return;
  clearTimeout(idleTimer);

  idleTimer = setTimeout(() => {
    alert(
      "Sesi Anda telah berakhir karena tidak ada aktivitas selama 15 menit. Anda akan otomatis keluar.",
    );
    auth.signOut().then(() => {
      window.location.href = "index.html";
    });
  }, waktuBatasIdle);
}

window.onload = resetIdleTimer;
window.onmousemove = resetIdleTimer;
window.onkeypress = resetIdleTimer;
window.onclick = resetIdleTimer;
window.onscroll = resetIdleTimer;
window.ontouchstart = resetIdleTimer;

// ========================================================
// MANAJEMEN USER ADMIN
// ========================================================
function tarikDaftarUserAdmin() {
  const tabelRef = document.getElementById("tabelDaftarUser");
  if (!tabelRef) return;

  tabelRef.innerHTML = `<tr><td colspan="5" class="text-center">Sedang mengambil data user...</td></tr>`;

  db.collection("users")
    .get()
    .then((snapshot) => {
      let htmlTabel = "";
      let nomor = 1;

      snapshot.forEach((doc) => {
        const user = doc.data();
        const email = user.email || "-";
        const namaInstansi =
          user.namaInstansi || formatNamaInstansi(user.opd || "");
        const role = user.opd || "User";

        htmlTabel += `
          <tr>
            <td>${nomor++}</td>
            <td><strong>${email}</strong></td>
            <td>${namaInstansi}</td>
            <td><span class="badge bg-info text-dark">${role}</span></td>
            <td class="text-center">
              <button class="btn btn-sm btn-warning me-1" onclick="adminKirimResetPassword('${email}')" title="Kirim Email Reset Password">
                <i class="fa fa-key me-1"></i> Reset Password
              </button>
              <button class="btn btn-sm btn-danger" onclick="hapusUserFirestore('${doc.id}', '${email}')" title="Hapus Profil User">
                <i class="fa fa-trash me-1"></i> Hapus
              </button>
            </td>
          </tr>
        `;
      });

      if (htmlTabel === "") {
        tabelRef.innerHTML = `<tr><td colspan="5" class="text-center">Belum ada user terdaftar.</td></tr>`;
      } else {
        tabelRef.innerHTML = htmlTabel;
      }
    })
    .catch((error) => {
      console.error("Gagal mengambil data user:", error);
      tabelRef.innerHTML = `<tr><td colspan="5" class="text-center text-danger">Gagal memuat data user.</td></tr>`;
    });
}

function prosesRegistrasiOPD() {
  const emailInput = document.getElementById("regEmail").value.trim();
  const passwordInput = document.getElementById("regPassword").value;
  const selectOpd = document.getElementById("regOPD");

  const opdTerpilih = selectOpd.value;
  const namaInstansiTerpilih = selectOpd.options[selectOpd.selectedIndex]
    ? selectOpd.options[selectOpd.selectedIndex].text
    : "";

  if (!emailInput || !passwordInput || !opdTerpilih) {
    alert("Harap lengkapi Email, Password, dan Pilihan Instansi!");
    return;
  }

  let secondaryApp;
  try {
    secondaryApp =
      firebase.apps.find((app) => app.name === "SecondaryAdminApp") ||
      firebase.initializeApp(firebaseConfig, "SecondaryAdminApp");
  } catch (e) {
    secondaryApp = firebase.app("SecondaryAdminApp");
  }

  const secondaryAuth = secondaryApp.auth();

  secondaryAuth
    .createUserWithEmailAndPassword(emailInput, passwordInput)
    .then((userCredential) => {
      const newUser = userCredential.user;

      return db.collection("users").doc(newUser.uid).set({
        uid: newUser.uid,
        email: emailInput,
        opd: opdTerpilih,
        namaInstansi: namaInstansiTerpilih,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    })
    .then(() => {
      alert(
        `Berhasil! Akun ${emailInput} telah didaftarkan untuk ${namaInstansiTerpilih}`,
      );

      document.getElementById("formRegistrasiUser").reset();
      const modalEl = document.getElementById("modalTambahUser");
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();

      if (typeof tarikDaftarUserAdmin === "function") {
        tarikDaftarUserAdmin();
      }
    })
    .catch((error) => {
      alert("Pendaftaran Gagal: " + error.message);
    });
}

function adminKirimResetPassword(emailUser) {
  if (!emailUser || emailUser === "-") {
    alert("Email pengguna tidak valid.");
    return;
  }

  if (
    confirm(
      `Apakah Anda yakin ingin mengirim tautan reset password ke email:\n${emailUser}?`,
    )
  ) {
    auth
      .sendPasswordResetEmail(emailUser)
      .then(() => {
        alert(
          `Tautan reset password berhasil dikirim ke ${emailUser}.\nSilakan periksa kotak masuk/spam email tersebut.`,
        );
      })
      .catch((error) => {
        alert("Gagal mengirim email reset password: " + error.message);
      });
  }
}

function hapusUserFirestore(uidUser, emailUser) {
  if (
    confirm(
      `Apakah Anda yakin ingin menghapus profil user ${emailUser} dari database?`,
    )
  ) {
    db.collection("users")
      .doc(uidUser)
      .delete()
      .then(() => {
        alert("Profil user berhasil dihapus.");
        tarikDaftarUserAdmin();
      })
      .catch((error) => {
        alert("Gagal menghapus user: " + error.message);
      });
  }
}

async function hapusDataAdmin(namaKoleksi, docId, namaInstansi, triwulan) {
  const konfirmasi = confirm(
    `⚠️ PERHATIAN!\n\nApakah Anda yakin ingin MENGHAPUS permanen laporan kinerja untuk:\n- Instansi: ${namaInstansi}\n- Periode: ${triwulan}?`,
  );

  if (konfirmasi) {
    try {
      await db.collection(namaKoleksi).doc(docId).delete();
      alert("Data laporan berhasil dihapus dari sistem.");
      tarikSemuaDataAdmin();
    } catch (error) {
      console.error("Gagal menghapus data laporan:", error);
      alert("Terjadi kesalahan saat menghapus data: " + error.message);
    }
  }
}

// ========================================================
// FUNCTION MENGATUR DASHBOARD
// ========================================================
async function muatRingkasanDashboard() {
  const elGrandTotal = document.getElementById("grandTotal");
  const elPredikat = document.getElementById("predikatGrandTotal");
  if (!elGrandTotal || !elPredikat) return;

  // === JIKA YANG LOGIN ADALAH ADMIN ===
  if (currentRole === "admin") {
    const selectOpd = document.getElementById("pilihOpdAdmin");
    const selectTribulan = document.getElementById("pilihTribulan");
    if (!selectOpd || !selectTribulan) return;

    const opdTerpilih = selectOpd.value;
    const triwulanTerpilih = selectTribulan.value;

    if (!opdTerpilih) {
      elGrandTotal.innerText = "0.00";
      elPredikat.innerText = "-";
      return;
    }

    let namaKoleksi = opdTerpilih.startsWith("rsud_")
      ? "evaluasi_kinerja_rsud"
      : "evaluasi_kinerja_pkm";

    try {
      const userSnapshot = await db
        .collection("users")
        .where("opd", "==", opdTerpilih)
        .get();
      if (userSnapshot.empty) {
        elGrandTotal.innerText = "0.00";
        elPredikat.innerText = "-";
        return;
      }

      const targetUid = userSnapshot.docs[0].data().uid;
      let docId = `${targetUid}_${triwulanTerpilih}`;
      if (namaKoleksi === "evaluasi_kinerja_pkm") {
        docId += "_rawatinap";
      }

      const docSnap = await db.collection(namaKoleksi).doc(docId).get();
      if (docSnap.exists) {
        const data = docSnap.data();
        let totalVal = parseFloat(data.grand_total) || 0;
        if (totalVal === 0) {
          const t1 = parseFloat(data.skor_11_Total) || 0;
          const t2 = parseFloat(data.skor_21_Total) || 0;
          const t3 = parseFloat(data.skor_31_Total) || 0;
          const t4 = parseFloat(data.skor_41_Total) || 0;
          totalVal = t1 + t2 + t3 + t4;
        }
        const predikatHasil =
          data.predikat && data.predikat !== "-"
            ? data.predikat
            : tentukanPredikat(totalVal);
        elGrandTotal.innerText = totalVal.toFixed(2);
        elPredikat.innerText = predikatHasil;
      } else {
        elGrandTotal.innerText = "0.00";
        elPredikat.innerText = "- (Belum Ada Data)";
      }
    } catch (error) {
      console.error("Gagal memuat ringkasan admin:", error);
    }
  } else {
    // === JIKA YANG LOGIN ADALAH USER (RSUD / PKM) ===
    if (!currentUser || !formRef) return;

    try {
      const docSnap = await formRef.get();
      if (docSnap.exists) {
        const data = docSnap.data();
        let totalVal = parseFloat(data.grand_total) || 0;
        if (totalVal === 0) {
          const t1 = parseFloat(data.skor_11_Total) || 0;
          const t2 = parseFloat(data.skor_21_Total) || 0;
          const t3 = parseFloat(data.skor_31_Total) || 0;
          const t4 = parseFloat(data.skor_41_Total) || 0;
          totalVal = t1 + t2 + t3 + t4;
        }
        const predikatHasil =
          data.predikat && data.predikat !== "-"
            ? data.predikat
            : tentukanPredikat(totalVal);
        elGrandTotal.innerText = totalVal.toFixed(2);
        elPredikat.innerText = predikatHasil;
      } else {
        elGrandTotal.innerText = "0.00";
        elPredikat.innerText = "- (Belum Ada Data)";
      }
    } catch (error) {
      console.error("Gagal memuat ringkasan user:", error);
    }
  }
}
