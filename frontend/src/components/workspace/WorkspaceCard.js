import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import roleIcon from "../../icons/role512.png";
import { ROLES } from "../../repositories/mobx/workspace/WorkspaceStore";

const useStyles = makeStyles({
  card: {
    minWidth: "100px",
    width: "250px",
    height: "200px",
    "padding-top": "20px",
    "padding-right": "20px",
    "padding-bottom": "12px",
    "padding-left": "20px",
    cursor: "pointer",
    "&:hover": {
      background: "#E6E2E4"
    }
  },
  title: {
    "font-size": "20px",
    "line-height": "5px"
  },

  role: {
    "text-transform": "capitalize",
    "font-style": "italic"
  }
});

const WorkspaceCard = function(props) {
  const classes = useStyles();
  const workspace = props.workspace;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Box height={150} display="flex" alignItems="center">
          <Box mt={2}>
            <Typography variant="subtitle1">{workspace.name}</Typography>
          </Box>
        </Box>
        <Box height={50} display="flex">
          <Box mr={4}>
            <img src={roleIcon} alt="role" width={24} height={24} />
          </Box>
          <Typography variant="caption" className={classes.role}>
            {ROLES[workspace.roleId]}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WorkspaceCard;
