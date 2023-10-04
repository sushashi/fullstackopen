import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) || height === 0 || weight === 0) {
    res.send({  
      error: "malformatted parameters"
    });
  }
  const outBmi = calculateBmi(height, weight);

  res.send({
    weight: weight,
    height: height,
    bmi: outBmi
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!target || !daily_exercises){
    res.status(400).send(
      {'error': 'parameters missing'}
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const allNumber:boolean = daily_exercises.map((x: number) => isNaN(x)).filter((x: boolean)=>x).length === 0;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (isNaN(target) || !Array.isArray(daily_exercises) || !allNumber) {
    res.status(400).send(
      {'error': "malformatted parameters"}
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, target);
  res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});