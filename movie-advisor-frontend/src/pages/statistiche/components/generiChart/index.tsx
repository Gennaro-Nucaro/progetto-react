import React, { useCallback, useState, memo } from "react";
import css from "./style.module.css";
//LIBS
import { PieChart, Pie, Cell, Sector, Legend } from "recharts";
//REDUX
import { useAppSelector } from "@redux-hooks";
import { statisticheSelector } from "@redux-slices/statistiche";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#0BE37D",
  "#005555",
  "#FA8500",
  "#0DC6FB",
  "#5E0BE3",
  "#9A0DFB",
  "#D6AAFA",
  "#453EFA",
  "#FA4999",
  "#8DCFFF",
  "#FA583E",
  "#3964AD",
  "#1AAD90",
  "#3EFAD4",
  "#BEFE00",
  "#57C9FA",
  "#FA2549",
  "#FAF13E",
  "#1FAD1A",
  "#7157FA",
  "#43FA3E",
  "#AD5D23",
];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    count,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 15) * cos;
  const sy = cy + (outerRadius + 15) * sin;
  const mx = cx + (outerRadius + 40) * cos;
  const my = cy + (outerRadius + 40) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        style={{ fontSize: "40px", fontWeight: 700 }}
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        //larghezza barra esterna
        innerRadius={outerRadius + 4}
        outerRadius={outerRadius + 16}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={7} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${payload.name} si trova in ${count} Film`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const Generi: React.VFC = () => {
  const { genereList } = useAppSelector(statisticheSelector);
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <div className={css.component}>
      <h3>GENERI PIU' VISTI</h3>
      <div className={css.container}>
        {/* larghezza e altezza contenitore */}

        <PieChart width={1200} height={750}>
          <Legend
            verticalAlign="top"
            width={800}
            align="center"
            wrapperStyle={{ right: 170 }}
          />
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={onPieEnter}
            data={genereList}
            //cx e cy servono per posizionare a mano il grafico
            // cx={720}
            // cy={400}
            //grandezza grafico
            innerRadius={190}
            outerRadius={300}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="count"
          >
            {genereList.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
};

export default memo(Generi);
