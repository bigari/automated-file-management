import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
  Grid
} from "@material-ui/core";

import Centered from "../../Centered";
import { observer } from "mobx-react";

const Stats = observer(props => {
  const memberStore = props.rootStore.memberStore;
  const questionStore = props.rootStore.questionStore;
  const pollStore = props.rootStore.pollStore;
  const eid = props.eid;
  pollStore.fetchPolls(eid);
  questionStore.fetchQuestions(eid);
  memberStore.fetchMembers(eid);

  const participantCount = memberStore.participantCount;
  const totalVotes = pollStore.totalVotes;

  let questionEngagement =
    participantCount > 0
      ? (questionStore.qas.length / participantCount) * 100
      : -1;
  questionEngagement = parseFloat(questionEngagement.toFixed(1));
  questionEngagement =
    questionEngagement >= 0 ? questionEngagement + " %" : "-";
  let voteEngagement =
    participantCount > 0 ? (totalVotes / participantCount) * 100 : -1;
  voteEngagement = parseFloat(voteEngagement.toFixed(1));
  voteEngagement = voteEngagement >= 0 ? voteEngagement + " %" : "-";

  return (
    <Container md>
      <Typography variant="h5">Statistics</Typography>
      <Centered
        label={
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Card style={{ padding: "8px", paddingTop: "0px" }}>
                <CardHeader title="Participants" />
                <CardContent>
                  <Box display="flex">
                    <Typography
                      variant="h4"
                      style={{ margin: "auto" }}
                      color="primary"
                    >
                      {participantCount}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card style={{ padding: "8px", paddingTop: "0px" }}>
                <CardHeader title="Questions" />
                <CardContent>
                  <Box display="flex" justifyContent="space-around">
                    <Typography
                      variant="h4"
                      style={{ margin: "auto" }}
                      color="primary"
                    >
                      {questionStore.qas.length}
                    </Typography>
                    <Typography
                      variant="h4"
                      style={{ margin: "auto" }}
                      color="primary"
                    >
                      {questionEngagement}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card style={{ padding: "8px", paddingTop: "0px" }}>
                <CardHeader title="Votes" />
                <CardContent>
                  <Box display="flex" justifyContent="space-around">
                    <Typography
                      variant="h4"
                      style={{ margin: "auto" }}
                      color="primary"
                    >
                      {totalVotes}
                    </Typography>
                    <Typography
                      variant="h4"
                      style={{ margin: "auto" }}
                      color="primary"
                    >
                      {voteEngagement}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        }
      ></Centered>
    </Container>
  );
});

export default Stats;
