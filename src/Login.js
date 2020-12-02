import React, { Component } from 'react';
import {StyleSheet,View,Text, TextInput, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
class  InputView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            account:'',
            password:'',
        };
    }
    submit(){
        let user={'account':this.state.account,'password':this.state.password}
        this.storeData = async () => {
            try {
              await AsyncStorage.setItem('user', JSON.stringify(user));
                this.props.navigation.navigate('Main');
            } catch (e) {
            }
        }
    };

    render(){
        return (
                <View style={styles.style_0}>
                    <View style={styles.style_1}>
                        <Text style={{marginTop:20,marginRight:7}}>手机号</Text>
                        <TextInput placeholder='请输入手机号'
                            onChangeText={(text) => this.setState({account:text})}
                            />                        
                        </View>
                    <View style={styles.style_1}>
                        <Text style={{marginTop:20,marginRight:20}}>密码</Text>
                        <TextInput placeholder='请输入密码'
                            onChangeText={(text) => this.setState({password:text})}/>                        
                    </View>
                    <TouchableOpacity style={styles.style_2}>
                        <Text style={{textAlign:'center',color:'#666',width:"100%"}}
                            onPress={() => { this.submit(); this.storeData(); }}>登录</Text>
                    </TouchableOpacity>
                    <View style={styles.style_3}>
                        <Text style={{color:'#666'}}>找回密码</Text>
                        <Text style={{color:'#666'}}>注册</Text>
                    </View>
                    <View style={{alignItems:"center",margin:20 }}>
                        <Text style={{borderBottomWidth:1,width:350,borderBottomColor:'#ccc'}}></Text>
                        <Text style={styles.text}>其它方式登陆</Text>
                    </View>
                    <View style={styles.style_2}>
                        <Text style={{textAlign:'center',color:'#666'}}>微信登陆</Text>
                    </View>
            </View> 
        )
    }
}
const styles = StyleSheet.create({
    style_0:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        height:'100%',
        borderWidth: 1,
    },
    style_1:{
        flex: 0.16,
        flexDirection: 'row',
        width:'80%',
        borderBottomWidth: 1,
        borderBottomColor:'#cccccc',
    },
    style_2:{
        marginTop:20,
        width:'80%',
        height:40,
        justifyContent:"center",
        backgroundColor:'#FFDA44',
        borderRadius:20,
    },
    style_3:{
        width:'80%',
        flexDirection: 'row',
        justifyContent:'space-between',
        marginTop:20,
    },
    text:{color:'#666',backgroundColor:'#F2F2F2',
    position:"relative",width:100,paddingLeft:8,top:-10,},
});
export default InputView
                    {/* <View style={styles.style_2} >
                        <Text style={{textAlign:'center',color:'#666'}} 
                        onPress={ ()=>{
                            this.submit()
                            this.storeData()
                            // ((()=>this.submit() this.storeData()))
                            }
                        }>登陆</Text>
                    </View> */}

