/**
 * Created by cw on 2017/10/17.
 */
import {h, Component} from '../../preact/preact';
// import { h, Component } from 'preact';
export default class button extends Component{

    constructor(props){
        super(props);
        this.state = {
            num : 1
        }
    }

    componentWillMount(){
        setInterval(()=>{
            console.log(this.state.num.toString());
            this.setState({
                num: this.state.num+1
            });
        }, 1000);
    }

    componentDidMount() {
    }

    render(){
        return(
            <div style={{width:200, height:2000,fontSize:100}}>
                <p onClick={()=>{this.setState({
                    num: this.state.num+1})}}>{this.state.num}</p>
                <p style={{fontSize:200, color:"#ff0000", height:400}}
                   onClick={
                       ()=>{setTimeout(()=>{this.setState({
                           num: this.state.num+1})}, 2000)}
                   }>11111</p>

            </div>
        )
    }
}