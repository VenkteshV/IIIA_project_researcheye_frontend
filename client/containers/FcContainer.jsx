import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AuthorTableComponent from '../components/AuthorTableComponent.jsx';
import { searchAuthors, setMode} from '../actions/search';
const mapStateToProps = (state) => ({
  config: state.config,
  selectedValues: state.config.selectedValues,
  mode: state.config.mode
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    searchAuthors,
    setMode,
}, dispatch);

const FcContainer = connect(mapStateToProps, mapDispatchToProps)(AuthorTableComponent);

export default FcContainer;
