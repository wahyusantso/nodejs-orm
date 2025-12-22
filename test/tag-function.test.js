function tagFunction(array, ...args) { 
    console.info(array);
    console.info(args);
 }

test('tagFunction', () => {
    const name = 'Alice';

    tagFunction`Hello, ${name}! How are you?`;
    tagFunction`Bye, ${name}. See you later!`;
});

test('Tag function sql', () => {
    const name = 'Bob';
    const age = 30;

    // implementasi tagFunction di SQL query, untuk safe query dan tidak rentan terhadap SQL Injection
    tagFunction`SELECT * FROM users WHERE name = ${name} AND age = ${age}`;
});