import React, { useState } from 'react'
import './App.css'
import { Input, Button } from 'antd'
import { API } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'

const containerStyle = {
    width: 400,
    margin: '20px auto'
}

const inputStyle = {
    marginTop: 10
}

const buttonStyle = {
    marginTop: 10
}

const initialItemInfo = {
    name: '',
    price: ''
}

function Admin() {
    const [itemInfo, updateItemInfo] = useState(initialItemInfo)

    function updateForm(e) {
        const formData = {...itemInfo, [e.target.name]: e.target.value}
        updateItemInfo(formData)
    }

    async function addItem() {
        try {
            const data = {
                body: { ...itemInfo, price: parseInt(itemInfo.price) }
            }
            updateItemInfo(initialItemInfo)
            await API.post('ecommerceapi', '/products', data)
        } catch(err) {
            console.log('error add item: ', err)
        }
    }
    return (
        <div style={containerStyle}>
            <Input name='name' onChange={updateForm} value={itemInfo.name} placeholder="Item Name" style={inputStyle}/>
            <Input name='price' onChange={updateForm} value={itemInfo.price} placeholder="Item Price" style={inputStyle}/>
            <Button style={buttonStyle} onClick={addItem}>
                Add product
            </Button>
        </div>
    )
}

export default withAuthenticator(Admin)