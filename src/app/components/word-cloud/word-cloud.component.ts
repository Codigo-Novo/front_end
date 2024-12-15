import { Component, AfterViewInit } from '@angular/core';
import WordCloud from 'wordcloud';


@Component({
    selector: 'app-word-cloud',
    imports: [],
    templateUrl: './word-cloud.component.html',
    styleUrl: './word-cloud.component.css'
})
export class WordCloudComponent implements AfterViewInit {

  ngAfterViewInit() {
    const words: [string, number][] = [
      ['Agasalho', 60],
      ['Livros', 30],
      ['Sangue', 40],
      ['Alimentos', 40],
      ['Ração', 30],
      ['Cobertor', 80],
      ['Calçados', 20],
      ['Brinquedos', 20]
    ];

    WordCloud(document.getElementById('word-cloud')!, {
      list: words
    });
  }
}