import React, { useEffect, useState, useReducer } from "react";
import useSWR from "swr";
import { SWRFetcher, APIFetcher } from "../../lib/fetcher";
import { useRouter } from "next/router";
import ErrorPage from "../../components/ErrorPage";
import { Calendar } from "../../components/Calendar";

const Planning = () => {
  const { query } = useRouter();
  // const { mutate } = useSWRConfig()
  const {
    data: calendar,
    error,
    mutate,
  } = useSWR(query.id ? `/api/calendar/${query.id}` : null, SWRFetcher);

  if (!error && !calendar) return "chargement...";
  if (!calendar) return <ErrorPage>{error.message}</ErrorPage>;
  const calendarId = calendar._id;

  const createEvent = async (eventName) => {
    const body = {
      name: eventName,
      from: new Date(),
      to: new Date(),
      calendar: calendarId,
    };

    const newEvents = calendar.events.filter((t) => true);
    newEvents.push(body);
    const newCalendar = { ...newCalendar, events: newEvents };
    mutate({ ...calendar, events: newEvents }, false);
    await APIFetcher(`/api/calendar/${query.id}`, "POST", body);
    mutate()
  };

  const removeEvent = async (eventToRemove) => {
    const newEvents = calendar.events.filter(
      (event) => event._id.toString() !== eventToRemove._id.toString()
    );
    const newCalendar = { ...calendar, events: newEvents };
    mutate(newCalendar, false);
    await await APIFetcher(`/api/calendar/${query.id}`, "DELETE", eventToRemove);
    mutate()
  };

  const eventCrud = {
    createEvent,
    removeEvent,
  };

  return <Calendar calendar={calendar} eventCrud={eventCrud} />;
};

export default Planning;
