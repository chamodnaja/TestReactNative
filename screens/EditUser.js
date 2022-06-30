import React,{ useEffect ,useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { isPhone, isCitizenID } from 'Test1/functions/CustomMethod';

import { useSelector, useDispatch } from 'react-redux'
import { edit } from 'Test1/redux/features/users'

import { object, string, addMethod, mixed } from "yup";
addMethod(mixed, "isPhone", isPhone);
addMethod(mixed, "isCitizenID", isCitizenID);

const informationSchema = object().shape({
    firstName: string().required('กรุณากรอกชื่อ'),
    lastName: string().required('กรุณากรอกนามส่กุล'),
    id: string().isCitizenID().required(),
    phone: string().isPhone().required('กรุณากรอกโทรศัพท์ให้ถูกต้อง')
});
export default function AddUser({route, navigation}) {
    const { item } = route.params;
    const dispatch = useDispatch()
    const { reset, control, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(informationSchema)
      });
      useEffect(()=>{
          reset(item)
      },[item.uid])
      const onSubmit = data => {
        dispatch(edit({uid: item.uid, data: data}))
        navigation.push('Main')
      }
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <Text>ชื่อ: </Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                    )}
                    name="firstName"
                />
                {errors.firstName && <Text style={styles.textError}>{errors.firstName.message}</Text>}
            </View>
            <View style={styles.item}>
                <Text>นามสกุล</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                    )}
                    name="lastName"
                />
                {errors.lastName && <Text style={styles.textError}>{errors.lastName.message}</Text>}
            </View>
            <View style={styles.item}>
                <Text>เลขบัตรประชาชน</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value = '' } }) => {
                        let returnText = value;
                        let pattern=new String("_-____-_____-_-__");
                        let pattern_ex=new String("-");
                        let textCount=returnText.length; 
                        let objCountAdd1=textCount-1; 
                        for(i=0;i<pattern.length;i++){
                            if(objCountAdd1==i && pattern.charAt(i+1)==pattern_ex){
                                returnText = returnText + pattern_ex;
                            }
                        }
                        if(textCount>=pattern.length){
                            returnText = returnText.substr(0,pattern.length);           
                        }
                        return(
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={returnText}
                                keyboardType="number-pad"
                            />
                        )
                    }}
                    name="id"
                />
                {errors.id && <Text style={styles.textError}>{errors.id.message}</Text>}
            </View>
            <View style={styles.item}>
                <Text>เบอร์โทรศัพท์</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value='' } }) => {
                        let returnText = value;
                        let pattern=new String("___-_______");
                        let pattern_ex=new String("-");
                        let textCount=returnText.length; 
                        let objCountAdd1=textCount-1; 
                        for(i=0;i<pattern.length;i++){
                            if(objCountAdd1==i && pattern.charAt(i+1)==pattern_ex){
                                returnText = returnText + pattern_ex;
                            }
                        }
                        if(textCount>=pattern.length){
                            returnText = returnText.substr(0,pattern.length);           
                        }
                        return(
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={returnText}
                                keyboardType="number-pad"
                            />
                        )
                    }}
                    name="phone"
                />
                {errors.phone && <Text style={styles.textError}>{errors.phone.message}</Text>}
            </View>
            
            <View style={styles.actionBlock}>
                <TouchableOpacity 
                    onPress={handleSubmit(onSubmit)} 
                    style={styles.btn}>
                    <Text>ยืนยัน</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    textError:{
        color: 'red'
    },
    actionBlock:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20    
    },
    btn:{
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
    input:{
        height: 32,
        width: '100%',
        borderWidth: 1,
        padding: 4,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0
    },
    item:{
        marginTop: 20,   
        width: '100%'   
    },
    container:{
        flex: 1, 
        alignItems: 'flex-start', 
        justifyContent: 'flex-start',
        padding: 20
    }
});