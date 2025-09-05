"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";

export function TimezoneDate({ date, formatString = "MMMM d, yyyy" }) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setFormattedDate(format(new Date(date), formatString));
  }, [date, formatString]);

  if (!formattedDate) {
    return <span>Loading...</span>;
  }

  return <span>{formattedDate}</span>;
}

export function TimezoneTime({ startTime, endTime }) {
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const start = format(new Date(startTime), "h:mm a");
    const end = format(new Date(endTime), "h:mm a");
    setFormattedTime(`${start} - ${end}`);
  }, [startTime, endTime]);

  if (!formattedTime) {
    return <span>Loading...</span>;
  }

  return <span>{formattedTime}</span>;
}
