import Graph from "react-graph-vis";
// import Graph from "../../lib";

// import Graph from 'react-graph-vis'
import PropTypes from 'prop-types';
import _ from 'lodash';
import React from "react";

export default class ResearchInterestvis extends React.Component {
    constructor(props) {
        super(props);

      }

render() {
    let data = this.props.data;
    let mode = this.props.mode;
    let graph = {};
    graph["nodes"] = [];
    graph["edges"] = [];
    let research_interests = _.isEqual(mode,'PublicationsView') ? data["research_interests"].split(";") :_.map(data.patents, (patent) => patent.code) ;
    console.log("graph", graph);
    graph["nodes"].push({id:"author"})
    for (let keywordListIndex in research_interests) {
        let nextIndex = eval(keywordListIndex)+eval(1)
        console.log("keywordList[0]",research_interests[keywordListIndex],research_interests[nextIndex],nextIndex, keywordListIndex)
        graph["nodes"].push({id: keywordListIndex, label: research_interests[keywordListIndex], color:"#41e0c9"});
        graph["edges"].push({from: "author", to: keywordListIndex });
    }

      
      let options = {
        layout: {
          hierarchical: false
        },
        edges: {
          color: "#000000"
        }
      };

      let events = {
        select: function(event) {
          var { nodes, edges } = event;
          console.log("Selected nodes:");
          console.log(nodes);
          console.log("Selected edges:");
          console.log(edges);
        }
      };
    return(
  <div>
    <Graph graph={graph} options={options} events={events} style={{ height: "640px", width: "640px" }} />
  </div>
);
    }
}

ResearchInterestvis.propTypes = {
    data: PropTypes.object,
    mode: PropTypes.string
  };