import React,{Component} from 'react'
import PropTypes from 'prop-types'
export default class Search extends Component {
    static propTypes={
        setSearchName:PropTypes.func.isRequired
    }
    search=()=>{
        const searchName=this.input.value.trim()
        if(searchName){
            this.props.setSearchName(searchName)
        }
    }
    render(){
        return (
            <section className="jumbotron">
            <h3 className="jumbotron-heading">Search Github Users</h3>
            <div>
                <input type="text" ref={input=>this.input=input} placeholder="enter the name you search"/>
                <button onClick={this.search}>Search</button>
            </div>
            </section>
        )
    }
}