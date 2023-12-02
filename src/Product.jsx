import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Actions from './services/Actions';

export default function Product() {
    const data = useSelector((store) => store)
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        setCurrentProduct()
    }, [id])

    async function setCurrentProduct() {
        setProduct(data.products.find(p => p.id == id))
    }

    function updateProduct(e) {
        setProduct({ ...product, [e.target.name]: e.target.valueAsNumber || e.target.value })
    }

    function updateCollection() {
        dispatch({ type: Actions.UPDATE_PRODUCT, payload: product })
        navigate('/products')

    }

    function removeFromCollection() {
        dispatch({ type: Actions.DELETE_PRODUCT, payload: id })
        navigate('/products')
    }

    function getCustomer(customer_id) {
        const customer = data.customers.find(c => c.id == customer_id)
        return <li><Link to={'/customers/' + customer.id} style={style.customer}>{customer.first_name} {customer.last_name}</Link></li>
    }

    const style = {
        TextField: { margin: '20px 0', display: 'flex' },
        label: { width: '100px', display: 'flex', fontSize: '125%', alignItems: 'center' },
        ul: { textAlign: 'left' }
    }
    return (
        <>
            <div style={{ textAlign: 'left' }}>
                <h1>Edit Product</h1>
                <div style={style.TextField}>
                    <label style={style.label}>Id:</label> {id}
                </div>
                <div style={style.TextField}>
                    <label style={style.label}>Name: </label>
                    <TextField variant="outlined" type={'text'} name="name" onChange={updateProduct} value={product?.name} />
                </div>
                <div style={style.TextField}>
                    <label style={style.label}>Price:</label> <TextField variant="outlined" type={'number'} name="price" onChange={updateProduct} value={product?.price} />
                </div>
                <div style={style.TextField}>
                    <label style={style.label}>Quentity:</label> <TextField variant="outlined" type={'number'} name="quentity" onChange={updateProduct} value={product?.quentity} />
                </div>
                <button onClick={updateCollection}>Save</button>
                <button onClick={removeFromCollection}>Delete</button>
            </div>
            <div>
                <ul style={style.ul}>
                    Customers who bought this product:
                    {[...new Set(data.purches?.filter(pur => pur.product_id == id)
                        .map(pur => pur.customer_id))]
                        .map(customer_id => getCustomer(customer_id))
                    }
                </ul>
            </div>
        </>
    )
}
