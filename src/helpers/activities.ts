import { Activity, LeaderRow } from "@/types/types";

function formatTime(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes =
    minutes < 10 ? `0${minutes.toFixed(0)}` : minutes.toFixed(0);
  return `${formattedHours} : ${formattedMinutes}`;
}

export function processActivities(
  activities: { [x: string]: any; Date: string | number | Date }[]
) {
  let finalActivities: Array<Activity> = [];
  let index = 0;
  activities.forEach((activity: { [x: string]: any }) => {
    finalActivities.push({
      id: index,
      firstName: activity["First Name"],
      lastName: activity["Last Name"],
      date: activity.Date,
      type: activity["Activity Type"],
      totalMiles: parseFloat(activity["Total Miles"]),
      totalTime: activity["Total Time"],
    });
    index += 1;
  });

  return finalActivities;
}

export function calculateAllTimeLeaders(activities: Array<Activity>) {
  let leaders: Array<LeaderRow> = [];
  let refinedLeaders = activities.map((activity) => {
    return activity.firstName + " " + activity.lastName;
  });
  let uniqueLeaders = Array.from(new Set(refinedLeaders));

  uniqueLeaders.forEach((leader, index) => {
    let filteredActivities = activities.filter((activity) => {
      return activity.firstName + " " + activity.lastName === leader;
    });
    let totalMiles = filteredActivities.reduce(
      (acc, activity) => acc + activity.totalMiles,
      0
    );
    let totalTimeRaw = filteredActivities.reduce(
      (acc, activity) => acc + parseFloat(activity.totalTime),
      0
    );

    let totalTime = formatTime(totalTimeRaw);

    leaders.push({
      id: index + 1,
      name: leader,
      totalTime,
      totalMiles,
      totalActivities: filteredActivities.length,
    });
  });

  return leaders;
}
