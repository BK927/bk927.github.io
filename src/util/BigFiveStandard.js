import { BIGFIVE_LOW_SCORE_BORDER, BIGFIVE_HIGH_SCORE_BORDER } from "settings";

export function evalBigFiveScore(score) {
  if (score <= BIGFIVE_LOW_SCORE_BORDER) {
    return "low";
  }

  if (score >= BIGFIVE_HIGH_SCORE_BORDER) {
    return "high";
  }

  return "middle";
}
