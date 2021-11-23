import PropTypes from "prop-types";
import React, { Component } from "react";
import homepageimg from "../assets/Homepageimage.svg"
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";
const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};
class DesktopContainer extends Component {
  state = {};
  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });
  render() {
    const { children } = this.props;
    const { fixed } = this.state;
    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        />
        {children}
      </Responsive>
    );
  }
}
DesktopContainer.propTypes = {
  children: PropTypes.node
};
class MobileContainer extends Component {
  state = {};
  handleSidebarHide = () => this.setState({ sidebarOpened: false });
  handleToggle = () => this.setState({ sidebarOpened: true });
  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;
    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        {children}
      </Responsive>
    );
  }
}
MobileContainer.propTypes = {
  children: PropTypes.node
};
const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);
ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const HomepageLayout = () => (

  <ResponsiveContainer>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              ExamTime - A place of virtual Classroom
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              A Exam conducting platform with all the high end security and inbuilt plagirism checker , platform for teachers and students to meet
              and attend to complete exams and other assignments in Atal Bihari Vajpayee Indian Institute Of Information Technology and Management Gwalior.
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image
              bordered
              rounded
              size="large"
              src={homepageimg}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </ResponsiveContainer>
);
export default HomepageLayout;
