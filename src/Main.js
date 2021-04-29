import React, { useState, useEffect } from 'react'
import './App.css'
import Container from './Container'
import { List } from 'antd'
import { API } from 'aws-amplify'
import checkUser from './CheckUser'

function Main() {
    const [state, setState] = useState({products: [], loading: true})
    const [user, updateUser] = useState({})

    let didCancel = false

    useEffect(() => {
        getProducts()
        checkUser(updateUser)
        //return () => didCancel = true
    }, [])

    async function getProducts() {
        const data = await API.get('ecommerceapi', '/products')
        console.log('data: ', data)
        if(didCancel) return
        setState({products: data.data.Items, loading: false})
        //setState({products: [{name: "apple", price: "2"}], loading: false})
    }

    async function deleteItem(id) {
        try {
            const products = state.products.filter(p => p.id !== id)
            setState({...state, products})
            await API.del('ecommerceapi', '/products', { body: {id} })
            console.log('successfully deleted item')
        } catch(err) {
            console.log('error deleting item: ', err)
        }
    }
    return (
        <Container>
            <List
                itemLayout="horizontal"
                dataSource={state.products}
                loading={state.loading}
                renderItem={item => (
                    <List.Item  actions={user.isAuthorized?[<p onClick={() => deleteItem(item.id)} key={item.id}>delete</p>]:null}>
                        <List.Item.Meta title={item.name} description={"$" + item.price + "/lb"}/>
                    </List.Item>
                )}
            />
        </Container>
    )
}

export default Main