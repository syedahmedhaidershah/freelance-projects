const w5 = {
    v: {
        grades: []
    },
    init: () => {
        document.addEventListener('DOMContentLoaded', w5.proceed, false);
    },
    proceed: () => {
        w5.displayStudentTable();
    },
    getGrade: (wam) => {
        let g =''
        if(wam > 50 ) {
            g = 'Pass'; 
        } else {
            g = 'fail';
        }
        return g;
    },
    displayStudentTable: () => {
        studentList.forEach(s => {
            const useGrade = w5.getGrade(s.wam);
            s.grade = {
                text: useGrade
            }
            if(useGrade === 'fail') {
                s.grade.bg = 'red';
            } else {
                s.grade.bg = 'green';
            }
        });
        const table = document.createElement('table');
        const headerRow = document.createElement('tr');
        const sidCol = document.createElement('th');
        const nameCol = document.createElement('th');
        const wamCol = document.createElement('th');
        const gradeCol = document.createElement('th');

        sidCol.innerText = 'SID';
        nameCol.innerText = 'Name';
        wamCol.innerText = 'WAM';
        gradeCol.innerText = 'Grade';

        headerRow.append(sidCol, nameCol, wamCol, gradeCol);
        table.append(headerRow);

        studentList.forEach(s => {
            const newTr = document.createElement('tr');
            const sidCell = document.createElement('td');
            const nameCell = document.createElement('td');
            const wamCell = document.createElement('td');
            const gradeCell = document.createElement('td');

            sidCell.innerText = s.sid;
            nameCell.innerText = s.name;
            wamCell.innerText = s.wam;
            gradeCell.innerText = s.grade.text;
            gradeCell.style = "background-color:".concat(s.grade.bg).concat("; color: #fff");

            newTr.append(sidCell, nameCell, wamCell, gradeCell);
            table.append(newTr);
        });
        const lastRow = document.createElement('tr');
        const firstCell = document.createElement('td');
        const secondCell = document.createElement('td');

        firstCell.colSpan = '3';
        firstCell.innerText = 'Average WAM';
        let temp  = 0;
        studentList.forEach(v => { temp += v.wam; });
        secondCell.innerText = temp/studentList.length;
        lastRow.append(firstCell, secondCell);

        table.append(lastRow);

        document.body.append(table)
    }
}

w5.init();