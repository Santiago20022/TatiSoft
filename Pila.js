class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.bottom = null;
  }

  isEmpty() {
    return this.top === null;
  }

  push(value) {
    const node = new Node(value);
    if (this.isEmpty()) {
      this.top = node;
      this.bottom = node;
    } else {
      node.next = this.top;
      this.top = node;
    }
  }

  pop() {
    if (this.isEmpty()) return null;

    const removed = this.top;

    if (this.top === this.bottom) {
      this.top = null;
      this.bottom = null;
    } else {
      this.top = this.top.next;
    }

    removed.next = null; // Clean reference
    return removed.value;
  }

  peek() {
    return this.top ? this.top.value : null;
  }

  showStack() {
    let current = this.top;
    console.log('Top');
    while (current) {
      console.log(current.value);
      current = current.next;
    }
    console.log('Bottom');
  }

  removeByValue(value) {
    // Crea una pila temporal sin los valores a eliminar
    const tempStack = new Stack();
    while (!this.isEmpty()) {
      const val = this.pop();
      if (val !== value) {
        tempStack.push(val);
      }
    }

    // Restaurar la pila original en orden
    while (!tempStack.isEmpty()) {
      this.push(tempStack.pop());
    }
  }

  countBags() {
    let count = 0;
    let current = this.top;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }

  sumWeights() {
    let total = 0;
    let current = this.top;
    while (current) {
      if (current.value.peso) {
        total += current.value.peso;
      }
      current = current.next;
    }
    return total;
  }
}
