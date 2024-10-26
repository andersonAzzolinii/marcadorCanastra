export interface MyFormValues {
  id?: number | null;
  name: string;
  max_points: string;
  players: { id?: number | null, name: string }[];
}
