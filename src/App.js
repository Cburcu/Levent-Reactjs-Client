import React, { Component } from 'react';
import { HubConnection } from '@aspnet/signalr-client';
import Grid from '@material-ui/core/Grid';
import './App.css';

class App extends Component {

  componentDidMount = () => {
    const hubConnection = new HubConnection('http://localhost:5000/game');

    this.setState({ hubConnection }, () => {
      this.state.hubConnection
        .start()
        .then(() => console.log('Connection started!'))
        .catch(err => console.log('Error while establishing connection :('));

      // Stayle
      var LetterGrid = document.getElementById("lettersGrid");
      var OpponentLetterGrid = document.getElementById("opponentlettersGrid");
      var Result = document.getElementById("result");
      var Restart = document.getElementById("restartGame");

      LetterGrid.style.display = "none";
      OpponentLetterGrid.style.display = "none";
      Result.style.display = "none";
      Restart.style.display = "none";

      // WaitingOpponent
      hubConnection.on("WaitingOpponent", function (message) {

        console.log("waitingopponent");

        var li = document.createElement("li");
        var list = document.getElementById("messagesList");
        li.textContent = message;
        list.insertBefore(li, list.childNodes[0]);
      });

      // Start Game
      hubConnection.on("StartGame", function (message, turnOwner, waitingUserName, playerName, LettersPoints) {
        let letters = [];
        let points = [];

        console.log("start");
        for (var i in LettersPoints) {
          letters.push(i.toUpperCase());
          points.push(LettersPoints[i]);
        }

        var cellLetter = document.getElementById("cellLetter");
        var cellPoint = document.getElementById("cellPoint");

        for(var ii in letters) {
          var td = document.createElement("td");
          td.innerText = letters[ii];
          var cellLetterID = "letter" + letters[ii].toUpperCase();
          td.className = "lettercell";
          td.key = cellLetterID;
          td.id = cellLetterID;
          td.align = "center";
          td.draggable = "true";
          cellLetter.appendChild(td);
          td.addEventListener('dragstart', function drag(ev) {
            console.log("drag ev");
            ev.dataTransfer.setData("text", ev.target.id);
          });
        }

        for (var iii in points) {
          var tdPoint = document.createElement("td");
          cellPoint.appendChild(tdPoint, points[iii]);
          var cellPointID = "point" + iii;
          tdPoint.className = "lettercell";
          tdPoint.key = cellPointID;
          tdPoint.id = { cellPointID };
          tdPoint.align = "center";
          tdPoint.innerText = points[iii];
        }

        if (turnOwner === "turnOwner") {
          document.getElementById("userName").innerText = waitingUserName;
          LetterGrid.style.display = "block";
          OpponentLetterGrid.style.display = "none";
        } else {
          document.getElementById("userName").innerText = playerName;
          LetterGrid.style.display = "none";
          OpponentLetterGrid.style.display = "none";
        }
        var li = document.createElement("li");
        var list = document.getElementById("messagesList");
        li.textContent = message;
        list.insertBefore(li, list.childNodes[0]);
      });

      // Restart Game
      hubConnection.on("RestartGame", function (turnownerName, message) {

        console.log("restart");

        document.getElementById("GridandMessage").style.display = "none";
        document.getElementById("Letters").style.display = "none";
        document.getElementById("RestartGame").style.display = "block";
        document.getElementById("Restart").innerText = turnownerName + "... " + message;
      });

      // Game Stream
      hubConnection.on("PlayOpponentLetter", function (message, opponentLetter, OpponentTurn) {

        console.log("playopponent");

        document.getElementById("opponentLetter").innerText = opponentLetter;
        if (OpponentTurn === "OpponentTurn") {
          LetterGrid.style.display = "none";
          OpponentLetterGrid.style.display = "block";
        } else {
          LetterGrid.style.display = "none";
          OpponentLetterGrid.style.display = "none";
        }
        var li = document.createElement("li");
        var list = document.getElementById("messagesList");
        li.textContent = message;
        list.insertBefore(li, list.childNodes[0]);
      });

      hubConnection.on("TurnOwnwer", function (message, TurnOwner) {

        console.log("turnowner");

        if (TurnOwner === "TurnOwner") {
          LetterGrid.style.display = "block";
          OpponentLetterGrid.style.display = "none";
        } else {
          LetterGrid.style.display = "none";
          OpponentLetterGrid.style.display = "none";
        }
        var li = document.createElement("li");
        var list = document.getElementById("messagesList");
        li.textContent = message;
        list.insertBefore(li, list.childNodes[0]);
      });

      // Game is over
      hubConnection.on("GameIsOver", function (message, result) {

        console.log("gameover");

        document.getElementById("GridandMessage").style.display = "none";
        document.getElementById("Letters").style.display = "none";
        document.getElementById("result").style.display = "block";
        document.getElementById("Gameover").innerText = message;

        document.getElementById("winnerName").innerText = result.winnerName;
        document.getElementById("loserName").innerText = result.loserName;

        document.getElementById("winnerScore").innerText = result.winnerScore;
        document.getElementById("loserScore").innerText = result.loserScore;

        for (var i = 0; i < result.winnerMeaningfulWords.length; i++) {
          var li1 = document.createElement("li");
          li1.textContent = result.winnerMeaningfulWords[i];
          document.getElementById("winnerWords").appendChild(li1);
        }
        for (var j = 0; j < result.loserMeaningfulWords.length; j++) {
          var li = document.createElement("li");
          li.textContent = result.loserMeaningfulWords[j];
          document.getElementById("loserWords").appendChild(li);
        }
      });

      // Exeption Messages
      hubConnection.on("GridCellException", function (message) {

        console.log("gridcell");

        var li = document.createElement("li");
        var list = document.getElementById("messagesList");
        li.textContent = message;
        list.insertBefore(li, list.childNodes[0]);
      });

      hubConnection.on("IncorrectLetterException", function (message) {
        var li = document.createElement("li");
        var list = document.getElementById("messagesList");
        li.textContent = message;
        list.insertBefore(li, list.childNodes[0]);
      });
    });
  };

  // Game Methods
  StartGame = (event) => {

    console.log("startgame");

    var x = document.getElementById("Join");
    x.style.display = "none";

    var username = document.getElementById("userInput").value;
    username = username.toUpperCase();
    this.state.hubConnection.invoke("JoinGroup", username).catch(function (err) {
      return console.error(err.toString());
    });
    console.log(username);
    event.preventDefault();
  };

  // Grid Show - Drag and Drop
  allowDrop = (ev) => {
    console.log("allowDrop ev");
    ev.preventDefault();
  };

  drag = (ev) => {
    console.log("drag ev");
    ev.dataTransfer.setData("text", ev.target.id);
  };

  drop = (ev) => {
    console.log("drop ev");
    var letterCellId = ev.dataTransfer.getData("text");
    var letterElement = document.getElementById(letterCellId);
    var letter = letterElement.innerText;
    var element = document.getElementById(ev.currentTarget.id);
    element.innerText = letter;
    var xDimension = ev.target.attributes["x"].value;
    var yDimension = ev.target.attributes["y"].value;
    element.allowDrop = false;
    element.draggable = false;
    element.drop = false;

    if (letterCellId !== "opponentLetter") {
      this.state.hubConnection.invoke("Play", letter, xDimension, yDimension)
        .catch(function (err) {
          return console.error(err.toString());
        });
    } else {
      this.state.hubConnection.invoke("PlayOpponent", xDimension, yDimension)
        .catch(function (err) {
          return console.error(err.toString());
        });
    }
    ev.preventDefault();
  };


  burgerToggle() {
    let linksEl = document.querySelector('.narrowLinks');
    if (linksEl.style.display === 'block') {
      linksEl.style.display = 'none';
    } else {
      linksEl.style.display = 'block';
    }
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          {/* <Navibar /> */}
          <nav>
            <div className="navWide">
              <div className="wideDiv">
                <a href="."><b>LEVENT</b></a>
                <a href=".">New Game</a>
              </div>
            </div>
            <div className="navNarrow">
              <i className="fa fa-bars fa-2x"></i>
              <div className="narrowLinks hidden">
                <a href="."><b>LEVENT</b></a>
                <a href=".">New Game</a>
              </div>
            </div>
          </nav>
        </header>

        <div>
          {/* <JoinGroup /> */}
          <div className="StartGame" id="Join">
            &nbsp;
            <div className="row">
              <div className="col-6">&nbsp;</div>
              <div className="col-6">
                User Name: <input type="text" id="userInput" />
                <br />
              </div>
            </div>
            <div className="row">
              <div className="col-6">&nbsp;</div>
              <div className="col-6">
                <button id="joinGame" onClick={(event) => this.StartGame(event)} value="Start Game">Start Game</button>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                &nbsp;
                    <hr />
              </div>
            </div>
          </div>

          {/* <GridAndMessageBox /> */}
          <div className="row" id="GridandMessage">
            &nbsp;
            <Grid container spacing={24}>
              {/* Grid */}
              <Grid item xs={6} id="TableGrid">
                <table className="table table-bordered table-responsive table-condensed">
                  <tbody>
                    {/* 1.Satır */}
                    <tr>
                      <td align="center" id="id00" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="0" y="0"></td>
                      <td align="center" id="id01" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="0" y="1"></td>
                      <td align="center" id="id02" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="0" y="2"></td>
                      <td align="center" id="id03" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="0" y="3"></td>
                      <td align="center" id="id04" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="0" y="4"></td>
                      <td align="center" id="id05" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="0" y="5"></td>
                    </tr>
                    {/* 2.Satır */}
                    <tr>
                      <td align="center" id="id10" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="1" y="0"></td>
                      <td align="center" id="id11" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="1" y="1"></td>
                      <td align="center" id="id12" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="1" y="2"></td>
                      <td align="center" id="id13" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="1" y="3"></td>
                      <td align="center" id="id14" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="1" y="4"></td>
                      <td align="center" id="id15" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="1" y="5"></td>
                    </tr>
                    {/* 3.Satır */}
                    <tr>
                      <td align="center" id="id20" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="2" y="0"></td>
                      <td align="center" id="id21" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="2" y="1"></td>
                      <td align="center" id="id22" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="2" y="2"></td>
                      <td align="center" id="id23" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="2" y="3"></td>
                      <td align="center" id="id24" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="2" y="4"></td>
                      <td align="center" id="id25" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="2" y="5"></td>
                    </tr>
                    {/* 4.Satır */}
                    <tr>
                      <td align="center" id="id30" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="3" y="0"></td>
                      <td align="center" id="id31" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="3" y="1"></td>
                      <td align="center" id="id32" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="3" y="2"></td>
                      <td align="center" id="id33" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="3" y="3"></td>
                      <td align="center" id="id34" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="3" y="4"></td>
                      <td align="center" id="id35" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="3" y="5"></td>
                    </tr>
                    {/* 5.Satır */}
                    <tr>
                      <td align="center" id="id40" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="4" y="0"></td>
                      <td align="center" id="id41" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="4" y="1"></td>
                      <td align="center" id="id42" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="4" y="2"></td>
                      <td align="center" id="id43" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="4" y="3"></td>
                      <td align="center" id="id44" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="4" y="4"></td>
                      <td align="center" id="id45" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="4" y="5"></td>
                    </tr>
                    {/* 6.Satır */}
                    <tr>
                      <td align="center" id="id50" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="5" y="0"></td>
                      <td align="center" id="id51" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="5" y="1"></td>
                      <td align="center" id="id52" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="5" y="2"></td>
                      <td align="center" id="id53" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="5" y="3"></td>
                      <td align="center" id="id54" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="5" y="4"></td>
                      <td align="center" id="id55" className="gameGridCell" onDrop={(ev) => this.drop(ev)} onDragOver={(ev) => this.allowDrop(ev)} x="5" y="5"></td>
                    </tr>
                  </tbody>
                </table>
              </Grid>

              {/* Show Messages */}
              <Grid item xs={6} id="MessageTable">
                <p id="userName"></p>
                <ul id="messagesList">

                </ul>
              </Grid>
              &nbsp;
            </Grid>
            <div className="row">
              <div className="col-12">
                &nbsp;
                    <hr />
              </div>
            </div>
          </div>

          {/* <LettersGrid /> */}
          <div className="row" id="Letters">
            &nbsp;
            <Grid container spacing={32}>
              {/* LettersGrid */}
              <Grid item xs={10} id="lettersGrid">
                <p>Letter</p>
                <table className="table table-responsive table-condensed">
                  <tbody id="lettersTbody">
                    <tr key={0} id="cellLetter"></tr>
                    <tr key={1} id="cellPoint"></tr>
                  </tbody>
                </table>
              </Grid>

              {/* OpponentLetterGrid */}
              <Grid item xs={2} id="opponentlettersGrid">
                <p>Opponent Letter</p>
                <table className="table table-responsive table-condensed">
                  <tbody>
                    <tr>
                      <td className="lettercell"
                        align="center"
                        id="opponentLetter"
                        draggable
                        onDragStart={(ev) => this.drag(ev)}>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Grid>
              &nbsp;
            </Grid>
            &nbsp;
          </div>

          {/* <Result /> */}
          <div className="row" id="result">
            &nbsp;
            <Grid container spacing={24}>
              <Grid item xs={12} id="root">
                <h2 id="Gameover" align="center"> Game Over... </h2>
              </Grid>

              {/* Winner */}
              <Grid item xs={6} id="winner" align="center">
                <p><b>Winner</b></p>
                <p>Name: <span id="winnerName">winnerName</span></p>
                <p>Score: <span id="winnerScore">winnerScore</span></p>
                <p>Meaningful Words:</p>
                <ul id="winnerWords">
                </ul>
              </Grid>

              {/* Loser */}
              <Grid item xs={6} id="loser" align="center">
                <p><b>Loser</b></p>
                <p>Name: <span id="loserName">loserName</span></p>
                <p>Score: <span id="loserScore">loserScore</span></p>
                <p>Meaningful Words:</p>
                <ul id="loserWords">
                </ul>
              </Grid>

              <Grid item xs={12} id="root" align="center">
                <p><b>Devam etmek için oyunu yeniden başlatın.</b></p>
              </Grid>
              &nbsp;
            </Grid>
          </div>
          {/* <Grid container spacing={24} id="result">
            &nbsp;
            <Grid container justify="center">
              <h2 id="Gameover" align="left"> Game Is Over... </h2>
            </Grid>
            <Grid item xs={6}>
              <p><b>Winner</b></p>
              <p>Name: <span id="winnerName">winnerName</span></p>
              <p>Score: <span id="winnerScore">winnerScore</span></p>
              <p>Meaningful Words:</p>
              <ul id="winnerWords">
              </ul>
            </Grid>
            <Grid item xs={6}>
              <p><b>Loser</b></p>
              <p>Name: <span id="loserName">loserName</span></p>
              <p>Score: <span id="loserScore">loserScore</span></p>
              <p>Meaningful Words:</p>
              <ul id="loserWords">
              </ul>
            </Grid>
            &nbsp;
        </Grid> */}

          {/* <Restart /> */}
          <Grid container spacing={16} id="restartGame"></Grid>
        </div>
      </div>
    );
  }
}

export default App;
