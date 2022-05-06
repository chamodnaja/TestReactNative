import React,{ useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


import { useSelector, useDispatch } from 'react-redux'
import { remove } from 'Test1/redux/features/users'

export default function MainScreen({navigation}) {
    const users = useSelector(state => state.users.users)
    const dispatch = useDispatch()
    
    const [modalVisible, setModalVisible] = useState(false);
    const [removeID, setRemoveID] = useState('');

    const handleModalOpen = (uid) =>{
        setRemoveID(uid)
        setModalVisible(true)
    }
    const handleRemove = () =>{
        console.log(removeID)
        dispatch(remove({uid: removeID}))
        setModalVisible(false)
    }
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>ลบสมาชิก</Text>
                            <Text style={styles.modalText}>ต้องการลบ</Text>
                            <Text style={styles.modalText}>สุขุมวิท อโศก</Text>
                        </View>
                        <View style={styles.modalActionSection}>
                            <TouchableOpacity onPress={()=>setModalVisible(false)} style={styles.modalActionBox}>
                                <Text style={styles.textStyle}>ไม่</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>handleRemove()} style={[styles.modalActionBox,{ borderLeftWidth: 1, borderLeftColor: '#444' }]}>
                                <Text style={styles.textStyle}>ใช่</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            { modalVisible && <View style={styles.backdrop}></View> }
            <View style={styles.container}>
                <View style={styles.usersItem}>
                    {
                        users.length > 0 &&
                        users.map((val,_)=>
                            <View key={_} style={styles.item}>
                                <Text>ชื่อ: {val.firstName} {val.lastName}</Text>
                                <Text>ID: {val.id}</Text>
                                <Text>Uid: {val.uid}</Text>
                                <Text>เบอร์โทร: {val.phone}</Text>
                                <TouchableOpacity 
                                    onPress={()=>navigation.navigate('EditUser',{item: val})}
                                    style={styles.btnEdit}>
                                        <MaterialIcons name="edit" size={24} color="#444" />
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={()=>handleModalOpen(val.uid)}
                                    style={styles.btnDelete}>
                                        <MaterialIcons name="close" size={28} color="red" />
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    
                </View>
                <View style={styles.noneUserDescSection}>
                    {
                        users.length === 0 && <Text>คุณยังไม่มีสมาชิก กรุณาเพิ่มสมาชิก</Text>
                    }
                    <TouchableOpacity 
                        onPress={()=>navigation.navigate('AddUser')}
                        style={styles.btnConfirm}>
                        <Text>เพิ่ม</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    modalActionBox:{
        width: '48%',
        height: '100%',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
    },
    modalActionSection:{
        marginTop: 8,
        height: 42,
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: '#444',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row'
    },
    backdrop:{
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10
    },
    modalContent: {
        padding: 10,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: 200,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#444',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5

    },
    btnDelete:{
        position: 'absolute',
        bottom: 10,
        right: 10   
    },
    btnEdit:{
        position: 'absolute',
        top: 10,
        right: 10   
    },
    btnConfirm:{
        marginTop: 16,
        width: 120,
        height: 40,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'        
    },
    item:{
        borderWidth: 1,
        borderColor: '#444',
        width: '100%',
        padding: 16,
        position: 'relative',
        marginBottom: 16
    },
    noneUserDescSection:{
        marginTop: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'  
    },
    usersItem:{
        marginTop: 12,
        width: '100%'
    },
    container:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'flex-start',
        padding: 20
    }
});
  