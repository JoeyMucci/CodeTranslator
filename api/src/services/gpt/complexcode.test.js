import { runTranslation } from './gpt.js'

describe('Language Detection', () => {
  it('C++ code is not reconized as C code', async () => {
    const code = `#include <iostream>
    #include <string>
    using namespace std;

    string mysteryFun(string a) {
      if (a == "") {
            return a;
      }
      return mysteryFun(a.substr(1)) + a[0];
    }

    int main() {
      cout << mysteryFun("racecar") << endl;
      return 0;
    }`
    const newcode = await runTranslation({ fromLanguage: 'C++', toLanguage: 'Rust', code: code })
    if (!newcode.includes('!print')) expect(newcode).toContain('println!') // translation is successful under normal circumstances
    return expect(async () => {
      await runTranslation({ fromLanguage: 'C', toLanguage: 'Rust', code: code })
    }).rejects.toThrow('Wrong language')
  }, 100000)
})

describe('Structure detection', () => {
  it('Python dictionaries are mapped to Java maps', async () => {
    const code = `mystr = 'jhgfdxcvgtfrdfcvghy'

    letterCounts = {}

    for letter in mystr:
        if letter in letterCounts:
            letterCounts[letter] += 1
        else: letterCounts[letter] = 1


    print(letterCounts)`
    const newcode = await runTranslation({ fromLanguage: 'Python', toLanguage: 'Java', code: code })
    expect(newcode).toContain('HashMap')
  })

  it('Do while loops in go appropriately mapped to languages without do while loop', async () => {
    const code = `<?php
      $i = 0;
      do {
          echo "ananas\n";
          $i++;
      } while ($i < 10);
    ?>`
    const newcode = await runTranslation({ fromLanguage: 'PHP', toLanguage: 'Go', code: code })

    if (!newcode.includes('while')) expect(newcode).toContain('for')
  })

  it('Adapts different error handling functionality', async () => {
    const code = `// code from official rust documentation

    fn drink(beverage: &str) {
        // You shouldn't drink too much sugary beverages.
        if beverage == "lemonade" { panic!("AAAaaaaa!!!!"); }

        println!("Some refreshing {} is all I need.", beverage);
    }

    fn main() {
        drink("water");
        drink("lemonade");
        drink("still water");
    }`
    const newcode = await runTranslation({ fromLanguage: 'Rust', toLanguage: 'R', code: code })
    expect(newcode).toContain('stop')
  })

  it('Non query code is converted to SQL somewhat sensibly', async () => {
    const code = `public static int findMax(int a, int b, int c) {
      if(a > b) {
          if(a > c) {
              return a;
          } else {
              return c;
          }
      } else {
          if(b > c) {
              return b;
          } else {
              return c;
          }
      }
    }`
    const newcode = await runTranslation({ fromLanguage: 'Java', toLanguage: 'SQL', code: code })
    expect(newcode).toContain('CREATE FUNCTION')
    expect(newcode).toContain('IF')
    expect(newcode).toContain('ELSE')
    expect(newcode).toContain('END')
  })
})
