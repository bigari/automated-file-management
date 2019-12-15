import React from "react";
import { observer } from "mobx-react";
import {
  useParams,
  Route
} from "react-router-dom";

import {
  BarChartRounded,
  QuestionAnswerRounded,
  GroupRounded,
  ArrowBackIosRounded
} from "@material-ui/icons";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import QAs from "./qas/QAs"

const Event = observer(props => {
  const { eventId } = useParams();
  const rootStore = props.rootStore;

  return (
    <Route
      render={(props) => (
        <React.Fragment>
          <SideNav
            onSelect={selected => {
              if (selected === "back") {
                props.history.replace("/events");
                return;
              }
              const to = `/events/${eventId}/` + selected;
              if (props.location.pathname !== to) {
                props.history.push(to);
              }

              switch(selected) {
                case 'qas':
                  rootStore.questionStore.fetchQuestions(eventId)
                  break
                case 'polls':
                  break
                case "members":
                  break
                default:
                  break
              }
            }}

            style={{backgroundColor: "#320b86"}}
          >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="polls">
              <NavItem eventKey="polls">
                <NavIcon>
                  <BarChartRounded style={{ fontSize: "2em" }} />
                </NavIcon>
                <NavText>Polls</NavText>
              </NavItem>
              <NavItem eventKey="qas">
                <NavIcon>
                  <QuestionAnswerRounded style={{ fontSize: "2em" }} />
                </NavIcon>
                <NavText>QA</NavText>
              </NavItem>
              <NavItem eventKey="members">
                <NavIcon>
                  <GroupRounded style={{ fontSize: "2em" }} />
                </NavIcon>
                <NavText>Members</NavText>
              </NavItem>
              <NavItem eventKey="back">
                <NavIcon>
                  <ArrowBackIosRounded style={{ fontSize: "2em" }} />
                </NavIcon>
              </NavItem>
            </SideNav.Nav>
          </SideNav>
          <main style={{paddingLeft: 82, paddingTop: 24}}>
            <Route
              path={`/events/${eventId}/qas`}
              component={(props) => <QAs eid={eventId} rootStore={rootStore}/>}
            />
            <Route
              path={`/events/${eventId}/polls`}
              component={(props) => <div>Polls</div>}
            />
            <Route
              path={`/events/${eventId}/members`}
              component={props => <div>Members</div>}
            />
          </main>
        </React.Fragment>
      )}
    />
  );
});

export default Event;
