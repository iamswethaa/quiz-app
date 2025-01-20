import { useState } from 'react';

const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    correctAnswer: 'Paris',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars',
  },
  {
    question: 'Who wrote "To Kill a Mockingbird"?',
    options: ['Harper Lee', 'Mark Twain', 'J.K. Rowling', 'Ernest Hemingway'],
    correctAnswer: 'Harper Lee',
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (answer: string) => {
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {showScore ? (
        <div className="text-2xl font-bold">
          You scored {score} out of {questions.length}!
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <div className="text-xl font-bold mb-4">
            Question {currentQuestion + 1}/{questions.length}
          </div>
          <div className="mb-6">{questions[currentQuestion].question}</div>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;