'use strict';

var recast = require('recast');
var traverse = require('ast-traverse');
var inflect = require('i')();

var parse = exports.parse = function (code) {
  return recast.parse(code);
};

var convert = exports.convert = function (ast) {
  if (typeof ast === 'string') {
    return recast.parse(ast);
  }

  return ast;
};

var insert = exports.insert = function (target, nodes, index) {
  // console.log('target', target);
  target.splice.apply(target, [index || 0, 0].concat(nodes));

  return target;
};

var createImport = exports.createImport = function (varname, modulename, subTree) {
  if (!subTree || subTree.length === 0) {
    return parse('import ' + varname + ' from \'' + modulename + '\';\n').program.body;
  } else {
    var importStatement = 'import ' + varname + ', { ' + subTree + ' } from \'' + modulename + '\';\n';
    return parse(importStatement).program.body;
  }
};

var findFirstNodeAfter = exports.findFirstNodeAfter = function (ast, code, type) {
  var next = false;
  var result = null;

  traverse(ast, {
    pre: function pre(node) {
      // console.log('node', node);
      if (node && node.type !== 'Line' && node.type !== 'Block' && recast.print(node).code === code) {
        next = true;
      }

      if (!result && next && (!type || node.type === type)) {
        next = false;
        result = node;
      }
    }
  });

  return result;
};

exports.print = function (ast) {
  return recast.print(ast).code;
};

exports.addToArrayInObject = function (ast, objectCode, key, code) {
  ast = convert(ast);

  var objectAst = findFirstNodeAfter(ast, objectCode, 'ObjectExpression');
  var ran = false;

  if (objectAst === null) {
    throw new Error('Could not find any object ' + objectCode);
  }

  traverse(objectAst, {
    pre: function pre(node, parent) {
      if (node.type === 'ArrayExpression' && parent.key.name === key) {
        insert(node.elements, parse(code).program.body, node.elements.length);
        ran = true;
      }
    }
  });

  if (!ran) {
    throw new Error('Could not find an array for object key ' + key + ' to insert ' + code);
  }

  return ast;
};

exports.addLastInFunction = function (ast, search, code) {
  var node = findFirstNodeAfter(ast, search, 'FunctionExpression');

  if (node === null) {
    throw new Error('No function expression found after ' + search);
  }

  var nodes = node.body.body;

  insert(nodes, parse(code).program.body, nodes.length);

  return ast;
};

exports.addImport = function (ast, varname, modulename, subTree, position) {
  varname = inflect.camelize(inflect.underscore(varname), false);

  ast = convert(ast);

  var index = 0 + position;
  var nodes = ast.program.body;

  if (nodes && nodes[0] && nodes[0].expression && nodes[0].expression.raw.indexOf('use strict') !== -1) {
    index = 1 + position;
  }

  insert(nodes, createImport(varname, modulename, subTree), index);

  return ast;
};