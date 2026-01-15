import React, { useState, useEffect } from "react";
import {
  Search,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  XCircle,
} from "lucide-react";
import { useAMLScreening } from "../hooks/useAMLScreening";
import { AMLScreeningModal } from "../components/AMLScreeningModal";
import { AMLManualReviewCard } from "../components/AMLManualReviewCard";

type TabType = "screening" | "manual-review" | "dashboard";

export const AMLScreeningPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("screening");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    isScreening,
    screeningResult,
    manualReviewQueue,
    dashboard,
    isLoadingQueue,
    isLoadingDashboard,
    screenClient,
    fetchManualReviewQueue,
    fetchDashboard,
    reviewScreening,
    resetScreening,
  } = useAMLScreening();

  // Încarcă datele la mount
  useEffect(() => {
    fetchManualReviewQueue();
    fetchDashboard();
  }, [fetchManualReviewQueue, fetchDashboard]);

  const tabs = [
    {
      id: "screening" as TabType,
      label: "Verificare AML",
      icon: <Search className="w-4 h-4" />,
      description: "4.1. Integrare API AML",
    },
    {
      id: "manual-review" as TabType,
      label: "Review Manual",
      icon: <Users className="w-4 h-4" />,
      description: "4.2. Endpoint screening manual",
      badge: manualReviewQueue.length,
    },
    {
      id: "dashboard" as TabType,
      label: "Dashboard Operator",
      icon: <BarChart3 className="w-4 h-4" />,
      description: "4.5. Dashboard operator AML",
    },
  ];

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-[#2e57e1] rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                AML Screening
              </h1>
              <p className="text-gray-500">
                Anti-Money Laundering & Compliance
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-colors whitespace-nowrap relative ${
                activeTab === tab.id
                  ? "bg-white text-[#2e57e1] shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "screening" && (
          <div className="space-y-6">
            {/* Info card - 4.1 */}
            <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Search className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">
                    4.1. Integrare API AML (mock)
                  </h3>
                  <p className="text-sm text-blue-700">
                    Verificare automată în baze de date internaționale: liste
                    sancțiuni, PEP, adverse media, watchlists. Click pe butonul
                    de mai jos pentru a verifica un client.
                  </p>
                </div>
              </div>
            </div>

            {/* Action button */}
            <div className="text-center py-12">
              <button
                onClick={() => {
                  resetScreening();
                  setIsModalOpen(true);
                }}
                className="bg-[#2e57e1] text-white px-8 py-4 rounded-xl font-medium hover:bg-[#2549c4] transition-colors flex items-center gap-3 mx-auto shadow-lg"
              >
                <Search className="w-5 h-5" />
                Verifică Client Nou
              </button>
              <p className="text-gray-500 mt-4 text-sm">
                Introduce datele clientului pentru screening AML complet
              </p>
            </div>

            {/* Features grid - 4.3 și 4.4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 p-5 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      4.3. Identificare PEP
                    </h4>
                    <p className="text-sm text-gray-600">
                      Detectează automat persoane expuse politic și relațiile
                      acestora (familie, asociați).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-5 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      4.4. Generare alertă pentru risc
                    </h4>
                    <p className="text-sm text-gray-600">
                      Sistem automat de alertare când se detectează risc ridicat
                      sau critic.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Manual Review Tab - 4.2 */}
        {activeTab === "manual-review" && (
          <div className="space-y-6">
            {/* Info card */}
            <div className="bg-orange-50 border border-orange-200 p-5 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-orange-900 mb-1">
                    4.2. Endpoint screening manual la nevoie
                  </h3>
                  <p className="text-sm text-orange-700">
                    Cazurile cu risc ridicat necesită aprobare manuală de la
                    operatorul AML. Review-uri în așteptare:{" "}
                    <strong>{manualReviewQueue.length}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Queue */}
            {isLoadingQueue ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-[#2e57e1] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : manualReviewQueue.length > 0 ? (
              <div className="space-y-4">
                {manualReviewQueue.map((screening) => (
                  <AMLManualReviewCard
                    key={screening.id}
                    screening={screening}
                    onReview={reviewScreening}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                <p>Nu există review-uri în așteptare</p>
              </div>
            )}
          </div>
        )}

        {/* Dashboard Tab - 4.5 */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Info card */}
            <div className="bg-green-50 border border-green-200 p-5 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">
                    4.5. Dashboard operator (livrat către Frontend dev 2)
                  </h3>
                  <p className="text-sm text-green-700">
                    Statistici și metrici pentru monitorizarea activității AML
                    în timp real.
                  </p>
                </div>
              </div>
            </div>

            {isLoadingDashboard ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-[#2e57e1] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : dashboard ? (
              <>
                {/* Stats cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white border border-gray-200 p-5 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <span className="text-sm text-gray-600">
                        Review-uri în așteptare
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">
                      {dashboard.pendingReviews}
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 p-5 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                      <span className="text-sm text-gray-600">
                        Semnalări astăzi
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">
                      {dashboard.flaggedToday}
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 p-5 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <span className="text-sm text-gray-600">
                        Alerte critice
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">
                      {dashboard.criticalAlerts}
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 p-5 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-purple-500" />
                      <span className="text-sm text-gray-600">
                        Timp mediu review
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">
                      {dashboard.averageReviewTime}min
                    </p>
                  </div>
                </div>

                {/* Recent alerts */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-800">
                      Alerte recente
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {dashboard.recentAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="p-5 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                alert.priority === "URGENT"
                                  ? "bg-red-50"
                                  : alert.priority === "HIGH"
                                  ? "bg-orange-50"
                                  : "bg-yellow-50"
                              }`}
                            >
                              <AlertTriangle
                                className={`w-5 h-5 ${
                                  alert.priority === "URGENT"
                                    ? "text-red-500"
                                    : alert.priority === "HIGH"
                                    ? "text-orange-500"
                                    : "text-yellow-500"
                                }`}
                              />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">
                                {alert.clientName}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                {alert.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {alert.createdAt}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              alert.status === "NEW"
                                ? "bg-blue-50 text-blue-600"
                                : alert.status === "IN_REVIEW"
                                ? "bg-yellow-50 text-yellow-600"
                                : "bg-green-50 text-green-600"
                            }`}
                          >
                            {alert.status === "NEW"
                              ? "Nou"
                              : alert.status === "IN_REVIEW"
                              ? "În Review"
                              : "Rezolvat"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>

      {/* Screening Modal */}
      <AMLScreeningModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onScreen={screenClient}
        isScreening={isScreening}
        result={screeningResult}
      />
    </div>
  );
};

export default AMLScreeningPage;
