import React from "react";
import { connect } from "react-redux";
import { List} from 'antd';
import Result from "../components/Result"
class Profile extends React.PureComponent {
    render() {
        console.log(this.props.username)
        return (
           <div><h1>hi {this.props.username}</h1> 
              <List
                 size="large"
                 bordered
                 dataSource={[]}
                 renderItem={a=><Result key={a.id} grade={a.grade}/>}
              />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        username: state.auth.username
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps)(Profile);

