import React from 'react';
import {StyleSheet,View,Text} from 'react-native'
import {SegmentedControl} from 'antd-mobile-rn'

class Detail extends React.Component{
    constructor() {
        super(...arguments);
        this.onChange = e => {
            console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`); };
            this.onValueChange = value => { console.log(value); };
    }
    render(h) {
        return(
            <View style={styles.style}>
                <View style={styles.style_top}>
                    <Text style={{fontSize:20,marginBottom:20}}>分析报告</Text>
                    <SegmentedControl
                        style={{width:'60%'}} values={['支出', '收入']}
                        onChange={this.onChange}
                        onValueChange={this.onValueChange} />
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
    style_bottom:{
        width:'90%',
        flexDirection: 'row',
        justifyContent:'space-between',  
    },


});
export default Detail
