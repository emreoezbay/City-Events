import { Box, Button, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getTickets, insertTicket } from '../../apis';
import { Ticket } from '../../types/Ticket';
type Props = {
  id: string;
  show: boolean;
};

export default function EventActionBox({ id, show }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [submiting, setSubmiting] = useState(false);
  const [error, setError] = useState(false);

  async function getTicketsFromAPI(): Promise<void> {
    try {
      setLoading(true);
      const c_tickets = await getTickets(id);
      setTickets(c_tickets);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }

  async function createATicket(): Promise<any> {
    if (firstName.length !== 0 && lastName.length !== 0)
      try {
        setSubmiting(true);
        const newTicket = await insertTicket({
          cityEventId: id,
          firstName,
          lastName,
        });
        setTickets([...tickets, newTicket]);
      } catch (e) {
        console.log(e);
      } finally {
        setSubmiting(false);
      }
  }

  useEffect(() => {
    if (show) {
      getTicketsFromAPI();
    }
  }, [show]);

  useEffect(() => {
    if (firstName.length === 0 || lastName.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
  });

  return (
    <div style={{ display: show ? '' : 'none' }}>
      {loading ? (
        <div>
          <CircularProgress
            sx={{
              textAlign: 'center',
            }}
          />
        </div>
      ) : (
        <div>
          <Box sx={{ verticalAlign: 'middle', display: 'inline-flex' }}>
            <TextField
              error={firstName.length === 0}
              size="small"
              label="First Name"
              value={firstName}
              variant="filled"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              error={lastName.length === 0}
              size="small"
              label="Last Name"
              value={lastName}
              variant="filled"
              onChange={(e) => setLastName(e.target.value)}
            />
            <Button disabled={error ?? submiting} variant="text" onClick={createATicket}>
              {submiting ? <CircularProgress /> : 'Add'}
            </Button>
          </Box>
          <div></div>
          {tickets.map((ticket) => (
            <div key={ticket.id}>
              <div>
                {ticket.firstName} {ticket.lastName} | {ticket.barcode}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
