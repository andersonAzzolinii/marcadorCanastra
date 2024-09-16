import { Player } from "./player";

export interface History {
  finished_date?: Date | null
  matches?: MatchesList[] | [] | undefined
}

export interface MatchesList {
  group_history?: number | null,
  players?: HistoryItem[] | [] | undefined
}
export interface HistoryItem {
  player_name?: string | null,
  finished_date?: Date | null,
  points?: number | undefined,
  winner?: number | undefined,
  id_match?: number | undefined,
  id_player?: number,
  group_history?: number | null,
  id?: number | null
}
export interface MatchInfo extends Match {
  players: Player[];
};


export interface Match {
  id?: number,
  name: string;
  max_points: string;
  created_at?: Date
  history?: History[] | undefined
}
