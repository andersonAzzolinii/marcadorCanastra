import { Player } from "./player";

export interface MatchInfo extends Match {
  players: Player[];
};

export interface Match {
  id?: number,
  name: string;
  maxPoints: string;
  created_at?: Date
}
