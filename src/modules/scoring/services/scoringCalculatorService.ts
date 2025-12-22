import type {
  ScoringInput,
  ScoringResult,
  ScoringHistory,
  ScoringStatistics,
} from "../types/scoringCalculator.types";
import { ScoreColor } from "../types/scoringCalculator.types";
import { ScoreRange } from "../types/scoringCalculator.types";
import { getFullScoringDetails } from "../utils/scoringCalculator.utils";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const scoringCalculatorService = {
  async calculateScoring(input: ScoringInput): Promise<ScoringResult> {
    const response = await fetch(`${API_BASE_URL}/scoring/calculate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error("Failed to calculate score");
    }

    return response.json();
  },

  async saveCalculation(
    input: ScoringInput,
    result: ScoringResult,
    clientId?: string
  ): Promise<ScoringHistory> {
    const response = await fetch(`${API_BASE_URL}/scoring/history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ input, result, clientId }),
    });

    if (!response.ok) {
      throw new Error("Failed to save calculation");
    }

    return response.json();
  },

  async getHistory(
    clientId?: string,
    page: number = 1,
    limit: number = 20
  ): Promise<{ data: ScoringHistory[]; total: number }> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (clientId) {
      params.append("clientId", clientId);
    }

    const response = await fetch(`${API_BASE_URL}/scoring/history?${params}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch history");
    }

    return response.json();
  },

  async getStatistics(): Promise<ScoringStatistics> {
    const response = await fetch(`${API_BASE_URL}/scoring/statistics`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch statistics");
    }

    return response.json();
  },

  async deleteCalculation(calculationId: string): Promise<void> {
    const response = await fetch(
      `${API_BASE_URL}/scoring/history/${calculationId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete calculation");
    }
  },

  async exportHistory(format: "csv" | "excel" = "csv"): Promise<Blob> {
    const response = await fetch(
      `${API_BASE_URL}/scoring/export?format=${format}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to export history");
    }

    return response.blob();
  },
};

export const scoringCalculatorMockService = {
  async calculateScoring(input: ScoringInput): Promise<ScoringResult> {
    await new Promise((resolve) =>
      setTimeout(resolve, 300 + Math.random() * 300)
    );

    const { salariu, cheltuieli, datorii } = input;

    const result = getFullScoringDetails(salariu, cheltuieli, datorii);

    return result;
  },

  async saveCalculation(
    input: ScoringInput,
    result: ScoringResult,
    clientId?: string
  ): Promise<ScoringHistory> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    return {
      id: `calc-${Date.now()}`,
      clientId,
      clientName: clientId ? `Client ${clientId}` : undefined,
      input,
      result,
      calculatedAt: new Date().toISOString(),
      calculatedBy: "SYSTEM",
    };
  },

  async getHistory(): Promise<{ data: ScoringHistory[]; total: number }> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const mockData: ScoringHistory[] = [
      {
        id: "calc-1",
        clientId: "CLI-001",
        clientName: "Ion Popescu",
        input: {
          salariu: 5000,
          cheltuieli: 1200,
          datorii: 800,
        },
        result: {
          score: 70,
          rataIndatorare: 0.4,
          scoreRange: ScoreRange.MEDIUM,
          scoreColor: ScoreColor.YELLOW,
          explicatie:
            "Scor mediu. Rata de îndatorare este 40.0% (40-50%). Risc moderat.",
          recomandare:
            "Client marginal eligibil. Sumă maximă prudentă: 10,000 RON.",
          eligibil: true,
          sumaMaximaCredit: 10000,
        },
        calculatedAt: "2025-01-15 10:30:00",
        calculatedBy: "operator-1",
      },
      {
        id: "calc-2",
        clientId: "CLI-002",
        clientName: "Maria Ionescu",
        input: {
          salariu: 8000,
          cheltuieli: 1500,
          datorii: 500,
        },
        result: {
          score: 85,
          rataIndatorare: 0.25,
          scoreRange: ScoreRange.VERY_HIGH,
          scoreColor: ScoreColor.GREEN,
          explicatie:
            "Scor excelent! Rata de îndatorare este 25.0% (sub 30%). Risc foarte scăzut.",
          recomandare:
            "Client excelent! Eligibil pentru credit. Sumă maximă recomandată: 28,000 RON.",
          eligibil: true,
          sumaMaximaCredit: 28000,
        },
        calculatedAt: "2025-01-15 11:45:00",
        calculatedBy: "operator-2",
      },
      {
        id: "calc-3",
        clientId: "CLI-003",
        clientName: "Andrei Vasile",
        input: {
          salariu: 3000,
          cheltuieli: 1800,
          datorii: 1000,
        },
        result: {
          score: 25,
          rataIndatorare: 0.933,
          scoreRange: ScoreRange.VERY_LOW,
          scoreColor: ScoreColor.RED,
          explicatie:
            "Scor foarte scăzut. Rata de îndatorare este 93.3% (peste 60%). Risc foarte ridicat.",
          recomandare:
            "Client neeligibil pentru credit. Recomandăm reducerea datoriilor existente.",
          eligibil: false,
        },
        calculatedAt: "2025-01-15 14:20:00",
        calculatedBy: "operator-1",
      },
      {
        id: "calc-4",
        clientId: "CLI-004",
        clientName: "Elena Popa",
        input: {
          salariu: 6000,
          cheltuieli: 1700,
          datorii: 600,
        },
        result: {
          score: 70,
          rataIndatorare: 0.383,
          scoreRange: ScoreRange.HIGH,
          scoreColor: ScoreColor.GREEN,
          explicatie:
            "Scor bun. Rata de îndatorare este 38.3% (30-40%). Risc scăzut.",
          recomandare:
            "Client eligibil pentru credit. Sumă maximă recomandată: 18,000 RON.",
          eligibil: true,
          sumaMaximaCredit: 18000,
        },
        calculatedAt: "2025-01-15 15:10:00",
        calculatedBy: "operator-3",
      },
      {
        id: "calc-5",
        clientId: "CLI-005",
        clientName: "Mihai Constantinescu",
        input: {
          salariu: 4500,
          cheltuieli: 2000,
          datorii: 800,
        },
        result: {
          score: 40,
          rataIndatorare: 0.622,
          scoreRange: ScoreRange.LOW,
          scoreColor: ScoreColor.RED,
          explicatie:
            "Scor scăzut. Rata de îndatorare este 62.2% (peste 60%). Risc foarte ridicat.",
          recomandare:
            "Client neeligibil pentru credit. Recomandăm reducerea datoriilor existente.",
          eligibil: false,
        },
        calculatedAt: "2025-01-15 16:05:00",
        calculatedBy: "operator-2",
      },
    ];

    return {
      data: mockData,
      total: mockData.length,
    };
  },

  async getStatistics(): Promise<ScoringStatistics> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      totalCalculations: 247,
      averageScore: 64.3,
      distributionByRange: {
        [ScoreRange.VERY_HIGH]: 42, // 17%
        [ScoreRange.HIGH]: 58, // 23%
        [ScoreRange.MEDIUM]: 81, // 33%
        [ScoreRange.LOW]: 39, // 16%
        [ScoreRange.VERY_LOW]: 27, // 11%
      },
      eligibilityRate: 73.3, // % (VERY_HIGH + HIGH + MEDIUM)
      averageDebtRatio: 0.43,
    };
  },

  async deleteCalculation(calculationId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log(`Deleted calculation: ${calculationId}`);
  },

  async exportHistory(format: "csv" | "excel" = "csv"): Promise<Blob> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock CSV content
    const csvContent = `ID,Client,Salariu,Cheltuieli,Datorii,Scor,Rata Indatorare,Eligibil,Data
calc-1,Ion Popescu,5000,1200,800,70,0.4,Da,2025-01-15 10:30:00
calc-2,Maria Ionescu,8000,1500,500,85,0.25,Da,2025-01-15 11:45:00
calc-3,Andrei Vasile,3000,1800,1000,25,0.933,Nu,2025-01-15 14:20:00`;

    return new Blob([csvContent], {
      type: format === "csv" ? "text/csv" : "application/vnd.ms-excel",
    });
  },

  async batchCalculate(inputs: ScoringInput[]): Promise<ScoringResult[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const results: ScoringResult[] = [];

    for (const input of inputs) {
      const { salariu, cheltuieli, datorii } = input;
      const result = getFullScoringDetails(salariu, cheltuieli, datorii);
      results.push(result);
    }

    return results;
  },

  async compareCalculations(
    calc1: ScoringInput,
    calc2: ScoringInput
  ): Promise<{
    calculation1: ScoringResult;
    calculation2: ScoringResult;
    comparison: {
      scoreDifference: number;
      ratioDifference: number;
      betterOption: 1 | 2;
      recommendation: string;
    };
  }> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const result1 = getFullScoringDetails(
      calc1.salariu,
      calc1.cheltuieli,
      calc1.datorii
    );
    const result2 = getFullScoringDetails(
      calc2.salariu,
      calc2.cheltuieli,
      calc2.datorii
    );

    const scoreDiff = result1.score - result2.score;
    const ratioDiff = result1.rataIndatorare - result2.rataIndatorare;

    return {
      calculation1: result1,
      calculation2: result2,
      comparison: {
        scoreDifference: scoreDiff,
        ratioDifference: ratioDiff,
        betterOption: scoreDiff >= 0 ? 1 : 2,
        recommendation:
          scoreDiff >= 0
            ? "Prima opțiune are un scor mai bun și prezintă risc mai scăzut."
            : "A doua opțiune are un scor mai bun și prezintă risc mai scăzut.",
      },
    };
  },
};

export const getScoringService = () => {
  const isDevelopment = import.meta.env.MODE === "development";
  const useMock = import.meta.env.VITE_USE_MOCK_SERVICES === "true";

  return isDevelopment || useMock
    ? scoringCalculatorMockService
    : scoringCalculatorService;
};
