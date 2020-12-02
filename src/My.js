import React from 'react';
import {StyleSheet,View,Text,Image, Switch} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons'
class My extends React.Component{
    constructor() {
        super();
        this.state = {
            account:'',
            myValue: true,
            myValue2: false,
            show:true,
            showHideLogin:true,
            number:0,
        };
    }
    handleV = (switchValue) => {  this.setState({myValue: switchValue});};
    handleV2 = (switchValue2) => { this.setState({myValue2: switchValue2}); };
    getAccount = async () => {
            try {
                const user =JSON.parse(await AsyncStorage.getItem('user'))
                if(user !== null) {
                    this.setState({account: user.account});}
            } catch(e) {}
    }
    punch(){
        this.setState({number:this.state.number+1})
    }
    componentWillMount(){this.getAccount()}
    render(h) {
        const showHide = this.state.account?
            <View >
                <Text style={{fontSize:20}}>{this.state.account}</Text>
            </View>
            :<View >
                <Text style={{fontSize:20}} onPress={()=>{this.props.navigation.navigate('Login')}}>未登录</Text>
            </View>
        const showHideLogin=this.state.account?
            <View >
                <Text style={styles.style_4} onPress={()=>{this.props.navigation.navigate('Login')}}>退出登陆</Text>
            </View> 
            :<View ></View>
        return(
            <View style={styles.style}>
                <View style={styles.style_top}>
                    <Image style={styles.image} source={require('./images/logo.png')}/>                    
                    <View>
                        {showHide}
                    </View>
                    <Text style={styles.punch} 
                        onPress={((()=>this.punch()))}>打卡</Text>
                    <View style={styles.style_bottom}>
                        <View><Text style={styles.num}>{this.state.number}</Text><Text>已连续打卡</Text></View>
                        <View><Text style={styles.num}>{this.state.number}</Text><Text>已记录天数</Text></View>
                        <View><Text style={styles.num1}>0</Text><Text>总笔数</Text></View>
                    </View>
                </View>
                <View style={styles.style_0}>
                    <View style={styles.style_1}>
                        <IconM name={'medal-outline'} size={20} />
                        <Text style={{paddingLeft:10}}>徽章</Text>
                        <IconM name={'chevron-right'} size={20} style={styles.style_IconM1} />
                    </View>
                    <View style={styles.style_1}>
                        <IconM name={'qrcode'} size={20} />
                        <Text style={styles.style_3} onPress={()=>{this.props.navigation.navigate('Category')}}>类别设置</Text>
                        <IconM name={'chevron-right'} size={20}
                            onPress={()=>{this.props.navigation.navigate('Category')}} />
                    </View>
                    <View style={styles.style_2}>
                        <IconM name={'alarm'} size={20} />
                        <Text style={{paddingLeft:10}}>定时开关</Text>
                        <IconM name={'chevron-right'} size={20} style={styles.style_IconM2} />
                    </View>
                    <View style={styles.style_2}>
                        <Icon name={'music'} size={20} />
                        <Text style={{paddingLeft:10}}>声音开关</Text>
                        <Switch 
                        style={{marginLeft:'55%', transform: [{ scaleX: 1.5 }, { scaleY: 1.5}]}} 
                            onValueChange={this.handleV} 
                            value={this.state.myValue} 
                            onTintColor='red' tintColor='blue' thumbTintColor='black'/>
                    </View>
                    <View style={styles.style_2}>
                        <IconM name={'file-document-outline'} size={20} />
                        <Text style={{paddingLeft:10}}>明细详情</Text>
                        <Switch 
                            style={{marginLeft:'55%', transform: [{ scaleX: 1.5 }, { scaleY: 1.5}]}} 
                            onValueChange={this.handleV2} value={this.state.myValue2} 
                            onTintColor='red' tintColor='blue' thumbTintColor='black' />
                    </View>
                    <View style={styles.style_1}>
                        <Icon name={'diamond'} size={20} />
                        <Text style={{paddingLeft:10}}>升级至装版</Text>
                        <IconM name={'chevron-right'} size={20} style={styles.style_IconM3} />
                    </View>
                    <View style={styles.style_2}>
                        <Icon name={'share-square-o'} size={20} />
                        <Text style={{paddingLeft:15}}>推荐鲨鱼记账给好友</Text>
                        <IconM name={'chevron-right'} size={20} style={styles.style_IconM4} />
                    </View>
                    <View>
                        {showHideLogin}
                    </View>
                </View> 
            </View>
        )
    }
}
const styles = StyleSheet.create({
    style:{ flex:1, },
    image: { width:70, height:70, },
    punch:{
        position:'relative',
        top:-90,
        right:'-40%',
        backgroundColor:'white',
        borderRadius:20,
        width:60,
        height:20,
        lineHeight:20,
        textAlign:'center',
    },
    style_top:{
        height:'30%',
        paddingTop:5,
        alignItems:"center",
        backgroundColor:'#FFDA44',
    },
    style_bottom:{
        width:'90%',
        flexDirection: 'row',
        justifyContent:'space-between',    
    },
    num:{width:70,textAlign:"center",},
    num1:{width:40,textAlign:"center",},
    style_0:{ alignItems:"center", justifyContent:"center", },
    style_1:{
        flexDirection: 'row',
        width:'100%',
        height:45,
        backgroundColor:'white',
        paddingLeft:20,
        alignItems:"center",
        marginTop:15
    },
    style_2:{
        flexDirection: 'row',
        width:'100%',
        height:45,
        backgroundColor:'white',
        paddingLeft:20,
        alignItems:"center",
    },
    style_3:{
        paddingLeft:10,
        width:'85%',
        height:45,
        lineHeight:45,
        justifyContent:'center',
    },
    style_4:{
        width:'50%',
        height:35,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'green'
    },

    style_IconM1:{ position:'relative', left:'505%', },
    style_IconM2:{ position:'relative', left:'450%', },
    style_IconM3:{ position:'relative', left:'420%', },
    style_IconM4:{ position:'relative', left:'310%', },
});

export default My