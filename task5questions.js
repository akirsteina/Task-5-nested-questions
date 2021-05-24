import readline from 'readline';
import { accessSync, readFileSync, writeFileSync } from 'fs';

const filePath = `${process.cwd()}/signups.json`;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const askQuestion1 = async() => {
    return new Promise((fulfill, reject) => {
        rl.question('Enter your first name: ', (firstName) => {
            if (firstName === '') {
                reject('Please fill the first name');
                return;
            }
            fulfill(firstName);
        })
    });
}

const askQuestion2 = async() => {
    return new Promise((fulfill, reject) => {
        rl.question('Enter your last name: ', (lastName) => {
            if (lastName === '') {
                reject('Please fill the last name');
                return;
            }
            fulfill(lastName);
        })
    });
}

const askQuestion3 = async() => {
    return new Promise((fulfill, reject) => {
        rl.question('Enter your email: ', (email) => {
            if (email === '') {
                reject('Please fill the email');
                return;
            }
            fulfill(email);
        })
    })
}

const askQuestion4 = async() => {
    return new Promise((fulfill, reject) => {
        rl.question('Enter your age: ', (age) => {
            if (age === '' || isNaN(age) === true || age <= 0) {
                reject('Age has to be over zero and a number');
                return;
            }
            fulfill(age);
        })
    })
}

const askQuestion5 = async() => {
    return new Promise((fulfill, reject) => {
        rl.question('Enter your address: ', (address) => {
            if (address === '') {
                reject('Please fill the address field');
                return;
            }
            fulfill(address);
        })
    })
}

try {
    accessSync(filePath);
    const jsonObject = readFileSync(filePath, 'utf8');
    const profile = JSON.parse(jsonObject);

    const firstName = await askQuestion1();
    const lastName = await askQuestion2();
    const email = await askQuestion3();
    const age = await askQuestion4();
    const address = await askQuestion5();

    const newLogEntry = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        age: age,
        address: address
    }

    profile.push(newLogEntry);
    writeFileSync(filePath, JSON.stringify(profile));

    console.log(`Data. First name: ${firstName}, last name: ${lastName}, email: ${email}, age: ${age}, address: ${address}`)
} catch (e) {
    console.log(`Whoops, something went wrong. The error is: ${e}`);
}

rl.close();