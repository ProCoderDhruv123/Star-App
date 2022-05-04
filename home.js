import React,{Component} from "react"
import {View,Text,FlatList,StyleSheet,SafeAreaView} from "react-native"
import {ListItem} from "react-native-elements"
import axios from "axios"

export default class HomeScreen extends Component {
    constructor (props){
        super(props)
        this.state = {
            List_data :[],
            url : "http://127.0.0.1:5000/",
        }

    }

    componentDidMount(){
        this.getstar()
    }

    getstar = () => {
        const {url} = this.state
        axios.get(url).then((response)=> {
            return(this.setState({
                List_data:response.data.data
            }))
        })
        .catch((error)=> {
            alert(error.message)
        })
    }

    keyExtractor = (item,index) => index.toString()
    renderItem = ({item,index}) => (
        <ListItem 
        key = {index}
        title = {`star: ${item.name}` }
        subtitle = {`distance from Milky: ${item.distance_from_milky}`}
        titleStyle = {styles.title}
        containerStyle = {styles.listContainer} 
        bottomDivider
        onPress = {()=>this.props.navigation.navigate("Details",{star_name:item.name})} 
        />
    )
    render(){
        const {List_data} =  this.state
        if (List_data.length === 0 ) {
            return(
                <View style = {styles.emptyContainer}>
                    <Text>LOADING</Text>
                </View>
            )
        }
        else {
            return(
                <View style = {styles.container}>
                    <SafeAreaView/>
                    <View style = {styles.upperContainer}>
                        <Text style = {styles.headerText}>star world</Text>
                    </View>
                    <View style = {styles.lowerContainer}>
                        <FlatList
                        keyExtractor={this.keyExtractor}
                        renderItem = {this.renderItem}
                        data = {this.state.List_data}
                        />
                    </View>
                </View>
            )
        }

    }


}

const styles = StyleSheet.create({ 
    container: { 
        flex: 1, backgroundColor: "#edc988" }, 
    upperContainer: { 
        flex: 0.1, justifyContent: "center", 
        alignItems: "center" 
    }, 
    headerText: { 
        fontSize: 30,
         fontWeight: "bold",
          color: "#132743" 
        }, 
    lowerContainer: { 
        flex: 0.9 
    }, 
    emptyContainer: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center" 
    }, 
    emptyContainerText: { 
        fontSize: 20 
    }, 
    title: { 
        fontSize: 18, 
        fontWeight: "bold", 
        color: "#d7385e" 
    }, 
    listContainer: { 
        backgroundColor: "#eeecda" 
    } });
