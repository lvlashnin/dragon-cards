import type { DragonType } from "../types/game";
import { DRAGONS } from "../config/constants";

export const getShuffledDragons = (): DragonType[] => {
  return [...DRAGONS].sort(() => Math.random() - 0.5);
};
