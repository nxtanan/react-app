import $ from 'jquery';
import React, { Suspense, useEffect, useState } from "react";
import TimePicker from 'react-time-picker';
// import ChildComponent from './ChildComponent';
import dog from './img/dog.png';
import dog2 from './img/dog2.png';
import pvz from './img/pvz.png';
import pvz1 from './img/pvz1.png';
// import Lazy from 'lazy.js';

const ChildComponent = React.lazy(() => import('./ChildComponent'));

function App() {
  /**
   * Calculate the time-left
   * @param {*} timeUp input time to calculate
   * @returns time-left
   */
  const calculateTimeLeft = timeUp => {
    const now = new Date().toISOString().substr(0, 10) + ' ' + timeUp;
    const difference = +new Date(`${now}`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const messageTimeUp = 'Xách đít lên mà dzề!!!';
  const initialTimeStyle = {
    color: 'black'
  };

  const [timeUp, setTimeUp] = useState(new Date().getHours() < 12 ? '11:30:00' : '17:30:00');
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(timeUp));
  const [message, setMessage] = useState('aaaa');
  const [timeStyle, setTimeStyle] = useState(initialTimeStyle);
  const [isHidden, setHidden] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(timeUp));
    }, 1000);
    const hr = timeLeft.hours < 10 ? '0' + timeLeft.hours : timeLeft.hours;
    const min = timeLeft.minutes < 10 ? '0' + timeLeft.minutes : timeLeft.minutes;
    const sec = timeLeft.seconds < 10 ? '0' + timeLeft.seconds : timeLeft.seconds;
    document.title = hr && min && sec ? `${hr}:${min}:${sec}` : `${messageTimeUp}`;
    timeLeft.hours < 1 && timeLeft.minutes < 1 && timeLeft.seconds < 60 && setTimeStyle({ color: 'red' });
    return () => clearTimeout(timer);
  }, [timeLeft.hours, timeLeft.minutes, timeLeft.seconds, timeUp]);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval, index) => {
    timerComponents.push(
      <span key={interval.concat(index)}>
        {timeLeft[interval] < 10 && '0'}{timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  // const user = {
  //   'name': 'Alex',
  //   'address': '15th Park Avenue',
  //   'age': 43
  // }

  // const getValue = (key, object) => {
  //   const { [key]: returnValue } = object;
  //   return returnValue;
  // }
  // console.log('getValue ~ getValue', getValue('age', user))

  // const user = {
  //   'name': 'Alex',
  //   'address': '15th Park Avenue',
  //   'age': 43,
  //   'department': {
  //     'name': 'Sales',
  //     'Shift': 'Morning',
  //     'address': {
  //       'city': 'Bangalore',
  //       'street': '7th Residency Rd',
  //       'zip': 560001
  //     }
  //   }
  // }

  // const { department } = user;
  // console.log('App ~ department', department)

  $(document).on("dblclick", (event) => {
    event.preventDefault();
    setHidden(!isHidden);
    $('.torch').css({
      'top': event.pageY,
      'left': event.pageX,
      // 'cursor': `url(${flashlight}), auto;`
    });
  })

  $(document).on("mousemove", (event) => {
    event.preventDefault();
    if (isHidden) return;
    $('.torch').css({
      'top': event.pageY,
      'left': event.pageX,
      // 'cursor': `url(${flashlight}), auto;`
    });
  });

  return (
    <div className="noSelect" style={{ width: '100%', verticalAlign: 'middle', height: '100vh' }}>
      <Suspense fallback={<div>Loading...</div>}>
        <div style={{ margin: 'auto', width: '50%', textAlign: 'center', border: '2px solid green' }}>
          <h1>Đếm giờ ra về</h1>
          <TimePicker clearIcon='Reset' disableClock={true} onChange={setTimeUp} value={timeUp} />
          <h2 style={timeStyle}>
            {timerComponents.length ? timerComponents : <span style={{ color: 'red' }}>{messageTimeUp}</span>}
          </h2>
          <ChildComponent receiveData={setMessage} />
          <MessageComponent message={message} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ textAlign: 'left' }}>
            <img src={dog} alt='' className="imgBanner" hidden={isHidden}></img>
          </div>
          <div style={{ textAlign: 'left' }}>
            <img src={pvz1} alt='' className="imgBanner" hidden={isHidden}></img>
          </div>
          <div style={{ textAlign: 'right' }}>
            <img src={pvz} alt='' className="imgBanner" hidden={isHidden}></img>
          </div>
          <div style={{ textAlign: 'right' }}>
            <img src={dog2} alt='' className="imgBanner" hidden={isHidden}></img>
          </div>
        </div>
      </Suspense>
      <div className="torch" hidden={isHidden}></div>
    </div>
  );
}

const MessageComponent = props => <div style={{ marginBottom: '15px' }}>{props.message}</div>;

export default App;