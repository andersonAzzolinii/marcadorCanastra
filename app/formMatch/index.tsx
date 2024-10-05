import { GestureResponderEvent, KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { formMatchStyles } from "./formMatchStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from "react";
import DefaultTextInput from "@/components/Input";
import { Formik } from 'formik';
import DefaultButton from "@/components/button";
import { MatchService } from '@/services/match';
import * as Yup from 'yup';
import { useRouter, useLocalSearchParams, } from "expo-router";

const FormMatch = () => {
  interface MyFormValues {
    id?: number | null;
    name: string;
    max_points: string;
    players: { id?: number | null, name: string }[];
  }

  const matchService = new MatchService();
  const { matchData } = useLocalSearchParams<{ matchData: string }>();

  const objMatchData: MyFormValues = matchData
    ? JSON.parse(matchData)
    : { id: null, name: '', max_points: '', players: [] };

  const [value, setValue] = useState(objMatchData?.players.length || 2);
  const [openSelectBox, setOpenSelectBox] = useState(false);
  const router = useRouter()

  const initialValues: MyFormValues = {
    id: objMatchData.id ?? null,
    name: objMatchData.name ?? '',
    max_points: objMatchData.max_points ?? '',
    players: objMatchData.players.length > 0
      ? objMatchData.players
      : Array(value).fill({ id: null, name: '' })
  };

  const listQtdPlayers = [
    { label: '2 Jogadores', value: 2 },
    { label: '3 Jogadores', value: 3 }
  ];

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('O nome da partida é obrigatório.'),
    max_points: Yup.number()
      .typeError('O valor deve ser um número.')
      .integer('Apenas números inteiros são permitidos.')
      .required('É necessário informar o limite de pontos.'),
    players: Yup.array().of(Yup.object().shape({
      name: Yup.string().required('O nome do jogador é obrigatório.')
    }))
  });

  const handleClickCreateOrUpdateMatch = async (values: any) => {
    if (matchData) {
      const update = await matchService.update(values);
      update && router.replace(`/match/${objMatchData.id}`)
    } else {
      const idNewMatch = await matchService.createMatch(values);
      idNewMatch && idNewMatch > 0 && router.replace(`/match/${idNewMatch}`);
    }
  };

  return (

    <SafeAreaView>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View style={formMatchStyles.container}>
          <View style={formMatchStyles.header}>
            <Text style={formMatchStyles.textHeader}>
              {matchData ? 'Atualizar partida' : 'Nova partida'}
            </Text>
          </View>
          <View style={formMatchStyles.content}>
            <Text style={formMatchStyles.dropDownLabel}>
              Selecione a quantidade de jogadores
            </Text>
            <Formik
              initialValues={initialValues}
              onSubmit={values => handleClickCreateOrUpdateMatch(values)}
              validationSchema={validationSchema}
              enableReinitialize
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View>
                  {!objMatchData?.id &&
                    <DropDownPicker
                      style={formMatchStyles.dropDown}
                      textStyle={formMatchStyles.dropDownTextStyle}
                      items={listQtdPlayers}
                      setOpen={setOpenSelectBox}
                      open={openSelectBox}
                      setValue={setValue}
                      value={value}
                    />
                  }
                  <DefaultTextInput
                    label="Nome da partida"
                    placeholder="Digite o nome da partida"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    error={errors.name && touched.name}
                  />
                  {errors.name && touched.name && (<Text style={{ color: 'red' }}>{errors.name}</Text>)}
                  {values.players?.map((_, i) => {
                    return (
                      <View key={i}>
                        <DefaultTextInput
                          label={`Nome do jogador ${i + 1}`}
                          placeholder={`Digite o nome do jogador ${i + 1}`}
                          onChangeText={handleChange(`players[${i}].name`)}
                          onBlur={handleBlur(`players[${i}].name`)}
                          value={values.players[i]?.name}
                          error={Array.isArray(errors.players) &&
                            errors.players[i] &&
                            Array.isArray(touched.players)}
                        />
                        {Array.isArray(errors.players) &&
                          Array.isArray(touched.players) &&
                          errors.players[i] && (
                            <Text style={{ color: 'red' }}>
                              {`O nome do jogador ${i + 1} é obrigatório`}
                            </Text>
                          )}
                      </View>
                    )
                  })}

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
                  {errors.max_points && touched.max_points && (
                    <Text style={{ color: 'red' }}>{errors.max_points}</Text>
                  )}
                  <View style={formMatchStyles.footer}>
                    <DefaultButton
                      onPress={handleSubmit as (e?: GestureResponderEvent) => void}
                      text={matchData ? "Atualizar partida" : "Criar partida"}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FormMatch;
