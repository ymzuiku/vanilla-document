import dom from 'vanilla-document';

// register <style>...</style> in document.head
dom.css(`
body {
  font: 14px "Century Gothic", Futura, sans-serif;
  margin: 20px;
}


ol, ul {
  padding-left: 30px;
}

.board-row:after {
  clear: both;
  content: "";
  display: table;
}

.status {
  margin-bottom: 10px;
}

.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}


@media-md{
  .game {
    background:#f55;
  }
}

.square:focus {
  outline: none;
}


.game {
  display: flex;
  flex-direction: row;
}

.game-info {
  margin-left: 20px;
}

.game-board {
  margin: 10px;
}
`);
