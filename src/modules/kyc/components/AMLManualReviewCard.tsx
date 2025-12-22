import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  User,
  AlertTriangle,
} from "lucide-react";
import { AMLScreeningHistory } from "../types/amlScreening.types";
import {
  getRiskLevelIcon,
  getRiskLevelLabel,
  getAMLCheckTypeLabel,
  getMatchScoreIndicator,
} from "../utils/amlScreening.utils";

interface AMLManualReviewCardProps {
  screening: AMLScreeningHistory;
  onReview: (
    screeningId: string,
    decision: "APPROVED" | "REJECTED",
    notes: string
  ) => void;
}

export const AMLManualReviewCard: React.FC<AMLManualReviewCardProps> = ({
  screening,
  onReview,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [decision, setDecision] = useState<"APPROVED" | "REJECTED" | null>(
    null
  );
  const [notes, setNotes] = useState("");

  const handleSubmitReview = () => {
    if (decision && notes.trim()) {
      onReview(screening.id, decision, notes);
      setShowReviewModal(false);
      setNotes("");
      setDecision(null);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        {/* Header */}
        <div
          className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                {screening.clientName}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>CNP: {screening.cnp}</span>
                {screening.applicationId && (
                  <>
                    <span>•</span>
                    <span>{screening.applicationId}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {getRiskLevelIcon(screening.riskLevel)}
              <span className="font-medium text-sm">
                {getRiskLevelLabel(screening.riskLevel)}
              </span>
            </div>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>

        {/* Expanded content */}
        {isExpanded && (
          <div className="border-t border-gray-100">
            {/* PEP Info */}
            {screening.pepDetails?.isPEP && (
              <div className="p-4 bg-purple-50 border-b border-purple-100">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-purple-900 mb-1">
                      Persoană Expusă Politic (PEP)
                    </p>
                    <div className="text-sm text-purple-700 space-y-1">
                      <p>
                        <strong>Funcție:</strong>{" "}
                        {screening.pepDetails.position}
                      </p>
                      <p>
                        <strong>Organizație:</strong>{" "}
                        {screening.pepDetails.organization}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Matches */}
            <div className="p-4 bg-gray-50">
              <h4 className="font-semibold text-gray-800 mb-3">
                Match-uri găsite ({screening.matches.length})
              </h4>
              <div className="space-y-2">
                {screening.matches.map((match) => {
                  const scoreIndicator = getMatchScoreIndicator(
                    match.matchScore
                  );
                  return (
                    <div
                      key={match.id}
                      className="bg-white border border-gray-200 p-3 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-medium text-sm text-gray-800">
                          {getAMLCheckTypeLabel(match.type)} - {match.listName}
                        </p>
                        <span
                          className={`text-xs font-semibold ${scoreIndicator.color}`}
                        >
                          {match.matchScore}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{match.details}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Metadata */}
            <div className="p-4 bg-white border-t border-gray-100 text-sm text-gray-600">
              <p>
                Verificat: {screening.screenedAt} de {screening.screenedBy}
              </p>
            </div>

            {/* Actions */}
            <div className="p-4 bg-gray-50 flex gap-3">
              <button
                onClick={() => {
                  setDecision("REJECTED");
                  setShowReviewModal(true);
                }}
                className="flex-1 px-4 py-2.5 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Respinge
              </button>
              <button
                onClick={() => {
                  setDecision("APPROVED");
                  setShowReviewModal(true);
                }}
                className="flex-1 px-4 py-2.5 bg-green-50 text-green-600 rounded-xl font-medium hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Aprobă
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
            <div
              className={`px-6 py-4 ${
                decision === "APPROVED" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              <h3 className="text-white font-semibold text-lg">
                {decision === "APPROVED"
                  ? "Aprobare Client"
                  : "Respingere Client"}
              </h3>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Client: <strong>{screening.clientName}</strong>
              </p>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notițe obligatorii *
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2e57e1] focus:border-transparent min-h-[100px]"
                placeholder="Motivul deciziei..."
                required
              />

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowReviewModal(false);
                    setNotes("");
                    setDecision(null);
                  }}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50"
                >
                  Anulează
                </button>
                <button
                  onClick={handleSubmitReview}
                  disabled={!notes.trim()}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    decision === "APPROVED"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  Confirmă
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
