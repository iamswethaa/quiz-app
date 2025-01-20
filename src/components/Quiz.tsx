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
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1));

  const handleAnswerClick = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);

    if (questions[currentQuestion].options[answerIndex] === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswers(Array(questions.length).fill(-1));
  };

  const handleSubmitQuiz = () => {
    setShowScore(true);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {showScore ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-xl">
            You scored {score} out of {questions.length}!
          </p>
          <button
            onClick={handleRestartQuiz}
            className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>

          <div className="text-xl font-bold mb-4">
            {questions[currentQuestion].question}
          </div>

          <div className="space-y-4 mb-6">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                className={`w-full text-left py-2 px-4 rounded ${
                  selectedAnswers[currentQuestion] === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;