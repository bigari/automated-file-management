import React from "react";
import { observer } from "mobx-react";
import { useParams, Route } from "react-router-dom";

import {
  BarChartRounded,
  QuestionAnswerRounded,
  GroupRounded,
  ArrowBackIosRounded,
  InfoRounded,
  DonutSmallRounded
} from "@material-ui/icons";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import QAs from "./qas/QAs";
import Info from "./info/Info";
import Members from "./members/Members";
import Polls from "./polls/Polls";
import Stats from "./stats/Stats";

const Event = observer(props => {
  const { eventId } = useParams();
  const rootStore = props.rootStore;
  const eventStore = rootStore.eventStore;
  const userStore = rootStore.userStore;
  rootStore.questionStore.eid = eventId;
  rootStore.pollStore.eid = eventId;
  rootStore.memberStore.eid = eventId;

  let event;
  // eslint-disable-next-line
  if (userStore.member && userStore.member.event.id == eventId) {
    event = userStore.member.event;
  } else if (eventStore.events[eventId]) {
    event = eventStore.events[eventId];
  } else {
    return <center>Unauthorized</center>;
  }

  const wss = rootStore.webSocketService;
  wss.init(`events/${eventId}`);
  // wss.send({
  //   url: "events",
  //   verb: "GET"
  // });

  return (
    <Route
      render={props => (
        <React.Fragment>
          <SideNav
            onSelect={selected => {
              if (selected === "back") {
                props.history.replace("/events");
                wss.close();
                rootStore.questionStore.hasFetched = false;
                rootStore.pollStore.hasFetched = false;
                rootStore.memberStore.hasFetched = false;
                return;
              }
              const to = `/events/${eventId}/` + selected;
              if (props.location.pathname !== to) {
                props.history.push(to);
              }
            }}
            style={{ backgroundColor: "#320b86" }}
          >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="info">
              <NavItem eventKey="info">
                <NavIcon>
                  <InfoRounded
                    style={{ fontSize: "2em", verticalAlign: "middle" }}
                  />
                </NavIcon>
                <NavText>Info</NavText>
              </NavItem>
              <NavItem eventKey="polls">
                <NavIcon>
                  <DonutSmallRounded
                    style={{ fontSize: "2em", verticalAlign: "middle" }}
                  />
                </NavIcon>
                <NavText>Polls</NavText>
              </NavItem>
              <NavItem eventKey="qas">
                <NavIcon>
                  <QuestionAnswerRounded
                    style={{ fontSize: "2em", verticalAlign: "middle" }}
                  />
                </NavIcon>
                <NavText>QA</NavText>
              </NavItem>
              {!userStore.isParticipant && (
                <NavItem eventKey="members">
                  <NavIcon>
                    <GroupRounded
                      style={{ fontSize: "2em", verticalAlign: "middle" }}
                    />
                  </NavIcon>
                  <NavText>Members</NavText>
                </NavItem>
              )}
              {!userStore.isParticipant && (
                <NavItem eventKey="stats">
                  <NavIcon>
                    <BarChartRounded
                      style={{ fontSize: "2em", verticalAlign: "middle" }}
                    />
                  </NavIcon>
                </NavItem>
              )}

              {!userStore.isParticipant && (
                <NavItem eventKey="back">
                  <NavIcon>
                    <ArrowBackIosRounded
                      style={{ fontSize: "2em", verticalAlign: "middle" }}
                    />
                  </NavIcon>
                </NavItem>
              )}
            </SideNav.Nav>
          </SideNav>
          <main style={{ paddingLeft: 82, paddingTop: 24 }}>
            <Route
              path={`/events/${eventId}/info`}
              component={props => <Info event={event} />}
            />
            <Route
              path={`/events/${eventId}/qas`}
              component={props => <QAs eid={eventId} rootStore={rootStore} />}
            />
            <Route
              path={`/events/${eventId}/polls`}
              component={props => (
                <Polls eid={eventId} rootStore={rootStore}></Polls>
              )}
            />
            <Route
              path={`/events/${eventId}/members`}
              component={props => (
                <Members eid={eventId} rootStore={rootStore} />
              )}
            />
            <Route
              path={`/events/${eventId}/stats`}
              component={props => <Stats eid={eventId} rootStore={rootStore} />}
            />
          </main>
        </React.Fragment>
      )}
    />
  );
});

export default Event;
