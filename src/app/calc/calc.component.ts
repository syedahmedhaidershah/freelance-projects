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
  originalFGD: any = [];
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
    this.formgroupsData = formgroupsData();
    this.originalFGD = { ...formgroupsData() };
    this.methods = methods;
    this.derivative = derivative;
    this.nerdamer = window['nerdamer'];
  }

  ngOnInit(): void {
    this.initGroups();
  }

  initGroups = (i?: number) => {
    if (i) {
      return this.formgroupsData[i] = formgroupsData()[i];
    }
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
        let useFgSec: any;
        let root: any;
        let addFactor: any;

        this.setRoot()

        switch (this.getMethodKey) {
          case 'newtonraphson':
            const fdx = this.derivative(useFunction, 'x').toString();
            this.formGroups[selectedIndex].controls.fdx.setValue(fdx)
            break;
          case 'secant':
            useFgSec = this.formGroups[selectedIndex];
            root = useFgSec.controls.root.value;
            addFactor = +(+Math.random().toFixed(2) * 100) % 2 == 0 ? 0.9 : -0.9;
            useFgSec.controls.x0.setValue((+root + addFactor));
            useFgSec.controls.x1.setValue((+root + 2 * addFactor));
            break;
          case 'regulafalsi':
            useFgSec = this.formGroups[selectedIndex];
            root = useFgSec.controls.root.value;
            addFactor = +(+Math.random().toFixed(2) * 100) % 2 == 0 ? 0.5 : -0.7;
            useFgSec.controls.x0.setValue((+root + addFactor));
            useFgSec.controls.x1.setValue((+root - addFactor));
            break;
          case 'bisection':
            useFgSec = this.formGroups[selectedIndex];
            root = useFgSec.controls.root.value;
            addFactor = +(+Math.random().toFixed(2) * 100) % 2 == 0 ? 0.6 : -0.8;
            useFgSec.controls.x0.setValue((+root + addFactor));
            useFgSec.controls.x1.setValue((+root - addFactor));
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
    const nerdamer = this.nerdamer
      .solveEquations(useFunction, 'x')
      .toString()
      .split(',')[0];

    let eq = this.math.getJSMath(
      typeof nerdamer === 'string' ? nerdamer : nerdamer.pop()
    )
    return [useFunction, eq];
  }

  get getMethodKey() {
    return this.formGroups[1].value.method.toLowerCase().replace(/\s/g, '');
  }

  selectTracker = ($e, callback: any, inp?: HTMLInputElement, i?: number, j?: number) => {
    if (!callback) return false;
    if (inp) return this[callback](inp, $e);
    if (callback && callback.includes('window')) return eval(callback.split('window.')[1])($e);
    this[callback]($e, { i, j });
  }

  loadMethod = ({ value }, { i, j }) => {
    this.initGroups(3);
    switch (value.toLowerCase().replace(/\s/g, '')) {
      case 'newtonraphson':
        this.mountNrm(3, j);
        break;
      case 'secant':
        this.mountSecant(3, j);
        break;
      case 'regulafalsi':
        this.mountRf(3, j);
      case 'bisection':
        this.mountBs(3, j);
      default:
        break;
    }
  }

  mountSecant = (i, j) => {
    const controls = this.math.secForm as any;
    controls.forEach(({
      render,
      fgd,
      control: { name, value }
    }) => {
      if (render) this.formgroupsData[i].controls.unshift(fgd);
      this.formGroups[i].addControl(name, value);
    });
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

  mountRf = (i, j) => {
    const controls = this.math.rfForm as any;
    controls.forEach(({
      render,
      fgd,
      control: { name, value }
    }) => {
      if (render) this.formgroupsData[i].controls.unshift(fgd);
      this.formGroups[i].addControl(name, value);
    });
  }

  mountBs = (i, j) => {
    const controls = this.math.bsForm as any;
    controls.forEach(({
      render,
      fgd,
      control: { name, value }
    }) => {
      if (render) this.formgroupsData[i].controls.unshift(fgd);
      this.formGroups[i].addControl(name, value);
    });
  }

  setRoot = () => {
    const [useFunction, eq] = this.nrmExtractions;
    let useVal = 0;
    try {
      useVal = eval(eq);
    } catch (exc) { }
    const root = useVal.toFixed(this.precision);
    this.formGroups[3].controls.root
      .setValue(root);
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

    this.setRoot();
    switch (this.getMethodKey) {
      case 'newtonraphson':
        let x0nrm = (+this.formGroups[3].value.x0).toFixed(this.precision);
        this.formGroups[3].controls.x0
          .setValue(x0nrm);
        break;
      case 'secant':
        let x0sec = (+this.formGroups[3].value.x0).toFixed(this.precision);
        this.formGroups[3].controls.x0
          .setValue(x0sec);
        let x1sec = (+this.formGroups[3].value.x1).toFixed(this.precision);
        this.formGroups[3].controls.x1
          .setValue(x1sec);
        break;
      case 'regulafalsi':
        let x0rf = (+this.formGroups[3].value.x0).toFixed(this.precision);
        this.formGroups[3].controls.x0
          .setValue(x0rf);
        let x1rf = (+this.formGroups[3].value.x1).toFixed(this.precision);
        this.formGroups[3].controls.x1
          .setValue(x1rf);
        break;
      case 'bisection':
        let x0bs = (+this.formGroups[3].value.x0).toFixed(this.precision);
        this.formGroups[3].controls.x0
          .setValue(x0bs);
        let x1bs = (+this.formGroups[3].value.x1).toFixed(this.precision);
        this.formGroups[3].controls.x1
          .setValue(x1bs);
        break;
      default:
        break;
    }
  }

  runIterations = () => {
    let evaluated: any = null;
    let params: any = null;
    const { function: funct } = this.formGroups[2].value;
    let callMethod: any = null;
    switch (this.getMethodKey) {
      case 'newtonraphson':
        callMethod = 'NRM';
        break;
      case 'secant':
        callMethod = 'SEC';
      case 'regulafalsi':
        callMethod = 'RF';
      case 'bisection':
        callMethod = 'BS';
      default:
        break;
    }
    if (!callMethod) throw Error('Method not selected');
    params = this.formGroups[3].value;
    evaluated = this.math[`run${callMethod}`](funct, params);
    if (evaluated.error) return this.snackbar.open(evaluated.message, 'close', { duration: 3000 })
    this.launchIterationsDialog(evaluated);
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
