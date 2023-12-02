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
import ProductData from './ProductsData';
import { Link } from 'react-router-dom';

export default function DynamicTable({ collectionName, columns }) {

    const data = useSelector((store) => store)
    const dispatch = useDispatch()

    useEffect(() => {
        loadCollection()
    }, [collectionName])

    async function loadCollection() {
        if (!data[collectionName] || !data[collectionName].length) {
            const list = await customersServices.getCollection(collectionName)
            dispatch({ type: Actions[`INIT_${collectionName.toUpperCase()}`], payload: list })
        }
    }

    function getCustomer(pur) {
        const customer = data.customers.find(c => c.id == pur.customer_id)
        return <li><Link to={'/customers/' + customer.id} >{customer.first_name} {customer.last_name}</Link> - {pur.date}</li>
    }

    return (
        <>
            <h1>{collectionName}</h1>
            {collectionName == 'products' && <ProductData />}

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map(c => <TableCell key={c}>{c.toUpperCase()}</TableCell>)}
                            {collectionName == 'products' && <TableCell>Customers</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data[collectionName].map((row) => (
                            <TableRow component={Link} to={`${row.id}`}
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {columns.map(c => <TableCell key={row.id + c} style={{verticalAlign: 'top'}}>{row[c]}</TableCell>)}
                                {collectionName == 'products' &&
                                    <TableCell style={{ verticalAlign: 'top' }}><ul style={{margin: '0'}}>
                                    {data.purches.filter(pur => pur.product_id == row.id).map(pur=>  getCustomer(pur))}
                                           
                                    </ul></TableCell>
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}
