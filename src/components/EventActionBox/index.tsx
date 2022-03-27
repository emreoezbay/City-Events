import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { deleteCityEvent, getTickets, insertTicket, deleteTicket } from '../../apis';
import DeleteIcon from '@mui/icons-material/Delete';
import { Ticket } from '../../types/Ticket';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';

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
  const [deletingEvent, setDeletingEvent] = useState(false);
  const [deletingTicket, setDeletingTicket] = useState(false);

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

  async function deleteTicketAPI(id: string): Promise<any> {
    try {
      setDeletingTicket(true);
      await deleteTicket(id);
      const newTickets = tickets.filter((t) => t.id !== id);
      setTickets(newTickets);
    } catch (e) {
    } finally {
      setDeletingTicket(false);
    }
  }

  async function deleteCityEventAPI(): Promise<any> {
    try {
      setDeletingEvent(true);
      await deleteCityEvent(id);
      window.location.reload();
    } catch (e) {
    } finally {
      setDeletingEvent(false);
    }
  }

  async function createATicket(): Promise<any> {
    if (firstName.length !== 0 && lastName.length !== 0 && id)
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
  }, [firstName, lastName]);

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
          <Box sx={{ p: 2, verticalAlign: 'middle', display: 'inline-flex' }}>
            <TextField
              required
              error={firstName.length === 0}
              size="small"
              label="First Name"
              value={firstName}
              variant="filled"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              required
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
          <Box>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Barcode</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((row) => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.firstName} {row.lastName}
                    </TableCell>
                    <TableCell align="right">{row.barcode}</TableCell>
                    <TableCell align="right">{deletingTicket ? <AutoDeleteIcon /> : <DeleteIcon />}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          <div>
            <Button disabled={deletingEvent} onClick={deleteCityEventAPI} color="error" startIcon={<DeleteIcon />}>
              {deletingEvent ? <CircularProgress /> : 'Delete'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
