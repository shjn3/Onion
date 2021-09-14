import React, { useState } from 'react'
const AddSalerCard = ({handleOkCreate}) => {

    return <div className="sale_card" onClick={handleOkCreate}>
            <button className="sale_card-add">
                +
            </button>
    </div>
}
export default AddSalerCard;