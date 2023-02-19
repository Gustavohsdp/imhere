import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Participant } from "../../components/Participant";

import { styles } from "./styles";

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState("");
  const [buttonAddParticipantDisabled, setButtonAddParticipantDisabled] =
    useState(true);

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert(
        "Participante existe",
        "Já existe um participante na lista com este nome"
      );
    }

    setParticipants((preState) => [...preState, participantName]);
    setParticipantName("");
    setButtonAddParticipantDisabled(true);
  }

  function handleParticipantRemove(name: string) {
    Alert.alert(
      "Remover participante",
      `Deseja remover o participante ${name} da lista?`,
      [
        {
          text: "Sim",
          onPress: () =>
            setParticipants((preState) =>
              preState.filter((participant) => participant !== name)
            ),
        },
        {
          text: "Não",
          style: "cancel",
        },
      ]
    );
  }

  useEffect(() => {
    if (participantName !== "") {
      setButtonAddParticipantDisabled(false);
    } else {
      setButtonAddParticipantDisabled(true);
    }
  }, [participantName]);

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Sexta, 19 de fevereiro 2023</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity
          disabled={buttonAddParticipantDisabled}
          style={
            buttonAddParticipantDisabled
              ? styles.buttonDisabled
              : styles.buttonActive
          }
          onPress={() => participantName !== "" && handleParticipantAdd()}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ningúem chegou ao evento ainda? Adicione participante a sua lista de
            presença
          </Text>
        )}
      />

      {/* <ScrollView showsVerticalScrollIndicator={false}>
        {participants.map((participant) => (
          <Participant
            key={participant}
            name={participant}
            onRemove={handleParticipantRemove}
          />
        ))}
      </ScrollView> */}
    </View>
  );
}
