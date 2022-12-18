/* eslint-disable */
import { useAppContext } from "@/state";
import React, { useState, useEffect, CSSProperties } from "react";
import { Link } from "react-router-dom";

interface IStatisticProps {}

const Box = ({
  count,
  title,
  path,
}: {
  title: string;
  count: number;
  path: string;
}) => (
  <Link to={path}>
    <div className="flex flex-col justify-center items-center w-40 h-40 rounded-md shadow-md hover:shadow-lg transition-all duration-300 bg-slate-200 hover:bg-blue-100 hover:text-purple-900">
      <>
        <span className="text-2xl font-bold">{title}</span>
        <span className="text-2xl font-bold"> {count}</span>
      </>
    </div>
  </Link>
);

const Statistic: React.FC<IStatisticProps> = React.memo(({}) => {
  const store = useAppContext();
  useEffect(() => {}, []);

  return (
    <div className="flex flex-col justify-center items-center w-full mb-4 relative">
      <div className="text-center text-2xl font-semibold">
        Welcome to Ticket System
      </div>
      <div className="w-full p-4 flex flex-row justify-center items-center flex-wrap gap-4">
        <Box count={store.users.length} title="User" path="/user" />
        <Box count={store.movies.length} title="Movies" path="/movie" />
        <Box count={store.theaters.length} title="Theaters" path="/theater" />
        <Box count={store.shows.length} title="Shows" path="/show" />
        <Box count={store.tickets.length} title="Tickets" path="/ticket" />
      </div>
      <div className="mt-10 h-4 w-full flex flex-row justify-center items-center text-blue-900 text-xs text-center z-50 ">
        Developed By Hamed Taheri
      </div>
    </div>
  );
});

export { Statistic };
