/** TODO: for living cell surrounded by
 * living cell number is negative, error
 * no living cell, result in death
 * 1 living cell, result in death
 * 2 living cell, result in living
 * 3 living cell, result in death
 * 4 living cell, result in death
 *  */

/** TODO: for dead cell surrounded by
 * 3 living cell, result in living
 * or result in death
 *  */

class NegativeLivingNeighborNumberError {
  constructor(info) {
    this.info = info
  }
}

class Cell {
  constructor(state) {
    this.state = state
  }

  evolve(livingNeighborNumber) {
    if (livingNeighborNumber < 0) {
      throw new NegativeLivingNeighborNumberError('living cell number could not be negative!')
    }
    if (this.state === 'living') {
      if (livingNeighborNumber === 2 || livingNeighborNumber === 3) {
        return (this.state = 'living')
      }
    } else {
      if (livingNeighborNumber === 3) {
        return (this.state = 'living')
      }
    }
    this.state = 'dead'
  }
}

describe('Game of Life for living cell', () => {
  let cell
  beforeEach(() => {
    cell = new Cell('living')
  })

  it('There are negative numbers of living cells around the living cell, resulting in error', () => {
    function evolveWithNegativeLivingCell() {
      cell.evolve(-2)
    }
    expect(evolveWithNegativeLivingCell).toThrow(NegativeLivingNeighborNumberError)
  })

  it('There are 0 living cells around the living cell, resulting in cell death', () => {
    cell.evolve(0)
    expect(cell.state).toBe('dead')
  })
  it('There are 1 living cells around the living cell, resulting in cell death', () => {
    cell.evolve(1)
    expect(cell.state).toBe('dead')
  })
  it('There are 2 living cells around the living cell, resulting in cell living', () => {
    cell.evolve(2)
    expect(cell.state).toBe('living')
  })
  it('There are 3 living cells around the living cell, resulting in cell living', () => {
    cell.evolve(3)
    expect(cell.state).toBe('living')
  })
  it('There are 4 living cells around the living cell, resulting in cell death', () => {
    cell.evolve(4)
    expect(cell.state).toBe('dead')
  })
})

describe('Game of Life for dead cell', () => {
  let cell
  beforeEach(() => {
    cell = new Cell('dead')
  })

  it('There are 3 living cells around the dead cell, resulting in cell living', () => {
    cell.evolve(3)
    expect(cell.state).toBe('living')
  })
  it('There are 1 living cells around the dead cell, resulting in cell death', () => {
    cell.evolve(4)
    expect(cell.state).toBe('dead')
  })
  it('There are 4 living cells around the dead cell, resulting in cell death', () => {
    cell.evolve(4)
    expect(cell.state).toBe('dead')
  })
})
