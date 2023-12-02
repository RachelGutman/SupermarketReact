import Actions from './Actions'
function appReducer(store = { customers: [], purches: [], products: [] }, action) {
    switch (action.type) {
        case Actions.INIT_CUSTOMERS:
            return { ...store, customers: action.payload }
        case Actions.INIT_PRODUCTS:
            return { ...store, products: action.payload }
        case Actions.INIT_PURCHES:
            return { ...store, purches: action.payload }
        case Actions.UPDATE_PRODUCT:
           const indexP =  store.products.findIndex(p => p.id == action.payload.id)
            store.products[indexP] = action.payload
            return store
        case Actions.UPDATE_CUSTOMER:
            const indexC = store.customers.findIndex(p => p.id == action.payload.id)
            store.customers[indexC] = action.payload
            return store
        case Actions.DELETE_PRODUCT: 
        debugger
            return {...store,
                products:store.products.filter(p => p.id != action.payload),
                purches: store.purches.filter(p => p.product_id != action.payload)
            }
        case Actions.DELETE_CUSTOMER:
            return {...store,
                customers :store.customers.filter(p => p.id != action.payload),
                purches: store.purches.filter(p => p.customer_id != action.payload)

            }

        default:
            return store
    }
}

export default appReducer