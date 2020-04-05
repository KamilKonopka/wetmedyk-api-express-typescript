import express from 'express';

export const router = express.Router();
const employees = ['user1', 'user2', 'user3'];

router.get('/', (req, res) => {
    res.send(employees);
});

router.get('/:id', ((req, res) => {
    res.send(employees.find(el => el.endsWith(req.params.id)));
}));
