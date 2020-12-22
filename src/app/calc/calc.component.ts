import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/services/general.service';
import * as _ from "lodash";
import { MatSnackBar } from '@angular/material/snack-bar';
import { derivative } from 'mathjs';
import { calc as Calculation } from '../../statics/calc';
import { MathService } from 'src/services/math.service';
import { MatDialog } from '@angular/material/dialog';
import { IterationsDialogComponent } from '../iterations-dialog/iterations-dialog.component';

const {
  methods,
  formgroupsData
} = Calculation;

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css'],
  host: {
    class: 'd-flex flex-grow-1'
  }
})
export class CalcComponent implements OnInit {
  isLinear = true;

  stepColors = [];
  formgroupsData: any = [];
  methods: any = [];
  derivative: any = (x) => x;
  nerdamer: any = (x) => x;

  functionValid = true;
  precision = 0;

  formGroups: Array<FormGroup> = [];

  constructor(
    private general: GeneralService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private math: MathService,
    private dialog: MatDialog
  ) {
    this.capitalize = this.general.capitalizeWord;
    this.formgroupsData = formgroupsData;
    this.methods = methods;
    this.derivative = derivative;
    this.nerdamer = window['nerdamer'];
  }

  ngOnInit(): void {
    this.initGroups();
  }

  initGroups = () => {
    this.formGroups = this.formgroupsData.map((fgd: any) => {
      this.stepColors.push('primary');
      if (!fgd.form) {
        const useGroup = {};
        fgd.controls.forEach(k => useGroup[k.name] = ['', k.required ? Validators.required : []])
        return this.fb.group(useGroup);
      }
      return fgd.form;
    })
  }

  capitalize: any = (str: String) => { }

  get Getmethods() {
    const methFG = this.formGroups ? this.formGroups[1] : null;
    if (methFG)
      return this.methods[this.capitalize(methFG.controls.method.value)];
    return [];
  }

  trackSelection = ({ selectedIndex, previouslySelectedIndex }) => {
    // const useTypes = this.formGroups[0].value.type.map(t => t.toLowerCase());

    let proValid = true;

    const useFg = this.formGroups[selectedIndex - 1];
    if (useFg && useFg.invalid) return false;

    this.stepColors[previouslySelectedIndex] = 'primary';
    this.functionValid = true;

    this.cdr.detectChanges();

    let useFunction = this.math.getJSMath(
      this.formGroups[2].value.function
    );

    switch (previouslySelectedIndex) {
      case 2:
        try {
          let x = 1;
          let y = 100;
          eval(useFunction);
        } catch (exc) {
          console.warn(exc);
          try {
            let x = 100;
            let y = 1;
            eval(useFunction);
          } catch (exc) {
            console.warn(exc);
            proValid = false;
            this.functionValid = false;
          }
        }
        break;
      default:
        break;
    }

    switch (selectedIndex) {
      case 1:
        this.formgroupsData[1].controls[0].values = this.methods[this.formGroups[0].value.type.toLowerCase()];
        // this.formgroupsData[1].controls[0].values = _.flatten(
        //   Object
        //     .keys(this.methods)
        //     .filter(k => useTypes.includes(k))
        //     .map(k => this.methods[k])
        // );
        break;
      case 2:
        // loadMethod()
        break;
      case 3:
        const [useFunction, eq] = this.nrmExtractions;
        switch (this.formGroups[1].value.method) {
          case 'Newton Raphson':
            const fdx = this.derivative(useFunction, 'x').toString();
            this.formGroups[selectedIndex].controls.fdx.setValue(fdx)
            break;
          default:
            break;
        }
        if (eq.includes('i') || eq.includes('-i')) {
          this.snackbar.open('The roots for this function are imaginary/complex', 'close', { duration: 5000 });
          this.stepColors[previouslySelectedIndex] = 'warn';
        } else {
          this.formGroups[selectedIndex].controls.root
            .setValue(
              eval(eq)
            )
        }
        break;
      default:
        break;
    }
    if (!proValid) {
      this.stepColors[previouslySelectedIndex] = 'warn';
      this.snackbar.open('The entered function might be incorrect', 'close', { duration: 3000 });
      return false;
    }
    this.cdr.detectChanges();
  }

  get nrmExtractions() {
    const useFunction = this.formGroups[2].value.function;

    let eq = this.math.getJSMath(
      this.nerdamer
        .solveEquations(useFunction, 'x')
        .toString()
        .split(',')[0]
    )
    return [useFunction, eq];
  }

  selectTracker = ($e, callback: any, inp?: HTMLInputElement, i?: number, j?: number) => {
    if (!callback) return false;
    if (inp) return this[callback](inp, $e);
    if (callback && callback.includes('window')) return eval(callback.split('window.')[1])($e);
    this[callback]($e, { i, j });
  }

  loadMethod = ({ value }, { i, j }) => {
    switch (value.toLowerCase().replace(' ', '')) {
      case 'newtonraphson':
        this.mountNrm(3, j);
        break;
      default:
        break;
    }
  }

  mountNrm = (i, j) => {
    const controls = this.math.nrmForm as any;
    controls.forEach(({
      render,
      fgd,
      control: { name, value }
    }) => {
      if (render) this.formgroupsData[i].controls.unshift(fgd);
      this.formGroups[i].addControl(name, value);
    })
  }

  trackPrecision = ({ value }, $e) => {
    this.precision = value;
    const { stopCriteria } = this.formGroups[3].value;
    let stopValuePrecision = 0;
    if (stopCriteria == 'Estimated Error') {
      stopValuePrecision = this.precision;
    }
    const stopValue = parseFloat(this.formGroups[3].value.stopValue).toFixed(stopValuePrecision);
    this.formGroups[3].controls.stopValue
      .setValue(stopValue)

    const [useFunction, eq] = this.nrmExtractions;
    let useVal = 0;
    try {
      useVal = eval(eq);
    } catch (exc) { }
    const root = useVal.toFixed(this.precision);
    this.formGroups[3].controls.root
      .setValue(root)
  }

  runIterations = () => {
    let evaluated: any = null;
    let params: any = null;
    switch (this.formGroups[1].value.method.toLowerCase().replace(' ', '')) {
      case 'newtonraphson':
        const { function: funct } = this.formGroups[2].value;
        params = this.formGroups[3].value;
        evaluated = this.math.runNRM(funct, params);
        if (evaluated.error) return this.snackbar.open(evaluated.message, 'close', { duration: 3000 })
        this.launchIterationsDialog(evaluated);
        break;
      default:
        break;
    }
  }

  launchIterationsDialog = (evaluated: any) => {
    this.dialog.open(
      IterationsDialogComponent, {
      height: '100%',
      width: '100%',
      minWidth: '100vw',
      minHeight: '100vw',
      data: evaluated
    })
  }
}
