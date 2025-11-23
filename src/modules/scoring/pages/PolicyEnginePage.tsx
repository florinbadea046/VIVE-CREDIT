import React, { useState, useEffect } from "react";
import { Play, Settings, History } from "lucide-react";
import { usePolicyEngine } from "../hooks/usePolicyEngine";
import { PolicyRuleCard } from "../components/PolicyRuleCard";
import { PolicyExecutionModal } from "../components/PolicyExecutionModal";
import { PolicyHistoryCard } from "../components/PolicyHistoryCard";
import type {
  PolicyExecutionHistory,
  PolicyRule,
  PolicyRuleStatus,
} from "../types/policyEngine.types";

// Mock history data - în producție vine de la API
const mockHistory: PolicyExecutionHistory[] = [
  {
    id: "h1",
    applicationId: "VC-2025-10320",
    executedAt: "2025-01-15 14:32",
    status: "PASSED",
    results: [
      {
        ruleId: "1",
        ruleName: "Scor minim risc",
        status: "PASSED" as PolicyRuleStatus,
        message: "Scor: 720 (minim: 650)",
      },
      {
        ruleId: "2",
        ruleName: "Verificare AML",
        status: "PASSED" as "PASSED" | "FAILED" | "SKIPPED",
        message: "Fără interdicții",
      },
      {
        ruleId: "3",
        ruleName: "Blacklist intern",
        status: "PASSED" as "PASSED" | "FAILED" | "SKIPPED",
        message: "Client nou",
      },
      {
        ruleId: "4",
        ruleName: "Documente obligatorii",
        status: "PASSED" as "PASSED" | "FAILED" | "SKIPPED",
        message: "Toate documentele prezente",
      },
      {
        ruleId: "5",
        ruleName: "Verificare venit",
        status: "PASSED" as "PASSED" | "FAILED" | "SKIPPED",
        message: "DTI: 32% (maxim: 40%)",
      },
    ],
  },
  {
    id: "h2",
    applicationId: "VC-2025-10318",
    executedAt: "2025-01-15 11:15",
    status: "FAILED",
    results: [
      {
        ruleId: "1",
        ruleName: "Scor minim risc",
        status: "PASSED" as "PASSED" | "FAILED" | "SKIPPED",
        message: "Scor: 680 (minim: 650)",
      },
      {
        ruleId: "2",
        ruleName: "Verificare AML",
        status: "FAILED" as PolicyRuleStatus,
        message: "Client cu interdicție activă",
      },
      {
        ruleId: "3",
        ruleName: "Blacklist intern",
        status: "SKIPPED" as PolicyRuleStatus,
        message: "Sărit - regulă anterioară eșuată",
      },
    ],
  },
];

type TabType = "rules" | "history";

export const PolicyEnginePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("rules");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    rules,
    isLoading,
    isExecuting,
    currentRuleIndex,
    executionResults,
    overallStatus,
    fetchRules,
    toggleRule,
    toggleStopOnFail,
    executeRules,
    resetExecution,
  } = usePolicyEngine();

  // Încarcă regulile la mount
  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

  const tabs = [
    {
      id: "rules" as TabType,
      label: "Reguli",
      icon: <Settings className="w-4 h-4" />,
    },
    {
      id: "history" as TabType,
      label: "Istoric execuții",
      icon: <History className="w-4 h-4" />,
    },
  ];

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Policy Engine</h1>
            <p className="text-gray-500 mt-1">
              Configurare și monitorizare reguli de aprobare
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#2e57e1] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#2549c4] transition-colors flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Testează regulile
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "bg-white text-[#2e57e1] shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#2e57e1] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Rules Tab */}
            {activeTab === "rules" && (
              <div className="space-y-4">
                {rules
                  .sort((a: PolicyRule, b: PolicyRule) => a.order - b.order)
                  .map((rule: PolicyRule) => (
                    <PolicyRuleCard
                      key={rule.id}
                      rule={rule}
                      onToggleActive={toggleRule}
                      onToggleStopOnFail={toggleStopOnFail}
                    />
                  ))}

                {rules.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    Nu există reguli configurate
                  </div>
                )}
              </div>
            )}

            {/* History Tab */}
            {activeTab === "history" && (
              <div className="space-y-4">
                {mockHistory.map((entry) => (
                  <PolicyHistoryCard key={entry.id} entry={entry} />
                ))}

                {mockHistory.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    Nu există istoric de execuții
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Execution Modal */}
      <PolicyExecutionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rules={rules}
        isExecuting={isExecuting}
        currentRuleIndex={currentRuleIndex}
        executionResults={executionResults}
        overallStatus={overallStatus}
        onStartExecution={executeRules}
        onReset={resetExecution}
      />
    </div>
  );
};

export default PolicyEnginePage;
