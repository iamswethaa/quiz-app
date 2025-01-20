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
  {
    question: 'What is the capital of India?',
    options: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'],
    correctAnswer: 'New Delhi',
  },
  {
    question: 'How many days are there in a week?',
    options: ['6', '2', '7', '10'],
    correctAnswer: '7',
  },
  {
    question: 'Name the National tree of India?',
    options: ['Oak tree', 'Neem tree', 'Banyan tree', 'Coconut tree'],
    correctAnswer: 'Banyan tree',
  },
  {
    question: 'Which is the smallest month of the year?',
    options: ['February', 'March', 'June', 'May'],
    correctAnswer: 'February',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars',
  },
  {
    question: 'How many sides are there in a triangle?',
    options: ['2', '5', '7', '3'],
    correctAnswer: '3',
  },
  {
    question: 'Name the largest planet of our Solar System?',
    options: ['Jupiter', 'Earth', 'Mars', 'Mercury'],
    correctAnswer: 'Jupiter',
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
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

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      {!quizStarted ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6 text-orange-600">Welcome to the Quiz!</h1>
          <button
            onClick={handleStartQuiz}
            className="bg-orange-500 text-white py-3 px-8 rounded-lg hover:bg-orange-600 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Quiz
          </button>
        </div>
      ) : showScore ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-orange-600">Quiz Completed!</h2>
          <p className="text-xl text-orange-700">
            You scored {score} out of {questions.length}!
          </p>
          <button
            onClick={handleRestartQuiz}
            className="mt-6 bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl border-2 border-orange-100">
          <div className="mb-6">
            <div className="w-full bg-orange-100 rounded-full h-3">
              <div
                className="bg-orange-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-sm text-orange-600 mt-2 font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>

          <div className="text-2xl font-bold mb-6 text-orange-800">
            {questions[currentQuestion].question}
          </div>

          <div className="space-y-4 mb-6">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                className={`w-full text-left py-3 px-6 rounded-lg text-lg font-medium transition-all duration-300 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-orange-50 hover:bg-orange-100 text-orange-800 shadow-sm hover:shadow-md'
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
              className="bg-orange-400 text-white py-2 px-6 rounded-lg hover:bg-orange-500 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg disabled:bg-orange-300 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                className="bg-orange-600 text-white py-2 px-6 rounded-lg hover:bg-orange-700 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
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