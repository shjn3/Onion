import {Form,Modal} from "antd";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getListSaleDetail } from "../../store/actions/saleAction";
import { TableSalerDetail } from "../table/TableSalerDetail";
import FormCreateSaleDetail from '../form/formSale/FromCreateSaleDetail'
import { mappingTotalSaler } from "../../functions/helper";
import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export const SaleDetailComponent = () => {
    const { salerId } = useParams()
    const [isModalCreate, setIsModalCreate] = useState(false)
    const [ detailSale , setDetailSale] = useState(null)
    const [ totalSaler , setTotalSaler] = useState(null)
    const [tableData, setTableData] = useState([])
    const dispatch = useDispatch()
    const { listSaleDetail ,success } = useSelector(state => state.sale)
    const [formCreate] = Form.useForm();
    const history = useHistory()
    
    useEffect(() => {
        dispatch(getListSaleDetail(salerId))
    }, [])
    useEffect(() => {
        if(success){
          setTableData(listSaleDetail)
          console.log({listSaleDetail});
          setTotalSaler(mappingTotalSaler(listSaleDetail))
        }
    }, [listSaleDetail])

    console.log({totalSaler});
    const handleCancelCreate = () =>{   
        setIsModalCreate(false)
        setDetailSale(null)
    }
    const DataSet = [
        {
            columns: [
                {title: "Ngày", style: {font: {sz: "18", bold: true}}, width: {wpx: 125}}, // width in pixels
            ],
            data: tableData.map((data) => [
                {value: data.date, style: {font: {sz: "14"}}},
            ])
        }
    ]
    return (
        <div className="container--card">
            <div className="d-flex justify-content-between mb-2">
                <div>
                    <span className="title-card">Chi tiết bán hành</span>
                </div>
                <div className="align-items-center d-flex">
                    
                    {tableData.length !== 0 ? (
                         <ExcelFile 
                            filename="onion" 
                            element={<button type="button" className="btn btn-excel me-2">  <i class="fas fa-file-excel me-1"></i> Xuất</button>}>
                             <ExcelSheet dataSet={DataSet} name="onion"/>
                         </ExcelFile>
                    ): null} 
                    <button
                        type="button"
                        className="btn btn-onion me-2"
                        style={{ minWidth: "110px" }}
                        onClick={() => setIsModalCreate(true)}
                    >
                        <i className="fas fa-user-plus btn-icon me-2"></i>Thêm
                    </button>
                    <button
                        className="btn btn-outline-onion "
                        style={{ minWidth: "110px" }}
                        onClick={()=>history.push('/sale')}
                    >
                        <i className="fas fa-arrow-left pe-2"></i>
                        Trở về
                    </button>
                </div>
            </div>
            
            <TableSalerDetail
                dataSource={tableData}
                setIsModalCreate={setIsModalCreate}
                setDetailSale={setDetailSale}
                detailSale={detailSale}
            />
            <Modal  title="Tạo Đơn Bán Hàng" 
                    onCancel={handleCancelCreate} 
                    width = {700}
                    visible={isModalCreate} footer={null}>
                <FormCreateSaleDetail
                    formCreate={formCreate}
                    handleCancel={handleCancelCreate}
                    detailSale={detailSale}
                    setDetailSale={setDetailSale}
                />
            </Modal>
           
        </div>
    )
}
