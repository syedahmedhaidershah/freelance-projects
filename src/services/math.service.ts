import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { derivative } from 'mathjs';

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
      .replace('sin', 'Math.sin')
      .replace('sqrt', 'Math.sqrt')
      .replace('^', '**');
  }

  get nrmForm() {
    const useForm: FormGroup = this.baseForm();
    const excludeToRender = ['xn1', 'xn', 'ea', 'et', 'fx'];

    useForm.addControl('x0', new FormControl('0.1', Validators.required));
    useForm.addControl('root', new FormControl({ value: '0' }, Validators.required));
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

  runNRM = (funct, params) => {
    funct = this.getJSMath(funct);

    let message = '';
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

    let e = Math.exp(1);

    fdx = this.getJSMath(fdx);
    let evalCondition = null;

    let fxArr = [];
    let fdxArr = [];

    const useCriteria = stopCriteria.toLowerCase().replace(' ', '');

    switch (useCriteria) {
      case 'estimatederror':
        evalCondition = 'ea.length?ea[ea.length -1]>stopValue:true||onemore';
        break;
      case 'iterations':
        evalCondition = 'iterations < stopValue';
        break;
      default:
        evalCondition = 'ea.length?ea[ea.length -1]>stopValue:true||onemore';
        break;
    }

    try {
      ea = [];
      et = [];
      xn = [];
      xn1 = [];
      iterations = 0;

      for (; eval(evalCondition); iterations++) {

        if (useCriteria.includes('error'))
          onemore = eval('ea.length?ea[ea.length -1]>stopValue:true');

        let useXn = parseFloat(
          ((xn.length === 0) ? +x0 : +(xn1[iterations - 1])).toFixed(precision)
        )
        xn.push(useXn);

        const useFx = this.fx(useXn, funct);
        const useFdx = this.fx(useXn, fdx);

        let useXn1 = parseFloat(
          (useXn - (useFx / useFdx)).toFixed(precision)
        )
        xn1.push(useXn1);

        fxArr.push(parseFloat(useFx.toFixed(precision)));
        fdxArr.push(parseFloat(useFdx.toFixed(precision)));

        ea.push(Math.abs((useXn1 - useXn) / useXn1) * 100);
        et.push(Math.abs((root - useXn1) / root) * 100);
      }
    } catch (exc) {
      message = exc;
    }
    return {
      values: {
        xn,
        xn1,
        fxArr,
        fdxArr,
        ea,
        et
      },
      message,
      error: false
    };
  }

  fx = (x, funct) => eval(funct);
}
