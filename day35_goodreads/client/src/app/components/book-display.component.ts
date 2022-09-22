import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BookDetails } from '../models/book-details';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-display',
  templateUrl: './book-display.component.html',
  styleUrls: ['./book-display.component.css']
})
export class BookDisplayComponent implements OnInit {

  book!: BookDetails

  constructor(private activatedRoute: ActivatedRoute, 
    private title: Title,
    private bookSvc: BookService) { }

  ngOnInit(): void {
    const bookId: string = this.activatedRoute.snapshot.params['bookId']
    this.bookSvc.getBook(bookId)
    .then(result=> {
      console.info(">>> book: ", result)
      this.book = result
      this.title.setTitle(this.book.title);
    })
    .catch(error=>{
      console.error(">>>> error: ", error)
    })
  }

}
