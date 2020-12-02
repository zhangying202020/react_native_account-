import React from 'react'
import 'react-native-gesture-handler';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Detail from './Detail'
import Chart from './Chart'
import Tally from './Tally'
import Find from './Find'
import My from './My'
import Icon from 'react-native-vector-icons/FontAwesome'

const Tab = createBottomTabNavigator();
class Main extends React.Component{
    render(h) {
        return(
            <Tab.Navigator>
                <Tab.Screen name="明细" component={Chart} 
                    options={{tabBarLabel:'明细',tabBarIcon:({color,size})=>
                    (<Icon name={'rmb'} size={size} color={color}/>)}}
                />
                <Tab.Screen name="图表" component={Detail} 
                    options={{tabBarLabel:'图表',tabBarIcon:({color,size})=>
                    (<Icon name={'bar-chart-o'} size={size} color={color}/>)}}
                />
                <Tab.Screen name="记账" component={Tally} 
                    options={{tabBarLabel:'记账',tabBarIcon:({color,size})=>
                    (<Icon name={'plus-circle'} size={size} color={color}/>)}}
                />
                <Tab.Screen name="发现" component={Find} 
                    options={{tabBarLabel:'发现',tabBarIcon:({color,size})=>
                    (<Icon name={'compass'} size={size} color={color}/>)}}
                />
                <Tab.Screen name="我的" component={My}  
                    options={{tabBarLabel:'我的',tabBarIcon:({color,size})=>
                    (<Icon name={'user-circle-o'} size={size} color={color}/>)}}
                />
          </Tab.Navigator>
        )   
    }
}
export default Main