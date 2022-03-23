import React from 'react';
import { CityEvent } from '../../types/CityEvent';
import EventBox from '../EventBox';
import EventBusyRoundedIcon from '@mui/icons-material/EventBusyRounded';
import { Box } from '@mui/material';

type Props = {
  events: CityEvent[] | undefined;
};

export default function EventContainer({ events }: Props) {
  return (
    
    <Box>
      {events ? (
        events.map((e: CityEvent, i) => <EventBox onClick={() => console.log(e.id)} key={i} event={e} />)
      ) : (
        <EventBusyRoundedIcon />
      )}
    </Box>
  );
}
