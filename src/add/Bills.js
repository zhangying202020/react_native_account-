import React from 'react';
import {StyleSheet,View,Text, FlatList, LogBox,} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import DropdownMenu from 'react-native-dropdown-menu';
import AsyncStorage from '@react-native-community/async-storage';

class Bills extends React.Component{
    constructor() {
        super(...arguments);
        this.state = {
            text: '',
            ListArr:[],
            income:'',
            expend:'',
            month:'',
            data:[[2020, 2019, 2018, 2017]]
        };
    }

    getYearChange = async (selection,row) =>{
        this.setState({text: this.state.data[selection][row]})
        try {
            const tallyArr =JSON.parse(await AsyncStorage.getItem('tallyArr'))
            this.setState({ListArr:[]})
            let yearArr=[]
            let arr=[]
            if(tallyArr !== null) {
                tallyArr.forEach(item => {
                    if(item.year==this.state.text){
                        yearArr.push(item)
                    }
                });
            }
            for(let i=0;i<12;i++){
                let  y= yearArr.filter(function(item){
                    return item.month==i
                })
                if(y.length!=0){
                    let income=y.filter(function(temp){return temp['money']!=undefined && temp['value']=='收入'} )
                    let expend=y.filter(function(temp){return temp['money']!=undefined && temp['value']=='支出'})
                    let incomeSum=income.reduce((total,item)=>{return total+parseFloat(item.money)},0)
                    let expendSum=expend.reduce((total,item)=>{return total+parseFloat(item.money)},0)
                    let surplusSum=parseFloat(incomeSum)-parseFloat(expendSum)
                    var obj={month:y[0].month,income:incomeSum,expend:expendSum,surplus:surplusSum}
                    arr.push(obj)
                } 
            }
            this.setState({ListArr:arr})
            // console.log(this.state.ListArr);

            let incomeSum=0
            let expendSum=0
            this.state.ListArr.forEach(item=>{
                if(item.income!=0){
                    incomeSum += item.income
                    this.setState({income:incomeSum})
                }else if(item.expend!=0){
                    expendSum += item.expend
                    this.setState({expend:expendSum})
                }
            })
        } catch(e) {}
    }
    showItem=(info)=>{
        return  <View  key={info.index}>
                    <View style={styles.style_List_2}>
                        <Text key={info.item.month} style={styles.style_List_3}>{info.item.month}月</Text>
                        <Text key={info.item.expend} style={styles.style_List_3}>{info.item.expend}</Text>
                        <Text key={info.item.income} style={styles.style_List_3}>{info.item.income}</Text>
                        <Text key={info.item.surplus} style={styles.style_List_3}>{info.item.surplus}</Text>
                    </View>
                </View>
    }
    loanMore=()=>{ }
    // componentWillMount()

    render(h) {
        return(
            <View style={styles.style}>
                <View style={styles.style_top}>
                    <View style={styles.style_1}>                
                        <Icon name={'chevron-left'} size={14}  style={styles.style_icon1}
                                onPress={()=>{this.props.navigation.navigate('Main')}}/>
                        <Text style={{position:'relative',top:-4,paddingLeft:5}} onPress={()=>{this.props.navigation.navigate('Main')}}>返回</Text>
                    </View>
                    <Text style={{fontSize:18,marginBottom:20}}>账单</Text>
                    <Text style={{position:'relative',top:-10,color:'#999'}}>结余</Text>
                        <Text style={{fontSize:20,position:'relative',top:-10,}}>
                            {(this.state.income-this.state.expend).toFixed(2)!=0?(this.state.income-this.state.expend).toFixed(2):'0.00'}
                        </Text>
                    <View style={styles.style_3}>
                        <View style={styles.style_4}>
                            <Text style={{color:'#999',marginRight:5}}>收入</Text>
                            <Text style={{fontSize:20}}>{this.state.income!=0?parseFloat(this.state.income).toFixed(2):'0.00'}</Text>
                        </View>
                        <View style={styles.style_5}>
                            <Text style={{color:'#999',marginRight:5}}>支出</Text>
                            <Text style={{fontSize:20}}>{this.state.expend!=0?parseFloat(this.state.expend).toFixed(2):'0.00'}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.style_DropdownMenu}>
                    <View style={{height: 30}} />
                    <DropdownMenu style={{flex: 1}} tintColor={'#666666'} bgColor={'#FFDA44'}  activityTintColor={'green'}
                        data={this.state.data} handler={(selection, row) =>this.getYearChange(selection, row)}>
                    </DropdownMenu>
                </View>
                <View style={styles.style_List_1}>
                        <Text>月份</Text><Text>支出</Text><Text>收入</Text><Text>结余</Text>
                </View>
                <View>
                    <FlatList onEndReached={this.loanMore} renderItem={this.showItem} data={this.state.ListArr}></FlatList>
                </View>
            </View>
        )
    }
};
const styles = StyleSheet.create({
    style:{ flex:1, },
    style_top:{
        height:'27%',
        alignItems:"center",
        backgroundColor:'#FFDA44',
    },
    style_1:{
        flexDirection: 'row',
        position:'relative',
        top:22,
        left:'-80%'
    },
    style_2:{
        right:'-80%',
        flexDirection: 'row',
        position:'relative',
        top:-42,
    },
    style_3:{
        width:'90%',
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    style_4:{
        flexDirection: 'row',
        alignItems:'center',
        width:"45%",
        borderRightWidth:1
    },
    style_5:{
        flexDirection: 'row',
        alignItems:'center',
        width:"45%",
    },
    style_DropdownMenu:{
        flex:1, 
        width:80,
        position:'absolute',
        top:-20,
        left:'75%'
    },
    style_List_1:{
        height:30,
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    style_List_2:{
        height:30,
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems:'center',
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'#999'
    },
    style_List_3:{ width:'25%', textAlign:'center' }

});
export default Bills
                        