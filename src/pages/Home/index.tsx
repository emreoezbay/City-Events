import { CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getCityEvents } from '../../apis';
import EventContainer from '../../components/EventContainer';
import { CityEvent } from '../../types/CityEvent';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [cityEvents, setCityEvents] = useState<CityEvent[]>([]);

  async function getCityEventFromAPI() {
    try {
      setLoading(true);
      const events = await getCityEvents();
      setCityEvents(events);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCityEventFromAPI();
  }, []);

  return (
    <>
      <Typography variant="h1">Home</Typography>

      {loading ? (
        <div>
          <CircularProgress
            sx={{
              textAlign: 'center',
            }}
          />
        </div>
      ) : (
        <EventContainer events={cityEvents} />
      )}
    </>
  );
}
