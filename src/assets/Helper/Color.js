const Spec = [
    // --------------------------------------
    // Whitespace:
    [/^\s+/, null],

    // --------------------------------------
    // Comments:

    // Skip single-line comments:
    [/^\/\/.*/, null],

    // Skip multi-line comments:
    [/^\/\*[\s\S]*?\*\//, null],

    // --------------------------------------
    // Symbols and delimiters:
    [/^;/, ';'],  // Semicolon
    [/^{/, '{'],  // LeftBrace
    [/^}/, '}'],  // RightBrace
    [/^\(/, '('], // LeftParen
    [/^\)/, ')'], // RightParen
    [/^\[/, '['], // LeftBracket
    [/^\]/, ']'], // RightBracket
    [/^,/, ','],  // Comma
    [/^\./, '.'], // Dot
    [/^\?/, '?'], // Question Mark
    [/^:/, ':'],   // Colon


    // Relational Operators
    // <, >, <=, >=
    [/^[<>]=?/, 'RELATIONAL_OPERATOR'],
    [/^[=!]=/, 'EQUALITY_OPERATOR'],

    // Logical Operators
    // ||, &&, !
    [/^&&/, 'LOGICAL_AND'],
    [/^\|\|/, 'LOGICAL_OR'],
    [/^!/, 'LOGICAL_NOT'],


    // --------------------------------------
    // Keywords
    [/^\blet\b/, 'blue'],
    [/^\bif\b/, 'if'],
    [/^\belif\b/, 'elif'],
    [/^\belse\b/, 'else'],
    [/^\btrue\b/, 'true'],
    [/^\bfalse\b/, 'false'],
    [/^\bnull\b/, 'null'],

    // --------------------------------------
    // OOP keywords
    [/^\bclass\b/, 'class'],
    [/^\bthis\b/, 'this'],
    [/^\bextends\b/, 'extends'],
    [/^\bsuper\b/, 'super'],
    [/^\bnew\b/, 'new'],

    // --------------------------------------
    // Iterators
    [/^\bwhile\b/, 'while'],
    [/^\bdo\b/, 'do'],
    [/^\bfor\b/, 'for'],

    [/^\bdef\b/, 'def'],
    [/^\breturn\b/, 'return'],

    // --------------------------------------
    // Assignment operators: =, *=, /=, +=, -=
    [/^=/, 'SIMPLE_ASSIGN'],
    [/^[\*\\/\+\-]=/, 'COMPLEX_ASSIGN'],

    // --------------------------------------
    // Math operators: +, -, *, /, %
    [/^[+\-]/, 'ADDITIVE_OPERATOR'],
    [/^[*\/]/, 'MULTIPLICATIVE_OPERATOR'],
    [/^%/, 'MODULO_OPERATOR'],

    // --------------------------------------
    // Numbers:
    [/^\d+/, 'NUMBER'],

    // --------------------------------------
    // Double quoted String:
    [/^"[^"]*"/, 'STRING'],

    // --------------------------------------
    // Single quoted String:
    [/^'[^']*'/, 'STRING'],

    // --------------------------------------
    // Identifier
    [/^\w+/, 'IDENTIFIER'],
];

export class Color {

    init(string) {
        this._string = string;
        this._cursor = 0;
        this._curr = 0;
    }

    isEOF() {
        return this._cursor == this._string.length;
    }

    hasMoreTokens() {
        return this._cursor < this._string.length;
    }

    getColor() {
       let token = this.getNextToken();
       console.log('================');
       while(token != null) {
        console.log(token);
         token = this.getNextToken();
       }
       return this._string;
    }

    getNextToken() {
        if (!this.hasMoreTokens) return null;

        const string = this._string.slice(this._cursor);

        for (const [regexp, tokenType] of Spec) {
            const tokenValue = this._match(regexp, string);

            if (tokenValue == null) continue;

            if (tokenType == null) {
                return this.getNextToken();
            }
            
            this._makeNewString(tokenValue);

            return {
                tokenType,
                cursor: this._cursor
            };

        }
    }

    _match(regexp, string) {
        const matched = regexp.exec(string);

        if (matched == null) return null;

        this._cursor += matched[0].length;

        return matched[0];
    }

    _makeNewString(tokenValue) {
        let s = '';
        for(let i=0; i<this._curr; i++){
            s+=this._string[i];
        }

        let addSpan = `<span className='abc'>${tokenValue}</span>`
        s+=addSpan;
        for(let i=this._cursor; i<this._string.length; i++){
            s+=this._string[i];
        }
        this._cursor = this._curr + addSpan.length;
        this._curr = this._cursor;
        this._string = s;
    }
}