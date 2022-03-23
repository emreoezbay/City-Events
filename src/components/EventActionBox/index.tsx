import { Box, Button, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getTickets } from '../../apis';
import { Ticket } from '../../types/Ticket';
type Props = {
  id: string;
  show: boolean;
};

export default function EventActionBox({ id, show }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  async function getTicketsFromAPI() {
    try {
      setLoading(true);
      const c_tickets = await getTickets(id);
      setTickets(c_tickets);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (show) {
      getTicketsFromAPI();
    }
  }, [show]);

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
            <TextField id="filled-basic" label="First Name" variant="filled" />
            <TextField id="filled-basic" label="Last Name" variant="filled" />
            <Button variant="text">Add</Button>
          </Box>
          <div></div>
          {tickets.map((ticket) => (
            <div>
              <div>
                {ticket.firstName} {ticket.lastName}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
