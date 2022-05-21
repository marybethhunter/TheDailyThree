import React, { useEffect, useState } from 'react';
import { getAllMoods, getAllUsersMoods } from '../data/moodData';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart, ArcElement, Legend, Tooltip, Title,
} from 'chart.js';
import colors from '../helpers/colors';
import styled from 'styled-components';

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
  margin-top: 80px;
`;

Chart.register(ArcElement, Title, Legend, Tooltip);

export default function MoodTracker() {
  const [userMoods, setUserMoods] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartValues] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getAllUsersMoods(1).then((moodArray) => {
      if (isMounted) setUserMoods(moodArray);
      console.log(userMoods);
      const countMood1 = moodArray.filter(mood => mood.id === 1).length;
      const countMood2 = moodArray.filter(mood => mood.id === 2).length;
      const countMood3 = moodArray.filter(mood => mood.id === 3).length;
      const countMood4 = moodArray.filter(mood => mood.id === 4).length;
      const countMood5 = moodArray.filter(mood => mood.id === 5).length;
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
    {/* <h2>MoodTracker</h2> */}
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
    </Content>
  )
};
