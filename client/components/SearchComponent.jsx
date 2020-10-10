import React from 'react';
import Select from 'react-select';

import PropTypes from 'prop-types';
import _ from 'lodash';

export default class SearchComponent extends React.Component {
    /* istanbul ignore next */
    constructor(props) {
        super(props);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleModeChange = this.handleModeChange.bind(this);
        this.handleRangeChange = this.handleRangeChange.bind(this);

        this.state = {
            mode: '',
            range:''
        }
    }

    handleSearchChange(event) {
        this.props.searchAuthors(event.target.value);
    }

    handleModeChange(event) {
        this.setState({mode: event})
        this.props.setMode(event,this.state.range);
    }


    handleRangeChange(event) {
        this.setState({range: event})
    }

    render() {
        const searchText = _.isEmpty(this.props.config.searchText) ? '' : this.props.config.searchText;
        return (
            <div className="search-filter">
                <div className="search-container">
                    <div>
                        <div className="search-form">
                            <div id="search-keyword">
                                <p className="label-style">SEARCH</p>
                                <div id="search-box">
                                    <input
                                        className='search-box-element'
                                        type="text"
                                        placeholder="Keyword"
                                        value={searchText}
                                        onChange={this.handleSearchChange.bind(this)}
                                    />
                                </div>
                                <div className="mode">
                                    <span><h2>Select Range</h2> </span>
                                    <Select key={_.uniqueId()} className="select"
                                        options={[{ "label": "1-100", value: "1-100" },
                                        { "label": "100-200", value: "100-200" },
                                        { "label": "2000-3000", value: "2000-3000" },
                                        { "label": "3000-4000", value: "3000-4000" },
                                        { "label": "4000-5000", value: "4000-5000" },
                                        { "label": "5000-6000", value: "5000-6000" },
                                        { "label": "6000-7000", value: "6000-7000" }
                                        ]}
                                        value={this.state.range}
                                        onChange={this.handleRangeChange}

                                    />
                                </div>
                                <div className="mode">
                                    <span><h2>Select mode</h2> </span>
                                    <Select key={_.uniqueId()} className="select"
                                        options={[{ "label": "PublicationsView", value: "PublicationsView" },
                                        { "label": "PatentsView", value: "PatentsView" }

                                        ]}
                                        value={this.state.mode}
                                        onChange={this.handleModeChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SearchComponent.propTypes = {
    config: PropTypes.object,
    searchAuthors: PropTypes.func,
    setMode: PropTypes.func,
};
