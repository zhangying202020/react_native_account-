import React from 'react';
import {View, Text,TextInput, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage';
class Expend extends React.Component{
    constructor() {
        super(...arguments);
        this.state = {
            name:'',
            expendArr:[]
        };
    }
    componentWillMount(){this.getexArr()}
    getexArr = async () => {
        try {
            const exarr =JSON.parse(await AsyncStorage.getItem('expendArr'))
            if(exarr !== null) {
                this.setState({expendArr: exarr});
            }
        } catch(e) {}
    }
    confirm=async()=>{
        let arr={'name':this.state.name}
        try {
            this.state.expendArr.push(arr)
            await AsyncStorage.setItem('expendArr', JSON.stringify(this.state.expendArr));
            this.props.navigation.navigate('Category');
            console.log('已保存')
        } catch (e) {
        }
    }
    render(h) {
        return(
            <View style={styles.style}>
                <View style={styles.style_top}>
                    <Icon name={'chevron-left'} size={14}  style={styles.style_icon}
                        onPress={()=>{this.props.navigation.navigate('Category')}} />
                    <Text style={{fontSize:20,marginBottom:20}}>添加支出类别</Text>
                </View>
                <View style={styles.style_content} >
                    <Icon name={'pencil'} size={20} style={{marginRight:10}}/>
                    <TextInput style={{width:'90%'}}
                    placeholder='类别' onChangeText={(text) => this.setState({name:text})}/>                        
                </View>
                <View style={styles.style_btm}>
                    <Text style={styles.style_text} onPress={this.confirm}>确定</Text>
                </View>
            </View>
        )
    }
};
const styles = StyleSheet.create({
    style:{ flex:1, },
    style_top:{
        height:'20%',
        alignItems:"center",
        backgroundColor:'#FFDA44',
        paddingTop:20
    },
    style_icon:{
        position:'relative',
        top:20,
        right:150
    },
    style_content:{
        width:'90%',
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#999',
        marginLeft:'5%',
        paddingLeft:10
    },
    style_btm:{
        marginTop:10,
        alignItems:'center',
    },
    style_text:{
        width:'80%',
        height:40,
        lineHeight:40,
        backgroundColor:'#FFDA44',
        textAlign:'center',    
        color:'white',   
        fontSize:18, 
    }
});
export default Expend;
