import React, {useState, useEffect} from 'react'
import { postSmokeList, patchSmokeList } from '../../actions/smokeListActions'
import { connect } from 'react-redux'


const ListForm = (props) => {

    const [state, setState] = useState({
        editList: false,
        error: false,
        newList: false,
        fields: {
            user_id: '',
            title: '',
            description: '',
        }
    })

    const { list, onPostSmokeList, onPatchSmokeList, smokeList, setForm } = props 

    useEffect(() => {
        if (list) {
            setState({
                edit: true, 
                fields: {
                    user_id: list.user_id, 
                    title: list.title, 
                    description: list.description
                }
            })
        }
    }, [])

    const handleChange = (e) => {
        const newFields = { ...state.fields, [e.target.name]: e.target.value };
        setState((prev) => ({...prev, fields: newFields }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (state.edit) {
            onPatchSmokeList(state.fields, smokeList.id)
            // setSelected([])
        } else {
            
            const newFields = {...state.fields, user_id: localStorage.userId,}
            setState((prev)=> ({...prev, fields: newFields}))
            
            onPostSmokeList(newFields)            
        }
        setForm(false)
    };

    const { title, description } = state.fields  


    return (
         <div>
                {state.error ? <h1>Try again...</h1> : null}
                <form className="signup-form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Title</label>
                        <input className="form-control" type="text" name="title" value={title} required onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input className="form-control" type="text" name="description" value={description} required onChange={handleChange} />
                    </div>
                    
                </form>

                <button className="btn btn-info" type="submit" onClick={handleSubmit}>Submit</button>
            </div>
    )
}


const mapStateToProps = (store) => ({
    
})

const mapDispatchToProps = (dispatch) => ({
    onPostSmokeList: (data) => postSmokeList(data, dispatch),
    onPatchSmokeList: (data, smokeListId) => patchSmokeList(data, smokeListId, dispatch)


})

export default connect(mapStateToProps, mapDispatchToProps)(ListForm)