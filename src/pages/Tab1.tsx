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
  IonAlert,
} from '@ionic/react';
import './Tab1.css';
import '@ionic/react/css/core.css';

import BmiControls from '../components/BmiControls';
import BmiResult from '../components/BmiResult';
import { setErrorHandler } from 'ionicons/dist/types/stencil-public-runtime';

const Tab1: React.FC = () => {
  const [calculatedBmi, setCalculatedBmi] = useState<number>();
  const [error, serError] = useState<string>();

  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;

    if (
      !enteredWeight ||
      !enteredHeight ||
      +enteredWeight <= 0 ||
      +enteredHeight <= 0
    ) {
      setError('Please enter a valid input number.');
      return;
    }
    const bmi = +enteredWeight / (+enteredHeight * +enteredHeight);
    setCalculatedBmi(bmi);
  };

  const resetInputs = () => {
    weightInputRef.current!.value = '';
    heightInputRef.current!.value = '';
  };

  const clearError = () => {
    setErrorHandler('');
  };

  return (
    <React.Fragment>
      {/* !! converts false and true value to a real true or false  */}
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ TEXT: 'Okay', handler: clearError }]}
      />
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Your Height</IonLabel>
                  <IonInput type="number" ref={heightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Your Weight</IonLabel>
                  <IonInput type="number" ref={weightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <BmiControls onCalculate={calculateBMI} onReset={resetInputs} />
            {calculatedBmi && <BmiResult result={calculatedBmi} />}
          </IonGrid>
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
};

export default Tab1;
