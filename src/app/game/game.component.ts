import { Component, OnInit } from '@angular/core';
import { NgStyle } from "@angular/common"
import { NgClass } from "@angular/common"
import { Router } from "@angular/router"
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  animations: [
    trigger('fadeInOrOut', [
      state('there', style({
        opacity: 1
      })),
      state('gone', style({
        opacity: 0
      })),

      transition('there <=> gone', animate('800ms ease-in')),
    ]),
    trigger("levelComplete", [
      state('notWinner', style({
        opacity: 0
      })),
        state("winner", style({
          opacity: 1
        })),
        transition("notWinner => winner", animate("600ms ease-in"))
    ]),

  ]
})


export class GameComponent implements OnInit {

  layout = []
  userInput: string;
  heroStart: object;
  reached: string;
  next: boolean;
  textRows: object;
  codeRow: object;
  level: number;
  firstParagraph: string;
  secondParagraph: string;
  treasureStart: any;
  shake: any;
  gridMod: any;
  winStatus: string;
  fireLocation: any;
  ogreFade: string;
  flameCast: string;


  constructor(private _router: Router) { }

  ngOnInit() {
    this.gameSetup();
  }

  gameSetup(){
    if(this.level == undefined){
      this.level = 1;
    }
    this.codeRow = this.gameData[this.level].codeRow;
    this.userInput = this.gameData[this.level].userInput;
    this.winStatus = "notWinner";
    this.reached = "there";
    this.shake = "test";
    this.next = false;
    this.firstParagraph = this.gameData[this.level].p1;
    this.secondParagraph = this.gameData[this.level].p2;
    this.layout = this.gameData[this.level].boardState;
    this.textRows = this.gameData[this.level].textRows;
    this.gridMod = this.gameData[this.level].gridMod;
    this.treasureStart = this.gameData[this.level].treasureStart;
    this.heroStart = {"grid-column": 1};
    this.fireLocation = {"grid-column": 2/5};
    this.ogreFade = "there";
    this.flameCast = "gone"
  }

  checkInput(){
    if(this.gameData[this.level].validInput.test(this.userInput)){
      if(this.level == 1){
      this.heroStart = {"grid-column": this.userInput[this.userInput.length-1]}
      } else if (this.level == 2){
        this.heroStart = {"grid-row": this.userInput[this.userInput.length-1]}
      } else if(this.level == 3){
        this.heroStart = {"grid-column": this.userInput.slice(this.userInput.length-2, this.userInput.length)}
      } else if(this.level == 4){
        this.fireLocation = {"grid-column": this.userInput.slice(this.userInput.length-3, this.userInput.length)}
        console.log(this.fireLocation);
      }
      if(this.gameData[this.level].winningInput.test(this.userInput)){
        if(this.level == 4){
          this.ogreFade = "gone";
        }
        this.winGame();
      }
    } else{
      this.heroStart = {"grid-column": 1};

    }
  }

  winGame(){
    // Makes the treasure disapear with reachChest animation and unlocks the next button
    this.reached = "gone";
    this.next = true;
    this.winStatus = "winner"
  }

  advance(){
    //On submitting the next form advances
    //the user +1 level and loads the gameData for that level.
    if(this.next == true){
      this.level += 1;
      this.next = false;
      this.gameSetup()
    } else {
      this.shake = "animated shake"
      setTimeout(()=>{
        console.log('stop');
        this.shake = "none"
      }, 3000)
    }
  }

  gameData = {
    1: {
    p1: "Welcome! Your goal is to navigate the dungeon and learn some CSS grid along the way.",
    p2: "Use the grid-column rule to move the hero to the treasure. There are 5 columns in this map.",
    boardState: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6", "tile7", "tile8", "tile9", "tile10", "tile11", "tile12", "tile13", "tile14", "tile15", "tile16", "tile17", "tile18", "tile19", "tile20", "tile21", "tile22", "tile23", "tile24", "tile25"],    
    // heroStart: {"grid-column": 1},
    userInput: "grid-column: ",
    gridMod: "grid-column: ",
    treasureStart: {"grid-area": "1/5/1/5"},
    validInput: /^grid-column: \d$/,
    winningInput: /^grid-column: 5/,
    textRows: ["white", "", "white", "", "white", "", "white", "", "white", "", "white", "", "white", "", "white", ""],
    codeRow: [
      {
      class: "white",
      input: "#board{"
    },
    {
      class: "indent",
      input: "display: grid;"
    },
    {
      class: "white indent",
      input: "grid-template-columns: repeat(5, 125px);"
    },
    {
      class: "indent",
      input: "grid-template-rows: repeat(5, 125px);"
    },
    {
      class: "white indent",
      input: "grid-gap: 5px;"
    },
    {
      class: "",
      input: "}"
    },
    {
      class: "white",
      input: "."
    },
    {
      class: "",
      input: "#hero {"
    },
    {
      class: "white indent",
      input: "      grid-row: 1;"
    }
    ]},

    2: {
      p1: "Good job! You can place elements in rows as well as columns.",
      p2: "Now use the grid-row rule to traverse the rows down to the treasure.",
      boardState: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6", "tile7", "tile8", "tile9", "tile10", "tile11", "tile12", "tile13", "tile14", "tile15", "tile16", "tile17", "tile18", "tile19", "tile20", "tile21", "tile22", "tile23", "tile24", "tile25"],
      heroStart: {"grid-row": 1},
      userInput: "grid-row: ",
      treasureStart: {"grid-area": "5/1/5/2"},
      validInput: /^grid-row: \d$/,
      winningInput: /^grid-row: 5/,
      textRows: ["white", "", "white", "", "white", "", "white", "", "white", "", "white", "", "white", "", "white", ""],
      codeRow: [
        {
        class: "white",
        input: "#board{"
      },
      {
        class: "indent",
        input: "display: grid;"
      },
      {
        class: "white indent",
        input: "grid-template-columns: repeat(5, 125px);"
      },
      {
        class: "indent",
        input: "grid-template-rows: repeat(5, 125px);"
      },
      {
        class: "white indent",
        input: "grid-gap: 5px;"
      },
      {
        class: "",
        input: "}"
      },
      {
        class: "white",
        input: "."
      },
      {
        class: "",
        input: "#hero {"
      },
      {
        class: "white indent",
        input: "      grid-column: 1;"
      }
      ]},
      3: {
        p1: "You can use negative numbers to start at the end of the columns. -1 will put you outside the grid area and -2 will get you to 5th column.",
        p2: "Try entering a negative number to get to the treasure that is currently in the 4th column",
        boardState: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6", "tile7", "tile8", "tile9", "tile10", "tile11", "tile12", "tile13", "tile14", "tile15", "tile16", "tile17", "tile18", "tile19", "tile20", "tile21", "tile22", "tile23", "tile24", "tile25"],        
        userInput: "grid-column: ",
        gridMod: "grid-column: ",
        treasureStart: {"grid-area": "1/4/1/4"},
        validInput: /^grid-column: -?\d$/,
        winningInput: /^grid-column: -3/,
        textRows: ["white", "", "white", "", "white", "", "white", "", "white", "", "white", "", "white", "", "white", ""],
        codeRow: [
          {
          class: "white",
          input: "#board{"
        },
        {
          class: "indent",
          input: "display: grid;"
        },
        {
          class: "white indent",
          input: "grid-template-columns: repeat(5, 125px);"
        },
        {
          class: "indent",
          input: "grid-template-rows: repeat(5, 125px);"
        },
        {
          class: "white indent",
          input: "grid-gap: 5px;"
        },
        {
          class: "",
          input: "}"
        },
        {
          class: "white",
          input: "."
        },
        {
          class: "",
          input: "#hero {"
        },
        {
          class: "white indent",
          input: "      grid-row: 1;"
        }
        ]},
        4: {
          p1: "Uh oh! There are ogres blocking our path! You better use your #flameWall attack to dispatch them.",
          p2: "If you were to enter grid-column: 1/5; then that element would span from column 1 up to but not including column 5. To kill the ogres, make #flameWall extend from column 2 and stop in column 4.",
          boardState: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6", "tile7", "tile8", "tile9", "tile10", "tile11", "tile12", "tile13", "tile14", "tile15", "tile16", "tile17", "tile18", "tile19", "tile20", "tile21", "tile22", "tile23", "tile24", "tile25"],        
          userInput: "grid-column: ",
          gridMod: "grid-column: ",
          treasureStart: {"grid-area": "1/5/1/5"},
          validInput: /^grid-column: \d.\d$/,
          winningInput: /^grid-column: 2.5/,
          textRows: ["white", "", "white", "", "white", "", "white", "", "white", "", "white", "", "white", "", "white", ""],
          codeRow: [
            {
            class: "white",
            input: "#board{"
          },
          {
            class: "indent",
            input: "display: grid;"
          },
          {
            class: "white indent",
            input: "grid-template-columns: repeat(5, 125px);"
          },
          {
            class: "indent",
            input: "grid-template-rows: repeat(5, 125px);"
          },
          {
            class: "white indent",
            input: "grid-gap: 5px;"
          },
          {
            class: "",
            input: "}"
          },
          {
            class: "white",
            input: "."
          },
          {
            class: "",
            input: "#hero {"
          },
          {
            class: "white indent",
            input: "grid-row: 1;"
          },
          {
            class: "indent",
            input: "grid-column: 1;"
          },
          {
            class: "white",
            input: "}"
          },
          {
            class: "",
            input: "#flameWall {"
          },
          {
            class: "indent white",
            input: "grid-row: 1;"
          }
          ]},
  }
  
}
