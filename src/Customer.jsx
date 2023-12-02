import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Actions from './services/Actions';
import MenuItem from '@mui/material/MenuItem';


export default function Customer() {
    const data = useSelector((store) => store)
    const { id } = useParams()
    const [item, setItem] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cities = ['', 'Berlin', 'London', 'NY City', 'Brooklyn', 'Jerusalem', 'Tel Aviv']

    useEffect(() => {
        setCurrentItem()
    }, [id])

    async function setCurrentItem() {
        setItem(data.customers.find(p => p.id == id))
    }

    function updateItem(e) {
        setItem({ ...item, [e.target.name]: e.target.valueAsNumber || e.target.value })
    }

    function updateCollection() {
        dispatch({ type: Actions.UPDATE_CUSTOMER, payload: item })
        navigate('/customers')
    }

    function removeFromCollection() {
        dispatch({ type: Actions.DELETE_CUSTOMER, payload: id })
        navigate('/customers')
    }
    function getProduct(product_id) {
        const product = data.products.find(c => c.id == product_id)
        return <li><Link to={'/products/' + product.id} > {product.name}</Link ></li>
    }

    const style = {
        TextField: { margin: '20px 0', display: 'flex' },
        label: { width: '100px', display: 'flex', fontSize: '125%', alignItems: 'center' },
        ul: { textAlign: 'left' }
    }
    return (
        item && <>
            <div style={{ textAlign: 'left' }}>
                <h1>Edit Customer</h1>
                <div style={style.TextField}>
                    <label style={style.label}>Id:</label> {id}
                </div>
                <div style={style.TextField}>
                    <label style={style.label}>First Name: </label>
                    <TextField variant="outlined" type={'text'} name="first_name" onChange={updateItem} value={item?.first_name} />
                </div>
                <div style={style.TextField}>
                    <label style={style.label}>Last Name: </label>
                    <TextField variant="outlined" type={'text'} name="last_name" onChange={updateItem} value={item?.last_name} />
                </div>
                <div style={style.TextField}>
                    <label style={style.label}>City:</label>
                    <TextField select variant="outlined" name="city" onChange={updateItem} value={item?.city || ''} >
                        {cities.map((city) => (
                            <MenuItem key={city} value={city}>
                                {city}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <button onClick={updateCollection}>Save</button>
                <button onClick={removeFromCollection}>Delete</button>
            </div>
            <div>
                <ul style={style.ul}>
                    Products are bought by this customer:
                    {
                        [...new Set(data.purches?.filter(pur => pur.customer_id == id)
                            .map(pur => pur.product_id))]
                            .map(product_id => getProduct(product_id))
                    }
                </ul>
            </div>
        </>
    )
}
