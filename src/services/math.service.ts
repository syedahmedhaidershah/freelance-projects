import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { derivative, parse } from 'mathjs';

let e = Math.exp(1);

@Injectable({
  providedIn: 'root'
})
export class MathService {

  constructor(
    private fb: FormBuilder
  ) { }

  baseForm = () => this.fb.group({
    fx: ['', Validators.required],
    ea: this.fb.array([]),
    et: this.fb.array([]),
  })

  getJSMath = (str: string) => {
    return str.replace('cos', 'Math.cos')
      .replace(/sin/g, 'Math.sin')
      .replace(/sqrt/g, 'Math.sqrt')
      .replace(/\^/g, '**');
  }

  get nrmForm() {
    const useForm: FormGroup = this.baseForm();
    const excludeToRender = ['xn1', 'xn', 'ea', 'et', 'fx'];

    useForm.addControl('x0', new FormControl('0.1', Validators.required));
    useForm.addControl('root', new FormControl('0', Validators.required));
    useForm.addControl('xn', new FormArray([]));
    useForm.addControl('fdx', new FormControl({ value: '' }, Validators.required));
    useForm.addControl('xn1', new FormArray([]));
    return Object.keys(useForm.controls)
      .map(k => {
        return {
          render: !excludeToRender.includes(k),
          control: {
            name: k,
            value: useForm.controls[k]
          },
          fgd: {
            inputType: k === 'fdx' ? 'text' : 'number',
            name: k,
            required: true,
            disabled: k === 'root',
            placeholder: k == 'fdx' ? 'F\'(x)' : null,
            array: useForm.controls[k].constructor.name === 'FormArray',
            group: useForm.controls[k].constructor.name === 'FormGroup',
          }
        }
      });
  }

  get secForm() {
    const useForm: FormGroup = this.baseForm();
    const excludeToRender = ['xl', 'xu', 'fx', 'ea', 'et',];

    useForm.addControl('xu', new FormArray([]));
    useForm.addControl('xl', new FormArray([]));
    useForm.addControl('x1', new FormControl('0.1', Validators.required));
    useForm.addControl('x0', new FormControl('0.1', Validators.required));
    useForm.addControl('root', new FormControl('0', Validators.required));
    return Object.keys(useForm.controls)
      .map(k => {
        return {
          render: !excludeToRender.includes(k),
          control: {
            name: k,
            value: useForm.controls[k]
          },
          fgd: {
            inputType: 'number',
            name: k,
            required: true,
            disabled: k === 'root',
            placeholder: null,
            array: useForm.controls[k].constructor.name === 'FormArray',
            group: useForm.controls[k].constructor.name === 'FormGroup',
          }
        }
      });
  }

  get rfForm() {
    const useForm: FormGroup = this.baseForm();
    const excludeToRender = ['x0a', 'x1a', 'x2a', 'fx', 'ea', 'et',];

    useForm.addControl('x2a', new FormArray([]));
    useForm.addControl('x1a', new FormArray([]));
    useForm.addControl('x0a', new FormArray([]));
    useForm.addControl('x1', new FormControl('0.1', Validators.required));
    useForm.addControl('x0', new FormControl('0.1', Validators.required));
    useForm.addControl('root', new FormControl('0', Validators.required));
    return Object.keys(useForm.controls)
      .map(k => {
        return {
          render: !excludeToRender.includes(k),
          control: {
            name: k,
            value: useForm.controls[k]
          },
          fgd: {
            inputType: 'number',
            name: k,
            required: true,
            disabled: k === 'root',
            placeholder: null,
            array: useForm.controls[k].constructor.name === 'FormArray',
            group: useForm.controls[k].constructor.name === 'FormGroup',
          }
        }
      });
  }

  get bsForm() {
    const useForm: FormGroup = this.baseForm();
    const excludeToRender = ['x0a', 'x1a', 'x2a', 'fx', 'ea', 'et',];

    useForm.addControl('x1a', new FormArray([]));
    useForm.addControl('x0a', new FormArray([]));
    useForm.addControl('x1', new FormControl('0.1', Validators.required));
    useForm.addControl('x0', new FormControl('0.1', Validators.required));
    useForm.addControl('root', new FormControl('0', Validators.required));
    return Object.keys(useForm.controls)
      .map(k => {
        return {
          render: !excludeToRender.includes(k),
          control: {
            name: k,
            value: useForm.controls[k]
          },
          fgd: {
            inputType: 'number',
            name: k,
            required: true,
            disabled: k === 'root',
            placeholder: null,
            array: useForm.controls[k].constructor.name === 'FormArray',
            group: useForm.controls[k].constructor.name === 'FormGroup',
          }
        }
      });
  }

  getEval = (e) => {
    switch (e) {
      case 'estimatederror':
        return ['ea.length?ea[ea.length -1]>stopValue:true', 'ea.length?ea[ea.length -1]>stopValue:true||onemore'];
        break;
      case 'iterations':
        return ['iterations < stopValue', '(iterations < stopValue)||onemore'];
        break;
      case 'totalerror':
        return ['et.length?et[et.length -1]>stopValue:true', 'et.length?et[et.length -1]>stopValue:true||onemore'];
        break;
      default:
        return ['ea.length?ea[ea.length -1]>stopValue:true', 'ea.length?ea[ea.length -1]>stopValue:true||onemore'];
        break;
    }
  }

  fx = (x, funct) => eval(funct);

  runNRM = (funct, params) => {
    funct = this.getJSMath(funct);

    let message = 'nrm';
    let iterations = 0;
    let onemore = true;

    let {
      ea,
      et,
      fdx,
      precision,
      root,
      stopCriteria = 'Estimated Error',
      stopValue,
      x0,
      xn,
      xn1
      // params
    } = params;

    if (parseFloat(((+x0).toFixed(precision))) === 0) return {
      values: {},
      message: 'X0 could not be 0, try increasing precision',
      error: true
    }

    fdx = this.getJSMath(fdx);
    stopValue = +stopValue;

    let fxArr = [];
    let fdxArr = [];

    const useCriteria = stopCriteria.toLowerCase().replace(/\s/g, '');

    let [baseEval, evalCondition] = this.getEval(useCriteria);

    try {
      ea = [];
      et = [];
      xn = [];
      xn1 = [];
      iterations = 0;

      for (; eval(evalCondition); iterations++) {

        if (useCriteria.includes('error'))
          onemore = eval(baseEval);

        // xn1[iterations -1 ] => latest value of x0 or xn
        let useXn = parseFloat(
          // xn assumes either x0 if the first iteration is taking place
          // or xn assumes previous value of xn+1
          ((xn.length === 0) ? +x0 : +(xn1[iterations - 1])).toFixed(precision)
        )
        xn.push(useXn);

        const useFx = this.fx(useXn, funct);
        const useFdx = this.fx(useXn, fdx);

        // useXn = x0 or xn
        // useFx = f(x)
        // useFdx = f'(x)
        let useXn1 = parseFloat(
          (useXn - (useFx / useFdx)).toFixed(precision)
        )
        xn1.push(useXn1);

        fxArr.push(parseFloat(useFx.toFixed(precision)));
        fdxArr.push(parseFloat(useFdx.toFixed(precision)));

        // ea = Estimated Error
        // et = Total Error
        ea.push(
          +(Math.abs((useXn1 - useXn) / useXn1) * 100).toFixed(precision)
        );
        et.push(
          +(Math.abs((root - useXn1) / root) * 100).toFixed(precision)
        );
      }
    } catch (exc) {
      message = exc;
    }
    return {
      precision,
      values: xn.map((v, i) => {
        return {
          xn: xn[i],
          xn1: xn1[i],
          fx: fxArr[i],
          fdx: fdxArr[i],
          ea: ea[i],
          et: et[i]
        }
      }),
      message,
      error: false
    };
  }

  runSEC = (funct, params) => {
    funct = this.getJSMath(funct);

    let message = 'sec';
    let iterations = 0;
    let onemore = true;

    let {
      ea,
      et,
      xl,
      xu,
      stopValue,
      stopCriteria = 'Estimated Error',
      root,
      x0,
      x1,
      precision
      // params
    } = params;

    if (+x0 === +x1) return {
      values: {},
      message: 'Select an interval, x0 is equals to x1',
      error: true
    }

    stopValue = +stopValue;

    let fxl = [];
    let fxu = [];
    let fx2 = [];
    let x2 = [];

    const useCriteria = stopCriteria.toLowerCase().replace(/\s/g, '');

    let [baseEval, evalCondition] = this.getEval(useCriteria);

    try {
      ea = [];
      et = [];
      xl = [];
      xu = [];
      x2 = [];
      iterations = 0;

      for (; eval(evalCondition); iterations++) {

        if (useCriteria.includes('error'))
          onemore = eval(baseEval);

        // xl[iterations -1] = latest value for xl or x0 (lower bracketing value for interval)
        // xu[iterations -1] = latest value for  xu or x1 (upper bracketing value for interval)
        let useXl = parseFloat(
          ((xl.length === 0) ? +x0 : +(xu[iterations - 1])).toFixed(precision)
        );
        let useXu = parseFloat(
          ((xu.length === 0) ? +x1 : +(x2[iterations - 1])).toFixed(precision)
        )
        xl.push(useXl);
        xu.push(useXu);

        const useFlx = this.fx(useXl, funct);
        const useFux = this.fx(useXu, funct);

        // useXu = x0
        // useFux = f(x1)
        // useXu = x1 - upper
        // useXl = x0 - lower
        //  useFux = f(x1)
        // useFlx = f(x0)
        // useX2 = x2;
        let useX2 = parseFloat(
          (useXu - (useFux * (useXu - useXl) / (useFux - useFlx))).toFixed(precision)
        )
        x2.push(useX2);

        fxl.push(parseFloat(useFlx.toFixed(precision)));
        fxu.push(parseFloat(useFux.toFixed(precision)));
        fx2.push(parseFloat(this.fx(useX2, funct).toFixed(precision)));

        ea.push(
          +(
            x2[iterations - 1] ? (Math.abs(
              (useX2 - x2[iterations - 1]) / useX2) * 100) : 90000
          ).toFixed(precision)
        );
        et.push(+(Math.abs((root - useX2) / root) * 100).toFixed(precision));
      }
    } catch (exc) {
      message = exc;
    }
    return {
      precision,
      values: x2.map((v, i) => {
        return {
          x0: xl[i],
          x1: xu[i],
          x2: x2[i],
          fxl: fxl[i],
          fxu: fxu[i],
          fx2: fx2[i],
          ea: ea[i],
          et: et[i]
        }
      }),
      message,
      error: false
    };
  }

  runRF = (funct, params) => {
    funct = this.getJSMath(funct);

    let message = 'rf';
    let iterations = 0;
    let onemore = true;

    let {
      x0a,
      x1a,
      x2a,
      fx,
      x0,
      x1,
      stopValue,
      stopCriteria = 'Estimated Error',
      root,
      precision,
      ea,
      et
      // params
    } = params;

    if (+x0 === +x1) return {
      values: {},
      message: 'Select an interval, x0 is equals to x1',
      error: true
    }

    stopValue = +stopValue;

    let fx0 = [];
    let fx2 = [];
    let update = [];

    const useCriteria = stopCriteria.toLowerCase().replace(/\s/g, '');

    let [baseEval, evalCondition] = this.getEval(useCriteria);

    try {
      ea = [];
      et = [];
      x0a = [];
      x1a = [];
      x2a = [];
      x0a = [];
      iterations = 0;

      for (; eval(evalCondition); iterations++) {

        if (useCriteria.includes('error'))
          onemore = eval(baseEval);

        // x0a[iterations - 1] = latest value for x0 or x1 in lectures
        // x2a[iterations - 1] = latest value for x2 or x3 in lectures
        // useX0 = x0 --> retreived from the statement above
        // useX1 = x1 --> retreived from the statement above
        let useX0 = parseFloat(
          // +((x0a[iterations - 1] < 0) == (x2a[iterations - 1] < 0) => x0<0 AND x2<0 - OR Both negative/positive
          ((x0a.length === 0) ? +x0 : +((x0a[iterations - 1] < 0) == (x2a[iterations - 1] < 0) ? x2a[iterations - 1] : x0a[iterations - 1])).toFixed(precision)
          );
          let useX1 = parseFloat(
          // +((x0a[iterations - 1] < 0) !== (x2a[iterations - 1] < 0) => x0<0 AND x2>0 - OR x0>0 AND x2<0 - OR Opp polarity
          ((x1a.length === 0) ? +x1 : +((x0a[iterations - 1] < 0) !== (x2a[iterations - 1] < 0) ? x2a[iterations - 1] : x1a[iterations - 1])).toFixed(precision)
        )
        x0a.push(useX0);
        x1a.push(useX1);

        const useF0x = this.fx(useX0, funct);
        const useF1x = this.fx(useX1, funct);

        // useX1 = x1 or x2 in lectures
        // useF1x = f(x1) or f(x2) in lectures
        // useX0 = x0 or x1 in lectures
        // useX1 = x1 or x2 in lectures
        // useF0x = f(x0) or f(x1) in lectures
        // useF1x = f(x1) or f(x2) in lectures
        // useF2 = x2 or x3 in lectures
        let useX2 = parseFloat(
          (useX1 - (useF1x * (useX0 - useX1) / (useF0x - useF1x))).toFixed(precision)
        )
        x2a.push(useX2);
        // useF2x = f(x2) or f(x3) in lectures
        const useF2x = this.fx(useX2, funct);

        fx0.push(parseFloat(useF0x.toFixed(precision)));
        fx2.push(parseFloat(useF2x.toFixed(precision)));

        ea.push(
          +(x2a[iterations - 1] ? (Math.abs(
            (useX2 - x2a[iterations - 1]) / useX2) * 100) : 90000).toFixed(precision)
        );
        et.push(Math.abs((root - useX2) / root) * 100);
      }
    } catch (exc) {
      message = exc;
    }
    return {
      precision,
      values: x2a.map((v, i) => {
        return {
          x0: x0a[i],
          x1: x1a[i],
          x2: x2a[i],
          fx0: fx0[i],
          fx2: fx2[i],
          ea: ea[i],
          et: et[i]
        }
      }),
      message,
      error: false
    };
  }

  runBS = (funct, params) => {
    funct = this.getJSMath(funct);

    let message = 'bs';
    let iterations = 0;
    let onemore = true;

    let {
      x0a,
      x1a,
      x2a,
      fx,
      x0,
      x1,
      stopValue,
      stopCriteria = 'Estimated Error',
      root,
      precision,
      ea,
      et
      // params
    } = params;

    if (+x0 === +x1) return {
      values: {},
      message: 'Select an interval, x0 is equals to x1',
      error: true
    }

    stopValue = +stopValue;

    let fx0 = [];
    let fx1 = [];
    let fx2 = [];
    let update = [];

    const useCriteria = stopCriteria.toLowerCase().replace(/\s/g, '');

    let [baseEval, evalCondition] = this.getEval(useCriteria);

    try {
      ea = [];
      et = [];
      x0a = [];
      x1a = [];
      x2a = [];
      x0a = [];
      iterations = 0;

      for (; eval(evalCondition); iterations++) {

        // if (useCriteria.includes('error'))
        onemore = eval(baseEval);

        let useX0 = parseFloat(
          // fx0[iterations - 1] * fx2[iterations - 1]  < 0   => f(x0)*f(x2) < 0 (negative)
          ((x0a.length === 0) ? +x0 : +(fx0[iterations - 1] * fx2[iterations - 1] < 0 ? x0a[iterations - 1] : x2a[iterations - 1])).toFixed(precision)
          );
          let useX1 = parseFloat(
            // same condition - parameters reversed instead of putting f(x0)*f(x2) >= 0
            // fx0[iterations - 1] * fx2[iterations - 1]  < 0   => f(x0)*f(x2) < 0 (positive or equal to 0)
          ((x1a.length === 0) ? +x1 : +(fx0[iterations - 1] * fx2[iterations - 1] < 0 ? x2a[iterations - 1] : x1a[iterations - 1])).toFixed(precision)
        )
        x0a.push(useX0);
        x1a.push(useX1);

        const useF0x = this.fx(useX0, funct);
        const useF1x = this.fx(useX1, funct);

        let useX2 = parseFloat(
          ((useX0 + useX1) / 2).toFixed(5)
        )
        x2a.push(useX2);
        const useF2x = this.fx(useX2, funct);

        fx0.push(parseFloat(useF0x.toFixed(precision)));
        fx2.push(parseFloat(useF2x.toFixed(precision)));

        ea.push(
          +(x2a[iterations - 1] ? (Math.abs(
            (useX2 - x2a[iterations - 1]) / useX2) * 100) : 90000).toFixed(precision)
        );
        et.push(Math.abs((root - useX2) / root) * 100);
      }
    } catch (exc) {
      message = exc;
    }
    return {
      precision,
      values: x2a.map((v, i) => {
        return {
          x0: x0a[i],
          x1: x1a[i],
          x2: x2a[i],
          fx0: fx0[i],
          fx2: fx2[i],
          ea: ea[i],
          et: et[i]
        }
      }),
      message,
      error: false
    };
  }
}
