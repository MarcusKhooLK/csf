import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = []
  currOffset: number = 0
  currLimit: number = 20;

  constructor(private bookSvc: BookService) { }

  ngOnInit(): void {
    this.currOffset = parseInt(localStorage.getItem("currOffset")!, 10)
    this.updateBookList(this.currLimit, this.currOffset)
  }

  onPrev() {
    this.currOffset -= 10;
    localStorage.setItem("currOffset", this.currOffset.toString())
    this.updateBookList(this.currLimit, this.currOffset)
  }

  onNext() {
    this.currOffset += 10;
    localStorage.setItem("currOffset", this.currOffset.toString())
    this.updateBookList(this.currLimit, this.currOffset);
  }

  private updateBookList(limit: number, offset:number) {
    this.bookSvc.getBooks(limit, offset)
    .then(result => {
      console.info(">>>> books: ", result)
      this.books = result
    })
    .catch(error => {
      console.error(">>>> error: ", error)
    })
  }

}
