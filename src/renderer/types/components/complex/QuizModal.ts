export interface QuizModalProps {
  timeLimit: number;
  description: string;
  selections: string[];
  isAnswer: boolean[];
  endHandler?: (isSelected: boolean, isAnswer: boolean) => void;
}
