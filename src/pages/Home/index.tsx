import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getCityEvents, insertCityEvent } from '../../apis';
import EventContainer from '../../components/EventContainer';
import { CityEvent } from '../../types/CityEvent';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import SendIcon from '@mui/icons-material/Send';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [cityEvents, setCityEvents] = useState<CityEvent[]>([]);
  const [eventTitle, setEventTitle] = useState<string>('');
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [eventCity, setEventCity] = useState<string>('');
  const [submitingEvent, setSubmitingEvent] = useState(false);
  const [error, setError] = useState<boolean>(false);

  async function createNewCityEvent(): Promise<any> {
    try {
      if (eventCity.length !== 0 && eventDate !== null && eventTitle.length !== 0) {
        setSubmitingEvent(true);
        const newCityEvent = await insertCityEvent({
          eventCity,
          eventTitle,
          eventDate: eventDate,
        });
        console.log(newCityEvent);
        setCityEvents([...cityEvents, newCityEvent]);
      }
    } catch (e) {
    } finally {
      setSubmitingEvent(false);
    }
  }

  async function getCityEventFromAPI(): Promise<any> {
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

  useEffect(() => {
    if (eventCity.length !== 0 && eventDate !== null && eventTitle.length !== 0) {
      setError(false);
    } else {
      setError(true);
    }
  }, [eventTitle, eventDate, eventCity]);

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
      <Box sx={{ m: 2 }}>
        <div style={{ marginBottom: 7 }}>
          <TextField
            sx={{ width: '100%' }}
            required
            error={eventTitle.length === 0}
            label="CityEvent Title"
            value={eventTitle}
            variant="filled"
            onChange={(e) => setEventTitle(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: 7 }}>
          <TextField
            sx={{ width: '50%' }}
            required
            error={eventCity.length === 0}
            label="Event City"
            value={eventCity}
            variant="filled"
            onChange={(e) => setEventCity(e.target.value)}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => (
                <TextField {...props} sx={{ width: '50%' }} error={!eventDate} variant="filled" />
              )}
              label="CityEvent Date"
              value={eventDate}
              onChange={(newValue) => {
                setEventDate(newValue);
              }}
            />
          </LocalizationProvider>
        </div>
      </Box>
      <Button
        variant="contained"
        startIcon={submitingEvent ? <CachedOutlinedIcon /> : <SendIcon />}
        onClick={createNewCityEvent}
      >
        {submitingEvent ? 'Creating...' : 'Add a new CityEvent'}
      </Button>
    </>
  );
}
