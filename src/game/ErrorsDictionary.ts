const ErrorsDictionary = {
    Tictactoe: {
        InvalidGridError: {
            GRID_ROWS_AMOUNT_MISSMATCH: "Grid rows ammount missmatch",
            ROW_TYPE_MISSMATCH: "Row type missmatch",
            ROW_SIZE_MISSMATCH: "Row size missmatch",
        },
        InvalidGridValueError: {
            GRID_VALUES_TYPE_MISSMATCH: "Grid values type missmatch",
            GRID_VALUES_OUT_OF_RANGE: "Grid values out of range",
        },
        WinnerAnalizerError: {
            INVALID_BOARD_CONFIGURATION: "Invalid board configuration",
            UNDEFINED_NEIGHBOR_POSITION: "Undefined neighbor position",
            INVALID_DIRECTION: "Invalid direction",
            INVALID_GRID_FORMATION: "Invalid grid formation",
        },
    },
};

export default ErrorsDictionary;