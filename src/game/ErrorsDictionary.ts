const ErrorsDictionary = {
    Tictactoe: {
        InvalidGridError: {
            UNEXPECTED_ROW_FORMAT: "Unexpected row format",
            UNEXPECTED_CELL_TYPE: "Unexpected cell type",
            UNEXPECTED_CELL_VALUE: "Unexpected cell value",
            GRID_SIZE_MISSMATCH: "Grid size missmatch",
            INVALID_VALUES_ASIGNED: "Invalid values asigned",
        },
        WinnerAnalizerError: {
            INVALID_BOARD_CONFIGURATION: "Invalid board configuration",
            UNDEFINED_NEIGHBOR_POSITION: "Undefined neighbor position",
            INVALID_DIRECTION: "Invalid direction",
        },
    },
};

export default ErrorsDictionary;