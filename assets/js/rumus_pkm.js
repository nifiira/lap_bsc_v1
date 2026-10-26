// ==========================================
// 1. KAMUS ATURAN (Data Dictionary)
// ==========================================
const aturanPenilaian = {
  // ===================== KELOMPOK 111 =====================
  rawatInap: {
    "111_C1": {
      kondisiSkor: [
        { batas: 0.1, nilai: 0.0 },
        { batas: 0.5, nilai: 0.4 },
        { batas: 1.0, nilai: 0.8 },
        { batas: Infinity, nilai: 1.0 },
      ],
    },
    "111_C2": {
      kondisiSkor: [
        { batas: 0.1, nilai: 0.0 }, // Untuk PKB < 0,10
        { batas: 0.5, nilai: 0.4 }, // Untuk 0,10 <= PKB < 0,50
        { batas: 1.0, nilai: 0.8 }, // Untuk 0,50 <= PKB <= 0,99
        { batas: Infinity, nilai: 1.0 }, // Untuk PKB = 1
      ],
    },
    "111_C3": {
      kondisiSkor: [
        { batas: 0.1, nilai: 0.0 }, // Untuk PSA < 0,10
        { batas: 0.5, nilai: 0.4 }, // Untuk 0,10 <= PSA < 0,50
        { batas: 1.0, nilai: 0.8 }, // Untuk 0,50 <= PSA <= 0,99
        { batas: Infinity, nilai: 1.0 }, // Untuk PSA = 1
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
        { batas: 0.9999, nilai: 1.2 }, // Mewakili syarat < 1.0
        { batas: 1.0999, nilai: 1.6 }, // Mewakili syarat < 1.1
        { batas: Infinity, nilai: 2.0 }, // Mewakili syarat >= 1.1
      ],
    },
    "211_C": {
      kondisiSkor: [
        { batas: 0.85, nilai: 0.0 }, // Untuk PL < 0,85
        { batas: 0.9, nilai: 0.4 }, // Untuk 0,85 <= PL < 0,90
        { batas: 0.95, nilai: 0.8 }, // Untuk 0,90 <= PL < 0,95
        { batas: 1.0, nilai: 1.0 }, // Untuk 0,95 <= PL < 1,00
        { batas: 1.1, nilai: 1.5 }, // Untuk 1,00 <= PL < 1,10
        { batas: Infinity, nilai: 2.0 }, // Untuk PL >= 1,10
      ],
    },

    // ===================== KELOMPOK 212 =====================
    "212_A": {
      kondisiSkor: [
        { batas: 0.1, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.5, nilai: 0.5 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.75, nilai: 1.0 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 1.0, nilai: 1.5 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 2.0 }, // Untuk PKIH = 1
      ],
    },
    "212_B1": {
      kondisiSkor: [
        { batas: 0.1, nilai: 0.0 }, // Untuk PKIB < 0,10[cite: 7]
        { batas: 0.5, nilai: 0.4 }, // Untuk 0,10 <= PKIB < 0,50[cite: 7]
        { batas: 0.75, nilai: 0.6 }, // Untuk 0,50 <= PKIB < 0,75[cite: 7]
        { batas: 1.0, nilai: 0.8 }, // Untuk 0,75 <= PKIB <= 0,99[cite: 7]
        { batas: Infinity, nilai: 1.0 }, // Untuk PKIB = 1[cite: 7]
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
        { batas: 0.01, nilai: 2.0 }, // Mewakili syarat <= 0.01
        { batas: 0.02, nilai: 1.5 }, // Mewakili syarat <= 0.02
        { batas: 0.03, nilai: 1.0 }, // Mewakili syarat <= 0.03
        { batas: Infinity, nilai: 0.5 }, // Mewakili syarat > 0.03
      ],
    },
    "212_D": {
      kondisiSkor: [
        { batas: 0.01, nilai: 2.0 }, // Mewakili syarat <= 0.01
        { batas: 0.02, nilai: 1.5 }, // Mewakili syarat <= 0.02
        { batas: 0.03, nilai: 1.0 }, // Mewakili syarat <= 0.03
        { batas: Infinity, nilai: 0.5 }, // Mewakili syarat > 0.03
      ],
    },
    "212_E": {
      kondisiSkor: [
        { batas: 0.4999, nilai: 0.5 }, // Mewakili syarat < 0.5
        { batas: 0.6999, nilai: 1.0 }, // Mewakili syarat < 0.7
        { batas: 0.7999, nilai: 1.5 }, // Mewakili syarat < 0.8
        { batas: Infinity, nilai: 2.0 }, // Mewakili syarat >= 0.8
      ],
    },
    "212_F": {
      kondisiSkor: [
        { batas: 0.01, nilai: 2.0 }, // Mewakili syarat <= 0.01
        { batas: 0.02, nilai: 1.5 }, // Mewakili syarat <= 0.02
        { batas: 0.03, nilai: 1.0 }, // Mewakili syarat <= 0.03
        { batas: Infinity, nilai: 0.5 }, // Mewakili syarat > 0.03
      ],
    },
    "212_G": {
      kondisiSkor: [
        { batas: 49.99, nilai: 0.5 }, // Mewakili syarat < 50
        { batas: 59.99, nilai: 1.0 }, // Mewakili syarat < 60
        { batas: 69.99, nilai: 1.5 }, // Mewakili syarat < 70
        { batas: 79.99, nilai: 2.0 }, // Mewakili syarat < 80
        { batas: 89.99, nilai: 1.5 }, // Mewakili syarat < 90
        { batas: 99.99, nilai: 1.0 }, // Mewakili syarat < 100
        { batas: Infinity, nilai: 0.5 }, // Mewakili syarat >= 100
      ],
    },
    // "212_H": {
    //   kondisiSkor: [
    //     { batas: 0.01, nilai: 1.0 }, // Mewakili syarat <= 0.01
    //     { batas: 0.02, nilai: 0.75 }, // Mewakili syarat <= 0.02
    //     { batas: 0.03, nilai: 0.5 }, // Mewakili syarat <= 0.03
    //     { batas: Infinity, nilai: 0.25 }, // Mewakili syarat > 0.03
    //   ],
    // },
    "212_I": {
      kondisiSkor: [
        { batas: 60, nilai: 1.0 }, // Mewakili syarat <= 60
        { batas: 90, nilai: 0.75 }, // Mewakili syarat <= 90
        { batas: 120, nilai: 0.5 }, // Mewakili syarat <= 120
        { batas: Infinity, nilai: 0.25 }, // Mewakili syarat > 120
      ],
    },
    "212_J": {
      kondisiSkor: [
        { batas: 0.7, nilai: 0.25 }, // Mewakili syarat <= 0.7
        { batas: 0.8, nilai: 0.5 }, // Mewakili syarat <= 0.8
        { batas: 0.9, nilai: 0.8 }, // Mewakili syarat <= 0.9
        { batas: Infinity, nilai: 1.0 }, // Mewakili syarat >= 1 (atau > 0.9)
      ],
    },
    "212_K": {
      kondisiSkor: [
        { batas: 25, nilai: 1.0 }, // Mewakili syarat <= 25
        { batas: 50, nilai: 0.75 }, // Mewakili syarat <= 50
        { batas: 75, nilai: 0.5 }, // Mewakili syarat <= 75
        { batas: Infinity, nilai: 0.25 }, // Mewakili syarat > 75
      ],
    },
    // ===================== KELOMPOK 311 =====================
    "311_A": {
      kondisiSkor: [
        { batas: 0, nilai: 0.0 }, // Mewakili = 0
        { batas: 8, nilai: 1.0 }, // Mewakili <= 8
        { batas: 15, nilai: 0.8 }, // Mewakili <= 15
        { batas: 30, nilai: 0.8 }, // Mewakili <= 30
        { batas: Infinity, nilai: 0.4 }, // Mewakili > 30
      ],
    },
    "311_B": {
      kondisiSkor: [
        { batas: 0, nilai: 0.0 }, // Mewakili = 0
        { batas: 0.3, nilai: 1.0 }, // Mewakili <= 0.3
        { batas: 0.5, nilai: 0.8 }, // Mewakili <= 0.5
        { batas: 0.8, nilai: 0.6 }, // Mewakili <= 0.8
        { batas: Infinity, nilai: 0.4 }, // Mewakili >= 0.8
      ],
    },
    "311_C": {
      kondisiSkor: [
        { batas: 5.9999, nilai: 1.0 }, // Mewakili < 6
        { batas: 9, nilai: 0.8 }, // Mewakili <= 9
        { batas: 12, nilai: 0.6 }, // Mewakili <= 12
        { batas: 15, nilai: 0.4 }, // Mewakili <= 15
        { batas: Infinity, nilai: 0.2 }, // Mewakili > 15
      ],
    },
    "311_D": {
      kondisiSkor: [
        { batas: 14.9999, nilai: 1.0 }, // Mewakili < 15
        { batas: 19.9999, nilai: 0.8 }, // Mewakili < 20
        { batas: 29.9999, nilai: 0.6 }, // Mewakili < 30
        { batas: Infinity, nilai: 0.4 }, // Mewakili >= 30
      ],
    },
    "311_E": {
      kondisiSkor: [
        { batas: 0.05, nilai: 1.0 }, // Mewakili <= 0.05
        { batas: 0.1, nilai: 0.8 }, // Mewakili <= 0.1
        { batas: 0.2, nilai: 0.6 }, // Mewakili <= 0.2
        { batas: Infinity, nilai: 0.4 }, // Mewakili > 0.2
      ],
    },
    "311_F": {
      kondisiSkor: [
        { batas: 3, nilai: 1.0 }, // Mewakili <= 3
        { batas: 4, nilai: 0.8 }, // Mewakili <= 4
        { batas: 5, nilai: 0.6 }, // Mewakili <= 5
        { batas: Infinity, nilai: 0.4 }, // Mewakili > 5
      ],
    },
    "311_G": {
      kondisiSkor: [
        { batas: 3, nilai: 1.0 }, // Mewakili <= 3
        { batas: 4, nilai: 0.8 }, // Mewakili <= 4
        { batas: 5, nilai: 0.6 }, // Mewakili <= 5
        { batas: Infinity, nilai: 0.4 }, // Mewakili > 5
      ],
    },
    "311_H": {
      kondisiSkor: [
        { batas: 0.5, nilai: 1.0 }, // Mewakili <= 0.5
        { batas: 0.75, nilai: 0.8 }, // Mewakili <= 0.75
        { batas: 1.0, nilai: 0.6 }, // Mewakili <= 1.0
        { batas: Infinity, nilai: 0.4 }, // Mewakili > 1.0
      ],
    },
    "311_I": {
      kondisiSkor: [
        { batas: 0.25, nilai: 1.0 }, // Mewakili <= 0.25
        { batas: 0.5, nilai: 0.8 }, // Mewakili <= 0.5
        { batas: 0.75, nilai: 0.6 }, // Mewakili <= 0.75
        { batas: Infinity, nilai: 0.4 }, // Mewakili > 0.75
      ],
    },
    "311_J": {
      kondisiSkor: [
        { batas: 0.0499, nilai: 0.4 }, // Mewakili < 0.05
        { batas: 0.0999, nilai: 0.6 }, // Mewakili < 0.1
        { batas: 0.15, nilai: 0.8 }, // Mewakili <= 0.15
        { batas: Infinity, nilai: 1.0 }, // Mewakili > 0.15
      ],
    },
    "311_K": {
      kondisiSkor: [
        { batas: 0.6499, nilai: 0.4 }, // Mewakili < 0.65
        { batas: 0.7499, nilai: 0.6 }, // Mewakili < 0.75
        { batas: 0.8499, nilai: 0.8 }, // Mewakili < 0.85
        { batas: Infinity, nilai: 1.0 }, // Mewakili >= 0.85
      ],
    },
    "311_L": {
      kondisiSkor: [
        { batas: 0.7999, nilai: 0.4 }, // Mewakili < 0.8
        { batas: 0.8999, nilai: 0.6 }, // Mewakili < 0.9
        { batas: 0.9999, nilai: 0.8 }, // Mewakili < 1.0
        { batas: Infinity, nilai: 1.0 }, // Mewakili >= 1.0
      ],
    },
    "311_M": {
      kondisiSkor: [
        { batas: 0.7999, nilai: 0.4 }, // Mewakili < 0.8
        { batas: 0.8999, nilai: 0.6 }, // Mewakili < 0.9
        { batas: 0.9999, nilai: 0.8 }, // Mewakili < 1.0
        { batas: Infinity, nilai: 1.0 }, // Mewakili >= 1.0
      ],
    },
    "311_N": {
      kondisiSkor: [
        { batas: 0.7999, nilai: 0.4 }, // Mewakili < 0.8
        { batas: 0.8999, nilai: 0.6 }, // Mewakili < 0.9
        { batas: 0.9999, nilai: 0.8 }, // Mewakili < 1.0
        { batas: Infinity, nilai: 1.0 }, // Mewakili >= 1.0
      ],
    },
    "311_O": {
      kondisiSkor: [
        { batas: 0.5999, nilai: 0.4 }, // Mewakili < 0.6
        { batas: 0.6999, nilai: 0.6 }, // Mewakili < 0.7
        { batas: 0.7999, nilai: 0.8 }, // Mewakili < 0.8
        { batas: Infinity, nilai: 1.0 }, // Mewakili >= 0.8
      ],
    },
    "311_P": {
      kondisiSkor: [
        { batas: 0.5999, nilai: 0.4 }, // Mewakili < 0.6
        { batas: 0.6999, nilai: 0.6 }, // Mewakili < 0.7
        { batas: 0.7999, nilai: 0.8 }, // Mewakili < 0.8
        { batas: Infinity, nilai: 1.0 }, // Mewakili >= 0.8
      ],
    },

    // ===================== KELOMPOK 312 =====================
    "312_A": {
      kondisiSkor: [
        { batas: 0.025, nilai: 1.0 }, // Mewakili <= 0.025
        { batas: 0.03, nilai: 0.75 }, // Mewakili <= 0.03
        { batas: 0.05, nilai: 0.5 }, // Mewakili <= 0.05
        { batas: Infinity, nilai: 0.25 }, // Mewakili > 0.05
      ],
    },
    "312_B": {
      kondisiSkor: [
        { batas: 0.2499, nilai: 1.0 }, // Mewakili < 0.25
        { batas: 0.4, nilai: 0.75 }, // Mewakili <= 0.4
        { batas: 0.65, nilai: 0.5 }, // Mewakili <= 0.65
        { batas: Infinity, nilai: 0.25 }, // Mewakili > 0.65
      ],
    },
    "312_C": {
      kondisiSkor: [
        { batas: 0.2, nilai: 1.0 }, // Mewakili <= 0.2
        { batas: 0.5, nilai: 0.75 }, // Mewakili <= 0.5
        { batas: 1.0, nilai: 0.5 }, // Mewakili <= 1.0
        { batas: Infinity, nilai: 0.25 }, // Mewakili > 1.0
      ],
    },
    "312_D": {
      kondisiSkor: [
        { batas: 0.0149, nilai: 0.5 }, // Mewakili < 0.015
        { batas: 0.05, nilai: 0.4 }, // Mewakili <= 0.05
        { batas: 0.1, nilai: 0.3 }, // Mewakili <= 0.1
        { batas: Infinity, nilai: 0.2 }, // Mewakili > 0.1
      ],
    },
    "312_E": {
      kondisiSkor: [
        { batas: 0.0149, nilai: 0.5 }, // Mewakili < 0.015
        { batas: 0.05, nilai: 0.4 }, // Mewakili <= 0.05
        { batas: 0.1, nilai: 0.3 }, // Mewakili <= 0.1
        { batas: Infinity, nilai: 0.2 }, // Mewakili > 0.1
      ],
    },
    "312_F": {
      kondisiSkor: [
        { batas: 0.0149, nilai: 0.5 }, // Mewakili < 0.015
        { batas: 0.05, nilai: 0.25 }, // Mewakili <= 0.05
        { batas: 0.1, nilai: 0.1 }, // Mewakili <= 0.1
      ],
    },
    "312_G": {
      kondisiSkor: [
        { batas: 0.0149, nilai: 0.5 }, // Mewakili < 0.015
        { batas: 0.05, nilai: 0.4 }, // Mewakili <= 0.05
        { batas: 0.1, nilai: 0.3 }, // Mewakili <= 0.1
        { batas: Infinity, nilai: 0.2 }, // Mewakili > 0.1
      ],
    },
    "312_H": {
      kondisiSkor: [
        { batas: 0.0099, nilai: 1.0 }, // Mewakili < 0.01
        { batas: 0.02, nilai: 0.75 }, // Mewakili <= 0.02
        { batas: 0.03, nilai: 0.5 }, // Mewakili <= 0.03
        { batas: Infinity, nilai: 0.25 }, // Mewakili > 0.03
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
        { batas: 29.9999, nilai: 2.0 }, // Mewakili < 30
        { batas: 39.9999, nilai: 1.6 }, // Mewakili < 40
        { batas: 59.9999, nilai: 1.2 }, // Mewakili < 60
        { batas: 79.9999, nilai: 0.8 }, // Mewakili < 80
        { batas: 99.9999, nilai: 0.4 }, // Mewakili < 100
        { batas: Infinity, nilai: 0.0 }, // Mewakili > 100
      ],
    },
    "411_B": {
      kondisiSkor: [
        { batas: 0, nilai: 0.0 }, // Mewakili = 0
        { batas: 4.9999, nilai: 0.25 }, // Mewakili < 5
        { batas: 9.9999, nilai: 0.5 }, // Mewakili < 10
        { batas: 14.9999, nilai: 1.0 }, // Mewakili < 15
        { batas: 19.9999, nilai: 1.5 }, // Mewakili < 20
        { batas: Infinity, nilai: 2.0 }, // Mewakili > 20
      ],
    },
    "411_C": {
      kondisiSkor: [
        { batas: 4.9999, nilai: 0.0 }, // Mewakili < 5
        { batas: 14.9999, nilai: 0.5 }, // Mewakili < 15
        { batas: 24.9999, nilai: 1.0 }, // Mewakili < 25
        { batas: 29.9999, nilai: 1.5 }, // Mewakili < 30
        { batas: 34.9999, nilai: 2.0 }, // Mewakili < 35
        { batas: 44.9999, nilai: 1.5 }, // Mewakili < 45
        { batas: 54.9999, nilai: 1.0 }, // Mewakili < 55
        { batas: 59.9999, nilai: 0.5 }, // Mewakili < 60
        { batas: Infinity, nilai: 0.0 }, // Mewakili > 60
      ],
    },
    "411_D": {
      kondisiSkor: [
        { batas: 0.01, nilai: 0.0 }, // Mewakili <= 0.01
        { batas: 0.02, nilai: 0.1 }, // Mewakili <= 0.02
        { batas: 0.03, nilai: 0.2 }, // Mewakili <= 0.03
        { batas: 0.04, nilai: 0.4 }, // Mewakili <= 0.04
        { batas: 0.05, nilai: 0.6 }, // Mewakili <= 0.05
        { batas: 0.06, nilai: 0.8 }, // Mewakili <= 0.06
        { batas: Infinity, nilai: 1.0 }, // Mewakili > 0.06
      ],
    },
    "411_E": {
      kondisiSkor: [
        { batas: 0, nilai: 0.0 }, // Mewakili = 0
        { batas: 0.01, nilai: 0.2 }, // Mewakili <= 0.01
        { batas: 0.02, nilai: 0.3 }, // Mewakili <= 0.02
        { batas: 0.03, nilai: 0.4 }, // Mewakili <= 0.03
        { batas: 0.04, nilai: 0.5 }, // Mewakili <= 0.04
        { batas: 0.05, nilai: 0.6 }, // Mewakili <= 0.05
        { batas: 0.06, nilai: 0.7 }, // Mewakili <= 0.06
        { batas: 0.07, nilai: 0.8 }, // Mewakili <= 0.07
        { batas: 0.08, nilai: 0.9 }, // Mewakili <= 0.08
        { batas: Infinity, nilai: 1.0 }, // Mewakili > 0.08
      ],
    },

    // ===================== KELOMPOK 412 =====================
    "412_A": {
      kondisiSkor: [
        { batas: 0.3999, nilai: 0.0 }, // Mewakili < 0.4
        { batas: 0.4999, nilai: 0.5 }, // Mewakili < 0.5
        { batas: 0.5999, nilai: 1.0 }, // Mewakili < 0.6
        { batas: 0.7999, nilai: 1.5 }, // Mewakili < 0.8
        { batas: Infinity, nilai: 2.0 }, // Mewakili >= 0.8
      ],
    },
    "412_B": {
      kondisiSkor: [
        { batas: 0, nilai: 0.0 }, // Mewakili = 0
        { batas: 1.2, nilai: 0.25 }, // Mewakili <= 1.2
        { batas: 2.4, nilai: 0.5 }, // Mewakili <= 2.4
        { batas: 3.6, nilai: 1.0 }, // Mewakili <= 3.6
        { batas: 4.8, nilai: 1.5 }, // Mewakili <= 4.8
        { batas: 6.0, nilai: 1.75 }, // Mewakili <= 6
        { batas: Infinity, nilai: 2.0 }, // Mewakili > 6
      ],
    },

    // ===================== KELOMPOK 413 =====================
    "413_A": {
      kondisiSkor: [
        { batas: 0.0099, nilai: 2.0 }, // Mewakili < 0.01
        { batas: 0.01, nilai: 1.5 }, // Mewakili <= 0.01
        { batas: 0.02, nilai: 1.0 }, // Mewakili <= 0.02
        { batas: 0.03, nilai: 0.5 }, // Mewakili <= 0.03
        { batas: Infinity, nilai: 0.0 }, // Mewakili > 0.05
      ],
    },
    "413_B": {
      kondisiSkor: [
        { batas: 0.2499, nilai: 2.0 }, // Mewakili < 0.25
        { batas: 0.5, nilai: 1.5 }, // Mewakili <= 0.5
        { batas: 0.75, nilai: 1.0 }, // Mewakili <= 0.75
        { batas: 1.0, nilai: 0.5 }, // Mewakili <= 1.0
        { batas: Infinity, nilai: 0.0 }, // Mewakili > 1.0
      ],
    },

    // ===================== KELOMPOK 414 =====================
    "414_A": {
      kondisiSkor: [
        { batas: 0.025, nilai: 0.0 }, // Diasumsikan sebagai <= 0.025 dari pola Anda (=0,025)
        { batas: 0.05, nilai: 0.1 }, // Mewakili <= 0.05
        { batas: 0.1, nilai: 0.25 }, // Mewakili <= 0.1
        { batas: 0.15, nilai: 0.5 }, // Mewakili <= 0.15
        { batas: 0.2, nilai: 0.75 }, // Mewakili <= 0.2
        { batas: 0.25, nilai: 1.0 }, // Mewakili <= 0.25
        { batas: 0.3, nilai: 1.25 }, // Mewakili <= 0.3
        { batas: 0.35, nilai: 1.5 }, // Mewakili <= 0.35
        { batas: 0.4, nilai: 1.75 }, // Mewakili <= 0.4
        { batas: Infinity, nilai: 2.0 }, // Mewakili > 0.4
      ],
    },
    "414_B": {
      kondisiSkor: [
        { batas: 0.4, nilai: 0.0 }, // Mewakili <= 0.4
        { batas: 0.6, nilai: 0.5 }, // Mewakili <= 0.6
        { batas: 0.8, nilai: 1.0 }, // Mewakili <= 0.8
        { batas: 1.0, nilai: 1.5 }, // Mewakili <= 1.0
        { batas: Infinity, nilai: 2.0 }, // Mewakili > 1.0
      ],
    },
  },

  nonRawatInap: {
    "111_C1": {
      kondisiSkor: [
        { batas: 0.1, nilai: 0.0 },
        { batas: 0.5, nilai: 0.4 },
        { batas: 1.0, nilai: 0.8 },
        { batas: Infinity, nilai: 1.0 },
      ],
    },
    "111_C2": {
      kondisiSkor: [
        { batas: 0.1, nilai: 0.0 }, // Untuk PKB < 0,10
        { batas: 0.5, nilai: 0.4 }, // Untuk 0,10 <= PKB < 0,50
        { batas: 1.0, nilai: 0.8 }, // Untuk 0,50 <= PKB <= 0,99
        { batas: Infinity, nilai: 1.0 }, // Untuk PKB = 1
      ],
    },
    "111_C3": {
      kondisiSkor: [
        { batas: 0.1, nilai: 0.0 }, // Untuk PSA < 0,10
        { batas: 0.5, nilai: 0.4 }, // Untuk 0,10 <= PSA < 0,50
        { batas: 1.0, nilai: 0.8 }, // Untuk 0,50 <= PSA <= 0,99
        { batas: Infinity, nilai: 1.0 }, // Untuk PSA = 1
      ],
    },
    //111_C Sudah sesuai Rumus
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
        { batas: 0.85, nilai: 0.0 }, // Untuk PL < 0,85
        { batas: 0.9, nilai: 0.5 }, // Untuk 0,85 <= PL < 0,90
        { batas: 0.95, nilai: 1.0 }, // Untuk 0,90 <= PL < 0,95
        { batas: 1.0, nilai: 1.5 }, // Untuk 0,95 <= PL < 1,00
        { batas: 1.1, nilai: 2.0 }, // Untuk 1,00 <= PL < 1,10
        { batas: Infinity, nilai: 3.0 }, // Untuk PL >= 1,10
      ],
    },

    // ===================== KELOMPOK 212 =====================
    "212_A": {
      kondisiSkor: [
        { batas: 0.1, nilai: 0.0 }, // Untuk PKIH < 0,10
        { batas: 0.5, nilai: 0.5 }, // Untuk 0,10 <= PKIH < 0,50
        { batas: 0.75, nilai: 1.0 }, // Untuk 0,50 <= PKIH < 0,75
        { batas: 1.0, nilai: 1.5 }, // Untuk 0,75 <= PKIH <= 0,99
        { batas: Infinity, nilai: 2.0 }, // Untuk PKIH = 1
      ],
    },
    "212_B1": {
      kondisiSkor: [
        { batas: 0.1, nilai: 0.0 }, // Untuk PKIB < 0,10[cite: 7]
        { batas: 0.5, nilai: 0.4 }, // Untuk 0,10 <= PKIB < 0,50[cite: 7]
        { batas: 0.75, nilai: 0.6 }, // Untuk 0,50 <= PKIB < 0,75[cite: 7]
        { batas: 1.0, nilai: 0.8 }, // Untuk 0,75 <= PKIB <= 0,99[cite: 7]
        { batas: Infinity, nilai: 1.0 }, // Untuk PKIB = 1[cite: 7]
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
        { batas: 0.01, nilai: 2.0 }, // Mewakili syarat <= 0.01
        { batas: 0.02, nilai: 1.5 }, // Mewakili syarat <= 0.02
        { batas: 0.03, nilai: 1.0 }, // Mewakili syarat <= 0.03
        { batas: Infinity, nilai: 0.5 }, // Mewakili syarat > 0.03
      ],
    },
    "212_D": {
      kondisiSkor: [
        { batas: 0.01, nilai: 2.0 }, // Mewakili syarat <= 0.01
        { batas: 0.02, nilai: 1.5 }, // Mewakili syarat <= 0.02
        { batas: 0.03, nilai: 1.0 }, // Mewakili syarat <= 0.03
        { batas: Infinity, nilai: 0.5 }, // Mewakili syarat > 0.03
      ],
    },
    "212_E": {
      kondisiSkor: [
        { batas: 0.4999, nilai: 0.5 }, // Mewakili syarat < 0.5
        { batas: 0.6999, nilai: 1.0 }, // Mewakili syarat < 0.7
        { batas: 0.7999, nilai: 1.5 }, // Mewakili syarat < 0.8
        { batas: Infinity, nilai: 2.0 }, // Mewakili syarat >= 0.8
      ],
    },
    "212_F": {
      kondisiSkor: [
        { batas: 0.01, nilai: 2.0 }, // Mewakili syarat <= 0.01
        { batas: 0.02, nilai: 1.5 }, // Mewakili syarat <= 0.02
        { batas: 0.03, nilai: 1.0 }, // Mewakili syarat <= 0.03
        { batas: Infinity, nilai: 0.5 }, // Mewakili syarat > 0.03
      ],
    },
    "212_G": {
      kondisiSkor: [
        { batas: 49.99, nilai: 0.5 }, // Mewakili syarat < 50
        { batas: 59.99, nilai: 1.0 }, // Mewakili syarat < 60
        { batas: 69.99, nilai: 1.5 }, // Mewakili syarat < 70
        { batas: 79.99, nilai: 2.0 }, // Mewakili syarat < 80
        { batas: 89.99, nilai: 1.5 }, // Mewakili syarat < 90
        { batas: 99.99, nilai: 1.0 }, // Mewakili syarat < 100
        { batas: Infinity, nilai: 0.5 }, // Mewakili syarat >= 100
      ],
    },
    // "212_H": {
    //   kondisiSkor: [
    //     { batas: 0.01, nilai: 1.0 }, // Mewakili syarat <= 0.01
    //     { batas: 0.02, nilai: 0.75 }, // Mewakili syarat <= 0.02
    //     { batas: 0.03, nilai: 0.5 }, // Mewakili syarat <= 0.03
    //     { batas: Infinity, nilai: 0.25 }, // Mewakili syarat > 0.03
    //   ],
    // },
    "212_I": {
      kondisiSkor: [
        { batas: 60, nilai: 1.0 }, // Mewakili syarat <= 60
        { batas: 90, nilai: 0.75 }, // Mewakili syarat <= 90
        { batas: 120, nilai: 0.5 }, // Mewakili syarat <= 120
        { batas: Infinity, nilai: 0.25 }, // Mewakili syarat > 120
      ],
    },
    "212_J": {
      kondisiSkor: [
        { batas: 0.7, nilai: 0.25 }, // Mewakili syarat <= 0.7
        { batas: 0.8, nilai: 0.5 }, // Mewakili syarat <= 0.8
        { batas: 0.9, nilai: 0.8 }, // Mewakili syarat <= 0.9
        { batas: Infinity, nilai: 1.0 }, // Mewakili syarat >= 1 (atau > 0.9)
      ],
    },
    "212_K": {
      kondisiSkor: [
        { batas: 25, nilai: 1.0 }, // Mewakili syarat <= 25
        { batas: 50, nilai: 0.75 }, // Mewakili syarat <= 50
        { batas: 75, nilai: 0.5 }, // Mewakili syarat <= 75
        { batas: Infinity, nilai: 0.25 }, // Mewakili syarat > 75
      ],
    },
    // ===================== KELOMPOK 311 =====================
    "311_A": {
      kondisiSkor: [
        { batas: 0, nilai: 0.0 }, // Mewakili = 0
        { batas: 8, nilai: 1.0 }, // Mewakili <= 8
        { batas: 15, nilai: 0.8 }, // Mewakili <= 15
        { batas: 30, nilai: 0.8 }, // Mewakili <= 30
        { batas: Infinity, nilai: 0.4 }, // Mewakili > 30
      ],
    },
    "311_B": {
      kondisiSkor: [
        { batas: 0, nilai: 0.0 }, // Mewakili = 0
        { batas: 0.3, nilai: 1.0 }, // Mewakili <= 0.3
        { batas: 0.5, nilai: 0.8 }, // Mewakili <= 0.5
        { batas: 0.8, nilai: 0.6 }, // Mewakili <= 0.8
        { batas: Infinity, nilai: 0.4 }, // Mewakili >= 0.8
      ],
    },
    "311_C": {
      kondisiSkor: [
        { batas: 5.9999, nilai: 1.0 }, // Mewakili < 6
        { batas: 9, nilai: 0.8 }, // Mewakili <= 9
        { batas: 12, nilai: 0.6 }, // Mewakili <= 12
        { batas: 15, nilai: 0.4 }, // Mewakili <= 15
        { batas: Infinity, nilai: 0.2 }, // Mewakili > 15
      ],
    },
    "311_D": {
      kondisiSkor: [
        { batas: 14.9999, nilai: 1.0 }, // Mewakili < 15
        { batas: 19.9999, nilai: 0.8 }, // Mewakili < 20
        { batas: 29.9999, nilai: 0.6 }, // Mewakili < 30
        { batas: Infinity, nilai: 0.4 }, // Mewakili >= 30
      ],
    },
    "311_E": {
      kondisiSkor: [
        { batas: 0.05, nilai: 1.0 }, // Mewakili <= 0.05
        { batas: 0.1, nilai: 0.8 }, // Mewakili <= 0.1
        { batas: 0.2, nilai: 0.6 }, // Mewakili <= 0.2
        { batas: Infinity, nilai: 0.4 }, // Mewakili > 0.2
      ],
    },
    "311_F": {
      kondisiSkor: [
        { batas: 3, nilai: 1.0 }, // Mewakili <= 3
        { batas: 4, nilai: 0.8 }, // Mewakili <= 4
        { batas: 5, nilai: 0.6 }, // Mewakili <= 5
        { batas: Infinity, nilai: 0.4 }, // Mewakili > 5
      ],
    },
    "311_G": {
      kondisiSkor: [
        { batas: 3, nilai: 1.0 }, // Mewakili <= 3
        { batas: 4, nilai: 0.8 }, // Mewakili <= 4
        { batas: 5, nilai: 0.6 }, // Mewakili <= 5
        { batas: Infinity, nilai: 0.4 }, // Mewakili > 5
      ],
    },
    "311_H": {
      kondisiSkor: [
        { batas: 0.5, nilai: 1.0 }, // Mewakili <= 0.5
        { batas: 0.75, nilai: 0.8 }, // Mewakili <= 0.75
        { batas: 1.0, nilai: 0.6 }, // Mewakili <= 1.0
        { batas: Infinity, nilai: 0.4 }, // Mewakili > 1.0
      ],
    },
    "311_I": {
      kondisiSkor: [
        { batas: 0.25, nilai: 1.0 }, // Mewakili <= 0.25
        { batas: 0.5, nilai: 0.8 }, // Mewakili <= 0.5
        { batas: 0.75, nilai: 0.6 }, // Mewakili <= 0.75
        { batas: Infinity, nilai: 0.4 }, // Mewakili > 0.75
      ],
    },
    "311_J": {
      kondisiSkor: [
        { batas: 0.0499, nilai: 0.4 }, // Mewakili < 0.05
        { batas: 0.0999, nilai: 0.6 }, // Mewakili < 0.1
        { batas: 0.15, nilai: 0.8 }, // Mewakili <= 0.15
        { batas: Infinity, nilai: 1.0 }, // Mewakili > 0.15
      ],
    },
    "311_K": {
      kondisiSkor: [
        { batas: 0.6499, nilai: 0.4 }, // Mewakili < 0.65
        { batas: 0.7499, nilai: 0.6 }, // Mewakili < 0.75
        { batas: 0.8499, nilai: 0.8 }, // Mewakili < 0.85
        { batas: Infinity, nilai: 1.0 }, // Mewakili >= 0.85
      ],
    },
    "311_L": {
      kondisiSkor: [
        { batas: 0.7999, nilai: 0.4 }, // Mewakili < 0.8
        { batas: 0.8999, nilai: 0.6 }, // Mewakili < 0.9
        { batas: 0.9999, nilai: 0.8 }, // Mewakili < 1.0
        { batas: Infinity, nilai: 1.0 }, // Mewakili >= 1.0
      ],
    },
    "311_M": {
      kondisiSkor: [
        { batas: 0.7999, nilai: 0.4 }, // Mewakili < 0.8
        { batas: 0.8999, nilai: 0.6 }, // Mewakili < 0.9
        { batas: 0.9999, nilai: 0.8 }, // Mewakili < 1.0
        { batas: Infinity, nilai: 1.0 }, // Mewakili >= 1.0
      ],
    },
    "311_N": {
      kondisiSkor: [
        { batas: 0.7999, nilai: 0.4 }, // Mewakili < 0.8
        { batas: 0.8999, nilai: 0.6 }, // Mewakili < 0.9
        { batas: 0.9999, nilai: 0.8 }, // Mewakili < 1.0
        { batas: Infinity, nilai: 1.0 }, // Mewakili >= 1.0
      ],
    },
    "311_O": {
      kondisiSkor: [
        { batas: 0.5999, nilai: 0.4 }, // Mewakili < 0.6
        { batas: 0.6999, nilai: 0.6 }, // Mewakili < 0.7
        { batas: 0.7999, nilai: 0.8 }, // Mewakili < 0.8
        { batas: Infinity, nilai: 1.0 }, // Mewakili >= 0.8
      ],
    },
    "311_P": {
      kondisiSkor: [
        { batas: 0.5999, nilai: 0.4 }, // Mewakili < 0.6
        { batas: 0.6999, nilai: 0.6 }, // Mewakili < 0.7
        { batas: 0.7999, nilai: 0.8 }, // Mewakili < 0.8
        { batas: Infinity, nilai: 1.0 }, // Mewakili >= 0.8
      ],
    },

    // ===================== KELOMPOK 312 =====================
    "312_A": {
      kondisiSkor: [
        { batas: 0.025, nilai: 1.0 }, // Mewakili <= 0.025
        { batas: 0.03, nilai: 0.75 }, // Mewakili <= 0.03
        { batas: 0.05, nilai: 0.5 }, // Mewakili <= 0.05
        { batas: Infinity, nilai: 0.25 }, // Mewakili > 0.05
      ],
    },
    "312_B": {
      kondisiSkor: [
        { batas: 0.2499, nilai: 1.0 }, // Mewakili < 0.25
        { batas: 0.4, nilai: 0.75 }, // Mewakili <= 0.4
        { batas: 0.65, nilai: 0.5 }, // Mewakili <= 0.65
        { batas: Infinity, nilai: 0.25 }, // Mewakili > 0.65
      ],
    },
    "312_C": {
      kondisiSkor: [
        { batas: 0.2, nilai: 1.0 }, // Mewakili <= 0.2
        { batas: 0.5, nilai: 0.75 }, // Mewakili <= 0.5
        { batas: 1.0, nilai: 0.5 }, // Mewakili <= 1.0
        { batas: Infinity, nilai: 0.25 }, // Mewakili > 1.0
      ],
    },
    "312_D": {
      kondisiSkor: [
        { batas: 0.0149, nilai: 0.5 }, // Mewakili < 0.015
        { batas: 0.05, nilai: 0.4 }, // Mewakili <= 0.05
        { batas: 0.1, nilai: 0.3 }, // Mewakili <= 0.1
        { batas: Infinity, nilai: 0.2 }, // Mewakili > 0.1
      ],
    },
    "312_E": {
      kondisiSkor: [
        { batas: 0.0149, nilai: 0.5 }, // Mewakili < 0.015
        { batas: 0.05, nilai: 0.4 }, // Mewakili <= 0.05
        { batas: 0.1, nilai: 0.3 }, // Mewakili <= 0.1
        { batas: Infinity, nilai: 0.2 }, // Mewakili > 0.1
      ],
    },
    "312_F": {
      kondisiSkor: [
        { batas: 0.0149, nilai: 0.5 }, // Mewakili < 0.015
        { batas: 0.05, nilai: 0.25 }, // Mewakili <= 0.05
        { batas: 0.1, nilai: 0.1 }, // Mewakili <= 0.1
      ],
    },
    "312_G": {
      kondisiSkor: [
        { batas: 0.0149, nilai: 0.5 }, // Mewakili < 0.015
        { batas: 0.05, nilai: 0.4 }, // Mewakili <= 0.05
        { batas: 0.1, nilai: 0.3 }, // Mewakili <= 0.1
        { batas: Infinity, nilai: 0.2 }, // Mewakili > 0.1
      ],
    },
    "312_H": {
      kondisiSkor: [
        { batas: 0.0099, nilai: 1.0 }, // Mewakili < 0.01
        { batas: 0.02, nilai: 0.75 }, // Mewakili <= 0.02
        { batas: 0.03, nilai: 0.5 }, // Mewakili <= 0.03
        { batas: Infinity, nilai: 0.25 }, // Mewakili > 0.03
      ],
    },

    // ===================== KELOMPOK 313 =====================
    // "313_A": {
    //   kondisiSkor: [
    //     { batas: 0.0999, nilai: 0.4 }, // Mewakili < 0.1
    //     { batas: 0.2, nilai: 0.6 }, // Mewakili <= 0.2
    //     { batas: 0.3, nilai: 0.8 }, // Mewakili <= 0.3
    //     { batas: Infinity, nilai: 1.0 }, // Mewakili > 0.3
    //   ],
    // },
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
        { batas: 29.9999, nilai: 2.0 }, // Mewakili < 30
        { batas: 39.9999, nilai: 1.6 }, // Mewakili < 40
        { batas: 59.9999, nilai: 1.2 }, // Mewakili < 60
        { batas: 79.9999, nilai: 0.8 }, // Mewakili < 80
        { batas: 99.9999, nilai: 0.4 }, // Mewakili < 100
        { batas: Infinity, nilai: 0.0 }, // Mewakili > 100
      ],
    },
    "411_B": {
      kondisiSkor: [
        { batas: 0, nilai: 0.0 }, // Mewakili = 0
        { batas: 4.9999, nilai: 0.25 }, // Mewakili < 5
        { batas: 9.9999, nilai: 0.5 }, // Mewakili < 10
        { batas: 14.9999, nilai: 1.0 }, // Mewakili < 15
        { batas: 19.9999, nilai: 1.5 }, // Mewakili < 20
        { batas: Infinity, nilai: 2.0 }, // Mewakili > 20
      ],
    },
    "411_C": {
      kondisiSkor: [
        { batas: 4.9999, nilai: 0.0 }, // Mewakili < 5
        { batas: 14.9999, nilai: 0.5 }, // Mewakili < 15
        { batas: 24.9999, nilai: 1.0 }, // Mewakili < 25
        { batas: 29.9999, nilai: 1.5 }, // Mewakili < 30
        { batas: 34.9999, nilai: 2.0 }, // Mewakili < 35
        { batas: 44.9999, nilai: 1.5 }, // Mewakili < 45
        { batas: 54.9999, nilai: 1.0 }, // Mewakili < 55
        { batas: 59.9999, nilai: 0.5 }, // Mewakili < 60
        { batas: Infinity, nilai: 0.0 }, // Mewakili > 60
      ],
    },
    "411_D": {
      kondisiSkor: [
        { batas: 0.01, nilai: 0.0 }, // Mewakili <= 0.01
        { batas: 0.02, nilai: 0.1 }, // Mewakili <= 0.02
        { batas: 0.03, nilai: 0.2 }, // Mewakili <= 0.03
        { batas: 0.04, nilai: 0.4 }, // Mewakili <= 0.04
        { batas: 0.05, nilai: 0.6 }, // Mewakili <= 0.05
        { batas: 0.06, nilai: 0.8 }, // Mewakili <= 0.06
        { batas: Infinity, nilai: 1.0 }, // Mewakili > 0.06
      ],
    },
    "411_E": {
      kondisiSkor: [
        { batas: 0, nilai: 0.0 }, // Mewakili = 0
        { batas: 0.01, nilai: 0.2 }, // Mewakili <= 0.01
        { batas: 0.02, nilai: 0.3 }, // Mewakili <= 0.02
        { batas: 0.03, nilai: 0.4 }, // Mewakili <= 0.03
        { batas: 0.04, nilai: 0.5 }, // Mewakili <= 0.04
        { batas: 0.05, nilai: 0.6 }, // Mewakili <= 0.05
        { batas: 0.06, nilai: 0.7 }, // Mewakili <= 0.06
        { batas: 0.07, nilai: 0.8 }, // Mewakili <= 0.07
        { batas: 0.08, nilai: 0.9 }, // Mewakili <= 0.08
        { batas: Infinity, nilai: 1.0 }, // Mewakili > 0.08
      ],
    },

    // ===================== KELOMPOK 412 =====================
    "412_A": {
      kondisiSkor: [
        { batas: 0.3999, nilai: 0.0 }, // Mewakili < 0.4
        { batas: 0.4999, nilai: 0.5 }, // Mewakili < 0.5
        { batas: 0.5999, nilai: 1.0 }, // Mewakili < 0.6
        { batas: 0.7999, nilai: 1.5 }, // Mewakili < 0.8
        { batas: Infinity, nilai: 2.0 }, // Mewakili >= 0.8
      ],
    },
    "412_B": {
      kondisiSkor: [
        { batas: 0, nilai: 0.0 }, // Mewakili = 0
        { batas: 1.2, nilai: 0.25 }, // Mewakili <= 1.2
        { batas: 2.4, nilai: 0.5 }, // Mewakili <= 2.4
        { batas: 3.6, nilai: 1.0 }, // Mewakili <= 3.6
        { batas: 4.8, nilai: 1.5 }, // Mewakili <= 4.8
        { batas: 6.0, nilai: 1.75 }, // Mewakili <= 6
        { batas: Infinity, nilai: 2.0 }, // Mewakili > 6
      ],
    },

    // ===================== KELOMPOK 413 =====================
    "413_A": {
      kondisiSkor: [
        { batas: 0.0099, nilai: 2.0 }, // Mewakili < 0.01
        { batas: 0.01, nilai: 1.5 }, // Mewakili <= 0.01
        { batas: 0.02, nilai: 1.0 }, // Mewakili <= 0.02
        { batas: 0.03, nilai: 0.5 }, // Mewakili <= 0.03
        { batas: Infinity, nilai: 0.0 }, // Mewakili > 0.05
      ],
    },
    "413_B": {
      kondisiSkor: [
        { batas: 0.2499, nilai: 2.0 }, // Mewakili < 0.25
        { batas: 0.5, nilai: 1.5 }, // Mewakili <= 0.5
        { batas: 0.75, nilai: 1.0 }, // Mewakili <= 0.75
        { batas: 1.0, nilai: 0.5 }, // Mewakili <= 1.0
        { batas: Infinity, nilai: 0.0 }, // Mewakili > 1.0
      ],
    },

    // ===================== KELOMPOK 414 =====================
    "414_A": {
      kondisiSkor: [
        { batas: 0.025, nilai: 0.0 }, // Diasumsikan sebagai <= 0.025 dari pola Anda (=0,025)
        { batas: 0.05, nilai: 0.1 }, // Mewakili <= 0.05
        { batas: 0.1, nilai: 0.25 }, // Mewakili <= 0.1
        { batas: 0.15, nilai: 0.5 }, // Mewakili <= 0.15
        { batas: 0.2, nilai: 0.75 }, // Mewakili <= 0.2
        { batas: 0.25, nilai: 1.0 }, // Mewakili <= 0.25
        { batas: 0.3, nilai: 1.25 }, // Mewakili <= 0.3
        { batas: 0.35, nilai: 1.5 }, // Mewakili <= 0.35
        { batas: 0.4, nilai: 1.75 }, // Mewakili <= 0.4
        { batas: Infinity, nilai: 2.0 }, // Mewakili > 0.4
      ],
    },
    "414_B": {
      kondisiSkor: [
        { batas: 0.4, nilai: 0.0 }, // Mewakili <= 0.4
        { batas: 0.6, nilai: 0.5 }, // Mewakili <= 0.6
        { batas: 0.8, nilai: 1.0 }, // Mewakili <= 0.8
        { batas: 1.0, nilai: 1.5 }, // Mewakili <= 1.0
        { batas: Infinity, nilai: 2.0 }, // Mewakili > 1.0
      ],
    },
  },
};
