import React from "react";

import { Text, View } from "react-native";

const calculate = (points, speed, timeDeadline, iterationDeadLine, P) => {
  let status = false;
  let iterations = 0;
  let startTime = Date.now();
  let y = 0;
  let delta = 0;
  let w1 = 0;
  let w2 = 0;

  let dotIndex = -1;

  while (
    iterations++ < iterationDeadLine &&
    Date.now() - startTime < timeDeadline * 1000
  ) {
    dotIndex = dotIndex == 3 ? -1 : dotIndex;
    dotIndex++;

    y = points[dotIndex][0] * w1 + points[dotIndex][1] * w2;

    if (checkWeights(P, points, w1, w2)) {
      status = true;
      break;
    }

    delta = P - y;
    w1 += delta * points[dotIndex][0] * speed;
    w2 += delta * points[dotIndex][1] * speed;
  }
  const time = Date.now() - startTime;
  if (status) {
    return ["Success", iterations, time, w1, w2];
  }

  return [
    iterations >= iterationDeadLine
      ? "Out of iteration boundaries"
      : "Teaching time has expired",
    iterations,
    time,
  ];
};

const checkWeights = (P, points, w1, w2) => {
  return (
    P < points[0][0] * w1 + points[0][1] * w2 &&
    P < points[1][0] * w1 + points[1][1] * w2 &&
    P > points[2][0] * w1 + points[2][1] * w2 &&
    P > points[3][0] * w1 + points[3][1] * w2
  );
};

const parseResult = (result) => {
  if (result.length == 0) {
    return null;
  }
  if (result[0] != "Success") {
  }
  return (
    <View>
      <Text>{`Last results:`}</Text>
      <Text>{result[0]}</Text>
      <Text>{`Amount of iterations : ${result[1]}`}</Text>
      <Text>{`Time spent : ${result[2]}`}</Text>
      {result[0] == "Success" ? (
        <Text>{`W1 - ${result[3].toFixed(4)}; W2 - ${result[4].toFixed(
          4
        )}`}</Text>
      ) : null}
    </View>
  );
};

export { calculate, parseResult };
