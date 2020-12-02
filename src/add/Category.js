import React from 'react';
import {View, Text, StyleSheet,FlatList} from 'react-native'
import {SegmentedControl} from 'antd-mobile-rn'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'
class Category extends React.Component{
    constructor() {
        super(...arguments);
        this.state = {
            value:'',
            show: false,
            inArr:[],
            exArr:[],
        };
    }
    componentWillMount(){this.onValueChange()}
    // onChange = e => {console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);};
    addGate=()=>{if(this.state.value=='收入'){ this.props.navigation.navigate('Income')}else {this.props.navigation.navigate('Expend')}}
    onValueChange = async (value) => {
        this.setState({value:value})
        if(value=='收入'){
            this.setState({ count: this.state.show = true })
            try {
                const incARR =JSON.parse(await AsyncStorage.getItem('incomeArr'))
                if(incARR !== null) {
                    this.setState({inArr: incARR});
                }
            } catch(e) {}
        }else{
            this.setState({ count: this.state.show = false })
            try {
                const arr =JSON.parse(await AsyncStorage.getItem('expendArr'))
                if(arr !== null) {
                    this.setState({exArr: arr});
                }
            } catch(e) {}
        }        
    }
    //类别选择
    salary= item =>{
        // console.log(item.name);
        this.props.navigation.navigate('Tally',{cate:item.name});
    }
    delete=async(index)=>{ 
        if(this.state.value=="收入"){
            const delInArr =JSON.parse(await AsyncStorage.getItem('incomeArr'))
            if(delInArr !== null) {
                try {
                    delInArr.splice(index,1);
                    this.setState({inArr:delInArr})
                    await AsyncStorage.setItem('incomeArr', JSON.stringify(this.state.inArr));
                } catch (e) {
                }
            }
        }else{
            const delExpendArr =JSON.parse(await AsyncStorage.getItem('expendArr'))
            if(delExpendArr !== null) {
                try {
                    console.log(index);
                    delExpendArr.splice(index,1);
                    this.setState({exArr:delExpendArr})
                    await AsyncStorage.setItem('expendArr', JSON.stringify(this.state.exArr));
                } catch (e) {
                }
            }
        }
    };
    showItem=(info)=>{
        return  <View style={styles.style_1} key={info.index}>
                    <Icon name={'minus-circle'} size={20} color={'red'} 
                            onPress={this.delete.bind(this,info.index)}/>
                    <Text style={styles.style_2} onPress={this.salary.bind(this,info.item)}>{info.item.name}</Text>
                </View>
    }
    loanMore=()=>{ }
    render(h) {
        const showHide = this.state.show?
            <View style={styles.views}>
                <FlatList  onEndReached={this.loanMore} renderItem={this.showItem} data={this.state.inArr}></FlatList>
                </View>
            :<View style={styles.views}>
                <FlatList  onEndReached={this.loanMore} renderItem={this.showItem} data={this.state.exArr}></FlatList>
            </View>
        return(
            <View style={styles.style}>
                <View style={styles.style_top}>
                    <Icon name={'chevron-left'} size={14}  style={styles.style_icon1}
                        onPress={()=>{this.props.navigation.navigate('Main')}} />
                    <Text style={{fontSize:20,marginBottom:20}}>类别设置</Text>
                    <SegmentedControl style={{width:'60%'}} values={['支出', '收入']} 
                        onChange={this.onChange} onValueChange={this.onValueChange}  />
                </View>
                <View style={styles.tallyTopCon}>
                    <View>
                        {showHide}
                    </View>
                </View>
                <View style={styles.style_btm}>
                    <Icon name={'plus'} size={20} color={'blue'}/>
                    <Text style={{marginLeft:10}} onPress={this.addGate}>添加类别</Text>
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
    style_icon1:{
        position:'relative',
        top:20,
        right:150
    },
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
        marginLeft:10,
        width:'80%',
        height:35,
        lineHeight:35
    },
    style_con:{
        height:'75%'
    },
    style_btm:{
        flexDirection: 'row',
        alignItems:"center",
        justifyContent:'center',
    },
    tallyTopCon: {
        backgroundColor: '#F5F5F4',
    },
});
export default Category;
// const showHide = this.state.show? 
// <View style={styles.views}>
//     <View style={styles.style_1} >
//         <Icon name={'minus-circle'} size={20} color={'red'} 
//             onPress={this.delete.bind(this)} />
//         <Text style={styles.style_2}  onPress={this.salary.bind(this,'工资')}>工资</Text></View>
//     <View style={styles.style_1}>
//         <Icon name={'minus-circle'} size={20} color={'red'}
//          onPress={this.delete.bind(this)} />
//         <Text style={styles.style_2}  onPress={this.salary.bind(this,'兼职')}>兼职</Text></View>
//     <View style={styles.style_1}>
//         <Icon name={'minus-circle'} size={20} color={'red'}
//         onPress={this.delete.bind(this)} />
//         <Text style={styles.style_2} onPress={this.salary.bind(this,'理财')}>理财</Text></View>
//     <View style={styles.style_1}>
//         <Icon name={'minus-circle'} size={20} color={'red'}/>
//         <Text style={styles.style_2} onPress={this.salary.bind(this,'礼金')}>礼金</Text></View>
//     <View style={styles.style_1}>
//         <Icon name={'minus-circle'} size={20} color={'red'}/>
//         <Text style={styles.style_2} onPress={this.salary.bind(this,'其他')}>其他</Text></View>
//     <View style={styles.style_1}>
//         <Icon name={'minus-circle'} size={20} color={'red'}/>
//         <Text style={styles.style_2} onPress={this.salary.bind(this,'红包')}>红包</Text></View>
//     </View>
// : <View style={styles.views}>
//     <View style={styles.style_1} >
//         <Icon name={'minus-circle'} size={20} color={'red'}/>
//         <Text style={styles.style_2} onPress={this.salary.bind(this,'交通')}>交通</Text></View>
//     <View style={styles.style_1}>
//         <Icon name={'minus-circle'} size={20} color={'red'}/>
//         <Text style={styles.style_2} onPress={this.salary.bind(this,'服装')}>服装</Text></View>
//     <View style={styles.style_1}>
//         <Icon name={'minus-circle'} size={20} color={'red'}/>
//         <Text style={styles.style_2} onPress={this.salary.bind(this,'购物')}>购物</Text></View>
//     <View style={styles.style_1}>
//         <Icon name={'minus-circle'} size={20} color={'red'}/>
//         <Text style={styles.style_2} onPress={this.salary.bind(this,'餐饮')}>餐饮</Text></View>
//     <View style={styles.style_1}>
//         <Icon name={'minus-circle'} size={20} color={'red'}/>
//         <Text style={styles.style_2} onPress={this.salary.bind(this,'运动')}>运动</Text></View>
//     <View style={styles.style_1}>
//         <Icon name={'minus-circle'} size={20} color={'red'}/>
//         <Text style={styles.style_2} onPress={this.salary.bind(this,'孩子')}>孩子</Text></View>
//     <View style={styles.style_1}>
//         <Icon name={'minus-circle'} size={20} color={'red'}/>
//         <Text style={styles.style_2} onPress={this.salary.bind(this,'旅行')}>旅行</Text></View>
//     <View style={styles.style_1}>
//         <Icon name={'minus-circle'} size={20} color={'red'}/>
//         <Text style={styles.style_2} onPress={this.salary.bind(this,'办公')}>办公</Text></View>
//     <View style={styles.style_1}>
//         <Icon name={'minus-circle'} size={20} color={'red'}/>
//         <Text style={styles.style_2} onPress={this.salary.bind(this,'日常')}>日常</Text></View>
//     <View style={styles.style_1}>
//         <Icon name={'minus-circle'} size={20} color={'red'}/>
//         <Text style={styles.style_2} onPress={this.salary.bind(this,'数码')}>数码</Text></View>
// </View>
