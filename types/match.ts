import { Player } from "./player";

export interface History {
  player_name: string | null,
  finished_date: Date | null,
  points: number | undefined,
  winner: number | undefined,
  id_match: number | undefined,
  id_player: number,
  group_history: number | null
}
export interface MatchInfo extends Match {
  players: Player[];
};


export interface Match {
  id?: number,
  name: string;
  max_points: string;
  created_at?: Date
  history: History[] | []
}
