import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";

class StateComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectOptions: [],
      id: "",
      state: "",
      code: ""
    };

    this.setStateId = this.setStateId.bind(this);
  }

  async getOptions() {
    const res = await axios.get("http://localhost:8080/api/v1/state/all");
    const data = res.data;

    const options = data.map((d) => ({
      value: d.id,
      label: d.state
    }));

    this.setState({ selectOptions: options });
  }

  handleChange(e) {
    this.setState({ id: e.value, name: e.label });
    this.props.onStateChange(e.value);
  }

  setStateId(id) {
    this.setState({ id: id });
  }

  componentDidMount() {
    this.getOptions();
  }

  render() {
    console.log(this.state.selectOptions);
    return (
      <div>
        <Select
          options={this.state.selectOptions}
          onChange={this.handleChange.bind(this)}
          value={
            this.state.id
              ? { value: this.state.id, label: this.state.name }
              : null
          }
          /*value={{ value: this.state.id }}*/
        />
      </div>
    );
  }
}

export default StateComponent;
