import highlight from '@babel/highlight';

const code = `class Foo {
  constructor()
}`;

const result = highlight(code, { forceColor: true });
