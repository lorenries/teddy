import React from "react";
import { storiesOf } from "@storybook/react";
import { withReadme } from "storybook-readme";
import styles from "@sambego/storybook-styles";
import {
  withKnobs,
  text,
  array,
  number,
  object,
  boolean
} from "@storybook/addon-knobs";
import {
  Bar,
  HorizontalBar,
  HorizontalStackedBar,
  VerticalGroupedBar,
  Line,
  Scatterplot
} from "@newamerica/charts";
import {
  Search,
  Select,
  Slider,
  CheckboxGroup,
  Toggle,
  ButtonGroup
} from "@newamerica/components";
import Timeline from "@newamerica/timeline";
import { DataTableWithSearch } from "@newamerica/data-table";
import { cityTemperature } from "@vx/mock-data";
import { colors } from "../lib/colors";
import "./newamericadotorg.lite.css";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

class LoadData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  componentDidMount() {
    fetch(this.props.url)
      .then(data => data.json())
      .then(data => {
        this.setState({ data });
      });
  }
  render() {
    if (!this.state.data) {
      return <div>loading</div>;
    }
    return this.props.children(this.state.data);
  }
}

storiesOf("Chart", module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .addDecorator(
    styles({
      maxWidth: "600px",
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "0 15px"
    })
  )
  .add("Bar Chart", () => {
    const barData = new Array(5).fill(undefined).map((val, i) => ({
      key: `Bar ${i + 1}`,
      value: getRandomInt(1, 40)
    }));
    return (
      <Bar
        data={barData}
        maxWidth={600}
        height={400}
        y={d => d.value}
        x={d => d.key}
        yAxisLabel="This is an axis label"
        renderTooltip={({ datum }) => (
          <div>
            {datum.key}: <b>{datum.value}</b>
          </div>
        )}
      />
    );
  });

storiesOf("Chart", module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .addDecorator(
    styles({
      maxWidth: "600px",
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "0 15px"
    })
  )
  .add("Horizontal Bar Chart", () => {
    const barData = new Array(5).fill(undefined).map((val, i) => ({
      key: `Bar ${i + 1}`,
      value: getRandomInt(1, 40)
    }));
    return (
      <HorizontalBar
        data={barData}
        maxWidth={600}
        height={300}
        x={d => d.value}
        y={d => d.key}
        xAxisLabel="This is an axis label"
        renderTooltip={({ datum }) => (
          <div>
            {datum.key}: <b>{datum.value}</b>
          </div>
        )}
      />
    );
  });

storiesOf("Chart", module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .addDecorator(
    styles({
      maxWidth: "600px",
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "0 15px"
    })
  )
  .add("Scatterplot", () => {
    const scatterData = new Array(30).fill(undefined).map((val, i) => ({
      name: i,
      x: getRandomInt(i, (i + 1) * 5),
      y: getRandomInt(i, (i + 1) * 5)
    }));
    return (
      <Scatterplot
        maxWidth={600}
        height={400}
        data={scatterData}
        x={d => d.x}
        y={d => d.y}
        xAxisLabel="This is an axis label"
        yAxisLabel="This is an axis label"
        renderTooltip={() => <div>Tooltip</div>}
        numTicksX={width => (width < 400 ? 5 : 7)}
        margin={{
          top: 10,
          bottom: 55,
          left: 60,
          right: 10
        }}
      />
    );
  });

storiesOf("Chart", module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .addDecorator(
    styles({
      maxWidth: "600px",
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "0 15px"
    })
  )
  .add("Line Chart", () => {
    const url =
      "https://na-data-projects.s3.amazonaws.com/data/nann/network_research.json";
    return (
      <LoadData url={url}>
        {data => (
          <Line
            data={data.line}
            maxWidth={600}
            height={400}
            x={d => d.year}
            y={d => d.cumulative}
            renderTooltip={({ datum }) => (
              <div>
                {datum.year}: <b>{datum.cumulative}</b>
              </div>
            )}
          />
        )}
      </LoadData>
    );
  });

storiesOf("Chart", module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add("Timeline", () => {
    const url =
      "https://na-data-projects.s3.amazonaws.com/data/isp/proxy_warfare.json";
    return (
      <LoadData url={url}>
        {data => {
          const _data = data.timeline.map((val, i) => ({
            ...val,
            date: new Date(val.date),
            dateString: val.date
          }));
          return <Timeline title="test" divisionWidth={30} data={_data} />;
        }}
      </LoadData>
    );
  });

storiesOf("Chart", module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .addDecorator(
    styles({
      maxWidth: "850px",
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "0 15px"
    })
  )
  .add("Horizontal Stacked Bar", () => (
    <HorizontalStackedBar
      height={number("Height", 400)}
      y={d => d[text("Y Accessor", "date")]}
      keys={array(
        "Keys",
        Object.keys(cityTemperature[0]).filter(d => d !== "date")
      )}
      colors={array("Colors", [
        colors.turquoise.light,
        colors.blue.light,
        colors.purple.light
      ])}
      margin={object("Margin", { top: 30, left: 70, right: 40, bottom: 40 })}
      renderTooltip={({ datum }) => (
        <div style={{ display: "flex" }}>
          <span style={{ paddingRight: "3px" }}>{datum.key}: </span>
          <span>{datum.bar.data[datum.key]}</span>
        </div>
      )}
      data={object("Data", [...cityTemperature.slice(0, 10)])}
    />
  ));

storiesOf("Chart", module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .addDecorator(
    styles({
      maxWidth: "850px",
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "0 15px"
    })
  )
  .add("Vertical Grouped Bar", () => (
    <VerticalGroupedBar
      height={number("Height", 400)}
      data={object("Data", [...cityTemperature.slice(0, 10)])}
      x={d => d[text("Y Accessor", "date")]}
      keys={array(
        "Keys",
        Object.keys(cityTemperature[0]).filter(d => d !== "date")
      )}
      renderTooltip={d => <div>Tooltip</div>}
      colors={array("Colors", [
        colors.turquoise.light,
        colors.blue.light,
        colors.purple.light
      ])}
      margin={object("Margin", { top: 40, left: 70, right: 40, bottom: 30 })}
    />
  ));

storiesOf("Chart", module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .addDecorator(
    styles({
      maxWidth: "1200px",
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "0 15px"
    })
  )
  .add("Data Table", () => {
    return (
      <DataTableWithSearch
        showPagination={boolean("Pagination", true)}
        columns={object("Columns", [
          { Header: "Date", accessor: "date" },
          { Header: "New York", accessor: "New York" },
          { Header: "San Francisco", accessor: "San Francisco" },
          { Header: "Austin", accessor: "Austin" }
        ])}
        data={object("Data", [...cityTemperature.slice(0, 30)])}
      />
    );
  });

storiesOf("Chart", module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .addDecorator(
    styles({
      maxWidth: "1200px",
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "0 15px"
    })
  )
  .add("Pindrop Map", () => {
    return (
      <PindropMap
        data={object("Data", [{ lat: 38.9072, lon: -77.0369 }])}
        geometry={text("Geometry", "us")}
        title={text("Chart Title", "Chart title")}
        source={text("Source", "Chart source")}
        width={1000}
        height={600}
      />
    );
  });

storiesOf("Components", module)
  .addDecorator(withKnobs)
  .addDecorator(
    styles({
      padding: "0 0.5rem"
    })
  )
  .add("Search", () => {
    return <Search />;
  });

storiesOf("Components", module)
  .addDecorator(withKnobs)
  .addDecorator(
    styles({
      padding: "0 0.5rem"
    })
  )
  .add("Select", () => {
    return (
      <Select
        options={["option 1", "option 2", "option 3"]}
        onChange={e => console.log(e)}
      />
    );
  });

storiesOf("Components", module)
  .addDecorator(withKnobs)
  .addDecorator(
    styles({
      padding: "1rem"
    })
  )
  .add("Slider", () => {
    return (
      <Slider
        label="Label"
        min="0"
        max="10"
        step="1"
        value="5"
        onChange={val => console.log(val)}
      />
    );
  });

storiesOf("Components", module)
  .addDecorator(withKnobs)
  .addDecorator(
    styles({
      padding: "1rem"
    })
  )
  .add("CheckboxGroup", () => {
    return (
      <CheckboxGroup
        orientation="vertical"
        options={[
          { id: "1", label: "option 1" },
          { id: "2", label: "option 2" }
        ]}
        onChange={e => console.log(e.target.checked)}
        title="Title"
      />
    );
  });

storiesOf("Components", module)
  .addDecorator(withKnobs)
  .addDecorator(
    styles({
      padding: "1rem"
    })
  )
  .add("Toggle", () => {
    return (
      <Toggle
        onLabel="on"
        offLabel="off"
        id="toggle"
        onChange={e => console.log(e)}
      />
    );
  });

storiesOf("Components", module)
  .addDecorator(withKnobs)
  .addDecorator(
    styles({
      padding: "1rem"
    })
  )
  .add("ButtonGroup", () => {
    return (
      <ButtonGroup
        options={[
          {
            id: "1",
            text: "option 1"
          },
          {
            id: "2",
            text: "option 2"
          }
        ]}
        active="2"
        onChange={e => console.log(e)}
      />
    );
  });