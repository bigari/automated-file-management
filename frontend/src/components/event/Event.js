import React from "react";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";

const Event = observer(props => {
  const { eventId } = useParams();
  const eventStore = props.eventStore;
  const event = eventStore.events[eventId];
  console.log(event);
  return <div> Event</div>;
});

export default Event;
