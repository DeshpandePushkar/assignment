import React from "react";
import { Column } from "@ant-design/plots";

const BarChart = ({ data, xField, yField, xTitle, yTitle, domain }) => {
  const config = {
    data,
    xField: xField,
    yField: yField,

    axis: {
      y: { title: yTitle },
      x: { title: xTitle },
    },
    scale: {
      y: {
        domain: domain,
      },
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      maxWidth: 50,
    },
  };
  return <Column {...config} />;
};

export default BarChart;
