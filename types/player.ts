export interface Player {
  points: number[];
  id: number;
  name: string;
  created_at?: Date;
  id_match?: number;
  actualy_point?: string
}

export interface PlayerPoint {
  id: number,
  id_player: number;
  points: string;
}