// Language Input

const programInput = '(* 7 2)';


const Op = Symbol('op');
const Num = Symbol('num');


// Lexical Analisis
const lex = (str) => str.split(' ')
                        .map(s => s.trim().replace(/\(|\)+/, ''))
                        .filter(s => s.length);

// Language Parser
const parse = (tokens) => {

  let c = 0;

  const peek = () => tokens[c];
  const consume = () => tokens[c++];

  const parseNum = () => ({ val: parseInt(consume()), type: Num });

  const parseOp = () => {
    const node = { val: consume(), type: Op, expr: [] };
    while (peek()) node.expr.push(parseExpr());
    return node;
  };

  const parseExpr = () => /\d/.test(peek()) ? parseNum() : parseOp();

  return parseExpr();
};

const transpile = (ast) => {
  
  const opMap = {
    '+': '+',
    '*': '*',
    '-': '-',
    '/': '/'
  };
  
  const transpileNode = (ast) => (ast.type === Num) ? transpileNum(ast) : transpileOp(ast);
  const transpileNum = (ast) => ast.val;
  const transpileOp = (ast) => `(${ast.expr.map(transpileNode).join(' ' + opMap[ast.val] + ' ')})`;
  
  return transpileNode(ast);
};


// Executing the language

const jscode = transpile(parse(lex(programInput)));
console.log(jscode);
console.log(eval(jscode));