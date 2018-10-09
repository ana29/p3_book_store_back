const app = require('../app');
const express = require('express');
const assert    = require("assert");
const request = require('supertest');
const mongoose  = require('mongoose');
const userId    = new mongoose.Types.ObjectId;
const server    = request.agent('http://localhost:3000');


const prepareData = async () => {
    runTests();
};


const runTests = () => {

    describe('Create User', () => {
        let user = {
            "name":	"ana",
            "password":	"aaaaaa",
            "age":	18,
            "phone":"(99) 9999-9999",
            "email":"a@a.a"
        };
        it('respond with 200 created', (done) => {
            request(express)
                .post('/api/users')
                .send(user)
                .set('Error: Bad Request', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });


    describe('Delete User', () => {
        it('Check if user was deleted', (done) => {
            server
                .delete('/api/users/' + userId.toString())
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
        });
    });
};

prepareData();