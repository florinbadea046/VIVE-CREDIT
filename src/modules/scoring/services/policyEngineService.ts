import {
  type PolicyRule,
  type PolicyExecutionResult,
  type PolicyExecutionHistory,
} from "../types/policyEngine.types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

/**
 * Service pentru Policy Engine - comunică cu backend-ul
 */
export const policyEngineService = {
  /**
   * Obține toate regulile configurate
   */
  async getRules(): Promise<PolicyRule[]> {
    const response = await fetch(`${API_BASE_URL}/policy-engine/rules`);
    if (!response.ok) throw new Error("Failed to fetch rules");
    return response.json();
  },

  /**
   * Actualizează o regulă
   */
  async updateRule(
    ruleId: string,
    updates: Partial<PolicyRule>
  ): Promise<PolicyRule> {
    const response = await fetch(
      `${API_BASE_URL}/policy-engine/rules/${ruleId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      }
    );
    if (!response.ok) throw new Error("Failed to update rule");
    return response.json();
  },

  /**
   * Reordonează regulile
   */
  async reorderRules(ruleIds: string[]): Promise<PolicyRule[]> {
    const response = await fetch(
      `${API_BASE_URL}/policy-engine/rules/reorder`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ruleIds }),
      }
    );
    if (!response.ok) throw new Error("Failed to reorder rules");
    return response.json();
  },

  /**
   * Execută policy engine pentru o aplicație
   */
  async executeForApplication(
    applicationId: string
  ): Promise<PolicyExecutionResult[]> {
    const response = await fetch(`${API_BASE_URL}/policy-engine/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applicationId }),
    });
    if (!response.ok) throw new Error("Failed to execute policy engine");
    return response.json();
  },

  /**
   * Obține istoricul execuțiilor
   */
  async getExecutionHistory(
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: PolicyExecutionHistory[]; total: number }> {
    const response = await fetch(
      `${API_BASE_URL}/policy-engine/history?page=${page}&limit=${limit}`
    );
    if (!response.ok) throw new Error("Failed to fetch history");
    return response.json();
  },

  /**
   * Obține detaliile unei execuții specifice
   */
  async getExecutionDetails(
    executionId: string
  ): Promise<PolicyExecutionHistory> {
    const response = await fetch(
      `${API_BASE_URL}/policy-engine/history/${executionId}`
    );
    if (!response.ok) throw new Error("Failed to fetch execution details");
    return response.json();
  },
};

/**
 * Service mock pentru development/testing
 * Înlocuiește cu policyEngineService în producție
 */
export const policyEngineMockService = {
  async getRules(): Promise<PolicyRule[]> {
    // Simulează delay de rețea
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
      {
        id: "1",
        type: "RISK_SCORE" as
          | "RISK_SCORE"
          | "AML_CHECK"
          | "BLACKLIST_CHECK"
          | "MANDATORY_DOCUMENTS"
          | "INCOME_VERIFICATION",
        name: "Scor minim risc",
        description: "Verifică dacă scorul de risc este peste pragul minim",
        order: 1,
        isActive: true,
        stopOnFail: true,
        config: { minScore: 650 },
      },
      {
        id: "2",
        type: "AML_CHECK" as
          | "RISK_SCORE"
          | "AML_CHECK"
          | "BLACKLIST_CHECK"
          | "MANDATORY_DOCUMENTS"
          | "INCOME_VERIFICATION",
        name: "Verificare AML",
        description: "Verifică interdicții Anti Money Laundering",
        order: 2,
        isActive: true,
        stopOnFail: true,
        config: {},
      },
      {
        id: "3",
        type: "BLACKLIST_CHECK" as
          | "RISK_SCORE"
          | "AML_CHECK"
          | "BLACKLIST_CHECK"
          | "MANDATORY_DOCUMENTS"
          | "INCOME_VERIFICATION",
        name: "Blacklist intern",
        description: "Verifică dacă clientul este pe lista neagră internă",
        order: 3,
        isActive: true,
        stopOnFail: true,
        config: {},
      },
      {
        id: "4",
        type: "MANDATORY_DOCUMENTS" as
          | "RISK_SCORE"
          | "AML_CHECK"
          | "BLACKLIST_CHECK"
          | "MANDATORY_DOCUMENTS"
          | "INCOME_VERIFICATION",
        name: "Documente obligatorii",
        description: "Verifică dacă toate documentele necesare sunt încărcate",
        order: 4,
        isActive: true,
        stopOnFail: true,
        config: { required: ["CI", "Adeverință venit"] },
      },
      {
        id: "5",
        type: "INCOME_VERIFICATION" as
          | "RISK_SCORE"
          | "AML_CHECK"
          | "BLACKLIST_CHECK"
          | "MANDATORY_DOCUMENTS"
          | "INCOME_VERIFICATION",
        name: "Verificare venit",
        description: "Verifică dacă venitul permite suma solicitată",
        order: 5,
        isActive: true,
        stopOnFail: false,
        config: { maxDTI: 40 },
      },
    ];
  },

  async executeRule(rule: PolicyRule): Promise<PolicyExecutionResult> {
    // Simulează execuția unei reguli (1-2 secunde)
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 1000)
    );

    // 85% șansă de succes
    const passed = Math.random() > 0.15;

    return {
      ruleId: rule.id,
      ruleName: rule.name,
      status: passed ? "PASSED" : "FAILED",
      message: passed ? "Verificare trecută cu succes" : "Verificare eșuată",
      executedAt: new Date().toISOString(),
    };
  },
};

export default policyEngineService;
