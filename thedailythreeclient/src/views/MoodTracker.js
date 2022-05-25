import React, { useEffect, useState } from "react";
import { getAllMoods, getAllUsersMoods } from "../data/moodData";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Legend, Tooltip, Title } from "chart.js";
import colors from "../helpers/colors";
import styled from "styled-components";

//TODO: after auth, take out hardcoded user

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ChartStyle = styled.div`
  width: 500px;
  height: 500px;
  margin-top: 20px;
  opacity: 0.90;
`;

Chart.register(ArcElement, Title, Legend, Tooltip);

export default function MoodTracker({ user }) {
  const [userMoods, setUserMoods] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartValues] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getAllUsersMoods(user.uid).then((moodArray) => {
      if (isMounted) setUserMoods(moodArray);
      const countMood1 = moodArray.filter((mood) => mood.id === 1).length;
      const countMood2 = moodArray.filter((mood) => mood.id === 2).length;
      const countMood3 = moodArray.filter((mood) => mood.id === 3).length;
      const countMood4 = moodArray.filter((mood) => mood.id === 4).length;
      const countMood5 = moodArray.filter((mood) => mood.id === 5).length;
      chartValues.push(countMood1);
      chartValues.push(countMood2);
      chartValues.push(countMood3);
      chartValues.push(countMood4);
      chartValues.push(countMood5);
    });
    getAllMoods().then((moodArray) => {
      const cLabels = moodArray.map((mood) => mood.name);
      setChartLabels(cLabels);
    });
  }, []);

  return (
    <Content>
      {userMoods ? (
        <>
        <h1 style={{ opacity: 0.5, marginTop: '30px' }}>{user.fullName}'s Moods</h1>
        <ChartStyle>
          <Doughnut
            data={{
              labels: chartLabels,
              datasets: [
                {
                  data: chartValues,
                  backgroundColor: colors,
                },
              ],
            }}
          />
        </ChartStyle>
        </>
      ) : (
        <>
          <h1 style={{ opacity: 0.7, marginTop: '60px' }}>
            Begin gratitude journaling to generate Mood Tracker :)
          </h1>
        </>
      )}
    </Content>
  );
}
