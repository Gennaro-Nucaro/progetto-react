import React, { useState, useEffect, memo } from "react";
import css from "./style.module.css";
//REDUX
import { useAppSelector } from "@redux-hooks";
import { statisticheSelector } from "@redux-slices/statistiche";
//LIBS
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
} from "recharts";

const AnniChart: React.VFC = () => {
  const { anniList, isSuccess } = useAppSelector(statisticheSelector);
  const [result, setResult] = useState([
    { key: "Anni '20", Film: 0 },
    { key: "Anni '30", Film: 0 },
    { key: "Anni '40", Film: 0 },
    { key: "Anni '50", Film: 0 },
    { key: "Anni '60", Film: 0 },
    { key: "Anni '70", Film: 0 },
    { key: "Anni '80", Film: 0 },
    { key: "Anni '90", Film: 0 },
    { key: "Anni 2000", Film: 0 },
    { key: "Anni 2010", Film: 0 },
    { key: "Anni 2020", Film: 0 },
  ]);

  useEffect(() => {
    if (anniList && isSuccess) {
      let newArr = [...result];
      anniList
        .map((e) => {
          return { year: +e.name, c: e.count };
        })
        .forEach((e) => {
          if (e.year < 2030 && e.year >= 2020) {
            newArr[10] = { ...newArr[10], Film: newArr[10].Film + e.c };
          }
          if (e.year < 2020 && e.year >= 2010) {
            newArr[9] = { ...newArr[9], Film: newArr[9].Film + e.c };
          }
          if (e.year < 2010 && e.year >= 2000) {
            newArr[8] = { ...newArr[8], Film: newArr[8].Film + e.c };
          }
          if (e.year < 2000 && e.year >= 1990) {
            newArr[7] = { ...newArr[7], Film: newArr[7].Film + e.c };
          }
          if (e.year < 1990 && e.year >= 1980) {
            newArr[6] = { ...newArr[6], Film: newArr[6].Film + e.c };
          }
          if (e.year < 1980 && e.year >= 1970) {
            newArr[5] = { ...newArr[5], Film: newArr[5].Film + e.c };
          }
          if (e.year < 1970 && e.year >= 1960) {
            newArr[4] = { ...newArr[4], Film: newArr[4].Film + e.c };
          }
          if (e.year < 1960 && e.year >= 1950) {
            newArr[3] = { ...newArr[3], Film: newArr[3].Film + e.c };
          }
          if (e.year < 1950 && e.year >= 1940) {
            newArr[2] = { ...newArr[2], Film: newArr[2].Film + e.c };
          }
          if (e.year < 1940 && e.year >= 1930) {
            newArr[1] = { ...newArr[1], Film: newArr[1].Film + e.c };
          }
          if (e.year < 1930 && e.year >= 1940) {
            newArr[0] = { ...newArr[0], Film: newArr[0].Film + e.c };
          }
        });
      setResult(newArr);
    }
    // eslint-disable-next-line
  }, [isSuccess, anniList]);

  return (
    <div className={css.component}>
      <h3>FILM VISTI PER DECENNIO</h3>
      {
        <div className={css.container}>
          <BarChart
            width={1200}
            height={500}
            data={result}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={40}
          >
            <XAxis
              dataKey="key"
              scale="point"
              padding={{ left: 50, right: 50 }}
            />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="Film" fill="#c52525" background={{ fill: "#eee" }} />
          </BarChart>
        </div>
      }
    </div>
  );
};

export default memo(AnniChart);
