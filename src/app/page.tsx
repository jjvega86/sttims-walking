type Activity = {
  id: number;
  firstName: string;
  lastName: string;
  date: string;
  type: string;
  totalMiles: number;
  totalTime: number;
};

function processActivities(
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
      totalMiles: activity["Total Miles"],
      totalTime: activity["Total Time"],
    });
    index += 1;
  });

  return finalActivities;
}

async function fetchActivities() {
  try {
    let response = await fetch("https://sheetdb.io/api/v1/3v2zio4yd35vy");
    let json = await response.json();
    let data = processActivities(json);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const data = await fetchActivities();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello, St Timothy's</h1>
      {data?.map((activity) => (
        <p key={activity.id}>
          {activity.firstName} {activity.lastName}
        </p>
      ))}
    </main>
  );
}
