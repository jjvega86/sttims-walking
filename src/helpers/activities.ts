import { Activity, LeaderRow } from "@/types/types";
import moment from "moment";

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
export function filterActivitiesByThisMonth(
  activities: Array<Activity> | undefined
) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  let dateFilteredActivities = activities?.filter((activity) => {
    let date = moment(activity.date, "MMMM Do YYYY").format("YYYY-MM-DD");
    if (new Date(date) >= firstDay && new Date(date) <= lastDay) {
      return true;
    } else {
      return false;
    }
  });

  return dateFilteredActivities;
}
export function filterActivitiesByThisWeek(
  activities: Array<Activity> | undefined
) {
  const today = new Date();
  const sunday = new Date(today);
  const saturday = new Date(today);

  sunday.setDate(today.getDate() - today.getDay());
  saturday.setDate(today.getDate() + 6 - today.getDay());

  let dateFilteredActivities = activities?.filter((activity) => {
    let date = moment(activity.date, "MMMM Do YYYY").format("YYYY-MM-DD");
    if (new Date(date) >= sunday && new Date(date) <= saturday) {
      return true;
    } else {
      return false;
    }
  });

  return dateFilteredActivities;
}

export function chooseDateRangeFiltering(
  type: string,
  activities: Array<Activity> | undefined
) {
  switch (type) {
    case "week":
      return filterActivitiesByThisWeek(activities);
    case "month":
      return filterActivitiesByThisMonth(activities);
    default:
      return activities;
  }
}

export function calculateAllTimeLeaders(
  activities: Array<Activity> | undefined,
  dateRange: string
) {
  let leaders: Array<LeaderRow> | undefined = [];
  let refinedLeaders = activities?.map((activity) => {
    return activity.firstName + " " + activity.lastName;
  });
  let uniqueLeaders = Array.from(new Set(refinedLeaders));

  let dateFilteredActivities = chooseDateRangeFiltering(dateRange, activities);

  uniqueLeaders.forEach((leader, index) => {
    let filteredActivities = dateFilteredActivities?.filter((activity) => {
      return activity.firstName + " " + activity.lastName === leader;
    });
    let totalMiles = filteredActivities?.reduce(
      (acc, activity) => acc + activity.totalMiles,
      0
    );
    let totalTimeRaw = filteredActivities?.reduce(
      (acc, activity) => acc + parseFloat(activity.totalTime),
      0
    );

    let totalTime = formatTime(totalTimeRaw ? totalTimeRaw : 0);

    leaders?.push({
      id: index + 1,
      name: leader,
      totalTime,
      totalMiles,
      totalActivities: filteredActivities?.length,
    });
  });

  return leaders;
}
