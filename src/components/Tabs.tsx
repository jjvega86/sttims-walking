"use client";
import { useState } from "react";
import { Tab } from "@headlessui/react";

import { LeaderRow, Activity } from "@/types/types";
import Leaderboard from "@/components/Leaderboard";

import { calculateAllTimeLeaders } from "@/helpers/activities";

type Props = {
  data?: Array<Activity>;
};

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs(props: Props) {
  let [categories] = useState(["This Week", "This Month", "All Time"]);

  return (
    <div className="w-full max-w-2xl px-2 py-6 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            )}
          >
            <Leaderboard data={calculateAllTimeLeaders(props.data, "week")} />
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            )}
          >
            <Leaderboard data={calculateAllTimeLeaders(props.data, "month")} />
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400"
            )}
          >
            <Leaderboard
              data={calculateAllTimeLeaders(props.data, "all-time")}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
