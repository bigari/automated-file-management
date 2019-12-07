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
  const eventStore = rootStore.eventStore;
  const event = eventStore.events[eventId];

  console.log(event);
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
              <NavItem eventKey="qa">
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
              path={`/events/${eventId}/questions`}
              component={(props) => <div>Events</div>}
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
