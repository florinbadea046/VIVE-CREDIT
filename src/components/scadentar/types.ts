export interface ErrorState {
    value?: string;
    time?: string;
    anualInterest?: string;
    commision?: string;
    penalty?: string;
    daysLate?: string;
}

export interface ScadentarRaw {
  index: number;
  principal: number;
  interest: number;
  penalty: number;
  rata: number;
  sold: number;
}
