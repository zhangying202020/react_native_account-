import React from 'react';
import {StyleSheet,View,Text, FlatList,} from 'react-native'
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';
class Chart extends React.Component{
    constructor() {
        super(...arguments);
        this.state = {
            ListArr:[],
            income:'',
            expend:'',
            date:'',
        };    
    }
    getListArr= async () =>{
        try {
            const tallyArr =JSON.parse(await AsyncStorage.getItem('tallyArr'))
            if(tallyArr !== null) {
                this.setState({ListArr: tallyArr});
                let incomeSum=0
                let expendSum=0
                this.state.ListArr.forEach(item=>{
                    if(item.value=='收入'){
                        let incomeMoney=parseFloat(item.money)
                        incomeSum += incomeMoney
                        this.setState({income:incomeSum})
                    }else if(item.value=='支出'){
                        let expendMoney=parseFloat(item.money)
                        expendSum += expendMoney
                        this.setState({expend:expendSum})
                    }
                })
            }
        } catch(e) {}
    }
    deleteListArr = async(index)=>{
        const arr =JSON.parse(await AsyncStorage.getItem('tallyArr'))
        if(arr !== null) {
                try {
                    arr.splice(index,1);
                    this.setState({ListArr:arr})
                    await AsyncStorage.setItem('tallyArr', JSON.stringify(this.state.ListArr));
                } catch (e) {
            }
        }
    }
    searchData = async (date) =>{
        this.setState({date: date})
        const dateArr =JSON.parse(await AsyncStorage.getItem('tallyArr'))
        if(dateArr!=null){
            dateArr.forEach(item=>{
                if(item.date==date){
                    let arr=[]
                    arr.push(item)
                    this.setState({ListArr:arr})
                }
            })
        }
    }    
    componentWillMount(){this.getListArr()}
    showItem=(info)=>{
        return  <View  key={info.index}>
                    <View style={styles.style_money}>
                        <Text style={styles.style_money_1}>{info.item.date}</Text>
                        <View style={styles.style_money_2}>
                            <Text style={{width:"50%",color:'#888'}}>收入:{info.item.value=='收入'?parseFloat(info.item.money).toFixed(2):0.00}</Text>
                            <Text style={{width:"50%",color:'#888'}}>支出:{info.item.value=='支出'?parseFloat(info.item.money).toFixed(2):0.00}</Text>
                        </View>
                    </View>
                    <View style={styles.style_tabs}>
                        <View style={styles.style_tabs_1}>
                            <Text key={info.item.cate} style={{paddingRight:10}}>{info.item.cate}</Text>
                            <Text key={info.item.remark}>{info.item.remark}</Text>
                        </View>
                        <View style={styles.style_tabs_2}>
                            <Text key={info.item.money}>{info.item.value=='收入'?'+'+parseFloat(info.item.money).toFixed(2):'-'+parseFloat(info.item.money).toFixed(2)}</Text>
                            <Text style={{paddingRight:10,color:'red'}} 
                                onPress={this.deleteListArr.bind(this,info.index)}>删除</Text>
                        </View>
                    </View>
                </View>
    }
    loanMore=()=>{ }
    render(h) {
        return(
            <View style={styles.style}>
                <View style={styles.style_top}>
                    <Text style={{fontSize:20,marginBottom:20}}>个人记账</Text>
                    <View style={styles.style_bottom}>
                        <View>
                            <Text>日期</Text>
                            <DatePicker style={{width: 80}} date={this.state.date} mode="date"
                                placeholder="select date" format="YYYY-MM-DD"
                                minDate="2016-05-01" maxDate="2021-06-01"
                                confirmBtnText="Confirm" cancelBtnText="Cancel"
                                customStyles={{
                                dateIcon:{ position: 'absolute', left: 30, top: -20, }, 
                                dateInput:{
                                    borderWidth:0,
                                    borderWidth:1,
                                    borderColor:"#f2f2f2",
                                    borderRadius:20,height:20,
                                    backgroundColor:"#f2f2f2"
                                } }}
                                onDateChange={this.searchData}/> 
                        </View>
                        <View>
                            <Text>收入</Text>
                            <Text style={{textAlign:"center",}}>{this.state.income!=0?parseFloat(this.state.income).toFixed(2):'0.00'}</Text>
                        </View>
                        <View>
                            <Text>支出</Text>
                            <Text style={{textAlign:"center",}}>{this.state.expend!=0?parseFloat(this.state.expend).toFixed(2):'0.00'}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <FlatList  onEndReached={this.loanMore} renderItem={this.showItem}
                        data={this.state.ListArr}></FlatList>
                </View>
         </View>
        )
    }
};
const styles = StyleSheet.create({
    style:{ flex:1, },
    style_top:{
        height:'23%',
        alignItems:"center",
        backgroundColor:'#FFDA44',
        paddingTop:20
    },
    style_bottom:{
        width:'90%',
        flexDirection: 'row',
        justifyContent:'space-between',  
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
    style_tabs:{
        height:30,
        flexDirection: 'row',
        justifyContent:'space-between',  
        alignItems:'center',
        paddingLeft:10,
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'#ccc',
        // borderBottomColor:'#888'
    },
    style_tabs_1:{
        width:'60%',
        flexDirection: 'row',
    },
    style_tabs_2:{
        flexDirection: 'row',
    },
    style_money:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:30,
    },
    style_money_1:{
        width:'50%',
        flexDirection: 'row',
        color:'#888',
        paddingLeft:10
    },
    style_money_2:{
        width:'50%',
        flexDirection: 'row',
    },


});
export default Chart

                        {/* {
                        this.state.items.map(function (item,index) {
                            return (
                                    <View  key={index}>
                                        <View>
                                            <Text>收入</Text>
                                            <Text style={{textAlign:"center",}} key={item.cate}>{item.money}</Text>
                                        </View>
                                        <View>
                                            <Text>支出</Text>
                                            <Text style={{textAlign:"center",}} key={item.cate}>{item.money}</Text>
                                        </View>
                                    </View>
                                 )
                            })
                        } */}

                {/* {
                    this.state.arr.map(function (item,index) {
                        return (
                            <View  key={index}>
                                <View style={styles.style_money}>
                                    <Text style={styles.style_money_1}>{item.date}</Text>
                                    <View style={styles.style_money_2}>
                                        <Text style={{width:"50%",color:'#888'}}>收入:{item.value=='收入'?item.money:'0.00'}</Text>
                                        <Text style={{width:"50%",color:'#888'}}>支出:{item.value=='支出'?item.money:'0.00'}</Text>
                                    </View>
                                </View>
                                <View style={styles.style_tabs}>
                                    <View style={styles.style_tabs_1}>
                                        <Text key={item.cate} style={{paddingRight:10}}>{item.cate}</Text>
                                        <Text key={item.remark}>{item.remark}</Text>
                                    </View>
                                    <View style={styles.style_tabs_2}>
                                        <Text key={item.money}>{item.value=='收入'?'+'+item.money:'-'+item.money}</Text>
                                        <Text style={{paddingRight:10}} 
                                            onPress={() =>{this.deleteArr.bind(index)}}>删除</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                } */}


// </View>
// <Text style={styles.style_3}
// onPress= { this.getItems}>数据</Text> 

// <View >

// const seasons = [
//     [
//       { label: '2011年', value: '2011年', },
//       { label: '2012年', value: '2012年', },
//       { label: '2013年', value: '2013年', },
//       { label: '2014年', value: '2014年', },
//       { label: '2015年', value: '2015年', },
//       { label: '2016年', value: '2016年', },
//       { label: '2017年', value: '2017年', },
//       { label: '2018年', value: '2018年', },
//       { label: '2019年', value: '2019年', },
//       { label: '2020年', value: '2020年', },
//     ],
//     [
//       { label: '1月', value: '1月', },
//       { label: '2月', value: '2月', },
//       { label: '3月', value: '3月', },
//       { label: '4月', value: '4月', },
//       { label: '5月', value: '5月', },
//       { label: '6月', value: '6月', },
//       { label: '7月', value: '7月', },
//       { label: '8月', value: '8月', },
//       { label: '9月', value: '9月', },
//       { label: '10月', value: '10月', },
//       { label: '11月', value: '11月', },
//       { label: '12月', value: '12月', },
//     ],
//     [
//         { label: '1日', value: '1日', },
//         { label: '2日', value: '2日', },
//         { label: '3日', value: '3日', },
//         { label: '4日', value: '4日', },
//         { label: '5日', value: '5日', },
//         { label: '6日', value: '6日', },
//         { label: '7日', value: '7日', },
//         { label: '8日', value: '8日', },
//         { label: '9日', value: '9日', },
//         { label: '10日', value: '10日', },
//         { label: '11日', value: '11日', },
//         { label: '12日', value: '12日', },
//       ],
// ];

    // modalVisible: false,
    // onChange = value => {
        // console.log(value);
        // this.setState({date:this.setState({value})})
        // this.setState({date:value})
        // setTimeout(() => {
        // }, 5000);
    // };
    // setModalVisible(visible) { 
    //     this.setState({ modalVisible: visible });
    //     console.log(this.state.date);
    //     console.log('***');
    // }


// <Modal animationType='slide' transparent={false} visible={this.state.modalVisible}
// animationType="slide-up"
// onRequestClose={() => { alert('modal has been closed.'); }} >
// < View style = { styles.container }>
//     <View>
//         {/* <PickerView onChange={this.onChange} value={this.state.value}
//             data={seasons} cascade={false}/> 
//         {/* <TouchableHighlight activeOpacity={0.2} underlayColor='#FFDA44' 
//             onPress={() => { this.setModalVisible(true); }} > 
//         {/* </TouchableHighlight>         
//         <TouchableHighlight
//             onPress={() => { this.setModalVisible(!this.state.modalVisible);}}>
//             <Text>hide modal</Text>
//         </TouchableHighlight>
//     </View>
// </View>
// </Modal>
