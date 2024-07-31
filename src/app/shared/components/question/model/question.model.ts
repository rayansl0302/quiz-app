export interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  questionText: string;
  options: Option[];
  explanation: string;
}
