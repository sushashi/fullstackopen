interface MultipleValues {
  cm: number;
  weight: number;
}

const parseArguments = (args: string[]): MultipleValues => {
  if(args.length < 4) throw new Error('Not enough arguments');
  if(args.length > 4) throw new Error('Too many arguments');

  if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      cm: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (cm: number, weight: number): string => {
  const bmi = weight / (cm/100) / (cm/100);
  let out = '';
  if (bmi < 18.5) {
    out = 'Underweight';
  } else if (bmi < 25) {
    out = 'Normal (healthy weight)';
  } else if (bmi < 30) {
    out = 'Overweight';
  } else {
    out = 'Obese';
  }
  return out;
};

try {
  const { cm, weight } = parseArguments(process.argv);
  const out = calculateBmi(cm,weight);
  console.log(out);
} catch (error: unknown) {
  let errorMessage = 'Something bad happend';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}