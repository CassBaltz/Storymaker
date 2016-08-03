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
        y = 8;

    function init() {
      canvas = document.getElementById('canvas');
      canvas.width = $(".edit-canvas-container").first().width() - 2;
      canvas.height = $(".edit-canvas-container").first().height() - 2;
      ctx = canvas.getContext("2d");
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
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
    restorePoints = [];
    $(".react-color-picker__hue-spectrum").first().css('height', '0px');
  },

  clearCanvas: function() {
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

  updateWidth: function (val) {
    if (val === 8) {
      $("#stroke-width").toggleClass('hidden');
      $("#stroke-size").children().removeClass();
      $("#stroke-size").removeClass();
      $("#stroke-size").children().addClass('material-icons md-18');
      y = 8;
    }

    if (val === 12) {
      $("#stroke-width").toggleClass('hidden');
      $("#stroke-size").removeClass();
      $("#stroke-size").children().removeClass();
      $("#stroke-size").children().addClass('material-icons md-24');
      y = 12;
    }

    if (val === 16) {
      $("#stroke-width").toggleClass('hidden');
      $("#stroke-size").removeClass();
      $("#stroke-size").children().removeClass();
      $("#stroke-size").children().addClass('material-icons md-36');
      y = 16;
    }
  },

  showStrokeOptions: function () {
    $("#stroke-size").addClass('hidden');
    $("#stroke-width").removeClass('hidden');
  },

  onDrag: function (color, c) {
    this.setState({color: color});
    console.log(this.state.color);
    x = color
    $(".react-color-picker__hue-spectrum").first().css('height', '0px');
  },

  showHue: function () {
    $(".react-color-picker__hue-spectrum").first().css('height', "300px");
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
    restorePoints = [];
  },


  render: function() {
    return (
      <div className="edit-canvas-container">
        <div className="canvas-container">
          <HueSpectrum id="hue" className="hue-spec" value={this.state.color} onDrag={this.onDrag}/>
            <div onClick={this.showHue} className="color-box" style={{
            background: this.state.color,
            width: 30,
            height: 30,
            color: '#C3C3E5'
          }}><i id="pen" className="material-icons">create</i></div>
        <div onClick={this.showStrokeOptions} id="stroke-size" className=""><i className="material-icons md-18">radio_button_checked</i></div>
          <div id="stroke-width" className="hidden">
            <div onClick={() => this.updateWidth(8)}><i className="material-icons md-18">radio_button_checked</i></div>
            <div onClick={() => this.updateWidth(12)}><i className="material-icons md-24">radio_button_checked</i></div>
            <div onClick={() => this.updateWidth(16)}><i className="material-icons md-36">radio_button_checked</i></div>
          </div>
          <div onClick={this.clearCanvas}className="clear-canvas"><i className="material-icons">undo</i></div>
            <canvas id="canvas" ></canvas>
            <div onClick={this.submit} className="save-card"><i className="material-icons">check_circle</i></div>
          </div>
      </div>
    );
  }
});
