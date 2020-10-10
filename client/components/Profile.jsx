import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import ResearchInterestvis from'./ResearchInterestvis.jsx';
class Profile extends React.Component {
    render() {
        console.log("Row",this.props.data);
        const name = _.isEqual(this.props.mode,"PatentsView") ? this.props.data.name : this.props.data.author;
        const label = _.isEqual(this.props.mode,"PatentsView") ? "Country":"H-index";
        const hIndex = _.isEqual(this.props.mode,"PatentsView") ? this.props.data.country:this.props.data.hindex;
        return (
            <div>
            <div className = "card_lo">
            <div>
            <span className="hIndex">Name</span></div>
            <div className="hindexValue">{name}</div>
            </div>
            <div className = "card_lo">
            <div>
            <span className="hIndex">{label}</span></div>
            <div className="hindexValue">{hIndex}</div>
          </div>
          <div className = "card_lo">
            <div>
            <span className="hIndex">Citations</span></div>
            <div className="hindexValue">{this.props.data.citations }</div>
          </div>
          <div className = "card_lo">
            <div>
            <span className="hIndex">Number of Papers</span></div>
            <div className="hindexValue">{this.props.data.number_of_papers }</div>
          </div>
          <div className="researchInterests">
              <ResearchInterestvis data = {this.props.data} mode={this.props.mode}/>
          </div>
          </div>
        )
    }
}

Profile.propTypes = {
    data: PropTypes.object,
    mode: PropTypes.string
  };
  
  export default Profile;