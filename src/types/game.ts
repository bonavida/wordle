import { GAME_STATUS } from '@constants/game';

const { WIN, IN_PROGRESS, DEFEAT } = GAME_STATUS;

export type GameStatus = typeof WIN | typeof IN_PROGRESS | typeof DEFEAT;

export type GameState = {
  board: string[] | undefined[];
  rowIndex: number;
  status: GameStatus;
  solution: string;
};
