let chai = require('chai');
let assert = chai.assert;
let Heap = require('../Heap');
describe('Heap', function() {
    describe('#size()', function() {
        let heap = new Heap(Heap.MAX_HEAP);
        it('should return 1 when #insert(data) has been run once', function() {
            heap.insert(1);
            assert.equal(heap.size(), 1);
        });
        it('should return 2 when #insert(data) has been run twice', function() {
            heap.insert(2);
            assert.equal(heap.size(), 2);
        });
        it('should return 10 when #insert(data) has been run 10 times', function() {
            [3,4,5,6,7,8,9,10].forEach(function(value) {
                heap.insert(value);
            });
            assert.equal(heap.size(), 10);
        });
    });
    
    describe('#peek()', function() {
        let heap = new Heap(Heap.MAX_HEAP);
        it('should have 1 at the top of the heap when its the largest value', function () {
            heap.insert(1);
            assert.equal(heap.peek(), 1);
        });
        it('should have 2 at the top of the heap when its the largest value', function() {
            heap.insert(2);
            assert.equal(heap.peek(), 2);
        });
        it('should have 3 at the top of the heap when its the largest value', function() {
            heap.insert(3);
            assert.equal(heap.peek(), 3);
        });
    });
    
    describe('#pop()', function() {
        let heap = new Heap(Heap.MAX_HEAP);
        it('should pop largest value (1) from the top of the heap and reduce its size by 1', function () {
            heap.insert(1);
            assert.equal(heap.size(), 1);
            assert.equal(heap.pop(), 1);
            assert.equal(heap.size(), 0);
        });
        it('should pop largest value (2) from the top of the heap and reduce its size by 1', function() {
            heap.insert(1).insert(2);
            assert.equal(heap.size(), 2);
            assert.equal(heap.pop(), 2);
            assert.equal(heap.size(), 1);
        });
        it('should pop largest value (3) from the top of the heap and reduce its size by 1', function() {
            heap.insert(3);
            assert.equal(heap.size(), 2);
            assert.equal(heap.pop(), 3);
            assert.equal(heap.size(), 1);
        });
    });
});