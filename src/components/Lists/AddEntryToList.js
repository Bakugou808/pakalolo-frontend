import React, { Component } from 'react'
import { connect } from 'react-redux'
import StrainTable from '../MainPage/StrainTable'

export const AddEntryToList = (props) => {

    const { collection } = props

    return (
        <div>
            {collection &&
                <StrainTable collection={collection} />
            }
        </div>
    )
}

const mapStateToProps = (store) => ({
    collection: store.collection.totalCollection,

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AddEntryToList)
