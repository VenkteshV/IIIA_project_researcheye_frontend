import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import SearchComponent from './SearchComponent.jsx';
import  Profile from './Profile.jsx'

class AuthorTableComponent extends React.Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);
    this.state = {
      renderProfile:false,
      row:''
    };

  }

  render() {
    let selectRowProp = {
    mode: 'checkbox',
    clickToSelect: false,
    bgColor: 'yellow',
    onSelect: (row, isSelected, e)  => {
      console.log("row",row)
      this.setState({"renderProfile":true, row:row})
    } ,

  };
  // let options = {
  //   sortName: 'name',
  //   sortOrder: 'asc',
  //   noDataText: 'There is no data to display',
  // };

    var patentList = this.props.config.config.slice(1,1000);
    let data = !_.isEmpty(_.trim(this.props.config.searchResult)) ? this.props.config.searchResult :patentList;
    console.log("mode",this.props.mode);
    const name =  _.isEqual(this.props.mode,"PatentsView") ? 'name':'author';
    const affliation = _.isEqual(this.props.mode,"PatentsView") ? 'affliation':'affiliation';
    const  patent_or_paper_count = _.isEqual(this.props.mode,"PatentsView") ? 'patentCount':'number_of_papers';
    const citations = _.isEqual(this.props.mode,"PatentsView") ? 'country':'citations'

      return (
        <div>
        {
          this.state.renderProfile ? (<Profile data={this.state.row} mode={this.props.mode} />) :(
        
        <div className="fc-container">
          <SearchComponent searchAuthors={this.props.searchAuthors} config={this.props.config} setMode={this.props.setMode}/>
          <div> <p className="label-style"> Displaying {data.length} records</p> </div>
          <BootstrapTable
        ref={(bootstrapTable) => {
          this.table = bootstrapTable;
        }}
        containerClass="fc-list-container"
        bordered={true}
        hover
        tableBodyClass="fc-table-content"
        tableHeaderClass="fc-table-header"
        height='900'
        replace={true}
        data={data}
        scrollTop={'Top'}
        selectRow={selectRowProp}
        multiColumnSort={2}>
        <TableHeaderColumn id="fc-header-name" columnClassName="fc-content-name" className="Name"
                           dataSort={true} isKey={true} dataField={name}>Name</TableHeaderColumn>
        <TableHeaderColumn id="fc-header-category" columnClassName="fc-content-category"
                           dataSort={true} dataField={affliation}>Affiliation</TableHeaderColumn>
        <TableHeaderColumn id="fc-header-id" className = "patentCount" columnClassName="fc-content-contractExpiry"
                           dataField={patent_or_paper_count}>{patent_or_paper_count}</TableHeaderColumn>
        {/* <TableHeaderColumn id="fc-header-id" className = "patentCount" columnClassName="fc-content-contractExpiry"
                           dataField='patentTitle'>PatentTitle</TableHeaderColumn> */}
         <TableHeaderColumn id="fc-header-penalties" className = "penalties" columnClassName="fc-content-penalties"
                            dataField={citations} >{_.upperFirst(citations)}</TableHeaderColumn>
         {/* <TableHeaderColumn id="fc-header-penalties" className = "penalties" columnClassName="fc-content-penalties"
                            dataField='domain' >Domain</TableHeaderColumn> */}
      </BootstrapTable>
          </div>
      )
                          }
      </div> )
}
}
AuthorTableComponent.propTypes = {
  config: PropTypes.object,
  searchAuthors: PropTypes.func,
  setMode: PropTypes.func,
  mode: PropTypes.string
};

export default AuthorTableComponent;