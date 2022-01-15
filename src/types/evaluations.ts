export type LetterEvaluation = Array<string | undefined>;

export type EvaluationsState = {
  words: Array<LetterEvaluation>;
  letters: {
    [key: string]: string;
  };
};
