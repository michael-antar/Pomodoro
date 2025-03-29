const WORK_STEP = { name: 'pomodoro', duration: 15, color: '#FF6347' };
const SHORT_BREAK_STEP = { name: 'short break', duration: 3, color: '#27BAAE' };
const LONG_BREAK_STEP = { name: 'long break', duration: 6, color: '#34EBA4' };

export const steps = [
    {...WORK_STEP, id: 0},
    {...SHORT_BREAK_STEP, id: 1},
    {...WORK_STEP, id: 2},
    {...SHORT_BREAK_STEP, id: 3},
    {...WORK_STEP, id: 4},
    {...SHORT_BREAK_STEP, id: 5},
    {...WORK_STEP, id: 6},
    {...LONG_BREAK_STEP, id: 7}
];