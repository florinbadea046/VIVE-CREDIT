export const calculatePenalty = (
    sold: number,
    penaltyRate: number,
    daysLate: number,
) => {
    if (daysLate <= 0 || penaltyRate <= 0) return 0;

    return (sold * penaltyRate) / 100 / 365  * daysLate;
}

