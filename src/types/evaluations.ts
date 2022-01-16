export type LetterEvaluation = Array<string | undefined>;

export interface EvaluationsState {
  words: Array<LetterEvaluation>;
  letters: {
    [key: string]: string;
  };
}
