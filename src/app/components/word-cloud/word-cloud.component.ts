import { Component, AfterViewInit } from '@angular/core';
import { KeyWord } from '../../keyword.interface';
import { DataService } from '../../data.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import WordCloud from 'wordcloud';

@Component({
    selector: 'app-word-cloud',
    imports: [],
    standalone: true,
    templateUrl: './word-cloud.component.html',
    styleUrl: './word-cloud.component.css'
})
export class WordCloudComponent implements AfterViewInit {

  trendKeyWords: KeyWord[] = [];
  countWords: number[] = [];
  mapCountWords: number[] = [];
  words: [string, number][] = [];
  colors: string[] = ['darkred', 'blue', 'green', 'darkgreen', 'orange', 'indigo', 'magenta', 'purple', 'cyan', 'hotpink', 'darkred', 'blue', 'green', 'darkgreen', 'orange', 'indigo', 'magenta', 'purple', 'cyan', 'hotpink', 'darkred', 'blue', 'green', 'darkgreen', 'orange'];
  n: number = 25;
  min: number = 25;
  max: number = 80;

  constructor(private data: DataService, private router: Router) { 
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe(() => {
        window.scrollTo(0, 0);
    });
  }

  async ngAfterViewInit() {
    await this.getTrendWords();
    this.mapCountWords = this.mapValuesToRange(this.countWords, this.min, this.max);
    this.trendKeyWords.forEach((item, i) => {
      this.words.push([item.name, this.mapCountWords[i] || 0]);
      i++;
    })
    WordCloud(document.getElementById('word-cloud')!, {
      list: this.words.map((word, index) => [word[0], word[1]]),
      backgroundColor: 'transparent',
    });
    setTimeout(() => {
      const wordCloudSpans = document.querySelectorAll('#word-cloud span');
      wordCloudSpans.forEach((span, index) => {
        const link = document.createElement('a');
        link.href = `#${this.words[index][0]}`;
        link.innerHTML = span.innerHTML; 
        span.innerHTML = ''; 
        span.appendChild(link); 
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.router.navigate([`/pesquisainstituicao/${this.trendKeyWords[index].id}`]);
        });
        link.style.color = this.colors[index];
      });
    }, 500);
  }

  getTrendWords(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.data.getTrendKeyWords(this.n).subscribe(
        (data: { id: number; name: string; count: number }[]) => { data.forEach((item) => {
          const keyword: KeyWord = {id: item.id, name: item.name};
          this.trendKeyWords.push(keyword);
          this.countWords.push(item.count);
        });
        resolve();
        },
        (error) => reject(error)
      );
    });
  }

  mapValuesToRange(values: number[], newMin: number, newMax: number): number[] {
    const originalMin = Math.min(...values);
    const originalMax = Math.max(...values);
    if (originalMin === originalMax) {
      return values.map(() => newMin);
    }
    return values.map(value =>
      newMin + ((value - originalMin) / (originalMax - originalMin)) * (newMax - newMin)
    );
  }
}