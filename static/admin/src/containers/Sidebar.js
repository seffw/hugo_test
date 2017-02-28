import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactSidebar from 'react-sidebar';
import _ from 'lodash';
import { openSidebar } from '../actions/globalUI';
import styles from './Sidebar.css';

class Sidebar extends React.Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    sidebarIsOpen: PropTypes.bool.isRequired,
    openSidebar: PropTypes.func.isRequired,
  };

  state = { sidebarDocked: false };

  componentWillMount() {
    this.mql = window.matchMedia('(min-width: 1200px)');
    this.mql.addListener(this.mediaQueryChanged);
    this.setState({ sidebarDocked: this.mql.matches });
  }

  componentWillUnmount() {
    this.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged = _.throttle(() => {
    this.setState({ sidebarDocked: this.mql.matches });
  }, 500);


  render() {
    const {
      children,
      content,
      sidebarIsOpen,
      openSidebar,
    } = this.props;

    return (
      <ReactSidebar
        sidebar={content}
        rootClassName={styles.root}
        sidebarClassName={styles.sidebar}
        docked={sidebarIsOpen && this.state.sidebarDocked} // ALWAYS can hide sidebar
        open={sidebarIsOpen}
        onSetOpen={openSidebar}
      >
        {children}
      </ReactSidebar>
    );
  }
}

function mapStateToProps(state) {
  const { globalUI } = state;
  const sidebarIsOpen = globalUI.get('sidebarIsOpen');
  return { sidebarIsOpen };
}

export default connect(mapStateToProps, { openSidebar })(Sidebar);
