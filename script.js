//imports
const { fromEvent, interval, merge, EMPTY } = rxjs;
const { take } = rxjs.operators;

// getting html elements
const hours = document.getElementsByClassName("hour")[0];
const mins = document.getElementsByClassName("mins")[0];
const secs = document.getElementsByClassName("secs")[0];
const result = document.getElementsByClassName("result")[0];
const startBtn = document.getElementsByClassName("startBtn")[0];

//getting time input
const getTime = () => {
  let hrs = hours.value == '' ? 0 : hours.value * 60 * 60;
  let min = mins.value == '' ? 0 : mins.value * 60;
  let sec = secs.value == '' ? 0 : parseInt(secs.value);
  return hrs + min + sec;
};

//converting from seconds to hours, mins and seconds
const convertSeconds = (total) => {
  const hours = Math.floor(total / (60 * 60));
  const mins = Math.floor(total / 60) % 60;
  const seconds = Math.floor(total % 60);

  return { hours, mins, seconds };
};

const timeObservable = fromEvent(startBtn, "click");
const clock = convertSeconds(getTime());

let subscriber = null;

const subscription = timeObservable.subscribe(() => {
  if (subscriber){
    subscriber.unsubscribe();
  }

  const time = interval(1000)
  const startValue = getTime();
  const timer = time.pipe(take(getTime()));

  subscriber = timer.subscribe((x) => {
    const clock = convertSeconds(startValue - x);
    result.classList.add('clock')
    result.innerHTML =
      (clock.hours > 0 ? clock.hours  + "h " : '') + 
      (clock.mins == 60 ? 0 : clock.mins) + "m " +
      clock.seconds + "s";
  });
});