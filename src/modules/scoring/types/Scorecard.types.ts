export const variableOptions = [
  'varsta',
  'venit',
  'sector',
  'istorice',
  'kyc',
] as const;

export type Rule = {
  condition: string;
  score: number;
};

export type Variable = {
  id: string;
  name: 'varsta' | 'venit' | 'sector' | 'istorice' | 'kyc';
  type: 'numeric' | 'enum' | 'boolean';
  weight: number;
  active: boolean;
  rules: Rule[];
};

export type PropsModal = {
  onClose: () => void;
  onSave: (variable: Variable) => void;
  initialVariable?: Variable | null;
};
