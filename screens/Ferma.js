import React, { useState } from "react";

import { View, Text, Button } from "react-native";

import { Card, Subheader } from "react-native-material-ui";
import { TextField } from "react-native-material-textfield";

import { styles } from "../styles";

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
  const [err, setErr] = useState("");
  const [result, setResult] = useState({});

  const inputN = (n) => {
    if (n === "") {
      setErr("");
      setN(-1);
      return;
    }
    if (!isNaN(+n)) {
      if (n > 1) {
        if (n % 2 == 1) {
          setErr("");
          setN(+n);
        } else {
          setErr("Enter an odd number");
          setN(-1);
        }
      } else {
        setErr("Enter n greater than 0");
        if (n == "") {
          setN(-1);
        }
      }
    } else {
      setErr("Enter a number");
      setN(-1);
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
            error={err}
            onChangeText={(text) => inputN(text)}
            keyboardType={"number-pad"}
          />
          {console.log(n < 1 || isNaN(+n) || n % 2 == 0)}
          <Button
            title="Calculate"
            onPress={() => fermaFactor(n)}
            disabled={n < 1 || isNaN(+n) || n % 2 == 0}
          />
        </View>
      </Card>
      <Card style={styles.card}>
        <View style={styles.card}>
          <Subheader text="Results:" />
          <View style={styles.output}>
            <Text>{`n : ${n === -1 ? "-" : n}`}</Text>
            <Text>{`A : ${result.a || "-"}`}</Text>
            <Text>{`B : ${result.b || "-"}`}</Text>
            <Text>{`Amount of steps : ${result.steps || "-"}`}</Text>
          </View>
        </View>
      </Card>
    </View>
  );
};
