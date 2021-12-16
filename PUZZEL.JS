var move
var notify
var loop
var y
var x
var count = 0
var time =0
window.onload = function () {
  var puzzl = document.getElementById('puzzl')
  move = puzzl.getElementsByTagName('div')
  for (var i = 0; i < move.length; i++) {
    move[i].className = 'puzzlemain'
    move[i].style.left = (i % 4) * 100 + 'px'
    move[i].style.top = parseInt(i / 4) * 100 + 'px'
    move[i].style.backgroundPosition ='-' + move[i].style.left + ' ' + '-' + move[i].style.top
    move[i].onmouseover = function () {
      if (checkMove(parseInt(this.innerHTML))) {
        this.style.border = '4px solid red'
        this.style.color = 'red'
        this.style.backgroundImage =
          'url(https://www.imagebee.org/sports/marcus-rashford/Marcus-Rashford-10-400x400.jpg)'
      }
    }

    move[i].onmouseout = function () {
      this.style.border = '5px solid black'
      this.style.color = '#000000'
    }

    move[i].onclick = function () {
      if (checkMove(parseInt(this.innerHTML))) {
        ++count
        document.getElementById('moves').innerHTML = count
        swap(this.innerHTML - 1)
        if (finish()) {
          win()
        }  
        return
      }
      else
      {
        alert("ERROR Cannot move block\nmust be next to a blank space.");
      }
    }
  }
  var shuffle = document.getElementById('shuffel')
  x = '300px'
  y = '300px'
  shuffle.onclick = function () {
    count=0;
    document.getElementById('moves').innerHTML=count;
    for (var i = 0; i < 300; i++) {
      var rand = parseInt(Math.random() * 100) % 4
      if (rand == 0) {
        var temp = up(x, y)
        if (temp != -1) {
          swap(temp)
        }
      }
      if (rand == 1) {
        var temp = down(x, y)
        if (temp != -1) {
          swap(temp)
        }
      }
      if (rand == 2) {
        var temp = left(x, y)
        if (temp != -1) {
          swap(temp)
        }
      }
      if (rand == 3) {
        var temp = right(x, y)
        if (temp != -1) {
          swap(temp)
        }
      }
    }
  }
}
function checkMove(position) {
  if (left(x, y) == position - 1) {
    return true
  }
  if (down(x, y) == position - 1) {
    return true
  }
  if (up(x, y) == position - 1) {
    return true
  }
  if (right(x, y) == position - 1) {
    return true
  }
}
function Notify() {
  notify--
  if (notify == 0) {
    var body = document.getElementsByTagName('body')
    body[0].style.backgroundImage = 'none'
    alert('GOOD JOb!!')
    alert('Number of moves is '+ count)
    count=0;
    document.getElementById('moves').innerHTML=count;
    return
  } else notify % 2

  {
    var body = document.getElementsByTagName('body')
    body[0].style.backgroundImage =
      'url(http://supermarinerfc.rfu.club/Media/SupermarineRFC/Barry%20Christian/winner.jpg)'
  }
  loop = setTimeout(Notify, 0)
}
function win() {
  var body = document.getElementsByTagName('body')
  body[0].style.backgroundImage =
    'url(http://supermarinerfc.rfu.club/Media/SupermarineRFC/Barry%20Christian/winner.jpg)'
  notify = 10
  loop = setTimeout(Notify, 50)
}
function finish() {
  var flag = true
  for (var i = 0; i < move.length; i++) {
    var top = parseInt(move[i].style.top)
    var left = parseInt(move[i].style.left)
    if (left != (i % 4) * 100 || top != parseInt(i / 4) * 100) {
      flag = false
      break;
    }
  }
  return flag
}
function left(x, y) {
  var cordX = parseInt(x)
  var cordY = parseInt(y)
  if (cordX > 0) {
    for (var i = 0; i < move.length; i++) {
      if (
        parseInt(move[i].style.left) + 100 == cordX &&
        parseInt(move[i].style.top) == cordY
      ) {
        return i
      }
    }
  } else {
    return -1
  }
}
function right(x, y) {
  var cordX = parseInt(x)
  var cordY = parseInt(y)
  if (cordX < 300) {
    for (var i = 0; i < move.length; i++) {
      if (
        parseInt(move[i].style.left) - 100 == cordX &&
        parseInt(move[i].style.top) == cordY
      ) {
        return i
      }
    }
  } else {
    return -1
  }
}
function up(x, y) {
  var cordX = parseInt(x)
  var cordY = parseInt(y)
  if (cordY > 0) {
    for (var i = 0; i < move.length; i++) {
      if (
        parseInt(move[i].style.top) + 100 == cordY &&
        parseInt(move[i].style.left) == cordX
      ) {
        return i
      }
    }
  } else {
    return -1
  }
}
function down(x, y) {
  var cordX = parseInt(x)
  var cordY = parseInt(y)
  if (cordY < 300) {
    for (var i = 0; i < move.length; i++) {
      if (
        parseInt(move[i].style.top) - 100 == cordY &&
        parseInt(move[i].style.left) == cordX
      ) {
        return i
      }
    }
  } else {
    return -1
  }
}
function swap(position) {
  var temp = move[position].style.top
  move[position].style.top = y
  y = temp
  temp = move[position].style.left
  move[position].style.left = x
  x = temp
}
