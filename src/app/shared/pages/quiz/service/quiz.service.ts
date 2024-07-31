import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Question } from 'src/app/shared/components/question/model/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'https://api.npoint.io/234c2d657b65195974d7';
  private questions: Question[] = [];
  private currentQuestionIndex: number = -1;
  private shuffledQuestions: Question[] = [];

  constructor(private http: HttpClient) { }

  fetchQuestions(): Observable<Question[]> {
    return this.http.get<{ questions: Question[] }>(this.apiUrl).pipe(
      map((response: { questions: Question[] }) => {
        const questions = response.questions;
        console.log('Fetched Questions:', questions); // Log dos dados recebidos
        this.setQuestions(questions); // Armazena e embaralha as perguntas
        return this.shuffledQuestions;
      })
    );
  }

  private shuffleQuestions(): void {
    this.shuffledQuestions = [...this.questions].sort(() => Math.random() - 0.5);
    console.log('Shuffled Questions:', this.shuffledQuestions); // Log das perguntas embaralhadas
  }

  setQuestions(questions: Question[]): void {
    this.questions = questions;
    this.shuffleQuestions();
  }

  getNextQuestion(): Question | null {
    if (this.currentQuestionIndex + 1 < this.shuffledQuestions.length) {
      this.currentQuestionIndex++;
      const nextQuestion = this.shuffledQuestions[this.currentQuestionIndex];
      console.log('Next Question:', nextQuestion); // Log da próxima pergunta
      return nextQuestion;
    } else {
      console.log('No more questions available.'); // Log quando não há mais perguntas
      return null;
    }
  }
}
