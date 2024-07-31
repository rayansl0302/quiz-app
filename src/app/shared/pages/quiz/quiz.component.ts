import { Component, OnInit } from '@angular/core';
import { QuizService } from './service/quiz.service';
import { Question } from '../../components/question/model/question.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  question: Question | null = null;
  selectedOptionId: number | null = null;
  showExplanation: boolean = false;
  isAnswerCorrect: boolean | null = null;
  explanation: string | null = null;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.quizService.fetchQuestions().subscribe(
      (questions: Question[]) => {
        console.log('Questions loaded:', questions);
        this.loadNextQuestion();
      },
      (error) => {
        console.error('Error loading questions:', error);
      }
    );
  }

  loadNextQuestion(): void {
    const nextQuestion = this.quizService.getNextQuestion();
    if (nextQuestion) {
      this.question = nextQuestion;
      this.selectedOptionId = null;
      this.showExplanation = false;
      this.isAnswerCorrect = null;
      this.explanation = null;
    } else {
      console.warn('No more questions available.');
      // Adicione lógica adicional se necessário
    }
  }

  submitAnswer(optionId: number): void {
    if (this.question) {
      const selectedOption = this.question.options.find(option => option.id === optionId);
      if (selectedOption) {
        this.isAnswerCorrect = selectedOption.isCorrect;
        this.showExplanation = true;
        this.explanation = this.question.explanation;
      }
    }
  }

  onOptionSelected(optionId: number): void {
    this.selectedOptionId = optionId;
    this.submitAnswer(optionId);
  }
}
