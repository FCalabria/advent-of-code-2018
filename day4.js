const input = require('./inputs.js').day4;

/**
 * Common functions
 */

function getDateFromInput(stringInput) {
  const dateRegex = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}/;
  return new Date(stringInput.match(dateRegex));
}
function sortByDate(input) {
  return input.sort((a, b) => getDateFromInput(a) - getDateFromInput(b));
}
function getLogMinute(logEntry) {
  return parseInt(/:(\d{2})/.exec(logEntry)[1]);
}

/**
 * Part 1
 */

function getGuardData(input) {
  let mostTimeAsleepId;
  const sortedInput = sortByDate(input);
  function getGuardsSleptRanges(log) {
    let guardActive;
    let asleepMinute;
    
    function changeTurn(logEntry, guardsInfo) {
      const guardIdMatch = /#(\d+)\s/.exec(logEntry);
      guardActive = guardIdMatch[1];
      if (!guardsInfo[guardActive]) {
        guardsInfo[guardActive] = { totalMinutesAsleep: 0, topSleepingMinute: undefined, detail: {} };
      }
    }
    function markAsleep(logEntry) {
      asleepMinute = getLogMinute(logEntry);
    }
    function markAwake(logEntry, guardsInfo) {
      const guard = guardsInfo[guardActive];
      const detail = guard.detail;
      const awakeMinute = getLogMinute(logEntry);
      for (let i = asleepMinute; i < awakeMinute; i++) {
        guard.totalMinutesAsleep++;
        if (!detail[i]) {
          detail[i] = 1;
        } else {
          detail[i]++;
        }
        if (guard.topSleepingMinute === undefined || detail[i] > detail[guard.topSleepingMinute]) {
          guard.topSleepingMinute = i;
        }
      }
      asleepMinute = undefined;
    }
    function setMostTimeAsleep(guardsInfo) {
      if (!mostTimeAsleepId) {
        mostTimeAsleepId = guardActive;
        return;
      }
      const currentAsleepTime = guardsInfo[guardActive].totalMinutesAsleep;
      const mostTimeAsleepTime = guardsInfo[mostTimeAsleepId].totalMinutesAsleep;
      if(currentAsleepTime > mostTimeAsleepTime) {
        mostTimeAsleepId = guardActive;
      }
    }
    return log.reduce((guardsInfo, logEntry) => {
      switch (/\] (\w)/.exec(logEntry)[1]) {
        case 'G':
          changeTurn(logEntry, guardsInfo);
          break;
        case 'f':
          markAsleep(logEntry);
          break;
        case 'w':
          markAwake(logEntry, guardsInfo);
          setMostTimeAsleep(guardsInfo);
          break;
      }
      return guardsInfo;
    }, {});
  }
  const choosenGuardInfo = getGuardsSleptRanges(sortedInput)[mostTimeAsleepId];
  return choosenGuardInfo.topSleepingMinute * mostTimeAsleepId;
}

/**
 * Part 2
 */

function getGuardData2(input) {
  let mostTimeAsleepId;
  let mostTimeAsleepTime = 0;
  const sortedInput = sortByDate(input);
  function getGuardsSleptRanges(log) {
    let guardActive;
    let asleepMinute;
    
    function changeTurn(logEntry, guardsInfo) {
      const guardIdMatch = /#(\d+)\s/.exec(logEntry);
      guardActive = guardIdMatch[1];
      if (!guardsInfo[guardActive]) {
        guardsInfo[guardActive] = { topSleepingMinute: undefined, detail: {} };
      }
    }
    function markAsleep(logEntry) {
      asleepMinute = getLogMinute(logEntry);
    }
    function markAwake(logEntry, guardsInfo) {
      const guard = guardsInfo[guardActive];
      const detail = guard.detail;
      const awakeMinute = getLogMinute(logEntry);
      for (let i = asleepMinute; i < awakeMinute; i++) {
        if (!detail[i]) {
          detail[i] = 1;
        } else {
          detail[i]++;
        }
        if (guard.topSleepingMinute === undefined || detail[i] > detail[guard.topSleepingMinute]) {
          guard.topSleepingMinute = i;
        }
      }
      asleepMinute = undefined;
    }
    function setMostTimeAsleep(guardsInfo) {
      if (!mostTimeAsleepId) {
        mostTimeAsleepId = guardActive;
        return;
      }
      const currentAsleepTopMinute = guardsInfo[guardActive].topSleepingMinute;
      const currentAsleepTime = guardsInfo[guardActive].detail[currentAsleepTopMinute];
      if(currentAsleepTime > mostTimeAsleepTime) {
        mostTimeAsleepId = guardActive;
        mostTimeAsleepTime = currentAsleepTime;
      }
    }
    return log.reduce((guardsInfo, logEntry) => {
      switch (/\] (\w)/.exec(logEntry)[1]) {
        case 'G':
          changeTurn(logEntry, guardsInfo);
          break;
        case 'f':
          markAsleep(logEntry);
          break;
        case 'w':
          markAwake(logEntry, guardsInfo);
          setMostTimeAsleep(guardsInfo);
          break;
      }
      return guardsInfo;
    }, {});
  }
  const choosenGuardInfo = getGuardsSleptRanges(sortedInput)[mostTimeAsleepId];
  return choosenGuardInfo.topSleepingMinute * mostTimeAsleepId;
}

 const smallInput = ["[1518-11-01 00:00] Guard #10 begins shift", "[1518-11-01 00:05] falls asleep", "[1518-11-01 00:25] wakes up", "[1518-11-01 00:30] falls asleep", "[1518-11-01 00:55] wakes up", "[1518-11-01 23:58] Guard #99 begins shift", "[1518-11-02 00:40] falls asleep", "[1518-11-02 00:50] wakes up", "[1518-11-03 00:05] Guard #10 begins shift", "[1518-11-03 00:24] falls asleep", "[1518-11-03 00:29] wakes up", "[1518-11-04 00:02] Guard #99 begins shift", "[1518-11-04 00:36] falls asleep", "[1518-11-04 00:46] wakes up", "[1518-11-05 00:03] Guard #99 begins shift", "[1518-11-05 00:45] falls asleep", "[1518-11-05 00:55] wakes up"];
 console.log(getGuardData2(input));
