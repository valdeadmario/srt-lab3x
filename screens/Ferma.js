import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from "react-native";

import { Card, Subheader } from "react-native-material-ui";
import { TextField } from "react-native-material-textfield";

import { TouchableOpacityComponent, Button } from "react-native";

const calcFactorization = (n) => {
  const s = Math.ceil(Math.sqrt(n));

  if (s * s == n) {
    return [s, s, 0, n];
  }
  let a, b;
  let x = s;
  let l = 0;
  let k = 0;
  let gotResult = false;

  while (!gotResult) {
    x += k;
    l = x * x - n;
    k++;
    if (x >= n) {
      return [n, 1, k, n];
    }
    if (Number.isInteger(Math.sqrt(l))) {
      let y = Math.sqrt(l);
      a = x + y;
      b = n / a;
      return [a, b, k, n];
    }
  }
};

export const Ferma = () => {
  const [n, setN] = useState(-1);
  const [infoMessage, setinfoMessage] = useState(
    "Input n and press 'Calculate'"
  );
  const [result, setResult] = useState({});

  const inputN = (n) => {
    if (!isNaN(+n)) {
      if (n > 1) {
        if (n % 2 == 1) {
          setN(+n);
          setinfoMessage("n is successfuly writen");
        } else {
          setinfoMessage("Enter an odd number");
        }
      } else {
        setinfoMessage("Enter n greater than 0");
        if (n == "") {
          setN(-1);
        }
      }
    } else {
      setinfoMessage("Enter a number");
    }
  };

  const fermaFactor = (n) => {
    const result = calcFactorization(n);
    setResult({
      a: result[0],
      b: result[1],
      steps: result[2],
      n: result[3],
    });
  };

  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.card}>
          <Subheader text="Ferma Factorization" />

          <TextField
            label="Input n"
            onChangeText={(text) => inputN(text)}
            keyboardType={"number-pad"}
          />

          <Button
            title="Calculate"
            onPress={() => fermaFactor(n)}
            disabled={n < 1 || isNaN(+n) || n % 2 == 0}
          />
        </View>
      </Card>
      <Card style={styles.card}>
        <View style={styles.card}>
          <Subheader text="Results" />

          <Text>{`n : ${n}`}</Text>
          <Text>{`A : ${result.a}; B : ${result.b}`}</Text>
          <Text>{`Amount of steps : ${result.steps}`}</Text>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#deeaff",
    justifyContent: "center",
  },
  textInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    fontSize: 18,
    width: 200,
    height: 50,
    borderColor: "black",
    borderWidth: 1,
  },
  output: {
    height: 80,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    // marginRight: 40,
    // marginLeft: 40,
    marginTop: 20,
    marginBottom: 20,
    // paddingTop: 20,
    // paddingBottom: 20,
    backgroundColor: "#68a0cf",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "black",
    // borderRadius: 20,
    // marginTop: 20,
    // margin: "20px 0",
  },
  card: {
    padding: 10,
  },
});
