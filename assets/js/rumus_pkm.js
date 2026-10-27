// ==========================================
// 1. KAMUS ATURAN (Data Dictionary)
// ==========================================
const aturanPenilaian = {
  // ===================== KELOMPOK 111 =====================
  rawatInap: {
    "111_C1": {
      kondisiSkor: [
        { batas: 0.999, nilai: 0.0 },
        { batas: 0.499, nilai: 0.4 },
        { batas: 0.999, nilai: 0.8 },
        { batas: Infinity, nilai: 1.0 },
      ],
    },
    "111_C2": {
      kondisiSkor: [
        { batas: 0.999, nilai: 0.0 },
        { batas: 0.499, nilai: 0.4 },
        { batas: 0.999, nilai: 0.8 },
        { batas: Infinity, nilai: 1.0 },
      ],
    },
    "111_C3": {
      kondisiSkor: [
        { batas: 0.999, nilai: 0.0 },
        { batas: 0.499, nilai: 0.4 },
        { batas: 0.999, nilai: 0.8 },
        { batas: Infinity, nilai: 1.0 },
      ],
    },

    // ===================== KELOMPOK 211 =====================
    "211_A": {
      kondisiSkor: [
        { batas: 0.8499, nilai: 0.0 }, // Mewakili RJ < 0,85
        { batas: 0.8999, nilai: 0.4 }, // Mewakili 0,85 ≤ RJ < 0,90
        { batas: 0.9499, nilai: 0.8 }, // Mewakili 0,90 ≤ RJ < 0,95
        { batas: 0.9999, nilai: 1.0 }, // Mewakili 0,95 ≤ RJ < 1,00
        { batas: 1.0999, nilai: 1.5 }, // Mewakili 1,00 ≤ RJ < 1,10
        { batas: Infinity, nilai: 2.0 }, // Mewakili RJ ≥ 1,10
      ],
    },
    "211_B": {
      kondisiSkor: [
        { batas: 0.8499, nilai: 0.0 }, // Mewakili syarat < 0.85
        { batas: 0.8999, nilai: 0.4 }, // Mewakili syarat < 0.9
        { batas: 0.9499, nilai: 0.8 }, // Mewakili syarat < 0.95
        { batas: 0.9999, nilai: 1.0 }, // Mewakili syarat < 1.0
        { batas: 1.0999, nilai: 1.5 }, // Mewakili syarat < 1.1
        { batas: Infinity, nilai: 2.0 }, // Mewakili syarat >= 1.1
      ],
    },
    "211_C": {
      kondisiSkor: [
        { batas: 0.8499, nilai: 0.0 }, // Untuk PL < 0,85
        { batas: 0.8999, nilai: 0.4 }, // Untuk 0,85 <= PL < 0,90
        { batas: 0.9499, nilai: 0.8 }, // Untuk 0,90 <= PL < 0,95
        { batas: 0.9999, nilai: 1.0 }, // Untuk 0,95 <= PL < 1,00
        { batas: 1.0999, nilai: 1.5 }, // Untuk 1,00 <= PL < 1,10
        { batas: Infinity, nilai: 2.0 }, // Untuk PL >= 1,10
      ],
    },

    // ===================== KELOMPOK 212 =====================
    "212_A": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.5 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 1.0 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 1.5 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 2.0 }, // Untuk PKIH = 1
      ],
    },
    "212_B1": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.4 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 0.6 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 0.8 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 1.0 }, // Untuk PKIH = 1
      ],
    },
    "212_B2": {
      kondisiSkor: [
        { batas: 0, nilai: 1.0 }, // Untuk AKI = 0[cite: 8]
        { batas: Infinity, nilai: 0.0 }, // Untuk AKI > 0[cite: 8]
      ],
    },
    "212_C": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.5 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 1.0 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 1.5 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 2.0 }, // Untuk PKIH = 1
      ],
    },
    "212_D": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.5 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 1.0 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 1.5 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 2.0 }, // Untuk PKIH = 1
      ],
    },
    "212_E": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.5 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 1.0 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 1.5 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 2.0 }, // Untuk PKIH = 1
      ],
    },
    "212_F": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.5 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 1.0 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 1.5 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 2.0 }, // Untuk PKIH = 1
      ],
    },
    "212_G": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.25 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 0.5 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 1.0 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 1.5 }, // Untuk PKIH = 1
      ],
    },
    "212_I1": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.1 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 0.2 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 0.4 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 0.5 }, // Untuk PKIH = 1
      ],
    },
    "212_I2": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.5 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.4 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 0.2 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 0.1 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 0.0 }, // Untuk PKIH = 1
      ],
    },
    "212_I3": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.5 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.4 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 0.2 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 0.1 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 0.0 }, // Untuk PKIH = 1
      ],
    },
    "212_J": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.5 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 1.0 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 1.5 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 2.0 }, // Untuk PKIH = 1
      ],
    },
    "212_K": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.5 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 1.0 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 1.5 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 2.0 }, // Untuk PKIH = 1
      ],
    },
    "212_L": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.5 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 1.0 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 1.5 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 2.0 }, // Untuk PKIH = 1
      ],
    },
    "212_M": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.5 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 1.0 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 1.5 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 2.0 }, // Untuk PKIH = 1
      ],
    },
    "212_N": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.5 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 1.0 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 1.5 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 2.0 }, // Untuk PKIH = 1
      ],
    },
    "212_P": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.25 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 0.5 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 0.75 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 1.0 }, // Untuk PKIH = 1
      ],
    },
    "212_Q": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.25 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 0.5 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 0.75 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 1.0 }, // Untuk PKIH = 1
      ],
    },

    // ===================== KELOMPOK 311 =====================
    "311_A": {
      kondisiSkor: [
        { batas: 8.0, nilai: 2.0 }, // Untuk ERT <= 8[cite: 12]
        { batas: 15.0, nilai: 1.0 }, // Untuk 8 < ERT <= 15[cite: 12]
        { batas: 30.0, nilai: 0.5 }, // Untuk 15 < ERT <= 30[cite: 12]
        { batas: Infinity, nilai: 0.25 }, // Untuk ERT > 30[cite: 12]
      ],
    },
    "311_B": {
      kondisiSkor: [
        { batas: 6.0, nilai: 2.0 }, // Untuk LOSNB < 6[cite: 13]
        { batas: 9.0, nilai: 1.5 }, // Untuk 6 <= LOSNB <= 9[cite: 13]
        { batas: 12.0, nilai: 1.0 }, // Untuk 9 < LOSNB <= 12[cite: 13]
        { batas: 15.0, nilai: 0.7 }, // Untuk 12 < LOSNB <= 15[cite: 13]
        { batas: Infinity, nilai: 0.2 }, // Untuk LOSNB > 15[cite: 13]
      ],
    },
    "311_C": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 2.0 }, // Untuk LOSB < 1[cite: 14]
        { batas: 1.9999, nilai: 1.5 }, // Untuk 1 <= LOSB < 2[cite: 14]
        { batas: 2.9999, nilai: 1.0 }, // Untuk 2 <= LOSB < 3[cite: 14]
        { batas: 3.9999, nilai: 0.7 }, // Untuk 3 <= LOSB < 4[cite: 14]
        { batas: 4.9999, nilai: 0.2 }, // Untuk 4 <= LOSB < 5[cite: 14]
        { batas: Infinity, nilai: 0.0 }, // Untuk LOSB >= 5[cite: 14]
      ],
    },
    "311_D": {
      kondisiSkor: [
        { batas: 3.0, nilai: 2.0 }, // Untuk WTL <= 3[cite: 15]
        { batas: 4.0, nilai: 1.5 }, // Untuk 3 < WTL <= 4[cite: 15]
        { batas: 5.0, nilai: 1.0 }, // Untuk 4 < WTL <= 5[cite: 15]
        { batas: Infinity, nilai: 0.5 }, // Untuk WTL > 5[cite: 15]
      ],
    },
    "311_E": {
      kondisiSkor: [
        { batas: 0.3, nilai: 0.5 }, // Untuk KKT <= 0,3[cite: 16]
        { batas: 0.5, nilai: 1.0 }, // Untuk 0,3 < KKT <= 0,5[cite: 16]
        { batas: 0.84, nilai: 1.5 }, // Untuk 0,5 < KKT <= 0,84[cite: 16]
        { batas: Infinity, nilai: 2.0 }, // Untuk KKT > 0,85[cite: 16]
      ],
    },
    "311_F": {
      kondisiSkor: [
        { batas: 0.7999, nilai: 2.0 }, // Untuk KAPD < 0,8[cite: 17]
        { batas: 0.8999, nilai: 1.5 }, // Untuk 0,8 <= KAPD < 0,9[cite: 17]
        { batas: 0.9999, nilai: 1.0 }, // Untuk 0,9 <= KAPD < 1[cite: 17]
        { batas: Infinity, nilai: 0.5 }, // Untuk KAPD <= 1[cite: 17]
      ],
    },
    "311_G": {
      kondisiSkor: [
        { batas: 0.7999, nilai: 0.5 }, // Untuk KAPD < 0,8[cite: 17]
        { batas: 0.8999, nilai: 1.0 }, // Untuk 0,8 <= KAPD < 0,9[cite: 17]
        { batas: 0.9999, nilai: 1.5 }, // Untuk 0,9 <= KAPD < 1[cite: 17]
        { batas: Infinity, nilai: 2.0 }, // Untuk KAPD <= 1[cite: 17]
      ],
    },
    "311_H": {
      kondisiSkor: [
        { batas: 0.25, nilai: 1.5 }, // Untuk AKL < 0,25[cite: 20]
        { batas: 0.4, nilai: 1.0 }, // Untuk 0,25 <= AKL < 0,40[cite: 20]
        { batas: 0.65, nilai: 0.75 }, // Untuk 0,40 <= AKL < 0,65[cite: 20]
        { batas: Infinity, nilai: 0.5 }, // Untuk AKL >= 0,65[cite: 20]
      ],
    },
    "311_I1": {
      kondisiSkor: [
        { batas: 0.4999, nilai: 0.1 }, // Untuk PTBC < 0,5[cite: 21]
        { batas: 0.6999, nilai: 0.5 }, // Untuk 0,5 <= PTBC < 0,7[cite: 21]
        { batas: 0.8999, nilai: 0.75 }, // Untuk 0,7 <= PTBC <= 0,9[cite: 21]
        { batas: Infinity, nilai: 1.0 }, // Untuk 0,9 <= PTBC <= 1[cite: 21]
      ],
    },
    "311_I2": {
      kondisiSkor: [
        { batas: 0.3, nilai: 0.1 }, // Untuk AKP <= 0,3
        { batas: 0.5, nilai: 0.25 }, // Untuk 0,3 < AKP <= 0,5
        { batas: 0.9, nilai: 0.5 }, // Untuk 0,5 < AKP <= 0,9
        { batas: Infinity, nilai: 1.0 }, // Untuk AKP > 0,9
      ],
    },

    // ===================== KELOMPOK 312 =====================
    "312_A": {
      kondisiSkor: [
        { batas: 0.3, nilai: 0.2 }, // Untuk PP/K <= 0,3[cite: 22]
        { batas: 0.5, nilai: 0.5 }, // Untuk 0,3 < PP/K <= 0,5[cite: 22]
        { batas: 0.9, nilai: 0.75 }, // Untuk 0,5 < PP/K <= 0,9[cite: 22]
        { batas: Infinity, nilai: 1.5 }, // Untuk PP/K > 0,9[cite: 22]
      ],
    },
    "312_B": {
      kondisiSkor: [
        { batas: 0.3, nilai: 0.5 }, // Untuk KP < 0,3[cite: 23]
        { batas: 0.5, nilai: 0.8 }, // Untuk 0,3 < KP < 0,5[cite: 23]
        { batas: 0.7661, nilai: 0.1 }, // Untuk 0,5 < KP < 0,766[cite: 23]
        { batas: Infinity, nilai: 1.5 }, // Untuk KP > 0,7661[cite: 23]
      ],
    },
    "312_C1": {
      kondisiSkor: [
        { batas: 0.3, nilai: 0.1 }, // Untuk KRF <= 0,3[cite: 24]
        { batas: 0.5, nilai: 0.25 }, // Untuk 0,3 < KRF <= 0,5[cite: 24]
        { batas: 0.9, nilai: 0.5 }, // Untuk 0,5 < KRF <= 0,9[cite: 24]
        { batas: Infinity, nilai: 0.75 }, // Untuk KRF > 0,9[cite: 24]
      ],
    },
    "312_C2": {
      kondisiSkor: [
        { batas: 0.1, nilai: 0.75 }, // Untuk KOLASA <= 0,1[cite: 25]
        { batas: 0.3, nilai: 0.5 }, // Untuk 0,1 < KOLASA <= 0,3[cite: 25]
        { batas: 0.5, nilai: 0.25 }, // Untuk 0,3 < KOLASA <= 0,5[cite: 25]
        { batas: Infinity, nilai: 0.0 }, // Untuk KOLASA > 0,5[cite: 25]
      ],
    },

    // ===================== KELOMPOK 313 =====================
    "313_A": {
      kondisiSkor: [
        { batas: 0.0999, nilai: 0.4 }, // Mewakili < 0.1
        { batas: 0.2, nilai: 0.6 }, // Mewakili <= 0.2
        { batas: 0.3, nilai: 0.8 }, // Mewakili <= 0.3
        { batas: Infinity, nilai: 1.0 }, // Mewakili > 0.3
      ],
    },
    "313_B": {
      kondisiSkor: [
        { batas: 0.5, nilai: 0.4 }, // Mewakili <= 0.5
        { batas: 0.6, nilai: 0.6 }, // Mewakili <= 0.6
        { batas: 0.7, nilai: 0.8 }, // Mewakili <= 0.7
        { batas: Infinity, nilai: 1.0 }, // Mewakili > 0.7
      ],
    },
    "313_C": {
      kondisiSkor: [
        { batas: 60, nilai: 0.2 }, // Mewakili <= 60
        { batas: 70, nilai: 0.3 }, // Mewakili <= 70
        { batas: 76.61, nilai: 0.4 }, // Mewakili <= 76.61
        { batas: Infinity, nilai: 0.5 }, // Mewakili > 76.61
      ],
    },
    "313_F": {
      kondisiSkor: [
        { batas: 0.7999, nilai: 0.4 }, // Mewakili < 0.8
        { batas: 0.8999, nilai: 0.6 }, // Mewakili < 0.9
        { batas: 0.9999, nilai: 0.8 }, // Mewakili < 1.0
        { batas: Infinity, nilai: 1.0 }, // Mewakili >= 1.0
      ],
    },

    // ===================== KELOMPOK 411 =====================
    "411_A": {
      kondisiSkor: [
        { batas: 30.0, nilai: 2.0 }, // Untuk PPP < 30 hari[cite: 21]
        { batas: 40.0, nilai: 1.6 }, // Untuk 30 <= PPP < 40 hari[cite: 21]
        { batas: 60.0, nilai: 1.2 }, // Untuk 40 <= PPP < 60 hari[cite: 21]
        { batas: 80.0, nilai: 0.8 }, // Untuk 60 <= PPP < 80 hari[cite: 21]
        { batas: 100.0, nilai: 0.4 }, // Untuk 80 <= PPP < 100 hari[cite: 21]
        { batas: Infinity, nilai: 0.0 }, // Untuk PPP > 100 hari[cite: 21]
      ],
    },
    "411_B": {
      kondisiSkor: [
        { batas: 0.0, nilai: 0.0 }, // Untuk PAT = 0[cite: 22]
        { batas: 5.0, nilai: 0.25 }, // Untuk 0 < PAT < 5[cite: 22]
        { batas: 10.0, nilai: 0.5 }, // Untuk 5 < PAT < 10[cite: 22]
        { batas: 15.0, nilai: 1.0 }, // Untuk 10 < PAT < 15[cite: 22]
        { batas: 20.0, nilai: 1.5 }, // Untuk 15 < PAT < 20[cite: 22]
        { batas: Infinity, nilai: 2.0 }, // Untuk PAT > 20[cite: 22]
      ],
    },
    "411_C": {
      kondisiSkor: [
        { batas: 5.0, nilai: 0.0 }, // Untuk 0 < PP < 5[cite: 23]
        { batas: 15.0, nilai: 0.5 }, // Untuk 5 < PP < 15[cite: 23]
        { batas: 25.0, nilai: 1.0 }, // Untuk 15 < PP < 25[cite: 23]
        { batas: 30.0, nilai: 1.5 }, // Untuk 25 < PP < 30[cite: 23]
        { batas: 35.0, nilai: 2.0 }, // Untuk 30 < PP < 35[cite: 23]
        { batas: 45.0, nilai: 1.5 }, // Untuk 35 < PP < 45[cite: 23]
        { batas: 55.0, nilai: 1.0 }, // Untuk 45 < PP < 55[cite: 23]
        { batas: 60.0, nilai: 0.5 }, // Untuk 55 < PP < 60[cite: 23]
        { batas: Infinity, nilai: 0.0 }, // Untuk PP > 60[cite: 23]
      ],
    },
    "411_D": {
      kondisiSkor: [
        { batas: 0.01, nilai: 0.0 }, // Untuk ROFA <= 0,01[cite: 24]
        { batas: 0.02, nilai: 0.1 }, // Untuk 0,01 < ROFA <= 0,02[cite: 24]
        { batas: 0.03, nilai: 0.2 }, // Untuk 0,02 < ROFA <= 0,03[cite: 24]
        { batas: 0.04, nilai: 0.4 }, // Untuk 0,03 < ROFA <= 0,04[cite: 24]
        { batas: 0.05, nilai: 0.6 }, // Untuk 0,04 < ROFA <= 0,05[cite: 24]
        { batas: 0.06, nilai: 0.8 }, // Untuk 0,05 < ROFA <= 0,06[cite: 24]
        { batas: Infinity, nilai: 1.0 }, // Untuk ROFA > 0,06[cite: 24]
      ],
    },
    "411_E": {
      kondisiSkor: [
        { batas: 0.0, nilai: 0.0 }, // Untuk ROE = 0[cite: 25]
        { batas: 0.01, nilai: 0.2 }, // Untuk 0 < ROE <= 0,01[cite: 25]
        { batas: 0.02, nilai: 0.3 }, // Untuk 0,01 < ROE <= 0,02[cite: 25]
        { batas: 0.03, nilai: 0.4 }, // Untuk 0,02 < ROE <= 0,03[cite: 25]
        { batas: 0.04, nilai: 0.5 }, // Untuk 0,03 < ROE <= 0,04[cite: 25]
        { batas: 0.05, nilai: 0.6 }, // Untuk 0,04 < ROE <= 0,05[cite: 25]
        { batas: 0.06, nilai: 0.7 }, // Untuk 0,05 < ROE <= 0,06[cite: 25]
        { batas: 0.07, nilai: 0.8 }, // Untuk 0,06 < ROE <= 0,07[cite: 25]
        { batas: 0.08, nilai: 0.9 }, // Untuk 0,07 < ROE <= 0,08[cite: 25]
        { batas: Infinity, nilai: 1.0 }, // Untuk ROE > 0,08[cite: 25]
      ],
    },

    // ===================== KELOMPOK 412 =====================
    "412_A": {
      kondisiSkor: [
        { batas: 0.4, nilai: 0.0 }, // Untuk 0 <= RK < 0,4[cite: 26]
        { batas: 0.5, nilai: 0.5 }, // Untuk 0,4 <= RK < 0,5[cite: 26]
        { batas: 0.6, nilai: 1.0 }, // Untuk 0,5 <= RK < 0,6[cite: 26]
        { batas: 0.8, nilai: 1.5 }, // Untuk 0,6 <= RK < 0,8[cite: 26]
        { batas: Infinity, nilai: 2.0 }, // Untuk RK >= 0,8[cite: 26]
      ],
    },
    "412_B": {
      kondisiSkor: [
        { batas: 0.0, nilai: 0.0 }, // Untuk RL = 0[cite: 28]
        { batas: 1.2, nilai: 0.25 }, // Untuk 0 < RL <= 1,2[cite: 28]
        { batas: 2.4, nilai: 0.5 }, // Untuk 1,2 < RL <= 2,4[cite: 28]
        { batas: 3.6, nilai: 1.0 }, // Untuk 2,4 < RL <= 3,6[cite: 28]
        { batas: 4.8, nilai: 1.5 }, // Untuk 3,6 < RL <= 4,8[cite: 28]
        { batas: 6.0, nilai: 1.75 }, // Untuk 4,8 < RL <= 6[cite: 27, 28]
        { batas: Infinity, nilai: 2.0 }, // Untuk RL > 6[cite: 27]
      ],
    },

    // ===================== KELOMPOK 413 =====================
    "413_A": {
      kondisiSkor: [
        { batas: 0.01, nilai: 2.0 }, // Untuk RKTA < 0,01[cite: 29]
        { batas: 0.02, nilai: 1.5 }, // Untuk 0,02 < RKTA <= 0,01 (disesuaikan rentang)[cite: 29]
        { batas: 0.03, nilai: 1.0 }, // Untuk 0,03 < RKTA <= 0,02[cite: 29]
        { batas: 0.04, nilai: 0.5 }, // Untuk 0,04 < RKTA <= 0,03[cite: 29]
        { batas: Infinity, nilai: 0.0 }, // Untuk RKTA > 0,05[cite: 29]
      ],
    },
    "413_B": {
      kondisiSkor: [
        { batas: 0.25, nilai: 2.0 }, // Untuk RKTE < 0,25[cite: 30]
        { batas: 0.5, nilai: 1.5 }, // Untuk 0,25 < RKTE <= 0,5[cite: 30]
        { batas: 0.75, nilai: 1.0 }, // Untuk 0,5 < RKTE <= 0,75[cite: 30]
        { batas: 1.0, nilai: 0.5 }, // Untuk 0,75 < RKTE <= 1[cite: 30]
        { batas: Infinity, nilai: 0.0 }, // Untuk RKTE > 1[cite: 30]
      ],
    },

    // ===================== KELOMPOK 414 =====================
    "414_A": {
      kondisiSkor: [
        { batas: 0.025, nilai: 0.0 }, // Untuk 0 < PB <= 0,025[cite: 31]
        { batas: 0.05, nilai: 0.1 }, // Untuk 0,025 < PB <= 0,05[cite: 31]
        { batas: 0.1, nilai: 0.25 }, // Untuk 0,05 < PB <= 0,1[cite: 31]
        { batas: 0.15, nilai: 0.5 }, // Untuk 0,1 < PB <= 0,15[cite: 31]
        { batas: 0.2, nilai: 0.75 }, // Untuk 0,15 < PB <= 0,2[cite: 31]
        { batas: 0.25, nilai: 1.0 }, // Untuk 0,2 < PB <= 0,25[cite: 31]
        { batas: 0.3, nilai: 1.25 }, // Untuk 0,25 < PB <= 0,3[cite: 31]
        { batas: 0.35, nilai: 1.5 }, // Untuk 0,3 < PB <= 0,35[cite: 31]
        { batas: 0.4, nilai: 1.75 }, // Untuk 0,35 < PB <= 0,4[cite: 31]
        { batas: Infinity, nilai: 2.0 }, // Untuk PB >= 0,4[cite: 31]
      ],
    },
    "414_B": {
      kondisiSkor: [
        { batas: 0.4, nilai: 0.0 }, // Untuk PPNP <= 0,4
        { batas: 0.6, nilai: 0.5 }, // Untuk 0,4 < PPNP <= 0,6
        { batas: 0.8, nilai: 1.0 }, // Untuk 0,6 < PPNP <= 0,8
        { batas: 1.0, nilai: 1.5 }, // Untuk 0,8 < PPNP <= 1
        { batas: Infinity, nilai: 2.0 }, // Untuk PPNP > 1
      ],
    },
  },

  // ===================== NON RAWAT INAP =====================
  nonRawatInap: {
    "111_C1": {
      kondisiSkor: [
        { batas: 0.999, nilai: 0.0 },
        { batas: 0.499, nilai: 0.4 },
        { batas: 0.999, nilai: 0.8 },
        { batas: Infinity, nilai: 1.0 },
      ],
    },
    "111_C2": {
      kondisiSkor: [
        { batas: 0.999, nilai: 0.0 },
        { batas: 0.499, nilai: 0.4 },
        { batas: 0.999, nilai: 0.8 },
        { batas: Infinity, nilai: 1.0 },
      ],
    },
    "111_C3": {
      kondisiSkor: [
        { batas: 0.999, nilai: 0.0 },
        { batas: 0.499, nilai: 0.4 },
        { batas: 0.999, nilai: 0.8 },
        { batas: Infinity, nilai: 1.0 },
      ],
    },

    // ===================== KELOMPOK 211 =====================
    "211_A": {
      kondisiSkor: [
        { batas: 0.8499, nilai: 0.0 }, // Mewakili RJ < 0,85
        { batas: 0.8999, nilai: 0.5 }, // Mewakili 0,85 ≤ RJ < 0,90
        { batas: 0.9499, nilai: 1.0 }, // Mewakili 0,90 ≤ RJ < 0,95
        { batas: 0.9999, nilai: 1.5 }, // Mewakili 0,95 ≤ RJ < 1,00
        { batas: 1.0999, nilai: 2.0 }, // Mewakili 1,00 ≤ RJ < 1,10
        { batas: Infinity, nilai: 3.0 }, // Mewakili RJ ≥ 1,10
      ],
    },
    "211_B": {
      kondisiSkor: [
        { batas: Infinity, nilai: 0.0 }, // Seluruh kategori bernilai 0 untuk Non Inap
      ],
    },
    "211_C": {
      kondisiSkor: [
        { batas: 0.8499, nilai: 0.0 }, // Untuk PL < 0,85
        { batas: 0.8999, nilai: 0.5 }, // Untuk 0,85 <= PL < 0,90
        { batas: 0.9499, nilai: 1.0 }, // Untuk 0,90 <= PL < 0,95
        { batas: 0.9999, nilai: 1.5 }, // Untuk 0,95 <= PL < 1,00
        { batas: 1.0999, nilai: 2.0 }, // Untuk 1,00 <= PL < 1,10
        { batas: Infinity, nilai: 3.0 }, // Untuk PL >= 1,10
      ],
    },

    // ===================== KELOMPOK 212 =====================
    "212_A": {
      kondisiSkor: [
        { batas: 0.0999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.5 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 1.0 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 1.5 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 2.0 }, // Untuk PKIH = 1
      ],
    },
    "212_B1": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.4 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 0.6 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 0.8 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 1.0 }, // Untuk PKIH = 1
      ],
    },
    "212_B2": {
      kondisiSkor: [
        { batas: 0, nilai: 1.0 }, // Untuk AKI = 0[cite: 8]
        { batas: Infinity, nilai: 0.0 }, // Untuk AKI > 0[cite: 8]
      ],
    },
    "212_C": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.5 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 1.0 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 1.5 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 2.0 }, // Untuk PKIH = 1
      ],
    },
    "212_D": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.5 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 1.0 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 1.5 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 2.0 }, // Untuk PKIH = 1
      ],
    },
    "212_E": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.5 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 1.0 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 1.5 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 2.0 }, // Untuk PKIH = 1
      ],
    },
    "212_F": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.5 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 1.0 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 1.5 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 2.0 }, // Untuk PKIH = 1
      ],
    },
    "212_G": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.25 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 0.5 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 1.0 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 1.5 }, // Untuk PKIH = 1
      ],
    },
    "212_I1": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.1 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 0.2 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 0.4 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 0.5 }, // Untuk PKIH = 1
      ],
    },
    "212_I2": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.5 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.4 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 0.2 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 0.1 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 0.0 }, // Untuk PKIH = 1
      ],
    },
    "212_I3": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.5 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.4 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 0.2 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 0.1 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 0.0 }, // Untuk PKIH = 1
      ],
    },
    "212_J": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.5 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 1.0 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 1.5 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 2.0 }, // Untuk PKIH = 1
      ],
    },
    "212_K": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.5 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 1.0 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 1.5 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 2.0 }, // Untuk PKIH = 1
      ],
    },
    "212_L": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.5 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 1.0 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 1.5 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 2.0 }, // Untuk PKIH = 1
      ],
    },
    "212_M": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.5 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 1.0 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 1.5 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 2.0 }, // Untuk PKIH = 1
      ],
    },
    "212_N": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.5 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 1.0 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 1.5 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 2.0 }, // Untuk PKIH = 1
      ],
    },
    "212_P": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.25 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 0.5 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 0.75 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 1.0 }, // Untuk PKIH = 1
      ],
    },
    "212_Q": {
      kondisiSkor: [
        { batas: 0.9999, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.4999, nilai: 0.25 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.7499, nilai: 0.5 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 0.9999, nilai: 0.75 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 1.0 }, // Untuk PKIH = 1
      ],
    },

    // ===================== KELOMPOK 311 =====================
    "311_A": {
      kondisiSkor: [
        { batas: 8.0, nilai: 3.0 }, // Untuk ERT <= 8[cite: 12]
        { batas: 15.0, nilai: 2.0 }, // Untuk 8 < ERT <= 15[cite: 12]
        { batas: 30.0, nilai: 1.0 }, // Untuk 15 < ERT <= 30[cite: 12]
        { batas: Infinity, nilai: 0.5 }, // Untuk ERT > 30[cite: 12]
      ],
    },
    "311_B": {
      kondisiSkor: [
        { batas: Infinity, nilai: 0.0 }, // Seluruh kategori bernilai 0 untuk Non Inap[cite: 13]
      ],
    },
    "311_C": {
      kondisiSkor: [
        { batas: Infinity, nilai: 0.0 }, // Seluruh kategori bernilai 0 untuk Non Inap[cite: 13]
      ],
    },
    "311_D": {
      kondisiSkor: [
        { batas: 3.0, nilai: 3.0 }, // Untuk WTL <= 3[cite: 15]
        { batas: 4.0, nilai: 2.0 }, // Untuk 3 < WTL <= 4[cite: 15]
        { batas: 5.0, nilai: 1.0 }, // Untuk 4 < WTL <= 5[cite: 15]
        { batas: Infinity, nilai: 0.5 }, // Untuk WTL > 5[cite: 15]
      ],
    },
    "311_E": {
      kondisiSkor: [
        { batas: 0.3, nilai: 0.5 }, // Untuk KKT <= 0,3[cite: 16]
        { batas: 0.5, nilai: 1.0 }, // Untuk 0,3 < KKT <= 0,5[cite: 16]
        { batas: 0.84, nilai: 2.0 }, // Untuk 0,5 < KKT <= 0,84[cite: 16]
        { batas: Infinity, nilai: 3.0 }, // Untuk KKT > 0,85[cite: 16]
      ],
    },
    "311_F": {
      kondisiSkor: [
        { batas: 0.7999, nilai: 3.0 }, // Untuk KAPD < 0,8[cite: 17]
        { batas: 0.8999, nilai: 2.0 }, // Untuk 0,8 <= KAPD < 0,9[cite: 17]
        { batas: 0.9999, nilai: 1.0 }, // Untuk 0,9 <= KAPD < 1[cite: 17]
        { batas: Infinity, nilai: 0.5 }, // Untuk KAPD <= 1[cite: 17]
      ],
    },
    "311_G": {
      kondisiSkor: [
        { batas: 0.7999, nilai: 0.5 }, // Untuk KAPD < 0,8[cite: 17]
        { batas: 0.8999, nilai: 1.0 }, // Untuk 0,8 <= KAPD < 0,9[cite: 17]
        { batas: 0.9999, nilai: 2.0 }, // Untuk 0,9 <= KAPD < 1[cite: 17]
        { batas: Infinity, nilai: 3.0 }, // Untuk KAPD <= 1[cite: 17]
      ],
    },
    "311_H": {
      kondisiSkor: [
        { batas: Infinity, nilai: 0.0 }, // Seluruh kategori bernilai 0 untuk Non Inap[cite: 20]
      ],
    },
    "311_I1": {
      kondisiSkor: [
        { batas: 0.4999, nilai: 0.1 }, // Untuk PTBC < 0,5[cite: 21]
        { batas: 0.6999, nilai: 0.5 }, // Untuk 0,5 <= PTBC < 0,7[cite: 21]
        { batas: 0.8999, nilai: 0.75 }, // Untuk 0,7 <= PTBC <= 0,9[cite: 21]
        { batas: Infinity, nilai: 1.0 }, // Untuk 0,9 <= PTBC <= 1[cite: 21]
      ],
    },
    "311_I2": {
      kondisiSkor: [
        { batas: 0.3, nilai: 0.1 }, // Untuk AKP <= 0,3
        { batas: 0.5, nilai: 0.5 }, // Untuk 0,3 < AKP <= 0,5
        { batas: 0.9, nilai: 1.0 }, // Untuk 0,5 < AKP <= 0,9
        { batas: Infinity, nilai: 1.5 }, // Untuk AKP > 0,9
      ],
    },

    // ===================== KELOMPOK 312 =====================
    "312_A": {
      kondisiSkor: [
        { batas: 0.3, nilai: 0.2 }, // Untuk PP/K <= 0,3[cite: 22]
        { batas: 0.5, nilai: 0.5 }, // Untuk 0,3 < PP/K <= 0,5[cite: 22]
        { batas: 0.9, nilai: 0.75 }, // Untuk 0,5 < PP/K <= 0,9[cite: 22]
        { batas: Infinity, nilai: 1.5 }, // Untuk PP/K > 0,9[cite: 22]
      ],
    },
    "312_B": {
      kondisiSkor: [
        { batas: 0.3, nilai: 0.5 }, // Untuk KP < 0,3[cite: 23]
        { batas: 0.5, nilai: 0.8 }, // Untuk 0,3 < KP < 0,5[cite: 23]
        { batas: 0.7661, nilai: 0.1 }, // Untuk 0,5 < KP < 0,766[cite: 23]
        { batas: Infinity, nilai: 1.5 }, // Untuk KP > 0,7661[cite: 23]
      ],
    },
    "312_C1": {
      kondisiSkor: [
        { batas: 0.3, nilai: 0.1 }, // Untuk KRF <= 0,3[cite: 24]
        { batas: 0.5, nilai: 0.25 }, // Untuk 0,3 < KRF <= 0,5[cite: 24]
        { batas: 0.9, nilai: 0.5 }, // Untuk 0,5 < KRF <= 0,9[cite: 24]
        { batas: Infinity, nilai: 0.75 }, // Untuk KRF > 0,9[cite: 24]
      ],
    },
    "312_C2": {
      kondisiSkor: [
        { batas: 0.1, nilai: 0.75 }, // Untuk KOLASA <= 0,1[cite: 25]
        { batas: 0.3, nilai: 0.5 }, // Untuk 0,1 < KOLASA <= 0,3[cite: 25]
        { batas: 0.5, nilai: 0.25 }, // Untuk 0,3 < KOLASA <= 0,5[cite: 25]
        { batas: Infinity, nilai: 0.0 }, // Untuk KOLASA > 0,5[cite: 25]
      ],
    },
    // ===================== KELOMPOK 411 =====================
    "411_A": {
      kondisiSkor: [
        { batas: 30.0, nilai: 2.0 }, // Untuk PPP < 30 hari[cite: 21]
        { batas: 40.0, nilai: 1.6 }, // Untuk 30 <= PPP < 40 hari[cite: 21]
        { batas: 60.0, nilai: 1.2 }, // Untuk 40 <= PPP < 60 hari[cite: 21]
        { batas: 80.0, nilai: 0.8 }, // Untuk 60 <= PPP < 80 hari[cite: 21]
        { batas: 100.0, nilai: 0.4 }, // Untuk 80 <= PPP < 100 hari[cite: 21]
        { batas: Infinity, nilai: 0.0 }, // Untuk PPP > 100 hari[cite: 21]
      ],
    },
    "411_B": {
      kondisiSkor: [
        { batas: 0.0, nilai: 0.0 }, // Untuk PAT = 0[cite: 22]
        { batas: 5.0, nilai: 0.25 }, // Untuk 0 < PAT < 5[cite: 22]
        { batas: 10.0, nilai: 0.5 }, // Untuk 5 < PAT < 10[cite: 22]
        { batas: 15.0, nilai: 1.0 }, // Untuk 10 < PAT < 15[cite: 22]
        { batas: 20.0, nilai: 1.5 }, // Untuk 15 < PAT < 20[cite: 22]
        { batas: Infinity, nilai: 2.0 }, // Untuk PAT > 20[cite: 22]
      ],
    },
    "411_C": {
      kondisiSkor: [
        { batas: 5.0, nilai: 0.0 }, // Untuk 0 < PP < 5[cite: 23]
        { batas: 15.0, nilai: 0.5 }, // Untuk 5 < PP < 15[cite: 23]
        { batas: 25.0, nilai: 1.0 }, // Untuk 15 < PP < 25[cite: 23]
        { batas: 30.0, nilai: 1.5 }, // Untuk 25 < PP < 30[cite: 23]
        { batas: 35.0, nilai: 2.0 }, // Untuk 30 < PP < 35[cite: 23]
        { batas: 45.0, nilai: 1.5 }, // Untuk 35 < PP < 45[cite: 23]
        { batas: 55.0, nilai: 1.0 }, // Untuk 45 < PP < 55[cite: 23]
        { batas: 60.0, nilai: 0.5 }, // Untuk 55 < PP < 60[cite: 23]
        { batas: Infinity, nilai: 0.0 }, // Untuk PP > 60[cite: 23]
      ],
    },
    "411_D": {
      kondisiSkor: [
        { batas: 0.01, nilai: 0.0 }, // Untuk ROFA <= 0,01[cite: 24]
        { batas: 0.02, nilai: 0.1 }, // Untuk 0,01 < ROFA <= 0,02[cite: 24]
        { batas: 0.03, nilai: 0.2 }, // Untuk 0,02 < ROFA <= 0,03[cite: 24]
        { batas: 0.04, nilai: 0.4 }, // Untuk 0,03 < ROFA <= 0,04[cite: 24]
        { batas: 0.05, nilai: 0.6 }, // Untuk 0,04 < ROFA <= 0,05[cite: 24]
        { batas: 0.06, nilai: 0.8 }, // Untuk 0,05 < ROFA <= 0,06[cite: 24]
        { batas: Infinity, nilai: 1.0 }, // Untuk ROFA > 0,06[cite: 24]
      ],
    },
    "411_E": {
      kondisiSkor: [
        { batas: 0.0, nilai: 0.0 }, // Untuk ROE = 0[cite: 25]
        { batas: 0.01, nilai: 0.2 }, // Untuk 0 < ROE <= 0,01[cite: 25]
        { batas: 0.02, nilai: 0.3 }, // Untuk 0,01 < ROE <= 0,02[cite: 25]
        { batas: 0.03, nilai: 0.4 }, // Untuk 0,02 < ROE <= 0,03[cite: 25]
        { batas: 0.04, nilai: 0.5 }, // Untuk 0,03 < ROE <= 0,04[cite: 25]
        { batas: 0.05, nilai: 0.6 }, // Untuk 0,04 < ROE <= 0,05[cite: 25]
        { batas: 0.06, nilai: 0.7 }, // Untuk 0,05 < ROE <= 0,06[cite: 25]
        { batas: 0.07, nilai: 0.8 }, // Untuk 0,06 < ROE <= 0,07[cite: 25]
        { batas: 0.08, nilai: 0.9 }, // Untuk 0,07 < ROE <= 0,08[cite: 25]
        { batas: Infinity, nilai: 1.0 }, // Untuk ROE > 0,08[cite: 25]
      ],
    },
    // ===================== KELOMPOK 412 =====================
    "412_A": {
      kondisiSkor: [
        { batas: 0.4, nilai: 0.0 }, // Untuk 0 <= RK < 0,4[cite: 26]
        { batas: 0.5, nilai: 0.5 }, // Untuk 0,4 <= RK < 0,5[cite: 26]
        { batas: 0.6, nilai: 1.0 }, // Untuk 0,5 <= RK < 0,6[cite: 26]
        { batas: 0.8, nilai: 1.5 }, // Untuk 0,6 <= RK < 0,8[cite: 26]
        { batas: Infinity, nilai: 2.0 }, // Untuk RK >= 0,8[cite: 26]
      ],
    },
    "412_B": {
      kondisiSkor: [
        { batas: 0.0, nilai: 0.0 }, // Untuk RL = 0[cite: 28]
        { batas: 1.2, nilai: 0.25 }, // Untuk 0 < RL <= 1,2[cite: 28]
        { batas: 2.4, nilai: 0.5 }, // Untuk 1,2 < RL <= 2,4[cite: 28]
        { batas: 3.6, nilai: 1.0 }, // Untuk 2,4 < RL <= 3,6[cite: 28]
        { batas: 4.8, nilai: 1.5 }, // Untuk 3,6 < RL <= 4,8[cite: 28]
        { batas: 6.0, nilai: 1.75 }, // Untuk 4,8 < RL <= 6[cite: 27, 28]
        { batas: Infinity, nilai: 2.0 }, // Untuk RL > 6[cite: 27]
      ],
    },

    // ===================== KELOMPOK 413 =====================
    "413_A": {
      kondisiSkor: [
        { batas: 0.01, nilai: 2.0 }, // Untuk RKTA < 0,01[cite: 29]
        { batas: 0.02, nilai: 1.5 }, // Untuk 0,02 < RKTA <= 0,01 (disesuaikan rentang)[cite: 29]
        { batas: 0.03, nilai: 1.0 }, // Untuk 0,03 < RKTA <= 0,02[cite: 29]
        { batas: 0.04, nilai: 0.5 }, // Untuk 0,04 < RKTA <= 0,03[cite: 29]
        { batas: Infinity, nilai: 0.0 }, // Untuk RKTA > 0,05[cite: 29]
      ],
    },
    "413_B": {
      kondisiSkor: [
        { batas: 0.25, nilai: 2.0 }, // Untuk RKTE < 0,25[cite: 30]
        { batas: 0.5, nilai: 1.5 }, // Untuk 0,25 < RKTE <= 0,5[cite: 30]
        { batas: 0.75, nilai: 1.0 }, // Untuk 0,5 < RKTE <= 0,75[cite: 30]
        { batas: 1.0, nilai: 0.5 }, // Untuk 0,75 < RKTE <= 1[cite: 30]
        { batas: Infinity, nilai: 0.0 }, // Untuk RKTE > 1[cite: 30]
      ],
    },

    // ===================== KELOMPOK 414 =====================
    "414_A": {
      kondisiSkor: [
        { batas: 0.025, nilai: 0.0 }, // Untuk 0 < PB <= 0,025[cite: 31]
        { batas: 0.05, nilai: 0.1 }, // Untuk 0,025 < PB <= 0,05[cite: 31]
        { batas: 0.1, nilai: 0.25 }, // Untuk 0,05 < PB <= 0,1[cite: 31]
        { batas: 0.15, nilai: 0.5 }, // Untuk 0,1 < PB <= 0,15[cite: 31]
        { batas: 0.2, nilai: 0.75 }, // Untuk 0,15 < PB <= 0,2[cite: 31]
        { batas: 0.25, nilai: 1.0 }, // Untuk 0,2 < PB <= 0,25[cite: 31]
        { batas: 0.3, nilai: 1.25 }, // Untuk 0,25 < PB <= 0,3[cite: 31]
        { batas: 0.35, nilai: 1.5 }, // Untuk 0,3 < PB <= 0,35[cite: 31]
        { batas: 0.4, nilai: 1.75 }, // Untuk 0,35 < PB <= 0,4[cite: 31]
        { batas: Infinity, nilai: 2.0 }, // Untuk PB >= 0,4[cite: 31]
      ],
    },
    "414_B": {
      kondisiSkor: [
        { batas: 0.4, nilai: 0.0 }, // Untuk PPNP <= 0,4
        { batas: 0.6, nilai: 0.5 }, // Untuk 0,4 < PPNP <= 0,6
        { batas: 0.8, nilai: 1.0 }, // Untuk 0,6 < PPNP <= 0,8
        { batas: 1.0, nilai: 1.5 }, // Untuk 0,8 < PPNP <= 1
        { batas: Infinity, nilai: 2.0 }, // Untuk PPNP > 1
      ],
    },
  },
};
