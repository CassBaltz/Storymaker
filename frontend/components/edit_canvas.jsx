const React = require("react");
const ImageActions = require("../actions/image_actions");
import { HueSpectrum } from 'react-color-picker';

let restorePoints = [];
let tempImage;

let w, h, rect;
var canvas, ctx, flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;

    var x = "red",
        y = 4;

    function init() {
      canvas = document.getElementById('canvas');
      ctx = canvas.getContext("2d");
      rect = canvas.getBoundingClientRect();
      w = canvas.width;
      h = canvas.height;
      ctx.beginPath();
      ctx.rect(0, 0, w, h);
      ctx.fillStyle = "white";
      ctx.fill();


        canvas.addEventListener("mousemove", function (e) {
            findxy('move', e)
        }, false);
        canvas.addEventListener("mousedown", function (e) {
            findxy('down', e)
        }, false);
        canvas.addEventListener("mouseup", function (e) {
            findxy('up', e)
        }, false);
        canvas.addEventListener("mouseout", function (e) {
            findxy('out', e)
        }, false);
    }

    function draw() {
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = x;
        ctx.lineWidth = y;
        ctx.stroke();
        ctx.closePath();
    }

    function erase() {
        var m = confirm("Want to clear");
        if (m) {
            ctx.clearRect(0, 0, w, h);
            document.getElementById("canvasimg").style.display = "none";
        }
    }

    function findxy(res, e) {
        if (res == 'down') {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - rect.left;
            currY = e.clientY - rect.top;

            flag = true;
            dot_flag = true;
            if (dot_flag) {
                ctx.beginPath();
                ctx.fillStyle = x;
                ctx.fillRect(currX, currY, 2, 2);
                ctx.closePath();
                dot_flag = false;
            }
        }
        if (res == 'up') {
            flag = false;
            tempImage = canvas.toDataURL('image/png');
            restorePoints.push(tempImage);
        }
        if (res == 'out') {
          flag = false;
        }

        if (res == 'move') {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - rect.left;
                currY = e.clientY - rect.top;
                draw();
            }
        }
    };

module.exports = React.createClass({
  getInitialState: function() {
    return {color: "red"};
  },

  componentDidMount: function() {
    init();
  },

  clearCanvas: function() {
    // ctx.clearRect(0, 0, w, h);
    // ctx.beginPath();
    // ctx.rect(0, 0, w, h);
    // ctx.fillStyle = "white";
    // ctx.fill();
    if (restorePoints.length > 1) {
      let oImg = new Image();
      restorePoints.pop();
      oImg.src = restorePoints[restorePoints.length - 1]
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(oImg, 0, 0);
    } else {
      restorePoints.pop();
      ctx.rect(0, 0, w, h);
      ctx.fillStyle = "white";
      ctx.fill();
    }
  },

  // setColor: function () {
  //   var color = Colr.fromRgb(
  //     Math.random() * 255,
  //     Math.random() * 255,
  //     Math.random() * 255
  //   );
  //
  //   // replace current color and origin color
  //   this.setState({
  //     color: color.toHex()
  //   });
  // },
  //
  // handleChange: function (color) {
  //   this.setState({
  //     color: color.toHex()
  //   });
  // },

  onDrag(color, c) {
    this.setState({color: color});
    console.log(this.state.color);
    x = color
  },

  submit: function() {
    var canvas = document.getElementById("canvas");
    var dataURL = canvas.toDataURL("image/jpeg");
    ImageActions.saveImage(dataURL);
    ctx.clearRect(0, 0, w, h);
    ctx.beginPath();
    ctx.rect(0, 0, w, h);
    ctx.fillStyle = "white";
    ctx.fill();
  },

  render: function() {
    return (
      <div className="edit-canvas-container">
        <div className="canvas-container">
          <HueSpectrum className="hue-spec" value={this.state.color} onDrag={this.onDrag}/>
            <div className="color-box" style={{
            background: this.state.color,
            width: 30,
            height: 30,
            color: '#C3C3E5'
          }}><i id="pen" className="material-icons">create</i></div>
        <div onClick={this.clearCanvas}className="clear-canvas">x</div>
            <canvas id="canvas" width="500" height="500"></canvas>
            <div onClick={this.submit} className="save-card">+</div>
          </div>
      </div>
    );
  }
});
