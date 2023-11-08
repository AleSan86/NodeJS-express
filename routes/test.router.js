import { Router } from "express";

export const testRouter = Router();

testRouter.get("/operation/simple", (req, res) => {
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
        sum += i;
    };
    res.send({sum});
});

testRouter.get("/operation/complex", (req, res) => {
    let sum = 0;
    for (let i = 0; i < 5e8; i++) {
        sum += i;
    }
    res.send({sum});
});