import { GAME_STATUS } from '@constants/game';

const { WIN, IN_PROGRESS, DEFEAT } = GAME_STATUS;

export type GameStatus = typeof WIN | typeof IN_PROGRESS | typeof DEFEAT;
export type Board = Array<string | undefined>;

export interface GameState {
  board: Board;
  rowIndex: number;
  status: GameStatus;
  solution: string;
  lastPlayed: number;
  hasUserInteracted?: boolean;
}
