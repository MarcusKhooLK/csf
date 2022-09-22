import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TitleStrategy } from '@angular/router';
import { SearchParams } from 'src/app/models';
import { GiphyService } from 'src/app/services/giphy.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  form!: FormGroup

  constructor(private fb: FormBuilder, private giphySvc: GiphyService) { }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  private createForm() : FormGroup{
    return this.fb.group({
      api: this.fb.control<string>(this.getAPIKey(), [Validators.required]),
      search: this.fb.control<string>('', [Validators.required]),
      count: this.fb.control<number>(5),
      rating: this.fb.control<string>('g')
    })
  }

  onSearch() {
    console.info("Searching.... ", this.form.value)
    const searchParams : SearchParams = this.form.value as SearchParams
    this.giphySvc.searchGiphy(searchParams)
                .then(result => {
                  console.info(">>>>> result: ", result)
                  // only save api if the call is successful
                  this.saveAPIKey(searchParams.api)
                  this.giphySvc.onNewResult.next(result)
                })
                .catch(error=>{
                  console.error(">>>> error: ", error)
                  alert(`>>>> error ${JSON.stringify(error)}`)
                })
    this.form = this.createForm()
  }

  private getAPIKey() : string {
    let key = localStorage.getItem('apiKey')
    if(!key) return ''
    return key
  }
  private saveAPIKey(key:string) {
    localStorage.setItem('apiKey', key)
  }

}
