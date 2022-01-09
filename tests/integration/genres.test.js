const app = require('../../index');
const request = require('supertest');
const {Genre} = require('../../models/genre');
const mongoose = require('mongoose');
const config = require('config');
// const { before } = require('lodash');
const db = config.get('db');

mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true })

describe('/api/genres', () => {
    let server;
    beforeAll(async () => {
        await Genre.deleteMany({});
        server = await app.listen(3001);
    });

    afterAll(async (done) => {
        await Genre.deleteMany({});
        await server.close(done);
    });

    describe('GET /', () => {
        it('should return all genres', async () => {
            // jest.setTimeout(10000)
            const genre = await Genre.create([
                { name: 'genre1' },
                { name: 'genre2' }
            ]);

            // const res = await request(app).get('/api/genres');
            await request(app).get('/api/genres')
                .expect(200)
                .then((response) => {
                    expect(response.body.length).toBe(2);
                    expect(response.body.some(g => g.name === 'genre1')).toBeTruthy();
                    expect(response.body.some(g => g.name === 'genre2')).toBeTruthy();
                })
        })
    });

    describe('GET /:id', () => {
        it('should return a particular genre', async() => {
            const genre = new Genre({ name: 'genre1'});
            await genre.save();
    
            const res = await request(app).get('/api/genres' + genre._id)
            expect(res.status).toBe(200);
            // expect(1).toBe(1);
        })
    })
})



