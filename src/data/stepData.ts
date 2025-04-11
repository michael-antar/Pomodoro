const WORK_STEP = { type: 'work' };
const BREAK_STEP = { type: 'break' };

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