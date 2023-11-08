import { faker } from '@faker-js/faker';

export const fakeUser = (req, res) => {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email();
    let age = faker.random.numeric(2);
    let password = faker.internet.password();
    res.send({ firstName, lastName, email, age, password });
};