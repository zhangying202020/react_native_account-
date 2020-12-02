import React from 'react';
import {StyleSheet,View,Text} from 'react-native'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons'
class Find extends React.Component{
    render(h) {
        return(
            <View style={styles.style}>
                <View style={styles.style_top}>
                    <Text style={{fontSize:20}}>发现</Text>
                </View>
                <View style={styles.style_0}>
                    <View style={styles.style_1} >
                        <Text style={{paddingLeft:10,width:'80%'}}  
                            onPress={()=>{this.props.navigation.navigate('Bills')}} >账单</Text>
                        <IconM name={'chevron-right'} size={20} style={{position:'relative', }} 
                            onPress={()=>{this.props.navigation.navigate('Bills')}} />
                    </View>
                    <View style={styles.style_2}>
                        <Text style={{paddingLeft:10}}>常用功能</Text>
                    </View>
                    <View style={styles.style_3}>
                        <View>
                            <IconM name={'cash-usd-outline'} size={30} color={'#FFDA44'} style={{paddingLeft:15}} />
                            <Text style={{paddingTop:10}}>二手交易</Text></View>
                        <View>
                            <IconM name={'car'} size={30} color={'#FFDA44'} style={{paddingLeft:5}} />
                            <Text style={{paddingTop:10}}>二手车</Text></View>
                        <View>
                            <IconM name={'paw'} size={30} color={'#FFDA44'}/>
                            <Text style={{paddingTop:10}}>宠物</Text></View>
                        <View>
                            <IconM name={'home-analytics'} size={30} color={'#FFDA44'} />
                            <Text style={{paddingTop:10}}>家政</Text></View>

                    </View>
                </View> 
            </View>
    )
    }
}
const styles = StyleSheet.create({
    style:{ flex:1, },
    style_top:{
        height:'10%',
        alignItems:"center",
        justifyContent:'center',        
        backgroundColor:'#FFDA44',
    },
    style_0:{ alignItems:"center", justifyContent:"center", },
    style_1:{
        flexDirection: 'row',
        width:'100%',
        height:50,
        backgroundColor:'white',
        paddingLeft:20,
        alignItems:"center",
        marginBottom:15,
    },
    style_2:{
        flexDirection: 'row',
        width:'100%',
        height:50,
        backgroundColor:'white',
        paddingLeft:20,
        alignItems:"center",
    },
    style_3:{
        width:'100%',
        flexDirection: 'row',
        justifyContent:'space-around', 
        backgroundColor:'white',
        paddingBottom:10       
    },

});
export default Find