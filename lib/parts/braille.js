// adapated from work by jaqtikkun
// http://www.thingiverse.com/jaqtikkun/about

// TODOS:
// - braille contractions

var S = require('openscad');

var part = exports;

part.info = {
    name: 'braille',
    author: 'doubleshow',
    version: '1.0.0',
    examples: [{
        description: 'hello',
        parameters: {
            text: 'hello'
        }
    }, {
        description: '12345',
        parameters: {
            text: '12345'
        }
    }]
};

var radius = 0.3;
var spacing = 1.5;
var distance = 3 + spacing;

var plate_height = 10;
var plate_thickness = 2;

part.generate = function(parameters) {
    // console.log(params.val)
    var params = parameters;
    var text = params.text || '';
    text = text.toUpperCase();
    var csg = braille_str(text);

    // csg = csg.rotateZ(90);
    csg.addMarker('base', [0, 0, 0]);
    return csg.center(true);
}

function braille_str(text) {
    var csgs = new Array();

    // tokens - this needs to be placed by code to compute contractions
    var tokens = text;

    for (var i = 0; i < tokens.length; i = i + 1) {
        if (tokens[i] == ' ') {
            // space, do nothing
        } else {
            var csg = braille_char(tokens[i]);
            csg = csg.translate([i * distance, 0, 0]);
            csg = S.color('black', csg);
            csgs.push(csg);
        }
    }
    return S.group(csgs);
}

function letter(bitmap) {
    var row_size = 2;
    var col_size = 3;
    var bitmap_size = row_size * col_size;

    function loc_y(loc) {
        return Math.floor(loc / row_size) * spacing + spacing;
    }

    function loc_x(loc) {
        return loc % row_size * spacing + (distance - spacing) / 2;
    }

    var bits = new Array();
    for (var loc = 0; loc < bitmap_size; loc = loc + 1) {
        if (bitmap[loc] != 0) {
            var bit = S.sphere({
                    r: radius * bitmap[loc],
                    center: true,
                    fn: 10
                })
                .translate([loc_x(loc), loc_y(loc), 0]);
            bits.push(bit);
        }
    }
    return S.group(bits);
}

function braille_char(char) {
    if (char == "A") {
        return letter([
            1, 0,
            0, 0,
            0, 0
        ]);
    } else if (char == "B") {
        return letter([
            1, 0,
            1, 0,
            0, 0
        ]);
    } else if (char == "C") {
        return letter([
            1, 1,
            0, 0,
            0, 0
        ]);
    } else if (char == "D") {
        return letter([
            1, 1,
            0, 1,
            0, 0
        ]);
    } else if (char == "E") {
        return letter([
            1, 0,
            0, 1,
            0, 0
        ]);
    } else if (char == "F") {
        return letter([
            1, 1,
            1, 0,
            0, 0
        ]);
    } else if (char == "G") {
        return letter([
            1, 1,
            1, 1,
            0, 0
        ]);
    } else if (char == "H") {
        return letter([
            1, 0,
            1, 1,
            0, 0
        ]);
    } else if (char == "I") {
        return letter([
            0, 1,
            1, 0,
            0, 0
        ]);
    } else if (char == "J") {
        return letter([
            0, 1,
            1, 1,
            0, 0
        ]);
    } else if (char == "K") {
        return letter([
            1, 0,
            0, 0,
            1, 0
        ]);
    } else if (char == "L") {
        return letter([
            1, 0,
            1, 0,
            1, 0
        ]);
    } else if (char == "M") {
        return letter([
            1, 1,
            0, 0,
            1, 0
        ]);
    } else if (char == "N") {
        return letter([
            1, 1,
            0, 1,
            1, 0
        ]);
    } else if (char == "O") {
        return letter([
            1, 0,
            0, 1,
            1, 0
        ]);
    } else if (char == "P") {
        return letter([
            1, 1,
            1, 0,
            1, 0
        ]);
    } else if (char == "Q") {
        return letter([
            1, 1,
            1, 1,
            1, 0
        ]);
    } else if (char == "R") {
        return letter([
            1, 0,
            1, 1,
            1, 0
        ]);
    } else if (char == "S") {
        return letter([
            0, 1,
            1, 0,
            1, 0
        ]);
    } else if (char == "T") {
        return letter([
            0, 1,
            1, 1,
            1, 0
        ]);
    } else if (char == "U") {
        return letter([
            1, 0,
            0, 0,
            1, 1
        ]);
    } else if (char == "V") {
        return letter([
            1, 0,
            1, 0,
            1, 1
        ]);
    } else if (char == "W") {
        return letter([
            0, 1,
            1, 1,
            0, 1
        ]);
    } else if (char == "X") {
        return letter([
            1, 1,
            0, 0,
            1, 1
        ]);
    } else if (char == "Y") {
        return letter([
            1, 1,
            0, 1,
            1, 1
        ]);
    } else if (char == "Z") {
        return letter([
            1, 0,
            0, 1,
            1, 1
        ]);
    } else if (char == "CH") {
        return letter([
            1, 0,
            0, 0,
            0, 1
        ]);
    } else if (char == "SH") {
        return letter([
            1, 1,
            0, 0,
            0, 1
        ]);
    } else if (char == "TH") {
        return letter([
            1, 1,
            0, 1,
            0, 1
        ]);
    } else if (char == "WH") {
        return letter([
            1, 0,
            0, 1,
            0, 1
        ]);
    } else if (char == "OU") {
        return letter([
            1, 0,
            1, 1,
            0, 1
        ]);
    } else if (char == "ST") {
        return letter([
            0, 1,
            0, 0,
            1, 0
        ]);
    } else if (char == "AND") {
        return letter([
            1, 1,
            1, 0,
            1, 1
        ]);
    } else if (char == "FOR") {
        return letter([
            1, 1,
            1, 1,
            1, 1
        ]);
    } else if (char == "OF") {
        return letter([
            1, 0,
            1, 1,
            1, 1
        ]);
    } else if (char == "THE") {
        return letter([
            0, 1,
            1, 0,
            1, 1
        ]);
    } else if (char == "WITH") {
        return letter([
            0, 1,
            1, 1,
            1, 1
        ]);
    } else if (char == "IN") {
        return letter([
            0, 0,
            0, 1,
            1, 0
        ]);
    } else if (char == "EN") {
        return letter([
            0, 0,
            1, 0,
            0, 1
        ]);
    } else if (char == "CON") {
        return letter([
            0, 0,
            1, 1,
            0, 0
        ]);
    } else if (char == "DIS") {
        return letter([
            0, 0,
            1, 1,
            0, 1
        ]);
    } else if (char == "COM") {
        return letter([
            0, 0,
            0, 0,
            1, 1
        ]);
    } else if (char == "BE") {
        return letter([
            0, 0,
            1, 0,
            1, 0
        ]);
    } else if (char == "EA") {
        return letter([
            0, 0,
            1, 0,
            0, 0
        ]);
    } else if (char == "BB") {
        return letter([
            0, 0,
            1, 0,
            1, 0
        ]);
    } else if (char == "CC") {
        return letter([
            0, 0,
            1, 1,
            0, 0
        ]);
    } else if (char == "DD") {
        return letter([
            0, 0,
            1, 1,
            0, 1
        ]);
    } else if (char == "FF") {
        return letter([
            0, 0,
            1, 1,
            1, 0
        ]);
    } else if (char == "GG") {
        return letter([
            0, 0,
            1, 1,
            1, 1
        ]);
    } else if (char == "AR") {
        return letter([
            0, 1,
            0, 1,
            1, 0
        ]);
    } else if (char == "BLE") {
        return letter([
            0, 1,
            0, 1,
            1, 1
        ]);
    } else if (char == "ED") {
        return letter([
            1, 1,
            1, 0,
            0, 1
        ]);
    } else if (char == "ER") {
        return letter([
            1, 1,
            1, 1,
            0, 1
        ]);
    } else if (char == "GH") {
        return letter([
            1, 0,
            1, 0,
            0, 1
        ]);
    } else if (char == "ING") {
        return letter([
            0, 1,
            0, 0,
            1, 1
        ]);
    } else if (char == "OW") {
        return letter([
            0, 1,
            1, 0,
            0, 1
        ]);
    } else if (char == "cap") {
        return letter([
            0, 0,
            0, 0,
            0, 1
        ]);
    } else if (char == "#") {
        return letter([
            0, 1,
            0, 1,
            1, 1
        ]);
    } else if (char == "let") {
        return letter([
            0, 0,
            0, 1,
            0, 1
        ]);
    } else if (char == ".") {
        return letter([
            0, 0,
            1, 1,
            0, 1
        ]);
    } else if (char == "?") {
        return letter([
            0, 0,
            1, 0,
            1, 1
        ]);
    } else if (char == "!") {
        return letter([
            0, 0,
            1, 1,
            1, 0
        ]);
    } else if (char == "-") {
        return letter([
            0, 0,
            0, 0,
            1, 1
        ]);
    } else if (char == "quote") {
        return letter([
            0, 0,
            0, 1,
            1, 1
        ]);
    } else if (char == "1") {
        return letter([
            1, 0,
            0, 0,
            0, 0
        ]);
    } else if (char == "2") {
        return letter([
            1, 0,
            1, 0,
            0, 0
        ]);
    } else if (char == "3") {
        return letter([
            1, 1,
            0, 0,
            0, 0
        ]);
    } else if (char == "4") {
        return letter([
            1, 1,
            0, 1,
            0, 0
        ]);
    } else if (char == "5") {
        return letter([
            1, 0,
            0, 1,
            0, 0
        ]);
    } else if (char == "6") {
        return letter([
            1, 1,
            1, 0,
            0, 0
        ]);
    } else if (char == "7") {
        return letter([
            1, 1,
            1, 1,
            0, 0
        ]);
    } else if (char == "8") {
        return letter([
            1, 0,
            1, 1,
            0, 0
        ]);
    } else if (char == "9") {
        return letter([
            0, 1,
            1, 0,
            0, 0
        ]);
    } else if (char == "0") {
        return letter([
            0, 1,
            1, 1,
            0, 0
        ]);
    } else if (char == " ") {
        return letter([
            0, 0,
            0, 0,
            0, 0
        ]);
    } else {
        console.log("Invalid Character: ", char);
    }

}