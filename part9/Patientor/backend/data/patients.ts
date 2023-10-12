const data = [
  {
      "id": "d2773336-f723-11e9-8f0b-362b9e155667",
      "name": "John McClane",
      "dateOfBirth": "1986-07-09",
      "ssn": "090786-122X",
      "gender": "male",
      "occupation": "New york city cop",
      "entries": [
        {
            "id": "absdcsdc",
            "date": "2015-01-02",
            "type": "Hospital",
            "specialist": "MD House",
            "diagnoseCodes": ["S62.5"],
            "description": "Healing time appr. 2 weeks. patient doesn't remember how he cog the injury.",
            "discharge": {
                "date": "2015-01-16",
                "criteria": "Thumb has healed",
            }
        }
      ]
  },
  {
      "id": "d2773598-f723-11e9-8f0b-362b9e155667",
      "name": "Martin Riggs",
      "dateOfBirth": "1979-01-30",
      "ssn": "300179-77A",
      "gender": "male",
      "occupation": "Cop",
      "entries": [
        {
            "id": "abcd01",
            "date": "2019-08-05",
            "type": "HealthCheck",
            "description": "Patient mistakenly found himself in a nuclear plant waste site without protective gear. Very minor radiation poisning",
            "specialist": "MD House",
            "diagnoseCodes": ["Z57.1", "Z74.3", "M51.2"],
            "healthCheckRating" : 1
        },
      ],
  },
  {
      "id": "d27736ec-f723-11e9-8f0b-362b9e155667",
      "name": "Hans Gruber",
      "dateOfBirth": "1970-04-25",
      "ssn": "250470-555L",
      "gender": "other",
      "occupation": "Technician",
      "entries": []
  },
  {
      "id": "d2773822-f723-11e9-8f0b-362b9e155667",
      "name": "Dana Scully",
      "dateOfBirth": "1974-01-05",
      "ssn": "050174-432N",
      "gender": "female",
      "occupation": "Forensic Pathologist",
      "entries": [
        {
            "id": "abcd02",
            "date": "2019-10-20",
            "type": "Hospital",
            "description": "Patient received an object in a forbidden area",
            "specialist": "Dr Rocco",
            "discharge": {
                "date": "2015-01-16",
                "criteria": "Black hole has healed",
            }
        },
        {
            "id": "asdsad",
            "date": "2020-10-10",
            "type": "OccupationalHealthcare",
            "description": 'Blablablbla',
            "specialist": "Dr House",
            "employerName": "Google",
            "sickLeave": {
                "startDate": "2020-10-10",
                "endDate": "2020-10-20"
            }
        }
      ]
  },
  {
      "id": "d2773c6e-f723-11e9-8f0b-362b9e155667",
      "name": "Matti Luukkainen",
      "dateOfBirth": "1971-04-09",
      "ssn": "090471-8890",
      "gender": "male",
      "occupation": "Digital evangelist",
      "entries": []
  }
];

export default data;