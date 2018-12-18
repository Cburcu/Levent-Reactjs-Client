import React, { Component } from 'react';
import { HubConnection } from '@aspnet/signalr-client';
import Grid from '@material-ui/core/Grid';

class Game extends Component {
    burgerToggle() {
        let linksEl = document.querySelector('.narrowLinks');
        if (linksEl.style.display === 'block') {
            linksEl.style.display = 'none';
        } else {
            linksEl.style.display = 'block';
        }
    }

    render() {
        let letters = ["a", "b", "c", "d", "e", "f", "g", "ğ", "h", "ı", "İ", "j", "k", "l", "m", "n", "o", "ö", "p", "r", "s", "ş", "t", "u", "v", "y", "z"];
        let points = ["a", "b", "c", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "r", "s", "ş", "t", "u", "v", "y", "z"];
        let rows = [];
        let rowsPoint = [];
        let cellLetter = [];
        let cellPoint = [];

        for (var i = 0; i < letters.length; i++) {
            let cellLetterID = `letter${letters[i].toUpperCase()}`;
            cellLetter.push(
                <td
                    className="lettercell"
                    key={cellLetterID}
                    id={cellLetterID}
                    align="center"
                    draggable
                    onDragStart={(ev) => this.drag(ev)}>
                    {letters[i].toUpperCase()}
                </td>)
        }
        rows.push(<tr key={0}>{cellLetter}</tr>)


        for (var ii = 0; ii < letters.length; ii++) {
            let cellPointID = `point${ii}`
            cellPoint.push(<td className="lettercell" key={cellPointID} id={cellPointID} align="center">{points[ii]}</td>)
        }
        rowsPoint.push(<tr key={1}>{cellPoint}</tr>)

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
                            <Grid item xs={10}>
                                <p>Letter</p>
                                <table id="lettersGrid" className="table table-bordered table-responsive table-condensed">
                                    <tbody>
                                        {rows}
                                        {rowsPoint}
                                    </tbody>
                                </table>
                            </Grid>

                            {/* OpponentLetterGrid */}
                            <Grid item xs={2}>
                                <p>Opponent Letter</p>
                                <table id="opponentlettersGrid" className="table table-bordered table-responsive table-condensed">
                                    <tbody>
                                        <tr>
                                            <td className="lettercell"
                                                align="center"
                                                id="opponentLetter"
                                                draggable
                                                onDragStart={(ev) => this.drag(ev)}>
                                                {letter.toUpperCase()}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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

                    {/* <Result /> */}
                    <Grid container item xs={12} id="Result">
                        &nbsp;
                <Grid container item xs={12} justify="center">
                            <h2 id="Gameover" align="left"> Game Is Over... </h2>
                        </Grid>
                        <Grid item xs={6}>
                            <p><b>Winner</b></p>
                            <p>Name: <span id="winnerName">winnerName</span></p>
                            <p>Score: <span id="winnerScore">winnerScore</span></p>
                            <p>Meaningful Words:</p>
                            <ul id="winnerWords">
                                <li>asdasd</li>
                                winnerWords</ul>
                        </Grid>
                        <Grid item xs={6}>
                            <p><b>Loser</b></p>
                            <p>Name: <span id="loserName">loserName</span></p>
                            <p>Score: <span id="loserScore">loserScore</span></p>
                            <p>Meaningful Words:</p>
                            <ul id="loserWords">
                                <li>ascasda</li>
                                loserWords</ul>
                        </Grid>
                        &nbsp;
            </Grid>

                    {/* <Restart /> */}
                    <Grid container spacing={16} id="RestartGame"></Grid>
                </div>
            </div>
        );
    }
}

export default Game;
