import {
  IonPage,
  IonContent,
  IonButton,
  IonButtons,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { Redirect } from "react-router-dom";

export default function Welcome() {
  const [isCreateModal, setIsCreateModal] = useState(false);

  const [isImportModal, setIsImportModal] = useState(false);

  const [phrase, setPhrase] = useState("");

  const [hasKey, setHasKey] = useState(false);

  const onCreate = useCallback(() => {
    const wallet = ethers.Wallet.createRandom();
    localStorage.setItem("privateKey", wallet.privateKey);
    setPhrase(wallet.mnemonic?.phrase || "");

    setIsCreateModal(true);
  }, []);

  const onImport = useCallback(() => {
    const wallet = ethers.Wallet.fromPhrase(phrase);
    localStorage.setItem("privateKey", wallet.privateKey);
    setIsImportModal(false);
    // TODO 優化
    setTimeout(() => {
      setHasKey(true);
    }, 200);
  }, [phrase]);

  useEffect(() => {
    if (localStorage.getItem("privateKey")) {
      setHasKey(true);
    }
  }, []);

  if (hasKey && !isCreateModal && !isImportModal) {
    return <Redirect to="/home" />;
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <h1>妥協錢包</h1>
        <p>歡迎你的到來</p>
        <IonButton onClick={onCreate}>創建新錢包</IonButton>
        <IonButton onClick={() => setIsImportModal(true)}>匯入錢包</IonButton>
        <IonModal isOpen={isCreateModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>助記詞</IonTitle>
              <IonButtons slot="end">
                <IonButton
                  onClick={() => {
                    setIsCreateModal(false);
                    // TODO 優化
                    phrase && setTimeout(() => setHasKey(true), 200);
                  }}
                >
                  關閉
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <h4>
              請務必將以下的助記詞用於安全方式紀錄與保存，如遺失不負保管責任
            </h4>
            <p>{phrase}</p>
          </IonContent>
        </IonModal>
        <IonModal isOpen={isImportModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>匯入助記詞</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsImportModal(false)}>
                  取消
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <h4>
              請務必將以下的助記詞用於安全方式紀錄與保存，如遺失不負保管責任
            </h4>
            <textarea
              placeholder="請輸入助記詞"
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
            />
            <IonButton onClick={() => phrase && onImport()}>匯入</IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}
