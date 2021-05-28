export const BIGFIVE_LOW_SCORE_BORDER = 35;
export const BIGFIVE_HIGH_SCORE_BORDER = 65;

export function evalBigFiveScore(score) {
  if (score <= BIGFIVE_LOW_SCORE_BORDER) {
    return "low";
  }

  if (score >= BIGFIVE_HIGH_SCORE_BORDER) {
    return "high";
  }

  return "middle";
}
