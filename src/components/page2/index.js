import React, { Component } from "react";
import "./index.css";

const apiStatus = {
    success: "SUCCESS",
    failure: "FAILURE",
    loading: "LOADING",
    initial: "INITIAL"
};

class Page2 extends Component {
    state = {
        apiStatus: apiStatus.initial,
        data: [],
        selectedNodeId: "",
        selectedVertical: "" // New state variable for selected vertical type
    };

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        this.setState({
            apiStatus: apiStatus.loading
        });
        try {
            const response = await fetch(
                "https://smartcitylivinglab.iiit.ac.in/verticals/all/latest/"
            );
            const data = await response.json();
            console.log(data);

            // Combine all values from keys: wn, aq, wf, wd, sl, em, sr_aq, sr_em, sr_ac, sr_oc, cm, we
            let combinedData = [];
            Object.keys(data).forEach(key => {
                if (["wn", "aq", "wf", "wd", "sl", "em", "sr_aq", "sr_em", "sr_ac", "sr_oc", "cm", "we"].includes(key)) {
                    combinedData = combinedData.concat(data[key].map(item => ({ ...item, vertical: key })));
                }
            });

            this.setState({
                data: combinedData,
                apiStatus: apiStatus.success
            });
        } catch (e) {
            console.log(e);
            this.setState({
                apiStatus: apiStatus.failure
            });
        }
    };

    handleVerticalChange = (event) => {
        this.setState({ selectedVertical: event.target.value, selectedNodeId: "" });
    };

    handleNodeChange = (event) => {
        this.setState({ selectedNodeId: event.target.value });
    };

    render() {
        const { data, selectedNodeId, selectedVertical } = this.state;

        // Extract unique vertical types from data
        const verticals = Array.from(new Set(data.map(item => item.vertical)));

        // Filter data based on selected vertical type
        const filteredData = data.filter(item => item.vertical === selectedVertical);

        return (
            <div className="dropdown-container">
                <select onChange={this.handleVerticalChange} value={selectedVertical}>
                    <option value="" disabled>Select Vertical Type</option>
                    {verticals.map((vertical, index) => (
                        <option key={index} value={vertical}>
                            {vertical.toUpperCase()}
                        </option>
                    ))}
                </select>

                {selectedVertical && (
                    <select onChange={this.handleNodeChange} value={selectedNodeId}>
                        <option value="" disabled>Select Node ID</option>
                        {filteredData.map((item, index) => (
                            <option key={index} value={item.node_id}>
                                {item.node_id}
                            </option>
                        ))}
                    </select>
                )}
            </div>
        );
    }
}

export default Page2;
