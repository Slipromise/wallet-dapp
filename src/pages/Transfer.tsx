import { IonPage, IonContent } from '@ionic/react'
import { ethers } from 'ethers';
import React, { useCallback, useMemo, useState } from 'react'
import Header from '../components/Header'


// TODO: 優化
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545');



export default function Transfer() {

    const [toAddress, setToAddress] = useState('');

    const [value, setValue] = useState('0')

    const wallet = useMemo(() => {
    const privateKey = localStorage.getItem("privateKey");
      return privateKey ? new ethers.Wallet(privateKey,provider): undefined;
  }, []);

    const onSend = useCallback(()=>{
        wallet
          ?.sendTransaction({ to: toAddress, value: ethers.parseEther(value) })
          .then(console.log);
    },[wallet,value,toAddress])
  return (
    <IonPage>
      <Header title='交易' />
      <IonContent fullscreen>
        <label >從</label>
        <input value={wallet?.address} readOnly style={{width: '100%'}}></input>
        <label>到</label>
        <input value={toAddress} onChange={(e)=>setToAddress(e.target.value)} style={{width: '100%'}} ></input>
         <label>金額</label>
         <input value={value} onChange={(e)=>setValue(e.target.value)} ></input>
        <button onClick={onSend} >傳送</button>
      </IonContent>
    </IonPage>
  )
}