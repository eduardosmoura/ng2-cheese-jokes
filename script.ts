import { Component, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

class Joke {
  setup: string;
  punchline: string;
  hide: boolean;
  
  constructor(setup: string, punchline: string) {
    this.setup = setup;
    this.punchline = punchline;
    this.hide = true;
  }
  
  toggle() {
    this.hide = !this.hide;
  }
}

@Component({
  selector: 'cheese-joke-form',
  template: `
  <div class="card card-block">
    <h4 class="card-title">Create Joke</h4>
    <div class="form-group">
      <input type="text" class="form-control" id="setup" placeholder="Enter the setup" #setup>
    </div>
    <div class="form-group">
      <input type="text" class="form-control" id="punchline" placeholder="Enter the punchline" #punchline>
    </div>  
    <button type="button" class="btn btn-primary" (click)="createJoke(setup.value, punchline.value)">Create</button>
  </div>
  `
})
class CheeseJokeFormComponent {
  @Output() jokeCreated = new EventEmitter<Joke>();
  
  createJoke(setup: string, punchline: string) {
    this.jokeCreated.emit(new Joke(setup, punchline));
  }
}

@Component({
    selector: "cheese-joke",
    template: `
 <div class="card card-block">
  <h4 class="card-title">{{ joke.setup }}</h4>
  <p class="card-text" [hidden]="joke.hide">{{ joke.punchline }}</p>
  <a class="btn btn-primary" (click)="joke.toggle()">Tell Me</a>
 </div>
    `
})
class CheeseJokeComponent {
  @Input() joke: Joke;
}


@Component({
    selector: "cheese-jokes",
    template: `
        <cheese-joke-form (jokeCreated)="addJoke($event)"></cheese-joke-form>
        <cheese-joke [joke]="foo" *ngFor="let foo of jokes"></cheese-joke>
    `
})
class CheeseJokesComponent {
  
  jokes: Joke[];
  
  constructor() {
    this.jokes = [
      new Joke("What did the cheese say when it looked in the mirror?", "Halloumi"),
      new Joke("Did you hear about the explosion at the cheese factory?", "There was de brie everywhere!"),
      new Joke("How did Mr Cheese paint his wife?", "He Double Gloucester."),
      new Joke("A kid threw a lump of cheddar at me", "I thought ‘That’s not very mature’"),
      new Joke("Which cheese is made backwards?", "Edam"),
      new Joke("What kind of cheese do you use to disguise a small horse?", "Mask-a-pony (Mascarpone)"),
      new Joke("What did the queen say when someone threw cheese at her?", "How dairy!")      
    ]
  }
  
  addJoke($event){ 
    this.jokes.unshift($event);
  }  
}

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ CheeseJokesComponent, CheeseJokeComponent, CheeseJokeFormComponent ],
  bootstrap:    [ CheeseJokesComponent ]
})
class AppModule { }


platformBrowserDynamic().bootstrapModule(AppModule);
