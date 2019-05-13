// jsfiddle:  https://jsfiddle.net/jxhc314m/
// https://codesandbox.io/s/l5vr8mqpl7

import React from 'react';
import ReactDOM from 'react-dom';


class ExportDashboard extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
   downloadProgress: 0.0
  }

exportDownload = (progressCallBack) => {
 for(let x = 0; x < 100000; x++){
  progressCallBack(x,  100000)
  }
}

render(){
  return(
    <div>
      <h1>{this.state.downloadProgress}%</h1>
      <br/>
      <a onClick={()=>{
          this.exportDownload((currentProgress, complete) => {
            setTimeout(()=>{
            console.log(currentProgress / complete)
            this.setState({
              downloadProgress: parseFloat(((currentProgress/complete) * 100).toFixed(2))})
            }, 50)
          })
        }} className='select'>Click To Download
      </a>
    </div>
  )}
}

ReactDOM.render(<ExportDashboard />, document.getElementById('root'));
