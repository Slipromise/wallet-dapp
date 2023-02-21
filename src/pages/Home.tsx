import { IonPage, IonContent, IonButton, useIonRouter } from "@ionic/react";
import { ethers } from "ethers";
import React, { useEffect, useMemo, useState } from "react";
import { Redirect } from "react-router-dom";

// TODO: 優化
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545');

export default function Home() {
  const wallet = useMemo(() => {
    const privateKey = localStorage.getItem("privateKey");
      return privateKey ? new ethers.Wallet(privateKey,provider): undefined;
  }, []);

  const [balance, setBalance] = useState('');

  const router = useIonRouter();
  
  
  useEffect(()=>{
   wallet &&
     provider
       .getBalance(wallet?.address)
       .then((balance) => setBalance(ethers.formatEther(balance)));
  },[wallet])

  if (!wallet) {
    return <Redirect to="/" />;
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <p>{`錢包地址:\n${wallet.address}`}</p>
        <p>{`餘額:\n${balance}`}</p>
        <IonButton onClick={()=>router.push('/transfer')} >發送</IonButton>
      </IonContent>
    </IonPage>
  );
}
