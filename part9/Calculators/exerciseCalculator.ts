interface InputValues {
  hoursWeek: number[],
  target: number
}

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const parseArguments = (args: string[]): InputValues => {
  if(args.length < 4) throw new Error('Not enough arguments');
  console.log(args.length);
  const usable = args.slice(2);
  const areNumbers = usable.map(x => !isNaN(Number(x))).filter(x=>x).length === usable.length;
  if (areNumbers) {
    const converted = usable.map(x => Number(x));
    return {
      hoursWeek: converted.slice(1),
      target: converted[0],
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateExercises = (x: number[], target: number): Result => {

  const trainingDays = x.map(x => x !== 0).filter(x=>x).length;
  const success = x.map(x => x === 0 || x < target ).filter(x=>x).length === 0;
  const average = x.reduce( (x,y) => x + y, 0) / x.length;

  let rating: number = 0;
  let description: string = '';
  if (average < 0.5 * target) {
    rating = 1;
    description = "don't give up";
  } else if (average < 1 * target) {
    rating = 2;
    description = 'not too bad but could be better';
  } else {
    rating = 3;
    description = 'you are the best';
  }

  return {
  periodLength: x.length,
  trainingDays: trainingDays,
  success: success ,
  rating: rating,
  ratingDescription: description,
  target: target,
  average: average
  };
};

try {
  const { hoursWeek, target } = parseArguments(process.argv);
  const out = calculateExercises(hoursWeek, target);
  console.log(out);
} catch (error: unknown) {
  let errorMessage = 'Something bad happend';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
