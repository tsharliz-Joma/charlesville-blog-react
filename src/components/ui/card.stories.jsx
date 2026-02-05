import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";

export default {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
};

export const Default = () => (
  <div className="max-w-sm">
    <Card>
      <CardHeader>
        <CardTitle>Journal entry</CardTitle>
        <CardDescription>February 4, 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-fog">
          A short preview of the entry goes here.
        </p>
      </CardContent>
      <CardFooter>
        <span className="text-neon underline">Read entry</span>
      </CardFooter>
    </Card>
  </div>
);
