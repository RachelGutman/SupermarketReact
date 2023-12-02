import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Actions from './services/Actions'
import customersServices from './services/customers'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Customers() {

    const { customers } = useSelector((store) => store)
    const dispatch = useDispatch()

    useEffect(() => {
        loadCustomerts()
    }, [])

    async function loadCustomerts() {
        if (!customers || !customers.length) {
            const customers = await customersServices.getCustomers()
            dispatch({ type: Actions.INIT_CUSTOMERS, payload: customers })
        }
    }

    return (
        <>
            <h1>Customers</h1>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>City</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.first_name}</TableCell>
                                <TableCell>{row.last_name}</TableCell>
                                <TableCell>{row.city}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
