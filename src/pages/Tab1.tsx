import React, { useRef, useState } from 'react';
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Tab1.css';
import '@ionic/react/css/core.css';

import BmiControls from '../components/BmiControls';
import BmiResult from '../components/BmiResult';

const Tab1: React.FC = () => {
  const [calculatedBmi, setCalculatedBmi] = useState<number>();

  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;

    if (!enteredWeight || !enteredHeight) {
      return;
    }
    const bmi = +enteredWeight / (+enteredHeight * +enteredHeight);
    setCalculatedBmi(bmi);
  };

  const resetInputs = () => {
    weightInputRef.current!.value = '';
    heightInputRef.current!.value = '';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BMI Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Your Height</IonLabel>
                <IonInput ref={heightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Your Weight</IonLabel>
                <IonInput ref={weightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <BmiControls onCalculate={calculateBMI} onReset={resetInputs} />
          {calculatedBmi && <BmiResult result={calculatedBmi} />}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
