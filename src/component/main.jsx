import React,{Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
export default class Main extends Component {
    state={
        initView:true,
        loading:false,
        users:null,
        errorMsg:null
    }
    static propTypes={
        searchName:PropTypes.string.isRequired
    }
    //当组件接收到新的组件时 发生的回调函数 
    componentWillReceiveProps(newProps){
        const {searchName} =newProps
        this.setState({initView:false,loading:true})
        const url=`https://api.github.com/search/users?q=${searchName}`
        axios.get(url).then(res=>{
            const result=res.data
           const users= result.items.map((item,index)=>{
                return {name:item.login,url:item.html_url,avatarurl:item.avatar_url}
            })
            this.setState({loading:false,users})
        }).catch(err=>{
            this.setState({loading:false,errorMsg:err.message})
        })
    }
    render(){
        const {initView,loading,users,errorMsg}=this.state
        if(initView){
        return <h2>请输入关键字进行搜索{this.props.searchName}</h2>
        }
        else if(loading){
            return <h2>正在请求中....</h2>
        }
        else if(errorMsg){
            return <h2>{errorMsg}</h2>
        }
        else{
            return (
                <div className="row">
                   { 
                   users.map((item,index)=>(
                        <div className="card" key={index}>
                        <a href={item.url} target="_blank"  rel="noopener noreferrer" >
                        <img src={item.avatarurl}  alt="#" style={{width: '100px'}}/>
                        </a>
                        <p className="card-text">{item.name}</p>
                        
                    </div>
                    ))
                     }
                </div>
            )
        }

    }
}