import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
// import React, { PureComponent } from 'react';
// import {
//     PieChart, Pie, Sector, Cell,
// } from 'recharts';

const randomColor = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
};

const renderActiveShape = (props, cannabinoids) => {
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
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";
  const color = randomColor();
  return (
    <g>
      <text
        x={cx}
        y={cy + 150}
        dy={8}
        textAnchor="middle"
        width={100}
        verticalAnchor="start"
        fill={fill}
        scaleToFit="true"
      >
        {payload.name}
      </text>
      <Sector
        className="sectorCss"
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        className="sectorCss"
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {`${value}% of Plant Material`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {cannabinoids
          ? `(${(percent * 100).toFixed(2)}%) of Total Cannabinoids`
          : `(${(percent * 100).toFixed(2)}%) of Total Terpenes`}
      </text>
    </g>
  );
};

export default class ChemChart extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/hqnrgxpj/";

  state = {
    activeIndex: 0,
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };
  data = () => {
    const { data } = this.props;
    const data2 = [];

    for (const kV in data) {
      let row = { name: `${kV}: ${data[kV]}%`, value: data[kV] };
      data2.push(row);
    }
    return data2;
  };

  render() {
    const { cannabinoids } = this.props;
    return (
      <div className="chartCont">
        <ResponsiveContainer
          width={"100%"}
          height={"50%"}
          aspect={1.5 / 1}
          className="respCont"
        >
          <PieChart width={800} height={400}>
            <Pie
              width={"100%"}
              height={"50%"}
              activeIndex={this.state.activeIndex}
              activeShape={(props) => renderActiveShape(props, cannabinoids)}
              data={this.data()}
              cx={400}
              cy={250}
              innerRadius={70}
              outerRadius={90}
              legendType="rect"
              fill="#00C49F"
              dataKey="value"
              onMouseEnter={this.onPieEnter}
              // layout="vertical"
              // align="left"
              // margin={{ top: 0, left: 100, right: 0, bottom: 0 }}
            />
            <Legend
              horizontalAlign="left"
              // verticalAlign="right"
              height={36}
              data={this.data()}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
