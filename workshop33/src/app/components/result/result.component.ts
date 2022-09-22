import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GiphyService } from 'src/app/services/giphy.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnDestroy {

  searchResults: string[] = []
  sub$!: Subscription

  constructor(private giphySvc: GiphyService) { }

  ngOnInit(): void {
    this.sub$ = this.giphySvc.onNewResult.subscribe(result => {
      this.searchResults = result
    })
  }

  ngOnDestroy(): void {
      this.sub$.unsubscribe()
  }

}
