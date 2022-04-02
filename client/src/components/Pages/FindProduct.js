import React, { useState } from 'react'
import useAxios from 'axios-hooks'
import { Form, Table } from 'react-bootstrap'

const FindProduct = (props) => {
    const [{ data: products, loading, error }] = useAxios('/api/products')

    const [filteredSellers, setFilteredSellers] = useState(null)
        if (error) return <p>Error Occurred loading Sellers</p>
        if (loading) return <p>Loading</p>

    const getUniqueSellers = () => {
        
    }
}

export default FindProduct