import {
  processActivities,
  calculateAllTimeLeaders,
} from "@/helpers/activities";

import Leaderboard from "@/components/Leaderboard";

async function fetchActivities() {
  try {
    let response = await fetch("https://sheetdb.io/api/v1/3v2zio4yd35vy");
    let json = await response.json();
    let data = processActivities(json);
    let leaders = calculateAllTimeLeaders(data);
    return leaders;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const data = await fetchActivities();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl font-bold mb-9">
        St. Timothy&apos;s Signal Mountain Strava Club
      </h1>
      <Leaderboard data={data?.length ? data : undefined} />
    </main>
  );
}
