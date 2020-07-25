import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, Legend } from 'recharts';
// import React, { PureComponent } from 'react';
// import {
//     PieChart, Pie, Sector, Cell,
// } from 'recharts';


const randomColor = ()=> {
    return Math.floor(Math.random() * 16777215).toString(16);
} 


const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
    const color = randomColor()
    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={color}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={color}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};


export default class ChemChart extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/hqnrgxpj/';

    state = {
        activeIndex: 0,
    };

    onPieEnter = (data, index) => {
        this.setState({
            activeIndex: index,
        });
    };
    data = () => {
        const { data } = this.props
        const data2 = []

        for (const kV in data) {
            let row = { name: kV, value: data[kV] }
            data2.push(row)
        }
        return data2
    }

    render() {
        return (
            <PieChart width={900} height={400}>
                <Pie
                    activeIndex={this.state.activeIndex}
                    activeShape={renderActiveShape}
                    data={this.data()}
                    cx={200}
                    cy={200}
                    innerRadius={70}
                    outerRadius={90}
                    legendType='rect'
                    fill={`#${randomColor()}`}
                    dataKey="value"
                    onMouseEnter={this.onPieEnter}
                />
                <Legend horizontalAlign='left' height={36} />
            </PieChart>
        );
    }
}





// import React, { PureComponent } from 'react';
// import {
//     PieChart, Pie, Sector, Cell,
// } from 'recharts';



const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//     cx, cy, midAngle, innerRadius, outerRadius, percent, index,
// }) => {
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//         <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//             {`${(percent * 100).toFixed(0)}%`}
//         </text>
//     );
// };

// export default class ChemChart extends PureComponent {
//     static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';

//     data = () => {
//         const { data } = this.props
//         const data2 = []

//         for (const kV in data) {
//             let row = { name: kV, value: data[kV] }
//             data2.push(row)
//         }
//         return data2
//     }

//     render() {
//         return (
//             <PieChart width={400} height={400}>
//                 <Pie
//                     data={this.data()}
//                     cx={200}
//                     cy={200}
//                     labelLine={false}
//                     label={renderCustomizedLabel}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                 >
//                     {
//                         this.data().map((entry, index) => <Cell key={`cell-${index}`} fill={`#${randomColor()}`} />)
//                     }
//                 </Pie>
//             </PieChart>
//         );
//     }
// }
