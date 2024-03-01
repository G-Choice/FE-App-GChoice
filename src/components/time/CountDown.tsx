import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from "../../assets/colors";

interface InitialCountDownTime {
  hours: number,
  minutes: number,
  seconds: number
}

const CountDown = (props: InitialCountDownTime) => {
  const [hours, setHours] = useState(props.hours);
  const [minutes, setMinutes] = useState(props.minutes);
  const [seconds, setSeconds] = useState(props.seconds);
  const [timerActive, setTimerActive] = useState<boolean>(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (hours === 0) {
              clearInterval(interval);
              setTimerActive(false);
            } else {
              setHours(prevHours => prevHours - 1);
              setMinutes(59);
              setSeconds(59);
            }
          } else {
            setMinutes(prevMinutes => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(prevSeconds => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerActive, hours, minutes, seconds]);

  return (
    <View style={{ flexDirection: "row", gap: 3, height: 20, marginTop: 15 }}>
      <Text style={styles.timeStyle}>{hours.toString().padStart(2, '0')}</Text>
      <Text>:</Text>
      <Text style={styles.timeStyle}>{minutes.toString().padStart(2, '0')}</Text>
      <Text>:</Text>
      <Text style={styles.timeStyle}>{seconds.toString().padStart(2, '0')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timeStyle: {
    backgroundColor: Colors.darkBlack,
    color: Colors.secondaryColor,
    fontWeight: "500",
    borderRadius: 2,
    paddingHorizontal: 2
  },
})
export {CountDown};