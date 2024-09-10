import { GestureResponderEvent, KeyboardAvoidingView, Platform, Text, View } from "react-native"
import { formMatchStyles } from "./formMatchStyles"
import { SafeAreaView } from "react-native-safe-area-context"
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from "react";
import DefaultTextInput from "@/components/Input";
import { Formik } from 'formik';
import DefaultButton from "@/components/button";
import { MatchService } from '@/services/match'
import * as Yup from 'yup';

const FormMatch = () => {
  interface MyFormValues {
    name: string;
    max_points: string;
    players: string[];
  }

  const matchService = new MatchService()
  const initialValues: MyFormValues = { name: '', max_points: '', players: [] };

  const [value, setValue] = useState(2);
  const [openSelectBox, setOpenSelectBox] = useState(false);

  const listQtdPlayers = [
    { label: '2 Jogadores', value: 2 },
    { label: '3 Jogadores', value: 3 }
  ];

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('O nome da partida é obrigatório.'),
    max_points: Yup.string()
      .required('É necessário informar o limite de pontos.'),
    players: Yup.array()
      .of(
        Yup.string().required('O nome do jogador é obrigatório.')
      )
  });

  const handleClickCreateMatch = async (values: any) => {
    const match = await matchService.createMatch(values)
    match?.lastInsertRowId && console.log('Criada com sucesso, ir para pagina da partida')
  }

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
              onSubmit={values => handleClickCreateMatch(values)}
              validationSchema={validationSchema}
              enableReinitialize
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {

                return (

                  <View >
                    <DefaultTextInput
                      label="Nome da partida"
                      placeholder="Digite o nome da partida"
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      error={errors.name && touched.name}
                    />
                    {
                      errors.name && touched.name && (
                        <Text style={{ color: 'red' }}>{errors.name}</Text>
                      )
                    }
                    {
                      Array.from({ length: value }, (_, i) => {
                        return (
                          <View key={i}>
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
                          </View>
                        )
                      })
                    }
                    <DefaultTextInput
                      label="Limite de pontos"
                      placeholder="Digite aqui"
                      onChangeText={handleChange('max_points')}
                      onBlur={handleBlur('max_points')}
                      value={values.max_points}
                      error={errors.max_points && touched.max_points}
                      style={formMatchStyles.inputMaxPoints}
                      keyboardType="number-pad"
                    />
                    {
                      errors.max_points && touched.max_points && (
                        <Text style={{ color: 'red' }}>{errors.max_points}</Text>
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
