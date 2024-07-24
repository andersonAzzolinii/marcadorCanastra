import { GestureResponderEvent, KeyboardAvoidingView, Platform, Text, View } from "react-native"
import { formMatchStyles } from "./formMatchStyles"
import { SafeAreaView } from "react-native-safe-area-context"
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from "react";
import DefaultTextInput from "@/components/Input";
import { Formik } from 'formik';
import DefaultButton from "@/components/button";
import * as Yup from 'yup';

const FormMatch = () => {
  interface MyFormValues {
    matchName: string;
    maxPoints: string;
    players: string[];
  }

  const initialValues: MyFormValues = { matchName: '', maxPoints: '', players: [] };

  const [value, setValue] = useState(2);
  const [openSelectBox, setOpenSelectBox] = useState(false);

  const listQtdPlayers = [
    { label: '2 Jogadores', value: 2 },
    { label: '3 Jogadores', value: 3 }
  ];

  const validationSchema = Yup.object().shape({
    matchName: Yup.string()
      .required('O nome da partida é obrigatório.'),
    maxPoints: Yup.string()
      .required('É necessário informar o limite de pontos.'),
    players: Yup.array()
      .of(
        Yup.string().required('O nome do jogador é obrigatório.')
      )
  });

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0
        }
      >
        <View style={formMatchStyles.container}>
          <View style={formMatchStyles.header}>
            <Text style={formMatchStyles.textHeader}>Nova partida</Text>
          </View>
          <View style={formMatchStyles.content}>
            <Text style={formMatchStyles.dropDownLabel} >Selecione a quantidade de jogadores</Text >
            <DropDownPicker
              style={formMatchStyles.dropDown}
              textStyle={formMatchStyles.dropDownTextStyle}
              items={listQtdPlayers}
              setOpen={setOpenSelectBox}
              open={openSelectBox}
              setValue={setValue}
              value={value}
            />
            <Formik
              initialValues={{ ...initialValues, players: Array(value).fill('') }}
              onSubmit={values => console.log(values)}
              validationSchema={validationSchema}
              enableReinitialize
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {

                return (

                  <View>
                    <DefaultTextInput
                      label="Nome da partida"
                      placeholder="Digite o nome da partida"
                      onChangeText={handleChange('matchName')}
                      onBlur={handleBlur('matchName')}
                      value={values.matchName}
                      error={errors.matchName && touched.matchName}
                    />
                    {
                      errors.matchName && touched.matchName && (
                        <Text style={{ color: 'red' }}>{errors.matchName}</Text>
                      )
                    }
                    {
                      Array.from({ length: value }, (_, i) => {
                        return (
                          <>
                            <DefaultTextInput
                              key={i}
                              label={`Nome do jogador ${i + 1}`}
                              placeholder={`Digite o nome do jogador ${i + 1}`}
                              onChangeText={handleChange(`players[${i}]`)}
                              onBlur={handleBlur(`players[${i}]`)}
                              value={values.players[i]}
                              error={Array.isArray(touched.players) && touched.players[i] && errors.players && errors.players[i]}
                            />
                            {errors.players &&
                              errors.players[i] &&
                              Array.isArray(touched.players) &&
                              touched.players[i] &&
                              <Text style={{ color: 'red' }}>O nome do jogador {i + 1} é obrigatório.</Text>
                            }
                          </>
                        )
                      })
                    }
                    <DefaultTextInput
                      label="Limite de pontos"
                      placeholder="Digite aqui"
                      onChangeText={handleChange('maxPoints')}
                      onBlur={handleBlur('maxPoints')}
                      value={values.maxPoints}
                      error={errors.maxPoints && touched.maxPoints}
                      style={formMatchStyles.inputMaxPoints}
                      keyboardType="number-pad"
                    />
                    {
                      errors.maxPoints && touched.maxPoints && (
                        <Text style={{ color: 'red' }}>{errors.maxPoints}</Text>
                      )
                    }
                    <View style={formMatchStyles.footer} >
                      <DefaultButton
                        onPress={handleSubmit as (e?: GestureResponderEvent) => void}
                        text="Criar partida"
                      />
                    </View>
                  </View>
                )
              }}
            </Formik>
          </View>
        </View >
      </KeyboardAvoidingView >
    </SafeAreaView >
  );
};

export default FormMatch;
