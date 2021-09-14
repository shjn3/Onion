import React, { useState } from 'react'
import { Link } from 'react-router-dom';
const SalerCard = ({item}) => {

    return <Link to={'/sale-detail/' + item.id} className="sale_card">
       <div className="sale_card-header">
         <p className="card-title">
            {item.fullName}
         </p>  
         <p className="card-number">
            {item.phoneNumber}
         </p>
       </div>
    </Link>
}
export default SalerCard;