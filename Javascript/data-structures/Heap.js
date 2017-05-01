class Heap {
    constructor(type) {
        if (type != Heap.MAX_HEAP && type != Heap.MAX_HEAP) {
            throw {reason: 'Invalid Heap type specified!'};
        }
        this.heapType = type;
        this.internalArray = [];
    }
     
    insert(data) {
        this.internalArray.push(data);
        this._siftUp(this.internalArray.length - 1);
        return this;
    }
    
    peek() {
        if (this.internalArray.length) {
            return this.internalArray[0];
        } else {
            return null;
        }
    }
    
    pop() {
        if (this.internalArray.length) {
            let returnVal = this.internalArray[0];
            this._switchValues(0, this.internalArray.length - 1);
            this.internalArray.splice(this.internalArray.length - 1, 1);
            this._siftDown(0);
            return returnVal;
        } else {
            return null;
        }
    }

    size() {
        return this.internalArray.length;
    }
 
    _siftUp(index) {
        let parentIndex = this._getParentIndex(index);
        if (parentIndex !== null) {
            if ((this.heapType == Heap.MAX_HEAP && this.internalArray[parentIndex] < this.internalArray[index]) || 
                (this.heapType == Heap.MIN_HEAP && this.internalArray[parentIndex] > this.internalArray[index])) {
                this._switchValues(index, parentIndex);
                this._siftUp(parentIndex);        
            }
        }
    }
    
    _siftDown(index) {
        let childIndex1 = 2*index + 1, childIndex2 = 2*index +2;
        let indexToCheck = null;
        if (childIndex1 < this.internalArray.length && childIndex2 >= this.internalArray.length) {
            indexToCheck = childIndex1;
        } else if (childIndex2 < this.internalArray.length && childIndex1 >= this.internalArray.length) {
            indexToCheck = childIndex2;
        } else if (childIndex1 < this.internalArray.length && childIndex2 < this.internalArray.length) {
            if (this.heapType == Heap.MAX_HEAP) { // find largest child index value
                indexToCheck = this.internalArray[childIndex1] > this.internalArray[childIndex2] ? childIndex1 : childIndex2; 
            } else { // find smallest child index value 
                indexToCheck = this.internalArray[childIndex1] < this.internalArray[childIndex2] ? childIndex1 : childIndex2; 
            }
        }
        if (indexToCheck !== null) {
            if ((this.heapType == Heap.MAX_HEAP && this.internalArray[indexToCheck] > this.internalArray[index]) ||
                (this.heapType == Heap.MIN_HEAP && this.internalArray[indexToCheck] < this.internalArray[index])) { 
                this._switchValues(indexToCheck, index);
                this._siftDown(indexToCheck);
            }
        }
    }
    
    _switchValues(i1, i2) {
        let temp = this.internalArray[i1];
        this.internalArray[i1] = this.internalArray[i2];
        this.internalArray[i2] = temp;
    }
     
    _getParentIndex(currentIndex) {
        return currentIndex == 0? null : Math.floor((currentIndex-1)/2);   
    }
    
}

Heap.MAX_HEAP = 'maxheap';
Heap.MIN_HEAP = 'minheap';

// TODO: Unit test this Heap class!

module.exports = Heap;