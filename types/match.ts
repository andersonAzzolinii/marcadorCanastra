import { Player } from "./player";

export interface MatchInfo extends Match {
  players: Player[];
};

export interface Match {
  id?: number,
  name: string;
  max_points: string;
  created_at?: Date
}
