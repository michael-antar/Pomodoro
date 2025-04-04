const WORK_STEP = { name: 'pomodoro', color: '#FF6347' };
const BREAK_STEP = { name: 'break', color: '#27BAAE' };

export const initialSteps = [
    {...WORK_STEP, duration: 15, id: 0},
    {...BREAK_STEP, duration: 3, id: 1},
    {...WORK_STEP, duration: 15, id: 2},
    {...BREAK_STEP, duration: 3, id: 3},
    {...WORK_STEP, duration: 15, id: 4},
    {...BREAK_STEP, duration: 3, id: 5},
    {...WORK_STEP, duration: 15, id: 6},
    {...BREAK_STEP, duration: 6, id: 7}
];