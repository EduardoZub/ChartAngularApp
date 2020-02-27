import { Component, OnInit } from '@angular/core';
import { delay, finalize } from 'rxjs/operators';
import { GetNewsService } from '../../services/get-news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public newsData: any;
  public preloader: boolean = false;

  constructor(private _getNews: GetNewsService) { }

  ngOnInit() {
    this._getNews.getData()
      .pipe(
        delay(2000),
        finalize(() => this.preloader = true),
      )
      .subscribe(data => this.newsData = data.articles);
  }
}
