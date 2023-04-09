import { Inter } from "next/font/google";
import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";

const inter = Inter({ subsets: ["latin"] });

async function fetchAthletes() {
  try {
    let response = await fetch("https://sheetdb.io/api/v1/3v2zio4yd35vy");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const data = await fetchAthletes();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello, St Timothy's</h1>
      {data.map(
        (athlete: {
          [x: string]:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | ReactFragment
            | ReactPortal
            | null
            | undefined;
        }) => (
          <p>{athlete["First Name"]}</p>
        )
      )}
    </main>
  );
}
