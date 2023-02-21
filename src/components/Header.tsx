import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/react'
import React from 'react'

type Props = {
    title: string
}

export default function Header({title}: Props) {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}