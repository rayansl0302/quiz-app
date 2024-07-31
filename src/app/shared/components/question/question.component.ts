import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Question } from './model/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question!: Question;
  @Input() showExplanation: boolean = false;
  @Output() optionSelected = new EventEmitter<number>();

  selectedOption: number | null = null;
  isCorrect: boolean = false;
  correctAnswer: string = '';

  constructor() { }

  ngOnInit(): void { }

  selectOption(optionId: number): void {
    this.selectedOption = optionId;
    const selectedOption = this.question.options.find(option => option.id === optionId);

    if (selectedOption) {
      this.isCorrect = selectedOption.isCorrect;
      this.correctAnswer = this.question.options.find(option => option.isCorrect)?.text || '';
      this.optionSelected.emit(this.selectedOption);
    }
  }
}
