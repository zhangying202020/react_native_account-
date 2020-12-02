import React from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity} from 'react-native'
import {SegmentedControl} from 'antd-mobile-rn'
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome'
class Tally extends React.Component{
    constructor() {
        super(...arguments);
        this.state = {
            value: '',
            money: '',
            date:"",
            cate:'',
            remark:'',
            tallyArr:[]
        };
    }
    componentWillMount(){
        this.getArr()
        this.getRoute()
        this.onValueChange()
    }
    onValueChange = value => {
        console.log(value);
        this.setState({value:value})};
    // onChange = e => {console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`); };
    
    getArr = async () => {
        try {
            const arr =JSON.parse(await AsyncStorage.getItem('tallyArr'))
            if(arr !== null) {
                this.setState({tallyArr: arr});
            }
        } catch(e) {}
    }
    getRoute=()=>{
        let cates=this.props.route.params 
        if(cates){this.setState({cate: cates.cate});}
    }
    confirm= async () =>{
        let year=this.state.date.split('-')[0]
        let month=this.state.date.split('-')[1]
        let chargeArr={'money':this.state.money,'year':year,'month':month,'value':this.state.value,'cate':this.state.cate,'date':this.state.date,'remark':this.state.remark}
        try {
            if(chargeArr.value==''){
                chargeArr.value='支出'
                this.state.tallyArr.push(chargeArr)
                await AsyncStorage.setItem('tallyArr', JSON.stringify(this.state.tallyArr));
                this.props.navigation.navigate('Main');
                console.log('已保存')
            }else{
                this.state.tallyArr.push(chargeArr)
                await AsyncStorage.setItem('tallyArr', JSON.stringify(this.state.tallyArr));
                this.props.navigation.navigate('Main');
                console.log('已保存')
            }
          } catch (e) {
        }
    }
    cancel=()=>{ this.props.navigation.navigate('Main')}
    render(h) {
        return(
            <View style={styles.style}>
                <View style={styles.style_top}>
                    <Text style={{fontSize:20,marginBottom:20}}>记账</Text>
                    <SegmentedControl style={{width:'60%'}} values={['支出', '收入']} onChange={this.onChange} onValueChange={this.onValueChange} />
                </View>
                <View style={styles.style_1}>
                    <Icon name={'rmb'} size={20}/><Text style={{marginLeft:18,marginRight:15}}>金额</Text>
                    <TextInput placeholder='请输入金额' onChangeText={(money) => this.setState({money:money})} />                        
                </View>
                <View style={styles.style_1}>
                    <Icon name={'th-large'} size={20}/>
                    <Text style={{paddingLeft:10}}>类别</Text>
                    <Text style={{width:'75%',marginLeft:20}} onPress={()=>{this.props.navigation.navigate('Category')}}>
                        {this.state.cate} </Text>
                </View>
                <View style={styles.style_1}>
                    <Icon name={'calendar'} size={20}/><Text style={{paddingLeft:10}}>日期</Text>
                    <View style={styles.container}> 
                        <DatePicker style={{width: 200}} date={this.state.date} mode="date"
                            placeholder="select date" format="YYYY-MM-DD" minDate="2016-05-01" maxDate="2021-06-01"
                            confirmBtnText="Confirm" cancelBtnText="Cancel"
                            customStyles={{ dateInput:{ borderWidth:0, borderWidth:1,
                                borderColor:"#f2f2f2", borderRadius:20,height:20, backgroundColor:"#f2f2f2"
                            }}} onDateChange={(date) => {this.setState({date: date})}} /> 
                    </View>
                </View>
                <View style={styles.style_1}>
                    <Icon name={'edit'} size={20}/> 
                    <Text style={{paddingLeft:10}}>说明</Text>
                    <TextInput placeholder='备注' onChangeText={(remark) => this.setState({remark:remark})} style={{paddingLeft:15}}/>                        
                </View>
                <TouchableOpacity style={styles.style_2}>
                    <Text style={styles.style_3} onPress= { this.confirm }>确定</Text>
                    <Text style={styles.style_4} onPress={this.cancel}>取消</Text>
                </TouchableOpacity>
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
    style_0:{ alignItems:"center", justifyContent:"center", },
    style_1:{
        flexDirection: 'row',
        alignItems:"center",
        width:'90%',
        height:40,
        marginLeft:'5%',
        paddingLeft:10,
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
    },
    style_2:{
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    style_3:{
        textAlign:'center',
        color:'white',
        width:"40%",
        backgroundColor:'red',
        borderRadius:25,
        height:30,
        lineHeight:30
    },
    style_4:{
        textAlign:'center',
        color:'white',
        width:"40%",
        backgroundColor:'blue',
        borderRadius:25,
        height:30,
        lineHeight:30
    },

});
export default Tally
