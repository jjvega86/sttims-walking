export type Activity = {
  id: number;
  firstName: string;
  lastName: string;
  date: string;
  type: string;
  totalMiles: number;
  totalTime: string;
};

export type LeaderRow = {
  id: number;
  name: string;
  totalMiles: number | undefined;
  totalTime: string | undefined;
  totalActivities: number | undefined;
};
