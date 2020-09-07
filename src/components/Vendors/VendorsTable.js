import React, { useState, useEffect } from 'react';
import { AuthHOC } from '../HOCs/AuthHOC'
import { connect } from 'react-redux'

import MaterialTable from 'material-table';
import { patchVendor, deleteVendor, postVendor, fetchVendors } from '../../actions/vendorActions';


const token = () => localStorage.getItem("token");
const userId = localStorage.userId

export const headers = () => {
    return {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token(),
    };
};

function VendorsTable(props) {


    const { vendors, onPostVendor, onPatchVendor, onDeleteVendor, onFetchVendors } = props

    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Rating', field: 'rating' },
        ],
        data: [],
    });


    useEffect(() => {

        const fetchData = async () => {
            const result = await fetch(`http://localhost:3000/users_vendors/${userId}`, {
                headers: headers()
            })
            const body = await result.json()
            setState((prev) => ({
                        columns: [...prev.columns],
                        data: body
                    }))
        }

        fetchData()

    }, [])

    return (
        <MaterialTable
            title="Vendors"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            state.data && setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                        let postData = {...newData, user_id: localStorage.userId}
                        onPostVendor(postData)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                        onPatchVendor(newData, oldData.id)
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                        onDeleteVendor(oldData.id)
                    }),
            }}
        />
    );
}

const mapStateToProps = (store) => ({
    vendors: store.vendors.allVendors
})

const mapDispatchToProps = (dispatch) => ({
    onPostVendor: (postData) => postVendor(postData, dispatch),
    onPatchVendor: (patchData, vendorId) => patchVendor(patchData, vendorId, dispatch),
    onDeleteVendor: (vendorId) => deleteVendor(vendorId, dispatch),
    onFetchVendors: (userId) => fetchVendors(userId, dispatch)
})

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(VendorsTable))
