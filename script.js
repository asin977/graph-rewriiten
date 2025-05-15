    const config = {
      cellSize: "50px",
      colors: {
        x0: "#fff",
        x1: "#fff",
        marked: "red",
        Rows:"#fff",
        Cols:"#fff",
        xaxis:"#fff",
        yaxis:"#fff"
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
      document.documentElement.style.setProperty('--color-Rows',config.colors.Rows);
      document.documentElement.style.setProperty("--color-Cols",config.colors.Cols);
      document.documentElement.style.setProperty("--color-xaxis",config.colors.xaxis);
      document.documentElement.style.setProperty("--color-yaxis",config.colors.yaxis);

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

      for (let x = rowCount - 1; x >= 0; x--) {
        for (let y = 0; y < colCount; y++) {
          const value = Math.round(Math.random()); // 0 or 1
          cellData.push({ x, y, value });

          const cell = document.createElement('div');
          cell.className = 'cell ' + (value === 1 ? 'x1' : 'x0');
          cell.textContent = `(${x},${y})`;
          grid.appendChild(cell);
        }
      }
      selectors.inputX.disabled = false;
      selectors.inputY.disabled = false;

    
      selectors.inputX.max = colCount - 1;
      selectors.inputY.max = rowCount - 1;

      
      selectors.markBtn.disabled = false;
      selectors.clearBtn.disabled = false;
      selectors.resetBtn.disabled = false;

      
      selectors.generateBtn.disabled = true;
    
    }
     
  function markCell() {
    const x = parseInt(document.getElementById("inputX").value);
    const y = parseInt(document.getElementById("inputY").value);

    if (isNaN(x) || isNaN(y)) {
        alert("Please enter both X and Y values.");
        return;
    }

    if (x < 0 || y < 0 || x >= rowCount || y >= colCount) {
        alert(`Enter valid X-(0-${colCount-1}) & Y-(0-${rowCount-1})`);
        return;
    }

    const index = (rowCount - 1 - x) * colCount + y;
    const cells = document.querySelectorAll('#grid .cell');
    cells.forEach(cell => cell.classList.remove('marked'));
    cells[index].classList.add('marked');

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

    
      selectors.inputX.disabled = true;
      selectors.inputY.disabled = true;

      
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

      selectors.markBtn.disabled = true;
      selectors.clearBtn.disabled = true;
      selectors.resetBtn.disabled = true;

      mainEvents();
    }

    main();
 
