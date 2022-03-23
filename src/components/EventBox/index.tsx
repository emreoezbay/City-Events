import { Box, Typography } from '@mui/material';
import { CityEvent } from '../../types/CityEvent';
import React, { useState } from 'react';
import moment from 'moment';
import EventActionBox from '../EventActionBox';

interface Props {
  event: CityEvent;
  onClick?: () => void;
}

export default function EventBox({ event, onClick }: Props) {
  const { eventTitle, eventCity, eventDate, id } = event;
  const [showActionBox, setShowActionBox] = useState(false);

  return (
    <Box sx={{ border: '1px dashed grey', m: 2, borderRadius: 1 }}>
      <Box
        onClick={() => {
          setShowActionBox(!showActionBox);
        }}
        sx={{ display: 'flex', width: '100%', cursor: 'pointer' }}
      >
        <Box sx={{ p: 2 }}>
          <div>{moment(eventDate).format('DD')}</div>
          <b>
            <div>{moment(eventDate).format('MMM')}</div>
          </b>
          <div>{moment(eventDate).format('YYYY')}</div>
        </Box>
        <Box sx={{ width: '100%', textAlign: 'left', p: 2 }}>
          <Typography variant="h2">{eventTitle}</Typography>
          <Typography variant="subtitle1">{eventCity}</Typography>
        </Box>
      </Box>
      <EventActionBox show={showActionBox} id={id} />
    </Box>
  );
}
