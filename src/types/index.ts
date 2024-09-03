type ITeam = {
  id: number;
  name: string;
  group_first_code: string;
  group_first_name: string;
};

type ISchedule = {
  id: number;
  date: string;
  home_team_id: number;
  visiting_team_id: number;
  home_score: number;
  visiting_score: number;
  round: number;
};