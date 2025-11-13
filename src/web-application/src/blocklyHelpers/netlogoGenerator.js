import Blockly from 'blockly';

export const netlogoGenerator = new Blockly.Generator('NETLOGO');
/**
 * https://developer.mozilla.org/en/JavaScript/Reference/Operators/Operator_Precedence
 */
netlogoGenerator.ORDER_ATOMIC = 0;           // 0 "" ...
netlogoGenerator.ORDER_NEW = 1.1;            // new
netlogoGenerator.ORDER_MEMBER = 1.2;         // . []
netlogoGenerator.ORDER_FUNCTION_CALL = 2;    // ()
netlogoGenerator.ORDER_INCREMENT = 3;        // ++
netlogoGenerator.ORDER_DECREMENT = 3;        // --
netlogoGenerator.ORDER_BITWISE_NOT = 4.1;    // ~
netlogoGenerator.ORDER_UNARY_PLUS = 4.2;     // +
netlogoGenerator.ORDER_UNARY_NEGATION = 4.3; // -
netlogoGenerator.ORDER_LOGICAL_NOT = 4.4;    // !
netlogoGenerator.ORDER_TYPEOF = 4.5;         // typeof
netlogoGenerator.ORDER_VOID = 4.6;           // void
netlogoGenerator.ORDER_DELETE = 4.7;         // delete
netlogoGenerator.ORDER_AWAIT = 4.8;          // await
netlogoGenerator.ORDER_EXPONENTIATION = 5.0; // **
netlogoGenerator.ORDER_MULTIPLICATION = 5.1; // *
netlogoGenerator.ORDER_DIVISION = 5.2;       // /
netlogoGenerator.ORDER_MODULUS = 5.3;        // %
netlogoGenerator.ORDER_SUBTRACTION = 6.1;    // -
netlogoGenerator.ORDER_ADDITION = 6.2;       // +
netlogoGenerator.ORDER_BITWISE_SHIFT = 7;    // << >> >>>
netlogoGenerator.ORDER_RELATIONAL = 8;       // < <= > >=
netlogoGenerator.ORDER_IN = 8;               // in      
netlogoGenerator.ORDER_INSTANCEOF = 8;       // instanceof
netlogoGenerator.ORDER_EQUALITY = 9;         // == != === !==
netlogoGenerator.ORDER_BITWISE_AND = 10;     // &
netlogoGenerator.ORDER_BITWISE_XOR = 11;     // ^
netlogoGenerator.ORDER_BITWISE_OR = 12;      // |
netlogoGenerator.ORDER_LOGICAL_AND = 13;     // &&
netlogoGenerator.ORDER_LOGICAL_OR = 14;      // ||
netlogoGenerator.ORDER_CONDITIONAL = 15;     // ?:
netlogoGenerator.ORDER_ASSIGNMENT = 16;      // = += -= **= *= /= %= <<= >>= ...
netlogoGenerator.ORDER_YIELD = 17;           // yield
netlogoGenerator.ORDER_COMMA = 18;           // ,
netlogoGenerator.ORDER_NONE = 99;            // (...)
netlogoGenerator.INDENT = '  ';

netlogoGenerator.SIZE = {
    "SMALL": 1,
    "MEDIUM": 3,
    "BIG": 5
};

netlogoGenerator.PRODUCE = {
    "O2": "produce-o2",
    "GLUCOSECOMPLEX": "produce-glucose-complex",
    "GLUCOSE": "produce-glucose"
};

netlogoGenerator.BREAK = {
    "CO2": "break-apart-co2",
    "H2O": "break-apart-h2o"
};

netlogoGenerator.CONSUME = {
    "CO2": '"co2"',
    "GLUCOSECOMPLEX": '"glucose-complex"',
    "H2O": '"h2o"',
    "LIGHTENERGY": '"energy"'
};

netlogoGenerator.LIGHT = {
    "LAMP": "temperature",
    "LOW": 15,
    "MEDIUM": 30,
    "HIGH": 45
};

netlogoGenerator.SIZE_VIRUS = {
    "SMALL": 5,
    "MEDIUM": 8,
    "BIG": 12
};

netlogoGenerator.SIZE_ANIMAL = {
    "SMALL": 1,
    "MEDIUM": 1.5,
    "BIG": 2
};

netlogoGenerator.SIZE_EUTROPHICATION = {
    "SMALL": 5,
    "MEDIUM": 10,
    "BIG": 15
};

netlogoGenerator.HEATSIZE = {
    "SMALL": 0.2,
    "MEDIUM": 0.7,
    "BIG": 1
};
netlogoGenerator.SPEED = {
    "ZERO": 0,
    "PHOTOLOW": 2,
    "PHOTOMEDIUM": 10,
    "PHOTOHIGH": 35,
    "VERY_LOW": "10 - random (random-wiggle)",
    "LOW": "30 - random (random-wiggle)",
    "MEDIUM": "50 - random (random-wiggle)",
    "HIGH": "80 - random (random-wiggle)",
    "HIGH100": "100 - random (random-wiggle)",
    "TEMP": "initial-temperature - random (random-wiggle)",
    "WIND_SPEED": "wind-speed - random (random-wiggle)",
    "BAIXA": "30 - random (random-wiggle)",
    "MEDIA": "50 - random (random-wiggle)",
    "ALTA": "80 - random (random-wiggle)",

};
netlogoGenerator.SPEED_EUTROPHICATION = {
    "ZERO": 0,
    "SLOW": 0.5,
    "MEDIUM": 1,
    "FAST": 1.5
};
netlogoGenerator.MASS = {
    "LIGHT": 1,
    "MEDIUM": 2.5,
    "HEAVY": 10
};
netlogoGenerator.ARRANGEMENT = {
    "UNIFORM": 'setxy xcor ycor',
    "MESSY": 'ifelse (abs(xcor) > plate-size - 1) or (abs(ycor) > plate-size - 1) [\n' +
                 'if xcor >= plate-size [setxy xcor - ((random 30) / 20 ) ycor] \n'+
                 'if xcor <= ( - plate-size) [setxy xcor + ((random 30) / 20 ) ycor] \n'+
                 'if ycor <= ( - plate-size) [setxy xcor ycor + ((random 30) / 20 )] \n'+
                 'if ycor >= plate-size [setxy xcor ycor - ((random 30) / 20 )] \n'+
                 'set color green \n' +
                 '] \n'+
                 '[set color cyan \n setxy xcor + ((random 10) / 20) - ((random 10) / 20 ) ycor + ((random 10) / 20) - ((random 10) / 20)]\n',
};
netlogoGenerator.POSITION = {
    "RANDOM": "(min-pxcor + 5 + random-float (world-width - 10)) min-pycor + 5 + random-float (world-height - 10)",
    "CENTER": "0 0",
    "VERTICAL": "0 (-85 + random-float (170))",
    "HORIZONTAL": "(-85 + random-float (170)) 0",
    "MOUSE": "drop-with-mouse 500",
    "FIRE_BOTTOM": "(-51 + random-float 2) 0.99 * min-pycor", 
    "RANDOM_HEAT": "(random-float (2 * plate-size) ) - (plate-size ) (random-float (2 * plate-size)) - plate-size",
    "CENTER_HEAT": "0 0",
    "VERTICAL_HEAT": "0 (-5 + random-float (10))",
    "HORIZONTAL_HEAT": "(-5 + random-float (10)) 0"
};
netlogoGenerator.POSITION_WILDFIRES = { ...netlogoGenerator.POSITION };
netlogoGenerator.POSITION_WILDFIRES.RANDOM = "random-xcor random-ycor";
netlogoGenerator.HEADING = {
    "RANDOM": "random-float 360",
    "UP": "0 - (random-wiggle / 2) + random (random-wiggle)",
    "RIGHT": "90 - (random-wiggle / 2) + random (random-wiggle)",
    "DOWN": "180 - (random-wiggle / 2) + random (random-wiggle)",
    "LEFT": "270 - (random-wiggle / 2) + random (random-wiggle)",
    "WIND_DIRECTION": "wind-direction"
}
netlogoGenerator.DIRECTION = {
    "FORWARD": "dx dy",
    "UPWARD": "0 1",
    "RIGHTWARD": "1 0",
    "DOWNWARD": "0 -1",
    "LEFTWARD": "-1 0",
    "WIND": "sin wind-direction cos wind-direction"
}
netlogoGenerator.MAGNITUDE = {
    "MUCH_MORE": "10 - random (random-wiggle)",
    "MORE": "5 - random (random-wiggle)",
    "LITTLE_MORE": "3 - random (random-wiggle)",
    "SAME": "0",
    "WIND": "wind-speed"
}
netlogoGenerator.EFFECT = {
    "DIRECT": 1,
    "INVERSE": -1,
    "NOEFFECT": 0
}

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in objectaor function.
 * @private
 */
netlogoGenerator.addReservedWords(
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords
    'ask,set,go,turtle,patches,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,in,instanceof,new,return,super,switch,this,throw,try,typeof,var,void,while,with,yield,' +
    'enum,' +
    'implements,interface,let,package,private,protected,public,static,' +
    'await,' +
    'null,true,false,' +
    // Magic variable.
    'arguments,' +
    // Everything in the current environment (835 items in Chrome, 104 in Node).
    Object.getOwnPropertyNames(Blockly.utils.global).join(','));

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
netlogoGenerator.init = function (workspace) {
    // Create a dictionary of definitions to be printed before the code.
    netlogoGenerator.definitions_ = Object.create(null);
    // Create a dictionary mapping desired function names in definitions_
    // to actual function names (to avoid collisions with user functions).
    netlogoGenerator.functionNames_ = Object.create(null);

    if (!netlogoGenerator.nameDB_) {
        netlogoGenerator.nameDB_ =
            new Blockly.Names(netlogoGenerator.RESERVED_WORDS_);
    } else {
        netlogoGenerator.nameDB_.reset();
    }

    netlogoGenerator.nameDB_.setVariableMap(workspace.getVariableMap());

    let defvars = [];
    // Add developer variables (not created or named by the user).
    let devVarList = Blockly.Variables.allDeveloperVariables(workspace);
    for (let i = 0; i < devVarList.length; i++) {
        defvars.push(netlogoGenerator.nameDB_.getName(devVarList[i],
            Blockly.Names.DEVELOPER_VARIABLE_TYPE));
    }

    // Add user variables, but only ones that are being used.
    let variables = Blockly.Variables.allUsedVarModels(workspace);
    for (let i = 0; i < variables.length; i++) {
        defvars.push(netlogoGenerator.nameDB_.getName(variables[i].getId(),
            Blockly.VARIABLE_CATEGORY_NAME));
    }

    // Declare all of the variables.
    if (defvars.length) {
        netlogoGenerator.definitions_['variables'] =
            'let ' + defvars.join(', ') + ';';
    }
    this.isInitialized = true;
};

// Gets all code not just one set
netlogoGenerator.scrub_ = function (block, code, opt_thisOnly) {
    // console.log(code, block, opt_thisOnly)
    const nextBlock =
        block.nextConnection && block.nextConnection.targetBlock();
    let nextCode = '';
    if (nextBlock) {
        nextCode =
            // opt_thisOnly ? '' : ',\n' + netlogoGenerator.blockToCode(nextBlock);
            opt_thisOnly ? '' : netlogoGenerator.blockToCode(nextBlock);
    }
    return code + nextCode;
};
