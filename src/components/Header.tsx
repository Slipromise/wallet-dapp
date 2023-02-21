import { IonHeader, IonToolbar, IonButtons, IonTitle, IonBackButton } from '@ionic/react'
import React from 'react'

type Props = {
    title: string
}

export default function Header({title}: Props) {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}