export const calc: any = {
    methods: {
        open: [
            'Newton Raphson',
            'Secant'
        ],
        closed: [
            'Regula Falsi',
            'Bisection',
        ]
    },

    formgroupsData: () => [
        {
            controls: [
                { type: 'select', name: 'type', required: true, values: [
                    'Open',
                    'Closed'
                ], selectionChange: 'window.console.log' },
            ],
            label: 'Choose a Method Type'
        },
        {
            controls: [
                { type: 'select', name: 'method', required: true, values: ['Newton Raphson', 'Secant'], selectionChange: 'loadMethod' },
            ],
            label: 'Choose a Method'
        },
        {
            controls: [
                { name: 'function', required: true },
            ],
            selectionChange: 'loadMethod',
            label: 'Enter the function to converge'
        },
        {
            controls: [
                {
                    type: 'select', name: 'stopCriteria',
                    required: true,
                    values: ['Estimated Error', 'Iterations', 'Total Error'],
                    selectionChange: 'window.console.log',
                },
                { name: 'stopValue', inputType: 'number', min: 0, required: true },
                { name: 'precision', inputType: 'number', min: 0, required: true, keyup: 'trackPrecision' },
            ],
            label: 'Enter parameters'
        },
    ]
}