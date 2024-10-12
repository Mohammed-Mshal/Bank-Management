"use client";
import React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An area chart with icons";

const chartData = [
  { day: "1", desktop: 850000, mobile: 30000 },
  { day: "2", desktop: 305, mobile: 200 },
  { day: "3", desktop: 237, mobile: 120 },
  { day: "4", desktop: 73, mobile: 190 },
  { day: "5", desktop: 209, mobile: 130 },
  { day: "6", desktop: 209, mobile: 130 },
  { day: "7", desktop: 214, mobile: 140 },
  { day: "8", desktop: 214, mobile: 140 },
  { day: "9", desktop: 214, mobile: 140 },
  { day: "10", desktop: 214, mobile: 140 },
  { day: "11", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Previous",
    color: "rgb(55 ,48, 163)",
    icon: TrendingDown,
  },
  mobile: {
    label: "Target",
    color: "rgb(202 ,138 ,4)",
    icon: TrendingUp,
  },
} satisfies ChartConfig;

export default function AnalyticChart() {
  return (
    <div className="container w-full max-w-full flex my-4">
      <div className="containerChart flex flex-1">
        <Card className="bg-white bg-opacity-5 backdrop-blur-lg rounded-2xl w-[calc(100vw-16px)] md:w-full">
          <CardHeader>
            <CardTitle>Analytic</CardTitle>
          </CardHeader>
          <CardContent className="pb-0">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 40,
                  right: 12,
                  bottom: 40,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  tickLine={false}
                  tickFormatter={(value) => value.toString().slice(0, 3)}
                />
                <YAxis
                  tickLine={true}
                  axisLine={false}
                  label={{}}
                  tickFormatter={(value: number) =>
                    `SYP${value.toLocaleString()}`
                  }
                />
                <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
                <Line
                  dataKey="desktop"
                  type="monotone"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="mobile"
                  type="monotone"
                  stroke="var(--color-mobile)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending up by 5.2% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  Showing total visitors for the last 6 months
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
