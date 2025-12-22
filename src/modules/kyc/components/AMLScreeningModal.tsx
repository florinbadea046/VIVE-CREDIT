// src/modules/kyc/components/AMLScreeningModal.tsx

import React, { useState } from "react";
import { X, Search, Loader2, AlertCircle } from "lucide-react";
import {
  AMLScreeningRequest,
  AMLScreeningResult,
} from "../types/amlScreening.types";
import {
  getRiskLevelIcon,
  getRiskLevelLabel,
  getRiskLevelColor,
  getScreeningStatusIcon,
  getScreeningStatusLabel,
  getAMLCheckTypeLabel,
  getMatchScoreIndicator,
} from "../utils/amlScreening.utils";

interface AMLScreeningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScreen: (
    request: AMLScreeningRequest
  ) => Promise<AMLScreeningResult | null>;
  isScreening: boolean;
  result: AMLScreeningResult | null;
}

export const AMLScreeningModal: React.FC<AMLScreeningModalProps> = ({
  isOpen,
  onClose,
  onScreen,
  isScreening,
  result,
}) => {
  const [formData, setFormData] = useState<AMLScreeningRequest>({
    clientId: "",
    firstName: "",
    lastName: "",
    cnp: "",
    dateOfBirth: "",
    nationality: "Romania",
    address: "",
    businessActivity: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onScreen(formData);
  };

  const handleReset = () => {
    setFormData({
      clientId: "",
      firstName: "",
      lastName: "",
      cnp: "",
      dateOfBirth: "",
      nationality: "Romania",
      address: "",
      businessActivity: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#2e57e1] px-6 py-4 flex items-center justify-between sticky top-0">
          <h2 className="text-white font-semibold text-lg">AML Screening</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Form - doar dacă nu există rezultat */}
          {!result && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prenume *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e57e1] focus:border-transparent"
                    placeholder="Ion"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nume *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e57e1] focus:border-transparent"
                    placeholder="Popescu"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CNP
                  </label>
                  <input
                    type="text"
                    value={formData.cnp}
                    onChange={(e) =>
                      setFormData({ ...formData, cnp: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e57e1] focus:border-transparent"
                    placeholder="1850615123456"
                    maxLength={13}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data nașterii *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      setFormData({ ...formData, dateOfBirth: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e57e1] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Naționalitate
                </label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) =>
                    setFormData({ ...formData, nationality: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e57e1] focus:border-transparent"
                  placeholder="Romania"
                />
              </div>

              <button
                type="submit"
                disabled={isScreening}
                className="w-full bg-[#2e57e1] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#2549c4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isScreening ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Se verifică...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Verifică AML
                  </>
                )}
              </button>
            </form>
          )}

          {/* Loading state */}
          {isScreening && (
            <div className="text-center py-8">
              <Loader2 className="w-12 h-12 text-[#2e57e1] animate-spin mx-auto mb-4" />
              <p className="text-gray-600">
                Se verifică în bazele de date AML...
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Poate dura 2-5 secunde
              </p>
            </div>
          )}

          {/* Results */}
          {result && !isScreening && (
            <div className="space-y-6">
              {/* Overall status */}
              <div
                className={`p-5 rounded-xl border ${getRiskLevelColor(
                  result.riskLevel
                )}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  {getRiskLevelIcon(result.riskLevel)}
                  <div>
                    <p className="font-semibold text-lg">
                      {getRiskLevelLabel(result.riskLevel)}
                    </p>
                    <p className="text-sm opacity-80">
                      {getScreeningStatusLabel(result.status)}
                    </p>
                  </div>
                </div>

                {/* Auto decision */}
                <div className="flex items-center gap-2 text-sm">
                  {getScreeningStatusIcon(result.status)}
                  <span className="font-medium">
                    Decizie automată:{" "}
                    {result.autoDecision === "APPROVE"
                      ? "Aprobat"
                      : result.autoDecision === "REJECT"
                      ? "Respins"
                      : "Necesită Review Manual"}
                  </span>
                </div>
              </div>

              {/* PEP Check */}
              {result.pepDetails?.isPEP && (
                <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-purple-900 mb-1">
                        🔔 Persoană Expusă Politic (PEP)
                      </p>
                      <div className="text-sm text-purple-700 space-y-1">
                        <p>
                          <strong>Funcție:</strong> {result.pepDetails.position}
                        </p>
                        <p>
                          <strong>Organizație:</strong>{" "}
                          {result.pepDetails.organization}
                        </p>
                        <p>
                          <strong>Țară:</strong> {result.pepDetails.country}
                        </p>
                        <p>
                          <strong>Din:</strong> {result.pepDetails.since}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Matches */}
              {result.matches.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Match-uri găsite ({result.matches.length})
                  </h3>
                  <div className="space-y-3">
                    {result.matches.map((match) => {
                      const scoreIndicator = getMatchScoreIndicator(
                        match.matchScore
                      );
                      return (
                        <div
                          key={match.id}
                          className="bg-gray-50 border border-gray-200 p-4 rounded-xl"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium text-gray-800">
                                {getAMLCheckTypeLabel(match.type)}
                              </p>
                              <p className="text-sm text-gray-600">
                                {match.listName}
                              </p>
                            </div>
                            <span
                              className={`text-sm font-semibold ${scoreIndicator.color}`}
                            >
                              {match.matchScore}% - {scoreIndicator.label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {match.details}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>Sursa: {match.source}</span>
                            {match.dateAdded && (
                              <>
                                <span>•</span>
                                <span>Adăugat: {match.dateAdded}</span>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* No matches */}
              {result.matches.length === 0 && !result.pepDetails?.isPEP && (
                <div className="bg-green-50 border border-green-200 p-4 rounded-xl text-center">
                  <p className="text-green-700">
                    ✓ Nu au fost găsite match-uri în bazele de date AML
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                >
                  Verifică Alt Client
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 bg-[#2e57e1] text-white rounded-xl font-medium hover:bg-[#2549c4] transition-colors"
                >
                  Închide
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
