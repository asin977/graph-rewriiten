const config = {
    cellSize: "60px",
    colors: {
      x0: "#fff",
      x1: "#fff",
      marked: "red",
      Rows: "#fff",
      Cols: "#fff",
      xaxis: "#fff",
      yaxis: "#fff"
    }
  };
  
  const selectors = {
    grid: document.getElementById("grid"),
    rowsInput: document.getElementById("rows"),
    colsInput: document.getElementById("cols"),
    inputX: document.getElementById("inputX"),
    inputY: document.getElementById("inputY"),
    generateBtn: document.getElementById("generate"),
    markBtn: document.getElementById("mark"),
    clearBtn: document.getElementById("clear"),
    resetBtn: document.getElementById("reset")
  };
  
  let cellData = [];
  let rowCount = 0, colCount = 0;
  
  function applyConfig() {
    document.documentElement.style.setProperty('--cell-size', config.cellSize);
    document.documentElement.style.setProperty('--color-x0', config.colors.x0);
    document.documentElement.style.setProperty('--color-x1', config.colors.x1);
    document.documentElement.style.setProperty('--color-marked', config.colors.marked);
    document.documentElement.style.setProperty('--color-Rows', config.colors.Rows);
    document.documentElement.style.setProperty("--color-Cols", config.colors.Cols);
    document.documentElement.style.setProperty("--color-xaxis", config.colors.xaxis);
    document.documentElement.style.setProperty("--color-yaxis", config.colors.yaxis);
  }
  
  function drawGrid() {
    rowCount = parseInt(selectors.rowsInput.value);
    colCount = parseInt(selectors.colsInput.value);
  
    if (isNaN(rowCount) || isNaN(colCount) || rowCount <= 0 || colCount <= 0) {
      alert("Please enter valid positive numbers for Rows and Columns.");
      return;
    }
  
    selectors.grid.style.gridTemplateColumns = `repeat(${colCount}, var(--cell-size))`;
    selectors.grid.style.gridTemplateRows = `repeat(${rowCount}, var(--cell-size))`;
    selectors.grid.innerHTML = '';
    cellData = [];
  
    for (let x = rowCount; x >= 1; x--) {
      for (let y = 1; y <= colCount; y++) {
        const value = Math.round(Math.random());
        cellData.push({ x, y, value });
  
        const cell = document.createElement('div');
        cell.className = 'cell ' + (value === 1 ? 'x1' : 'x0');
        cell.textContent = `(${x},${y})`;
        selectors.grid.appendChild(cell);
      }
    }
  
    
    selectors.inputX.disabled = false;
    selectors.inputY.disabled = false;
  

    selectors.markBtn.disabled = false;
    selectors.clearBtn.disabled = false;
    selectors.resetBtn.disabled = false;
  
    
    selectors.generateBtn.disabled = true;
  
    
    selectors.rowsInput.disabled = false;
    selectors.colsInput.disabled = false;
  }
  
  function markCell() {
    const x = parseInt(selectors.inputX.value);
    const y = parseInt(selectors.inputY.value);
  
    if (isNaN(x) || isNaN(y)) {
      alert("Please enter valid X and Y values.");
      return;
    }
  
    if (x < 1 || x > rowCount || y < 1 || y > colCount) {
      alert(`X should be between 1 and ${rowCount}, Y should be between 1 and ${colCount}`);
      return;
    }
  
    const index = (rowCount - x) * colCount + (y - 1);
    const cells = document.querySelectorAll('#grid .cell');
    cells.forEach(cell => cell.classList.remove('marked'));
    cells[index].classList.add('marked');
  
    
    selectors.rowsInput.disabled = true;
    selectors.colsInput.disabled = true;
  }
  
  function clearGrid() {
    document.querySelectorAll('.cell').forEach((cell, i) => {
      const { value, x, y } = cellData[i];
      cell.className = `cell ${value === 1 ? 'x1' : 'x0'}`;
      cell.textContent = `(${x},${y})`;
    });
  }
  
  function resetGrid() {
    selectors.grid.innerHTML = '';
    selectors.rowsInput.value = '';
    selectors.colsInput.value = '';
    selectors.inputX.value = '';
    selectors.inputY.value = '';
  
    // After reset:
    selectors.inputX.disabled = true;
    selectors.inputY.disabled = true;
  
    selectors.rowsInput.disabled = false;
    selectors.colsInput.disabled = false;
  
    selectors.generateBtn.disabled = false;
    selectors.markBtn.disabled = true;
    selectors.clearBtn.disabled = true;
    selectors.resetBtn.disabled = true;
  }
  
  function mainEvents() {
    selectors.generateBtn.addEventListener('click', drawGrid);
    selectors.markBtn.addEventListener('click', markCell);
    selectors.clearBtn.addEventListener('click', clearGrid);
    selectors.resetBtn.addEventListener('click', resetGrid);
  }
  
  function main() {
    applyConfig();
  
    
    selectors.inputX.disabled = true;
    selectors.inputY.disabled = true;
  
    selectors.rowsInput.disabled = false;
    selectors.colsInput.disabled = false;
  
    selectors.markBtn.disabled = true;
    selectors.clearBtn.disabled = true;
    selectors.resetBtn.disabled = true;
  
    mainEvents();
  }
  
  main();
  